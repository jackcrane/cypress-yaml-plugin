# `scrollIntoView`

Scroll a located element into view.

## Payload

Any supported locator (string or locator object).

## Example

```yaml
- scrollIntoView: '[data-cy="footer"]'
- scrollIntoView:
    dataCy: footer
    parentCy: page
```

## Generated code

```js
cy.get('[data-cy="footer"]').scrollIntoView();
cy.get('[data-cy="page"]').find('[data-cy="footer"]').scrollIntoView();
```
