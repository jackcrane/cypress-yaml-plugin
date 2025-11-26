import { z } from "zod";

const schema = z.union([
  z.string().trim().min(1),
  z
    .object({
      name: z.string().trim().min(1).optional(),
    })
    .optional(),
]);

function resolveName(value) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (value && value.name) {
    return value.name.trim();
  }
  return "page";
}

export default {
  name: "saveSnapshot",
  description: "Trigger a custom snapshot helper",
  schema,
  generate: (value) => `cy.savePageSnapshot(${JSON.stringify(resolveName(value))});`,
};
