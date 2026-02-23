# `assertText`

Assert exact element text.

## Payload

Locator object plus:

- `text` (required)

Use `selector`, `dataCy`, or `placeholder` for element targeting.

## Example

```yaml
- assertText:
    selector: '[data-cy="status"]'
    text: Ready
```

## Generated code

```js
cy.get('[data-cy="status"]').should("have.text", "Ready");
```
