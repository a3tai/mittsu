<!--
@component Meter — discrete level indicator (battery, signal, score).

Distinct from `ProgressBar`: a meter shows a *measured value* on a
scale where the meaning of "low" or "high" is fixed (not a "loading"
progression). Renders N segmented ticks with the active range filled.

`segments` controls how many ticks to render (default 5). `value` is
clamped to 0..max. `tone` switches the active fill: `default` uses
the accent; `success` / `warn` / `danger` swap to semantic colors —
useful for "low battery" or "weak password."

CSS lives in `./meter.css`.
-->
<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';

  type Tone = 'default' | 'success' | 'warn' | 'danger';

  type Props = HTMLAttributes<HTMLDivElement> & {
    value?: number;
    max?: number;
    segments?: number;
    tone?: Tone;
    size?: 'sm' | 'md';
    class?: string;
    ariaLabel?: string;
  };

  let {
    value = 0,
    max = 1,
    segments = 5,
    tone = 'default',
    size = 'md',
    class: className,
    ariaLabel,
    ...rest
  }: Props = $props();

  const filled = $derived(
    Math.max(0, Math.min(segments, Math.round((value / Math.max(0.0001, max)) * segments)))
  );
</script>

<div
  class={cn('uin-meter', `uin-meter-${size}`, `uin-meter-${tone}`, className)}
  role="meter"
  aria-valuemin={0}
  aria-valuemax={max}
  aria-valuenow={value}
  aria-label={ariaLabel}
  {...rest}
>
  {#each Array(segments) as _, i}
    <span class={cn('uin-meter-seg', i < filled && 'uin-meter-seg-on')}></span>
  {/each}
</div>
