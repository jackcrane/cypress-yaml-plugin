# `setViewport`

Set Cypress viewport dimensions with `cy.viewport(width, height)`.

## Input Overview

Accepted payload shape:

- object payload

Object payload fields:

| Field    | Type        | Required | Notes                      |
| -------- | ----------- | -------- | -------------------------- |
| `width`  | integer > 0 | yes      | Viewport width in pixels.  |
| `height` | integer > 0 | yes      | Viewport height in pixels. |

## Defaults

- No defaults. Both `width` and `height` are required.

## Example

```yaml
- setViewport:
    width: 1280
    height: 720
```

## Generated code

```js
cy.viewport(1280, 720);
```
