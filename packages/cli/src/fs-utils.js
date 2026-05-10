/*
 * Tiny filesystem helpers + transform that fixes import paths in copied
 * .svelte / .ts files so they point at wherever the consumer keeps
 * copied shared utilities (`paths.lib`).
 */
import {writeFile, mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname, join, relative, posix} from 'node:path';

export async function writeFileSafe(absPath, content, {force = false, dryRun = false} = {}) {
  if (existsSync(absPath) && !force) {
    return {written: false, reason: 'exists'};
  }
  if (dryRun) return {written: false, reason: 'dry-run'};
  await mkdir(dirname(absPath), {recursive: true});
  await writeFile(absPath, content, 'utf8');
  return {written: true};
}

/**
 * Rewrite `../../lib/cn` and `./<sibling>/<name>.svelte` import
 * specifiers so they resolve from the consumer's component file
 * location to their lib + components-ui directories.
 *
 * Inputs:
 *   content       — the file's text content
 *   componentName — the component being installed (e.g. "search-input")
 *   layout        — { componentDir, libDir }, both relative to project root
 */
export function rewriteImports(content, componentName, layout) {
  // Shared util imports. Source uses `../../lib/<name>`; rewrite to a
  // path relative to where this component file will live in the
  // consumer's project. The first package only needed `cn`, but charts
  // also copy `types` and `utils`.
  const compFolderAbs = posix.join(layout.componentDir, componentName);
  content = content.replace(/from ['"]\.\.\/\.\.\/lib\/([^'"]+)['"]/g, (_match, utilName) => {
    const targetAbs = posix.join(layout.libDir, utilName);
    return `from '${posixRelative(compFolderAbs, targetAbs)}'`;
  });

  // Sibling component imports: `../<other>/<other>.svelte`. Source
  // and consumer both keep `<other>/<other>.svelte` next to each
  // other inside paths.components, so the relative shape is
  // identical. Nothing to rewrite — leave `../other/other.svelte`
  // alone.
  return content;
}

function posixRelative(fromDir, toFile) {
  let r = posix.relative(fromDir, toFile);
  if (!r.startsWith('.')) r = './' + r;
  return r;
}

export {join, relative};
