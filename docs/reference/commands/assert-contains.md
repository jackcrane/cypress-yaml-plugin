# `assertContains`

Assert that an element contains text.

## Payload

Locator object plus:

- `text` (required)

Use `selector`, `dataCy`, or `placeholder` for element targeting.

## Example

```yaml
- assertContains:
    selector: '[data-cy="toast"]'
    text: Saved
```

## Generated code

```js
cy.get('[data-cy="toast"]').should("contain.text", "Saved");
```
