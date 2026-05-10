<!--
@component PasswordInput — Input with a show/hide toggle.

Composes `Input` with a small eye-icon button in the trailing slot
that toggles the input's `type` between `password` and `text`. Default
state is masked.

Bind `value`. All other Input props (size, shape, placeholder, etc.)
forward through.

CSS lives in `./password-input.css`.
-->
<script lang="ts">
  import type {HTMLInputAttributes} from 'svelte/elements';
  import {cn} from '../../lib/cn';
  import Input from '../input/input.svelte';

  type Props = Omit<HTMLInputAttributes, 'type' | 'class' | 'value' | 'size'> & {
    value?: string;
    showShowToggle?: boolean;
    size?: 'sm' | 'md';
    class?: string;
  };

  let {
    value = $bindable(''),
    showShowToggle = true,
    size = 'md',
    class: className,
    ...rest
  }: Props = $props();

  let visible = $state(false);
  function toggle() {
    visible = !visible;
  }
</script>

<Input
  type={visible ? 'text' : 'password'}
  shape="rounded"
  size={size}
  class={cn('uin-password', className)}
  bind:value
  {...rest}
>
  {#snippet trailing()}
    {#if showShowToggle}
      <button
        type="button"
        class="uin-password-toggle"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        onclick={toggle}
      >
        {#if visible}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M2 8s2-5 6-5 6 5 6 5-2 5-6 5-6-5-6-5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
            <circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4" />
            <line x1="2" y1="14" x2="14" y2="2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          </svg>
        {:else}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M2 8s2-5 6-5 6 5 6 5-2 5-6 5-6-5-6-5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
            <circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4" />
          </svg>
        {/if}
      </button>
    {/if}
  {/snippet}
</Input>
