<script lang="ts">
  import ToggleGroup from '@a3tai/mittsu-svelte5/components/toggle-group/toggle-group.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let align = $state<'left' | 'center' | 'right'>('left');
  let formats = $state<string[]>(['bold']);

  const props = [
    {name: 'options', type: '{value, label, icon?, disabled?}[]', description: 'Toggle definitions.'},
    {name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Single = radio behavior; multiple = checkbox behavior.'},
    {name: 'value', type: 'T | T[]', description: 'Bindable value (string for single, string[] for multiple).'},
    {name: 'onChange', type: '(next: T | T[]) => void', description: 'Fires when selection changes.'},
    {name: 'variant', type: "'default' | 'outline'", default: "'default'", description: 'Pass-through to Toggle.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Pass-through to Toggle.'},
  ];
</script>

<DocLayout
  title="ToggleGroup"
  category="Form"
  description="Set of related Toggles bound to one value. Single-select acts as a radio group; multiple-select accumulates into an array."
>
  <DocSection title="Examples">
    <DocExample title='type="single"' code={`<ToggleGroup
  type="single"
  bind:value={align}
  options={[
    {value: 'left', label: 'Left'},
    {value: 'center', label: 'Center'},
    {value: 'right', label: 'Right'},
  ]}
/>`}>
      <ToggleGroup
        type="single"
        bind:value={align}
        options={[
          {value: 'left', label: 'Left'},
          {value: 'center', label: 'Center'},
          {value: 'right', label: 'Right'},
        ]}
      />
    </DocExample>

    <DocExample title='type="multiple"' code={`<ToggleGroup
  type="multiple"
  bind:value={formats}
  variant="outline"
  options={[
    {value: 'bold', label: 'Bold'},
    {value: 'italic', label: 'Italic'},
    {value: 'underline', label: 'Underline'},
  ]}
/>`}>
      <ToggleGroup
        type="multiple"
        bind:value={formats}
        variant="outline"
        options={[
          {value: 'bold', label: 'Bold'},
          {value: 'italic', label: 'Italic'},
          {value: 'underline', label: 'Underline'},
        ]}
      />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add toggle-group`} />
  </DocSection>
</DocLayout>
