# Getting started

This guide walks you from "empty project" to "first component
rendering" in about five minutes.

## Prerequisites

- Node.js ≥ 18
- A Svelte 5 project (SvelteKit or any Svelte 5 + Vite setup)

## 1. Initialize

From your project root:

```bash
npx @a3tai/mittsu@latest init
```

This does three things:

1. Writes `components.json` at your project root (CLI config).
2. Copies the design tokens (`tokens.css`) into your project.
3. Copies the `cn` class-merger utility into your project.

After init, your tree looks like:

```
your-project/
├── components.json
├── src/lib/styles/tokens.css     ← imported once
├── src/lib/utils/cn.ts           ← used by components
└── ...
```

You can override any of those paths via `components.json` (see
[CLI reference](cli.md#configuration)).

## 2. Import the tokens once

Pull the tokens into your global stylesheet or app entry. For a
SvelteKit project, the cleanest spot is `src/routes/+layout.svelte`:

```svelte
<script>
  import '$lib/styles/tokens.css';
</script>
```

Or `src/app.html` / `src/app.css`. The tokens declare ~37 CSS
variables under the `--uin-*` namespace; every component uses them.

## 3. Add components

Pull components in à-la-carte:

```bash
npx @a3tai/mittsu@latest add button badge spinner
```

Sibling dependencies follow automatically. Adding `search-input`
brings `input` and `kbd` along, for example. Each component lands as a
folder containing the `.svelte` source and a `.css` file:

```
src/lib/components/ui/
├── button/
│   ├── button.svelte
│   └── button.css
├── badge/
│   ├── badge.svelte
│   └── badge.css
└── spinner/
    ├── spinner.svelte
    └── spinner.css
```

## 4. Wire the component CSS

Each component's CSS is global (no Svelte scoping). You can import
all of them at once from your app entry, or import per-route /
per-component. The simplest path is global:

```css
/* src/app.css */
@import './lib/styles/tokens.css';
@import './lib/components/ui/button/button.css';
@import './lib/components/ui/badge/badge.css';
@import './lib/components/ui/spinner/spinner.css';
```

## 5. Use the components

```svelte
<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Spinner from '$lib/components/ui/spinner/spinner.svelte';
</script>

<Button>Hello</Button>
<Badge variant="accent">New</Badge>
<Spinner />
```

That's it. Every component is plain Svelte 5 + token-driven CSS, so
forward attributes, bind values, and slot snippets work normally.

## Where next?

- [CLI reference](cli.md) — every command + flag
- [Design tokens](tokens.md) — full token list + theming recipes
- [Component authoring](component-authoring.md) — when you fork a
  component or write a new one
- [Architecture](architecture.md) — how the registry / CLI / rewriter
  fit together
