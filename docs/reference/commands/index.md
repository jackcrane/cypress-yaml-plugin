# Built-in Commands

Each built-in command has its own page.

## Navigation and timing

- [`open`](./open)
- [`setViewport`](./set-viewport)
- [`waitFor`](./wait-for)

## Interaction

- [`tapOn`](./tap-on)
- [`typeText`](./type-text)
- [`selectOption`](./select-option)
- [`selectFile`](./select-file)
- [`scrollIntoView`](./scroll-into-view)

## Assertions

- [`assertVisible`](./assert-visible)
- [`assertNotVisible`](./assert-not-visible)
- [`assertContains`](./assert-contains)
- [`assertText`](./assert-text)
- [`expectUrl`](./expect-url)

## Utilities

- [`log`](./log)
- [`takeScreenshot`](./take-screenshot)
- [`saveSnapshot`](./save-snapshot)
- [`pause`](./pause)

## String step shorthand

A string entry in `steps` is treated as a `log` command.

```yaml
steps:
  - "Reached checkout"
```

Equivalent generated code:

```js
cy.log("Reached checkout");
```
