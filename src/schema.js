import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { listRegisteredCommands } from "./commands/registry.js";
import { locatorSchema } from "./generator/locator.js";

const seedFileSchema = z.string().min(1, "seedFile must be a non-empty string");
const nameSchema = z.string().min(1, "spec names cannot be empty");
const simpleString = z.string().min(1);

export const shortTextSchema = z.string().min(1).max(280).optional();

export function createCommandSchemas() {
  return listRegisteredCommands().map((command) => {
    const payloadSchema = command.schema ?? z.any();
    return z
      .object({
        [command.name]: payloadSchema,
      })
      .strict();
  });
}

export function getStepSchema() {
  const commandSchemas = createCommandSchemas();
  return z.union([simpleString, ...commandSchemas]);
}

export function getSpecSchema() {
  return z.object({
    $schema: simpleString.optional(),
    name: nameSchema.optional(),
    description: shortTextSchema,
    skip: z.boolean().optional(),
    seedFile: seedFileSchema.optional(),
    tags: z.array(simpleString).optional(),
    steps: z.array(getStepSchema()).min(1),
  });
}

export function generateJsonSchema() {
  const schema = getSpecSchema();
  return zodToJsonSchema(schema, "CypressYamlPlugin");
}

export { locatorSchema };
