<!--
@component RadarChart - radial categorical comparison chart.

Supports polygon/circle grids, filled or line-only series, dots, legend,
tooltips, and a hidden data table.
-->
<script lang="ts">
  import {max} from 'd3-array';
  import {scaleLinear} from 'd3-scale';
  import type {HTMLAttributes} from 'svelte/elements';
  import ChartFrame from '../chart-frame/chart-frame.svelte';
  import ChartTooltip from '../chart-tooltip/chart-tooltip.svelte';
  import {cn} from '../../lib/cn';
  import type {
    ChartDatum,
    ChartMetric,
    ChartSeries,
    ChartTooltipIndicator,
    ChartTooltipRow,
    ChartValueFormatter
  } from '../../lib/types';
  import {
    buildLegend,
    formatValue,
    formatX,
    getSeriesColor,
    nextChartId,
    pathFromPoints,
    polarPoint,
    toNumber
  } from '../../lib/utils';

  const chartId = nextChartId('uin-radar-chart');
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;
  const tableId = `${chartId}-table`;

  type GridShape = 'polygon' | 'circle' | 'none';

  export type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    data: ChartDatum[];
    series: ChartSeries[];
    /** Per-row axis label key. Renamed from `axisKey`; `axisKey` is still accepted as an alias. */
    xKey?: string;
    /** @deprecated use `xKey` */
    axisKey?: string;
    width?: number;
    height?: number;
    /** Default true. The chart observes its container and recomputes when it resizes. */
    responsive?: boolean;
    /** Width / height ratio used when responsive. Defaults to `width / height`. */
    aspectRatio?: number;
    maxValue?: number;
    levels?: number;
    gridShape?: GridShape;
    gridFill?: boolean;
    showArea?: boolean;
    /** Renamed from `showDots`; the old name is still accepted. */
    showPoints?: boolean;
    /** @deprecated use `showPoints` */
    showDots?: boolean;
    showLegend?: boolean;
    showRadialLines?: boolean;
    title?: string;
    description?: string;
    metrics?: ChartMetric[];
    tooltipIndicator?: ChartTooltipIndicator;
    hideTooltipLabel?: boolean;
    valueFormatter?: ChartValueFormatter;
    class?: string;
  };

  let {
    data,
    series,
    xKey,
    axisKey,
    width: widthProp = 420,
    height: heightProp = 320,
    responsive = true,
    aspectRatio,
    maxValue,
    levels = 5,
    gridShape = 'polygon',
    gridFill = false,
    showArea = true,
    showPoints,
    showDots,
    showLegend = true,
    showRadialLines = true,
    title,
    description,
    metrics = [],
    tooltipIndicator = 'dot',
    hideTooltipLabel = false,
    valueFormatter,
    class: className,
    ...rest
  }: Props = $props();

  const resolvedAxisKey = $derived(xKey ?? axisKey ?? 'axis');
  const resolvedShowPoints = $derived(showPoints ?? showDots ?? false);

  type RadarPoint = {
    key: string;
    datum: ChartDatum;
    axis: string;
    series: ChartSeries;
    seriesIndex: number;
    value: number;
    x: number;
    y: number;
    color: string;
  };

  type RadarPath = {
    series: ChartSeries;
    color: string;
    path: string;
    points: RadarPoint[];
  };

  let active: RadarPoint | null = $state(null);
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
  const height = $derived(responsive && observedWidth ? Math.max(180, Math.round(observedWidth / aspect)) : heightProp);

  const centerX = $derived(width / 2);
  const centerY = $derived(height / 2);
  const radius = $derived(Math.max(1, Math.min(width, height) / 2 - 44));
  const axes = $derived(data.map((d) => formatX(d[resolvedAxisKey])));
  const legend = $derived(showLegend ? buildLegend(series) : []);

  const valueMax = $derived.by(() => {
    if (maxValue !== undefined) return maxValue;
    const values = data.flatMap((d) => series.map((s) => toNumber(d[s.key]))).filter((v): v is number => v !== null);
    return max(values) ?? 1;
  });

  const valueScale = $derived(scaleLinear().domain([0, valueMax]).range([0, radius]));
  const safeLevels = $derived(Math.max(1, levels));
  const gridLevels = $derived(Array.from({length: safeLevels}, (_, index) => ((index + 1) / safeLevels) * valueMax));

  function angleFor(index: number): number {
    return -Math.PI / 2 + (index / Math.max(1, axes.length)) * Math.PI * 2;
  }

  function pointAt(value: number, index: number): [number, number] {
    return polarPoint(valueScale(value), angleFor(index));
  }

  function gridPath(value: number): string {
    return pathFromPoints(axes.map((_, index) => pointAt(value, index)));
  }

  const paths = $derived.by<RadarPath[]>(() => {
    return series.map((s, seriesIndex) => {
      const color = getSeriesColor(s, seriesIndex);
      const points = data.map((datum, datumIndex) => {
        const value = toNumber(datum[s.key]) ?? 0;
        const [x, y] = pointAt(value, datumIndex);
        const axis = formatX(datum[resolvedAxisKey]);
        return {
          key: `${s.key}-${axis}`,
          datum,
          axis,
          series: s,
          seriesIndex,
          value,
          x,
          y,
          color
        };
      });
      return {
        series: s,
        color,
        path: pathFromPoints(points.map((point) => [point.x, point.y])),
        points
      };
    });
  });

  function tooltipRows(point: RadarPoint): ChartTooltipRow[] {
    return [{
      key: point.series.key,
      label: point.series.label ?? point.series.key,
      value: formatValue(point.value, point.series.key, valueFormatter),
      color: point.color,
      icon: point.series.icon,
      unit: point.series.unit
    }];
  }
