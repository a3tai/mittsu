<!--
@component Select — dropdown picker built on bits-ui's Select primitive.

Headless behavior — keyboard typeahead, focus management, popover
positioning, ESC close — all delegated to bits-ui. Our chrome is the
trigger button shape (Input-style) and a popover-style listbox.

Pass `options: {value, label, disabled?}[]` and bind `value`. The
selected item's label renders inside the trigger; `placeholder` shows
when nothing is selected.

For free-text typeahead with arbitrary results, reach for `Combobox`
instead.

Requires `bits-ui` (`npm install bits-ui`).

CSS lives in `./select.css`.
-->
<script lang="ts" generics="T extends string">
  import {Select as BS} from 'bits-ui';
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
    placeholder = 'Select…',
    disabled = false,
    size = 'md',
    ariaLabel,
    class: className,
  }: Props = $props();

  const selectedLabel = $derived(
    options.find((o) => o.value === value)?.label ?? ''
  );
</script>

<BS.Root
  type="single"
  bind:value
  onValueChange={(v: string) => onValueChange?.(v as T)}
  {disabled}
>
  <BS.Trigger
    class={cn('uin-select-trigger', `uin-select-trigger-${size}`, className)}
    aria-label={ariaLabel}
  >
    <span class={cn('uin-select-value', !selectedLabel && 'uin-select-placeholder')}>
      {selectedLabel || placeholder}
    </span>
    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" class="uin-select-chev">
      <polyline points="3,5 6,8 9,5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </BS.Trigger>
  <BS.Portal>
    <BS.Content class="uin-select-content" sideOffset={4}>
      <BS.Viewport>
        {#each options as opt (opt.value)}
          <BS.Item
            value={opt.value}
            class="uin-select-item"
            disabled={opt.disabled}
          >
            <span class="uin-select-item-label">{opt.label}</span>
            <span class="uin-select-check" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="11" height="11">
                <polyline points="3,8 7,12 13,4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </BS.Item>
        {/each}
      </BS.Viewport>
    </BS.Content>
  </BS.Portal>
</BS.Root>
