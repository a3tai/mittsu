<script lang="ts">
  import Calendar from '@a3tai/mittsu-svelte5/components/calendar/calendar.svelte';
  import {today, getLocalTimeZone, type DateValue} from '@internationalized/date';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let value = $state<DateValue | undefined>(today(getLocalTimeZone()));

  const props = [
    {name: 'value', type: 'DateValue | undefined', description: 'Bindable @internationalized/date value.'},
    {name: 'minValue', type: 'DateValue', description: 'Earliest selectable date.'},
    {name: 'maxValue', type: 'DateValue', description: 'Latest selectable date.'},
    {name: 'locale', type: 'string', default: "'en-US'", description: 'Locale for month / weekday names.'},
    {name: 'weekdayFormat', type: "'narrow' | 'short' | 'long'", default: "'short'", description: 'Weekday header style.'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'Lock all interactions.'},
    {name: 'readonly', type: 'boolean', default: 'false', description: 'Allow focus but no selection changes.'},
  ];
</script>

<DocLayout
  title="Calendar"
  category="Form"
  description="Month-grid date picker. Built on bits-ui's Calendar with @internationalized/date for locale-correct date math. Pair with Popover (later) for a DatePicker."
>
  <DocSection title="Examples">
    <DocExample title="Single-date picker" code={`import {today, getLocalTimeZone} from '@internationalized/date';

let value = $state(today(getLocalTimeZone()));

<Calendar bind:value />`}>
      <Calendar bind:value />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui @internationalized/date
npx @a3tai/mittsu add calendar`} />
  </DocSection>
</DocLayout>
