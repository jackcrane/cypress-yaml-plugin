import { z } from "zod";
import {
  locatorObjectBase,
  withParentScopeValidation,
} from "../../locator.js";

const schema = withParentScopeValidation(
  locatorObjectBase
    .extend({
      text: z.string().min(1, "typeText.text must be provided"),
      clear: z.boolean().optional(),
      submit: z.boolean().optional(),
    })
    .superRefine((value, ctx) => {
      if (!value.selector && !value.dataCy && !value.placeholder) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "typeText requires selector, dataCy, or placeholder to locate the input.",
        });
      }
    })
);

export default {
  name: "typeText",
  description: "Type into an input",
  schema,
  generate: (value, { buildLocator }) => {
    const { text, clear = true, submit, ...locator } = value;
    const locatorExpression = buildLocator(locator, { allowText: false });
    const lines = [locatorExpression];
    if (clear !== false) {
      lines.push("  .clear()");
    }
    lines.push(`  .type(${JSON.stringify(text)})`);
    if (submit) {
      lines.push("  .type('{enter}')");
    }
    return `${lines.join("\n")};`;
  },
};
