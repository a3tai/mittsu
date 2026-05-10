<!--
@component RadialChart - radial progress rings and stacked gauges.

Uses D3 arc generation while Svelte owns SVG rendering and interaction state.
-->
<script lang="ts">
  import {max, sum} from 'd3-array';
  import {arc as d3Arc} from 'd3-shape';
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
    RadialDatum
  } from '../../lib/types';
  import {CHART_COLORS, clamp, formatValue, nextChartId} from '../../lib/utils';

  const chartId = nextChartId('uin-radial-chart');
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;
  const tableId = `${chartId}-table`;

  type RadialVariant = 'rings' | 'stacked';
  type LabelMode = 'none' | 'label' | 'value' | 'percent';

  export type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    data: RadialDatum[];
    width?: number;
    height?: number;
    /** Default true. The chart observes its container and recomputes when it resizes. */
    responsive?: boolean;
    /** Width / height ratio used when responsive. Defaults to `width / height`. */
    aspectRatio?: number;
    variant?: RadialVariant;
    startAngle?: number;
    endAngle?: number;
    maxValue?: number;
    bandWidth?: number;
    gap?: number;
    showCenter?: boolean;
    showGrid?: boolean;
    showLabels?: boolean;
    showLegend?: boolean;
    labelMode?: LabelMode;
    title?: string;
    description?: string;
    metrics?: ChartMetric[];
    tooltipIndicator?: ChartTooltipIndicator;
    hideTooltipLabel?: boolean;
    valueFormatter?: ChartValueFormatter;
    centerValue?: string;
    centerLabel?: string;
    class?: string;
  };

  type ArcDatum = {
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
  };

  type RadialMark = {
    key: string;
    datum: RadialDatum;
    value: number;
    color: string;
    path: string;
    trackPath: string;
    labelX: number;
    labelY: number;
    progress: number;
  };

  let {
    data,
    width: widthProp = 360,
    height: heightProp = 280,
    responsive = true,
    aspectRatio,
    variant = 'rings',
    startAngle = 0,
    endAngle = Math.PI * 2,
    maxValue,
    bandWidth,
    gap = 6,
    showCenter = true,
    showGrid = true,
    showLabels = false,
    showLegend = true,
    labelMode = 'value',
    title,
    description,
    metrics = [],
    tooltipIndicator = 'dot',
    hideTooltipLabel = false,
    valueFormatter,
    centerValue,
    centerLabel = 'Total',
    class: className,
    ...rest
  }: Props = $props();

  let active: RadialMark | null = $state(null);
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
  const radius = $derived(Math.max(1, Math.min(width, height) / 2 - 18));
  const total = $derived(sum(data, (d) => Math.max(0, d.value)));
  const domainMax = $derived(maxValue ?? max(data, (d) => Math.max(0, d.max ?? d.value)) ?? 1);
  const span = $derived(endAngle - startAngle);
  const effectiveBand = $derived(bandWidth ?? (variant === 'stacked' ? 22 : Math.max(8, Math.min(22, (radius - 22) / Math.max(1, data.length)))));
  const arcGenerator = $derived(d3Arc<ArcDatum>().cornerRadius(Math.min(8, effectiveBand / 2)));

  const marks = $derived.by<RadialMark[]>(() => {
    if (variant === 'stacked') {
      const outerRadius = radius;
      const innerRadius = Math.max(1, radius - effectiveBand);
      const track: ArcDatum = {innerRadius, outerRadius, startAngle, endAngle};
      let cursor = startAngle;
      const denominator = Math.max(1, maxValue ?? total);

      return data.map((datum, index) => {
        const value = Math.max(0, datum.value);
        const progress = clamp(value / denominator, 0, 1);
        const segmentStart = cursor;
        const segmentEnd = cursor + span * progress;
        cursor = segmentEnd;
        const segment: ArcDatum = {innerRadius, outerRadius, startAngle: segmentStart, endAngle: segmentEnd};
        const [labelX, labelY] = arcGenerator.centroid(segment);
        return {
          key: datum.id ?? datum.label,
          datum,
          value,
          color: datum.color ?? CHART_COLORS[index % CHART_COLORS.length],
          path: arcGenerator(segment) ?? '',
          trackPath: arcGenerator(track) ?? '',
          labelX,
          labelY,
          progress,
        };
      });
    }

    return data.map((datum, index) => {
      const outerRadius = radius - index * (effectiveBand + gap);
      const innerRadius = Math.max(1, outerRadius - effectiveBand);
      const maxForDatum = Math.max(1, datum.max ?? domainMax);
      const value = Math.max(0, datum.value);
      const progress = clamp(value / maxForDatum, 0, 1);
      const track: ArcDatum = {innerRadius, outerRadius, startAngle, endAngle};
      const segment: ArcDatum = {
        innerRadius,
        outerRadius,
        startAngle,
        endAngle: startAngle + span * progress
      };
      const [labelX, labelY] = arcGenerator.centroid(segment);
      return {
        key: datum.id ?? datum.label,
        datum,
        value,
        color: datum.color ?? CHART_COLORS[index % CHART_COLORS.length],
        path: arcGenerator(segment) ?? '',
        trackPath: arcGenerator(track) ?? '',
        labelX,
        labelY,
        progress,
      };
    }).filter((mark) => mark.path !== '');
  });

  const legend = $derived<ChartLegendItem[]>(
    showLegend
      ? marks.map((mark) => ({key: mark.key, label: mark.datum.label, color: mark.color}))
      : []
  );

  const displayCenterValue = $derived(centerValue ?? formatValue(total, 'total', valueFormatter));
  const effectiveShowCenter = $derived(showCenter && (centerValue !== undefined || total > 0));

  function labelFor(mark: RadialMark): string {
    if (labelMode === 'none') return '';
    if (labelMode === 'label') return mark.datum.label;
    if (labelMode === 'percent') return `${Math.round(mark.progress * 100)}%`;
    return formatValue(mark.value, mark.key, valueFormatter);
  }

  function tooltipRows(mark: RadialMark): ChartTooltipRow[] {
    return [{
      key: mark.key,
      label: mark.datum.label,
      value: formatValue(mark.value, mark.key, valueFormatter),
      color: mark.color
    }];
  }
