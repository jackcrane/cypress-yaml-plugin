# Custom Commands

`cypress-yaml-plugin` supports runtime command registration, so your YAML can call project-specific actions.

## Registering a command

```js
import { registerCommand } from "cypress-yaml-plugin";
import { z } from "zod";

registerCommand(
  "screenshotAndDiff",
  (value) => [
    `cy.screenshot(${JSON.stringify(value.name)});`,
    `cy.task('visual:diff', ${JSON.stringify({ baseline: value.baseline })});`,
  ],
  {
    description: "Capture screenshot and run visual diff task",
    schema: z.object({
      name: z.string().min(1),
      baseline: z.string().min(1),
      threshold: z.number().nonnegative().optional(),
    }),
    aliases: ["visualDiff"],
  },
);
```

## YAML usage

```yaml
steps:
  - screenshotAndDiff:
      name: hero-current
      baseline: hero
  - visualDiff:
      name: checkout-current
      baseline: checkout
```

## Handler contract

The handler receives:

- `value`: validated payload from YAML.
- `context`: object with `buildLocator`, `spec`, and `stepIndex`.

Return value can be:

- a string of JavaScript, or
- an array of JavaScript lines (joined with newlines).

## Validation and schema impact

When a command includes a `schema`:

- YAML payloads are validated before generation.
- The generated JSON schema is refreshed, so editor autocomplete can include your command.

## Important constraints

- Command names must be unique.
- Command names and aliases are trimmed.
- Handler must be a function.
- Register commands before calling validation/generation/CLI if you need them available there.

## About `validate` option

`registerCommand()` accepts an optional `validate` field in options, but the current pipeline validates payloads using the provided Zod `schema`.
