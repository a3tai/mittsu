<script lang="ts">
  import {goto} from '$app/navigation';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import Kbd from '@a3tai/mittsu-svelte5/components/kbd/kbd.svelte';
  import SegmentedControl from '@a3tai/mittsu-svelte5/components/segmented-control/segmented-control.svelte';
  import {components, categories, charts, chartCategories} from '$lib/docs';

  const installCmd = 'npx @a3tai/mittsu init';
  let copied = $state(false);
  let surface = $state<'components' | 'charts' | 'docs'>('components');

  const surfaceOptions = [
    {value: 'components' as const, label: 'Components'},
    {value: 'charts' as const, label: 'Charts'},
    {value: 'docs' as const, label: 'Docs'},
  ];

  const features = [
    {
      title: 'Copy the source',
      body: 'The CLI drops Svelte and CSS files into your repo. Own the implementation, keep the API small, and fork without waiting on a package release.',
      icon: 'source',
    },
    {
      title: 'Native product rhythm',
      body: 'Sidebars, title bars, command surfaces, status rows, inspectors, and dense tables share one quiet operating-system voice.',
      icon: 'native',
    },
    {
      title: 'Charts that belong',
      body: 'D3-powered SVG charts use the same tokens as the UI kit, so operational data reads like part of the application.',
      icon: 'charts',
    },
    {
      title: 'Tokened by default',
      body: 'Materials, foregrounds, lines, radii, focus rings, charts, and semantic status colors are CSS variables you can override.',
      icon: 'tokens',
    },
    {
      title: 'LLM-friendly APIs',
      body: 'Named variants, plain data arrays, and predictable prop shapes make generated screens easier to review and repair.',
      icon: 'agent',
    },
    {
      title: 'Accessible foundations',
      body: 'Keyboard paths, focus states, aria labels, and headless primitives are part of the baseline rather than a separate pass.',
      icon: 'a11y',
    },
  ];

  const routes = [
    {
      title: 'Components',
      href: '/components',
      count: components.length,
      meta: `${categories.length} categories`,
      body: 'Foundations, forms, shell components, overlays, navigation, data views, and macOS-flavored primitives.',
    },
    {
      title: 'Charts',
      href: '/charts',
      count: charts.length,
      meta: `${chartCategories.length} families`,
      body: 'Area, line, bar, donut, radar, radial, chart frame, and tooltip primitives for product dashboards.',
    },
    {
      title: 'Docs',
      href: '/docs',
      count: 4,
      meta: 'start here',
      body: 'Install the CLI, import tokens, add components, and keep the source in your application.',
    },
  ];

  function copyInstall() {
    navigator.clipboard?.writeText(installCmd);
    copied = true;
    setTimeout(() => (copied = false), 1400);
  }
</script>

