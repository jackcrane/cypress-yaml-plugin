import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { validateSpec } from "../src/validator.js";
import { YamlValidationError } from "../src/errors.js";
import { registerCommand } from "../src/commands/registry.js";

test("validateSpec trims names and normalizes steps", () => {
  const spec = {
    name: "  My Spec  ",
    description: "Spec used for unit tests",
    steps: [{ log: { message: "built in command" } }, "string shorthand"],
  };

  const result = validateSpec(spec, {
    filePath: "/tmp/sample-spec.yaml",
    stepMetadata: [{ line: 10 }, { line: 11 }],
  });

  assert.equal(result.name, "My Spec");
  assert.deepEqual(result.steps, [
    { name: "log", value: { message: "built in command" }, line: 10 },
    { name: "log", value: "string shorthand", line: 11 },
  ]);
});

test("validateSpec derives a name from the file path when missing", () => {
  const spec = {
    description: "missing name fallback",
    steps: ["implicit log"],
  };

  const result = validateSpec(spec, {
    filePath: "/Users/me/tests/signup.flow.yaml",
    stepMetadata: [{ line: 5 }],
  });

  assert.equal(result.name, "signup.flow");
});

test("validateSpec rejects unknown commands with suggestions", () => {
  const spec = {
    description: "intentional failure",
    steps: [{ loog: {} }],
  };

  assert.throws(
    () =>
      validateSpec(spec, {
        filePath: "/tmp/spec.yaml",
        stepMetadata: [{ line: 7 }],
      }),
    (error) => {
      assert.ok(error instanceof YamlValidationError);
      assert.match(error.message, /Unknown command "loog"/);
      assert.match(error.suggestion, /Allowed commands/);
      assert.equal(error.line, 7);
      return true;
    }
  );
});

test("validateSpec enforces the schema produced by zod", () => {
  const spec = {
    description: "missing steps array",
    steps: [],
  };

  assert.throws(
    () => validateSpec(spec, { filePath: "/tmp/spec.yaml" }),
    (error) => {
      assert.ok(error instanceof YamlValidationError);
      assert.match(error.message, /Refer to the schema/);
      return true;
    }
  );
});

test("validateSpec sees commands registered after the schema cache is warmed", () => {
  validateSpec(
    {
      description: "warm cache",
      steps: ["log something"],
    },
    { filePath: "/tmp/warm-cache.yaml" }
  );

  const commandName = `runtime-command-${randomUUID()}`;
  registerCommand(
    commandName,
    (value) => [`cy.log(${JSON.stringify(value.message)});`],
    {
      schema: z.object({
        message: z.string(),
      }),
    }
  );

  const spec = {
    description: "custom command",
    steps: [
      {
        [commandName]: {
          message: "hello world",
        },
      },
    ],
  };

  const result = validateSpec(spec, {
    filePath: "/tmp/custom-command.yaml",
  });

  assert.equal(result.steps[0].name, commandName);
  assert.equal(result.steps[0].value.message, "hello world");
});
