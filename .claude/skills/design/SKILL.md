---
name: design
description: The visual rulebook for @a3tai/mittsu. Use when writing or reviewing any component's markup or CSS in this repo, when a contributor asks "what should this look like?", when matching an existing component's chrome, when introducing a new variant, or when porting a component from shadcn/Radix/HIG/Material so it lands in our voice. Covers the macOS-native aesthetic, the --uin-* token system, BEM class conventions, motion language, focus rings, dark-mode discipline, and the rules that keep the kit feeling like one library instead of many.
---

# Applying design style

This is the style guide every component in `@a3tai/mittsu` answers
to. Reach for it before writing or reviewing component CSS — it
captures the small, repeated decisions that make the kit feel
coherent.

## North star

> macOS-native by default. Quiet by default. The accent color is
> earned, not sprayed.

Three things hold the kit together:

1. **Tokens, not literals** — every visual property reads from a
   `--uin-*` CSS variable. Adding a new component without adding a
   token is fine; adding a literal hex color is a regression.
2. **Composition over duplication** — buttons, badges, and
   nav-items share base atoms (`Button`, `Spinner`, `Lamp`) rather
   than reinventing them.
3. **Restraint** — one accent per surface. Animations are short
   (≤200ms). Borders are 1px hairlines. Shadows are rare and small.

## The token system

All tokens live in `packages/svelte5/tokens/tokens.css`, namespaced
`--uin-*`. See [`docs/tokens.md`](../../../docs/tokens.md) for the
full table; the categories you'll touch most:

| Category | Tokens | Use for |
| --- | --- | --- |
| Foreground | `--uin-fg`, `--uin-fg-mute`, `--uin-fg-dim`, `--uin-fg-faint` | Text + glyph color. Drop a tier per importance step. |
| Lines | `--uin-line`, `--uin-line-strong` | Borders, separators. |
| Materials | `--uin-mat-{window,sidebar,panel,row,hover,selected}` | Surface fills. Each maps to a macOS material. |
| Accent | `--uin-accent`, `--uin-accent-fg` | Primary actions, focus rings, active state. |
| Semantic | `--uin-success`, `--uin-warn`, `--uin-danger` | Status only — never for branding. |
| Spacing | `--uin-s-1` … `--uin-s-8` (4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 px) | Padding, gap, margin. Pick a token; never literal pixels. |
| Radius | `--uin-r-{sm,md,lg,xl}` | Rounded corners. |
| Motion | `--uin-dur-{1,2,3}`, `--uin-ease-standard`, `--uin-ease-emphasized` | Transitions. |
| Focus | `--uin-focus-ring` | One ring shape, used everywhere. |

If you find yourself reaching for a value not covered by a token, the
token system has a hole. Add the token first; let the component
consume it second. Drift in the token namespace is what eventually
forces a redesign.

## Type voice

Three families, each with a clear job:

- `--uin-font-ui` — system sans for **buttons, labels, inputs, body**.
  Default. You'll use this 90% of the time.
- `--uin-font-display` — NY/Iowan/Georgia serif for **page headings,
  big numbers (Stat), title cards**. Reaches for "considered" rather
  than "loud."
- `--uin-font-mono` — SF Mono for **kbd, code, tabular numbers**.
  Always paired with `font-variant-numeric: tabular-nums` when used
  for numbers.

Sizes (typical, not exhaustive):

- 10.5–11px — eyebrows, captions, kbd labels (uppercase + tracked +
  `letter-spacing: 0.06em`)
- 12.5–13px — body, button labels
- 14–17px — display values (Stat) / section subheads
- 22–28px — hero numbers, dialog titles (`--uin-font-display`)

`letter-spacing: -0.01em` for large display text; `0.04–0.06em` for
small uppercase labels. Default `letter-spacing: 0` everywhere else.

## Color voice

- **Primary action** uses `--uin-accent`. One per surface. The
  filled-accent button, the active tab, the focus ring, the selected
  row — all the same blue.
- **Secondary surfaces** lean on materials, not gray ramps. A
  hovered row is `var(--uin-mat-hover)` (a 6% black overlay); a
  selected row is `var(--uin-mat-selected)` (14% accent). The body
  underneath remains.
- **Text on accent** uses `--uin-accent-fg` (white in both themes).
  Never set white text directly.
- **Status colors** (`success`, `warn`, `danger`) are reserved for
  semantic state. Don't decorate buttons with `--uin-success` for
  branding; that's what `accent` is for.

### Dark mode discipline

Every color decision must work in both light and dark. The token
file already handles dark via `prefers-color-scheme: dark` plus an
opt-in `data-theme="dark"`. Components only need to:

- **Read tokens, not literals** — same advice as everywhere.
- **Avoid `color-mix(... white|black ...)`** for layered overlays;
  use `color-mix(... var(--uin-fg) ...)` so the overlay flips with
  the theme.
- **Use `currentColor`** for SVG strokes whenever possible, so the
  glyph inherits text color in both themes.

## Spacing rhythm

The 4-pixel base scale is non-negotiable. Use:

- `--uin-s-1` (4px) between very tight elements (icon + label)
- `--uin-s-2` (8px) for default gaps between in-row items
- `--uin-s-3` (12px) for card padding and section gaps
- `--uin-s-4` (16px) for content blocks
- `--uin-s-5+` for layout-level spacing

If you need 6px, you're probably wrong — round to 4 or 8. The grid
shows up in pixel-snapped layouts and is what makes the kit feel
intentional.

## Borders + radii

- **1px hairline borders** (`--uin-line`) for cards, inputs, dividers.
- **`--uin-line-strong`** when you want the edge to read at a glance
  (outlined buttons, active tab borders).
