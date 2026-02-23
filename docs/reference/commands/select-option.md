# `selectOption`

Select one or multiple options in an HTML `<select>` element.

## Input Overview

Accepted payload shape:

- object payload

Object payload fields:

| Field         | Type         | Required      | Notes                                                 |
| ------------- | ------------ | ------------- | ----------------------------------------------------- |
| `selector`    | string       | no            | CSS selector target.                                  |
| `dataCy`      | string       | no            | Shortcut for `[data-cy="..."]`.                       |
| `placeholder` | string       | no            | Placeholder-based selector.                           |
| `text`        | string       | no            | Text locator via `cy.contains(...)`.                  |
| `exact`       | boolean      | no            | Locator matching behavior for `text` / `placeholder`. |
| `index`       | integer >= 0 | no            | Adds `.eq(index)` to locator result.                  |
| `parent`      | string       | no            | Parent CSS scope.                                     |
| `parentCy`    | string       | no            | Parent `[data-cy]` scope.                             |
| `option`      | string       | conditionally | Single selected value.                                |
| `options`     | string[]     | conditionally | Multiple selected values.                             |
| `force`       | boolean      | no            | Passes `{ force: true }` to Cypress select.           |

You must provide exactly one of `option` or `options`.

## Defaults

- `force`: `false`
- No default selected option.

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
