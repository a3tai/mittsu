<!--
@component BarChart - grouped, stacked, vertical, or horizontal categorical bars.

Uses D3 band/linear scales and D3 stack layout for stacked mode. CSS lives in
./bar-chart.css and depends on ../chart-frame/chart-frame.css.
-->
<script lang="ts">
  import {max, min} from 'd3-array';
  import {scaleBand, scaleLinear} from 'd3-scale';
  import {stack as d3Stack} from 'd3-shape';
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
    ChartXFormatter
  } from '../../lib/types';
  import {
    buildLegend,
    formatValue,
    formatX,
    getSeriesColor,
    nextChartId,
    normalizeMargin,
    padDomain,
    toNumber,
    uniqueStrings
  } from '../../lib/utils';

  const chartId = nextChartId('uin-bar-chart');
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;
  const tableId = `${chartId}-table`;

  type BarOrientation = 'vertical' | 'horizontal';

  export type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    data: ChartDatum[];
    series: ChartSeries[];
    xKey?: string;
    width?: number;
    height?: number;
    /** Default true. The chart observes its container and recomputes scales when it resizes. */
    responsive?: boolean;
    /** Width / height ratio used when responsive. Defaults to `width / height`. */
    aspectRatio?: number;
    margin?: Partial<ChartMargin>;
    yDomain?: [number, number];
    orientation?: BarOrientation;
    stacked?: boolean;
    showGrid?: boolean;
    showLabels?: boolean;
    showLegend?: boolean;
    activeKey?: string;
    negativeColor?: string;
    title?: string;
    description?: string;
    metrics?: ChartMetric[];
    tooltipIndicator?: ChartTooltipIndicator;
    hideTooltipLabel?: boolean;
    valueFormatter?: ChartValueFormatter;
    xFormatter?: ChartXFormatter;
    class?: string;
  };

  const VERTICAL_MARGIN: ChartMargin = {top: 12, right: 14, bottom: 30, left: 42};
  const HORIZONTAL_MARGIN: ChartMargin = {top: 12, right: 24, bottom: 30, left: 72};

  let {
    data,
    series,
    xKey = 'x',
    width: widthProp = 640,
    height: heightProp = 260,
    responsive = true,
    aspectRatio,
    margin,
    yDomain,
    orientation = 'vertical',
    stacked = false,
    showGrid = true,
    showLabels = false,
    showLegend = true,
    activeKey,
    negativeColor = 'var(--uin-chart-negative, #ff453a)',
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

  type BarMark = {
    key: string;
    datum: ChartDatum;
    series: ChartSeries;
    seriesIndex: number;
    label: string;
    value: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    negative: boolean;
  };

  let active: BarMark | null = $state(null);
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

  const m = $derived(normalizeMargin(margin, orientation === 'horizontal' ? HORIZONTAL_MARGIN : VERTICAL_MARGIN));
  const innerWidth = $derived(Math.max(1, width - m.left - m.right));
  const innerHeight = $derived(Math.max(1, height - m.top - m.bottom));
  const labels = $derived(uniqueStrings(data.map((d) => d[xKey])));
  const legend = $derived(showLegend ? buildLegend(series) : []);
  const seriesKeys = $derived(series.map((s) => s.key));

  const valueRange = $derived.by(() => {
    if (yDomain) return yDomain;

    if (stacked) {
      const totals = data.map((d) => series.reduce((sum, s) => sum + Math.max(0, toNumber(d[s.key]) ?? 0), 0));
      return padDomain(0, max(totals) ?? 1, {includeZero: true});
    }

    const values = data.flatMap((d) => series.map((s) => toNumber(d[s.key]))).filter((v): v is number => v !== null);
    return padDomain(min(values) ?? 0, max(values) ?? 1, {includeZero: true});
  });

  const categoryScale = $derived(
    scaleBand<string>()
      .domain(labels)
      .range(orientation === 'horizontal' ? [0, innerHeight] : [0, innerWidth])
      .paddingInner(0.18)
      .paddingOuter(0.08)
  );
  const groupScale = $derived(
    scaleBand<string>()
      .domain(seriesKeys)
      .range([0, categoryScale.bandwidth()])
      .padding(0.16)
  );
  const valueScale = $derived(
    scaleLinear()
      .domain(valueRange)
      .nice()
      .range(orientation === 'horizontal' ? [0, innerWidth] : [innerHeight, 0])
  );
  const valueTicks = $derived(valueScale.ticks(4));

  const bars = $derived.by(() => {
    const marks: BarMark[] = [];

    if (stacked) {
      const layers = d3Stack<Record<string, unknown>>()
        .keys(seriesKeys)
        .value((datum, key) => Math.max(0, toNumber(datum[key]) ?? 0))(data);

      layers.forEach((layer, seriesIndex) => {
        const s = series[seriesIndex];
        layer.forEach((segment, datumIndex) => {
          const datum = data[datumIndex];
          const label = formatX(datum[xKey]);
          const category = categoryScale(label);
          if (category === undefined) return;
          const start = valueScale(segment[0]);
          const end = valueScale(segment[1]);
          marks.push({
            key: `${s.key}-${label}`,
            datum,
            series: s,
            seriesIndex,
            label,
            value: segment[1] - segment[0],
            x: orientation === 'horizontal' ? Math.min(start, end) : category,
            y: orientation === 'horizontal' ? category : Math.min(start, end),
            width: orientation === 'horizontal' ? Math.abs(end - start) : categoryScale.bandwidth(),
            height: orientation === 'horizontal' ? categoryScale.bandwidth() : Math.abs(start - end),
            color: getSeriesColor(s, seriesIndex),
            negative: false
          });
        });
      });
      return marks;
    }

    data.forEach((datum) => {
      const label = formatX(datum[xKey]);
      const category = categoryScale(label);
      if (category === undefined) return;
      series.forEach((s, seriesIndex) => {
        const value = toNumber(datum[s.key]);
        const offset = groupScale(s.key);
        if (value === null || offset === undefined) return;
        const zero = valueScale(0);
        const valuePosition = valueScale(value);
        const negative = value < 0;
        marks.push({
          key: `${s.key}-${label}`,
          datum,
          series: s,
          seriesIndex,
          label,
          value,
          x: orientation === 'horizontal' ? Math.min(valuePosition, zero) : category + offset,
          y: orientation === 'horizontal' ? category + offset : Math.min(valuePosition, zero),
          width: orientation === 'horizontal' ? Math.abs(zero - valuePosition) : groupScale.bandwidth(),
          height: orientation === 'horizontal' ? groupScale.bandwidth() : Math.abs(zero - valuePosition),
          color: negative ? negativeColor : getSeriesColor(s, seriesIndex),
          negative
        });
      });
    });

    return marks;
  });

  function formatXValue(value: unknown): string {
    const label = formatX(value);
    return xFormatter ? xFormatter(label) : label;
  }

  function isEmphasized(bar: BarMark): boolean {
    return activeKey === bar.key || activeKey === bar.series.key || activeKey === bar.label;
  }

  function getTooltipRows(bar: BarMark): ChartTooltipRow[] {
    return [{
      key: bar.series.key,
      label: bar.series.label ?? bar.series.key,
      value: formatValue(bar.value, bar.series.key, valueFormatter),
      color: bar.color,
      icon: bar.series.icon,
      unit: bar.series.unit
    }];
  }

  function tooltipStyle(bar: BarMark): string {
    const left = orientation === 'horizontal'
      ? ((m.left + bar.x + bar.width) / width) * 100
      : ((m.left + bar.x + bar.width / 2) / width) * 100;
    const top = orientation === 'horizontal'
      ? ((m.top + bar.y + bar.height / 2) / height) * 100
      : ((m.top + bar.y) / height) * 100;
    return `left: ${left}%; top: ${top}%;`;
  }

  function labelX(bar: BarMark): number {
    if (orientation === 'horizontal') {
      return bar.negative ? bar.x - 6 : bar.x + bar.width + 6;
    }
    return bar.x + bar.width / 2;
  }

  function labelY(bar: BarMark): number {
    if (orientation === 'horizontal') return bar.y + bar.height / 2;
    return bar.negative ? bar.y + bar.height + 12 : bar.y - 6;
  }
</script>

<ChartFrame
  {title}
  {description}
  {legend}
  {metrics}
  class={cn('uin-bar-chart-frame', className)}
  {...rest}
>
  <div class="uin-chart-shell uin-bar-chart" bind:this={containerEl}>
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
      <title id={titleId}>{title ?? 'Bar chart'}</title>
      {#if description}<desc id={descId}>{description}</desc>{/if}
      <g transform={`translate(${m.left},${m.top})`}>
        {#if showGrid}
          {#each valueTicks as tick}
            {#if orientation === 'horizontal'}
              <line class="uin-chart-grid-line" x1={valueScale(tick)} x2={valueScale(tick)} y1="0" y2={innerHeight} />
            {:else}
              <line class="uin-chart-grid-line" x1="0" x2={innerWidth} y1={valueScale(tick)} y2={valueScale(tick)} />
            {/if}
          {/each}
        {/if}

        {#if orientation === 'horizontal'}
          <line class="uin-chart-axis-line" x1="0" x2={innerWidth} y1={innerHeight} y2={innerHeight} />
          <line class="uin-chart-axis-line" x1={valueScale(0)} x2={valueScale(0)} y1="0" y2={innerHeight} />
        {:else}
          <line class="uin-chart-axis-line" x1="0" x2={innerWidth} y1={innerHeight} y2={innerHeight} />
          <line class="uin-chart-axis-line" x1="0" x2="0" y1="0" y2={innerHeight} />
        {/if}

        {#each valueTicks as tick}
          {#if orientation === 'horizontal'}
            <text class="uin-chart-tick" x={valueScale(tick)} y={innerHeight + 18} text-anchor="middle">
              {formatValue(tick, 'value', valueFormatter)}
            </text>
          {:else}
            <text class="uin-chart-tick" x="-8" y={valueScale(tick)} text-anchor="end" dominant-baseline="middle">
              {formatValue(tick, 'value', valueFormatter)}
            </text>
          {/if}
        {/each}

        {#each labels as label}
          {#if orientation === 'horizontal'}
            <text class="uin-chart-tick" x="-8" y={(categoryScale(label) ?? 0) + categoryScale.bandwidth() / 2} text-anchor="end" dominant-baseline="middle">
              {formatXValue(label)}
            </text>
          {:else}
            <text class="uin-chart-tick" x={(categoryScale(label) ?? 0) + categoryScale.bandwidth() / 2} y={innerHeight + 18} text-anchor="middle">
              {formatXValue(label)}
            </text>
          {/if}
        {/each}

        {#each bars as bar (bar.key)}
          <rect
            class="uin-bar-mark"
            class:uin-bar-mark-active={isEmphasized(bar)}
            class:uin-bar-mark-negative={bar.negative}
            role="presentation"
            aria-hidden="true"
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            rx="4"
            fill={bar.color}
            onpointerenter={() => active = bar}
            onpointermove={() => active = bar}
          ></rect>
          {#if showLabels}
            <text
              class="uin-bar-label"
              x={labelX(bar)}
              y={labelY(bar)}
              text-anchor={orientation === 'horizontal' ? (bar.negative ? 'end' : 'start') : 'middle'}
              dominant-baseline={orientation === 'horizontal' ? 'middle' : 'auto'}
            >
              {formatValue(bar.value, bar.series.key, valueFormatter)}
            </text>
          {/if}
        {/each}
      </g>
    </svg>

    {#if active}
      <ChartTooltip
        style={tooltipStyle(active)}
        label={active.label}
        rows={getTooltipRows(active)}
        indicator={tooltipIndicator}
        hideLabel={hideTooltipLabel}
      />
    {/if}
  </div>

  <table class="uin-chart-sr" id={tableId}>
    <caption>{title ?? 'Bar chart data'}</caption>
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