- Radii: pills (`999px`) for compact things (badges, search input,
  agg rows). `--uin-r-sm` (4px) for buttons, inputs. `--uin-r-md`
  (8px) for cards. `--uin-r-lg` (12px) for dialogs and overlays.

Square corners are reserved for **table cells** and edge-to-edge
panels; they look industrial in any other context.

## Motion language

- **Default duration**: `var(--uin-dur-1)` = 120ms. Use this for
  hover, focus, color transitions.
- **State changes**: `var(--uin-dur-2)` = 200ms. Progress fills,
  dialog dropdown reveal, accordion expand.
- **Long emphatic moves**: `var(--uin-dur-3)` = 320ms. Sparingly.
- **Easing**: `var(--uin-ease-standard)` (a `cubic-bezier(0.2, 0,
  0, 1)`) is the default. Use `--uin-ease-emphasized` only for
  attention-grabbing reveals.

A button hover changes background-color over 120ms. A dialog opens
in 200ms. A confetti burst is 320ms+. Anything > 320ms is a code
smell — recheck what you're animating.

## Focus rings

One shape, used everywhere:

```css
:focus-visible {
  outline: none;
  box-shadow: var(--uin-focus-ring);
}
```

`--uin-focus-ring` is a 3px ring at 40% accent. Don't override the
shape; if it doesn't look right against a surface, fix the contrast
of the surface, not the ring.

## Component-anatomy patterns

Several shapes recur often enough to be conventions:

### Pill input (search, password)

- `border-radius: 999px`
- `height: 30px`, `padding: 0 56px 0 36px` (room for leading + trailing
  adornments)
- Leading icon at `left: 12px`; trailing widget at `right: 8–10px`

### Card

- `border: 1px solid var(--uin-line)`
- `border-radius: var(--uin-r-md)` (8px)
- `background: var(--uin-mat-row)` for flat,
  accent-tinted gradient for `tinted`
- `padding: var(--uin-s-3)` by default; `padding: false` opt-out for
  cards that contain their own padded sections

### Status row (sidebar)

- Looks like a card but is interactive (clickable button)
- 4px gap between head + body
- Optional `<ProgressBar size="sm">` slotted between body and meta
- Hover lifts the border to `--uin-line-strong`

### Eyebrow + value pair

- 10.5px uppercase eyebrow above
- Display-font value below
- Used in `Stat`, page headers, intake-card "Last selected"

When you write a new component, ask: *which existing pattern is this
closest to?* Reach for that pattern's tokens and structure first.

## The .uin- BEM namespace

- **Root class**: `uin-<component-name>` (e.g. `uin-btn`, `uin-card`,
  `uin-search`)
- **Variants**: `uin-<component>-<variant>` (e.g. `uin-btn-primary`,
  `uin-badge-warn`)
- **Sizes**: `uin-<component>-<size>` (e.g. `uin-btn-md`)
- **Modifiers**: `uin-<component>-<modifier>` (e.g. `uin-btn-icon`)
- **Children of the root**: descendant selectors using a child class
  (`.uin-card-pad`), not nested type selectors

Don't use the same class as a wrapper and a child element. If the
card needs an inner padding surface, name it `.uin-card-pad`, not
`.uin-card .pad`.

## Composition first

Before writing chrome from scratch, look for an atom you can compose:

- **Need a clickable card?** Wrap content in `<Card>` and add an
  `<button>` row inside, or use `<NavItem>` directly.
- **Need a labeled input?** Compose `<Label>` + `<Input>` (with
  optional `<FieldHint>` below). Don't reinvent.
- **Need a search field?** Use `<SearchInput>` (which itself
  composes `<Input>` + `<Kbd>`).
- **Need a status indicator?** Use `<Lamp>` with the appropriate state.

If your component would compose 3+ existing primitives, that's a
sign you're building a *layout*, not a *component*. Layouts can live
in the consumer; components in the registry should be reusable
across layouts.

## Anti-patterns to avoid

These are real mistakes the codebase has made and corrected:

- ❌ Hard-coded hex colors (`background: #007aff`). ✅ Always
  `var(--uin-accent)`.
- ❌ Inline styles for color/spacing/radius. ✅ Class names + tokens.
- ❌ Component-scoped `<style>` blocks. ✅ Sibling `.css` file.
  Scoping defeats the rebase-overrides flow.
- ❌ Deeply nested CSS selectors (`.foo .bar > .baz`). ✅ Flat BEM
  classes. Specificity wars are how libraries die.
- ❌ Using `--uin-success` for "primary" buttons because the design
  was originally green. ✅ Add a custom accent override at the
  parent scope; let `--uin-success` keep its semantic meaning.
- ❌ Using `--uin-font-display` for body text "for emphasis." ✅
  Reach for weight or size before reaching for the serif.

## Gotchas

- **Material colors flip in dark mode**, but only if you used the
  token. `color-mix(... white 28% ...)` will look broken in dark;
  `color-mix(... var(--uin-fg) 28% ...)` adapts.
- **`-webkit-app-region: no-drag`** on every interactive element
  inside a Wails/Tauri title bar drag region. The Sidebar and
  Topbar live inside the drag region; their buttons need this.
- **Pill inputs need extra right padding** (~56px) so the clear
  button or kbd hint doesn't overlap the typed text. We learned
  this the hard way; it's now baked into Input.
- **Tab counts of 0 should disable the tab**, not hide it. Hiding
  causes layout jumps when the result set updates.
- **Animation easing matters more than duration**. A 120ms hover
  with default ease feels right; the same hover with `ease-in-out`
  feels mushy.

## When you're stuck

- Open the showcase (`apps/web`) and find a component close to what
  you're building. Steal liberally.
- Check `docs/tokens.md` for the full token list — there's probably
  a token already that matches the value you want.
- The `components` skill has the scaffolding workflow if
  you're starting from zero.
