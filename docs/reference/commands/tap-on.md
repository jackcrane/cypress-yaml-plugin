# `tapOn`

Click an element using a locator.

## Input Overview

Accepted payload shapes:

- string selector shorthand
- object payload

Object payload fields:

| Field         | Type          | Required | Notes                                                 |
| ------------- | ------------- | -------- | ----------------------------------------------------- |
| `selector`    | string        | no       | CSS selector target.                                  |
| `dataCy`      | string        | no       | Shortcut for `[data-cy="..."]`.                       |
| `placeholder` | string        | no       | Placeholder-based selector.                           |
| `text`        | string        | no       | Text locator via `cy.contains(...)`.                  |
| `exact`       | boolean       | no       | Locator matching behavior for `text` / `placeholder`. |
| `index`       | integer >= 0  | no       | Adds `.eq(index)` to locator result.                  |
| `parent`      | string        | no       | Parent CSS scope.                                     |
| `parentCy`    | string        | no       | Parent `[data-cy]` scope.                             |
| `allowScroll` | boolean       | no       | Scroll into view before visibility assertion.         |
| `xPercent`    | number 0..100 | no       | Horizontal click position.                            |
| `yPercent`    | number 0..100 | no       | Vertical click position.                              |
| `force`       | boolean       | no       | Uses forced click behavior.                           |

You must provide at least one locator field: `selector`, `dataCy`, `placeholder`, or `text`.

## Defaults

- `allowScroll`: `false`
- `force`: `false`
- Coordinate mode is off unless `xPercent` or `yPercent` is provided.
- In coordinate mode, missing axis defaults to `50`.

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
