/**
 * Build llms.txt and llms-full.txt content for the Mittsu site.
 *
 * llms.txt format: https://llmstxt.org
 *
 * The structured index (llms.txt) is sourced from the same components and
 * charts manifests the rest of the site uses, so it stays in sync as new
 * primitives ship. The full-text variant (llms-full.txt) bundles README +
 * docs/*.md plus a flattened catalog so an LLM can ingest everything in one
 * fetch.
 */

import {components, categories} from '$lib/docs/components';
import type {ComponentMeta, ComponentCategory} from '$lib/docs/components';
import {charts, chartCategories} from '$lib/docs/charts';
import type {ChartMeta, ChartCategory} from '$lib/docs/charts';

const SITE = 'https://mittsu.dev';
const REPO = 'https://github.com/a3tai/mittsu';
const REPO_BLOB = `${REPO}/blob/main`;

const SUMMARY =
  'Source-first Svelte 5 component and chart library tuned to feel native on ' +
  'macOS / iOS. The CLI drops raw .svelte + .css files into your project — ' +
  'you own the source, override CSS-variable tokens (the --uin-* namespace), ' +
  'and fork without waiting on a release. Components ship with BEM class ' +
  'names, no Svelte scoping, and headless behavior from bits-ui where it ' +
  'matters. Designed with LLM-friendly APIs: named variants, plain data ' +
  'arrays, predictable prop shapes.';

const docPages: Array<{title: string; slug: string; summary: string}> = [
  {
    title: 'Getting started',
    slug: 'getting-started',
    summary: 'Install the CLI, run init, add your first component, import tokens.',
  },
  {
    title: 'CLI reference',
    slug: 'cli',
    summary: 'Every command and flag the @a3tai/mittsu CLI exposes (init, add, list, info).',
  },
  {
    title: 'Design tokens',
    slug: 'tokens',
    summary: 'The 37 CSS variables under --uin-* that drive color, type, spacing, radius, motion, and focus.',
  },
  {
    title: 'Charts',
    slug: 'charts',
    summary: 'D3-powered SVG chart sub-package and how it shares tokens with the UI kit.',
  },
  {
    title: 'Architecture',
    slug: 'architecture',
    summary: 'How the registry, CLI, and import rewriter fit together; copy semantics.',
  },
  {
    title: 'Component authoring',
    slug: 'component-authoring',
    summary: 'Conventions for writing a new component: file pair, registry entry, BEM, tokens.',
  },
  {
    title: 'Deployment',
    slug: 'deployment',
    summary: 'How the docs site is built and published to Cloudflare Pages.',
  },
  {
    title: 'Contributing',
    slug: 'contributing',
    summary: 'PR conventions, review checklist, how to use the Claude skills in .claude/skills/.',
  },
];

function groupByCategory<TCategory extends string, T extends {category: TCategory}>(
  items: T[],
  order: TCategory[],
): Array<{category: TCategory; items: T[]}> {
  return order.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }));
}

