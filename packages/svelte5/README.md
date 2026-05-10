# @a3tai/mittsu-svelte5

Svelte 5 component sources for `@a3tai/mittsu`.

The package follows a source-first model: components are plain Svelte
files paired with sibling global CSS files. Distribution happens through
the `@a3tai/mittsu` CLI — you copy the source into your project and own
the code from the moment it lands. There is no runtime import surface.

## Install

```bash
npx @a3tai/mittsu init
npx @a3tai/mittsu add button input dialog popover
```

`init` writes a `components.json` to your project root and copies the
shared tokens (`tokens/tokens.css`) and `lib/cn.ts` utility. `add` copies
the requested components — sibling dependencies are pulled in
automatically (e.g. `search-input` brings `input` and `kbd`).

Some components have soft peer dependencies you'll only need if you use
those specific components:

```bash
# overlays / popovers / menus / select / combobox
npm install bits-ui

# date-aware components (Calendar, DatePicker, etc.)
npm install @internationalized/date
```

## Components

Components are grouped by category in `components/`:

- **Form**: `Button`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Toggle`,
  `RadioGroup`, `Slider`, `NumberInput`, `PinInput`, `PasswordInput`, `Select`, `Combobox`, `Field`
- **Overlay**: `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `Sheet`,
  `Drawer`, `DropdownMenu`, `ContextMenu`, `Command`, `Toast`
- **Layout**: `Container`, `Stack`, `HStack`, `VStack`, `Flex`, `Box`,
  `Section`, `ScrollArea`, `AspectRatio`, `Skeleton`
- **Data**: `Table`, `List`, `VirtualList`, `Calendar`, `Avatar`, `Badge`,
  `Kbd`, `Spinner`
- **Navigation**: `Tabs`, `Breadcrumb`, `Accordion`, `Collapsible`
- **Feedback**: `Toast`, `Empty`, `Progress`

The full registry is in `registry.json`. See [ROADMAP.md](https://github.com/a3tai/mittsu/blob/main/ROADMAP.md)
for the full catalog and [PLAN.md](https://github.com/a3tai/mittsu/blob/main/PLAN.md)
for the wave-based shipping order.

## Tokens

`tokens/tokens.css` exposes the design system as CSS variables prefixed
with `--uin-*` (color, spacing, motion, radius, font). The file is
copied into your project by `mittsu init` and is meant to be edited —
swap palettes, retune motion durations, or add brand-specific tokens
without modifying any component source.

The package also exposes the source tree directly so you can import via
package path during development:

```css
@import '@a3tai/mittsu-svelte5/tokens/tokens.css';
@import '@a3tai/mittsu-svelte5/components/button/button.css';
```

In production you should let the CLI copy these files in instead — that
way you own them and can edit freely.

## Local development

```bash
npm --workspace @a3tai/mittsu-svelte5 run check
```

The companion package `@a3tai/mittsu-charts` ships D3-powered chart
components that share the same token system and source-first model.
