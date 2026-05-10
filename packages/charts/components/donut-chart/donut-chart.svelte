<!--
@component DonutChart - accessible pie/donut chart powered by D3 pie and arc.

Renders token-colored slices with optional center total, labels, active slice
offset, legend, tooltip, and hidden data table. CSS lives in
./donut-chart.css and depends on ../chart-frame/chart-frame.css.
-->
<script lang="ts">
  import {arc as d3Arc, pie as d3Pie, type PieArcDatum} from 'd3-shape';
  import type {HTMLAttributes} from 'svelte/elements';
  import ChartFrame from '../chart-frame/chart-frame.svelte';
  import ChartTooltip from '../chart-tooltip/chart-tooltip.svelte';
  import {cn} from '../../lib/cn';
  import type {
    ChartLegendItem,
    ChartMetric,
    ChartTooltipIndicator,
    ChartTooltipRow,
    ChartValueFormatter,
    DonutDatum
  } from '../../lib/types';
  import {CHART_COLORS, formatValue, nextChartId} from '../../lib/utils';

  const chartId = nextChartId('uin-donut-chart');
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;
  const tableId = `${chartId}-table`;

  type LabelMode = 'none' | 'label' | 'value' | 'percent';
  type LabelPosition = 'inside' | 'outside';

  export type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    data: DonutDatum[];
    width?: number;
    height?: number;
    /** Default true. The chart observes its container and recomputes when it resizes. */
    responsive?: boolean;
    /** Width / height ratio used when responsive. Defaults to `width / height`. */
    aspectRatio?: number;
    innerRadiusRatio?: number;
    padAngle?: number;
    labelMode?: LabelMode;
    labelPosition?: LabelPosition;
    activeId?: string;
    activeOffset?: number;
    showCenter?: boolean;
    showLegend?: boolean;
    title?: string;
    description?: string;
    metrics?: ChartMetric[];
    tooltipIndicator?: ChartTooltipIndicator;
    hideTooltipLabel?: boolean;
    valueFormatter?: ChartValueFormatter;
    centerLabel?: string;
    class?: string;
  };

  let {
    data,
    width: widthProp = 360,
    height: heightProp = 260,
    responsive = true,
    aspectRatio,
    innerRadiusRatio = 0.62,
    padAngle = 0.018,
    labelMode = 'none',
    labelPosition = 'inside',
    activeId,
    activeOffset = 8,
    showCenter,
    showLegend = true,
    title,
    description,
    metrics = [],
    tooltipIndicator = 'dot',
    hideTooltipLabel = false,
    valueFormatter,
    centerLabel = 'Total',
    class: className,
    ...rest
  }: Props = $props();

  type DonutArc = {
    key: string;
    datum: DonutDatum;
    value: number;
    percent: number;
    color: string;
    path: string;
    labelX: number;
    labelY: number;
    outerLabelX: number;
    outerLabelY: number;
    connectorX: number;
    connectorY: number;
    offsetX: number;
    offsetY: number;
    labelAnchor: 'start' | 'middle' | 'end';
  };

  let active: DonutArc | null = $state(null);
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
  const height = $derived(responsive && observedWidth ? Math.max(160, Math.round(observedWidth / aspect)) : heightProp);

  const radius = $derived(Math.max(1, Math.min(width, height) / 2 - 18));
  const innerRadius = $derived(Math.max(0, radius * innerRadiusRatio));
  const effectiveShowCenter = $derived(showCenter ?? innerRadiusRatio > 0.18);
  const total = $derived(data.reduce((sum, d) => sum + Math.max(0, d.value), 0));

  const arcs = $derived.by(() => {
    const safeData = data.filter((d) => Number.isFinite(d.value) && d.value > 0);
    const pie = d3Pie<DonutDatum>().value((d) => d.value).sort(null).padAngle(padAngle);
    const arc = d3Arc<PieArcDatum<DonutDatum>>().innerRadius(innerRadius).outerRadius(radius).cornerRadius(innerRadiusRatio > 0 ? 5 : 2);
    const labelArc = d3Arc<PieArcDatum<DonutDatum>>()
      .innerRadius(innerRadius + (radius - innerRadius) * 0.55)
      .outerRadius(innerRadius + (radius - innerRadius) * 0.55);
    const outerLabelArc = d3Arc<PieArcDatum<DonutDatum>>().innerRadius(radius + 18).outerRadius(radius + 18);
    const connectorArc = d3Arc<PieArcDatum<DonutDatum>>().innerRadius(radius + 4).outerRadius(radius + 4);

    return pie(safeData).map((segment, index) => {
      const key = segment.data.id ?? segment.data.label;
      const [labelX, labelY] = labelArc.centroid(segment);
      const [outerLabelX, outerLabelY] = outerLabelArc.centroid(segment);
      const [connectorX, connectorY] = connectorArc.centroid(segment);
      const [centroidX, centroidY] = arc.centroid(segment);
      const length = Math.max(1, Math.hypot(centroidX, centroidY));
      const isActive = activeId === key;
      const labelAnchor: 'start' | 'middle' | 'end' =
        labelPosition === 'outside' ? (outerLabelX > 4 ? 'start' : outerLabelX < -4 ? 'end' : 'middle') : 'middle';
      return {
        key,
        datum: segment.data,
        value: segment.data.value,
        percent: total > 0 ? segment.data.value / total : 0,
        color: segment.data.color ?? CHART_COLORS[index % CHART_COLORS.length],
        path: arc(segment) ?? '',
        labelX,
        labelY,
        outerLabelX,
        outerLabelY,
        connectorX,
        connectorY,
        offsetX: isActive ? (centroidX / length) * activeOffset : 0,
        offsetY: isActive ? (centroidY / length) * activeOffset : 0,
        labelAnchor
      };
    });
  });

  const legend = $derived<ChartLegendItem[]>(
    showLegend
      ? arcs.map((a) => ({key: a.key, label: a.datum.label, color: a.color}))
      : []
  );

  function labelFor(item: DonutArc): string {
    if (labelMode === 'label') return item.datum.label;
    if (labelMode === 'percent') return `${Math.round(item.percent * 100)}%`;
    if (labelMode === 'value') return formatValue(item.value, item.key, valueFormatter);
    return '';
  }

  function tooltipRows(item: DonutArc): ChartTooltipRow[] {
    return [{
      key: item.key,
      label: 'Value',
      value: formatValue(item.value, item.key, valueFormatter),
      color: item.color
    }];
  }
