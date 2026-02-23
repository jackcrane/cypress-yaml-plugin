# `open`

Navigate to a route or URL using `cy.visit(...)`.

## Payload

- string path/URL
- object with `path` and optional `options`

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
