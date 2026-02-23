# `pause`

Pause test execution for interactive debugging.

## Input Overview

Accepted payload shapes:

- omitted (no payload)
- `null`
- `true`
- `false`

Payload value is accepted for validation compatibility and does not change output.

## Defaults

- Behavior is always the same regardless of payload value.

## Example

```yaml
- pause
```

## Generated code

```js
cy.pause();
```
