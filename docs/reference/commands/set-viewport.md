# `setViewport`

Set Cypress viewport dimensions with `cy.viewport(width, height)`.

## Payload

```yaml
width: <positive integer>
height: <positive integer>
```

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
