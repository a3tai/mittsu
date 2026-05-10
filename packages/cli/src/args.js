/*
 * Tiny argv parser. Supports:
 *   <command>            positional first arg
 *   <name...>            remaining positionals collected as `positionals`
 *   --flag <value>       e.g. --registry ./path
 *   --flag=value
 *   --bool               (no value)
 *
 * Flags we recognise:
 *   --registry <url|path>     registry source (https url or local file)
 *   --target <dir>            consumer project root (default: cwd)
 *   --components-dir <dir>    where copied components land (default from config)
 *   --tokens-dir <dir>        where tokens.css lands (default from config)
 *   --force                   overwrite existing files
 *   --dry-run                 print actions without writing
 */
export function parseArgs(argv) {
  const out = {
    command: undefined,
    positionals: [],
    registry: undefined,
    target: undefined,
    componentsDir: undefined,
    tokensDir: undefined,
    libDir: undefined,
    force: false,
    dryRun: false,
  };

  let i = 0;
  while (i < argv.length) {
    const a = argv[i];
    if (a === '--force' || a === '-f') {
      out.force = true;
      i++;
      continue;
    }
    if (a === '--dry-run' || a === '-n') {
      out.dryRun = true;
      i++;
      continue;
    }
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      const key = eq >= 0 ? a.slice(2, eq) : a.slice(2);
      const value = eq >= 0 ? a.slice(eq + 1) : argv[++i];
      const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      out[camelKey] = value;
      i++;
      continue;
    }
    if (out.command === undefined) {
      out.command = a;
    } else {
      out.positionals.push(a);
    }
    i++;
  }
  return out;
}