</script>

<ChartFrame
  {title}
  {description}
  {legend}
  {metrics}
  class={cn('uin-donut-chart-frame', className)}
  {...rest}
>
  <div class="uin-chart-shell uin-donut-chart" bind:this={containerEl}>
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
      <title id={titleId}>{title ?? 'Donut chart'}</title>
      {#if description}<desc id={descId}>{description}</desc>{/if}
      <g transform={`translate(${width / 2},${height / 2})`}>
        {#each arcs as item (item.key)}
          <g transform={`translate(${item.offsetX},${item.offsetY})`}>
            <path
              class="uin-donut-segment"
              role="presentation"
              aria-hidden="true"
              d={item.path}
              fill={item.color}
              onpointerenter={() => active = item}
              onpointermove={() => active = item}
            ></path>
          </g>
        {/each}

        {#if labelMode !== 'none'}
          {#each arcs as item (item.key)}
            {#if labelPosition === 'outside'}
              <line
                class="uin-donut-label-line"
                x1={item.connectorX + item.offsetX}
                y1={item.connectorY + item.offsetY}
                x2={item.outerLabelX + item.offsetX}
                y2={item.outerLabelY + item.offsetY}
              ></line>
              <text
                class="uin-donut-slice-label uin-donut-slice-label-outside"
                x={item.outerLabelX + item.offsetX}
                y={item.outerLabelY + item.offsetY}
                text-anchor={item.labelAnchor}
                dominant-baseline="middle"
              >
                {labelFor(item)}
              </text>
            {:else}
              <text
                class="uin-donut-slice-label"
                x={item.labelX + item.offsetX}
                y={item.labelY + item.offsetY}
                text-anchor="middle"
                dominant-baseline="middle"
              >
                {labelFor(item)}
              </text>
            {/if}
          {/each}
        {/if}

        {#if effectiveShowCenter}
          <text class="uin-donut-total" text-anchor="middle" dominant-baseline="middle" y="-5">
            {formatValue(total, 'total', valueFormatter)}
          </text>
          <text class="uin-donut-label" text-anchor="middle" dominant-baseline="middle" y="15">
            {centerLabel}
          </text>
        {/if}
      </g>
    </svg>

    {#if active}
      <ChartTooltip
        style={`left: ${((width / 2 + active.labelX + active.offsetX) / width) * 100}%; top: ${((height / 2 + active.labelY + active.offsetY) / height) * 100}%;`}
        label={active.datum.label}
        rows={tooltipRows(active)}
        total={`${Math.round(active.percent * 100)}%`}
        totalLabel="Share"
        indicator={tooltipIndicator}
        hideLabel={hideTooltipLabel}
      />
    {/if}
  </div>

  <table class="uin-chart-sr" id={tableId}>
    <caption>{title ?? 'Donut chart data'}</caption>
    <thead>
      <tr><th scope="col">Label</th><th scope="col">Value</th></tr>
    </thead>
    <tbody>
      {#each data as datum}
        <tr>
          <td>{datum.label}</td>
          <td>{formatValue(datum.value, datum.id ?? datum.label, valueFormatter)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</ChartFrame>
