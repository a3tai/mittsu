import {loadRegistry} from '../registry.js';
import {readConfig, resolveRegistry} from '../config.js';

export async function list(args) {
  const target = args.target ?? process.cwd();
  const config = await readConfig(target).catch(() => null);
  const registrySrc = resolveRegistry(config, args);

  const {registry} = await loadRegistry(registrySrc);
  const names = Object.keys(registry.components ?? {}).sort();

  console.log(`\n${registry.name ?? 'registry'} v${registry.version ?? '?'} — ${names.length} component${names.length === 1 ? '' : 's'}\n`);
  for (const name of names) {
    const c = registry.components[name];
    const desc = c.description ?? '';
    console.log(`  ${name.padEnd(22)}  ${desc}`);
  }
  console.log('');
}
