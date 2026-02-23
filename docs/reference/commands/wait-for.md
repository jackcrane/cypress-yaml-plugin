# `waitFor`

Pause test execution for a fixed duration.

## Payload

- number (milliseconds)
- object with `ms` or `seconds`

## Examples

```yaml
- waitFor: 500
- waitFor:
    ms: 250
- waitFor:
    seconds: 1.5
```

## Generated code

```js
cy.wait(500);
cy.wait(250);
cy.wait(1500);
```
