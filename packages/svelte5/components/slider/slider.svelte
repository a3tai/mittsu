<!--
@component Slider — value picker on a continuous range.

A single-thumb range input for picking a numeric value between `min`
and `max`. Native `<input type="range">` with custom track and thumb
chrome — full keyboard support comes for free (←/→, Home/End, PageUp/
PageDown).

The track fills proportionally with the accent color up to the thumb.

Sizes: `sm` (compact track) and `md` (default).

CSS lives in `./slider.css`.
-->
<script lang="ts">
  import type {HTMLInputAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';

  type Props = Omit<HTMLInputAttributes, 'type' | 'class' | 'value' | 'size'> & {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: 'sm' | 'md';
    class?: string;
  };

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    size = 'md',
    class: className,
    disabled,
    ...rest
  }: Props = $props();

  const pct = $derived(
    Math.max(0, Math.min(100, ((value - min) / Math.max(0.0001, max - min)) * 100))
  );
</script>

<input
  type="range"
  class={cn('uin-slider', `uin-slider-${size}`, className)}
  bind:value
  {min}
  {max}
  {step}
  {disabled}
  style="--uin-slider-pct: {pct}%;"
  {...rest}
/>
