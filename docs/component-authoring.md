# Component authoring

Conventions for writing a new component (or porting one from
shadcn/Radix/HIG) so it slots into the registry cleanly.

## File layout

Every component lives at `packages/svelte5/components/<name>/` and
contains exactly two files:

```
components/button/
├── button.svelte
└── button.css
```

`<name>` is **kebab-case** (`search-input`, not `searchInput`).
The two files share the basename.

## The .svelte file

### Header doc comment

The first thing in the file is a markdown comment that gives a future
reader (human or LLM) a 30-second overview:

```html
<!--
@component Button — primary action element.

Three visual variants drive the chrome:
- `primary` — filled accent. The "do the thing" button. One per view.
- `ghost` — transparent body, hover-tinted.
- `outline` — neutral border.

Two sizes (`sm`, `md`) and an `icon` boolean for square hit-targets.

CSS lives in `./button.css`.
-->
```

What goes here:

- One-sentence summary
- Variants / sizes / props
- Composition (which siblings it depends on)
- Pointer to the .css file

What does NOT go here:

- API tables (the source is the API)
- Long examples (use `docs/components/<name>.md` for that)

### Script block

```svelte
<script lang="ts">
  import type {Snippet} from 'svelte';
  import type {HTMLButtonAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';

  type Variant = 'primary' | 'ghost' | 'outline';
  type Size = 'sm' | 'md';

  type Props = HTMLButtonAttributes & {
    variant?: Variant;
    size?: Size;
    class?: string;
    children?: Snippet;
  };

  let {variant = 'primary', size = 'md', class: className, children, ...rest}: Props = $props();
</script>
```

Conventions:

- **Always `<script lang="ts">`**.
- **Always `import {cn} from '../../lib/cn'`** even if the component
  has only one class — keeps the import shape consistent so the CLI
  rewriter doesn't have to special-case anything.
- **Forward native attributes** by extending `HTMLButtonAttributes` /
  `HTMLInputAttributes` / etc., then spreading `...rest` onto the
  element. This is what makes `disabled`, `aria-*`, `data-*` Just Work.
- **Named types for variants/sizes** — narrow enough that consumers
  get autocomplete; never `string`.
- **Default values in the destructure**, not in the type.

### Markup

```svelte
<button
  class={cn('uin-btn', `uin-btn-${variant}`, `uin-btn-${size}`, className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</button>
```

Conventions:

- **Class names start with `uin-<component>`** (BEM root). Variants
  layer on as `uin-<component>-<variant>`. Modifiers use the same
  pattern: `uin-<component>-<modifier>`.
- **The user's `class` prop is appended last** so they can override.
- **No `<style>` block.** All CSS lives in the sibling `.css` file.

## The .css file

```css
/* Button — see ./button.svelte. */

.uin-btn {
  display: inline-flex;
  /* ... */
}

.uin-btn-primary {
  background: var(--uin-accent);
  color: var(--uin-accent-fg);
}
```

Conventions:

- **Token-only**. Never hard-code colors, spacing, radii, durations.
  Use `var(--uin-*)`. If a value can't be expressed via a token, add
  the token to `tokens.css` first.
- **One BEM root per file** (`.uin-<component>`). Variants use
  `.uin-<component>-<variant>`; nested elements use child selectors
  like `.uin-card-pad` rather than `.uin-card .pad` so we stay flat.
- **No global selectors**, no resets, no `*`. The component's CSS
  loads alongside everyone else's.
- **Order**: base rules → sizes → variants → state (`:hover`, `:focus`,
  `:disabled`) → modifier-specific overrides.

## Composition

If your component depends on another component, import it directly:

```svelte
<script lang="ts">
  import Input from '../input/input.svelte';
  import Kbd from '../kbd/kbd.svelte';
</script>

<Input shape="pill" {...rest}>
  {#snippet leading()}<MagnifierGlyph />{/snippet}
  {#snippet trailing()}<Kbd>⌘K</Kbd>{/snippet}
</Input>
```

Two requirements:

1. The import path uses `../<name>/<name>.svelte`. The CLI rewriter
   leaves these alone; consumers keep the same sibling layout.
2. Add the dep to `registry.json`:

   ```json
   "search-input": {
     "files": [...],
     "dependencies": ["lib/cn", "input", "kbd"]
   }
   ```

   `add` resolves dependencies recursively, so a user who runs
   `mittsu add search-input` gets `input` and `kbd` along with it.

## Registry entry

When you add or rename a component, update `registry.json`:

```json
"button": {
  "name": "button",
  "description": "Primary action element with primary / ghost / outline variants.",
  "files": [
    "components/button/button.svelte",
    "components/button/button.css"
  ],
  "dependencies": ["lib/cn"]
}
```

Description conventions:

- **Single sentence**, ends with a period.
- Lead with the **purpose**, not the implementation.
- Mention variants/sizes if there are interesting ones.

## Smoke-test the component

Before opening a PR:

```bash
# 1. Verify the registry round-trips
node packages/cli/bin/mittsu.js list --registry ./packages/svelte5/registry.json

# 2. Copy your component into a temp project and inspect the output
node packages/cli/bin/mittsu.js add <your-component> \
  --target /tmp/mittsu-smoke \
  --registry ./packages/svelte5/registry.json
```

Confirm the imports inside the copied file resolve correctly. The
rewriter rewrites `../../lib/cn` to point at `paths.lib`; sibling
imports are left alone.

## Add a showcase entry

`apps/web/src/routes/components/+page.svelte` is the kitchen sink.
Import your component and add a section with the smallest set of
controls that exercises every variant:

```svelte
<section class="block" id="my-component">
  <h2>MyComponent</h2>
  <div class="row">
    <MyComponent />
    <MyComponent variant="alt" />
  </div>
</section>
```

This also serves as the manual-test loop while you iterate.

## See also

- [Tokens reference](tokens.md) — every CSS variable
- [Architecture](architecture.md) — how the registry / CLI / rewriter fit together
- [Contributing](contributing.md) — PR conventions
- The `components` Claude skill at
  `.claude/skills/components/SKILL.md` — scaffolds new
  components from a single prompt.
