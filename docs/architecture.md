# Architecture

How the pieces fit together. Useful when you're contributing,
debugging, or wondering whether the constraint you just hit is
intentional.

## High-level

```
                        ┌────────────────────────┐
                        │  Consumer project      │
                        │  (Svelte 5 / SvelteKit)│
                        └─────────────▲──────────┘
                                      │ copies files
                                      │
┌──────────────────┐     reads     ┌──┴───────────────────────┐
│  components.json ├──────────────▶│  @a3tai/mittsu CLI    │
│  (consumer-side) │               │  (Node, zero-dep)        │
└──────────────────┘               └──────────────▲───────────┘
                                                  │ fetches
                                                  │
                          ┌───────────────────────┴───────────┐
                          │  registry.json                    │
                          │  (HTTPS or local path)            │
                          └─────────────▲─────────────────────┘
                                        │ enumerates
                                        │
                         ┌──────────────┴────────────────────┐
                         │  packages/svelte5/components/<n>/  │
                         │  └── <n>.svelte + <n>.css          │
                         └────────────────────────────────────┘
```

## Repository

The repo is an npm workspace with three packages and one app:

| Path | Role |
| --- | --- |
| `packages/cli/` | The `@a3tai/mittsu` CLI npm package |
| `packages/svelte5/` | Component sources for Svelte 5 |
| `apps/web/` | SvelteKit showcase + future docs site |
| `docs/` | Source markdown docs (this folder) |
| `.claude/skills/` | Repo-aware AI workflows |

Future framework packages (`packages/react`, `packages/vue`,
`packages/svelte5-mobile`) will sit alongside `packages/svelte5/`,
each shipping their own `registry.json`.

## Registry

The registry is a single JSON manifest that enumerates every component
and what files belong to it. The CLI reads it, fetches component
files, and writes them into the consumer's project.

```json
{
  "name": "@a3tai/mittsu-svelte5",
  "version": "0.0.1",
  "framework": "svelte5",
  "tokens": { "files": ["tokens/tokens.css"] },
  "lib":    { "files": ["lib/cn.ts"] },
  "components": {
    "search-input": {
      "name": "search-input",
      "description": "Pill search field with magnifier + ⌘K hint + clear button.",
      "files": [
        "components/search-input/search-input.svelte",
        "components/search-input/search-input.css"
      ],
      "dependencies": ["lib/cn", "input", "kbd"]
    }
  }
}
```

`tokens` and `lib` are special — they ship to fixed locations
configured in `components.json`. Everything under `components` is a
component the user can `add`.

A registry is **the only source of truth** for what's installable.
The CLI doesn't enumerate the filesystem.

## CLI

`packages/cli/` is intentionally simple:

- `bin/mittsu.js` — shebang entry; defers to `src/index.js`.
- `src/index.js` — picks a command handler based on argv.
- `src/args.js` — hand-rolled argv parser (no commander/yargs to keep
  the install hop empty).
- `src/registry.js` — fetch + parse registry, fetch component files
  via fetch() or fs.readFile().
- `src/config.js` — read/write `components.json`, resolve paths.
- `src/fs-utils.js` — atomic-ish writes + the import rewriter.
- `src/commands/{init,add,list,help}.js` — one file per command.

The CLI assumes Node ≥ 18 (for native `fetch`).

### Import rewriting

When `add` copies a file, it rewrites a small set of import specifiers
so the file Just Works in the consumer's project layout. Specifically,
`from '../../lib/<name>'` (the source-tree path) becomes a relative path
to `<paths.lib>/<name>`. Sibling component imports (e.g.
`from '../input/input.svelte'`) are left alone, because the consumer
keeps the same `<other>/<other>.svelte` shape we use in-tree.

CSS files don't go through the rewriter — they have no JS imports.

## Component conventions

Every component lives in `packages/svelte5/components/<name>/` and has
exactly two files:

- `<name>.svelte` — markup + `<script lang="ts">`. No `<style>` block.
- `<name>.css` — global CSS using the `.uin-<name>*` BEM namespace.

The .svelte file imports `cn` from `../../lib/cn`. If it composes
sibling components, it imports them as `../<other>/<other>.svelte`.

Doc comment at the top of every .svelte explains:

- One-line component summary
- Variants / sizes / props
- Composition (which siblings it depends on)
- Pointer to the .css file

That comment is what shows up when an LLM (or a contributor) scans the
file. Keep it tight and accurate.

## Tokens

`tokens.css` declares ~37 CSS variables under the `--uin-*` namespace
in `:root`, plus a dark-mode override block triggered by either
`@media (prefers-color-scheme: dark)` or `data-theme="dark"`. Components
read tokens directly; they never define color/spacing/radius literals.
This is the single biggest constraint that keeps the library re-themable.

See [`tokens.md`](tokens.md) for the full list.

## Adding a framework package

When `packages/react/` (or `vue/`, etc.) gets built:

1. Mirror the `packages/svelte5/` shape — same `tokens/`, `lib/`,
   `components/`, `registry.json`.
2. Component class names stay the same (`uin-btn`, `uin-badge`, etc.)
   so the CSS files can be reused verbatim. Sharing the CSS is the
   whole reason the BEM namespace exists.
3. The CLI gets a new `framework` value to look for in
   `components.json`; the registry's `framework` field tells the CLI
   which package's registry to use.
4. Per-component `.tsx` (React) or `.vue` (Vue) sits alongside the same
   `.css` file the Svelte version uses. Markup differs; styling is
   shared.

Cross-framework parity will become mandatory once the second framework
ships. Until then, Svelte 5 is the canonical implementation.
