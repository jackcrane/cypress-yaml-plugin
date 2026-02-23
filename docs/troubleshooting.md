# Troubleshooting

## Unknown command

Error example:

```text
Unknown command "tapoon". Did you mean "tapOn"?
```

Fix:

- Correct the command name.
- Confirm custom command registration runs before validation/generation.

## Step shape errors

Error example:

```text
Step 3 must declare exactly one command.
```

Fix:

- Each object in `steps` must have a single key.

## Invalid command payload

Error example:

```text
Invalid payload for command "selectOption":
- selectOption: selectOption requires either option or options.
```

Fix:

- Check required fields for that command in [Built-in Commands](/reference/commands).

## `parent` and `parentCy` set together

Error example:

```text
Specify either parent or parentCy, not both.
```

Fix:

- Keep only one parent scoping field.

## YAML parse failures

Error example:

```text
Failed to parse YAML: ...
```

Fix:

- Validate YAML syntax (indentation, list markers, quoting).
- Use the schema directive for better editor diagnostics.

## Generated file issues

If Cypress points to stale JS output:

- confirm your spec matches `.yaml` / `.yml`
- verify your `specPattern`
- delete old generated `.cy.js` files and rerun

If source mapping feels off:

- confirm generated files still include inline `sourceMappingURL`
- avoid additional transpilation of generated `.cy.js` unless needed

## CLI exits non-zero

The CLI sets a non-zero exit code for validation/build/init failures.

Fix:

- run `validate` first for clearer schema feedback
- inspect file path and permissions

## Still stuck

1. Reproduce with a minimal YAML spec.
2. Compare against files in `examples/`.
3. Validate with `npx cypress-yaml validate <file>` before running Cypress.
