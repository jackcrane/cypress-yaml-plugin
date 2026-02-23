# `assertVisible`

Assert that a locator resolves to a visible element.

## Payload

- locator string
- locator object with optional `allowScroll`

## Examples

```yaml
- assertVisible: '[data-cy="banner"]'
- assertVisible:
    text: Continue
    allowScroll: true
```

## Generated code

```js
cy.get('[data-cy="banner"]').should("be.visible");
cy.contains("Continue", { matchCase: true })
  .scrollIntoView({ block: "nearest", inline: "nearest" })
  .should("be.visible");
```