<section class="lp-hero">
  <div class="lp-hero-grid">
    <div class="lp-hero-text">
      <div class="lp-hero-eyebrow">
        <span class="lp-dot" aria-hidden="true"></span>
        <span>Svelte 5 source kit</span>
        <a href="/docs">Read the setup notes -></a>
      </div>
      <h1 class="lp-headline">Mittsu UI for native-feeling product software.</h1>
      <p class="lp-lead">
        A source-first component and chart system for dense tools, local-first apps,
        admin consoles, and agent-built interfaces that need to stay coherent.
      </p>
      <div class="lp-hero-cta">
        <Button variant="primary" onclick={() => goto('/components')}>Browse components</Button>
        <Button variant="outline" onclick={() => goto('/charts')}>
          View charts
          <span class="lp-cta-arrow" aria-hidden="true">-></span>
        </Button>
      </div>
      <button class="install" type="button" onclick={copyInstall} aria-label="Copy install command">
        <span class="install-prompt" aria-hidden="true">$</span>
        <code>{installCmd}</code>
        <span class="install-action">
          {#if copied}
            <span class="install-copied">copied</span>
          {:else}
            <Kbd>copy</Kbd>
          {/if}
        </span>
      </button>
    </div>

    <div class="lp-product" aria-label="Mittsu product surface preview">
      <div class="lp-product-window">
        <div class="lp-product-titlebar">
          <span class="lp-tl lp-tl-red" aria-hidden="true"></span>
          <span class="lp-tl lp-tl-amber" aria-hidden="true"></span>
          <span class="lp-tl lp-tl-green" aria-hidden="true"></span>
          <span class="lp-product-titletext">Mittsu Workbench</span>
        </div>
        <div class="lp-product-body">
          <aside class="lp-product-side">
            <div class="lp-product-side-label">Library</div>
            <div class="lp-product-side-item lp-product-side-active">
              <span class="lp-product-side-glyph"></span>Components<span class="lp-product-side-count">{components.length}</span>
            </div>
            <div class="lp-product-side-item">
              <span class="lp-product-side-glyph"></span>Charts<span class="lp-product-side-count">{charts.length}</span>
            </div>
            <div class="lp-product-side-item">
              <span class="lp-product-side-glyph"></span>Docs
            </div>
            <div class="lp-product-side-label">Surfaces</div>
            <div class="lp-product-side-item">Shell</div>
            <div class="lp-product-side-item">Forms</div>
            <div class="lp-product-side-item">Data</div>
          </aside>

          <div class="lp-product-main">
            <div class="lp-product-toolbar">
              <span class="lp-product-crumb">Catalog</span>
              <span class="lp-product-count">{components.length + charts.length}</span>
              <span class="lp-product-toolbar-spacer"></span>
              <SegmentedControl bind:value={surface} options={surfaceOptions} size="sm" ariaLabel="Preview surface" />
            </div>

            <div class="lp-product-grouphead">
              <span class="lp-status-glyph lp-status-progress"></span>
              <span>{surface === 'components' ? 'Shell primitives' : surface === 'charts' ? 'Chart primitives' : 'Install flow'}</span>
              <span class="lp-product-count">{surface === 'components' ? 9 : surface === 'charts' ? charts.length : 4}</span>
            </div>

            <div class="lp-product-row">
              <span class="lp-prio lp-prio-accent"></span>
              <span class="lp-product-id">UI-001</span>
              <span class="lp-product-title">{surface === 'components' ? 'AppShell and Sidebar scaffold' : surface === 'charts' ? 'Work burn-down line chart' : 'Initialize components.json'}</span>
              <span class="lp-product-label">source</span>
              <span class="lp-product-avatar">MT</span>
            </div>
            <div class="lp-product-row">
              <span class="lp-prio lp-prio-warn"></span>
              <span class="lp-product-id">UI-002</span>
              <span class="lp-product-title">{surface === 'components' ? 'Command palette and keyboard affordances' : surface === 'charts' ? 'Queue intake stacked bars' : 'Import tokens once'}</span>
              <span class="lp-product-label">token</span>
              <span class="lp-product-avatar">S5</span>
            </div>
            <div class="lp-product-row">
              <span class="lp-prio lp-prio-ok"></span>
              <span class="lp-product-id">UI-003</span>
              <span class="lp-product-title">{surface === 'components' ? 'Inspector with grouped properties' : surface === 'charts' ? 'Collection mix donut chart' : 'Add button badge spinner'}</span>
              <span class="lp-product-label">docs</span>
              <span class="lp-product-avatar">D3</span>
            </div>

            <div class="lp-product-chart" aria-hidden="true">
              <div class="lp-chart-head">
                <span>Token coverage</span>
                <Badge variant="outline">live preview</Badge>
              </div>
              <div class="lp-chart-bars">
                <span style="--h: 48%; --tone: var(--uin-chart-info);"></span>
                <span style="--h: 72%; --tone: var(--uin-chart-success);"></span>
                <span style="--h: 58%; --tone: var(--uin-chart-warning);"></span>
                <span style="--h: 84%; --tone: var(--uin-accent);"></span>
                <span style="--h: 65%; --tone: var(--uin-chart-4);"></span>
                <span style="--h: 78%; --tone: var(--uin-chart-success);"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lp-product-floating">
        <span class="lp-kbd-floater"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
        <span class="lp-product-tip">Find any primitive</span>
      </div>
    </div>
  </div>
</section>

<section class="lp-logos" aria-label="Project signals">
  <span class="lp-logo">SOURCE-FIRST</span>
  <span class="lp-logo">SVELTE 5</span>
  <span class="lp-logo">D3 SVG</span>
  <span class="lp-logo">CSS TOKENS</span>
  <span class="lp-logo">NO TAILWIND REQUIRED</span>
</section>

<section class="lp-stats" aria-label="Library stats">
  <div class="lp-stat">
    <span class="lp-stat-num">{components.length}</span>
    <span class="lp-stat-label">components</span>
  </div>
  <div class="lp-stat">
    <span class="lp-stat-num">{charts.length}</span>
    <span class="lp-stat-label">charts</span>
  </div>
  <div class="lp-stat">
    <span class="lp-stat-num">{categories.length + chartCategories.length}</span>
    <span class="lp-stat-label">families</span>
  </div>
  <div class="lp-stat">
    <span class="lp-stat-num">0</span>
    <span class="lp-stat-label">runtime lock-in</span>
  </div>
</section>

<section class="lp-features" id="features">
  <div class="lp-section-head">
    <span class="lp-eyebrow">What's inside</span>
    <h2 class="lp-section-title">A quieter system for complicated product surfaces.</h2>
    <p class="lp-section-lead">
      Mittsu uses the same plain, low-friction visual language as the SaaS example:
      hairline grids, compact controls, earned accent color, and UI that stays out of the way.
    </p>
  </div>
  <div class="lp-feature-grid">
    {#each features as feature, idx}
      <article class="lp-feature">
        <span class="lp-feature-icon" aria-hidden="true">
          {#if feature.icon === 'source'}{'{ }'}
          {:else if feature.icon === 'native'}▤
          {:else if feature.icon === 'charts'}▥
          {:else if feature.icon === 'tokens'}◍
          {:else if feature.icon === 'agent'}⌘
          {:else}⇥
          {/if}
        </span>
        <h3>{feature.title}</h3>
        <p>{feature.body}</p>
        <span class="lp-feature-num">{String(idx + 1).padStart(2, '0')}</span>
      </article>
    {/each}
  </div>
</section>

<section class="lp-system">
  <div class="lp-system-grid">
    <div class="lp-system-copy">
      <span class="lp-eyebrow">Design system</span>
      <h2 class="lp-section-title">One token namespace. Every surface.</h2>
      <p class="lp-section-lead">
        Materials, text, borders, focus rings, charts, and semantic states all use
        the <code class="lp-inline-code">--uin-*</code> namespace. Override the variables,
        not every component.
      </p>
      <ul class="lp-system-list">
        <li><span class="lp-tick" aria-hidden="true">✓</span>Light, dark, and system themes</li>
        <li><span class="lp-tick" aria-hidden="true">✓</span>macOS-style materials without platform lock-in</li>
        <li><span class="lp-tick" aria-hidden="true">✓</span>Chart palettes that share UI semantics</li>
      </ul>
      <div class="lp-system-actions">
        <Button variant="outline" onclick={() => goto('/docs')}>Install guide</Button>
        <Button variant="ghost" onclick={() => goto('/components/typography')}>Typography -></Button>
      </div>
    </div>

    <div class="lp-tokens">
      <div class="lp-tokens-head">
        <span class="lp-tokens-dot" aria-hidden="true"></span>
        <span>tokens.css</span>
      </div>
      <pre><code><span class="lp-cm">/* Materials flip with theme automatically */</span>
<span class="lp-sel">:root</span> {'{'}
  <span class="lp-prop">--uin-accent</span>:     <span class="lp-val">#3b6cf6</span>;
  <span class="lp-prop">--uin-fg</span>:         <span class="lp-val">#1c1d22</span>;
  <span class="lp-prop">--uin-mat-window</span>: <span class="lp-val">#fbfbfd</span>;
  <span class="lp-prop">--uin-line</span>:       <span class="lp-val">color-mix(in srgb, #1c1d22 12%, transparent)</span>;
{'}'}

<span class="lp-sel">[data-theme='dark']</span> {'{'}
  <span class="lp-prop">--uin-fg</span>:         <span class="lp-val">#ebebf0</span>;
  <span class="lp-prop">--uin-mat-window</span>: <span class="lp-val">#171719</span>;
{'}'}</code></pre>
    </div>
  </div>
</section>

<section class="lp-routes">
  <div class="lp-section-head">
    <span class="lp-eyebrow">Reference</span>
    <h2 class="lp-section-title">Jump straight into the library.</h2>
  </div>
  <div class="lp-route-grid">
    {#each routes as route}
      <a class="lp-route" href={route.href}>
        <span class="lp-route-kicker">{route.meta}</span>
        <span class="lp-route-count">{route.count}</span>
        <h3>{route.title}</h3>
        <p>{route.body}</p>
        <span class="lp-route-arrow">Open -></span>
      </a>
    {/each}
  </div>
</section>

<section class="lp-cta">
  <div>
    <span class="lp-eyebrow">Ready when you are</span>
    <h2 class="lp-cta-title">Drop in the files. Own the system.</h2>
    <p class="lp-cta-lead">Start with the CLI, then tune the source for your product.</p>
  </div>
  <button class="install install-bottom" type="button" onclick={copyInstall} aria-label="Copy install command">
    <span class="install-prompt" aria-hidden="true">$</span>
    <code>{installCmd}</code>
    <span class="install-action">
      {#if copied}<span class="install-copied">copied</span>{:else}<Kbd>copy</Kbd>{/if}
    </span>
  </button>
</section>

<style>
  .lp-hero {
    position: relative;
    width: 100vw;
    margin-inline: calc(-50vw + 50%);
    margin-top: calc(-1 * var(--uin-s-7));
    padding: var(--uin-s-8) max(var(--uin-s-5), calc((100vw - 1180px) / 2)) var(--uin-s-7);
    background:
      radial-gradient(ellipse at 80% 0%, color-mix(in srgb, var(--uin-accent) 8%, transparent), transparent 55%),
      radial-gradient(ellipse at 0% 100%, color-mix(in srgb, var(--uin-accent) 4%, transparent), transparent 50%),
      var(--uin-mat-window);
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: var(--uin-s-6);
    align-items: center;
  }
  .lp-hero-text {
    max-width: 550px;
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-4);
  }
  .lp-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    width: fit-content;
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--uin-fg-mute);
  }
  .lp-hero-eyebrow a {
    color: var(--uin-accent);
    text-decoration: none;
  }
  .lp-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--uin-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--uin-accent) 30%, transparent);
  }
  .lp-headline {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 400;
    font-size: clamp(40px, 5.8vw, 64px);
    line-height: 1;
    letter-spacing: -0.028em;
    color: var(--uin-fg);
    text-wrap: balance;
  }
  .lp-lead {
    margin: 0;
    max-width: 520px;
    color: var(--uin-fg-mute);
    font-size: 16px;
    line-height: 1.6;
  }
  .lp-hero-cta {
    display: flex;
    align-items: center;
    gap: var(--uin-s-2);
    flex-wrap: wrap;
  }
  .lp-cta-arrow {
    margin-left: 6px;
  }
  .install {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    width: fit-content;
    padding: 8px 9px 8px 13px;
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    background: var(--uin-mat-window);
    color: var(--uin-fg);
    font-family: var(--uin-font-mono);
    font-size: 12.5px;
    cursor: pointer;
    transition:
      border-color var(--uin-dur-1),
      background-color var(--uin-dur-1);
  }
  .install:hover {
    border-color: var(--uin-line-strong);
    background: var(--uin-mat-hover);
  }
  .install:focus-visible {
    outline: none;
    box-shadow: var(--uin-focus-ring);
  }
  .install code {
    font-family: var(--uin-font-mono);
  }
  .install-prompt {
    color: var(--uin-fg-dim);
  }
  .install-action {
    display: inline-flex;
    margin-left: 6px;
  }
  .install-copied {
    font-family: var(--uin-font-ui);
    font-size: 11px;
    color: var(--uin-accent);
    padding: 1px 6px;
    border: 1px solid color-mix(in srgb, var(--uin-accent) 40%, transparent);
    border-radius: 4px;
  }

  .lp-product {
    position: relative;
    perspective: 1600px;
  }
  .lp-product-window {
    background: var(--uin-mat-window);
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-lg);
    overflow: hidden;
    box-shadow:
      0 30px 60px -40px color-mix(in srgb, var(--uin-fg) 40%, transparent),
      0 12px 24px -20px color-mix(in srgb, var(--uin-fg) 25%, transparent);
    transform: rotateY(-2deg) rotateX(2deg);
    transform-origin: 60% 40%;
  }
  .lp-product-titlebar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: var(--uin-mat-sidebar);
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-tl {
    width: 11px;
    height: 11px;
    border-radius: 999px;
    display: inline-block;
  }
  .lp-tl-red { background: #ff5f57; }
  .lp-tl-amber { background: #ffbd2e; }
  .lp-tl-green { background: #28c840; }
  .lp-product-titletext {
    margin-left: var(--uin-s-2);
    font-size: 11px;
    color: var(--uin-fg-dim);
  }
  .lp-product-body {
    display: grid;
    grid-template-columns: 160px 1fr;
    min-height: 390px;
  }
  .lp-product-side {
    background: var(--uin-mat-sidebar);
    border-right: 1px solid var(--uin-line);
    padding: var(--uin-s-2);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .lp-product-side-label {
    font-size: 10px;
    color: var(--uin-fg-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 10px 8px 4px;
    font-weight: 600;
  }
  .lp-product-side-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    font-size: 11.5px;
    color: var(--uin-fg-mute);
    border-radius: var(--uin-r-sm);
  }
  .lp-product-side-active {
    background: color-mix(in srgb, var(--uin-accent) 14%, transparent);
    color: var(--uin-fg);
  }
  .lp-product-side-glyph {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .lp-product-side-active .lp-product-side-glyph {
    background: var(--uin-accent);
    border-color: var(--uin-accent);
  }
  .lp-product-side-count {
    margin-left: auto;
    font-size: 10px;
    color: var(--uin-fg-dim);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 0 6px;
  }
  .lp-product-main {
    min-width: 0;
    padding: 6px 0 0;
    background: var(--uin-mat-window);
  }
  .lp-product-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px var(--uin-s-3);
    font-size: 11.5px;
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-product-crumb {
    font-weight: 600;
  }
  .lp-product-count {
    font-variant-numeric: tabular-nums;
    color: var(--uin-fg-dim);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
    border-radius: 999px;
    padding: 0 7px;
    font-size: 10.5px;
  }
  .lp-product-toolbar-spacer {
    flex: 1;
  }
  .lp-product-grouphead {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px var(--uin-s-3) 6px;
    font-size: 11.5px;
    font-weight: 600;
  }
  .lp-status-glyph {
    width: 11px;
    height: 11px;
    border-radius: 999px;
    border: 1.5px solid currentColor;
    display: inline-block;
    flex-shrink: 0;
  }
  .lp-status-progress {
    color: #d9a700;
    background: conic-gradient(currentColor 50%, transparent 50%);
  }
  .lp-product-row {
    display: grid;
    grid-template-columns: 14px 58px 1fr auto auto;
    align-items: center;
    gap: 8px;
    padding: 7px var(--uin-s-3);
    border-top: 1px solid var(--uin-line);
    font-size: 11.5px;
  }
  .lp-prio {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }
  .lp-prio-accent { background: var(--uin-accent); }
  .lp-prio-warn { background: #e4a23a; }
  .lp-prio-ok { background: #6dbe9a; }
  .lp-product-id {
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    color: var(--uin-fg-dim);
  }
  .lp-product-title {
    color: var(--uin-fg);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lp-product-label {
    border: 1px solid var(--uin-line);
    background: var(--uin-mat-row);
    border-radius: 999px;
    padding: 0 7px;
    font-size: 10px;
    color: var(--uin-fg-mute);
  }
  .lp-product-avatar {
    width: 19px;
    height: 19px;
    border-radius: 999px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--uin-accent) 70%, white), color-mix(in srgb, var(--uin-accent) 40%, black));
    color: var(--uin-accent-fg);
    font-size: 9.5px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
  }
  .lp-product-chart {
    margin: var(--uin-s-3);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
    padding: var(--uin-s-3);
  }
  .lp-chart-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--uin-s-2);
    margin-bottom: var(--uin-s-3);
    font-size: 12px;
    color: var(--uin-fg-mute);
  }
  .lp-chart-bars {
    height: 108px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: end;
    gap: var(--uin-s-2);
  }
  .lp-chart-bars span {
    height: var(--h);
    border-radius: 4px 4px 0 0;
    background: color-mix(in srgb, var(--tone) 78%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tone) 30%, transparent);
  }
  .lp-product-floating {
    position: absolute;
    bottom: -16px;
    left: -16px;
    background: var(--uin-mat-window);
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-md);
    padding: 8px 12px;
    display: inline-flex;
    align-items: center;
    gap: var(--uin-s-2);
    box-shadow: 0 10px 30px -16px color-mix(in srgb, var(--uin-fg) 30%, transparent);
  }
  .lp-kbd-floater {
    display: inline-flex;
    gap: 2px;
  }
  .lp-product-tip {
    font-size: 11.5px;
    color: var(--uin-fg-mute);
  }

  .lp-logos {
    width: 100vw;
    margin-inline: calc(-50vw + 50%);
    padding: var(--uin-s-5) max(var(--uin-s-5), calc((100vw - 1180px) / 2));
    border-bottom: 1px solid var(--uin-line);
    display: flex;
    justify-content: center;
    gap: var(--uin-s-6);
    flex-wrap: wrap;
  }
  .lp-logo {
    font-family: var(--uin-font-display);
    font-size: 13px;
    letter-spacing: 0.16em;
    color: var(--uin-fg-faint);
  }
  .lp-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    padding: var(--uin-s-5) 0;
    border-bottom: 1px solid var(--uin-line);
    margin-bottom: var(--uin-s-8);
  }
  .lp-stat {
    display: grid;
    gap: 4px;
    padding: 0 var(--uin-s-4);
    border-right: 1px solid var(--uin-line);
  }
  .lp-stat:last-child {
    border-right: 0;
  }
  .lp-stat-num {
    font-family: var(--uin-font-display);
    font-size: clamp(28px, 3.4vw, 40px);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--uin-fg);
    font-variant-numeric: tabular-nums;
  }
  .lp-stat-label {
    color: var(--uin-fg-mute);
    font-size: 11.5px;
  }

  .lp-section-head {
    max-width: 760px;
    margin-bottom: var(--uin-s-6);
  }
  .lp-eyebrow {
    display: block;
    margin-bottom: var(--uin-s-2);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .lp-section-title {
    margin: 0;
    max-width: 22ch;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(28px, 3.6vw, 42px);
    line-height: 1.08;
    letter-spacing: -0.022em;
    color: var(--uin-fg);
  }
  .lp-section-lead {
    margin: var(--uin-s-2) 0 0;
    max-width: 60ch;
    color: var(--uin-fg-mute);
    font-size: 15px;
    line-height: 1.6;
  }
  .lp-features {
    margin-bottom: var(--uin-s-8);
  }
  .lp-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--uin-line);
    border-left: 1px solid var(--uin-line);
  }
  .lp-feature {
    position: relative;
    min-height: 220px;
    padding: var(--uin-s-5);
    border-right: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-2);
    transition: background-color var(--uin-dur-1);
  }
  .lp-feature:hover {
    background: var(--uin-mat-hover);
  }
  .lp-feature-icon {
    width: 32px;
    height: 32px;
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-sm);
    background: var(--uin-mat-row);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--uin-fg);
    font-family: var(--uin-font-mono);
    font-size: 13px;
  }
  .lp-feature h3 {
    margin: 0;
    font-family: var(--uin-font-display);
    font-size: 19px;
    line-height: 1.2;
    letter-spacing: -0.012em;
  }
  .lp-feature p {
    margin: 0;
    max-width: 36ch;
    color: var(--uin-fg-mute);
    font-size: 13.5px;
    line-height: 1.55;
  }
  .lp-feature-num {
    position: absolute;
    top: var(--uin-s-4);
    right: var(--uin-s-4);
    font-family: var(--uin-font-mono);
    font-size: 10.5px;
    color: var(--uin-fg-faint);
    letter-spacing: 0.06em;
  }

  .lp-system {
    width: 100vw;
    margin-inline: calc(-50vw + 50%);
    margin-bottom: var(--uin-s-8);
    padding: var(--uin-s-8) max(var(--uin-s-5), calc((100vw - 1180px) / 2));
    background: var(--uin-mat-sidebar);
    border-top: 1px solid var(--uin-line);
    border-bottom: 1px solid var(--uin-line);
  }
  .lp-system-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: var(--uin-s-6);
    align-items: center;
  }
  .lp-system-copy {
    max-width: 530px;
  }
  .lp-inline-code {
    font-family: var(--uin-font-mono);
    font-size: 0.9em;
    padding: 1px 6px;
    border-radius: var(--uin-r-sm);
    background: var(--uin-mat-row);
    border: 1px solid var(--uin-line);
  }
  .lp-system-list {
    list-style: none;
    margin: var(--uin-s-3) 0 0;
    padding: 0;
    display: grid;
    gap: var(--uin-s-1);
    color: var(--uin-fg-mute);
    font-size: 13.5px;
  }
  .lp-tick {
    display: inline-block;
    width: 18px;
    color: var(--uin-accent);
  }
  .lp-system-actions {
    margin-top: var(--uin-s-4);
    display: flex;
    flex-wrap: wrap;
    gap: var(--uin-s-2);
  }
  .lp-tokens {
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-md);
    overflow: hidden;
    background: var(--uin-mat-window);
    box-shadow: 0 20px 40px -30px color-mix(in srgb, var(--uin-fg) 30%, transparent);
  }
  .lp-tokens-head {
    display: flex;
    align-items: center;
    gap: var(--uin-s-2);
    padding: 8px var(--uin-s-3);
    background: var(--uin-mat-sidebar);
    border-bottom: 1px solid var(--uin-line);
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-mute);
  }
  .lp-tokens-dot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: var(--uin-accent);
  }
  .lp-tokens pre {
    margin: 0;
    padding: var(--uin-s-4);
    overflow-x: auto;
    white-space: pre;
    font-family: var(--uin-font-mono);
    font-size: 12px;
    line-height: 1.7;
    color: var(--uin-fg);
  }
  .lp-cm { color: var(--uin-fg-faint); font-style: italic; }
  .lp-sel { color: #b76b50; }
  .lp-prop { color: var(--uin-accent); }
  .lp-val { color: var(--uin-fg-mute); }

  .lp-routes {
    margin-bottom: var(--uin-s-8);
  }
  .lp-route-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--uin-s-3);
  }
  .lp-route {
    position: relative;
    min-height: 230px;
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-2);
    padding: var(--uin-s-5);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    background: var(--uin-mat-window);
    color: inherit;
    text-decoration: none;
    transition:
      border-color var(--uin-dur-1),
      background-color var(--uin-dur-1),
      transform var(--uin-dur-2);
  }
  .lp-route:hover {
    border-color: var(--uin-line-strong);
    background: var(--uin-mat-hover);
    text-decoration: none;
    transform: translateY(-2px);
  }
  .lp-route-kicker {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--uin-fg-dim);
    font-weight: 600;
  }
  .lp-route-count {
    position: absolute;
    top: var(--uin-s-4);
    right: var(--uin-s-4);
    font-family: var(--uin-font-display);
    font-size: 36px;
    line-height: 1;
    color: var(--uin-fg-faint);
  }
  .lp-route h3 {
    margin: var(--uin-s-3) 0 0;
    font-family: var(--uin-font-display);
    font-size: 24px;
    letter-spacing: -0.014em;
  }
  .lp-route p {
    margin: 0;
    color: var(--uin-fg-mute);
    line-height: 1.55;
    font-size: 13.5px;
    flex: 1;
  }
  .lp-route-arrow {
    color: var(--uin-accent);
    font-size: 13px;
  }

  .lp-cta {
    border: 1px solid var(--uin-line-strong);
    border-radius: var(--uin-r-lg);
    padding: var(--uin-s-6);
    background:
      radial-gradient(ellipse at top right, color-mix(in srgb, var(--uin-accent) 15%, transparent), transparent 60%),
      var(--uin-mat-window);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--uin-s-5);
    align-items: center;
  }
  .lp-cta-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-size: clamp(26px, 3.4vw, 36px);
    line-height: 1.1;
    letter-spacing: -0.022em;
  }
  .lp-cta-lead {
    margin: var(--uin-s-2) 0 0;
    color: var(--uin-fg-mute);
  }

  @media (max-width: 1080px) {
    .lp-hero-grid,
    .lp-system-grid,
    .lp-route-grid {
      grid-template-columns: 1fr;
    }
    .lp-product-window {
      transform: none;
    }
    .lp-product-floating {
      left: 50%;
      transform: translateX(-50%);
    }
    .lp-feature-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 720px) {
    .lp-hero,
    .lp-system,
    .lp-logos {
      padding-left: var(--uin-s-3);
      padding-right: var(--uin-s-3);
    }
    .lp-product-body {
      grid-template-columns: 1fr;
    }
    .lp-product-side {
      display: none;
    }
    .lp-product-row {
      grid-template-columns: 14px 54px 1fr auto;
    }
    .lp-product-label {
      display: none;
    }
    .lp-stats,
    .lp-feature-grid,
    .lp-cta {
      grid-template-columns: 1fr;
    }
    .lp-stat {
      border-right: 0;
      border-bottom: 1px solid var(--uin-line);
      padding: var(--uin-s-3) 0;
    }
    .lp-stat:last-child {
      border-bottom: 0;
    }
  }
</style>
