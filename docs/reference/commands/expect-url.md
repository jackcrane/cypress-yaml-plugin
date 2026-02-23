# `expectUrl`

Assert on the current URL or pathname.

## Payload

- string: URL should include value
- object with one of:
  - `includes`
  - `equals`

## Examples

```yaml
- expectUrl: /dashboard
- expectUrl:
    includes: /checkout
- expectUrl:
    equals: /checkout/complete
```

## Generated code

```js
cy.url().should("include", "/dashboard");
cy.url().should("include", "/checkout");
cy.location("pathname").should("eq", "/checkout/complete");
```
