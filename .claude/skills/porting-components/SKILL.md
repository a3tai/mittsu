---
name: porting-components
description: Port a component from another library (shadcn/ui, Radix, Bits UI, Mantine, Park UI, Apple HIG, Material 3) into @a3tai/mittsu's Svelte 5 conventions. Use when the user references an existing component by name from one of those libraries ("port shadcn's Accordion", "we want HIG's Stepper", "translate Material 3's chip group"), when consulting ROADMAP.md for the next batch, or when the user provides a screenshot/URL of a component they want recreated. Reuses components for the file scaffolding step but adds the source-mapping work that comes before it.
---

# Porting components

Bring a component from shadcn/Radix/Bits UI/Mantine/Park UI/HIG/
Material 3 into our Svelte 5 conventions. Most of the components on
[`ROADMAP.md`](../../../ROADMAP.md) get added this way.

## When to use this skill

- User says "port shadcn's X", "we want Bits UI's Y", "translate
  HIG's Z"
- User points at a screenshot or URL of an existing component
- You're working through `ROADMAP.md` and need to bring a 🟡-tagged
  component into the registry

For pure scaffolding (the file/registry/showcase steps), this skill
delegates to `components`. The work that's *unique* to
porting is everything before that.

## Workflow

```
Porting <name> from <source>:
- [ ] 1. Identify the source library + the canonical reference page
- [ ] 2. Map the source API → our conventions (props, variants, slots)
- [ ] 3. Decide composition: which existing primitives + which bits-ui
- [ ] 4. Adapt the chrome to our tokens (no literals from the source)
- [ ] 5. Hand off to `components` for the scaffolding
- [ ] 6. Cross-check the showcase against the source side-by-side
- [ ] 7. Update ROADMAP.md status (🟡 → ✅)
```

### 1. Identify the source

Common sources and what they're good for:

| Source | When to reach for it |
| --- | --- |
| **shadcn/ui** | The closest visual / API match for most web components. Default reference for Tailwind-tinted neutral-look components. |
| **Radix Primitives** | The unstyled behavior layer behind shadcn — useful when shadcn's chrome doesn't fit but you want their accessibility. |
| **Bits UI** | Our headless primitive of choice for Svelte 5. Use for Dialog, Popover, Tooltip, Combobox, Calendar, Select, Tabs (managed). |
| **Mantine** | Larger/richer primitive set than shadcn — pull from here for AvatarGroup, Indicator, NumberInput, Spotlight, etc. |
| **Park UI / Ark UI** | Cross-framework headless. Worth checking for parity ideas. |
| **Apple HIG** | Source of truth for macOS-native variants — TrafficLights, OutlineView, ColorWell, SegmentedControl proportions, Sheet shape. |
| **Material 3 Expressive** | Newer aesthetic ideas (button groups, split buttons, motion physics). Adapt the *idea*, not the colors. |

Find the canonical reference page (link the user can click). Note
whether the component has accessibility patterns we'd lose by
re-implementing — if so, we should compose `bits-ui`.

### 2. Map the API

Build a small table:

```
Source: shadcn Accordion (https://ui.shadcn.com/docs/components/accordion)

Source           | Ours
-----------------+--------------------------------------
<Accordion>      | <Accordion items={...}>
<AccordionItem>  | (collapsed into items prop)
<AccordionTrigger>| (label per item)
<AccordionContent>| (children snippet per item)
type=single|multi| mode: 'single' | 'multi'
collapsible      | collapsible: boolean
```

Decisions to call out explicitly:

- **Compound components vs single component**? shadcn often uses a
  compound API (`<Tabs>` + `<TabsList>` + `<TabsTrigger>` +
  `<TabsContent>`); we tend to prefer single components with
  prop-driven structure. Pick whichever matches the rest of our
  registry — Tabs is single (props-driven), so Accordion should be too.
- **Snippets vs render-as-prop**? We use Svelte 5 snippets
  (`{#snippet name()}…{/snippet}` + `{@render name()}`). The
  component receives them as `Snippet` props.
- **Bound state vs callbacks**? Prefer `value = $bindable()` for
  primary state (selected tab, current step, popover open). Use
  `onChange?: (next: T) => void` for derived events.

### 3. Decide composition

For most ports, the answer is one of:

- **Pure visual** (Badge, Card, Stat) — no headless dep. Our chrome.
- **Compose existing atoms** (SearchInput composes Input + Kbd;
  Stepper composes Lamp). The component is glue; the atoms are reused.
- **Compose `bits-ui`** for headless behavior (Dialog, Popover,
  Tooltip, Combobox, Calendar, Select). Our chrome layers on top.

If you reach for `bits-ui`, note in the registry description that
the component requires `npm install bits-ui` in the consumer
project.

### 4. Adapt the chrome

This is the design work. The source's class names, hex colors,
shadow values are *suggestions*, not specifications. Translate
them into our token system:

