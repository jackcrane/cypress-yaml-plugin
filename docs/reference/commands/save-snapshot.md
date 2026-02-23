# `saveSnapshot`

Trigger a custom snapshot helper:

```js
cy.savePageSnapshot(name);
```

## Payload

- string name
- object with optional `name`

## Examples

```yaml
- saveSnapshot: checkout-state
- saveSnapshot:
    name: checkout-state
```

## Generated code

```js
cy.savePageSnapshot("checkout-state");
```

If no name is resolved, default is `page`.
