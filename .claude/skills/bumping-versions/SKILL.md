---
name: bumping-versions
description: Cuts a release of one of the @a3tai/mittsu packages (cli, svelte5, or web). Use when the user asks to "release", "publish", "cut a version", "bump", or "tag" the project. Picks semver level from changes since the last tag, updates package.json + registry.json + CHANGELOG, runs the smoke test, creates a git tag, and queues an npm publish.
---

# Bumping versions

Cut a release of one of the workspace packages. The repo follows
[Semantic Versioning](https://semver.org/) per package; the
monorepo root is private and not published.

## When to use this skill

- "Release the CLI"
- "Bump svelte5 to 0.1"
- "Cut a version"
- "Publish to npm"

## Workflow

```
Releasing <package>:
- [ ] 1. Decide which package(s) need a release
- [ ] 2. Pick the semver level from the diff since the last tag
- [ ] 3. Update package.json version
- [ ] 4. Update registry.json version (if releasing svelte5)
- [ ] 5. Write the CHANGELOG entry
- [ ] 6. Run smoke + type-check
- [ ] 7. Commit + tag (format: <pkg>@<version>)
- [ ] 8. npm publish --workspace <pkg>
- [ ] 9. Push tags
```

### 1. Pick the package(s)

Three releasable packages:

- `@a3tai/mittsu` (the CLI) — at `packages/cli/package.json`
- `@a3tai/mittsu-svelte5` (component sources) — at
  `packages/svelte5/package.json`
- `@a3tai/mittsu-web` (showcase) — `private: true`, not
  published. Bump it for tag tracking only.

Releases can be **independent**. The CLI doesn't need to bump just
because svelte5 added a component, and vice versa. Most releases
are svelte5-only.

### 2. Pick the semver level

Look at commits since the last tag for the package:

```bash
git log <package>@<previous-version>..HEAD -- <package-path>
```

Rules:

- **major** — breaking change. The CLI's `add` flag set changes,
  the registry schema gets a new required field, a component's
  prop name changes incompatibly. Pre-1.0 we still tag major
  changes as minor and document the break in the CHANGELOG.
- **minor** — new component, new variant, new flag, new
  registry field that's optional, new public method, new token.
  This is the typical svelte5 release.
- **patch** — bug fix, doc-only change, internal refactor with no
  observable behavior change.

Pre-1.0 (where we are): everything is `0.x.y`. Treat additions
as minor (`0.0.1` → `0.1.0`); bug fixes as patch
(`0.1.0` → `0.1.1`).

### 3. Update `package.json`

```bash
# Use npm version inside the package workspace:
npm --workspace packages/svelte5 version minor --no-git-tag-version
```

Verify:

```bash
cat packages/svelte5/package.json | grep '"version"'
```

The flag `--no-git-tag-version` is intentional — we tag from the
repo root, not per-package.

### 4. Update `registry.json` (svelte5 only)

The registry has its own `version` field that should track the
package version. When releasing `@a3tai/mittsu-svelte5`:

```bash
# Open packages/svelte5/registry.json and bump the "version" field
# to match packages/svelte5/package.json's new version.
```

### 5. Write the CHANGELOG entry

Each package has its own `CHANGELOG.md`. Format:

```markdown
## 0.1.0 — 2026-05-09

### Added
- New `Tooltip` component (#42)
- `--uin-mat-translucent` token for frosted backgrounds

### Changed
- `Input` size variants now match `Button` heights exactly

### Fixed
- `SearchInput` clear button no longer overlaps long queries
```

Sections (use only the ones that apply): `Added`, `Changed`,
`Deprecated`, `Removed`, `Fixed`, `Security`. Keep entries
short and link to PR/issue numbers.

### 6. Smoke + type check

```bash
# CLI smoke test
node packages/cli/bin/mittsu.js list \
  --registry ./packages/svelte5/registry.json
node packages/cli/bin/mittsu.js add button \
  --target /tmp/uin-release-smoke \
  --registry ./packages/svelte5/registry.json --force

# Type-checks
npm run check
```

Both must pass clean. A release is the worst time to discover a
broken build.

### 7. Commit + tag

```bash
git add packages/<pkg>/package.json packages/<pkg>/CHANGELOG.md \
  packages/svelte5/registry.json   # only if bumping svelte5

git commit -m "release: <pkg>@<version>"
git tag <pkg>@<version>
```

Tag format is `<pkg>@<version>` (e.g. `svelte5@0.1.0`,
`cli@0.0.2`). This lets us run `git log <pkg>@<prev>..HEAD` next
time without ambiguity between packages.

### 8. Publish to npm

```bash
npm publish --workspace packages/<pkg>
```

For prerelease tags (e.g. `0.1.0-rc.1`), add `--tag next`:

```bash
npm publish --workspace packages/<pkg> --tag next
```

The CLI publishes as `@a3tai/mittsu`; svelte5 as
`@a3tai/mittsu-svelte5`. Both are scoped — confirm you have
access to the `@a3tai` npm scope before running.

### 9. Push tags

```bash
git push
git push --tags
```

## Examples

### Releasing svelte5 with two new components

```
- [x] 1. Releasing svelte5 (CLI unchanged this cycle)
- [x] 2. minor (added Tooltip + Stepper)
- [x] 3. packages/svelte5/package.json: 0.0.1 → 0.1.0
- [x] 4. registry.json version: "0.0.1" → "0.1.0"
- [x] 5. CHANGELOG entry under "## 0.1.0 — 2026-05-09"
- [x] 6. Smoke + check pass
- [x] 7. git tag svelte5@0.1.0
- [x] 8. npm publish --workspace packages/svelte5
- [x] 9. git push && git push --tags
```

### Patching the CLI

```
- [x] 1. Releasing CLI only
- [x] 2. patch (fixed registry-fetch error message)
- [x] 3. packages/cli/package.json: 0.0.1 → 0.0.2
- [-] 4. (n/a — registry not affected)
- [x] 5. CHANGELOG: ## 0.0.2 — Fixed
- [x] 6. Smoke + check pass
- [x] 7. git tag cli@0.0.2
- [x] 8. npm publish --workspace packages/cli
- [x] 9. git push && git push --tags
```

## Output format

A successful release should print:

```
✓ packages/svelte5/package.json updated to 0.1.0
✓ packages/svelte5/registry.json updated to 0.1.0
✓ CHANGELOG.md entry written for 0.1.0
✓ Smoke test passed
✓ Type check passed
✓ Tag svelte5@0.1.0 created
✓ Published to npm as @a3tai/mittsu-svelte5@0.1.0
✓ Pushed to origin

Release notes:
<paste the CHANGELOG entry>
```

## Gotchas

- **Don't tag from the package directory.** Tags go on the repo
  root commit. `git tag <pkg>@<version>` from anywhere in the
  worktree is fine; `npm version` should NOT auto-tag.
- **Don't forget to bump `registry.json`** when releasing svelte5.
  The CLI uses the registry version to tell users when their
  cached components are out of date (eventually).
- **Don't publish from a dirty tree.** Commit and tag *first*,
  then publish. If something goes wrong, you can re-publish from
  a clean tag.
- **Don't change the bin name** in a patch release. The `bin`
  field in `packages/cli/package.json` is a public contract — a
  rename breaks every consumer's `npx @a3tai/mittsu`.
- **Don't release the showcase to npm.** `apps/web` is `private:
  true`; tag it for history but never publish.
- **Don't write CHANGELOG entries that say "various improvements"**.
  Be specific. The CHANGELOG is read by humans deciding whether
  to upgrade.