- Source uses `bg-blue-500` → `var(--uin-accent)`
- Source uses `text-gray-500` → `var(--uin-fg-mute)`
- Source uses `rounded-lg` → `var(--uin-r-md)` (8px)
- Source uses `transition-all duration-200` → `var(--uin-dur-2)
  var(--uin-ease-standard)` on the specific properties (never `all`)
- Source uses `text-sm` (14px) → 13px (our default body size)
- Source uses `font-sans` → `var(--uin-font-ui)`

If a value can't be expressed in our tokens, **add the token first**.
Don't smuggle a literal in.

For HIG / Material 3 ports, pay particular attention to:

- **Proportions** (button height, control padding, corner radii) —
  HIG controls are typically 24–28px tall; Material is taller.
  Match HIG for the macOS-native default.
- **Density** — macOS prefers compact; Material prefers airy. Default
  toward compact.
- **Motion language** — HIG is short and snappy (≤200ms); Material
  Expressive plays longer with physics-based curves. Stay short.

### 5. Scaffold via components

Once the API + composition + chrome are decided, hand off to the
`components` skill for the actual file creation. Pass it:

- The component name (kebab-case)
- The Props type you sketched in step 2
- The composition decision from step 3
- The CSS rules in token form from step 4

### 6. Side-by-side check

Open the source's showcase + our showcase in two tabs. Walk every
variant. The visual should *evoke* the source without being a
pixel-clone — same purpose, our voice.

Specifically check:

- Does our component fail in dark mode where the source doesn't
  have a dark theme? (Dark mode is non-negotiable for us.)
- Does our component handle a 0-result state where the source
  doesn't? (We disable rather than hide.)
- Does our component ship the keyboard support the source has?
  (Check tab, arrow keys, Enter, Space, Esc.)

### 7. Update ROADMAP

In [`ROADMAP.md`](../../../ROADMAP.md), flip the component's status
from 🟡 → ✅. Bump the "Counts" totals at the bottom.

## Output format

Final response should include:

1. The source-to-ours mapping table
2. Composition decision (atoms / bits-ui / pure-visual)
3. Token mapping rationale for any non-obvious choices
4. The output of the `components` handoff (files, registry,
   showcase, smoke test)
5. ROADMAP.md status update

## Examples

### Porting shadcn's `Accordion`

Source: https://ui.shadcn.com/docs/components/accordion

Mapping:

```
Compound API → single-component API:
items: { value, label, content }[]
mode: 'single' | 'multi'
collapsible: boolean
```

Composition: pure visual (the disclosure logic is small enough to
inline; bits-ui has Accordion but it's overkill here). Reach for
`<details>`/`<summary>` semantics with custom chrome on top.

Token mapping:

- `bg-muted` → `var(--uin-mat-row)`
- `border-b` → `border-bottom: 1px solid var(--uin-line)`
- `text-foreground` → `var(--uin-fg)`
- `transition-all duration-200` → `transition: max-height 200ms
  var(--uin-ease-standard)` on the panel only

### Porting HIG's `SegmentedControl`

Source: https://developer.apple.com/design/human-interface-guidelines/segmented-controls

Mapping:

```
options: {value, label, icon?}[]
value (bindable)
size: 'sm' | 'md'
```

Composition: pure visual. We already shipped this; the file is the
canonical example of an HIG port.

Token mapping:

- HIG control height 24–28px → `sm`=24, `md`=30 (slightly taller for
  comfortable web hit-targets)
- HIG selected fill (white→blue gradient) → flat
  `color-mix(in srgb, var(--uin-accent) 14%, transparent)` so it
  works in dark mode
- HIG separators (1px hairline between segments) → `border-left:
  1px solid var(--uin-line)` on `.uin-seg-btn + .uin-seg-btn`

## Gotchas

- **Don't copy Tailwind classes.** They won't work without Tailwind
  in the consumer's project, and they hide the structural intent.
  Translate to BEM + token-driven CSS.
- **Don't ship the source's API verbatim.** shadcn's compound
  components are nice in React; in Svelte they often become
  awkwardly slot-heavy. Pick the API that fits Svelte 5 idioms.
- **Don't forget bits-ui as a peer dep.** If your port composes a
  bits-ui primitive, the component description and registry entry
  should call it out. Consumers expect to install peer deps; not
  expecting them is the surprise.
- **Don't import from `'svelte/legacy'`.** Even if you find a
  Svelte 4 reference implementation online, our codebase is Svelte 5
  runes-mode (`$props`, `$state`, `$bindable`).
- **Don't ship animations longer than 320ms.** Material 3
  Expressive uses 500ms+ for some flourishes; that feels slow on
  desktop. Cap at 320ms.
- **Don't copy color literals from a screenshot.** What looks
  "neutral gray" in a screenshot is rgba(0,0,0,0.6) on white but
  rgba(255,255,255,0.6) in dark mode. Pick the token whose role
  matches and trust dark-mode discipline.
