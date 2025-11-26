import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";
import { parseDocument } from "yaml";
import { YamlLoaderError } from "./errors.js";

function normalizePath(filePath) {
  if (!filePath) {
    throw new YamlLoaderError("loadYaml requires a file path");
  }
  return path.resolve(filePath);
}

function extractStepMetadata(doc) {
  if (!doc || !doc.contents || doc.errors.length > 0) {
    return [];
  }

  if (doc.contents.type !== "MAP") {
    return [];
  }

  const stepsNode = doc.contents.items.find(
    (item) => item.key && item.key.value === "steps"
  );

  if (!stepsNode || !stepsNode.value || stepsNode.value.type !== "SEQ") {
    return [];
  }

  return stepsNode.value.items.map((item) => {
    if (!item || !Array.isArray(item.range)) {
      return { line: null, column: null, range: null };
    }
    const [start] = item.range;
    const { line, col } = doc.linePos(start);
    return {
      line: typeof line === "number" ? line + 1 : null,
      column: typeof col === "number" ? col + 1 : null,
      range: item.range,
    };
  });
}

export async function loadYaml(filePath) {
  const absolutePath = normalizePath(filePath);
  let contents;

  try {
    contents = await fs.readFile(absolutePath, "utf8");
  } catch (error) {
    throw new YamlLoaderError(`Unable to read ${absolutePath}: ${error.message}`, {
      filePath: absolutePath,
    });
  }

  let parsed;
  try {
    parsed = yaml.load(contents, { filename: absolutePath, json: true });
  } catch (error) {
    throw new YamlLoaderError(
      `Failed to parse YAML: ${error.reason || error.message}`,
      {
        filePath: absolutePath,
        line: error.mark ? error.mark.line + 1 : undefined,
        column: error.mark ? error.mark.column + 1 : undefined,
      }
    );
  }

  const document = parseDocument(contents, { keepSourceTokens: true });
  const stepMetadata = extractStepMetadata(document);

  if (!parsed || typeof parsed !== "object") {
    throw new YamlLoaderError("YAML file must describe an object", {
      filePath: absolutePath,
    });
  }

  return {
    filePath: absolutePath,
    contents,
    data: parsed,
    stepMetadata,
  };
}
