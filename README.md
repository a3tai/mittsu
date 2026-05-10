# @a3tai/mittsu

> **Native-ish UI primitives. Copy into your project. Own the source.**

[![Status](https://img.shields.io/badge/status-pre--release-orange)](#status)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Svelte 5](https://img.shields.io/badge/svelte-5-FF3E00)](https://svelte.dev)
[![Components](https://img.shields.io/badge/components-18%20shipped%20%E2%80%A2%20140%2B%20roadmap-success)](ROADMAP.md)

[Website](https://mittsu.dev) · [GitHub](https://github.com/a3tai/mittsu) · Sponsored by [A3T](https://a3t.ai)

A shadcn-style component library tuned to feel native on macOS / iOS,
extensible to React and Vue, and shipped through a CLI that drops raw
source into your project. Tokens are CSS variables; chrome is BEM
classes; the moment you need to change something, you fork the file.

## Quick start

```bash
# In your Svelte 5 project:
npx @a3tai/mittsu@latest init
npx @a3tai/mittsu@latest add button badge spinner
```

Then in your code:

```svelte
<script>
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<Button>Hello</Button>
```

## Why another component library?

| | shadcn/ui | Mantine / Chakra | **@a3tai/mittsu** |
|---|---|---|---|
| Distribution | Copy via CLI | npm dependency | **Copy via CLI** |
| Framework | React | React | **Svelte 5 (React/Vue planned)** |
| Aesthetic | Tailwind, neutral | Branded | **macOS/iOS native, retunable** |
| Theming | Tailwind classes | Theme provider | **CSS variable tokens** |
| Headless deps | Radix | None / own | **Bits UI (where needed)** |
| AI-native components | none | none | **First-class** *(roadmap)* |
| You own the source | yes | no | **yes** |

## What's in the box

### Foundation
`Button` · `Input` · `SearchInput` · `Textarea` · `Label` · `Spinner` · `Card` · `Separator`

### Display
`Badge` · `Chip` · `Lamp` · `ProgressBar` · `Stat` · `Kbd`

### Navigation & Actions
`NavItem` · `Tabs` · `SegmentedControl` · `StatusRow`

### Charts
`AreaChart` · `LineChart` · `BarChart` · `DonutChart` · `RadarChart` ·
`RadialChart` live in `packages/charts` and use D3 for scales, paths, arcs,
radar geometry, and stacking. Shared `ChartFrame` and `ChartTooltip` primitives
keep legends, metrics, tooltips, and accessible data tables consistent.

A further ~140 components are on the [roadmap](ROADMAP.md), grouped by:
Foundation · Display · Navigation · Actions · Form · Overlay · Layout
· Data · Media · **AI-native** · Marketing · Collaborative · macOS
extras · Hardware/desktop chrome.

## Showcase

A full SvelteKit demo lives in [`apps/web`](apps/web/). Run locally:

```bash
npm install
npm --workspace apps/web run dev
```

Pages: `/` (landing), `/components` (kitchen sink), `/charts` (chart gallery),
`/docs` (getting started).

## Repo layout

```
mittsu/
├── README.md · LICENSE · ROADMAP.md
├── docs/                    ← markdown reference docs
├── .claude/skills/          ← repo-aware AI skills (add-component, port-component, release, …)
├── packages/
│   ├── cli/                 ← @a3tai/mittsu CLI (Node, zero-dep)
│   └── svelte5/             ← @a3tai/mittsu-svelte5 component sources
│       ├── tokens/          ← design tokens (CSS variables)
│       ├── lib/             ← cn() utility
│       ├── components/      ← one folder per component (.svelte + .css)
│       └── registry.json    ← CLI manifest
└── apps/
    └── web/                 ← SvelteKit showcase + future public site
```

## Architecture decisions

- **Per-component CSS file**, BEM-style class names, no Svelte scoping.
  Consumers import CSS once globally; classes can be overridden at any
  layer. CSS travels with the component when copied.
- **Composition over duplication**. `SearchInput` composes `Input` +
  `Kbd`; the CLI follows component dependencies and pulls siblings
  along automatically. No magic re-exports.
- **Tokens, not theme files**. 37 CSS variables under the `--uin-*`
  namespace cover color, type, spacing, radius, motion, and focus.
  Override at any scope to retheme. Dark mode via `prefers-color-scheme`
  + `data-theme="dark"` opt-in.
- **CLI is zero-dep Node**. `npx @a3tai/mittsu` doesn't pay an
  install hop the first time someone tries it.
- **Imports rewritten on copy**. `../../lib/cn` is rewritten to point at
  whatever path you've configured in `components.json`, so the file
  Just Works after copy.
- **Headless where it matters**. Dialog, Popover, Tooltip, Combobox,
  Calendar will compose [`bits-ui`](https://bits-ui.com/) — same role
  Radix plays for shadcn — when they ship.

## Documentation

| Page | What it covers |
| --- | --- |
| [docs/getting-started.md](docs/getting-started.md) | Install, init, add your first component |
| [docs/cli.md](docs/cli.md) | Full CLI reference |
| [docs/tokens.md](docs/tokens.md) | Every design token + theming recipes |
| [docs/architecture.md](docs/architecture.md) | How the registry, CLI, and rewriter fit together |
| [docs/component-authoring.md](docs/component-authoring.md) | Writing a new component the right way |
| [docs/contributing.md](docs/contributing.md) | PR conventions, review checklist |
| [docs/components/](docs/components/) | Per-component reference pages |
| [ROADMAP.md](ROADMAP.md) | The full ~155-component catalog |
| [PLAN.md](PLAN.md) | Wave-based build order for the next-batch components |

## Status

**Pre-release.** APIs may change. The CLI is functional against a
local registry; the public hosted registry is not yet up. Not
recommended for production use until the v0.1 tag.

## Contributing

PRs welcome. See [`docs/contributing.md`](docs/contributing.md). The
quickest way to contribute a new component is via the
[`add-component`](.claude/skills/add-component/SKILL.md) Claude skill —
it scaffolds the .svelte + .css + registry entry from a single prompt.

## License

MIT. See [LICENSE](LICENSE).
