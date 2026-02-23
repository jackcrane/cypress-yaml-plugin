# Writing Specs

A YAML spec is a plain object with metadata and a `steps` array.

## Minimal shape

```yaml
name: Checkout smoke
steps:
  - open: /
  - "Reached home page"
```

The string step is shorthand for `log`.

## Top-level fields

| Field         | Type             | Required | Notes                                                          |
| ------------- | ---------------- | -------- | -------------------------------------------------------------- |
| `$schema`     | string           | no       | Optional schema URL for editor tooling.                        |
| `name`        | string           | no       | Used as the `describe()` title. If missing, file name is used. |
| `description` | string (max 280) | no       | Used as the `it()` title.                                      |
| `seedFile`    | string           | no       | Adds `beforeEach(() => cy.task('db:seed', seedFile))`.         |
| `tags`        | string[]         | no       | Validated and available in spec data.                          |
| `skip`        | boolean          | no       | Accepted by schema (not currently used by code generation).    |
| `steps`       | array            | yes      | Each item is a string or a single command object.              |

## Step rules

- A command step must contain exactly one key.
- Command names must be registered (built-in or custom).
- Command payloads are validated with Zod schemas.
- Unknown commands return suggestions (for example `tapoon` -> `tapOn`).

## Full example

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/jackcrane/cypress-yaml-plugin/main/schema.json
name: Storefront smoke
description: Basic purchase path
seedFile: cypress/fixtures/db/store.json
tags:
  - smoke
  - storefront
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
```

## Validation behavior

Validation runs in this order:

1. Known command check (with close-match suggestions).
2. Command payload validation.
3. Full spec validation against the generated schema.

If validation fails, errors include useful context such as file path and step line number when available.

## Naming defaults

- Missing `name`: derived from file name (for example `signup.flow.yaml` -> `signup.flow`).
- Missing `description`: generated as `runs <name in lowercase>`.
