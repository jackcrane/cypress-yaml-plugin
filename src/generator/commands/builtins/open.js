import { z } from "zod";

const openObjectSchema = z.object({
  path: z.string().min(1, "open.path requires a non-empty URL or route"),
  options: z.record(z.any()).optional(),
});

const schema = z.union([
  z.string().min(1, "open accepts a string path"),
  openObjectSchema,
]);

function buildVisit(value) {
  if (typeof value === "string") {
    return `cy.visit(${JSON.stringify(value)})`;
  }
  if (value.options) {
    return `cy.visit(${JSON.stringify(value.path)}, ${JSON.stringify(
      value.options
    )})`;
  }
  return `cy.visit(${JSON.stringify(value.path)})`;
}

export default {
  name: "open",
  description: "Navigate to a path using cy.visit",
  schema,
  generate: (value) => `${buildVisit(value)};`,
};
