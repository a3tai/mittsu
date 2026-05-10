<script lang="ts">
  import AreaChart from '@a3tai/mittsu-charts/components/area-chart/area-chart.svelte';
  import BarChart from '@a3tai/mittsu-charts/components/bar-chart/bar-chart.svelte';
  import ChartFrame from '@a3tai/mittsu-charts/components/chart-frame/chart-frame.svelte';
  import ChartTooltip from '@a3tai/mittsu-charts/components/chart-tooltip/chart-tooltip.svelte';
  import DonutChart from '@a3tai/mittsu-charts/components/donut-chart/donut-chart.svelte';
  import LineChart from '@a3tai/mittsu-charts/components/line-chart/line-chart.svelte';
  import RadarChart from '@a3tai/mittsu-charts/components/radar-chart/radar-chart.svelte';
  import RadialChart from '@a3tai/mittsu-charts/components/radial-chart/radial-chart.svelte';
  import {
    activitySignals,
    chartCategories,
    chartRecipes,
    charts,
    collectionMix,
    compact,
    platformReadiness,
    readinessRings,
    workIntake,
    workTrend
  } from '$lib/docs/charts';

  function sectionNumber(i: number) {
    return String(i + 1).padStart(2, '0');
  }

  const workMetrics = [
    {label: 'Urgent open', value: '14', color: 'var(--uin-chart-critical)', description: '-67% in 6 weeks'},
    {label: 'Queued', value: '61', color: 'var(--uin-chart-warning)', description: 'needs review'},
    {label: 'Completed', value: '105', color: 'var(--uin-chart-success)', description: 'closed this cycle'}
  ];

  const chartPrinciples = [
    'Semantic tokens for risk, status, and product categories',
    'Plain data arrays plus series objects that LLMs can generate safely',
    'SVG output with D3 scales, paths, arcs, stacks, and hidden data tables'
  ];
</script>

