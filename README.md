# cypress-yaml-plugin

A batteries-included Cypress preprocessor that converts YAML specs into runnable `.cy.js` files with schematized validation, extensible commands, and first-class DX.

## Highlights
- ✅ Zod-powered validation with readable errors and schema publishing for IntelliSense
- ✅ Modular command registry with built-in actions and runtime registration for custom steps
- ✅ YAML loader + generator pipeline that emits formatted JS, inline sourcemaps, and Cypress-friendly output
- ✅ CLI for validation, build, and schema bootstrapping
- ✅ Examples covering all built-ins, locator shapes, and extension scenarios

## Installation
```bash
npm install --save-dev cypress-yaml-plugin
```
After installing, generate the JSON schema any time commands change:
```bash
npm run build:schema
```
The resulting `schema.json` is referenced by IDEs.

## Cypress configuration
Register the preprocessor inside `cypress.config.js` (or `.ts`).
```js
// cypress.config.js
import { defineConfig } from 'cypress';
import { yamlPreprocessor } from 'cypress-yaml-plugin';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      yamlPreprocessor(on);
    },
    specPattern: 'cypress/e2e/**/*.yaml',
  },
});
```
Now Cypress automatically turns matching `.yaml`/`.yml` files into `.cy.js` artifacts with sourcemaps.

## YAML authoring workflow
Each YAML file should begin with the schema directive for VS Code / `yaml-language-server`:
```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/jackcrane/cypress-yaml-plugin/main/schema.json
name: Storefront smoke
seedFile: cypress/fixtures/db/store.json
steps:
  - open: /
  - setViewport:
      width: 1280
      height: 720
  - tapOn:
      dataCy: primary-cta
      allowScroll: true
  - typeText:
      selector: '[data-cy="email-field"]'
      text: tester@example.com
  - assertContains:
      selector: '[data-cy="welcome"]'
      text: Welcome
  - takeScreenshot: dashboard
  - "Reached dashboard"
```
Use `force: true` inside `tapOn` definitions when you need to click through overlays or hidden targets—the option defaults to `false` so standard taps remain unchanged.

All built-in commands live under `src/generator/commands/builtins/` and have one-to-one YAML mappings. See `/examples` for a full walkthrough of locators, assertions, and control helpers.

### selectFile command

Attach fixtures or dynamically constructed files to inputs using `selectFile`. The command accepts the same locators as `tapOn`/`typeText` and can target by `selector`, `dataCy`, `placeholder`, or `text`.

```yaml
- selectFile:
    dataCy: upload-input
    filePath: cypress/fixtures/users.csv
```

Inline file definitions are also supported by providing all of `contents`, `fileName`, `mimeType`, and `lastModified`:

```yaml
- selectFile:
    selector: 'input[type="file"]'
    contents: Inline file contents
    fileName: inline.txt
    mimeType: text/plain
    lastModified: 1700000000000
```

Specify either a `filePath` or the inline object—mixing modes is rejected during validation, and missing fields yield a descriptive error before generation.

## CLI usage
```bash
# Validate a spec without generating code
npx cypress-yaml validate examples/storefront.yaml

# Build a Cypress test next to the YAML
npx cypress-yaml build examples/storefront.yaml

# Emit generated JS to stdout (useful for CI pipelines)
npx cypress-yaml build examples/storefront.yaml --stdout

# Insert/refresh the $schema directive
npx cypress-yaml init e2e/specs/login.yaml
```
The CLI prints the same friendly errors as the preprocessor and exits non-zero when validation fails.

## Custom command registration
Commands are registered at runtime and exposed through `registerCommand`.
```js
import { registerCommand } from 'cypress-yaml-plugin';
import { z } from 'zod';

registerCommand('screenshotAndDiff', (value) => [
  `cy.screenshot(${JSON.stringify(value.name)})`,
  `cy.task('visual:diff', { name: ${JSON.stringify(value.name)}, baseline: ${JSON.stringify(value.baseline)} });`,
], {
  schema: z.object({
    name: z.string().min(1),
    baseline: z.string().min(1),
    threshold: z.number().nonnegative().optional(),
  }),
});
```
Once registered (usually in `setupNodeEvents`), YAML can use:
```yaml
- screenshotAndDiff:
    name: hero-current
    baseline: hero
    threshold: 0.01
```
The validator and JSON schema automatically absorb runtime registrations, so IDE autocomplete and CLI validation stay accurate without forking the package.

## Error messaging & troubleshooting
Example output for an unknown command:
```
Unknown command "tapoon". Did you mean "tapOn"?
Suggestion: Allowed commands: open, tapOn, typeText, ...
```
Other helpful hints include:
- file/line numbers sourced from YAML token ranges
- schema documentation link appended to each validation failure
- locator-specific guidance (e.g., `typeText` complaining about missing selectors)

If you run into sourcemap mismatches, ensure the generated `.cy.js` file retains the inline `sourceMappingURL` comment and that Cypress is not transpiling the output again.

## Extensibility checklist
1. Register custom commands before calling `validateSpec` or running the CLI.
2. Provide a Zod schema (or manual validator) so the JSON schema stays up-to-date.
3. Rerun `npm run build:schema` after adding commands to publish the new schema.
4. Drop new commands into separate modules under `src/generator/commands/builtins/` for easy maintenance.

## Examples directory
- `examples/storefront.yaml` – touches every built-in command.
- `examples/locators.yaml` – showcases selector/text/placeholder locators.
- `examples/invalid-command.yaml` – demonstrates error messaging.
- `examples/custom-command.yaml` – pairs with the registration snippet above.

Use these fixtures with the CLI (`cypress-yaml build examples/storefront.yaml`) to verify the full pipeline end-to-end.
