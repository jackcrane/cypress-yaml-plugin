import { z } from "zod";
import {
  locatorObjectBase,
  withParentScopeValidation,
} from "../../locator.js";

const schema = z.union([
  z.string().min(1),
  withParentScopeValidation(
    locatorObjectBase.extend({
      allowScroll: z.boolean().optional(),
    })
  ),
]);

function normalize(value) {
  if (typeof value === "string") {
    return { text: value, exact: true };
  }
  return value;
}

export default {
  name: "assertVisible",
  description: "Ensure an element is visible",
  schema,
  generate: (value, { buildLocator }) => {
    const normalized = normalize(value);
    const { allowScroll, ...locator } = normalized;
    const lines = [buildLocator(locator)];

    if (allowScroll) {
      lines.push("  .scrollIntoView({ block: 'nearest', inline: 'nearest' })");
    }

    lines.push("  .should('be.visible')");
    return `${lines.join("\n")};`;
  },
};
