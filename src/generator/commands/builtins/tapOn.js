import { z } from "zod";
import { locatorObjectBase, locatorSchema } from "../../locator.js";

const tapObjectSchema = locatorObjectBase
  .extend({
    allowScroll: z.boolean().optional(),
    xPercent: z.number().min(0).max(100).optional(),
    yPercent: z.number().min(0).max(100).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.selector && !value.dataCy && !value.placeholder && !value.text) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "tapOn requires selector, dataCy, placeholder, or text.",
      });
    }
  });

const schema = z.union([locatorSchema, tapObjectSchema]);

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
    const { allowScroll, xPercent, yPercent, ...locator } = normalized;
    const lines = [buildLocator(locator)];
    if (allowScroll) {
      lines.push("  .scrollIntoView({ block: 'nearest', inline: 'nearest' })");
    }
    lines.push("  .should('be.visible')");

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
      lines.push("    cy.wrap($el).click(x, y);");
      lines.push("  })");
    } else {
      lines.push("  .click()");
    }

    return `${lines.join("\n")};`;
  },
};
