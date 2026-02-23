# `assertNotVisible`

Assert that an element is hidden or missing.

## Payload

- locator string
- locator object with optional `mode`

`mode` values:

- `hidden` (default): uses `not.be.visible`
- `missing`: uses `not.exist`

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
