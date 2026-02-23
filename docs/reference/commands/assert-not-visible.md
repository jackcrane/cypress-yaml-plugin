# `assertNotVisible`

Assert that an element is hidden or missing.

## Input Overview

Accepted payload shapes:

- string text shorthand
- object payload

Object payload fields:

| Field         | Type                  | Required | Notes                                                 |
| ------------- | --------------------- | -------- | ----------------------------------------------------- |
| `selector`    | string                | no       | CSS selector target.                                  |
| `dataCy`      | string                | no       | Shortcut for `[data-cy="..."]`.                       |
| `placeholder` | string                | no       | Placeholder-based selector.                           |
| `text`        | string                | no       | Text locator via `cy.contains(...)`.                  |
| `exact`       | boolean               | no       | Locator matching behavior for `text` / `placeholder`. |
| `index`       | integer >= 0          | no       | Adds `.eq(index)` to locator result.                  |
| `parent`      | string                | no       | Parent CSS scope.                                     |
| `parentCy`    | string                | no       | Parent `[data-cy]` scope.                             |
| `mode`        | `hidden` \| `missing` | no       | Assertion mode.                                       |

## Defaults

- `mode`: `hidden`
- String shorthand is normalized to `{ text: <value>, exact: true }`.

## Examples

```yaml
- assertNotVisible:
    selector: '[data-cy="loading"]'
- assertNotVisible:
    selector: '[data-cy="loading"]'
    mode: missing
```

## Generated code

```js
cy.get('[data-cy="loading"]').should("not.be.visible");
cy.get('[data-cy="loading"]').should("not.exist");
```
