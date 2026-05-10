<!--
@component LineChart - SVG line/area chart powered by D3 scales and shapes.

Supports point, linear, and time x-scales. Multiple series render as paths;
optional area fill and points use the same series configuration. CSS lives in
./line-chart.css and depends on ../chart-frame/chart-frame.css.
-->
<script lang="ts">
  import {extent, max, min, ticks as d3Ticks} from 'd3-array';
  import {scaleLinear, scalePoint, scaleUtc} from 'd3-scale';
  import {
    area as d3Area,
    curveLinear,
    curveMonotoneX,
    curveStep,
    line as d3Line
  } from 'd3-shape';
  import type {HTMLAttributes} from 'svelte/elements';
  import ChartFrame from '../chart-frame/chart-frame.svelte';
  import ChartTooltip from '../chart-tooltip/chart-tooltip.svelte';
  import {cn} from '../../lib/cn';
  import type {
    ChartDatum,
    ChartMargin,
    ChartMetric,
    ChartSeries,
    ChartTooltipIndicator,
    ChartTooltipRow,
    ChartValueFormatter,
    ChartX,
    ChartXFormatter,
    XScaleKind
  } from '../../lib/types';
  import {
    buildLegend,
    formatValue,
    formatX,
    getSeriesColor,
    inferXKind,
    isChartX,
    nextChartId,
    normalizeMargin,
    padDomain,
    toDate,
    toNumber,
    uniqueStrings
  } from '../../lib/utils';

  const chartId = nextChartId('uin-line-chart');
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;
  const tableId = `${chartId}-table`;

  export type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    data: ChartDatum[];
    series: ChartSeries[];
    xKey?: string;
    xType?: XScaleKind;
    /** Target chart width in user units. When `responsive` is true (default), the rendered width follows the container and `width` becomes the fallback / SSR size. */
    width?: number;
    /** Target chart height in user units. When `responsive` is true and `aspectRatio` is set, the rendered height is derived from the observed width. */
    height?: number;
    /** Default true. When true, the chart observes its container and recomputes scales when it resizes. */
    responsive?: boolean;
    /** Width / height ratio used to derive height from observed width when responsive. Defaults to `width / height`. */
    aspectRatio?: number;
    margin?: Partial<ChartMargin>;
    yDomain?: [number, number];
    curve?: 'linear' | 'monotone' | 'step';
    showArea?: boolean;
    showGrid?: boolean;
    showLabels?: boolean;
    showLegend?: boolean;
    showPoints?: boolean;
    title?: string;
    description?: string;
    metrics?: ChartMetric[];
    tooltipIndicator?: ChartTooltipIndicator;
    hideTooltipLabel?: boolean;
    valueFormatter?: ChartValueFormatter;
    xFormatter?: ChartXFormatter;
    class?: string;
  };

  const DEFAULT_MARGIN: ChartMargin = {top: 12, right: 14, bottom: 28, left: 40};

  let {
    data,
    series,
    xKey = 'x',
    xType,
    width: widthProp = 640,
    height: heightProp = 260,
    responsive = true,
    aspectRatio,
    margin,
    yDomain,
    curve = 'monotone',
    showArea = false,
    showGrid = true,
    showLabels = false,
    showLegend = true,
    showPoints = false,
    title,
    description,
    metrics = [],
    tooltipIndicator = 'dot',
    hideTooltipLabel = false,
    valueFormatter,
    xFormatter,
    class: className,
    ...rest
  }: Props = $props();

  type ActivePoint = {
    datum: ChartDatum;
    x: number;
    y: number;
  };

  let active: ActivePoint | null = $state(null);
  let svgEl: SVGSVGElement | undefined = $state();
  let containerEl: HTMLDivElement | undefined = $state();
  let observedWidth: number | undefined = $state();

  $effect(() => {
    if (!responsive || typeof ResizeObserver === 'undefined' || !containerEl) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry?.contentRect.width;
      if (w && Math.round(w) !== Math.round(observedWidth ?? 0)) {
        observedWidth = w;
      }
    });
    ro.observe(containerEl);
    return () => ro.disconnect();
  });

  const aspect = $derived(aspectRatio ?? widthProp / heightProp);
  const width = $derived(responsive && observedWidth ? observedWidth : widthProp);
  const height = $derived(responsive && observedWidth ? Math.max(140, Math.round(observedWidth / aspect)) : heightProp);

  const m = $derived(normalizeMargin(margin, DEFAULT_MARGIN));
  const innerWidth = $derived(Math.max(1, width - m.left - m.right));
  const innerHeight = $derived(Math.max(1, height - m.top - m.bottom));
  const xValues = $derived(data.map((d) => d[xKey]).filter(isChartX));
  const xKind = $derived(xType ?? inferXKind(xValues));
  const legend = $derived(showLegend ? buildLegend(series) : []);

  const yRange = $derived.by(() => {
    const values = data.flatMap((d) => series.map((s) => toNumber(d[s.key]))).filter((v): v is number => v !== null);
    if (yDomain) return yDomain;
    const lo = min(values) ?? 0;
    const hi = max(values) ?? 1;
    return padDomain(lo, hi);
  });

  const yScale = $derived(scaleLinear().domain(yRange).nice().range([innerHeight, 0]));
  const yTicks = $derived(yScale.ticks(4));

  const xPosition = $derived.by(() => {
    if (xKind === 'time') {
      const dates = xValues.map(toDate).filter((d): d is Date => d !== null);
      const [lo, hi] = extent(dates);
      const domain: [Date, Date] = lo && hi ? [lo, hi] : [new Date(0), new Date(1)];
      const scale = scaleUtc().domain(domain).range([0, innerWidth]);
      return (value: ChartX) => scale(toDate(value) ?? domain[0]);
    }

    if (xKind === 'linear') {
      const values = xValues.map(toNumber).filter((v): v is number => v !== null);
      const lo = min(values) ?? 0;
      const hi = max(values) ?? 1;
      const scale = scaleLinear().domain(padDomain(lo, hi)).nice().range([0, innerWidth]);
      return (value: ChartX) => scale(toNumber(value) ?? 0);
    }

    const labels = uniqueStrings(xValues);
    const scale = scalePoint<string>().domain(labels).range([0, innerWidth]).padding(0.35);
    return (value: ChartX) => scale(formatX(value)) ?? 0;
  });

  const xTicks = $derived.by(() => {
    if (xKind === 'linear') {
      const values = xValues.map(toNumber).filter((v): v is number => v !== null);
      return d3Ticks(min(values) ?? 0, max(values) ?? 1, 5);
    }
    const labels = xKind === 'time' ? xValues : uniqueStrings(xValues);
    const step = Math.max(1, Math.ceil(labels.length / 6));
    return labels.filter((_, i) => i % step === 0);
  });

  const paths = $derived.by(() => {
    const curveFactory = curve === 'monotone' ? curveMonotoneX : curve === 'step' ? curveStep : curveLinear;
    const baseline = yRange[0] < 0 && yRange[1] > 0 ? 0 : yRange[0];
    return series.map((s, index) => {
      const line = d3Line<ChartDatum>()
        .defined((d) => isChartX(d[xKey]) && toNumber(d[s.key]) !== null)
        .x((d) => xPosition(d[xKey] as ChartX))
        .y((d) => yScale(toNumber(d[s.key]) ?? 0))
        .curve(curveFactory);
      const area = d3Area<ChartDatum>()
        .defined((d) => isChartX(d[xKey]) && toNumber(d[s.key]) !== null)
        .x((d) => xPosition(d[xKey] as ChartX))
        .y0(yScale(baseline))
        .y1((d) => yScale(toNumber(d[s.key]) ?? baseline))
        .curve(curveFactory);

      return {
        series: s,
        color: getSeriesColor(s, index),
        line: line(data) ?? '',
        area: area(data) ?? '',
        points: data
          .map((d) => ({datum: d, value: toNumber(d[s.key]), x: d[xKey]}))
          .filter((p): p is {datum: ChartDatum; value: number; x: ChartX} => p.value !== null && isChartX(p.x))
      };
    });
  });

  function formatXValue(value: unknown): string {
    if (!isChartX(value)) return '';
    return xFormatter ? xFormatter(value) : formatX(value);
  }

  function getTooltipRows(datum: ChartDatum): ChartTooltipRow[] {
    return series.flatMap((s, i) => {
      const value = toNumber(datum[s.key]);
      if (value === null) return [];
      return [{
        key: s.key,
        label: s.label ?? s.key,
        value: formatValue(value, s.key, valueFormatter),
        color: getSeriesColor(s, i),
        icon: s.icon,
        unit: s.unit
      }];
    });
  }

  function handlePointerMove(event: PointerEvent) {
    if (!svgEl || data.length === 0) return;
    const rect = svgEl.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * width - m.left;
    let best = data[0];
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const datum of data) {
      const x = datum[xKey];
      if (!isChartX(x)) continue;
      const distance = Math.abs(xPosition(x) - localX);
      if (distance < bestDistance) {
        best = datum;
        bestDistance = distance;
      }
    }
    const x = isChartX(best[xKey]) ? xPosition(best[xKey]) : 0;
    const yValues = series.map((s) => toNumber(best[s.key])).filter((v): v is number => v !== null);
    const y = min(yValues.map((v) => yScale(v))) ?? 0;
    active = {datum: best, x: m.left + x, y: m.top + y};
  }
