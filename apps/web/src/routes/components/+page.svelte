<script lang="ts">
  import {components, categories, type ComponentCategory} from '$lib/docs';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Switch from '@a3tai/mittsu-svelte5/components/switch/switch.svelte';
  import SegmentedControl from '@a3tai/mittsu-svelte5/components/segmented-control/segmented-control.svelte';
  import Sparkline from '@a3tai/mittsu-svelte5/components/sparkline/sparkline.svelte';
  import Lamp from '@a3tai/mittsu-svelte5/components/lamp/lamp.svelte';
  import Chip from '@a3tai/mittsu-svelte5/components/chip/chip.svelte';
  import ProgressRing from '@a3tai/mittsu-svelte5/components/progress-ring/progress-ring.svelte';
  import SearchInput from '@a3tai/mittsu-svelte5/components/search-input/search-input.svelte';

  // Filter UI state
  let query = $state('');
  let activeCat = $state<ComponentCategory | 'All'>('All');

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase();
    return components.filter((c) => {
      if (activeCat !== 'All' && c.category !== activeCat) return false;
      if (!q) return true;
      return (
        c.name.includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
  });

  // Live preview state for the featured row
  let switchOn = $state(true);
  let segValue = $state<'editor' | 'preview' | 'split'>('split');
  let progress = $state(0.62);

  // Lightweight little featured set — diverse, visually rich
  type Featured = {name: string; title: string; tagline: string};
  const featured: Featured[] = [
    {name: 'button', title: 'Button', tagline: 'Primary action with primary, ghost, outline, and destructive tones.'},
    {name: 'segmented-control', title: 'SegmentedControl', tagline: 'Connected radio buttons in one rounded chassis.'},
    {name: 'switch', title: 'Switch', tagline: 'Sliding on/off control, macOS-Settings shape.'},
    {name: 'sparkline', title: 'Sparkline', tagline: 'Inline mini line chart with optional area fill.'},
    {name: 'progress-ring', title: 'ProgressRing', tagline: 'Determinate circular progress with optional label.'},
    {name: 'lamp', title: 'Lamp', tagline: 'Colored status dot with halo for idle, running, warn, fail.'},
  ];

  const playbooks = [
    {
      title: 'Operations workbench',
      body: 'Start with AppShell, Sidebar, Table, Inspector, StatusRow, and chart pages for dense product views.',
      href: '/components/app-shell',
      stack: ['AppShell', 'Table', 'Inspector']
    },
    {
      title: 'Keyboard-first tool UI',
      body: 'Use Command, Kbd, Badge, Timeline, ProgressRing, and ScrollArea for dense power-user tools.',
      href: '/components/command',
      stack: ['Command', 'Timeline', 'Kbd']
    },
    {
      title: 'Local-first library app',
      body: 'Use SourceList, TitleBar, TrafficLights, Toolbar, SplitView, and Typography for local collections.',
      href: '/components/source-list',
      stack: ['SourceList', 'TitleBar', 'SplitView']
    },
    {
      title: 'LLM-safe composition',
      body: 'Prefer layout primitives, semantic tokens, and named variants so generated screens stay consistent.',
      href: '/components/typography',
      stack: ['Stack', 'Section', 'Typography']
    }
  ];

  // Components grouped by category, after filter
  const grouped = $derived.by(() => {
    const out: Array<{cat: ComponentCategory; items: typeof components}> = [];
    for (const cat of categories) {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length) out.push({cat, items});
    }
    return out;
  });

  const matchCount = $derived(filtered.length);

  // Category glyph — a one-character mark, just decorative.
  const catGlyph: Record<ComponentCategory, string> = {
    Foundation: '◍',
    Layout: '▦',
    Shell: '▤',
    Form: '◐',
    Display: '◇',
    Overlay: '◓',
    Feedback: '◔',
    Navigation: '◒',
    Data: '◫',
    'macOS': '',
  };
</script>

