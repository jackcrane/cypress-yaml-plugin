import fs from "node:fs/promises";
import path from "node:path";
import chalk from "chalk";
import { convertYamlToCypress } from "./generator/index.js";

const SUPPORTED_EXTENSIONS = new Set([".yaml", ".yml"]);

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

export function yamlPreprocessor(on, config = {}) {
  const handler = async (file) => {
    const filePath = file.filePath ?? file;
    const outputPath = file.outputPath ?? filePath.replace(/\.ya?ml$/i, ".cy.js");
    const ext = path.extname(filePath).toLowerCase();

    if (!SUPPORTED_EXTENSIONS.has(ext)) {
      return filePath;
    }

    try {
      const result = await convertYamlToCypress(filePath, {
        outputFileName: path.basename(outputPath),
        onStage: (stage) => {
          if (stage === "parsed") {
            console.log(chalk.green("√ Parsed YAML"));
          } else if (stage === "validated") {
            console.log(chalk.green("√ Validated spec"));
          } else if (stage === "generated") {
            console.log(chalk.green(`√ Generated JS → ${outputPath}`));
          }
        },
      });

      await ensureDirectory(outputPath);
      await fs.writeFile(outputPath, result.code, "utf8");
      return outputPath;
    } catch (error) {
      console.error(chalk.red(`[cypress-yaml] ${error.message}`));
      throw error;
    }
  };

  if (typeof on === "function") {
    on("file:preprocessor", handler);
  }

  return handler;
}
