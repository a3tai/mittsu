/*
 * components.json — per-project config the CLI writes during `init`
 * and reads during `add`. Mirrors shadcn's `components.json` shape.
 *
 * Lookup precedence (consumer project's POV):
 *   1. CLI flag (--components-dir / --tokens-dir / --lib-dir / --registry)
 *   2. components.json values
 *   3. Hard-coded defaults below
 */
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';

const FILE = 'components.json';

export const DEFAULTS = {
  framework: 'svelte5',
  registry: 'https://raw.githubusercontent.com/a3tai/mittsu/main/packages/svelte5/registry.json',
  paths: {
    components: 'src/lib/components/ui',
    tokens: 'src/lib/styles',
    lib: 'src/lib/utils',
  },
};

export async function readConfig(targetDir) {
  const path = join(targetDir, FILE);
  if (!existsSync(path)) return null;
  const text = await readFile(path, 'utf8');
  return JSON.parse(text);
}

export async function writeConfig(targetDir, config) {
  const path = join(targetDir, FILE);
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, JSON.stringify(config, null, 2) + '\n', 'utf8');
}

export function resolvePaths(config, args) {
  const cfg = config ?? DEFAULTS;
  return {
    components: args.componentsDir ?? cfg.paths?.components ?? DEFAULTS.paths.components,
    tokens: args.tokensDir ?? cfg.paths?.tokens ?? DEFAULTS.paths.tokens,
    lib: args.libDir ?? cfg.paths?.lib ?? DEFAULTS.paths.lib,
  };
}

export function resolveRegistry(config, args) {
  return args.registry ?? config?.registry ?? DEFAULTS.registry;
}
