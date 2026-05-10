import {join, basename} from 'node:path';
import {loadRegistry, fetchFile} from '../registry.js';
import {DEFAULTS, readConfig, writeConfig, resolveRegistry, resolvePaths} from '../config.js';
import {writeFileSafe} from '../fs-utils.js';

export async function init(args) {
  const target = args.target ?? process.cwd();
  const existing = await readConfig(target);
  if (existing && !args.force) {
    console.log('components.json already exists. Re-run with --force to overwrite.');
  }

  const registrySrc = resolveRegistry(existing, args);
  const loc = await loadRegistry(registrySrc);
  const registry = loc.registry;

  const config = {
    framework: registry.framework ?? DEFAULTS.framework,
    registry: registrySrc,
    paths: resolvePaths(existing, args),
  };

  if (!existing || args.force) {
    if (args.dryRun) {
      console.log(`[dry-run] write ${join(target, 'components.json')}`);
    } else {
      await writeConfig(target, config);
      console.log(`✓ wrote ${join(target, 'components.json')}`);
    }
  }

  // Copy tokens.css
  if (registry.tokens?.files?.length) {
    for (const rel of registry.tokens.files) {
      const text = await fetchFile(loc, rel);
      const abs = join(target, config.paths.tokens, basename(rel));
      const result = await writeFileSafe(abs, text, args);
      logWrite(result, abs);
    }
  }

  // Copy lib utilities (cn.ts)
  if (registry.lib?.files?.length) {
    for (const rel of registry.lib.files) {
      const text = await fetchFile(loc, rel);
      const abs = join(target, config.paths.lib, basename(rel));
      const result = await writeFileSafe(abs, text, args);
      logWrite(result, abs);
    }
  }

  console.log(`\nNext: import the design tokens once from your app entry, e.g.\n`);
  console.log(`  import '${posixify(config.paths.tokens)}/tokens.css';\n`);
  console.log(`Then add components:`);
  console.log(`  npx @a3tai/mittsu add button badge spinner   # or: mittsu add ...\n`);
}

function logWrite(result, abs) {
  if (result.written) {
    console.log(`✓ wrote ${abs}`);
  } else if (result.reason === 'exists') {
    console.log(`· skipped ${abs} (exists; --force to overwrite)`);
  } else if (result.reason === 'dry-run') {
    console.log(`[dry-run] write ${abs}`);
  }
}

function posixify(p) {
  return p.replace(/\\/g, '/');
}
