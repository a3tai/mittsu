# Claude skills

Repo-aware AI workflows for `@a3tai/mittsu`. Each subdirectory is a
[Claude Skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
that Claude Code (or Claude on the API/web) can invoke when the task
matches its description.

## What's here

| Skill | When it fires |
| --- | --- |
| [`default`](default/SKILL.md) | Start of a new conversation, or any open-ended "what should we build next?" — reads PLAN.md + ROADMAP.md and recommends the next 🟡 component. |
| [`components`](components/SKILL.md) | Adding a new component to `packages/svelte5/components/`. |
| [`porting-components`](porting-components/SKILL.md) | Bringing a shadcn / Radix / HIG / Material 3 component into our Svelte 5 conventions. |
| [`design`](design/SKILL.md) | Any time you're writing or reviewing component CSS / markup. The rulebook for our visual style. |
| [`auditing-accessibility`](auditing-accessibility/SKILL.md) | Reviewing a component for keyboard / screen-reader / focus support. |
| [`bumping-versions`](bumping-versions/SKILL.md) | Cutting a release of one of the packages. |

## How discovery works

When Claude Code runs in this repo, it auto-loads any `SKILL.md` it
finds under `.claude/skills/`. Skill metadata (name + description)
goes into the system prompt; the body of `SKILL.md` is loaded only
when the skill becomes relevant. That's why descriptions are written
third-person and packed with trigger keywords — they're how Claude
decides which skill applies to the current request.

## Authoring conventions

- Names are short and concrete. Prefer a single noun for foundational
  rulebooks (`design`, `components`, `default`); gerund form is fine
  for narrower operational workflows (`porting-components`,
  `bumping-versions`, `auditing-accessibility`). Shorter wins —
  Claude only needs to disambiguate against the other skills here.
- Descriptions are **third-person**, **specific**, and call out
  trigger keywords ("Use when adding a new component to the registry…").
- Bodies stay under **500 lines**; longer references go in
  `<skill>/references/<topic>.md` and are linked one level deep.
- Each skill includes a **Gotchas** section at the end — common
  mistakes captured the first time they happened.
