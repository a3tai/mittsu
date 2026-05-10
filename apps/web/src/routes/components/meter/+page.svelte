<script lang="ts">
  import Meter from '@a3tai/mittsu-svelte5/components/meter/meter.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'value', type: 'number', default: '0', description: 'Current value (0..max).'},
    {name: 'max', type: 'number', default: '1', description: 'Maximum value.'},
    {name: 'segments', type: 'number', default: '5', description: 'Number of ticks to render.'},
    {name: 'tone', type: "'default' | 'success' | 'warn' | 'danger'", default: "'default'", description: 'Color of the active segments.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Tick dimension.'},
  ];
</script>

<DocLayout
  title="Meter"
  category="Display"
  description="Discrete level indicator (battery / signal / score). Distinct from ProgressBar — meter shows a measured value on a fixed scale, not loading progression."
>
  <DocSection title="Examples">
    <DocExample title="Tones" code={`<Meter value={0.8} />
<Meter value={0.8} tone="success" />
<Meter value={0.4} tone="warn" />
<Meter value={0.2} tone="danger" />`}>
      <Meter value={0.8} />
      <Meter value={0.8} tone="success" />
      <Meter value={0.4} tone="warn" />
      <Meter value={0.2} tone="danger" />
    </DocExample>

    <DocExample title="Custom segments" code={`<Meter value={3} max={7} segments={7} />`}>
      <Meter value={3} max={7} segments={7} />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add meter`} />
  </DocSection>
</DocLayout>
