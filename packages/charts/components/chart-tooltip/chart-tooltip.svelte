<!--
@component ChartTooltip - shared tooltip content for chart components.

Parents own pointer math and positioning. This component owns consistent row
layout, indicators, labels, units, icons, and optional totals.
-->
<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';
  import type {ChartTooltipIndicator, ChartTooltipRow} from '../../lib/types';

  export type Props = HTMLAttributes<HTMLDivElement> & {
    label?: string;
    rows?: ChartTooltipRow[];
    indicator?: ChartTooltipIndicator;
    hideLabel?: boolean;
    totalLabel?: string;
    total?: string;
    class?: string;
  };

  let {
    label,
    rows = [],
    indicator = 'dot',
    hideLabel = false,
    totalLabel = 'Total',
    total,
    class: className,
    ...rest
  }: Props = $props();
</script>

<div class={cn('uin-chart-tooltip', className)} {...rest}>
  {#if label && !hideLabel}
    <span class="uin-chart-tooltip-label">{label}</span>
  {/if}

  {#each rows as row (row.key)}
    <span class="uin-chart-tooltip-row">
      <span class="uin-chart-tooltip-name">
        {#if (indicator === 'icon' || (indicator !== 'none' && row.icon)) && row.icon}
          <span class="uin-chart-tooltip-icon" aria-hidden="true">{row.icon}</span>
        {:else if indicator === 'line'}
          <span class="uin-chart-tooltip-indicator-line" style={`background: ${row.color ?? 'currentColor'};`}></span>
        {:else if indicator === 'dot'}
          <span class="uin-chart-swatch" style={`background: ${row.color ?? 'currentColor'};`}></span>
        {/if}
        {row.label}
      </span>
      <span class="uin-chart-tooltip-value">
        {row.value}{#if row.unit}<span class="uin-chart-tooltip-unit">{row.unit}</span>{/if}
      </span>
    </span>
  {/each}

  {#if total}
    <span class="uin-chart-tooltip-row uin-chart-tooltip-total">
      <span class="uin-chart-tooltip-name">{totalLabel}</span>
      <span class="uin-chart-tooltip-value">{total}</span>
    </span>
  {/if}
</div>
