# JavaScript API

The package exports runtime helpers for integration and extension.

## Imports

```js
import {
  yamlPreprocessor,
  registerCommand,
  resolveCommand,
  listRegisteredCommands,
  validateSpec,
  loadYaml,
  generateJsonSchema,
  convertYamlToCypress,
  generateTest,
} from "cypress-yaml-plugin";
```

## `yamlPreprocessor(on)`

Registers a Cypress `file:preprocessor` handler.

```js
yamlPreprocessor(on);
```

Runtime behavior:

- Handles `.yaml` and `.yml` files.
- Converts YAML to Cypress JavaScript.
- Writes generated output to the target Cypress output path.

## `registerCommand(name, handler, options?)`

Adds a custom YAML command.

```js
registerCommand(
  "myCommand",
  (value, context) => `cy.log(${JSON.stringify(value)});`,
  {
    schema: myZodSchema,
    description: "Human-readable description",
    aliases: ["myAlias"],
  },
);
```

Options currently accepted:

- `schema`: Zod schema used for payload validation and JSON schema generation.
- `description`: metadata string.
- `aliases`: additional command names mapped to the same handler.
- `validate`: accepted as metadata; schema-based validation is what runs in the current pipeline.

## `resolveCommand(name)`

Returns a registered command definition or `undefined`.

## `listRegisteredCommands()`

Returns non-alias command entries sorted by name.

## `loadYaml(filePath)`

Reads and parses YAML from disk.

Returns:

- `filePath`: absolute file path
- `contents`: raw YAML text
- `data`: parsed object
- `stepMetadata`: line/range metadata for each step

## `validateSpec(spec, options?)`

Validates and normalizes parsed YAML.

Validation includes:

- known command checks
- per-command payload validation
- full spec schema validation

Returns normalized spec where:

- `name` is guaranteed
- string steps are converted to `{ name: 'log', value: string }`

## `convertYamlToCypress(filePath, options?)`

End-to-end conversion from YAML file to generated test.

```js
const result = await convertYamlToCypress("cypress/e2e/login.yaml", {
  outputFileName: "login.cy.js",
  onStage(stage, payload) {
    console.log(stage, payload);
  },
});
```

Stages:

- `parsed`
- `validated`
- `generated`

Returns:

- `code`: generated JavaScript with inline source map
- `map`: source map object
- `spec`: normalized spec object

## `generateTest(spec, context?)`

Generates Cypress JavaScript from an already validated spec object.

Useful when you handle loading/validation yourself.

## `generateJsonSchema()`

Builds a JSON schema from the live command registry (built-ins + registered custom commands).

Use this when publishing schema updates for editor IntelliSense.
