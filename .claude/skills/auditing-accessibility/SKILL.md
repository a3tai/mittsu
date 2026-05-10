---
name: auditing-accessibility
description: Reviews a @a3tai/mittsu component for keyboard, screen-reader, focus-management, and color-contrast support. Use when reviewing a new component before merging, when a contributor asks "is this a11y-compliant?", when an existing component is reported to misbehave with a screen reader or keyboard, or when a component is being prepped for ✅ status in ROADMAP.md. Walks the WAI-ARIA / WCAG checks specific to each component category and produces a pass/fail rubric.
---

# Auditing accessibility

Walk a component through the keyboard, screen-reader, focus, and
contrast checks before it ships. Most of our components pass these
out of the box because we forward native attributes and lean on
`bits-ui` for headless behavior — this skill catches the cases
where we slip.

## When to use this skill

- Before flipping a component from 🟡 → ✅ in ROADMAP
- When someone says "is this accessible?" / "does this work with
  VoiceOver?"
- When a bug report mentions keyboard navigation or screen readers
- During the PR review of a new component

## Workflow

```
Auditing <component>:
- [ ] 1. Identify the WAI-ARIA pattern this component matches
- [ ] 2. Keyboard support: every action reachable, every state changeable
- [ ] 3. Focus management: visible ring, no traps, restored on close
- [ ] 4. Screen reader: roles, names, states announce correctly
- [ ] 5. Color contrast: 4.5:1 text, 3:1 large text + UI elements
- [ ] 6. Reduced motion: animations honour prefers-reduced-motion
- [ ] 7. Document gaps in the PR; open issues for known limitations
```

### 1. Identify the WAI-ARIA pattern

Most components map to a canonical pattern in the
[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/).
The pattern tells you which roles, states, and keyboard
interactions are expected.

| Component | WAI-ARIA pattern |
| --- | --- |
| Button | Button |
| Tabs | Tabs (`tablist` / `tab` / `tabpanel`) |
| SegmentedControl | Radio Group |
| NavItem | Listbox or simple link |
| Chip (toggle) | Toggle Button |
| Switch | Switch |
| Checkbox | Checkbox (tri-state if applicable) |
| RadioGroup | Radio Group |
| Slider | Slider |
| Combobox | Combobox |
| Select | Listbox |
| Dialog | Dialog (modal) |
| AlertDialog | Alert Dialog |
| Tooltip | Tooltip |
| Popover | Disclosure or Dialog (non-modal) |
| Menu (Dropdown / Context) | Menu |
| Accordion | Accordion |

If the component is a pure presentation atom (Badge, Lamp, Card,
Spinner, Skeleton, Stat) it has no required pattern — skip to step 5
(contrast).

### 2. Keyboard support

Every interaction needs a keyboard equivalent. Common interactions
by pattern:

**Button** — Enter, Space.

**Tabs** — Arrow keys move focus between tabs, Home/End jump to
first/last, Enter/Space activate. (Or activation-on-focus, our
default.)

**Radio Group / SegmentedControl** — Arrow keys move *and*
activate; Tab enters/exits the group; only the active item is
tab-focusable (roving tabindex).

**Switch / Checkbox** — Space toggles.

**Combobox** — Down arrow opens menu, Up/Down moves through
options, Enter selects, Esc closes, Tab closes-and-commits.

**Dialog** — Esc closes; focus traps inside while open; tab cycles
within the dialog only.

**Tooltip** — Hover OR focus opens; Esc closes; never traps focus.

To verify: tab to the component, exercise every key, try with no
mouse. If you can't reach a state with the keyboard, the component
is broken.

### 3. Focus management

