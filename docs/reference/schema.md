# Schema and IntelliSense

The project can generate a JSON schema from command definitions.

## Why this matters

With a schema, editors can provide:

- autocomplete for command names
- inline validation errors
- quick docs on fields

## Use the published schema

Add this line at the top of your YAML file:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/jackcrane/cypress-yaml-plugin/main/schema.json
```

You can also insert it with:

```bash
npx cypress-yaml init cypress/e2e/spec.yaml
```

## Generate schema locally

When built-ins or custom command definitions change, regenerate schema:

```bash
npm run build:schema
```

This runs `scripts/build-schema.js` and updates `schema.json`.

## How schema generation works

- Built-in commands register at module load.
- Custom commands added through `registerCommand()` are also part of the registry.
- `generateJsonSchema()` builds a schema from the current registry.

That means schema output can include runtime-registered command payloads.

## IDE setup notes

For VS Code with `yaml-language-server`:

- keep the directive at the top of each YAML file, or
- map your YAML glob to the schema in workspace settings

## Caveats

- If you register custom commands after schema generation, rerun schema build.
- If command schemas change, regenerate schema to keep editor hints accurate.
