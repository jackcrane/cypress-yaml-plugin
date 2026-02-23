# `log`

Write a message to the Cypress runner log.

## Input Overview

Accepted payload shapes:

- string payload
- object payload

Object payload fields:

| Field     | Type   | Required | Notes                            |
| --------- | ------ | -------- | -------------------------------- |
| `message` | string | yes      | Message passed to `cy.log(...)`. |

## Defaults

- No default message.

## Example

```yaml
- log: Starting checkout
- log:
    message: Starting checkout
```

## Generated code

```js
cy.log("Starting checkout");
```
