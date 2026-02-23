# `saveSnapshot`

Trigger a custom snapshot helper:

```js
cy.savePageSnapshot(name);
```

## Input Overview

Accepted payload shapes:

- non-empty string
- object payload

Object payload fields:

| Field  | Type   | Required | Notes          |
| ------ | ------ | -------- | -------------- |
| `name` | string | no       | Snapshot name. |

## Defaults

- If `name` is omitted from object payload, default name is `page`.

## Examples

```yaml
- saveSnapshot: checkout-state
- saveSnapshot:
    name: checkout-state
```

## Generated code

```js
cy.savePageSnapshot("checkout-state");
```
