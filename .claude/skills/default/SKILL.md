---
name: default
description: Orients Claude to @a3tai/mittsu at the start of any session and picks the next component to build. Use at the start of a new conversation in this repo, when the user asks "what should we build next", "what's next on the plan", "where do we stand", "which wave are we in", "what's the priority", "what's left", or any open-ended request to add a component without naming one. Reads PLAN.md (the wave order) and ROADMAP.md (the catalog), figures out the earliest wave with unshipped 🟡 items, and recommends a specific component plus the rationale. Hands off to the `components` or `porting-components` skill once an item is picked. Does not itself write component files.
---

# Orienting to the repo

The first thing Claude does in this repo before picking up new work.
This skill reads `PLAN.md` and `ROADMAP.md`, figures out which wave is
in flight, recommends the next 🟡 component, and hands off.

## When to use this skill

Trigger this skill when the user:

- Starts a new conversation in this repo and the request is open-ended
- Asks "what should we build next?", "what's next?", "what should I do?"
- Asks "where do we stand?", "which wave are we in?", "what's the
  priority?", "what's left in Wave N?"
- Asks to add a component **without naming one** ("add the next
  component", "let's start the next thing")
- Asks for a status check on the roadmap

Do **not** trigger this skill when:

- The user names a specific component to add → go straight to
  `components` or `porting-components`
- The user is reviewing CSS / markup → `design`
- The user is auditing a11y → `auditing-accessibility`
- The user is cutting a release → `bumping-versions`

## What this skill produces

A short briefing the user can act on, ending with a concrete
recommendation:

```
Wave: <N — Title>
Wave status: <X of Y components shipped>
Already shipped this wave: <list>
Open in this wave: <list of 🟡 items not yet under packages/svelte5/components/>

Recommendation: build <kebab-case-name>
Why: <1–2 sentence rationale — usually "smallest blast radius",
      "unblocks the rest of the wave", or "user-requested area">
Next step: invoke `components` (or `porting-components` if
           there's a clean shadcn/Bits UI/Radix/HIG analog).

Cross-cutting reminders that apply:
- <any wave-specific principles from PLAN.md, e.g. "Wave 3 adds
  bits-ui as a registry dependency", "Wave 8 is reserved as the
  capstone — don't start it opportunistically">
```

## Workflow

Copy this checklist into your reply and work through it:

```
Orienting:
- [ ] 1. Read PLAN.md (wave order + principles)
- [ ] 2. Read ROADMAP.md (catalog + status emoji)
- [ ] 3. List packages/svelte5/components/ to see what's actually shipped
- [ ] 4. Reconcile: any 🟡 in ROADMAP that's now shipped should be flagged
       (the catalog drifts; trust the filesystem)
- [ ] 5. Identify the earliest wave with open items → "current wave"
- [ ] 6. Within the current wave, pick a recommendation (rules below)
- [ ] 7. Brief the user (template above) and propose the handoff
```

### 1–2. Read the planning docs

`PLAN.md` at repo root is the wave order — sequencing, principles,
coverage map. `ROADMAP.md` is the catalog with status emoji. Read
both. They live at the repo root.

### 3. Check the filesystem (source of truth)

```bash
ls packages/svelte5/components/
```

A component is shipped if its directory exists with a `.svelte` +
`.css` pair AND it has an entry in `packages/svelte5/registry.json`.
The status emoji in `ROADMAP.md` can lag the filesystem — when they
disagree, **trust the filesystem** and note the drift in your
briefing so the user can update `ROADMAP.md` in the next PR.

### 4. Find the current wave

The current wave is the **earliest wave (lowest number) where at
least one 🟡 item from PLAN.md's coverage map is not yet on disk**.
Do not skip to a later wave just because a few items in the current
one are blocked or boring — that's how plans rot.

### 5. Pick a recommendation

Within the current wave, prefer in this order:

1. **The user's stated interest**, if any ("we need a Switch") — pick
   it if it's in the current or any earlier wave.
2. **Smallest blast radius** — a leaf component with no deps on other
   not-yet-built components. Typically these are token-only CSS
   primitives.
3. **Highest-leverage** — components that unblock the rest of the wave
   (e.g. `Field` in Wave 1, `Popover` in Wave 3 — without these the
   wave's other items reinvent CSS).
4. **Pair with most recent shipped work** — if the user just shipped
   `Toggle`, recommend `ToggleGroup` next.

Wave-specific rules (from `PLAN.md` principles):

- **Wave 1 first.** Don't recommend any Wave 2+ component until the
  layout primitives + `Field` have shipped, *unless* the candidate
  has zero composition deps on Wave 1 items.
- **Wave 3 is the bits-ui milestone.** First Wave 3 component
  recommendation triggers a `package.json` + `registry.json`
  dependency change. Flag this in the briefing.
- **Wave 8 is the capstone.** Never recommend a Wave 8 component
  until Waves 1–7 are clear, regardless of user enthusiasm. If the
  user pushes, point to the principle in `PLAN.md` and ask them to
  override explicitly.

### 6. Hand off

End the briefing by naming the next skill:

- **`components`** when there's no obvious external analog
  or the analog is API-shaped enough that we'll diverge anyway
  (typical for layout primitives, AI-native, macOS extras).
- **`porting-components`** when there's a clean shadcn / Bits UI /
  Radix / HIG / Material 3 analog whose semantics we can lift.

You are not authorized to write component files from this skill —
that's `components`'s job. Stop after the briefing.

## Inputs

- (Optional) An area of interest the user named ("forms", "overlay",
  "the AI stuff")
- (Optional) An explicit wave number to focus on

If the user gives neither, default to the current wave.

## Output format

A briefing using the template under "What this skill produces". Keep
it under ~30 lines. The user should be able to read it, agree, and
say "go" — then you immediately invoke `components` with
the recommended name.

## Examples

### "What's next?" with everything as-is

User: *"What's next?"*

1. Read `PLAN.md` + `ROADMAP.md`.
2. `ls packages/svelte5/components/` — 18 directories, all from
   the original shipped set; nothing from Wave 1 yet.
3. Current wave = **Wave 1**. Open items = `Container`, `Stack`,
   `HStack`, `VStack`, `Flex`, `Spacer`, `Center`, `Box`, `Section`,
   `Field`, `Skeleton`, `AspectRatio`, `ScrollArea`, `Empty`,
   `Typography`, `Avatar`, `Notch` 🍎.
4. Pick: **`stack`** — smallest blast radius (one CSS primitive,
   token-only), and `HStack`/`VStack` will compose it.
5. Hand off to `components`.

### "Let's do the next form thing"

User: *"Let's do the next form thing."*

1. Wave 2 is the form-controls wave. None shipped yet.
2. Within Wave 2, recommend **`toggle`** — leaf, no deps on other
   Wave 2 items, and `ToggleGroup` will pair right after it.
3. Hand off to `porting-components` (clean Radix Toggle analog).

### "Can we start on the chat components?"

User: *"Can we start on the chat components?"*

1. Chat components are Wave 8 (AI-native, capstone).
2. Current wave is Wave 1, with 17 items still open. Push back.
3. Briefing names the principle from `PLAN.md`: "AI-native is
   intentionally last; don't start opportunistically." Ask if the
   user wants to override explicitly. If yes, proceed; if no,
   recommend the current-wave pick instead.

## Gotchas

- **Don't trust the emoji.** `ROADMAP.md` is hand-maintained; the
  filesystem is authoritative. Always `ls packages/svelte5/components/`
  before recommending — there is no point recommending something
  that's already shipped because someone forgot to flip 🟡 → ✅.
- **Don't skip waves.** Even if the user is excited about Wave 5
  AppShell, the principle is wave gates are soft *for a single
  component with no upstream dep* — not for whole waves. If they
  push, name the principle and let them override explicitly.
- **Don't recommend an item that isn't in PLAN.md's coverage map.**
  ⚪ items in `ROADMAP.md` are deferred until the 🟡 batch ships.
  If the user names one, briefly note it's a ⚪ and ask whether to
  promote it or stick with current-wave 🟡.
- **Don't write component files from this skill.** Brief, then hand
  off. Mixing planning and scaffolding in one turn makes it harder
  for the user to course-correct between the "what" and the "how".
- **Don't burn context re-reading PLAN.md every turn.** Once you've
  loaded it in a conversation, summarize the relevant wave block
  and proceed. Re-read only if the user mentions changes to
  `PLAN.md` or `ROADMAP.md`.
