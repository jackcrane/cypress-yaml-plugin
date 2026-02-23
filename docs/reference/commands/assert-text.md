# `assertText`

Assert exact element text.

## Input Overview

Accepted payload shape:

- object payload

Object payload fields:

| Field         | Type         | Required | Notes                                  |
| ------------- | ------------ | -------- | -------------------------------------- |
| `selector`    | string       | no       | CSS selector target.                   |
| `dataCy`      | string       | no       | Shortcut for `[data-cy="..."]`.        |
| `placeholder` | string       | no       | Placeholder-based selector.            |
| `exact`       | boolean      | no       | Affects placeholder matching behavior. |
| `index`       | integer >= 0 | no       | Adds `.eq(index)` to locator result.   |
| `parent`      | string       | no       | Parent CSS scope.                      |
| `parentCy`    | string       | no       | Parent `[data-cy]` scope.              |
| `text`        | string       | yes      | Exact expected text value.             |

For this command, `text` is assertion content, not a text locator.

## Defaults

- No default assertion text.
- `exact` for placeholder matching behaves as exact unless set to `false`.

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
