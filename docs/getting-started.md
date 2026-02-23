# Getting Started

This guide gets you from install to a running YAML Cypress spec.

## 1. Install

```bash
npm install --save-dev cypress-yaml-plugin
```

## 2. Register the preprocessor in Cypress

```js
// cypress.config.js
import { defineConfig } from "cypress";
import { yamlPreprocessor } from "cypress-yaml-plugin";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      yamlPreprocessor(on);
    },
    specPattern: "cypress/e2e/**/*.yaml",
  },
});
```

Notes:

- `yamlPreprocessor(on)` registers a `file:preprocessor` handler.
- `specPattern` should match your YAML spec location.
- `.yml` files are also supported.

## 3. Create your first spec

```yaml
# cypress/e2e/login.yaml
name: Login smoke
steps:
  - open: /login
  - typeText:
      dataCy: email
      text: tester@example.com
  - typeText:
      dataCy: password
      text: super-secret
  - tapOn:
      dataCy: login-submit
  - assertVisible:
      text: Dashboard
```

## 4. Run Cypress

Run Cypress as usual (`cypress open` or `cypress run`).

When Cypress picks up a YAML spec, the plugin generates a sibling `.cy.js` file and returns that to Cypress.

## 5. Add schema IntelliSense (recommended)

At the top of each YAML spec, add:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/jackcrane/cypress-yaml-plugin/main/schema.json
```

Or use the CLI to insert it:

```bash
npx cypress-yaml init cypress/e2e/login.yaml
```

## 6. Validate from the command line

```bash
npx cypress-yaml validate cypress/e2e/login.yaml
```

This catches invalid commands and payload errors before test execution.

## Generated output model

Given a valid spec, the generated Cypress test has this shape:

- `describe(<spec.name>)`
- optional `beforeEach` calling `cy.task('db:seed', seedFile)` when `seedFile` is set
- `it(<description or default>, () => { ...steps })`

Continue with:

- [Writing Specs](/guide/writing-specs)
- [Built-in Commands](/reference/commands)
