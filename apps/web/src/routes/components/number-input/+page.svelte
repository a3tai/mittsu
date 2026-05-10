<script lang="ts">
  import NumberInput from '@a3tai/mittsu-svelte5/components/number-input/number-input.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let qty = $state(4);
  let pct = $state(0.5);

  const props = [
    {name: 'value', type: 'number', default: '0', description: 'Bindable numeric value.'},
    {name: 'min', type: 'number', description: 'Lower bound (inclusive).'},
    {name: 'max', type: 'number', description: 'Upper bound (inclusive).'},
    {name: 'step', type: 'number', default: '1', description: 'Increment per Stepper click / arrow-key press.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Input + Stepper dimension tier.'},
  ];
</script>

<DocLayout
  title="NumberInput"
  category="Form"
  description="Numeric text field with ▲▼ Stepper. Composes Input (type=number) and Stepper. Honors min / max / step; native arrow-key support."
>
  <DocSection title="Examples">
    <DocExample title="Bounded counter" code={`<NumberInput bind:value={qty} min={0} max={99} />`}>
      <div style="width:200px;"><NumberInput bind:value={qty} min={0} max={99} /></div>
    </DocExample>

    <DocExample title="Fractional step" code={`<NumberInput bind:value={pct} min={0} max={1} step={0.05} />`}>
      <div style="width:200px;"><NumberInput bind:value={pct} min={0} max={1} step={0.05} /></div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add number-input`} />
  </DocSection>
</DocLayout>
