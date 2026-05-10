# CLI reference

The `@a3tai/mittsu` CLI is a zero-dependency Node script. Every
command is invokable via `npx @a3tai/mittsu` or, after a global
install, just `mittsu`.

## Commands

### `init`

```bash
mittsu init [flags]
```

Writes `components.json`, copies `tokens.css` into `paths.tokens`, and
copies `cn.ts` into `paths.lib`. Idempotent — re-running on an existing
project is a no-op unless you pass `--force`.

| Flag | Effect |
| --- | --- |
| `--registry <url\|path>` | Override the registry source |
| `--target <dir>` | Run against a project other than `cwd` |
| `--components-dir <dir>` | Default for `paths.components` (where `add` will land files) |
| `--tokens-dir <dir>` | Default for `paths.tokens` |
| `--lib-dir <dir>` | Default for `paths.lib` |
| `--force, -f` | Overwrite existing files |
| `--dry-run, -n` | Print actions without writing |

### `add <name…>`

```bash
mittsu add button badge spinner [flags]
```

Copies one or more components into `paths.components/<name>/`. The CLI:

1. Resolves component names against the registry.
2. Recursively pulls in any **sibling** components a name depends on
   (e.g. `search-input` → `input` + `kbd`).
3. Fetches each file (HTTPS or local path) and writes it to the
   consumer's project.
4. Rewrites `../../lib/<name>` imports so copied components resolve shared
   utilities from wherever `paths.lib` is configured.
5. Leaves sibling-component imports alone (since the consumer keeps
   the same `<other>/<other>.svelte` shape).

Flags: same as `init`. `--force` overwrites existing files. Registries can
also declare `externalDependencies`; the CLI prints the install command after
copying those components.

### `list`

```bash
mittsu list [--registry <url|path>]
```

Prints every component the registry exposes, sorted alphabetically,
with a one-line description.

### `help`

```bash
mittsu help
```

Prints command summaries.

### Global flags

| Flag | Effect |
| --- | --- |
| `--version, -v` | Print version and exit |

## Configuration

The CLI reads config from `components.json` at the consumer project
root. `init` writes it; `add` reads it.

```json
{
  "framework": "svelte5",
  "registry": "https://raw.githubusercontent.com/a3tai/mittsu/main/packages/svelte5/registry.json",
  "paths": {
    "components": "src/lib/components/ui",
    "tokens": "src/lib/styles",
    "lib": "src/lib/utils"
  }
}
```

Lookup precedence:

1. CLI flag (highest priority)
2. `components.json` value
3. Hard-coded defaults (lowest)

## Local development

If you've cloned the repo and want to test the CLI against the in-tree
registry without publishing:

```bash
node packages/cli/bin/mittsu.js list \
  --registry ./packages/svelte5/registry.json

node packages/cli/bin/mittsu.js add search-input \
  --registry ./packages/svelte5/registry.json \
  --target /tmp/mittsu-smoke
```

This is the same path CI uses for end-to-end verification.

## Registry format

The registry is a single JSON file. Structure:

```json
{
  "name": "@a3tai/mittsu-svelte5",
  "version": "0.0.1",
  "framework": "svelte5",
  "tokens":  { "files": ["tokens/tokens.css"] },
  "lib":     { "files": ["lib/cn.ts"] },
  "components": {
    "button": {
      "name": "button",
      "description": "Primary action element …",
      "files": [
        "components/button/button.svelte",
        "components/button/button.css"
      ],
      "dependencies": ["lib/cn"]
    }
  }
}
```

`dependencies` lists either `lib/<name>` (handled by the lib block) or
the `name` of another component the registry exposes. Cyclic deps are
not detected today; don't write any.

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | Success |
| 1 | Unknown command, missing args, registry fetch failure, write failure |
