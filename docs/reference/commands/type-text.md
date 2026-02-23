# `typeText`

Type text into an input-like element.

## Payload

Locator object plus:

- `text` (required)
- `clear` (optional, default `true`)
- `submit` (optional)

For this command, locator must use `selector`, `dataCy`, or `placeholder`.

## Example

```yaml
- typeText:
    dataCy: email
    text: tester@example.com
- typeText:
    selector: 'input[name="search"]'
    text: keyboard
    clear: false
    submit: true
```

## Generated code

```js
cy.get('[data-cy="email"]').clear().type("tester@example.com");
cy.get('input[name="search"]').type("keyboard").type("{enter}");
```
