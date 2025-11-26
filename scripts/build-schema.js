import fs from "node:fs/promises";
import path from "node:path";
import { generateJsonSchema } from "../src/schema.js";

async function run() {
  const schema = generateJsonSchema();
  const target = path.resolve("schema.json");
  await fs.writeFile(target, JSON.stringify(schema, null, 2));
  console.log(`√ Wrote ${target}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
