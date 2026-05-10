<!--
@component Combobox — typeahead select built on bits-ui's Combobox.

A `Select` with a free-text input — the user types to filter the
options, ↑↓ to navigate, ↩ to choose. Headless behavior comes from
bits-ui; our chrome is the Input-style trigger plus a popover-style
listbox.

Pass `options: {value, label, disabled?}[]` and bind `value`. Filter
matching is performed by bits-ui by default (case-insensitive prefix
on the label).

Requires `bits-ui` (`npm install bits-ui`).

CSS lives in `./combobox.css` plus shares chrome with `./select.css`.
-->
<script lang="ts" generics="T extends string">
  import {Combobox as BC} from 'bits-ui';
  import {cn} from '../../lib/cn';

  type Option = {
    value: T;
    label: string;
    disabled?: boolean;
  };

  type Props = {
    options: Option[];
    value?: T;
    onValueChange?: (next: T) => void;
    placeholder?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
    ariaLabel?: string;
    class?: string;
  };

  let {
    options,
    value = $bindable<T>('' as T),
    onValueChange,
    placeholder = 'Search…',
    disabled = false,
    size = 'md',
    ariaLabel,
    class: className,
  }: Props = $props();

  // Mirror current selection's label into the combobox input. bits-ui
  // filters items by `label` automatically — no custom filter needed here.
  const selectedLabel = $derived(
    options.find((o) => o.value === value)?.label ?? ''
  );
</script>

<BC.Root
  type="single"
  bind:value
  inputValue={selectedLabel}
  onValueChange={(v: string) => onValueChange?.(v as T)}
  {disabled}
>
  <div class={cn('uin-combobox', `uin-select-trigger-${size}`, className)}>
    <BC.Input
      class="uin-combobox-input"
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
    <BC.Trigger class="uin-combobox-trigger" aria-label="Toggle list">
      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" class="uin-select-chev">
        <polyline points="3,5 6,8 9,5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </BC.Trigger>
  </div>
  <BC.Portal>
    <BC.Content class="uin-select-content" sideOffset={4}>
      {#each options as opt (opt.value)}
        <BC.Item value={opt.value} label={opt.label} class="uin-select-item" disabled={opt.disabled}>
          <span class="uin-select-item-label">{opt.label}</span>
          <span class="uin-select-check" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="11" height="11">
              <polyline points="3,8 7,12 13,4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </BC.Item>
      {/each}
    </BC.Content>
  </BC.Portal>
</BC.Root>
