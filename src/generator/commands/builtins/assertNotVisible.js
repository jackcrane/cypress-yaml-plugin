import { z } from "zod";
import { locatorObjectBase } from "../../locator.js";

const schema = z.union([
  z.string().min(1),
  locatorObjectBase.extend({
    mode: z.enum(["hidden", "missing"]).optional(),
  }),
]);

function normalize(value) {
  if (typeof value === "string") {
    return { text: value, exact: true };
  }
  return value;
}

export default {
  name: "assertNotVisible",
  description: "Assert that an element is hidden or missing",
  schema,
  generate: (value, { buildLocator }) => {
    const normalized = normalize(value);
    const { mode = "hidden", ...locator } = normalized;
    const matcher = mode === "missing" ? "not.exist" : "not.be.visible";
    return `${buildLocator(locator)}.should('${matcher}');`;
  },
};
