import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { tmpdir } from "node:os";
import { mkdtemp, writeFile, rm } from "node:fs/promises";

import { loadYaml } from "../src/loader.js";
import { YamlLoaderError } from "../src/errors.js";

async function createTempSpec(contents) {
  const directory = await mkdtemp(path.join(tmpdir(), "cyyaml-tests-"));
  const filePath = path.join(directory, "spec.yaml");
  await writeFile(filePath, contents, "utf8");
  return { directory, filePath };
}

test("loadYaml reads YAML files and returns parsed data", async (t) => {
  const { directory, filePath } = await createTempSpec(`{
  "name": "Example",
  "steps": ["log message"]
}
`);

  t.after(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  const result = await loadYaml(filePath);
  assert.equal(result.filePath, filePath);
  assert.equal(result.data.name, "Example");
  assert.deepEqual(result.data.steps, ["log message"]);
  assert.equal(result.contents.trim().startsWith("{"), true);
  assert.ok(Array.isArray(result.stepMetadata));
});

test("loadYaml throws a helpful error when the file is missing", async () => {
  const missing = path.join(tmpdir(), "does-not-exist.yaml");
  await assert.rejects(() => loadYaml(missing), (error) => {
    assert.ok(error instanceof YamlLoaderError);
    assert.match(error.message, /Unable to read/);
    assert.equal(error.filePath, path.resolve(missing));
    return true;
  });
});

test("loadYaml reports YAML syntax errors with context", async (t) => {
  const { directory, filePath } = await createTempSpec(`{
  "name": "Example",
  "steps": [
    {
      "log": "hello"
    }
  ]
`);

  t.after(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  await assert.rejects(() => loadYaml(filePath), (error) => {
    assert.ok(error instanceof YamlLoaderError);
    assert.match(error.message, /Failed to parse YAML/);
    assert.equal(error.filePath, filePath);
    assert.equal(typeof error.line, "number");
    assert.equal(typeof error.column, "number");
    return true;
  });
});
