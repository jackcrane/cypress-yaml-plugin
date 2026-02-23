# `selectFile`

Attach a file to a file input with `cy.selectFile(...)`.

## Input Overview

Accepted payload shape:

- object payload

Object payload fields:

| Field          | Type         | Required      | Notes                                                                       |
| -------------- | ------------ | ------------- | --------------------------------------------------------------------------- |
| `selector`     | string       | no            | CSS selector target.                                                        |
| `dataCy`       | string       | no            | Shortcut for `[data-cy="..."]`.                                             |
| `placeholder`  | string       | no            | Placeholder-based selector.                                                 |
| `text`         | string       | no            | Accepted by schema, but text-only targeting is not supported in generation. |
| `exact`        | boolean      | no            | Affects placeholder matching behavior.                                      |
| `index`        | integer >= 0 | no            | Adds `.eq(index)` to locator result.                                        |
| `parent`       | string       | no            | Parent CSS scope.                                                           |
| `parentCy`     | string       | no            | Parent `[data-cy]` scope.                                                   |
| `filePath`     | string       | conditionally | Path-based file selection mode.                                             |
| `contents`     | string       | conditionally | Inline file mode field.                                                     |
| `fileName`     | string       | conditionally | Inline file mode field.                                                     |
| `mimeType`     | string       | conditionally | Inline file mode field.                                                     |
| `lastModified` | integer >= 0 | conditionally | Inline file mode field.                                                     |

Provide one file mode only:

- `filePath`, or
- all inline file fields (`contents`, `fileName`, `mimeType`, `lastModified`)

## Defaults

- No default locator.
- No default file mode.
- Inline mode has no partial defaults; all four inline fields are required together.

## Examples

```yaml
- selectFile:
    dataCy: upload-input
    filePath: cypress/fixtures/users.csv
```

```yaml
- selectFile:
    selector: 'input[type="file"]'
    contents: Inline file contents
    fileName: inline.txt
    mimeType: text/plain
    lastModified: 1700000000000
```

## Generated code

```js
cy.get('[data-cy="upload-input"]').selectFile("cypress/fixtures/users.csv");
cy.get('input[type="file"]').selectFile({
  contents: "Inline file contents",
  fileName: "inline.txt",
  mimeType: "text/plain",
  lastModified: 1700000000000,
});
```
