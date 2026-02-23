# CLI Reference

The package ships with the `cypress-yaml` CLI.

## Usage

```bash
npx cypress-yaml <command> <file> [options]
```

## Commands

### `validate <file>`

Validates YAML without generating JavaScript.

```bash
npx cypress-yaml validate cypress/e2e/storefront.yaml
```

Success output:

```text
√ Spec is valid
```

Failure behavior:

- Prints a validation error.
- Exits with a non-zero code.

### `build <file>`

Generates Cypress JavaScript from YAML.

```bash
npx cypress-yaml build cypress/e2e/storefront.yaml
```

By default, output path is derived from input:

- `storefront.yaml` -> `storefront.cy.js`
- `storefront.yml` -> `storefront.cy.js`

#### `--stdout`

Write generated code to stdout instead of writing a file.

```bash
npx cypress-yaml build cypress/e2e/storefront.yaml --stdout
```

Useful for CI checks or piping into other tooling.

### `init <file>`

Inserts the YAML schema directive at the top of a file.

```bash
npx cypress-yaml init cypress/e2e/storefront.yaml
```

Behavior:

- Adds `# yaml-language-server: $schema=...` if missing.
- If already present, prints a no-op message.

## Exit behavior

For all commands:

- success: exit code `0`
- failure: non-zero exit code with human-readable error text

## Common patterns

Validate before build:

```bash
npx cypress-yaml validate cypress/e2e/spec.yaml && npx cypress-yaml build cypress/e2e/spec.yaml
```

Preview generated code:

```bash
npx cypress-yaml build cypress/e2e/spec.yaml --stdout
```