- **Visible focus ring** on every interactive element. Our
  `:focus-visible` rule + `var(--uin-focus-ring)` should kick in
  automatically; verify it's not being overridden by `outline:
  none` without a replacement `box-shadow`.
- **No focus trap outside of modals**. Only Dialog and AlertDialog
  trap; everything else lets Tab escape.
- **Focus restoration**. When a modal/popover/menu closes, focus
  returns to the trigger element. `bits-ui` handles this for the
  components that compose it; verify in practice with VoiceOver
  rotor or by tabbing.
- **No `tabindex="-1"`** on elements the user is supposed to
  reach. Conversely, a roving-tabindex group (Radio, Tabs) should
  have exactly one `tabindex="0"` member at any time.

### 4. Screen reader

Three things to verify, in order:

1. **Role**. The element announces with a recognisable role
   ("button", "tab", "checkbox"). Native HTML elements do this
   for free; `<div role="button">` impersonations have to declare it
   explicitly *and* handle keyboard activation.
2. **Accessible name**. Every interactive element has a name —
   from text content, `aria-label`, `aria-labelledby`, or wrapping
   `<label>`. Icon-only buttons (`icon` prop on Button) MUST have
   `aria-label` set by the consumer; the component's TS type
   should forward it.
3. **State**. Pressed/checked/expanded/selected states announce
   when they change. `aria-pressed`, `aria-checked`, `aria-expanded`,
   `aria-selected`, `aria-current` are the usual suspects.

Quick test: open the showcase in VoiceOver (⌘F5), tab through, and
listen. If anything announces as "button, button" or fails to
mention the current state, fix it.

### 5. Color contrast

Two thresholds:

- **4.5:1** for normal text against its background (WCAG AA).
- **3:1** for large text (≥18.66px regular, ≥14px bold) and
  non-text UI elements (icons, focus rings, borders that carry
  meaning).

Check both light and dark mode. Pay particular attention to:

- `--uin-fg-mute` (62% black / 65% white) — borderline on
  `--uin-mat-row` materials. Run a contrast check.
- `--uin-fg-dim` (42% black / 42% white) — pass-only-as-large-text;
  use for captions and eyebrow labels, never body.
- `--uin-fg-faint` (18%) — never for text. UI lines only.
- The accent on white background passes; on `--uin-mat-selected`
  it's tinted accent on tinted accent — verify.

The default tokens are tuned for WCAG AA out of the box. New tokens
or component-level color choices need verification.

### 6. Reduced motion

Wrap motion-heavy animations in:

```css
@media (prefers-reduced-motion: reduce) {
  .uin-foo-bar { animation: none; transition: none; }
}
```

The Spinner and ProgressBar indeterminate animation are the typical
candidates. A user who's chosen reduced motion should still see the
final state, just without the slide-in or rotation.

### 7. Document gaps

If the audit finds gaps that aren't immediate blockers, open a
GitHub issue tagged `a11y` and link it from the PR description.
Don't merge components with **keyboard** or **role** gaps — those
are blockers, not nice-to-haves.

## Output format

Walk through this rubric and return a checklist:

```
## A11y audit: <component>

Pattern: <WAI-ARIA pattern> ✓ / ✗ / N/A
Keyboard: ✓ / ✗ <details>
Focus: ✓ / ✗ <details>
Screen reader: ✓ / ✗ <details>
Contrast (light): ✓ / ✗ <details>
Contrast (dark): ✓ / ✗ <details>
Reduced motion: ✓ / ✗ / N/A <details>

Verdict: PASS / FAIL / PASS-WITH-NOTES
```

If FAIL, list the specific blockers. If PASS-WITH-NOTES, list the
non-blocking observations (these become follow-up issues).

## Examples

### Auditing `Button`

```
Pattern: Button ✓
Keyboard: ✓ (native button = Enter + Space)
Focus: ✓ (focus-visible ring, no override)
Screen reader: ✓ (native role + text content; icon-only requires
  consumer-supplied aria-label, type signature enforces it)
Contrast (light): ✓ (accent vs accent-fg = 4.6:1)
Contrast (dark): ✓ (accent vs accent-fg = 6.2:1)
Reduced motion: N/A (no infinite animations)

Verdict: PASS
```

### Auditing `SegmentedControl`

```
Pattern: Radio Group ✓
Keyboard: ✗ — Tab moves focus between every button instead of
  using roving-tabindex. Arrow keys don't move selection.
  See WAI-ARIA Radio Group pattern.
Focus: ✓
Screen reader: ✓ (role="radiogroup" + role="radio" + aria-checked)
Contrast (light): ✓
Contrast (dark): ✓
Reduced motion: N/A

Verdict: FAIL
Blockers:
  - Implement roving-tabindex (only the active button is
    tabindex=0; others are tabindex=-1).
  - Bind ArrowLeft/ArrowRight to move + activate.
```

## Gotchas

- **`role="button"` on a `<div>`** still requires you to handle
  Enter + Space yourself, plus add `tabindex="0"`. It's almost
  always wrong; reach for a real `<button>`.
- **`outline: none` without replacement** is the most common a11y
  regression in this kit. Always pair with `box-shadow:
  var(--uin-focus-ring)` on `:focus-visible`.
- **Hover-only tooltips** miss keyboard users entirely. Tooltip
  must trigger on focus too. `bits-ui`'s Tooltip handles this.
- **`aria-hidden="true"` on a focusable element** is a contradiction
  — the element traps focus in a thing the screen reader can't see.
  If you want it hidden from AT, also set `tabindex="-1"`.
- **Color is never the only signal**. A red error border + red text
  fails for color-blind users; pair with an icon, label, or aria-
  invalid attribute.
- **`prefers-contrast: more`** is increasingly important on macOS.
  Borders that read as `--uin-line` can disappear; have a fallback
  that bumps to `--uin-line-strong` when the media query matches.

## See also

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- The `design` skill for the focus-ring + color
  contract our tokens commit to.
