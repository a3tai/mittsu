# Component reference

Per-component reference pages will land here as we iterate. For now,
the canonical references are:

- The **kitchen sink** at [`apps/web/src/routes/components/+page.svelte`](../../apps/web/src/routes/components/+page.svelte)
  — every component rendered with its variants.
- The **doc comment at the top of each .svelte file** — props, variants,
  composition, CSS pointer.
- The **registry manifest** at [`packages/svelte5/registry.json`](../../packages/svelte5/registry.json)
  — descriptions + dependencies.

## Shipped components

| Name | Description | Source |
| --- | --- | --- |
| `badge` | Pill-shaped status / count label | [badge.svelte](../../packages/svelte5/components/badge/badge.svelte) |
| `button` | Primary action element with primary / ghost / outline variants | [button.svelte](../../packages/svelte5/components/button/button.svelte) |
| `card` | Generic surface (flat / tinted variants) | [card.svelte](../../packages/svelte5/components/card/card.svelte) |
| `chip` | Toggleable filter pill with optional count | [chip.svelte](../../packages/svelte5/components/chip/chip.svelte) |
| `input` | Base text input primitive with leading/trailing slots | [input.svelte](../../packages/svelte5/components/input/input.svelte) |
| `kbd` | Keyboard shortcut hint, styled like a key cap | [kbd.svelte](../../packages/svelte5/components/kbd/kbd.svelte) |
| `label` | Caption / eyebrow for form fields | [label.svelte](../../packages/svelte5/components/label/label.svelte) |
| `lamp` | Colored status dot with halo (idle/running/warn/fail) | [lamp.svelte](../../packages/svelte5/components/lamp/lamp.svelte) |
| `nav-item` | Sidebar navigation row with dot / label / aside slots | [nav-item.svelte](../../packages/svelte5/components/nav-item/nav-item.svelte) |
| `progress-bar` | Determinate or indeterminate progress bar | [progress-bar.svelte](../../packages/svelte5/components/progress-bar/progress-bar.svelte) |
| `search-input` | Pill search field with magnifier + ⌘K hint + clear button | [search-input.svelte](../../packages/svelte5/components/search-input/search-input.svelte) |
| `segmented-control` | Connected radio buttons sharing one rounded chassis | [segmented-control.svelte](../../packages/svelte5/components/segmented-control/segmented-control.svelte) |
| `separator` | Horizontal or vertical rule, solid or dashed | [separator.svelte](../../packages/svelte5/components/separator/separator.svelte) |
| `spinner` | Indeterminate progress ring (sm/md/lg) | [spinner.svelte](../../packages/svelte5/components/spinner/spinner.svelte) |
| `stat` | Single label + display-font value pair | [stat.svelte](../../packages/svelte5/components/stat/stat.svelte) |
| `status-row` | Compact summary card for an in-progress operation | [status-row.svelte](../../packages/svelte5/components/status-row/status-row.svelte) |
| `tabs` | Pill-style tab strip (vertical / horizontal) with optional counts | [tabs.svelte](../../packages/svelte5/components/tabs/tabs.svelte) |
| `textarea` | Multi-line text input with optional auto-resize | [textarea.svelte](../../packages/svelte5/components/textarea/textarea.svelte) |

## Quick-add

```bash
# Single component:
mittsu add button

# Several at once:
mittsu add input search-input kbd label

# Whole foundation set:
mittsu add button input search-input textarea label kbd spinner card separator
```

## What's next

See [ROADMAP.md](../../ROADMAP.md) for the queue of upcoming components
across Foundation · Display · Navigation · Form · Overlay · Layout ·
Data · Media · AI-native · Marketing · Collaborative · macOS extras.
