import { z } from "zod";

const objectSchema = z
  .object({
    equals: z.string().min(1).optional(),
    includes: z.string().min(1).optional(),
  })
  .refine((value) => value.equals || value.includes, {
    message: "expectUrl requires equals or includes",
  });

const schema = z.union([z.string().min(1), objectSchema]);

export default {
  name: "expectUrl",
  description: "Assert on the current URL",
  schema,
  generate: (value) => {
    if (typeof value === "string") {
      return `cy.url().should('include', ${JSON.stringify(value)});`;
    }
    if (value.equals) {
      return `cy.location('pathname').should('eq', ${JSON.stringify(
        value.equals
      )});`;
    }
    return `cy.url().should('include', ${JSON.stringify(value.includes)});`;
  },
};
