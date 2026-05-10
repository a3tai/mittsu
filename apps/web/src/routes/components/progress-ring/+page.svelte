<script lang="ts">
  import ProgressRing from '@a3tai/mittsu-svelte5/components/progress-ring/progress-ring.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'value', type: 'number', default: '0', description: 'Current value (0..max).'},
    {name: 'max', type: 'number', default: '1', description: 'Maximum value.'},
    {name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Ring diameter (16/24/40/64).'},
    {name: 'thickness', type: 'number', description: 'Override stroke width.'},
    {name: 'label', type: 'Snippet', description: 'Optional centered label content.'},
  ];
</script>

<DocLayout
  title="ProgressRing"
  category="Display"
  description="Circular determinate progress. Fills clockwise from 0 → 100% — for compact KPIs and sync indicators where a horizontal bar would be too noisy."
>
  <DocSection title="Examples">
    <DocExample title="Sizes" code={`<ProgressRing value={0.42} size="sm" />
<ProgressRing value={0.42} />
<ProgressRing value={0.42} size="lg" />
<ProgressRing value={0.42} size="xl" />`}>
      <ProgressRing value={0.42} size="sm" />
      <ProgressRing value={0.42} />
      <ProgressRing value={0.42} size="lg" />
      <ProgressRing value={0.42} size="xl" />
    </DocExample>

    <DocExample title="With percentage label" code={`<ProgressRing value={0.78} size="xl">
  {#snippet label()}78%{/snippet}
</ProgressRing>`}>
      <ProgressRing value={0.78} size="xl">
        {#snippet label()}78%{/snippet}
      </ProgressRing>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add progress-ring`} />
  </DocSection>
</DocLayout>
