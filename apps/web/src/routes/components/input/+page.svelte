<script lang="ts">
  import Input from '@a3tai/mittsu-svelte5/components/input/input.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let v1 = $state('Hello');
  let v2 = $state('');

  const props = [
    {name: 'value', type: 'string', default: "''", description: 'Bindable value. Use bind:value.'},
    {name: 'shape', type: "'pill' | 'rounded' | 'square'", default: "'rounded'", description: 'Corner shape.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Height tier.'},
    {name: 'leading', type: 'Snippet', description: 'Inline adornment slot on the left (icon, prefix).'},
    {name: 'trailing', type: 'Snippet', description: 'Inline adornment slot on the right (clear, kbd hint).'},
    {name: 'inputClass', type: 'string', description: 'Class applied to the inner <input> element.'},
    {name: '...rest', type: 'HTMLInputAttributes', description: 'Spread onto the underlying <input>.'},
  ];
</script>

<DocLayout
  title="Input"
  category="Foundation"
  description="Base text input primitive. Other inputs (SearchInput, NumberInput, etc.) compose this."
>
  <DocSection title="Examples">
    <DocExample title="Basic" code={`<Input bind:value placeholder="Steve" />`}>
      <Input bind:value={v1} placeholder="Steve" />
    </DocExample>

    <DocExample title="Pill shape" code={`<Input shape="pill" placeholder="Pill" />`}>
      <Input shape="pill" bind:value={v2} placeholder="Pill" />
    </DocExample>

    <DocExample title="Sizes" code={`<Input size="sm" placeholder="Small" />
<Input placeholder="Default" />`}>
      <Input size="sm" placeholder="Small" />
      <Input placeholder="Default" />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add input`} />
  </DocSection>
</DocLayout>
