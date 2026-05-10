<script lang="ts">
  import SegmentedControl from '@a3tai/mittsu-svelte5/components/segmented-control/segmented-control.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let view = $state<'list' | 'card'>('list');

  const props = [
    {name: 'options', type: '{value, label, icon?, disabled?}[]', description: 'Option definitions.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'onChange', type: '(next: T) => void', description: 'Optional change callback.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Height tier.'},
    {name: 'ariaLabel', type: 'string', description: 'Accessible label for the radiogroup.'},
  ];
</script>

<DocLayout
  title="SegmentedControl"
  category="Navigation"
  description="Radio group rendered as connected buttons sharing one rounded chassis. For binary or ternary mode toggles."
>
  <DocSection title="Examples">
    <DocExample title="Two options" code={`<SegmentedControl
  options={[
    {value: 'list', label: 'List'},
    {value: 'card', label: 'Cards'},
  ]}
  bind:value
  ariaLabel="Layout"
/>`}>
      <SegmentedControl
        options={[
          {value: 'list', label: 'List'},
          {value: 'card', label: 'Cards'},
        ]}
        bind:value={view}
        ariaLabel="Layout"
      />
      <span style="color:var(--uin-fg-mute); font-size:12.5px;">Selected: {view}</span>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add segmented-control`} />
  </DocSection>
</DocLayout>
