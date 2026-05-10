# Design tokens

Every visual property in `@a3tai/mittsu` reads from a CSS variable
under the `--uin-*` namespace. The defaults map to macOS system
materials so components feel at home in a desktop app without
additional theming work; override at any scope to retheme.

## Where they live

After `init`, the file lives at `<paths.tokens>/tokens.css` (default
`src/lib/styles/tokens.css`). Import it once from your app entry —
that pulls every token into the global `:root` scope.

## The full set

### Color — foreground

| Variable | Default (light) | Default (dark) | Use |
| --- | --- | --- | --- |
| `--uin-fg` | `rgba(0,0,0,.88)` | `rgba(255,255,255,.92)` | Primary text |
| `--uin-fg-mute` | `rgba(0,0,0,.62)` | `rgba(255,255,255,.65)` | Secondary text |
| `--uin-fg-dim` | `rgba(0,0,0,.42)` | `rgba(255,255,255,.42)` | Captions, hints |
| `--uin-fg-faint` | `rgba(0,0,0,.18)` | `rgba(255,255,255,.18)` | Disabled |

### Color — lines

| Variable | Default (light) | Default (dark) | Use |
| --- | --- | --- | --- |
| `--uin-line` | `rgba(0,0,0,.10)` | `rgba(255,255,255,.10)` | Hairline borders |
| `--uin-line-strong` | `rgba(0,0,0,.18)` | `rgba(255,255,255,.20)` | Emphasized borders |

### Color — materials (translucent surfaces)

| Variable | Use |
| --- | --- |
| `--uin-bg-base` | App background |
| `--uin-bg-panel` | Solid panel surface |
| `--uin-mat-window` | Window background material |
| `--uin-mat-sidebar` | Sidebar material |
| `--uin-mat-panel` | Panel material |
| `--uin-mat-row` | Row / card material |
| `--uin-mat-hover` | Hover-state overlay |
| `--uin-mat-selected` | Selected-row material |

### Color — accents

| Variable | Light | Dark | Use |
| --- | --- | --- | --- |
| `--uin-accent` | `#007aff` | `#0a84ff` | Primary action color |
| `--uin-accent-fg` | `#ffffff` | `#ffffff` | Text on accent backgrounds |
| `--uin-success` | `#34c759` | `#30d158` | Success state |
| `--uin-warn` | `#ffcc00` | `#ffd60a` | Warning state |
| `--uin-danger` | `#ff453a` | `#ff453a` | Error / destructive |

### Chart tokens

Chart tokens live in `@a3tai/mittsu-charts/tokens/charts.css` and layer on
top of the core tokens. Use semantic chart tokens when the data has meaning,
then fall back to categorical tokens when series are peers.

| Variable | Use |
| --- | --- |
| `--uin-chart-1` through `--uin-chart-8` | Categorical series palette |
| `--uin-chart-critical` | Critical risk, exploited state, urgent exposure |
| `--uin-chart-danger` | High severity, failure, destructive trend |
| `--uin-chart-warning` | Warning, medium risk, attention state |
| `--uin-chart-success` | Healthy, remediated, complete state |
| `--uin-chart-info` | Informational or selected data series |
| `--uin-chart-neutral` | Baselines, archived states, low emphasis |
| `--uin-chart-grid`, `--uin-chart-axis`, `--uin-chart-crosshair` | SVG grid, axis, and pointer-rule chrome |
| `--uin-chart-surface`, `--uin-chart-surface-raised` | Chart frame backgrounds |

### Type — families

| Variable | Default | Used by |
| --- | --- | --- |
| `--uin-font-ui` | system UI sans-serif | Buttons, labels, body text |
| `--uin-font-display` | NY/Iowan/Georgia serif | Headings, large numbers (Stat) |
| `--uin-font-mono` | SF Mono / Menlo | Code, kbd, tabular numbers |

### Spacing

A 4-pixel base scale, named `s-1` through `s-8`:

| Variable | px |
| --- | --- |
| `--uin-s-1` | 4 |
| `--uin-s-2` | 8 |
| `--uin-s-3` | 12 |
| `--uin-s-4` | 16 |
| `--uin-s-5` | 20 |
| `--uin-s-6` | 24 |
| `--uin-s-7` | 32 |
| `--uin-s-8` | 48 |

### Radii

| Variable | px |
| --- | --- |
| `--uin-r-sm` | 4 |
| `--uin-r-md` | 8 |
| `--uin-r-lg` | 12 |
| `--uin-r-xl` | 16 |

### Motion

| Variable | Default |
| --- | --- |
| `--uin-dur-1` | `120ms` |
| `--uin-dur-2` | `200ms` |
| `--uin-dur-3` | `320ms` |
| `--uin-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--uin-ease-emphasized` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### Focus

| Variable | Default |
| --- | --- |
| `--uin-focus-ring` | 3px ring at 40% accent |

## Theming recipes

### Brand color override (whole app)

```css
:root {
  --uin-accent: #ff5722;
  --uin-accent-fg: #ffffff;
}
```

Every component picks it up immediately — `Button.primary`, the
`Lamp.running` halo, focus rings, badges, tab indicators, etc.

### Per-region theme

Override at any scope, not just `:root`:

```svelte
<aside data-region="docs">
  <slot />
</aside>

<style>
  [data-region="docs"] {
    --uin-accent: #6366f1;
  }
</style>
```

Components inside that region pick up the indigo accent without
affecting the rest of the app.

### Dark mode

Three modes, listed in order of precedence:

1. **Forced light** — set `<html data-theme="light">`. Ignores system.
2. **Forced dark** — set `<html data-theme="dark">`. Ignores system.
3. **Auto** — leave `data-theme` unset. The token file's
   `@media (prefers-color-scheme: dark)` block kicks in when the
   system is dark.

### Custom material (frosted blur)

Some Wails / Tauri apps want a frosted-glass background:

```css
:root {
  --uin-mat-window: color-mix(in srgb, white 35%, transparent);
}
html { backdrop-filter: blur(40px) saturate(1.4); }
```

Components that use `--uin-mat-window` (Topbar, Sidebar) inherit the
frost without component-level edits.

## Adding new tokens

Tokens belong in `tokens.css`. Conventions:

- Always under `--uin-*`
- Add to both `:root` and the dark-mode block (if color-related)
- Document new tokens in this file
- If the token represents a discrete scale step (spacing/radius), keep
  the numbering monotonic

When in doubt, prefer adding a new token over a one-off literal in a
component CSS file. Tokens are the contract; literals are the leak.
