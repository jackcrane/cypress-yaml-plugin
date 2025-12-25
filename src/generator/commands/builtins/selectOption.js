import { z } from "zod";
import {
  locatorObjectBase,
  withParentScopeValidation,
} from "../../locator.js";

const selectValuesSchema = z
  .array(z.string().min(1, "selectOption options must be non-empty strings"))
  .min(1, "selectOption.options must include at least one value");

const schema = withParentScopeValidation(
  locatorObjectBase
    .extend({
      option: z.string().min(1, "selectOption.option must be a non-empty string").optional(),
      options: selectValuesSchema.optional(),
      force: z.boolean().optional(),
    })
    .superRefine((value, ctx) => {
      if (!value.selector && !value.dataCy && !value.placeholder && !value.text) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "selectOption requires selector, dataCy, placeholder, or text to locate the <select> element.",
        });
      }
      if (!value.option && !value.options) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "selectOption requires either option or options.",
        });
      }
      if (value.option && value.options) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "selectOption accepts option or options, not both.",
        });
      }
    })
);

function serializeSelection(value) {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  return `[${value.map((entry) => JSON.stringify(entry)).join(", ")}]`;
}

export default {
  name: "selectOption",
  description: "Select option(s) within an HTML <select>",
  schema,
  generate: (value, { buildLocator }) => {
    const { option, options, force, ...locator } = value;
    const locatorExpression = buildLocator(locator);
    const selection = option ? serializeSelection(option) : serializeSelection(options);
    const forceArgument = force ? ", { force: true }" : "";
    return `${locatorExpression}\n  .select(${selection}${forceArgument});`;
  },
};
