import {join, basename, posix} from 'node:path';
import {loadRegistry, fetchFile} from '../registry.js';
import {readConfig, resolveRegistry, resolvePaths} from '../config.js';
import {writeFileSafe, rewriteImports} from '../fs-utils.js';

export async function add(args) {
  if (args.positionals.length === 0) {
    throw new Error('add: pass at least one component name. Try `mittsu list` to see what is available.');
  }
  const target = args.target ?? process.cwd();
  const config = await readConfig(target);
  const registrySrc = resolveRegistry(config, args);
  const paths = resolvePaths(config, args);
  const loc = await loadRegistry(registrySrc);
  const registry = loc.registry;
  const components = registry.components ?? {};

  // Resolve the full set including transitive component dependencies.
  const resolved = new Set();
  for (const name of args.positionals) addWithDeps(name, components, resolved);

  // Layout config the importer rewriter needs.
  const layout = {
    componentDir: posixify(paths.components),
    libDir: posixify(paths.lib),
  };

  let installed = 0;
  let skipped = 0;
  let needsLib = false;
  const externalDependencies = new Set();

  for (const name of resolved) {
    const c = components[name];
    if (!c) continue;
    for (const rel of c.files) {
      let text = await fetchFile(loc, rel);
      // Rewrite imports inside .svelte / .ts files. CSS files don't
      // contain JS imports — leave them alone.
      if (rel.endsWith('.svelte') || rel.endsWith('.ts')) {
        text = rewriteImports(text, name, layout);
      }
      const abs = join(target, paths.components, name, basename(rel));
      const result = await writeFileSafe(abs, text, args);
      if (result.written) installed++;
      else if (result.reason === 'exists') skipped++;
      logWrite(result, abs);
    }
    if ((c.dependencies ?? []).includes('lib/cn')) needsLib = true;
    for (const dep of c.externalDependencies ?? []) externalDependencies.add(dep);
  }

  // Make sure the cn util is present. If not, copy it from the registry.
  if (needsLib && registry.lib?.files?.length) {
    for (const rel of registry.lib.files) {
      const text = await fetchFile(loc, rel);
      const abs = join(target, paths.lib, basename(rel));
      const result = await writeFileSafe(abs, text, args);
      if (result.written) installed++;
      else if (result.reason === 'exists') skipped++;
      logWrite(result, abs);
    }
  }

  console.log(`\n${installed} file${installed === 1 ? '' : 's'} written, ${skipped} skipped.`);
  console.log(`Components live under ${paths.components}.`);
  if (externalDependencies.size > 0) {
    console.log(`Install external dependencies: npm install ${Array.from(externalDependencies).join(' ')}`);
  }
}

function addWithDeps(name, components, set) {
  if (set.has(name)) return;
  const c = components[name];
  if (!c) {
    throw new Error(`Unknown component: ${name}`);
  }
  set.add(name);
  for (const dep of c.dependencies ?? []) {
    if (dep.startsWith('lib/')) continue; // lib utilities handled separately
    addWithDeps(dep, components, set);
  }
}

function logWrite(result, abs) {
  if (result.written) {
    console.log(`✓ ${abs}`);
  } else if (result.reason === 'exists') {
    console.log(`· skipped ${abs} (exists)`);
  } else if (result.reason === 'dry-run') {
    console.log(`[dry-run] ${abs}`);
  }
}

function posixify(p) {
  return p.replace(/\\/g, '/');
}
