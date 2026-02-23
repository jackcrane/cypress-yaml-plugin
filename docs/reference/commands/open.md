# `open`

Navigate to a route or URL using `cy.visit(...)`.

## Input Overview

Accepted payload shapes:

- string route/URL
- object payload

Object payload fields:

| Field     | Type   | Required | Notes                                              |
| --------- | ------ | -------- | -------------------------------------------------- |
| `path`    | string | yes      | Route or URL passed to `cy.visit(path)`.           |
| `options` | object | no       | Passed as second arg to `cy.visit(path, options)`. |

## Defaults

- No default `path`; it must be provided.
- If `options` is omitted, only `cy.visit(path)` is generated.

## Examples

```yaml
- open: /checkout
- open:
    path: /checkout
    options:
      failOnStatusCode: false
```

## Generated code

```js
cy.visit("/checkout");
cy.visit("/checkout", { failOnStatusCode: false });
```