</script>

<ChartFrame
  {title}
  {description}
  {legend}
  {metrics}
  class={cn('uin-radar-chart-frame', className)}
  {...rest}
>
  <div class="uin-chart-shell uin-radar-chart" bind:this={containerEl}>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <svg
      class="uin-chart-svg"
      role="img"
      tabindex="0"
      aria-labelledby={titleId}
      aria-describedby={description ? `${descId} ${tableId}` : tableId}
      viewBox={`0 0 ${width} ${height}`}
      onpointerleave={() => active = null}
    >
      <title id={titleId}>{title ?? 'Radar chart'}</title>
      {#if description}<desc id={descId}>{description}</desc>{/if}
      <g transform={`translate(${centerX},${centerY})`}>
        {#if gridShape !== 'none'}
          {#each gridLevels as level}
            {#if gridShape === 'circle'}
              <circle
                class="uin-radar-grid"
                class:uin-radar-grid-fill={gridFill}
                r={valueScale(level)}
              ></circle>
            {:else}
              <path
                class="uin-radar-grid"
                class:uin-radar-grid-fill={gridFill}
                d={gridPath(level)}
              ></path>
            {/if}
          {/each}
        {/if}

        {#if showRadialLines}
          {#each axes as axis, index (axis)}
            {@const [x, y] = pointAt(valueMax, index)}
            <line class="uin-radar-axis-line" x1="0" y1="0" x2={x} y2={y}></line>
          {/each}
        {/if}

        {#each axes as axis, index (axis)}
          {@const [x, y] = polarPoint(radius + 18, angleFor(index))}
          <text
            class="uin-radar-axis-label"
            x={x}
            y={y}
            text-anchor={x > 8 ? 'start' : x < -8 ? 'end' : 'middle'}
            dominant-baseline="middle"
          >
            {axis}
          </text>
        {/each}

        {#each paths as item (item.series.key)}
          {#if showArea}
            <path class="uin-radar-area" d={item.path} fill={item.color}></path>
          {/if}
          <path class="uin-radar-line" d={item.path} stroke={item.color}></path>
          {#each item.points as point (point.key)}
            {#if resolvedShowPoints || point.series.showPoints}
              <circle class="uin-radar-dot" cx={point.x} cy={point.y} r="3" fill={item.color}></circle>
            {/if}
            <circle
              class="uin-radar-hit"
              role="presentation"
              aria-hidden="true"
              cx={point.x}
              cy={point.y}
              r="9"
              onpointerenter={() => active = point}
              onpointermove={() => active = point}
            ></circle>
          {/each}
        {/each}
      </g>
    </svg>

    {#if active}
      <ChartTooltip
        style={`left: ${((centerX + active.x) / width) * 100}%; top: ${((centerY + active.y) / height) * 100}%;`}
        label={active.axis}
        rows={tooltipRows(active)}
        indicator={tooltipIndicator}
        hideLabel={hideTooltipLabel}
      />
    {/if}
  </div>

  <table class="uin-chart-sr" id={tableId}>
    <caption>{title ?? 'Radar chart data'}</caption>
    <thead>
      <tr>
        <th scope="col">{resolvedAxisKey}</th>
        {#each series as s}<th scope="col">{s.label ?? s.key}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each data as datum}
        <tr>
          <td>{formatX(datum[resolvedAxisKey])}</td>
          {#each series as s}
            {@const value = toNumber(datum[s.key])}
            <td>{value === null ? '' : formatValue(value, s.key, valueFormatter)}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</ChartFrame>
