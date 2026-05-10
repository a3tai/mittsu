<script lang="ts">
  import {goto} from '$app/navigation';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Kbd from '@a3tai/mittsu-svelte5/components/kbd/kbd.svelte';
  import Lamp from '@a3tai/mittsu-svelte5/components/lamp/lamp.svelte';
  import TitleBar from '@a3tai/mittsu-svelte5/components/title-bar/title-bar.svelte';
  import TrafficLights from '@a3tai/mittsu-svelte5/components/traffic-lights/traffic-lights.svelte';
  import SourceList from '@a3tai/mittsu-svelte5/components/source-list/source-list.svelte';
  import SearchInput from '@a3tai/mittsu-svelte5/components/search-input/search-input.svelte';
  import Stat from '@a3tai/mittsu-svelte5/components/stat/stat.svelte';
  import StatusRow from '@a3tai/mittsu-svelte5/components/status-row/status-row.svelte';
  import SegmentedControl from '@a3tai/mittsu-svelte5/components/segmented-control/segmented-control.svelte';
  import Chip from '@a3tai/mittsu-svelte5/components/chip/chip.svelte';
  import LineChart from '@a3tai/mittsu-charts/components/line-chart/line-chart.svelte';
  import {components, categories} from '$lib/docs';
  import {chartRecipes, compact, workTrend} from '$lib/docs/charts';

  const installCmd = 'npx @a3tai/mittsu init';
  let copied = $state(false);
  function copyInstall() {
    navigator.clipboard?.writeText(installCmd);
    copied = true;
    setTimeout(() => (copied = false), 1400);
  }

  // Demo state — wired but mostly cosmetic for the screen.
  let demoTab: 'workbench' | 'inspector' | 'today' = $state('workbench');
  let activeFolder: 'inbox' | 'pinned' | 'archive' | 'tags' = $state('inbox');
  let demoSearch = $state('');

  const demoFolders = [
    {type: 'heading' as const, label: 'Workspace'},
    {value: 'inbox' as const, label: 'Overview', count: 14},
    {value: 'pinned' as const, label: 'Pinned', count: 7},
    {value: 'archive' as const, label: 'Records', count: 318},
    {type: 'heading' as const, label: 'Views'},
    {value: 'tags' as const, label: 'Needs review', count: 61},
  ];

  const workMetrics = [
    {label: 'Urgent', value: '14', color: 'var(--uin-chart-critical)'},
    {label: 'Queued', value: '61', color: 'var(--uin-chart-warning)'},
  ];

  const codeSnippet = `<script lang="ts">
  import LineChart from './line-chart.svelte';

  const work = [
    {week: 'W01', urgent: 42, queued: 118},
    {week: 'W06', urgent: 14, queued: 61}
  ];
<\/script>

<LineChart
  title="Work burn-down"
  xKey="week"
  data={work}
  series={[
    {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
    {key: 'queued', label: 'Queued', color: 'var(--uin-chart-warning)'}
  ]}
/>`;

  const featureBullets = [
    {
      title: 'Tokens, not theme files',
      body: 'Every value is a CSS variable: UI surfaces, chart palettes, semantic risk colors, fonts, radii, and motion.',
      kind: 'palette',
    },
    {
      title: 'LLM-readable source',
      body: 'APIs stay small: plain data arrays, series objects, semantic tokens, and component names an agent can reason about.',
      kind: 'cli',
    },
    {
      title: 'Headless where it counts',
      body: 'Dialogs and selectors lean on Bits UI. Charts lean on D3 scales and paths while Svelte owns the SVG.',
      kind: 'a11y',
    },
    {
      title: 'Native without lock-in',
      body: 'macOS-flavored by default, but ready for Windows, Linux, mobile shells, security tools, and local-first apps.',
      kind: 'mac',
    },
  ];

  // 12 marquee components for the bottom strip
  const marqueeNames = [
    'button', 'switch', 'segmented-control', 'calendar', 'combobox',
    'command', 'toast', 'sheet', 'inspector', 'source-list',
    'sparkline', 'stat',
  ];
  const marquee = marqueeNames
    .map((n) => components.find((c) => c.name === n))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
