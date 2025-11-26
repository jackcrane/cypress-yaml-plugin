import { z } from "zod";

const schema = z.union([z.boolean(), z.null()]).optional();

export default {
  name: "pause",
  description: "Pause the Cypress run for interactive debugging",
  schema,
  generate: () => "cy.pause();",
};
