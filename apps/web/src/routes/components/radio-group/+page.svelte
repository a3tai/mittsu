<script lang="ts">
  import RadioGroup from '@a3tai/mittsu-svelte5/components/radio-group/radio-group.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let theme = $state<'light' | 'dark' | 'auto'>('auto');
  let billing = $state<'monthly' | 'annual'>('monthly');

  const props = [
    {name: 'options', type: '{value, label, disabled?}[]', description: 'Option definitions.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'onChange', type: '(next: T) => void', description: 'Fires when selection changes.'},
    {name: 'name', type: 'string', description: 'HTML name attribute (auto-generated if omitted).'},
    {name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Radio dot dimension tier.'},
  ];
</script>

<DocLayout
  title="RadioGroup"
  category="Form"
  description="Single-select group of options. Native radio inputs under the hood — keyboard focus, form submission, accessibility built in."
>
  <DocSection title="Examples">
    <DocExample title="Vertical" code={`<RadioGroup
  bind:value={theme}
  options={[
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
    {value: 'auto', label: 'Match system'},
  ]}
  ariaLabel="Theme"
/>`}>
      <RadioGroup
        bind:value={theme}
        options={[
          {value: 'light', label: 'Light'},
          {value: 'dark', label: 'Dark'},
          {value: 'auto', label: 'Match system'},
        ]}
        ariaLabel="Theme"
      />
    </DocExample>

    <DocExample title="Horizontal" code={`<RadioGroup
  direction="horizontal"
  bind:value={billing}
  options={[
    {value: 'monthly', label: 'Monthly'},
    {value: 'annual', label: 'Annual'},
  ]}
/>`}>
      <RadioGroup
        direction="horizontal"
        bind:value={billing}
        options={[
          {value: 'monthly', label: 'Monthly'},
          {value: 'annual', label: 'Annual'},
        ]}
      />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add radio-group`} />
  </DocSection>
</DocLayout>