</script>

<!-- ───────────────── HERO ───────────────── -->
<section class="hero">
  <div class="hero-body">
    <h1 class="hero-title">Native-ish UI and Charts.</h1>

    <p class="hero-sub">
      A source-first Svelte 5 component kit with D3-powered chart primitives.
    </p>

    <div class="hero-cta">
      <div class="hero-install-block">
        <p class="hero-cta-eyebrow">Get started</p>
        <button class="install" type="button" onclick={copyInstall} aria-label="Copy install command">
          <span class="install-prompt" aria-hidden="true">$</span>
          <code class="install-cmd">{installCmd}</code>
          <span class="install-action">
            {#if copied}<span class="install-copied">copied</span>{:else}<Kbd>copy</Kbd>{/if}
          </span>
        </button>
      </div>
      <Button variant="ghost" onclick={() => goto('/components')}>
        Browse components
        <span class="cta-arrow" aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
</section>

<!-- ───────────────── DEMO ───────────────── -->
<section class="demo">
  <div class="demo-cap">
    <span class="demo-cap-eyebrow">Built from the library</span>
    <h2 class="demo-cap-title">A native workbench for real product data.</h2>
    <p class="demo-cap-sub">
      Every part of this window — the title bar, the source list, the
      work trend chart, and the status rows — is a component you can
      install. The chrome stays quiet so the data can carry the accent.
    </p>
  </div>

  <div class="window">
    <header class="window-tb">
      <TitleBar
        title="Mittsu"
        subtitle="demo · {activeFolder}"
        height="42px"
      >
        {#snippet leading()}
          <TrafficLights />
        {/snippet}
        {#snippet trailing()}
          <span class="window-tb-trail">
            <span class="window-tb-status">
              <Lamp state="running" /> indexer
            </span>
            <Kbd>⌘ K</Kbd>
          </span>
        {/snippet}
      </TitleBar>
    </header>

    <div class="window-tabs">
      <SegmentedControl
        bind:value={demoTab}
        ariaLabel="Demo view"
        size="sm"
        options={[
          {value: 'workbench', label: 'Workbench'},
          {value: 'inspector', label: 'Inspector'},
          {value: 'today', label: 'Today'},
        ]}
      />
      <span class="window-tabs-tail">
        <Chip active>All projects</Chip>
        <Chip count={3}>Pinned</Chip>
      </span>
    </div>

    <div class="window-body">
      <aside class="window-side">
        <SourceList items={demoFolders} bind:value={activeFolder} ariaLabel="Folders" />
      </aside>

      <div class="window-main">
        <div class="window-search">
          <SearchInput
            bind:value={demoSearch}
            placeholder="Search records, actions, and notes…"
          />
        </div>

        <div class="window-stats">
          <Stat label="Records" value="12,840" tone="accent" />
          <Stat label="Urgent" value="14" />
          <Stat label="Due today" value="3" tone="default" />
        </div>

        <div class="window-chart">
          <LineChart
            xKey="week"
            data={workTrend}
            width={680}
            height={220}
            aspectRatio={2.6}
            curve="monotone"
            showArea
            showPoints
            title="Work burn-down"
            description="Urgent, queued, and completed work"
            metrics={workMetrics}
            series={[
              {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
              {key: 'queued', label: 'Queued', color: 'var(--uin-chart-warning)'},
              {key: 'completed', label: 'Completed', color: 'var(--uin-chart-success)'},
            ]}
            valueFormatter={(value) => compact.format(value)}
          />
        </div>

        <div class="window-rows">
          <StatusRow title="14 urgent items assigned">
            {#snippet leading()}<Lamp state="running" />{/snippet}
            {#snippet aside()}<span class="row-aside">2m ago</span>{/snippet}
          </StatusRow>
          <StatusRow title="Background job completed">
            {#snippet leading()}<Lamp state="idle" />{/snippet}
            {#snippet aside()}<span class="row-aside">12m ago</span>{/snippet}
          </StatusRow>
          <StatusRow title="Local index synced">
            {#snippet leading()}<Lamp state="running" />{/snippet}
            {#snippet aside()}<span class="row-aside">38m ago</span>{/snippet}
          </StatusRow>
          <StatusRow title="3 due-today reminders queued">
            {#snippet leading()}<Lamp state="warn" />{/snippet}
            {#snippet aside()}<span class="row-aside">just now</span>{/snippet}
          </StatusRow>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ───────────────── STATS STRIP ───────────────── -->
<section class="rails">
  <div class="rail">
    <span class="rail-num">{components.length}</span>
    <span class="rail-label">components</span>
  </div>
  <div class="rail">
    <span class="rail-num">8</span>
    <span class="rail-label">chart primitives</span>
  </div>
  <div class="rail">
    <span class="rail-num">{categories.length}</span>
    <span class="rail-label">categories</span>
  </div>
  <div class="rail">
    <span class="rail-num">3</span>
    <span class="rail-label">D3 sub-packages</span>
  </div>
</section>

<!-- ───────────────── PRODUCT LENSES ───────────────── -->
<section class="lenses">
  <div class="lenses-cap">
    <span class="code-eyebrow">Design targets</span>
    <h2 class="lenses-title">One visual grammar, many product domains.</h2>
  </div>
  <div class="lenses-grid">
    {#each chartRecipes as lens}
      <article class="lens">
        <span class="lens-domain">{lens.domain}</span>
        <h3>{lens.title}</h3>
        <p>{lens.description}</p>
        <code>{lens.chart}</code>
      </article>
    {/each}
  </div>
</section>

<!-- ───────────────── FEATURES ───────────────── -->
<section class="features">
  {#each featureBullets as f}
    <article class="feature">
      <div class="feature-glyph" aria-hidden="true">
        {#if f.kind === 'palette'}
          <span class="swatches">
            <span style="background: var(--uin-chart-1);"></span>
            <span style="background: var(--uin-chart-2);"></span>
            <span style="background: var(--uin-chart-3);"></span>
            <span style="background: var(--uin-chart-4);"></span>
          </span>
        {:else if f.kind === 'cli'}
          <span class="cli-glyph">
            <span class="cli-prompt">$</span>
            <span class="cli-text">npx mittsu add <em>button</em></span>
          </span>
        {:else if f.kind === 'a11y'}
          <span class="a11y-glyph">
            <span class="a11y-key">⇥</span>
            <span class="a11y-key">↵</span>
            <span class="a11y-key">⎋</span>
          </span>
        {:else}
          <span class="mac-glyph">
            <TrafficLights disabled />
          </span>
        {/if}
      </div>
      <h3 class="feature-title">{f.title}</h3>
      <p class="feature-body">{f.body}</p>
    </article>
  {/each}
</section>

<!-- ───────────────── CODE + PREVIEW ───────────────── -->
<section class="code">
  <div class="code-cap">
    <span class="code-eyebrow">No black box</span>
    <h2 class="code-title">Plain Svelte. Plain CSS. No build step.</h2>
    <p class="code-sub">
      The CLI drops files into your repo as-is. Read them. Edit them.
      Throw them out. There's no runtime, no version skew, no upgrade
      treadmill.
    </p>
  </div>

  <div class="code-grid">
    <pre class="code-snippet"><code>{codeSnippet}</code></pre>
    <div class="code-preview">
      <div class="code-preview-frame">
        <span class="code-preview-eyebrow">Preview</span>
        <h4 class="code-preview-title">Exposure burn-down</h4>
        <p class="code-preview-body">Critical findings dropped from 42 to 14 while remediation climbed.</p>
        <Button onclick={() => goto('/charts')}>Open charts</Button>
      </div>
    </div>
  </div>
</section>

<!-- ───────────────── COMPONENT MARQUEE ───────────────── -->
<section class="marquee">
  <div class="marquee-cap">
    <span class="code-eyebrow">A taste</span>
    <h2 class="marquee-title">{components.length} components, {categories.length} categories.</h2>
    <a class="marquee-link" href="/components">
      Browse the catalog <span aria-hidden="true">→</span>
    </a>
  </div>

  <div class="marquee-grid">
    {#each marquee as c (c.name)}
      <a class="chip-card" href="/components/{c.name}">
        <span class="chip-card-name">{c.title}</span>
        <span class="chip-card-cat">{c.category}</span>
        <code class="chip-card-slug">{c.name}</code>
      </a>
    {/each}
  </div>
</section>

<!-- ───────────────── CLOSING CTA ───────────────── -->
<section class="closer">
  <h2 class="closer-title">Drop them in. Own the source.</h2>
  <p class="closer-sub">
    No license keys. No telemetry. No "pro tier." Just files.
  </p>
  <div class="closer-cta">
    <Button onclick={() => goto('/components')}>Browse components</Button>
    <Button variant="ghost" onclick={() => goto('/charts')}>View charts</Button>
  </div>
  <button class="install install-bottom" type="button" onclick={copyInstall} aria-label="Copy install command">
    <span class="install-prompt" aria-hidden="true">$</span>
    <code class="install-cmd">{installCmd}</code>
    <span class="install-action">
      {#if copied}<span class="install-copied">copied</span>{:else}<Kbd>copy</Kbd>{/if}
    </span>
  </button>
</section>

<style>
  /* ───────────── HERO ───────────── */

  /* Break out of the parent .main (1280px max-width) and claim the full
     viewport width. Negate .main's top padding so the hero sits flush
     against the topnav. */
  .hero {
    position: relative;
    width: 100vw;
    margin-inline: calc(-50vw + 50%);
    margin-top: calc(-1 * var(--uin-s-7));
    margin-bottom: var(--uin-s-7);
    padding: clamp(var(--uin-s-7), 12vh, var(--uin-s-8) * 2) var(--uin-s-6);
    overflow: hidden;
    isolation: isolate;
    /* Soft radial wash so the hero has presence without being loud. */
    background:
      radial-gradient(
        ellipse 60% 80% at 50% 0%,
        color-mix(in srgb, var(--uin-accent) 6%, transparent),
        transparent 70%
      ),
      var(--uin-bg-base);
    border-bottom: 1px solid var(--uin-line);
  }

  .hero-body {
    /* Body is wide so the title can breathe. Sub + CTA constrain
       themselves narrower below for readability. */
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    animation: fade-up 480ms var(--uin-ease-standard, ease) both;
  }

  .hero-title {
    margin: 0 auto var(--uin-s-5);
    /* Generous title width — keeps the line on a single run on wide
       screens, falls to a graceful two-line break below ~1000px. */
    max-width: 1000px;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(44px, 7vw, 80px);
    line-height: 1.02;
    letter-spacing: -0.026em;
    color: var(--uin-fg);
    text-wrap: balance;
  }

  .hero-sub {
    margin: 0 auto var(--uin-s-6);
    max-width: 600px;
    font-size: 16px;
    color: var(--uin-fg-mute);
    line-height: 1.6;
    text-wrap: pretty;
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uin-s-4);
    margin-top: var(--uin-s-2);
  }
  /* Eyebrow + install pill stay tightly grouped; larger gap separates
     them from the secondary Browse link. */
  .hero-install-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .hero-cta-eyebrow {
    margin: 0;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--uin-accent);
    font-weight: 600;
  }
  /* Hero variant of the install pill — the primary lead. Substantial
     touch target, larger type, accent-tinted edge. */
  .hero-cta .install {
    padding: 14px 16px 14px 22px;
    font-size: 17px;
    gap: var(--uin-s-3);
    border-radius: 999px;
    border-color: var(--uin-line-strong);
  }
  .hero-cta .install:hover {
    border-color: var(--uin-accent);
    background: color-mix(in srgb, var(--uin-accent) 4%, var(--uin-bg-panel));
  }
  .hero-cta .install-prompt { font-size: 17px; }
  .hero-cta .install-cmd { font-size: 17px; }
  .cta-arrow {
    margin-left: 6px;
    color: currentColor;
  }

  /* terminal install line */
  .install {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    padding: 7px 8px 7px 12px;
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-bg-panel, var(--uin-mat-row));
    color: var(--uin-fg);
    font-family: var(--uin-font-mono);
    font-size: 12.5px;
    cursor: pointer;
    transition:
      border-color var(--uin-dur-1) var(--uin-ease-standard),
      background-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .install:hover {
    border-color: var(--uin-line-strong);
    background: var(--uin-mat-hover);
  }
  .install:focus-visible {
    outline: none;
    border-color: var(--uin-accent);
    box-shadow: var(--uin-focus-ring);
  }
  .install-prompt { color: var(--uin-fg-dim); font-weight: 500; }
  .install-cmd { color: var(--uin-fg); }
  .install-action { margin-left: 6px; display: inline-flex; align-items: center; }
  .install-copied {
    font-family: var(--uin-font-ui);
    font-size: 11px;
    color: var(--uin-accent);
    padding: 1px 6px;
    border: 1px solid color-mix(in srgb, var(--uin-accent) 40%, transparent);
    border-radius: 4px;
    animation: blink 1.4s ease;
  }
  @keyframes blink {
    0% { opacity: 0; transform: scale(0.92); }
    20%, 80% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; }
  }

  /* ───────────── DEMO ───────────── */

  .demo {
    margin: var(--uin-s-7) 0 var(--uin-s-8);
    animation: fade-up 600ms var(--uin-ease-standard, ease) 120ms both;
  }
  .demo-cap {
    margin: 0 0 var(--uin-s-5);
    max-width: 560px;
  }
  .demo-cap-eyebrow {
    display: block;
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-mute);
    margin-bottom: 6px;
  }
  .demo-cap-title {
    margin: 0 0 var(--uin-s-2);
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(22px, 2.6vw, 28px);
    letter-spacing: -0.015em;
    line-height: 1.15;
  }
  .demo-cap-sub {
    margin: 0;
    color: var(--uin-fg-mute);
    font-size: 14px;
    line-height: 1.55;
  }

  .window {
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg, 12px);
    overflow: hidden;
    background: var(--uin-bg-panel);
    box-shadow:
      0 1px 0 color-mix(in srgb, #fff 60%, transparent) inset,
      0 24px 80px color-mix(in srgb, var(--uin-fg) 8%, transparent),
      0 4px 16px color-mix(in srgb, var(--uin-fg) 6%, transparent);
  }

  .window-tb :global(.uin-titlebar) { border-bottom: 1px solid var(--uin-line); }

  .window-tb-trail {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-3);
  }
  .window-tb-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    color: var(--uin-fg-mute);
  }

  .window-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--uin-s-2);
    padding: var(--uin-s-2) var(--uin-s-3);
    border-bottom: 1px solid var(--uin-line);
    background: color-mix(in srgb, var(--uin-bg-panel) 92%, var(--uin-mat-hover));
  }
  .window-tabs-tail {
    display: inline-flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .window-body {
    display: grid;
    grid-template-columns: 220px 1fr;
    min-height: 460px;
  }

  .window-side {
    border-right: 1px solid var(--uin-line);
    padding: var(--uin-s-3) var(--uin-s-2);
    background: var(--uin-mat-sidebar);
  }

  .window-main {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    gap: var(--uin-s-3);
    padding: var(--uin-s-3) var(--uin-s-4);
    min-width: 0;
  }

  .window-search :global(.uin-search-input) { width: 100%; }

  .window-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--uin-s-3);
    padding: var(--uin-s-2) 0 var(--uin-s-3);
    border-bottom: 1px solid var(--uin-line);
  }

  .window-chart {
    padding: var(--uin-s-2) 0;
  }
  .window-chart :global(.uin-chart-frame) {
    border: none;
    background: transparent;
    padding: 0;
    box-shadow: none;
  }
  .window-chart :global(.uin-line-chart) { min-height: 200px; }

  .window-rows {
    display: grid;
    gap: 8px;
    padding-top: var(--uin-s-2);
    border-top: 1px solid var(--uin-line);
  }
  .row-aside {
    font-size: 11px;
    color: var(--uin-fg-dim);
    font-family: var(--uin-font-mono);
  }

  /* ───────────── STATS RAILS ───────────── */

  .rails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    padding: var(--uin-s-5) 0;
    border-top: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
    margin: var(--uin-s-7) 0;
  }
  .rail {
    display: grid;
    gap: 4px;
    text-align: left;
    padding: 0 var(--uin-s-4);
    border-right: 1px solid var(--uin-line);
  }
  .rail:last-child { border-right: none; }
  .rail-num {
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(28px, 3.4vw, 40px);
    letter-spacing: -0.02em;
    line-height: 1;
    color: var(--uin-fg);
    font-variant-numeric: tabular-nums;
  }
  .rail-label {
    font-size: 11.5px;
    color: var(--uin-fg-mute);
    letter-spacing: 0.02em;
  }

  /* ───────────── PRODUCT LENSES ───────────── */

  .lenses {
    margin: 0 0 var(--uin-s-7);
  }
  .lenses-cap {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: var(--uin-s-4);
    margin-bottom: var(--uin-s-4);
  }
  .lenses-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(22px, 2.6vw, 28px);
    line-height: 1.15;
    letter-spacing: -0.015em;
  }
  .lenses-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--uin-s-3);
  }
  .lens {
    display: grid;
    gap: var(--uin-s-2);
    padding: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    background:
      radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--uin-accent) 5%, transparent) 0, transparent 58%),
      var(--uin-mat-row);
  }
  .lens-domain {
    font-family: var(--uin-font-mono);
    font-size: 10px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
  }
  .lens h3 {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -0.01em;
  }
  .lens p {
    margin: 0;
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    line-height: 1.5;
  }
  .lens code {
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-dim);
  }

  /* ───────────── FEATURES ───────────── */

  .features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--uin-s-3);
    margin-bottom: var(--uin-s-7);
  }
  .feature {
    display: grid;
    gap: var(--uin-s-2);
    padding: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .feature:hover {
    background: var(--uin-mat-hover);
    border-color: var(--uin-line-strong);
  }
  .feature-glyph {
    height: 64px;
    display: flex;
    align-items: center;
    border-radius: var(--uin-r-sm);
    background: color-mix(in srgb, var(--uin-bg-base) 50%, transparent);
    padding: 0 12px;
    margin-bottom: var(--uin-s-1);
  }
  .swatches { display: inline-flex; gap: 4px; }
  .swatches span {
    width: 18px;
    height: 18px;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #000 12%, transparent);
  }
  .cli-glyph {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-family: var(--uin-font-mono);
    font-size: 11.5px;
    color: var(--uin-fg);
  }
  .cli-prompt { color: var(--uin-fg-dim); }
  .cli-text em { color: var(--uin-accent); font-style: normal; }
  .a11y-glyph { display: inline-flex; gap: 6px; }
  .a11y-key {
    font-family: var(--uin-font-mono);
    font-size: 11px;
    padding: 3px 7px;
    border: 1px solid var(--uin-line-strong);
    border-radius: 4px;
    background: var(--uin-mat-panel);
    color: var(--uin-fg);
    box-shadow: 0 1px 0 var(--uin-line);
  }
  .mac-glyph { display: inline-flex; }

  .feature-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 15px;
    letter-spacing: -0.005em;
    color: var(--uin-fg);
  }
  .feature-body {
    margin: 0;
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    line-height: 1.55;
  }

  /* ───────────── CODE + PREVIEW ───────────── */

  .code {
    margin-bottom: var(--uin-s-7);
  }
  .code-cap, .marquee-cap {
    margin-bottom: var(--uin-s-4);
    max-width: 600px;
  }
  .code-eyebrow {
    display: block;
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-mute);
    margin-bottom: 6px;
  }
  .code-title, .marquee-title {
    margin: 0 0 var(--uin-s-2);
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(22px, 2.6vw, 28px);
    letter-spacing: -0.015em;
    line-height: 1.15;
  }
  .code-sub {
    margin: 0;
    color: var(--uin-fg-mute);
    font-size: 14px;
    line-height: 1.55;
  }

  .code-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--uin-s-3);
    align-items: stretch;
  }
  .code-snippet {
    margin: 0;
    padding: var(--uin-s-3) var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background:
      linear-gradient(180deg,
        color-mix(in srgb, var(--uin-bg-panel) 92%, transparent),
        var(--uin-bg-panel)
      );
    font-family: var(--uin-font-mono);
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--uin-fg);
    overflow-x: auto;
    white-space: pre;
    /* tab handling */
    tab-size: 2;
  }

  .code-preview {
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background:
      radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--uin-accent) 4%, transparent) 0, transparent 60%),
      var(--uin-mat-row);
    padding: var(--uin-s-4);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
  }
  .code-preview-frame {
    width: 100%;
    max-width: 320px;
    padding: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-bg-panel);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--uin-fg) 6%, transparent);
    display: grid;
    gap: 8px;
  }
  .code-preview-eyebrow {
    font-family: var(--uin-font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
  }
  .code-preview-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -0.01em;
  }
  .code-preview-body {
    margin: 0 0 6px;
    font-size: 13px;
    color: var(--uin-fg-mute);
  }

  /* ───────────── MARQUEE ───────────── */

  .marquee {
    margin-bottom: var(--uin-s-7);
  }
  .marquee-cap {
    display: grid;
    gap: 4px;
    position: relative;
  }
  .marquee-link {
    position: absolute;
    right: 0;
    bottom: 0;
    color: var(--uin-fg-mute);
    text-decoration: none;
    font-size: 13px;
    transition: color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .marquee-link:hover { color: var(--uin-accent); }

  .marquee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 6px;
  }
  .chip-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4px 8px;
    padding: 10px 12px;
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
    color: var(--uin-fg);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .chip-card:hover { background: var(--uin-mat-hover); border-color: var(--uin-line-strong); }
  .chip-card-name {
    font-weight: 500;
    font-size: 13px;
    letter-spacing: -0.005em;
  }
  .chip-card-cat {
    font-family: var(--uin-font-mono);
    font-size: 10px;
    color: var(--uin-fg-dim);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    align-self: center;
  }
  .chip-card-slug {
    grid-column: 1 / -1;
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-mute);
  }

  /* ───────────── CLOSER ───────────── */

  .closer {
    text-align: center;
    padding: var(--uin-s-7) 0 var(--uin-s-7);
    margin-top: var(--uin-s-6);
    border-top: 1px solid var(--uin-line);
  }
  .closer-title {
    margin: 0 0 var(--uin-s-2);
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: -0.015em;
    line-height: 1.15;
  }
  .closer-sub {
    margin: 0 0 var(--uin-s-4);
    color: var(--uin-fg-mute);
    font-size: 14.5px;
  }
  .closer-cta {
    display: inline-flex;
    gap: var(--uin-s-2);
    margin-bottom: var(--uin-s-4);
  }
  .install-bottom { margin: 0 auto; }

  /* ───────────── motion ───────────── */

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-body, .demo { animation: none; }
    .install-copied { animation: none; }
  }

  /* ───────────── responsive ───────────── */

  @media (max-width: 880px) {
    .lenses-grid,
    .features { grid-template-columns: repeat(2, 1fr); }
    .rails { grid-template-columns: repeat(2, 1fr); gap: var(--uin-s-3); }
    .rail { padding: 0 var(--uin-s-3); }
    .rail:nth-child(2) { border-right: none; }
    .code-grid { grid-template-columns: 1fr; }
    .window-body { grid-template-columns: 1fr; }
    .window-side {
      border-right: none;
      border-bottom: 1px solid var(--uin-line);
    }
    .window-stats { grid-template-columns: 1fr 1fr 1fr; }
  }

  @media (max-width: 560px) {
    .lenses-grid,
    .features { grid-template-columns: 1fr; }
    .rails { grid-template-columns: 1fr 1fr; }
    .rail:nth-child(2) { border-right: 1px solid var(--uin-line); }
    .marquee-link { position: static; margin-top: 8px; }
    .window-stats { grid-template-columns: repeat(2, 1fr); }
  }
</style>
