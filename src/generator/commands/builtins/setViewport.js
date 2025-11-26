import { z } from "zod";

const schema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export default {
  name: "setViewport",
  description: "Set Cypress viewport dimensions",
  schema,
  generate: (value) => `cy.viewport(${value.width}, ${value.height});`,
};
