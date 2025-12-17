#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import { loadYaml } from "../src/loader.js";
import { validateSpec } from "../src/validator.js";
import { generateTest, convertYamlToCypress } from "../src/generator/index.js";

const SCHEMA_URL =
  "https://raw.githubusercontent.com/jackcrane/cypress-yaml-plugin/main/schema.json";

const program = new Command();
program.name("cypress-yaml").description("Cypress YAML tooling");

program
  .command("validate <file>")
  .description("Validate a YAML spec against the schema")
  .action(async (file) => {
    try {
      const loaded = await loadYaml(file);
      validateSpec(loaded.data, {
        filePath: loaded.filePath,
        stepMetadata: loaded.stepMetadata,
      });
      console.log(chalk.green("√ Spec is valid"));
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exitCode = 1;
    }
  });

program
  .command("build <file>")
  .option("--stdout", "Write generated JS to stdout")
  .description("Generate a Cypress spec from YAML")
  .action(async (file, options) => {
    try {
      const outputPath = file.replace(/\.ya?ml$/i, ".cy.js");
      const result = await convertYamlToCypress(file, {
        outputFileName: path.basename(outputPath),
      });
      if (options.stdout) {
        process.stdout.write(result.code);
      } else {
        await fs.writeFile(outputPath, result.code, "utf8");
        console.log(chalk.green(`√ Wrote ${outputPath}`));
      }
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exitCode = 1;
    }
  });

program
  .command("init <file>")
  .description("Insert the $schema directive for yaml-language-server")
  .action(async (file) => {
    try {
      const absolute = path.resolve(file);
      const current = await fs.readFile(absolute, "utf8").catch(() => "");
      const directive = `# yaml-language-server: $schema=${SCHEMA_URL}`;
      if (current.startsWith(directive)) {
        console.log(chalk.green("√ Schema directive already present"));
        return;
      }
      const updated = `${directive}\n${current.trimStart()}`;
      await fs.writeFile(absolute, updated, "utf8");
      console.log(chalk.green(`√ Added schema directive to ${file}`));
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exitCode = 1;
    }
  });

program.parseAsync(process.argv);
