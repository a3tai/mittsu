---
name: components
description: Scaffolds a new component for the @a3tai/mittsu Svelte 5 registry. Use when the user asks to add a new component (e.g. "add a Tooltip", "we need a Toast", "create a Drawer"), when they ask to extract repeated UI from an app into the registry, or when porting from another library and the porting-components skill points back here for the file scaffolding step. Produces a properly structured <name>.svelte + <name>.css file pair, registers the entry in registry.json, adds a showcase block, and smoke-tests via the local CLI.
---

# Building components

Add a new component to `packages/svelte5/components/` so it's
installable via `mittsu add <name>`.

## When to use this skill

- User asks to add a component to the registry
- User asks for a primitive that doesn't exist yet ("we need a
  Tooltip", "build a Drawer", etc.)
- The `porting-components` skill is in use and you've reached the
  "scaffold the file" step

## Before you start

Read the design rulebook: [`design/SKILL.md`](../design/SKILL.md).
That file is the source of truth for tokens, class names, motion,
and composition rules. Everything below assumes you've internalized it.

If headless behavior is involved (focus trap, escape handling,
roving tabindex, click-outside, positioning), check whether
[`bits-ui`](https://bits-ui.com/) already has it. We compose its
primitives for Dialog, Popover, Tooltip, Combobox, Calendar, Select,
RadioGroup, Tabs (for managed state), and similar. Don't reinvent.

## Workflow

Copy this checklist into your reply and work through it:

```
Building <name>:
- [ ] 1. Confirm the name is available + correct shape (kebab-case)
- [ ] 2. Confirm composition: does it depend on other components / lib utilities?
- [ ] 3. Create components/<name>/<name>.svelte + components/<name>/<name>.css
- [ ] 4. Add the registry entry to packages/svelte5/registry.json
- [ ] 5. Add a showcase block to apps/web/src/routes/components/+page.svelte
- [ ] 6. Smoke-test the CLI against the local registry
- [ ] 7. Run svelte-check
- [ ] 8. (If touching tokens) update docs/tokens.md
```

### 1. Pick a name

- **kebab-case** (`drop-down-menu`, not `DropdownMenu` or `dropdown_menu`)
- Singular (one component, even if it includes subparts)
- Match the shadcn/Bits UI/Radix name when there's an obvious analog
  — that's how we keep the discovery surface familiar

Verify availability:

```bash
node packages/cli/bin/mittsu.js list \
  --registry ./packages/svelte5/registry.json | grep <name>
```

### 2. Sketch the API

Before opening files, decide:

- **Variants** (`variant?: 'primary' | 'ghost'`) — visual chrome
  alternatives
- **Sizes** (`size?: 'sm' | 'md' | 'lg'`) — only add what you can
  show in the showcase
- **Slots** (snippets) — what content the consumer plugs in
- **Composition** — does this build on `Input`, `Button`, `Lamp`, etc.?
  If yes, list the dependencies; the registry needs them.
- **Bound state** — `value`, `open`, etc. with `$bindable()`

Keep the API small. Three variants + two sizes is plenty for v1.

### 3. Create the files

#### `<name>.svelte`

Header doc-comment, then `<script lang="ts">`, then markup. **No
`<style>` block** — CSS lives in the sibling file.

```svelte
<!--
@component <Name> — <one-line summary>.

<Variants paragraph: name + when to use each>

<Composition note if any>

CSS lives in `./<name>.css`.
-->
<script lang="ts">
  import type {Snippet} from 'svelte';
  import type {HTMLButtonAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';

  type Variant = 'primary' | 'ghost';
  type Props = HTMLButtonAttributes & {
    variant?: Variant;
    class?: string;
    children?: Snippet;
  };

  let {variant = 'primary', class: className, children, type = 'button', ...rest}: Props = $props();
</script>

<button
  {type}
  class={cn('uin-<name>', `uin-<name>-${variant}`, className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</button>
```

Imports:

- `cn` from `'../../lib/cn'` — always, even if you only use it for one
  class. The CLI rewriter expects this exact path.
- Sibling components from `'../<other>/<other>.svelte'`. The rewriter
  leaves these alone; consumers keep the same sibling shape.

#### `<name>.css`

Plain CSS. No Svelte scoping. Class names use the `.uin-<name>` BEM
root.

```css
/* <Name> — see ./<name>.svelte. */

.uin-<name> {
  /* base layout + chrome */
}
.uin-<name>-primary { /* variant */ }
.uin-<name>-ghost { /* variant */ }
```

**Token-only**. If you need a value not covered, add the token to
`packages/svelte5/tokens/tokens.css` first.

### 4. Register the component

Edit `packages/svelte5/registry.json`. Add an entry alphabetically
into `components`:

```json
"<name>": {
  "name": "<name>",
  "description": "<single sentence describing the purpose>.",
  "files": [
    "components/<name>/<name>.svelte",
    "components/<name>/<name>.css"
  ],
  "dependencies": ["lib/cn", "<other-component>", "<another-other>"]
}
```

Description guidance:

- Lead with the purpose, not the implementation
- Mention the interesting variants/sizes if any
- Single sentence, ends with a period
- Third person ("Renders a …", not "I render …")

Dependencies:

- Always include `"lib/cn"` (every component imports it)
- List other component names by their kebab-case key
- Order: `lib/*` first, then components alphabetically

### 5. Showcase block

Open `apps/web/src/routes/components/+page.svelte` and add a section
that renders every variant. The pattern:

```svelte
<section class="block" id="<name>">
  <h2><Name></h2>
  <div class="row">
    <Name />
    <Name variant="ghost" />
    <Name disabled />
  </div>
</section>
```

The kitchen sink also doubles as your manual test loop. Run the
showcase (`npm --workspace apps/web run dev`) and click through the
variants in light + dark mode.

### 6. Smoke-test the CLI

```bash
# 1. List should include the new component
node packages/cli/bin/mittsu.js list \
  --registry ./packages/svelte5/registry.json | grep <name>

# 2. Add into a temp project and inspect
rm -rf /tmp/mittsu-smoke
mkdir -p /tmp/mittsu-smoke
node packages/cli/bin/mittsu.js init \
  --registry ./packages/svelte5/registry.json \
  --target /tmp/mittsu-smoke
node packages/cli/bin/mittsu.js add <name> \
  --registry ./packages/svelte5/registry.json \
  --target /tmp/mittsu-smoke
```

Confirm:

- All declared `files` were copied
- All `dependencies` (sibling components) followed along
- Imports inside the copied .svelte file resolve sensibly
  (`../../lib/cn` should have become `../../<some>/cn` based on
  `paths.lib`; sibling component imports should still say
  `../<other>/<other>.svelte`)

### 7. Type-check

```bash
npm --workspace packages/svelte5 run check
npm --workspace apps/web run check
```

Both should return 0 errors and 0 warnings. Pre-existing warnings
elsewhere are OK; new ones in your component aren't.

### 8. Tokens (only if you added any)

If your component needed a new token, update
[`docs/tokens.md`](../../../docs/tokens.md) — every token in
`tokens.css` should be discoverable from the docs.

## Inputs

What you need before invoking this skill:

- Component name (kebab-case)
- Visual reference or specification (existing library, screenshot,
  Figma URL — any of those)
- Composition decision: does it build on existing components?

## Output format

Final response should include:

1. The new files: `components/<name>/<name>.svelte`,
   `components/<name>/<name>.css`
2. The updated registry entry
3. The new showcase block
4. CLI smoke-test output (the path-write log)
5. svelte-check output

## Examples

### Adding a Tooltip

User: *"Add a Tooltip component."*

1. Name: `tooltip` (matches shadcn/Bits UI/Radix)
2. Composition: `bits-ui`'s `Tooltip` for the headless behavior
   (positioning, focus-on-hover, escape close); our chrome on top.
3. Variants: just `default` (no need for sizes — content drives size)
4. Files: `tooltip.svelte` (composes `Tooltip.Root`, `Tooltip.Trigger`,
   `Tooltip.Content` from bits-ui), `tooltip.css` (`.uin-tooltip`,
   `.uin-tooltip-arrow`)
5. Registry deps: `["lib/cn"]` plus the npm dep `bits-ui` (note in
   the description that this requires `npm install bits-ui`)

### Adding a `Stepper`

User: *"We need a stepper for the auth wizard."*

1. Name: `stepper`
2. Composition: just our atoms (`Lamp` for step status dots)
3. Variants: `direction: 'horizontal' | 'vertical'`
4. Files: `stepper.svelte` taking `steps: {label: string; status:
   'pending' | 'active' | 'done' | 'error'}[]`
5. Registry deps: `["lib/cn", "lamp"]`

## Gotchas

- **Don't forget the registry entry.** A file without a registry
  row isn't reachable via `mittsu add`; it's just dead code.
- **Don't forget the showcase block.** A component without a
  showcase entry is one nobody can see.
- **Don't ship a component that breaks svelte-check.** The CI
  fence is svelte-check passing; new files have to pass cleanly.
- **Don't add tokens silently.** A token added to `tokens.css`
  but not to `docs/tokens.md` is a contract gap.
- **Don't bypass `cn()`.** Always go through it for class names —
  it handles falsy / array / record forms consistently. Doing
  inline string concat works until someone passes `class={undefined}`
  and gets the literal string "undefined" in their HTML.
- **Don't compose `<Input>` for a non-input.** Reach for the right
  primitive. If your "select" is really a button + dropdown, that's
  Button + Popover, not Input.
- **The CLI rewriter only touches `../../lib/cn`.** If you import
  from `../../lib/something-else`, it won't be rewritten and the
  copied file will break. Either keep the import to `cn`, or extend
  the rewriter (see `packages/cli/src/fs-utils.js`).
