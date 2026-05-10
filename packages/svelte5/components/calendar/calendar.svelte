<!--
@component Calendar — month-grid date picker built on bits-ui's Calendar.

Composes the bits-ui Calendar primitive with our chrome — month/year
header, prev/next nav, weekday header row, and day cells with selected /
today / outside-month / disabled states.

Bind `value` as a `DateValue` from `@internationalized/date`. Pair with
DatePicker (later wave) to wrap inside a Popover.

Requires `bits-ui` and `@internationalized/date`.

CSS lives in `./calendar.css`.
-->
<script lang="ts">
  import {Calendar as BCal} from 'bits-ui';
  import type {DateValue} from '@internationalized/date';
  import {cn} from '../../lib/cn';

  type Props = {
    value?: DateValue | undefined;
    onValueChange?: (next: DateValue | undefined) => void;
    minValue?: DateValue;
    maxValue?: DateValue;
    disabled?: boolean;
    readonly?: boolean;
    locale?: string;
    weekdayFormat?: 'narrow' | 'short' | 'long';
    class?: string;
  };

  let {
    value = $bindable<DateValue | undefined>(undefined),
    onValueChange,
    minValue,
    maxValue,
    disabled = false,
    readonly = false,
    locale = 'en-US',
    weekdayFormat = 'short',
    class: className,
  }: Props = $props();
</script>

<BCal.Root
  type="single"
  bind:value
  onValueChange={(v: DateValue | undefined) => onValueChange?.(v)}
  {minValue}
  {maxValue}
  {disabled}
  {readonly}
  {locale}
  {weekdayFormat}
  class={cn('uin-cal', className)}
>
  {#snippet children({months, weekdays})}
    <BCal.Header class="uin-cal-header">
      <BCal.PrevButton class="uin-cal-nav-btn" aria-label="Previous month">
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <polyline points="7,3 4,6 7,9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </BCal.PrevButton>
      <BCal.Heading class="uin-cal-heading" />
      <BCal.NextButton class="uin-cal-nav-btn" aria-label="Next month">
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <polyline points="5,3 8,6 5,9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </BCal.NextButton>
    </BCal.Header>
    {#each months as month}
      <BCal.Grid class="uin-cal-grid">
        <BCal.GridHead>
          <BCal.GridRow class="uin-cal-row">
            {#each weekdays as wd}
              <BCal.HeadCell class="uin-cal-weekday">{wd}</BCal.HeadCell>
            {/each}
          </BCal.GridRow>
        </BCal.GridHead>
        <BCal.GridBody>
          {#each month.weeks as week}
            <BCal.GridRow class="uin-cal-row">
              {#each week as date}
                <BCal.Cell {date} month={month.value} class="uin-cal-cell">
                  <BCal.Day class="uin-cal-day" />
                </BCal.Cell>
              {/each}
            </BCal.GridRow>
          {/each}
        </BCal.GridBody>
      </BCal.Grid>
    {/each}
  {/snippet}
</BCal.Root>
