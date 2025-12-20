import { z } from "zod";
import { locatorObjectBase } from "../../locator.js";

const schema = locatorObjectBase
  .extend({
    filePath: z.string().min(1, "selectFile.filePath must be a non-empty string").optional(),
    contents: z.string().min(1, "selectFile.contents must be provided when inlining files").optional(),
    fileName: z.string().min(1, "selectFile.fileName is required when inlining files").optional(),
    mimeType: z.string().min(1, "selectFile.mimeType is required when inlining files").optional(),
    lastModified: z
      .number()
      .int()
      .nonnegative("selectFile.lastModified must be a non-negative integer timestamp")
      .optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.selector && !value.dataCy && !value.placeholder && !value.text) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "selectFile requires selector, dataCy, placeholder, or text to locate the input.",
      });
    }

    const hasFilePath = typeof value.filePath === "string" && value.filePath.length > 0;
    const inlineFields = ["contents", "fileName", "mimeType", "lastModified"];
    const providedInlineFields = inlineFields.filter(
      (field) => value[field] !== undefined
    );
    const hasAllInline = providedInlineFields.length === inlineFields.length;

    if (hasFilePath && providedInlineFields.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "selectFile accepts either filePath or inline file data (contents, fileName, mimeType, lastModified), not both.",
      });
    }

    if (!hasFilePath && providedInlineFields.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "selectFile requires filePath or inline file data (contents, fileName, mimeType, lastModified).",
      });
    }

    if (!hasFilePath && providedInlineFields.length > 0 && !hasAllInline) {
      const missing = inlineFields.filter((field) => value[field] === undefined);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `selectFile inline file data must include: ${missing.join(", ")}.`,
      });
    }
  });

export default {
  name: "selectFile",
  description: "Attach a file to an input using cy.selectFile",
  schema,
  generate: (value, { buildLocator }) => {
    const { filePath, contents, fileName, mimeType, lastModified, ...locator } = value;
    const locatorExpression = buildLocator(locator, { allowText: false });

    const fileArgument = filePath
      ? JSON.stringify(filePath)
      : JSON.stringify({
          contents,
          fileName,
          mimeType,
          lastModified,
        });

    return `${locatorExpression}\n  .selectFile(${fileArgument});`;
  },
};
