import { locatorSchema } from "../../locator.js";

export default {
  name: "scrollIntoView",
  description: "Scroll a locator into view",
  schema: locatorSchema,
  generate: (value, { buildLocator }) =>
    `${buildLocator(value)}.scrollIntoView();`,
};
