# Locators

Most commands find elements through a shared locator format.

## Locator forms

### 1. String locator

```yaml
- tapOn: '[data-cy="submit"]'
```

Treated as `selector`.

### 2. Object locator

```yaml
- tapOn:
    dataCy: submit
    parentCy: checkout-form
    index: 0
```

## Locator fields

| Field         | Type    | Meaning                                                                   |
| ------------- | ------- | ------------------------------------------------------------------------- |
| `selector`    | string  | Raw CSS selector.                                                         |
| `dataCy`      | string  | Shortcut for `[data-cy="..."]`.                                           |
| `placeholder` | string  | Targets by input placeholder attribute.                                   |
| `text`        | string  | Text search via `cy.contains(...)` for commands that allow text locators. |
| `exact`       | boolean | Changes matching behavior for text/placeholder locators.                  |
| `index`       | number  | Adds `.eq(index)` after location.                                         |
| `parent`      | string  | Scopes search within a parent CSS selector.                               |
| `parentCy`    | string  | Scopes search within `[data-cy="..."]`.                                   |

## Matching behavior

- `dataCy` uses an exact attribute selector.
- `placeholder`:
  - default: exact match (`[placeholder="Email"]`)
  - `exact: false`: partial match (`[placeholder*="Email"]`)
- `text`:
  - default: case-sensitive contains match
  - `exact: true`: anchored regex exact match
  - `exact: false`: case-insensitive contains match

## Parent scoping

Use only one of `parent` or `parentCy`.

```yaml
- tapOn:
    dataCy: confirm
    parentCy: modal-dialog
```

Generates a parent query followed by `.find(...)` / `.contains(...)` in that scope.

## Commands that do not allow text locators

Some commands accept a `text` field for a different purpose and intentionally disable locator-by-text:

- `typeText`
- `assertContains`
- `assertText`
- `selectFile`

For these, use `selector`, `dataCy`, or `placeholder` to target the element.
