# @a3tai/mittsu

CLI for `@a3tai/mittsu`. Copies component source files into your
project shadcn-style — you own the code from the moment it lands.

The bin is named **`mittsu`**. Both invocation styles work:

```bash
# via npx (no install required):
npx @a3tai/mittsu@latest init
npx @a3tai/mittsu@latest add button badge spinner

# or after global install:
npm install -g @a3tai/mittsu
mittsu init
mittsu add button badge spinner
```

## Commands

- `mittsu init` — write `components.json` (CLI config), copy `tokens.css`
  and the `cn` utility into your project.
- `mittsu add <name...>` — copy one or more components, recursively pulling
  in any sibling components they compose (e.g. `search-input` brings
  `input` and `kbd` along).
- `mittsu list` — show what's available in the configured registry.
- `mittsu help` — print usage.

## Flags

| Flag | Purpose |
| --- | --- |
| `--registry <url\|path>` | Override the registry source. |
| `--target <dir>` | Run against a project other than `cwd`. |
| `--components-dir <dir>` | Where component folders land. |
| `--tokens-dir <dir>` | Where `tokens.css` lands. |
| `--lib-dir <dir>` | Where `cn.ts` lands. |
| `--force, -f` | Overwrite existing files. |
| `--dry-run, -n` | Print actions without writing. |
| `--version, -v` | Print version and exit. |

## Configuration (components.json)

`init` writes a `components.json` in your project root:

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

CLI flags override config values; config values override the built-in
defaults.

## Local development

The CLI is a zero-dependency Node script. From a clone of the repo:

```bash
node packages/cli/bin/mittsu.js list \
  --registry ./packages/svelte5/registry.json

node packages/cli/bin/mittsu.js add button --target /tmp/mittsu-smoke \
  --registry ./packages/svelte5/registry.json
```
