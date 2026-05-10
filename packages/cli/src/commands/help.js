export function help() {
  console.log(`
@a3tai/mittsu — copy native-ish UI components into your project.

Usage:
  mittsu <command> [options]

Commands:
  init                          Write components.json + copy tokens.css.
  add <name...>                 Copy one or more components into your project.
  list                          Show available components in the registry.
  help                          This help text.

Options:
  --registry <url|path>         Registry source (https url or local path).
                                Defaults to the public a3tai registry.
  --target <dir>                Consumer project root. Defaults to cwd.
  --components-dir <dir>        Where copied components land.
  --tokens-dir <dir>            Where tokens.css lands.
  --lib-dir <dir>               Where the cn util lands.
  --force, -f                   Overwrite existing files.
  --dry-run, -n                 Print what would happen, no writes.
  --version, -v                 Print version and exit.

Examples:
  npx @a3tai/mittsu@latest init
  npx @a3tai/mittsu@latest add button badge spinner
  npx @a3tai/mittsu@latest list
  mittsu add button --registry ./packages/svelte5/registry.json --target /tmp/test-app
`);
}