</script>

<ChartFrame
  {title}
  {description}
  {legend}
  {metrics}
  class={cn('uin-radial-chart-frame', className)}
  {...rest}
>
  <div class="uin-chart-shell uin-radial-chart" bind:this={containerEl}>
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
      <title id={titleId}>{title ?? 'Radial chart'}</title>
      {#if description}<desc id={descId}>{description}</desc>{/if}
      <g transform={`translate(${centerX},${centerY})`}>
        {#if showGrid}
          {#each marks as mark, index (mark.key)}
            {#if variant === 'rings' || index === 0}
              <path class="uin-radial-track" d={mark.trackPath}></path>
            {/if}
          {/each}
        {/if}

        {#each marks as mark (mark.key)}
          <path
            class="uin-radial-arc"
            role="presentation"
            aria-hidden="true"
            d={mark.path}
            fill={mark.color}
            onpointerenter={() => active = mark}
            onpointermove={() => active = mark}
          ></path>
        {/each}

        {#if showLabels}
          {#each marks as mark (mark.key)}
            <text
              class="uin-radial-label"
              x={mark.labelX}
              y={mark.labelY}
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {labelFor(mark)}
            </text>
          {/each}
        {/if}

        {#if effectiveShowCenter}
          <text class="uin-radial-total" text-anchor="middle" dominant-baseline="middle" y="-5">
            {displayCenterValue}
          </text>
          <text class="uin-radial-center-label" text-anchor="middle" dominant-baseline="middle" y="15">
            {centerLabel}
          </text>
        {/if}
      </g>
    </svg>

    {#if active}
      <ChartTooltip
        style={`left: ${((centerX + active.labelX) / width) * 100}%; top: ${((centerY + active.labelY) / height) * 100}%;`}
        label={active.datum.label}
        rows={tooltipRows(active)}
        total={`${Math.round(active.progress * 100)}%`}
        totalLabel="Progress"
        indicator={tooltipIndicator}
        hideLabel={hideTooltipLabel}
      />
    {/if}
  </div>

  <table class="uin-chart-sr" id={tableId}>
    <caption>{title ?? 'Radial chart data'}</caption>
    <thead>
      <tr><th scope="col">Label</th><th scope="col">Value</th><th scope="col">Max</th></tr>
    </thead>
    <tbody>
      {#each data as datum}
        <tr>
          <td>{datum.label}</td>
          <td>{formatValue(datum.value, datum.id ?? datum.label, valueFormatter)}</td>
          <td>{datum.max ?? maxValue ?? ''}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</ChartFrame>
