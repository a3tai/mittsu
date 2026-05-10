# Contributing

Welcome. Here's how to land code without surprises.

## Setup

```bash
git clone <this-repo>
cd mittsu
npm install
```

The install wires the workspaces (`packages/*` + `apps/*`) so the
showcase can resolve `@a3tai/mittsu-svelte5` as a workspace package.

## Workflows

### Run the showcase

```bash
npm --workspace apps/web run dev
```

### Smoke-test the CLI against the local registry

```bash
node packages/cli/bin/mittsu.js list \
  --registry ./packages/svelte5/registry.json

node packages/cli/bin/mittsu.js add button \
  --target /tmp/mittsu-smoke \
  --registry ./packages/svelte5/registry.json
```

### Type-check everything

```bash
npm run check
```

## Adding a component

See [`docs/component-authoring.md`](component-authoring.md) for the
full convention guide. Quick recap:

1. Create `packages/svelte5/components/<name>/{<name>.svelte, <name>.css}`.
2. Use only `--uin-*` tokens for color / spacing / radii / duration.
3. Class names: `.uin-<name>`, `.uin-<name>-<variant>`.
4. Add an entry to `packages/svelte5/registry.json`.
5. Add a showcase block to `apps/web/src/routes/components/+page.svelte`.
6. Smoke-test the CLI against your new component.

The `components` Claude skill scaffolds steps 1–4 from a
single prompt.

## PR conventions

- **One component per PR** when adding to the registry. Refactors
  spanning multiple components are fine.
- **Title format**: imperative, lowercase, no trailing period.
  Examples: `add segmented-control`, `fix focus ring on input`,
  `tokens: split material colors out of accent block`.
- **Body**: a short why + a screenshot or screencast for any visible
  change. Showcase URL is fine when the change is in there.
- **Don't bump versions** in your PR. The release workflow (or a
  maintainer) handles that.

## Review checklist

If you're reviewing (or self-reviewing), walk this list:

- **Tokens, not literals.** `grep -nE '#[0-9a-f]{3,6}|rgba?\(' packages/svelte5/components/<name>/`
  should return nothing except inside the design-tokens file.
- **No `<style>` block in the .svelte file.** All CSS lives in
  `<name>.css`.
- **Class names use the `uin-` namespace.** Nothing leaks into a
  consumer's global namespace.
- **Forwarded native attributes.** Spreading `...rest` onto the root
  element. Test by passing `data-test="x"` in the showcase.
- **Keyboard + screen reader.** Tab, Enter, Space, Esc, arrow keys
  where applicable. `aria-*` attributes match the rendered behavior.
- **Dark mode.** Toggle `<html data-theme="dark">` in the showcase
  and confirm contrast holds.
- **Registry entry matches the file.** `name`, `files`, `dependencies`
  list reality.
- **CLI smoke test passes.** `mittsu add <name>` works end-to-end against
  a fresh temp directory.

The `auditing-accessibility` Claude skill walks the a11y portion of
this list automatically.

## Style

- **Imperative voice** in commit messages.
- **Third-person** in component descriptions and skill metadata
  ("Renders an icon button" — not "I render…" or "you render…").
- **Comments explain the WHY**, not the WHAT. Identifiers should
  carry the WHAT.
- **No emoji** in code or component output unless the design
  explicitly calls for one.

## Reporting bugs

Open a GitHub issue with:

- What you ran (CLI command + flags, or component used)
- What you expected
- What happened
- Browser / Node version
- Minimal reproduction repo or showcase URL if possible

## License

By contributing, you agree your changes are licensed under the same
MIT license that covers the repo.