</script>

<ChartFrame
  {title}
  {description}
  {legend}
  {metrics}
  class={cn('uin-line-chart-frame', className)}
  {...rest}
>
  <div class="uin-chart-shell uin-line-chart" bind:this={containerEl}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <svg
      bind:this={svgEl}
      class="uin-chart-svg"
      role="img"
      tabindex="0"
      aria-labelledby={titleId}
      aria-describedby={description ? `${descId} ${tableId}` : tableId}
      viewBox={`0 0 ${width} ${height}`}
      onpointermove={handlePointerMove}
      onpointerleave={() => active = null}
    >
      <title id={titleId}>{title ?? 'Line chart'}</title>
      {#if description}<desc id={descId}>{description}</desc>{/if}
      <g transform={`translate(${m.left},${m.top})`}>
        {#if showGrid}
          {#each yTicks as tick}
            <line class="uin-chart-grid-line" x1="0" x2={innerWidth} y1={yScale(tick)} y2={yScale(tick)} />
          {/each}
        {/if}

        <line class="uin-chart-axis-line" x1="0" x2={innerWidth} y1={innerHeight} y2={innerHeight} />
        <line class="uin-chart-axis-line" x1="0" x2="0" y1="0" y2={innerHeight} />

        {#each yTicks as tick}
          <text class="uin-chart-tick" x="-8" y={yScale(tick)} text-anchor="end" dominant-baseline="middle">
            {formatValue(tick, 'y', valueFormatter)}
          </text>
        {/each}

        {#each xTicks as tick}
          <text class="uin-chart-tick" x={isChartX(tick) ? xPosition(tick) : 0} y={innerHeight + 18} text-anchor="middle">
            {formatXValue(tick)}
          </text>
        {/each}

        {#each paths as path (path.series.key)}
          {#if showArea}
            <path class="uin-line-area" d={path.area} fill={path.color}></path>
          {/if}
          <path class="uin-line-path" d={path.line} stroke={path.color}></path>
          {#if showPoints || path.series.showPoints}
            {#each path.points as point}
              <circle
                class="uin-line-point"
                cx={xPosition(point.x)}
                cy={yScale(point.value)}
                r="2.75"
                fill={path.color}
              ></circle>
            {/each}
          {/if}
          {#if showLabels}
            {#each path.points as point}
              <text
                class="uin-line-label"
                x={xPosition(point.x)}
                y={yScale(point.value) - 8}
                text-anchor="middle"
              >
                {formatValue(point.value, path.series.key, valueFormatter)}
              </text>
            {/each}
          {/if}
        {/each}

        {#if active}
          <line
            class="uin-line-active-rule"
            x1={active.x - m.left}
            x2={active.x - m.left}
            y1="0"
            y2={innerHeight}
          />
        {/if}

        <rect class="uin-line-hit" x="0" y="0" width={innerWidth} height={innerHeight}></rect>
      </g>
    </svg>

    {#if active}
      <ChartTooltip
        style={`left: ${(active.x / width) * 100}%; top: ${(active.y / height) * 100}%;`}
        label={formatXValue(active.datum[xKey])}
        rows={getTooltipRows(active.datum)}
        indicator={tooltipIndicator}
        hideLabel={hideTooltipLabel}
      />
    {/if}
  </div>

  <table class="uin-chart-sr" id={tableId}>
    <caption>{title ?? 'Line chart data'}</caption>
    <thead>
      <tr>
        <th scope="col">{xKey}</th>
        {#each series as s}<th scope="col">{s.label ?? s.key}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each data as datum}
        <tr>
          <td>{formatXValue(datum[xKey])}</td>
          {#each series as s}
            {@const value = toNumber(datum[s.key])}
            <td>{value === null ? '' : formatValue(value, s.key, valueFormatter)}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</ChartFrame>
