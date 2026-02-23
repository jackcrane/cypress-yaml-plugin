# `selectFile`

Attach a file to a file input with `cy.selectFile(...)`.

## Payload

Locator object plus one input mode:

- `filePath`, or
- inline file object with all fields:
  - `contents`
  - `fileName`
  - `mimeType`
  - `lastModified`

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
