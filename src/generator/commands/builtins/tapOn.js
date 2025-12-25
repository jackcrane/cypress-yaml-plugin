import { z } from "zod";
import {
  locatorObjectBase,
  locatorSchema,
  withParentScopeValidation,
} from "../../locator.js";

const tapObjectSchema = withParentScopeValidation(
  locatorObjectBase
    .extend({
      allowScroll: z.boolean().optional(),
      xPercent: z.number().min(0).max(100).optional(),
      yPercent: z.number().min(0).max(100).optional(),
      force: z.boolean().optional(),
    })
    .superRefine((value, ctx) => {
      if (!value.selector && !value.dataCy && !value.placeholder && !value.text) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "tapOn requires selector, dataCy, placeholder, or text.",
        });
      }
    })
);

const schema = z.union([tapObjectSchema, locatorSchema]);

function normalize(value) {
  if (typeof value === "string") {
    return { selector: value };
  }
  return value;
}

export default {
  name: "tapOn",
  description: "Click an element with optional coordinate control",
  schema,
  generate: (value, { buildLocator }) => {
    const normalized = normalize(value);
    const { allowScroll, xPercent, yPercent, force, ...locator } = normalized;
    const lines = [buildLocator(locator)];
    if (allowScroll) {
      lines.push("  .scrollIntoView({ block: 'nearest', inline: 'nearest' })");
    }
    lines.push("  .should('be.visible')");

    const clickOptions = force ? "{ force: true }" : null;

    if (xPercent !== undefined || yPercent !== undefined) {
      const resolvedX = typeof xPercent === "number" ? xPercent : 50;
      const resolvedY = typeof yPercent === "number" ? yPercent : 50;
      lines.push("  .then(($el) => {");
      lines.push("    const element = $el[0];");
      lines.push(
        "    if (!element) { throw new Error('tapOn: expected element to click'); }"
      );
      lines.push("    const rect = element.getBoundingClientRect();");
      lines.push(`    const x = rect.width * ${resolvedX} / 100;`);
      lines.push(`    const y = rect.height * ${resolvedY} / 100;`);
      const clickArgs = ["x", "y"];
      if (clickOptions) {
        clickArgs.push(clickOptions);
      }
      lines.push(`    cy.wrap($el).click(${clickArgs.join(", ")});`);
      lines.push("  })");
    } else {
      lines.push(clickOptions ? `  .click(${clickOptions})` : "  .click()");
    }

    return `${lines.join("\n")};`;
  },
};
