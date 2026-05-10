<!--
@component ChartFrame - shared figure shell for chart components.

Provides a native-feeling chart surface, optional title/description, legend,
and footer slot. Chart implementations render their SVG into the default
snippet. CSS lives in ./chart-frame.css.
-->
<script lang="ts">
  import type {Snippet} from 'svelte';
  import type {HTMLAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';
  import type {ChartLegendItem, ChartMetric} from '../../lib/types';

  export type Props = HTMLAttributes<HTMLElement> & {
    title?: string;
    description?: string;
    legend?: ChartLegendItem[];
    metrics?: ChartMetric[];
    footer?: Snippet;
    class?: string;
    children?: Snippet;
  };

  let {
    title,
    description,
    legend = [],
    metrics = [],
    footer,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<figure class={cn('uin-chart-frame', className)} {...rest}>
  {#if title || description || legend.length > 0 || metrics.length > 0}
    <figcaption class="uin-chart-frame-head">
      {#if title || description}
        <span class="uin-chart-frame-copy">
          {#if title}<strong class="uin-chart-frame-title">{title}</strong>{/if}
          {#if description}<span class="uin-chart-frame-desc">{description}</span>{/if}
        </span>
      {/if}
      {#if metrics.length > 0 || legend.length > 0}
        <span class="uin-chart-frame-meta">
          {#if metrics.length > 0}
            <span class="uin-chart-metrics" aria-label="Chart metrics">
              {#each metrics as metric (metric.label)}
                <span class="uin-chart-metric">
                  <span class="uin-chart-metric-label">
                    {#if metric.color}
                      <span class="uin-chart-swatch" style={`background: ${metric.color};`}></span>
                    {/if}
                    {metric.label}
                  </span>
                  <span class="uin-chart-metric-value">{metric.value}</span>
                  {#if metric.description}
                    <span class="uin-chart-metric-desc">{metric.description}</span>
                  {/if}
                </span>
              {/each}
            </span>
          {/if}
          {#if legend.length > 0}
            <span class="uin-chart-legend" aria-label="Chart legend">
              {#each legend as item (item.key)}
                <span class="uin-chart-legend-item">
                  <span class="uin-chart-swatch" style={`background: ${item.color};`}></span>
                  <span>{item.label}</span>
                </span>
              {/each}
            </span>
          {/if}
        </span>
      {/if}
    </figcaption>
  {/if}

  {#if children}{@render children()}{/if}

  {#if footer}
    <div class="uin-chart-frame-foot">
      {@render footer()}
    </div>
  {/if}
</figure>
