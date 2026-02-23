# `scrollIntoView`

Scroll a located element into view.

## Input Overview

Accepted payload shapes:

- string selector shorthand
- object payload

Object payload fields:

| Field         | Type         | Required | Notes                                                 |
| ------------- | ------------ | -------- | ----------------------------------------------------- |
| `selector`    | string       | no       | CSS selector target.                                  |
| `dataCy`      | string       | no       | Shortcut for `[data-cy="..."]`.                       |
| `placeholder` | string       | no       | Placeholder-based selector.                           |
| `text`        | string       | no       | Text locator via `cy.contains(...)`.                  |
| `exact`       | boolean      | no       | Locator matching behavior for `text` / `placeholder`. |
| `index`       | integer >= 0 | no       | Adds `.eq(index)` to locator result.                  |
| `parent`      | string       | no       | Parent CSS scope.                                     |
| `parentCy`    | string       | no       | Parent `[data-cy]` scope.                             |

## Defaults

- No default locator.
- String shorthand is treated as `selector`.

## Example

```yaml
- scrollIntoView: '[data-cy="footer"]'
- scrollIntoView:
    dataCy: footer
    parentCy: page
```

## Generated code

```js
cy.get('[data-cy="footer"]').scrollIntoView();
cy.get('[data-cy="page"]').find('[data-cy="footer"]').scrollIntoView();
```
