# `waitFor`

Pause test execution for a fixed duration.

## Input Overview

Accepted payload shapes:

- number (milliseconds)
- object payload

Object payload fields:

| Field     | Type        | Required | Notes                                   |
| --------- | ----------- | -------- | --------------------------------------- |
| `ms`      | number >= 0 | no       | Wait time in milliseconds.              |
| `seconds` | number >= 0 | no       | Wait time in seconds (converted to ms). |

At least one of `ms` or `seconds` is required.

## Defaults

- No default duration.
- If both `ms` and `seconds` are provided, `ms` is used.

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
