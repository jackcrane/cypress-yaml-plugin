# `log`

Write a message to the Cypress runner log.

## Payload

- string
- object with `message`

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
