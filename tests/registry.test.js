import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

import {
  registerCommand,
  resolveCommand,
  suggestCommands,
} from "../src/commands/registry.js";
import { CommandRegistryError } from "../src/errors.js";

const uniqueCommandName = () => `unit-test-command-${randomUUID()}`;

test("registerCommand stores handlers and exposes aliases", () => {
  const name = uniqueCommandName();
  const alias = `${name}-alias`;
  const handler = () => "cy.log('hello')";

  const entry = registerCommand(name, handler, {
    description: "unit test command",
    aliases: [alias],
  });

  const resolved = resolveCommand(name);
  assert.equal(resolved.generate, handler);
  assert.equal(resolved.description, "unit test command");

  const aliasEntry = resolveCommand(alias);
  assert.equal(aliasEntry.generate, handler);
  assert.equal(aliasEntry.isAlias, true);
  assert.equal(aliasEntry.name, alias);

  assert.equal(entry.name, name);
});

test("registerCommand enforces function handlers and unique names", () => {
  const name = uniqueCommandName();
  const handler = () => {};

  registerCommand(name, handler);

  assert.throws(
    () => registerCommand(name, handler),
    (error) => {
      assert.ok(error instanceof CommandRegistryError);
      assert.match(error.message, /already registered/);
      return true;
    }
  );

  assert.throws(
    () => registerCommand(uniqueCommandName(), "not-a-function"),
    (error) => {
      assert.ok(error instanceof CommandRegistryError);
      assert.match(error.message, /requires a generator function/);
      return true;
    }
  );
});

test("suggestCommands returns the closest registered names", () => {
  const suggestions = suggestCommands("loog", 1);
  assert.deepEqual(suggestions, ["log"]);
});