export function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push('# Mittsu (@a3tai/mittsu)');
  lines.push('');
  lines.push(`> ${SUMMARY}`);
  lines.push('');
  lines.push('Mittsu is distributed by copying source into your project, not as a runtime');
  lines.push('dependency. Install the CLI once, then add components individually:');
  lines.push('');
  lines.push('```');
  lines.push('npx @a3tai/mittsu@latest init');
  lines.push('npx @a3tai/mittsu@latest add button badge spinner');
  lines.push('```');
  lines.push('');

  lines.push('## Documentation');
  lines.push('');
  for (const doc of docPages) {
    lines.push(`- [${doc.title}](${REPO_BLOB}/docs/${doc.slug}.md): ${doc.summary}`);
  }
  lines.push(`- [README](${REPO_BLOB}/README.md): project overview, why-another-library comparison, repo layout.`);
  lines.push(`- [Roadmap](${REPO_BLOB}/ROADMAP.md): the full ~155-component catalog, what is shipped, queued, and planned.`);
  lines.push('');

  const componentsByCategory = groupByCategory<ComponentCategory, ComponentMeta>(components, categories);
  lines.push(`## Components (${components.length})`);
  lines.push('');
  for (const {category, items} of componentsByCategory) {
    if (items.length === 0) continue;
    lines.push(`### ${category}`);
    lines.push('');
    for (const c of items) {
      lines.push(`- [${c.title}](${SITE}/components/${c.name}): ${c.description}`);
    }
    lines.push('');
  }

  const chartsByCategory = groupByCategory<ChartCategory, ChartMeta>(charts, chartCategories);
  lines.push(`## Charts (${charts.length})`);
  lines.push('');
  for (const {category, items} of chartsByCategory) {
    if (items.length === 0) continue;
    lines.push(`### ${category}`);
    lines.push('');
    for (const c of items) {
      lines.push(`- [${c.title}](${SITE}/charts/${c.name}): ${c.description}`);
    }
    lines.push('');
  }

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [llms-full.txt](${SITE}/llms-full.txt): every doc concatenated as plain text for single-fetch ingestion.`);
  lines.push(`- [GitHub repository](${REPO}): source, issues, contribution guide.`);
  lines.push('- [npm: @a3tai/mittsu](https://www.npmjs.com/package/@a3tai/mittsu): the CLI package.');
  lines.push('- [npm: @a3tai/mittsu-svelte5](https://www.npmjs.com/package/@a3tai/mittsu-svelte5): Svelte 5 component sources used by the CLI registry.');
  lines.push('');

  return lines.join('\n');
}

/**
 * Eager raw imports of the prose docs at the repo root. Vite resolves these
 * at build time so the generated file is fully static.
 */
const docFiles = import.meta.glob<string>('../../../../../docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const readmeFile = import.meta.glob<string>('../../../../../README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function readmeContent(): string {
  const entries = Object.values(readmeFile);
  return entries[0] ?? '';
}

function docContent(slug: string): string {
  const wanted = `/docs/${slug}.md`;
  for (const [path, content] of Object.entries(docFiles)) {
    if (path.endsWith(wanted)) return content;
  }
  return '';
}

export function buildLlmsFullTxt(): string {
  const parts: string[] = [];

  parts.push('# Mittsu (@a3tai/mittsu) — Full reference');
  parts.push('');
  parts.push(`> ${SUMMARY}`);
  parts.push('');
  parts.push('This file concatenates the README and every doc page so an LLM can ingest');
  parts.push('the full Mittsu reference in a single fetch. Per-component prop tables and');
  parts.push('live examples live on the website at the linked URLs.');
  parts.push('');
  parts.push(`- Site: ${SITE}`);
  parts.push(`- Repository: ${REPO}`);
  parts.push('');
  parts.push('---');
  parts.push('');

  const readme = readmeContent();
  if (readme) {
    parts.push('# README');
    parts.push('');
    parts.push(readme.trim());
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  for (const doc of docPages) {
    const body = docContent(doc.slug);
    if (!body) continue;
    parts.push(`# docs/${doc.slug}.md`);
    parts.push('');
    parts.push(body.trim());
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  parts.push('# Component catalog');
  parts.push('');
  parts.push(`Total: ${components.length} components across ${categories.length} categories.`);
  parts.push('Each component lives at https://mittsu.dev/components/<name> and ships as');
  parts.push('a .svelte + .css file pair via the CLI.');
  parts.push('');
  for (const {category, items} of groupByCategory<ComponentCategory, ComponentMeta>(components, categories)) {
    if (items.length === 0) continue;
    parts.push(`## ${category}`);
    parts.push('');
    for (const c of items) {
      parts.push(`- ${c.title} (\`${c.name}\`) — ${c.description}`);
      parts.push(`  ${SITE}/components/${c.name}`);
    }
    parts.push('');
  }

  parts.push('---');
  parts.push('');
  parts.push('# Chart catalog');
  parts.push('');
  parts.push(`Total: ${charts.length} chart primitives. D3-powered SVG that shares the`);
  parts.push('--uin-* token namespace with the UI kit. Live examples at /charts/<name>.');
  parts.push('');
  for (const {category, items} of groupByCategory<ChartCategory, ChartMeta>(charts, chartCategories)) {
    if (items.length === 0) continue;
    parts.push(`## ${category}`);
    parts.push('');
    for (const c of items) {
      parts.push(`- ${c.title} (\`${c.name}\`) — ${c.description}`);
      parts.push(`  ${SITE}/charts/${c.name}`);
    }
    parts.push('');
  }

  return parts.join('\n');
}
