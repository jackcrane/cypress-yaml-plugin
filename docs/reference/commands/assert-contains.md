# `assertContains`

Assert that an element contains text.

## Input Overview

Accepted payload shape:

- object payload

Object payload fields:

| Field         | Type         | Required | Notes                                          |
| ------------- | ------------ | -------- | ---------------------------------------------- |
| `selector`    | string       | no       | CSS selector target.                           |
| `dataCy`      | string       | no       | Shortcut for `[data-cy="..."]`.                |
| `placeholder` | string       | no       | Placeholder-based selector.                    |
| `exact`       | boolean      | no       | Affects placeholder matching behavior.         |
| `index`       | integer >= 0 | no       | Adds `.eq(index)` to locator result.           |
| `parent`      | string       | no       | Parent CSS scope.                              |
| `parentCy`    | string       | no       | Parent `[data-cy]` scope.                      |
| `text`        | string       | yes      | Text expected to be contained by element text. |

For this command, `text` is assertion content, not a text locator.

## Defaults

- No default assertion text.
- `exact` for placeholder matching behaves as exact unless set to `false`.

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
