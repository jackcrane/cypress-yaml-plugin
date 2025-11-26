import { z } from "zod";
import { locatorObjectBase } from "../../locator.js";

const schema = locatorObjectBase
  .extend({
    text: z.string().min(1, "assertText.text must be provided"),
  })
  .superRefine((value, ctx) => {
    if (!value.selector && !value.dataCy && !value.placeholder) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "assertText must include selector, dataCy, or placeholder to locate the element.",
      });
    }
  });

export default {
  name: "assertText",
  description: "Assert that an element matches text exactly",
  schema,
  generate: (value, { buildLocator }) => {
    const { text, ...locator } = value;
    return `${buildLocator(locator, { allowText: false })}.should('have.text', ${JSON.stringify(
      text
    )});`;
  },
};
