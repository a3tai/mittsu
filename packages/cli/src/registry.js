/*
 * Registry loader + file fetcher.
 *
 * The registry source can be:
 *   - an HTTPS URL pointing to a `registry.json` (production)
 *   - a local filesystem path to a `registry.json` (development)
 *
 * Component files referenced by the registry are resolved relative to
 * the registry file's location: HTTP for URL registries, fs for local.
 */
import {readFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {pathToFileURL} from 'node:url';

const DEFAULT_REGISTRY_URL =
  'https://raw.githubusercontent.com/a3tai/mittsu/main/packages/svelte5/registry.json';

export async function loadRegistry(source) {
  const src = source ?? DEFAULT_REGISTRY_URL;
  if (isUrl(src)) {
    const res = await fetch(src);
    if (!res.ok) {
      throw new Error(`Failed to load registry from ${src}: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return {registry: json, baseUrl: parentUrl(src)};
  }
  const text = await readFile(src, 'utf8');
  const json = JSON.parse(text);
  return {registry: json, baseDir: dirname(src)};
}

export async function fetchFile(loc, relPath) {
  if (loc.baseUrl) {
    const url = new URL(relPath, loc.baseUrl).toString();
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status}`);
    }
    return res.text();
  }
  const abs = join(loc.baseDir, relPath);
  return readFile(abs, 'utf8');
}

function isUrl(s) {
  return /^https?:\/\//i.test(s);
}

function parentUrl(s) {
  const u = new URL(s);
  u.pathname = u.pathname.replace(/[^/]+$/, '');
  return u.toString();
}

// pathToFileURL is re-exported for tests / future callers.
export {pathToFileURL};
