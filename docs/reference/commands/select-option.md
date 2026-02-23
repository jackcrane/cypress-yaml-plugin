# `selectOption`

Select one or multiple options in an HTML `<select>` element.

## Payload

Locator object plus:

- `option` (single value), or
- `options` (array of values)
- optional `force`

Provide `option` or `options`, not both.

## Example

```yaml
- selectOption:
    dataCy: state-select
    option: California
- selectOption:
    selector: 'select[name="stores"]'
    options:
      - CA
      - NY
    force: true
```

## Generated code

```js
cy.get('[data-cy="state-select"]').select("California");
cy.get('select[name="stores"]').select(["CA", "NY"], { force: true });
```
