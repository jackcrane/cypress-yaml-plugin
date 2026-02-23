---
layout: home

title: cypress-yaml-plugin
hero:
  name: cypress-yaml-plugin
  text: Cypress specs from plain YAML
  tagline: A practical YAML preprocessor for Cypress with schema validation, source maps, and custom command support.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Built-in Commands
      link: /reference/commands

features:
  - title: Fast feedback
    details: Validate YAML early and see readable errors with line numbers before test generation.
  - title: Real Cypress output
    details: Generate formatted .cy.js files with inline source maps that work well in the Cypress runner.
  - title: Extensible by design
    details: Register your own YAML commands with schemas so validation and IntelliSense stay in sync.
---

## What this plugin does

`cypress-yaml-plugin` converts `.yaml` / `.yml` specs into runnable Cypress tests.

You write this:

```yaml
name: Login smoke
steps:
  - open: /login
  - typeText:
      dataCy: email
      text: tester@example.com
  - tapOn:
      dataCy: submit
  - assertVisible:
      text: Welcome
```

It generates Cypress JavaScript and keeps a source map back to the YAML.

## Who this is for

- Teams that want readable, reviewable E2E specs.
- Projects that need schema-backed authoring with editor autocomplete.
- Test suites that want reusable, higher-level commands in YAML.

## Quick links

- [Getting Started](/getting-started)
- [Writing Specs](/guide/writing-specs)
- [Locator Reference](/guide/locators)
- [Built-in Commands](/reference/commands)
- [CLI Reference](/reference/cli)
- [JavaScript API](/reference/api)
