import { z } from "zod";
import { locatorObjectBase } from "../../locator.js";

const schema = locatorObjectBase
  .extend({
    text: z.string().min(1, "assertContains.text is required"),
  })
  .superRefine((value, ctx) => {
    if (!value.selector && !value.dataCy && !value.placeholder) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "assertContains must specify selector, dataCy, or placeholder for the target element.",
      });
    }
  });

export default {
  name: "assertContains",
  description: "Assert that an element contains text",
  schema,
  generate: (value, { buildLocator }) => {
    const { text, ...locator } = value;
    return `${buildLocator(locator, { allowText: false })}.should('contain.text', ${JSON.stringify(
      text
    )});`;
  },
};
