import { z } from "zod";

const schema = z.union([
  z.string().min(1, "log short-form text cannot be empty"),
  z.object({
    message: z.string().min(1, "log.message is required"),
  }),
]);

function normalize(value) {
  if (typeof value === "string") {
    return value;
  }
  return value.message;
}

export default {
  name: "log",
  description: "Log text to the Cypress runner",
  schema,
  generate: (value) => `cy.log(${JSON.stringify(normalize(value))});`,
};
