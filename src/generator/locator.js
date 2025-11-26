import { z } from "zod";

export const locatorObjectBase = z.object({
  selector: z.string().min(1).optional(),
  dataCy: z.string().min(1).optional(),
  text: z.string().min(1).optional(),
  exact: z.boolean().optional(),
  placeholder: z.string().min(1).optional(),
  index: z.number().int().nonnegative().optional(),
});

export const locatorObjectSchema = locatorObjectBase.refine(
  (value) =>
    Boolean(value.selector || value.dataCy || value.text || value.placeholder),
  {
    message:
      "Specify selector, dataCy, placeholder, or text inside the locator object.",
  }
);

export const locatorSchema = z.union([z.string().min(1), locatorObjectSchema]);

function stringify(value) {
  return JSON.stringify(value);
}

function toAttributeSelector(name, value, exact = true) {
  const operator = exact ? "=" : "*=";
  return `[${name}${operator}"${value}"]`;
}

function createLocatorExpression(params, { allowText = true } = {}) {
  if (typeof params === "string") {
    return `cy.get(${stringify(params)})`;
  }

  if (!params || typeof params !== "object") {
    throw new Error("Locator must be a string or locator object.");
  }

  if (params.dataCy) {
    return `cy.get(${stringify(`[data-cy="${params.dataCy}"]`)})`;
  }

  if (params.selector) {
    return `cy.get(${stringify(params.selector)})`;
  }

  if (params.placeholder) {
    return `cy.get(${stringify(
      toAttributeSelector("placeholder", params.placeholder, params.exact !== false)
    )})`;
  }

  if (allowText && params.text) {
    const matchCase = params.exact === false ? "false" : "true";
    return `cy.contains(${stringify(params.text)}, { matchCase: ${matchCase} })`;
  }

  throw new Error(
    "Locator objects must include selector, dataCy, placeholder, or text."
  );
}

export function buildLocator(params, options = {}) {
  const expression = createLocatorExpression(params, options);
  if (typeof params === "object" && params && typeof params.index === "number") {
    return `${expression}.eq(${params.index})`;
  }
  return expression;
}
