# `tapOn`

Click an element using a locator.

## Payload

- locator string (`selector` shorthand)
- locator object with optional tap behavior:
  - `allowScroll`
  - `xPercent`
  - `yPercent`
  - `force`

Locator fields are documented in [Locators](/guide/locators).

## Examples

```yaml
- tapOn: '[data-cy="submit"]'
- tapOn:
    dataCy: submit
    allowScroll: true
    force: true
- tapOn:
    selector: '[data-cy="chart"]'
    xPercent: 25
    yPercent: 75
```

## Generated behavior

- Builds locator chain.
- Optional `.scrollIntoView(...)` when `allowScroll: true`.
- Adds `.should('be.visible')` before clicking.
- Uses normal click or coordinate click based on `xPercent` / `yPercent`.
