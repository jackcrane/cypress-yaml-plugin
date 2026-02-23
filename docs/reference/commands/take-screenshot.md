# `takeScreenshot`

Capture a screenshot with `cy.screenshot(...)`.

## Input Overview

Accepted payload shapes:

- omitted (no payload)
- `null`
- non-empty string
- object payload

Object payload fields:

| Field     | Type   | Required | Notes                       |
| --------- | ------ | -------- | --------------------------- |
| `name`    | string | no       | Screenshot name.            |
| `options` | object | no       | Cypress screenshot options. |

## Defaults

- Omitted payload, `null`, or empty object all produce `cy.screenshot()`.
- String payload is trimmed before generation.
- If only `options` is provided, generation uses `cy.screenshot(undefined, options)`.

## Examples

```yaml
- takeScreenshot
- takeScreenshot: checkout
- takeScreenshot:
    name: checkout
    options:
      capture: viewport
```

## Generated code

```js
cy.screenshot();
cy.screenshot("checkout");
cy.screenshot("checkout", { capture: "viewport" });
```
