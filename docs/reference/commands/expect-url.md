# `expectUrl`

Assert on the current URL or pathname.

## Input Overview

Accepted payload shapes:

- string payload
- object payload

Object payload fields:

| Field      | Type   | Required      | Notes                               |
| ---------- | ------ | ------------- | ----------------------------------- |
| `includes` | string | conditionally | Asserts URL contains this value.    |
| `equals`   | string | conditionally | Asserts pathname equals this value. |

At least one of `includes` or `equals` is required.

## Defaults

- No default expectation.
- If both `equals` and `includes` are provided, `equals` is used.

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
