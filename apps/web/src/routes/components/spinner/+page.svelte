<script lang="ts">
  import Spinner from '@a3tai/mittsu-svelte5/components/spinner/spinner.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Diameter — 12 / 16 / 24 px.'},
    {name: 'label', type: 'string', default: "'Loading'", description: 'Accessible label for screen readers.'},
    {name: 'class', type: 'string', description: 'Extra classes; merged via cn().'},
  ];
</script>

<DocLayout
  title="Spinner"
  category="Foundation"
  description="Indeterminate progress ring. Uses currentColor so it tints to the surrounding text color."
>
  <DocSection title="Examples">
    <DocExample title="Sizes" code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`}>
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add spinner`} />
  </DocSection>
</DocLayout>
