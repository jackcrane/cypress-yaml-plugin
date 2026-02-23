# `typeText`

Type text into an input-like element.

## Input Overview

Accepted payload shape:

- object payload

Object payload fields:

| Field         | Type         | Required | Notes                                       |
| ------------- | ------------ | -------- | ------------------------------------------- |
| `selector`    | string       | no       | CSS selector target.                        |
| `dataCy`      | string       | no       | Shortcut for `[data-cy="..."]`.             |
| `placeholder` | string       | no       | Placeholder-based selector.                 |
| `exact`       | boolean      | no       | Affects placeholder matching behavior.      |
| `index`       | integer >= 0 | no       | Adds `.eq(index)` to locator result.        |
| `parent`      | string       | no       | Parent CSS scope.                           |
| `parentCy`    | string       | no       | Parent `[data-cy]` scope.                   |
| `text`        | string       | yes      | Text to type.                               |
| `clear`       | boolean      | no       | Clears the field before typing when `true`. |
| `submit`      | boolean      | no       | Sends `{enter}` after typing when `true`.   |

You must provide at least one of `selector`, `dataCy`, or `placeholder` to target the input.

## Defaults

- `clear`: `true`
- `submit`: `false`
- `exact` for placeholder matching behaves as exact unless set to `false`.

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
