<script lang="ts">
  import Sparkline from '@a3tai/mittsu-svelte5/components/sparkline/sparkline.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const series = [4, 6, 5, 8, 7, 9, 11, 10, 13, 12, 14, 15];

  const props = [
    {name: 'values', type: 'number[]', description: 'Y-coordinates; auto-scaled to min/max.'},
    {name: 'width', type: 'number', default: '80', description: 'SVG width in px.'},
    {name: 'height', type: 'number', default: '24', description: 'SVG height in px.'},
    {name: 'tone', type: "'default' | 'success' | 'warn' | 'danger'", default: "'default'", description: 'Stroke / fill color.'},
    {name: 'area', type: 'boolean', default: 'false', description: 'Fill below the line.'},
  ];
</script>

<DocLayout
  title="Sparkline"
  category="Display"
  description="Inline mini line chart. Tiny SVG drawn from a values array — no axes or tooltips. For richer charts reach for the Chart family in packages/charts."
>
  <DocSection title="Examples">
    <DocExample title="Inline next to a metric" code={`<span>Revenue $42K <Sparkline values={[…]} /></span>`}>
      <span style="display:inline-flex; align-items:center; gap:var(--uin-s-3); font-family:var(--uin-font-mono); font-size:13px; color:var(--uin-fg);">
        Revenue $42K
        <Sparkline values={series} />
      </span>
    </DocExample>

    <DocExample title="Tones with area fill" code={`<Sparkline values={[…]} tone="success" area />
<Sparkline values={[…]} tone="warn" area />
<Sparkline values={[…]} tone="danger" area />`}>
      <Sparkline values={series} tone="success" area />
      <Sparkline values={series} tone="warn" area />
      <Sparkline values={[15, 13, 11, 12, 9, 7, 5, 4]} tone="danger" area />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add sparkline`} />
  </DocSection>
</DocLayout>
