import { z } from "zod";

const waitObjectSchema = z
  .object({
    ms: z.number().nonnegative().optional(),
    seconds: z.number().nonnegative().optional(),
  })
  .refine((value) => value.ms !== undefined || value.seconds !== undefined, {
    message: "waitFor requires ms or seconds",
  });

const schema = z.union([
  z.number().nonnegative(),
  waitObjectSchema,
]);

function resolveDuration(value) {
  if (typeof value === "number") {
    return value;
  }
  if (value.ms !== undefined) {
    return value.ms;
  }
  return value.seconds * 1000;
}

export default {
  name: "waitFor",
  description: "Pause execution for a fixed amount of time",
  schema,
  generate: (value) => `cy.wait(${resolveDuration(value)});`,
};
