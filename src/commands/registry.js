import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { CommandRegistryError } from "../errors.js";
import { findNearestMatch } from "../utils/levenshtein.js";

const commands = new Map();

function normalizeName(name) {
  if (!name || typeof name !== "string") {
    throw new CommandRegistryError("Command names must be non-empty strings");
  }
  return name.trim();
}

export function registerCommand(name, handler, options = {}) {
  const normalized = normalizeName(name);

  if (commands.has(normalized)) {
    throw new CommandRegistryError(`Command "${normalized}" is already registered.`);
  }

  if (typeof handler !== "function") {
    throw new CommandRegistryError(
      `Command "${normalized}" requires a generator function.`
    );
  }

  const entry = {
    name: normalized,
    generate: handler,
    schema: options.schema,
    description: options.description ?? "",
    validate: options.validate,
    aliases: Array.isArray(options.aliases)
      ? options.aliases.map((alias) => alias.trim())
      : [],
  };

  commands.set(normalized, entry);

  for (const alias of entry.aliases) {
    if (!commands.has(alias)) {
      commands.set(alias, { ...entry, name: alias, isAlias: true });
    }
  }

  return entry;
}

export function resolveCommand(name) {
  if (!name) return undefined;
  const normalized = name.trim();
  return commands.get(normalized);
}

export function listRegisteredCommands() {
  return Array.from(
    new Map(
      Array.from(commands.values())
        .filter((entry) => !entry.isAlias)
        .map((entry) => [entry.name, entry])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));
}

export function suggestCommands(input, limit = 3) {
  const names = listRegisteredCommands().map((entry) => entry.name);
  return findNearestMatch(input, names, limit);
}

async function loadBuiltInCommands() {
  const directoryUrl = new URL("../generator/commands/builtins/", import.meta.url);
  const directoryPath = fileURLToPath(directoryUrl);
  const entries = fs
    .readdirSync(directoryPath)
    .filter((entry) => entry.endsWith(".js"))
    .sort();

  await Promise.all(
    entries.map(async (fileName) => {
      const moduleUrl = new URL(fileName, directoryUrl);
      const definition = (await import(moduleUrl.href)).default;
      if (!definition || typeof definition !== "object") {
        throw new CommandRegistryError(
          `Built-in command at ${path.relative(
            process.cwd(),
            fileURLToPath(moduleUrl)
          )} must export a default object.`
        );
      }
      registerCommand(definition.name, definition.generate, {
        schema: definition.schema,
        description: definition.description,
        validate: definition.validate,
        aliases: definition.aliases,
      });
    })
  );
}

const initialization = loadBuiltInCommands();
await initialization;
