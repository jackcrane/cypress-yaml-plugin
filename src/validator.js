import path from "node:path";
import { getSpecSchema } from "./schema.js";
import {
  resolveCommand,
  listRegisteredCommands,
  suggestCommands,
} from "./commands/registry.js";
import { YamlValidationError } from "./errors.js";

const SCHEMA_URL =
  "https://raw.githubusercontent.com/jackcrane/cypress-yaml-plugin/main/schema.json";

function ensureKnownCommands(rawSteps, { filePath, stepMetadata }) {
  if (!Array.isArray(rawSteps)) {
    return;
  }
  for (let index = 0; index < rawSteps.length; index += 1) {
    const step = rawSteps[index];
    if (!step || typeof step !== "object" || Array.isArray(step)) {
      continue;
    }
    const entries = Object.entries(step);
    if (entries.length !== 1) {
      throw new YamlValidationError(
        `Step ${index + 1} must declare exactly one command.`,
        {
          filePath,
          line: stepMetadata?.[index]?.line,
        }
      );
    }

    const [commandName] = entries[0];
    if (!resolveCommand(commandName)) {
      const suggestions = suggestCommands(commandName);
      const allowed = listRegisteredCommands()
        .map((command) => command.name)
        .join(", ");
      const suggestionText = suggestions.length
        ? `Did you mean ${suggestions
            .map((candidate) => `"${candidate}"`)
            .join(", ")}?`
        : "No similar commands were found.";
      throw new YamlValidationError(
        `Unknown command "${commandName}". ${suggestionText}`,
        {
          filePath,
          line: stepMetadata?.[index]?.line,
          suggestion: `Allowed commands: ${allowed}`,
        }
      );
    }
  }
}

function normalizeSpec(parsed, options) {
  const { filePath, stepMetadata } = options;
  const normalizedName =
    (parsed.name && parsed.name.trim()) ||
    (filePath ? path.basename(filePath, path.extname(filePath)) : "YAML spec");

  const normalizedSteps = parsed.steps.map((step, index) => {
    if (typeof step === "string") {
      return { name: "log", value: step, line: stepMetadata?.[index]?.line };
    }
    const [name, value] = Object.entries(step)[0];
    return { name, value, line: stepMetadata?.[index]?.line };
  });

  return {
    ...parsed,
    name: normalizedName,
    steps: normalizedSteps,
  };
}

function formatZodErrors(issues, { filePath }) {
  const lines = issues.map((issue) => {
    const pathSegment = issue.path.length ? issue.path.join(".") : "root";
    return `- ${pathSegment}: ${issue.message}`;
  });
  lines.push(`Refer to the schema for details: ${SCHEMA_URL}`);
  return new YamlValidationError(lines.join("\n"), { filePath, details: issues });
}

export function validateSpec(spec, options = {}) {
  ensureKnownCommands(spec?.steps, options);
  const schema = getSpecSchema();
  const result = schema.safeParse(spec);

  if (!result.success) {
    throw formatZodErrors(result.error.issues, options);
  }

  return normalizeSpec(result.data, options);
}
