import { z } from "zod";

export const locatorObjectBase = z.object({
  selector: z.string().min(1).optional(),
  dataCy: z.string().min(1).optional(),
  text: z.string().min(1).optional(),
  exact: z.boolean().optional(),
  placeholder: z.string().min(1).optional(),
  index: z.number().int().nonnegative().optional(),
  parent: z.string().min(1).optional(),
  parentCy: z.string().min(1).optional(),
});

export function withParentScopeValidation(schema) {
  return schema.superRefine((value, ctx) => {
    if (value.parent && value.parentCy) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Specify either parent or parentCy, not both.",
        path: ["parent"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Specify either parent or parentCy, not both.",
        path: ["parentCy"],
      });
    }
  });
}

export const locatorObjectSchema = withParentScopeValidation(
  locatorObjectBase.refine(
    (value) =>
      Boolean(value.selector || value.dataCy || value.text || value.placeholder),
    {
      message:
        "Specify selector, dataCy, placeholder, or text inside the locator object.",
    }
  )
);

export const locatorSchema = z.union([z.string().min(1), locatorObjectSchema]);

function stringify(value) {
  return JSON.stringify(value);
}

function toAttributeSelector(name, value, exact = true) {
  const operator = exact ? "=" : "*=";
  return `[${name}${operator}"${value}"]`;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
}

function textContainsArguments(target) {
  if (target.exactMatch) {
    const escaped = escapeRegex(target.value);
    const pattern = `/^${escaped}$/`;
    const flags = target.matchCase ? "" : "i";
    return flags ? `${pattern}${flags}` : pattern;
  }

  const matchCase = target.matchCase ? "true" : "false";
  return `${stringify(target.value)}, { matchCase: ${matchCase} }`;
}

function buildContainsCall(prefix, target) {
  return `${prefix}.contains(${textContainsArguments(target)})`;
}

function createParentExpression(params) {
  if (!params || typeof params !== "object") {
    return null;
  }
  if (params.parentCy) {
    return `cy.get(${stringify(`[data-cy="${params.parentCy}"]`)})`;
  }
  if (params.parent) {
    return `cy.get(${stringify(params.parent)})`;
  }
  return null;
}

function resolveTarget(params, allowText) {
  if (typeof params === "string") {
    return { type: "selector", value: params };
  }

  if (!params || typeof params !== "object") {
    throw new Error("Locator must be a string or locator object.");
  }

  if (params.dataCy) {
    return {
      type: "selector",
      value: `[data-cy="${params.dataCy}"]`,
    };
  }

  if (params.selector) {
    return { type: "selector", value: params.selector };
  }

  if (params.placeholder) {
    return {
      type: "selector",
      value: toAttributeSelector(
        "placeholder",
        params.placeholder,
        params.exact !== false
      ),
    };
  }

  if (allowText && params.text) {
    return {
      type: "text",
      value: params.text,
      matchCase: params.exact !== false,
      exactMatch: params.exact === true,
    };
  }

  throw new Error(
    "Locator objects must include selector, dataCy, placeholder, or text."
  );
}

function buildTargetExpression(target) {
  if (target.type === "selector") {
    return `cy.get(${stringify(target.value)})`;
  }
  if (target.type === "text") {
    return buildContainsCall("cy", target);
  }
  throw new Error("Unknown locator target type.");
}

function buildScopedExpression(parentExpression, target) {
  if (target.type === "selector") {
    return `${parentExpression}.find(${stringify(target.value)})`;
  }
  if (target.type === "text") {
    return buildContainsCall(parentExpression, target);
  }
  throw new Error("Unknown locator target type.");
}

function createLocatorExpression(params, { allowText = true } = {}) {
  const target = resolveTarget(params, allowText);
  const parentExpression = createParentExpression(params);
  const expression = parentExpression
    ? buildScopedExpression(parentExpression, target)
    : buildTargetExpression(target);
  return expression;
}

export function buildLocator(params, options = {}) {
  const expression = createLocatorExpression(params, options);
  if (typeof params === "object" && params && typeof params.index === "number") {
    return `${expression}.eq(${params.index})`;
  }
  return expression;
}
