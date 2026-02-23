# `takeScreenshot`

Capture a screenshot with `cy.screenshot(...)`.

## Payload

- omitted / null
- string name
- object with optional:
  - `name`
  - `options`

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
