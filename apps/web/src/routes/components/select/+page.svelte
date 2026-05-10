<script lang="ts">
  import Select from '@a3tai/mittsu-svelte5/components/select/select.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let theme = $state<'light' | 'dark' | 'auto'>('auto');
  let priority = $state<'low' | 'med' | 'high'>('med');

  const props = [
    {name: 'options', type: '{value, label, disabled?}[]', description: 'Option definitions.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'onValueChange', type: '(next: T) => void', description: 'Fires when selection changes.'},
    {name: 'placeholder', type: 'string', default: "'Select…'", description: 'Shown when nothing is selected.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Trigger height tier.'},
    {name: 'ariaLabel', type: 'string', description: 'Accessible name override.'},
  ];
</script>

<DocLayout
  title="Select"
  category="Form"
  description="Dropdown picker built on bits-ui's Select — keyboard typeahead, focus management, ESC, popover positioning all handled."
>
  <DocSection title="Examples">
    <DocExample title="Theme picker" code={`<Select
  bind:value={theme}
  options={[
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
    {value: 'auto', label: 'Match system'},
  ]}
/>`}>
      <div style="width:240px;">
        <Select
          bind:value={theme}
          options={[
            {value: 'light', label: 'Light'},
            {value: 'dark', label: 'Dark'},
            {value: 'auto', label: 'Match system'},
          ]}
          ariaLabel="Theme"
        />
      </div>
    </DocExample>

    <DocExample title="Small + placeholder" code={`<Select size="sm" placeholder="Priority…" options={…} />`}>
      <div style="width:200px;">
        <Select
          size="sm"
          placeholder="Priority…"
          bind:value={priority}
          options={[
            {value: 'low', label: 'Low'},
            {value: 'med', label: 'Medium'},
            {value: 'high', label: 'High'},
          ]}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add select`} />
  </DocSection>
</DocLayout>
