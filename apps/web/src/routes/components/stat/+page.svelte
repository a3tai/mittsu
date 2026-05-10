<script lang="ts">
  import Stat from '@a3tai/mittsu-svelte5/components/stat/stat.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'label', type: 'string', description: 'Tiny eyebrow caption above the value.'},
    {name: 'value', type: 'string | number', description: 'The display value. Numbers auto-locale via toLocaleString().'},
    {name: 'tone', type: "'default' | 'accent'", default: "'default'", description: 'Accent flips the value to the accent color (KPI emphasis).'},
    {name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Value font-size tier.'},
    {name: 'hint', type: 'Snippet', description: 'Small caption below the value.'},
  ];
</script>

<DocLayout
  title="Stat"
  category="Display"
  description="Single label + display-font value pair. The basic readout for a metric."
>
  <DocSection title="Examples">
    <DocExample title="Row of stats" code={`<div class="uin-stat-row">
  <Stat label="Books" value={1204} />
  <Stat label="Passages" value={8421} tone="accent" />
  <Stat label="Indexed" value="98%" />
</div>`}>
      <div class="uin-stat-row" style="width:100%;">
        <Stat label="Books" value={1204} />
        <Stat label="Passages" value={8421} tone="accent" />
        <Stat label="Indexed" value="98%" />
      </div>
    </DocExample>

    <DocExample title='size="lg"' code={`<Stat label="Total" value={42000} size="lg" tone="accent" />`}>
      <Stat label="Total" value={42000} size="lg" tone="accent" />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add stat`} />
  </DocSection>
</DocLayout>