<header class="hd">
  <div class="hd-copy">
    <p class="eyebrow">Charts</p>
    <h1>Data visualization primitives for native product work.</h1>
    <p class="sub">
      SVG charts powered by D3 math, styled by the same tokens as the UI kit.
      Built for admin consoles, developer tools, local-first libraries, and
      cross-platform apps that need charts to feel designed instead of pasted in.
    </p>
  </div>

  <aside class="hd-brief" aria-label="Chart design principles">
    <span class="brief-kicker">LLM design contract</span>
    {#each chartPrinciples as principle}
      <span class="brief-row">
        <span class="brief-dot" aria-hidden="true"></span>
        {principle}
      </span>
    {/each}
  </aside>

  <dl class="stats">
    <div class="stat">
      <dt>Components</dt>
      <dd>{charts.length}</dd>
    </div>
    <div class="stat">
      <dt>Families</dt>
      <dd>{chartCategories.length}</dd>
    </div>
    <div class="stat">
      <dt>D3 packages</dt>
      <dd>3<span class="stat-unit"> sub-pkgs</span></dd>
    </div>
    <div class="stat">
      <dt>Runtime deps</dt>
      <dd>0</dd>
    </div>
  </dl>
</header>

<section class="hero" aria-label="Operations chart example">
  <div class="hero-chart">
    <LineChart
      xKey="week"
      title="Work burn-down"
      description="Urgent work, queued work, and completed items over the last six weeks"
      data={workTrend}
      width={780}
      height={330}
      aspectRatio={2.35}
      curve="monotone"
      showArea
      showPoints
      metrics={workMetrics}
      series={[
        {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
        {key: 'queued', label: 'Queued', color: 'var(--uin-chart-warning)'},
        {key: 'completed', label: 'Completed', color: 'var(--uin-chart-success)'}
      ]}
      valueFormatter={(value) => compact.format(value)}
    />
  </div>
  <div class="hero-side">
    <BarChart
      xKey="surface"
      title="Work intake"
      description="Grouped by queue"
      data={workIntake}
      width={420}
      height={260}
      aspectRatio={1.7}
      showGrid={false}
      showLegend={false}
      stacked
      series={[
        {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
        {key: 'high', label: 'High', color: 'var(--uin-chart-danger)'},
        {key: 'medium', label: 'Medium', color: 'var(--uin-chart-warning)'}
      ]}
    />
  </div>
</section>

<section class="recipes" aria-label="Chart recipes for product teams">
  {#each chartRecipes as recipe}
    <article class="recipe">
      <span class="recipe-domain">{recipe.domain}</span>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <dl>
        <div><dt>Chart</dt><dd>{recipe.chart}</dd></div>
        <div><dt>Palette</dt><dd>{recipe.palette}</dd></div>
      </dl>
      <code>{recipe.prompt}</code>
    </article>
  {/each}
</section>

{#each chartCategories as cat, sIdx}
  {@const items = charts.filter((chart) => chart.category === cat)}
  {#if items.length}
    <section class="section">
      <header class="section-head">
        <span class="section-num">{sectionNumber(sIdx)}</span>
        <h2 class="section-title">{cat}</h2>
        <span class="section-count">{items.length}</span>
      </header>

      <div class="mosaic mosaic-{items.length}">
        {#each items as chart, cIdx (chart.name)}
          <a class="card" href="/charts/{chart.name}" data-pos={cIdx}>
            <div class="canvas" aria-hidden="true">
              {#if chart.name === 'area-chart'}
                <AreaChart
                  xKey="day"
                  data={activitySignals}
                  width={520}
                  height={210}
                  aspectRatio={2.4}
                  showGrid={false}
                  showLegend={false}
                  series={[
                    {key: 'builds', label: 'Builds', color: 'var(--uin-chart-info)'},
                    {key: 'syncs', label: 'Syncs', color: 'var(--uin-chart-danger)'},
                    {key: 'jobs', label: 'Jobs', color: 'var(--uin-chart-4)'}
                  ]}
                  valueFormatter={(value) => compact.format(value)}
                />
              {:else if chart.name === 'bar-chart'}
                <BarChart
                  xKey="surface"
                  data={workIntake}
                  width={520}
                  height={210}
                  aspectRatio={2.4}
                  showGrid={false}
                  showLegend={false}
                  series={[
                    {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
                    {key: 'high', label: 'High', color: 'var(--uin-chart-danger)'},
                    {key: 'medium', label: 'Medium', color: 'var(--uin-chart-warning)'}
                  ]}
                />
              {:else if chart.name === 'line-chart'}
                <LineChart
                  xKey="week"
                  data={workTrend}
                  width={520}
                  height={210}
                  aspectRatio={2.4}
                  showGrid={false}
                  showLegend={false}
                  showPoints
                  series={[
                    {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
                    {key: 'queued', label: 'Queued', color: 'var(--uin-chart-warning)'}
                  ]}
                  valueFormatter={(value) => compact.format(value)}
                />
              {:else if chart.name === 'donut-chart'}
                <DonutChart
                  data={collectionMix}
                  width={420}
                  height={210}
                  aspectRatio={1.9}
                  showLegend={false}
                  centerLabel="Library"
                  valueFormatter={(value) => compact.format(value)}
                />
              {:else if chart.name === 'radar-chart'}
                <RadarChart
                  data={platformReadiness}
                  width={420}
                  height={250}
                  aspectRatio={1.55}
                  maxValue={100}
                  showLegend={false}
                  showPoints
                  series={[
                    {key: 'native', label: 'Native', color: 'var(--uin-chart-info)'},
                    {key: 'mobile', label: 'Mobile', color: 'var(--uin-chart-4)'}
                  ]}
                />
              {:else if chart.name === 'radial-chart'}
                <RadialChart
                  data={readinessRings}
                  width={420}
                  height={230}
                  aspectRatio={1.7}
                  showLegend={false}
                  centerLabel="Readiness"
                  valueFormatter={(value) => compact.format(value)}
                />
              {:else if chart.name === 'chart-frame'}
                <ChartFrame
                  title="Chart Frame"
                  description="Shared shell with metrics and legend."
                  metrics={[
                    {label: 'Urgent', value: '14', color: 'var(--uin-chart-critical)'},
                    {label: 'Completed', value: '105', color: 'var(--uin-chart-success)'}
                  ]}
                  legend={[
                    {key: 'urgent', label: 'Urgent', color: 'var(--uin-chart-critical)'},
                    {key: 'completed', label: 'Completed', color: 'var(--uin-chart-success)'}
                  ]}
                >
                  <div class="frame-bars">
                    <span style="height: 46%;"></span>
                    <span style="height: 62%;"></span>
                    <span style="height: 38%;"></span>
                    <span style="height: 78%;"></span>
                    <span style="height: 54%;"></span>
                  </div>
                </ChartFrame>
              {:else if chart.name === 'chart-tooltip'}
                <div class="tooltip-stage">
                  <ChartTooltip
                    label="July 16, 2024"
                    rows={[
                      {key: 'running', label: 'Running', value: '380', unit: 'kcal', color: 'var(--uin-chart-1)'},
                      {key: 'swimming', label: 'Swimming', value: '420', unit: 'kcal', color: 'var(--uin-chart-2)'}
                    ]}
                    total="800 kcal"
                  />
                </div>
              {/if}
            </div>

            <div class="meta">
              <h3 class="card-title">{chart.title}</h3>
              <p class="card-desc">{chart.description}</p>
              <span class="card-cta">
                <code>{chart.name}</code>
                <span class="arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}
{/each}

<style>
  /* ------- header ------------------------------------------------------ */

  .hd {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: var(--uin-s-6);
    align-items: end;
    margin: 0 0 var(--uin-s-6);
    animation: fade-up 360ms var(--uin-ease-standard, ease) both;
  }
  .hd-copy { max-width: 760px; }
  .hd .eyebrow {
    margin: 0 0 6px;
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--uin-fg-mute);
    font-weight: 500;
  }
  .hd h1 {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: clamp(34px, 5vw, 56px);
    line-height: 1.02;
    letter-spacing: -0.022em;
  }
  .hd .sub {
    margin: var(--uin-s-2) 0 0;
    color: var(--uin-fg-mute);
    font-size: 14.5px;
    line-height: 1.55;
    max-width: 66ch;
  }
  .hd-brief {
    display: grid;
    gap: var(--uin-s-2);
    padding: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    background:
      radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--uin-chart-info) 10%, transparent) 0, transparent 58%),
      var(--uin-mat-row);
  }
  .brief-kicker {
    font-family: var(--uin-font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
  }
  .brief-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--uin-s-2);
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    line-height: 1.45;
  }
  .brief-dot {
    width: 7px;
    height: 7px;
    margin-top: 5px;
    border-radius: 999px;
    background: var(--uin-chart-info);
  }

  .stats {
    grid-column: 1 / -1;
    margin: var(--uin-s-5) 0 0;
    padding: var(--uin-s-3) 0 0;
    border-top: 1px solid var(--uin-line);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--uin-s-3);
  }
  .stat {
    margin: 0;
    display: grid;
    gap: 2px;
  }
  .stat dt {
    margin: 0;
    font-size: 10.5px;
    letter-spacing: 0.04em;
    color: var(--uin-fg-dim);
    text-transform: uppercase;
    font-weight: 500;
  }
  .stat dd {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 22px;
    line-height: 1;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    color: var(--uin-fg);
  }
  .stat-unit {
    font-family: var(--uin-font-ui);
    font-size: 11px;
    font-weight: 400;
    color: var(--uin-fg-dim);
    margin-left: 4px;
  }

  /* ------- hero -------------------------------------------------------- */

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.85fr);
    gap: var(--uin-s-3);
    align-items: stretch;
    margin: var(--uin-s-6) 0 var(--uin-s-5);
    padding: var(--uin-s-3);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-xl);
    background:
      radial-gradient(circle at 16% 0%, color-mix(in srgb, var(--uin-chart-critical) 8%, transparent) 0, transparent 34%),
      radial-gradient(circle at 92% 18%, color-mix(in srgb, var(--uin-chart-info) 10%, transparent) 0, transparent 40%),
      var(--uin-mat-window);
    animation: fade-up 480ms var(--uin-ease-standard, ease) 80ms both;
  }
  .hero-chart,
  .hero-side {
    min-width: 0;
  }
  .hero :global(.uin-line-chart) {
    min-height: 240px;
  }
  .hero :global(.uin-chart-frame) {
    height: 100%;
  }

  /* ------- recipes ----------------------------------------------------- */

  .recipes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--uin-s-3);
    margin: 0 0 var(--uin-s-7);
  }
  .recipe {
    display: grid;
    gap: var(--uin-s-2);
    padding: var(--uin-s-4);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-lg);
    background: var(--uin-mat-row);
  }
  .recipe-domain {
    font-family: var(--uin-font-mono);
    font-size: 10px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--uin-fg-dim);
  }
  .recipe h2 {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 17px;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .recipe p {
    margin: 0;
    color: var(--uin-fg-mute);
    font-size: 12.5px;
    line-height: 1.5;
  }
  .recipe dl {
    display: grid;
    gap: 4px;
    margin: var(--uin-s-1) 0 0;
  }
  .recipe dl div {
    display: flex;
    justify-content: space-between;
    gap: var(--uin-s-2);
    padding-top: 4px;
    border-top: 1px solid var(--uin-line);
  }
  .recipe dt,
  .recipe dd {
    margin: 0;
    font-size: 11.5px;
  }
  .recipe dt { color: var(--uin-fg-dim); }
  .recipe dd { color: var(--uin-fg); text-align: right; }
  .recipe code {
    margin-top: var(--uin-s-1);
    font-family: var(--uin-font-mono);
    font-size: 11px;
    line-height: 1.45;
    color: var(--uin-fg-mute);
  }

  /* ------- sections ---------------------------------------------------- */

  .section {
    margin-bottom: var(--uin-s-7);
    padding-top: var(--uin-s-5);
    border-top: 1px solid var(--uin-line);
  }
  .section-head {
    display: flex;
    align-items: baseline;
    gap: var(--uin-s-2);
    margin-bottom: var(--uin-s-4);
  }
  .section-num {
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-dim);
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }
  .section-title {
    margin: 0;
    font-family: var(--uin-font-display);
    font-weight: 500;
    font-size: 18px;
    line-height: 1;
    letter-spacing: -0.01em;
    color: var(--uin-fg);
  }
  .section-count {
    margin-left: auto;
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-dim);
  }

  /* ------- mosaic grid ------------------------------------------------- */

  .mosaic {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--uin-s-3);
  }
  .mosaic-1 .card { grid-column: span 12; }
  .mosaic-2 .card { grid-column: span 6; }
  .mosaic-3 .card[data-pos='0'] { grid-column: span 12; }
  .mosaic-3 .card[data-pos='1'],
  .mosaic-3 .card[data-pos='2'] { grid-column: span 6; }
  .mosaic-4 .card[data-pos='0'] { grid-column: span 8; }
  .mosaic-4 .card[data-pos='1'] { grid-column: span 4; }
  .mosaic-4 .card[data-pos='2'],
  .mosaic-4 .card[data-pos='3'] { grid-column: span 6; }

  /* ------- card -------------------------------------------------------- */

  .card {
    display: flex;
    flex-direction: column;
    gap: var(--uin-s-3);
    padding: var(--uin-s-3);
    border: 1px solid var(--uin-line);
    border-radius: var(--uin-r-md);
    background: var(--uin-mat-row);
    color: var(--uin-fg);
    text-decoration: none;
    transition:
      background-color var(--uin-dur-1) var(--uin-ease-standard),
      border-color var(--uin-dur-1) var(--uin-ease-standard);
    animation: fade-up 420ms var(--uin-ease-standard, ease)
      calc(180ms + var(--row-stagger, 0) * 40ms) both;
  }
  .card[data-pos='0'] { --row-stagger: 0; }
  .card[data-pos='1'] { --row-stagger: 1; }
  .card[data-pos='2'] { --row-stagger: 2; }
  .card[data-pos='3'] { --row-stagger: 3; }

  .card:hover {
    background: var(--uin-mat-hover);
    border-color: var(--uin-line-strong);
  }
  .card:focus-visible {
    outline: none;
    border-color: var(--uin-accent);
    box-shadow: var(--uin-focus-ring);
  }

  .canvas {
    flex: 1 1 auto;
    display: grid;
    place-items: center;
    min-height: 180px;
    padding: var(--uin-s-2);
    border-radius: var(--uin-r-sm);
    background: color-mix(in srgb, var(--uin-bg-base) 64%, transparent);
  }
  .mosaic-3 .card[data-pos='0'] .canvas,
  .mosaic-4 .card[data-pos='0'] .canvas {
    min-height: 240px;
  }
  .canvas :global(.uin-chart-frame) {
    width: 100%;
    border: none;
    background: transparent;
    padding: 0;
    box-shadow: none;
  }
  .canvas :global(.uin-chart-tick) { font-size: 9px; }
  .canvas :global(.uin-chart-tooltip) { display: none; }
  .canvas .tooltip-stage {
    position: relative;
    width: 100%;
    min-height: 130px;
  }
  .canvas .tooltip-stage :global(.uin-chart-tooltip) {
    display: block;
    position: static;
    transform: none;
  }
  .frame-bars {
    display: flex;
    align-items: end;
    gap: 8px;
    height: 88px;
    padding: var(--uin-s-3) var(--uin-s-2) 0;
  }
  .frame-bars span {
    flex: 1 1 0;
    border-radius: 5px 5px 2px 2px;
    background: linear-gradient(180deg, var(--uin-chart-1), var(--uin-chart-2));
    opacity: 0.86;
  }

  .meta {
    display: grid;
    gap: 4px;
    padding-top: var(--uin-s-2);
    border-top: 1px solid var(--uin-line);
  }
  .card-title {
    margin: 0;
    font-weight: 500;
    font-size: 13.5px;
    color: var(--uin-fg);
    letter-spacing: -0.005em;
  }
  .card-desc {
    margin: 0;
    font-size: 12px;
    line-height: 1.45;
    color: var(--uin-fg-mute);
  }
  .card-cta {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 12px;
  }
  .card-cta code {
    font-family: var(--uin-font-mono);
    font-size: 11px;
    color: var(--uin-fg-dim);
  }
  .arrow {
    color: var(--uin-fg-mute);
    transition:
      transform var(--uin-dur-1) var(--uin-ease-standard),
      color var(--uin-dur-1) var(--uin-ease-standard);
  }
  .card:hover .arrow {
    color: var(--uin-accent);
    transform: translateX(2px);
  }

  /* feature card — slightly larger title only */
  .mosaic-3 .card[data-pos='0'] .card-title,
  .mosaic-4 .card[data-pos='0'] .card-title {
    font-size: 15px;
  }

  /* ------- motion ----------------------------------------------------- */

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hd, .hero, .card { animation: none; }
  }

  /* ------- responsive ------------------------------------------------- */

  @media (max-width: 760px) {
    .hd,
    .hero {
      grid-template-columns: 1fr;
    }
    .hd-brief { align-self: stretch; }
    .stats { grid-template-columns: repeat(2, 1fr); }
    .recipes { grid-template-columns: 1fr 1fr; }
    .mosaic-2 .card,
    .mosaic-3 .card,
    .mosaic-4 .card { grid-column: span 12 !important; }
  }

  @media (max-width: 540px) {
    .recipes { grid-template-columns: 1fr; }
    .hero { padding: var(--uin-s-2); }
  }
</style>