<header class="hd">
  <p class="eyebrow">Component reference</p>
  <h1 class="hd-title">A component system for native-feeling product software.</h1>
  <p class="hd-sub">
    {components.length} source-first components, cataloged for humans and LLMs.
    Pick a playbook, jump with ⌘K, or filter by category below.
  </p>
</header>

<section class="playbooks" aria-label="Component composition playbooks">
  {#each playbooks as playbook}
    <a class="playbook" href={playbook.href}>
      <span class="playbook-kicker">Playbook</span>
      <h2>{playbook.title}</h2>
      <p>{playbook.body}</p>
      <span class="playbook-stack">
        {#each playbook.stack as item}<code>{item}</code>{/each}
      </span>
    </a>
  {/each}
</section>

<!-- ───── featured live previews ───── -->
<section class="featured" aria-label="Featured components">
  {#each featured as f, i (f.name)}
    <a class="feat" href="/components/{f.name}" data-pos={i}>
      <span class="feat-cap">{f.title}</span>
      <span class="feat-stage" aria-hidden="true">
        {#if f.name === 'button'}
          <span class="feat-row">
            <Button>Save changes</Button>
            <Button variant="ghost">Cancel</Button>
          </span>
        {:else if f.name === 'segmented-control'}
          <SegmentedControl
            bind:value={segValue}
            ariaLabel="Demo"
            size="sm"
            options={[
              {value: 'editor', label: 'Editor'},
              {value: 'preview', label: 'Preview'},
              {value: 'split', label: 'Split'},
            ]}
          />
        {:else if f.name === 'switch'}
          <span class="feat-row">
            <Switch bind:checked={switchOn} label="iCloud Drive" />
          </span>
        {:else if f.name === 'sparkline'}
          <span class="feat-row feat-row-tight">
            <Sparkline values={[8, 12, 9, 16, 14, 22, 18, 25, 21, 28]} width={120} height={36} area tone="success" />
            <span class="feat-mono">+18.4%</span>
          </span>
        {:else if f.name === 'progress-ring'}
          <span class="feat-row feat-row-tight">
            <ProgressRing value={progress} ariaLabel="Backup progress" />
            <span class="feat-mono">62% · 1.2 GB</span>
          </span>
        {:else if f.name === 'lamp'}
          <span class="feat-row feat-row-tight">
            <span class="lamp-line"><Lamp state="running" /> Indexer running</span>
            <span class="lamp-line"><Lamp state="warn" /> 2 jobs queued</span>
            <span class="lamp-line"><Lamp state="idle" /> Sync idle</span>
          </span>
        {/if}
      </span>
      <span class="feat-foot">
        <code>{f.name}</code>
        <span class="feat-tag">{f.tagline}</span>
      </span>
    </a>
  {/each}
</section>

<!-- ───── filter bar ───── -->
<section class="filter">
  <div class="filter-search">
    <SearchInput bind:value={query} placeholder="Search by name, title, or description…" />
  </div>
  <div class="filter-cats" role="tablist" aria-label="Filter by category">
    <Chip active={activeCat === 'All'} onClick={() => (activeCat = 'All')} count={components.length}>
      All
    </Chip>
    {#each categories as c}
      {@const n = components.filter((x) => x.category === c).length}
      <Chip active={activeCat === c} onClick={() => (activeCat = c)} count={n}>
        {c}
      </Chip>
    {/each}
  </div>
  <div class="filter-tail">
    <span class="filter-count">
      {#if query.trim() || activeCat !== 'All'}
        <span class="filter-count-num">{matchCount}</span>
        <span class="filter-count-label">match{matchCount === 1 ? '' : 'es'}</span>
      {/if}
    </span>
  </div>
</section>

<!-- ───── catalog ───── -->
{#if grouped.length === 0}
  <div class="empty">
    <p class="empty-title">No components match.</p>
    <p class="empty-sub">Try a different query or clear the category filter.</p>
    <Button variant="ghost" onclick={() => { query = ''; activeCat = 'All'; }}>Reset filters</Button>
  </div>
{/if}

{#each grouped as g (g.cat)}
  <section class="cat">
    <header class="cat-head">
      <span class="cat-glyph" aria-hidden="true">{catGlyph[g.cat] || '●'}</span>
      <h2 class="cat-title">{g.cat}</h2>
      <span class="cat-count">{g.items.length}</span>
      <span class="cat-rule"></span>
    </header>
    <div class="grid">
      {#each g.items as c (c.name)}
        <a class="card" href="/components/{c.name}">
          <div class="card-head">
            <h3 class="card-title">{c.title}</h3>
            <span class="card-arrow" aria-hidden="true">→</span>
          </div>
          <p class="card-desc">{c.description}</p>
          <code class="card-slug">{c.name}</code>
        </a>
      {/each}
    </div>
  </section>
{/each}

<style>
  /* ───────────── header ───────────── */

  .hd {
    margin: 0 0 var(--uin-s-5);
    max-width: 720px;
    animation: fade-up 360ms var(--uin-ease-standard, ease) both;
  }
  .hd .eyebrow {
    margin: 0 0 6px;
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-mute);
    font-weight: 500;
  }
  .hd-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(28px, 4vw, 40px);
    line-height: 1.08;
    letter-spacing: -0.018em;
    color: var(--uin-fg);
  }
  .hd-sub {
    margin: var(--uin-s-2) 0 0;
    color: var(--uin-fg-mute);
    font-size: 14.5px;
    line-height: 1.55;
    max-width: 56ch;
  }

  /* ───────────── playbooks ───────────── */

  .playbooks {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--uin-s-3);
    margin: var(--uin-s-6) 0;
    animation: fade-up 420ms var(--uin-ease-standard, ease) 40ms both;
  }
  .playbook {
    display: grid;
    gap: var(--uin-s-2);
    padding: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    background:
      radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--uin-accent) 5%, transparent) 0, transparent 58%),
      var(--uin-mat-row);
    color: var(--uin-fg);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard),
      transform var(--uin-dur-1) var(--uin-ease-standard);
  }
  .playbook:hover {
    border-color: var(--uin-line-strong);
    background: var(--uin-mat-hover);
    transform: translateY(-1px);
  }
  .playbook:focus-visible {
    outline: none;
    border-color: var(--uin-accent);
    box-shadow: var(--uin-focus-ring);
  }
  .playbook-kicker {
    font-family: var(--uin-font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
  }
  .playbook h2 {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 17px;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .playbook p {
    margin: 0;
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    line-height: 1.5;
  }
  .playbook-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: var(--uin-s-1);
  }
  .playbook-stack code {
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    color: var(--uin-fg-mute);
    padding: 2px 6px;
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    background: color-mix(in srgb, var(--uin-bg-base) 48%, transparent);
  }

  /* ───────────── featured ───────────── */

  .featured {
    margin: var(--uin-s-6) 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--uin-s-3);
    animation: fade-up 480ms var(--uin-ease-standard, ease) 60ms both;
  }
  .feat {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 8px;
    min-width: 0;
    padding: var(--uin-s-3);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background:
      radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--uin-accent) 4%, transparent) 0, transparent 60%),
      var(--uin-bg-panel);
    color: var(--uin-fg);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .feat:hover { border-color: var(--uin-line-strong); }
  .feat > * { min-width: 0; }
  .feat-cap {
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
  }
  .feat-stage {
    display: grid;
    place-items: center;
    min-height: 110px;
    padding: var(--uin-s-2);
    border-radius: var(--uin-r-sm);
    background: color-mix(in srgb, var(--uin-bg-base) 60%, transparent);
  }
  .feat-row {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .feat-row-tight { gap: 6px; flex-direction: column; align-items: flex-start; }
  .feat-mono {
    font-family: var(--uin-font-mono);
    font-size: 12px;
    color: var(--uin-fg-mute);
  }
  .lamp-line {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--uin-fg);
  }
  .feat-foot {
    display: flex;
    align-items: baseline;
    gap: 8px;
    border-top: 1px solid var(--uin-line);
    padding-top: 8px;
  }
  .feat-foot code {
    font-family: var(--uin-font-mono);
    font-size: 11.5px;
    color: var(--uin-fg);
  }
  .feat-tag {
    font-size: 11.5px;
    color: var(--uin-fg-mute);
    line-height: 1.4;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ───────────── filter ───────────── */

  .filter {
    display: grid;
    grid-template-columns: 320px 1fr auto;
    gap: var(--uin-s-3);
    align-items: center;
    margin: var(--uin-s-6) 0 var(--uin-s-4);
    padding: var(--uin-s-3) 0;
    border-top: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
    position: sticky;
    top: 56px;
    z-index: 5;
    background: color-mix(in srgb, var(--uin-bg-base) 92%, transparent);
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
  }
  .filter-search :global(.uin-search-input) { width: 100%; }
  .filter-cats {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .filter-cats::-webkit-scrollbar { display: none; }
  .filter-tail {
    justify-self: end;
    color: var(--uin-fg-mute);
  }
  .filter-count {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
  }
  .filter-count-num {
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 18px;
    color: var(--uin-fg);
    font-variant-numeric: tabular-nums;
  }
  .filter-count-label {
    font-size: 12px;
    color: var(--uin-fg-mute);
  }

  /* ───────────── empty ───────────── */

  .empty {
    text-align: center;
    padding: var(--uin-s-7) 0;
    border: 1px dashed var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
  }
  .empty-title {
    margin: 0 0 6px;
    font-family: var(--uin-font-display);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
  .empty-sub {
    margin: 0 0 var(--uin-s-3);
    color: var(--uin-fg-mute);
    font-size: 13px;
  }

  /* ───────────── category groups ───────────── */

  .cat { margin-top: var(--uin-s-6); }
  .cat-head {
    display: flex;
    align-items: center;
    gap: var(--uin-s-2);
    margin-bottom: var(--uin-s-3);
  }
  .cat-glyph {
    font-size: 14px;
    color: var(--uin-fg-dim);
    line-height: 1;
  }
  .cat-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.01em;
    color: var(--uin-fg);
  }
  .cat-count {
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-dim);
    padding: 2px 6px;
    border: 1px solid var(--uin-line);
    border-radius: 999px;
  }
  .cat-rule {
    flex: 1;
    height: 1px;
    background: var(--uin-line);
    margin-left: var(--uin-s-2);
  }

  /* ───────────── catalog grid ───────────── */

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--uin-s-2);
  }

  .card {
    display: grid;
    gap: 4px;
    padding: 12px 14px;
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
    color: var(--uin-fg);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
    min-height: 88px;
  }
  .card:hover {
    background: var(--uin-mat-hover);
    border-color: var(--uin-line-strong);
  }
  .card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }
  .card-title {
    margin: 0;
    font-weight: 500;
    font-size: 13.5px;
    letter-spacing: -0.005em;
    color: var(--uin-fg);
  }
  .card-arrow {
    color: var(--uin-fg-faint);
    font-size: 13px;
    transition: color var(--uin-dur-1) var(--uin-ease-standard),
      transform var(--uin-dur-1) var(--uin-ease-standard);
  }
  .card:hover .card-arrow {
    color: var(--uin-accent);
    transform: translateX(2px);
  }
  .card-desc {
    margin: 0;
    font-size: 12px;
    color: var(--uin-fg-mute);
    line-height: 1.45;
    flex: 1 1 auto;
  }
  .card-slug {
    align-self: flex-start;
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-dim);
    margin-top: 2px;
  }

  /* ───────────── motion ───────────── */

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hd, .playbooks, .featured { animation: none; }
    .playbook:hover { transform: none; }
  }

  /* ───────────── responsive ───────────── */

  @media (max-width: 880px) {
    .playbooks,
    .featured { grid-template-columns: repeat(2, 1fr); }
    .filter {
      grid-template-columns: 1fr;
      gap: var(--uin-s-2);
      position: static;
    }
    .filter-tail { justify-self: start; }
  }
  @media (max-width: 540px) {
    .playbooks,
    .featured { grid-template-columns: 1fr; }
  }
</style>
