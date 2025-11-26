import { z } from "zod";

const schema = z.union([
  z.undefined(),
  z.null(),
  z.string().trim().min(1),
  z.object({
    name: z.string().trim().min(1).optional(),
    options: z.record(z.any()).optional(),
  }),
]);

export default {
  name: "takeScreenshot",
  description: "Capture a Cypress screenshot",
  schema,
  generate: (value) => {
    if (value === undefined || value === null) {
      return "cy.screenshot();";
    }
    if (typeof value === "string") {
      return `cy.screenshot(${JSON.stringify(value.trim())});`;
    }
    if (value.options && value.name) {
      return `cy.screenshot(${JSON.stringify(value.name)}, ${JSON.stringify(
        value.options
      )});`;
    }
    if (value.options) {
      return `cy.screenshot(undefined, ${JSON.stringify(value.options)});`;
    }
    if (value.name) {
      return `cy.screenshot(${JSON.stringify(value.name)});`;
    }
    return "cy.screenshot();";
  },
};
