# `assertVisible`

Assert that a locator resolves to a visible element.

## Input Overview

Accepted payload shapes:

- string text shorthand
- object payload

Object payload fields:

| Field         | Type         | Required | Notes                                                 |
| ------------- | ------------ | -------- | ----------------------------------------------------- |
| `selector`    | string       | no       | CSS selector target.                                  |
| `dataCy`      | string       | no       | Shortcut for `[data-cy="..."]`.                       |
| `placeholder` | string       | no       | Placeholder-based selector.                           |
| `text`        | string       | no       | Text locator via `cy.contains(...)`.                  |
| `exact`       | boolean      | no       | Locator matching behavior for `text` / `placeholder`. |
| `index`       | integer >= 0 | no       | Adds `.eq(index)` to locator result.                  |
| `parent`      | string       | no       | Parent CSS scope.                                     |
| `parentCy`    | string       | no       | Parent `[data-cy]` scope.                             |
| `allowScroll` | boolean      | no       | Scroll before visibility assertion.                   |

## Defaults

- `allowScroll`: `false`
- String shorthand is normalized to `{ text: <value>, exact: true }`.

## Examples

```yaml
- assertVisible: '[data-cy="banner"]'
- assertVisible:
    text: Continue
    allowScroll: true
```

## Generated code

```js
cy.get('[data-cy="banner"]').should("be.visible");
cy.contains("Continue", { matchCase: true })
  .scrollIntoView({ block: "nearest", inline: "nearest" })
  .should("be.visible");
```
