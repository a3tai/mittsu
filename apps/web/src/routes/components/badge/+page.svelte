<script lang="ts">
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'variant', type: "'neutral' | 'accent' | 'success' | 'warn' | 'danger' | 'outline'", default: "'neutral'", description: 'Color tier or outline.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Use sm for inline counts inside a button.'},
  ];
</script>

<DocLayout
  title="Badge"
  category="Display"
  description="Small label for status / count / tag. Six variants, two sizes."
>
  <DocSection title="Examples">
    <DocExample title="Variants" code={`<Badge>Neutral</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warn">Warn</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="outline">Outline</Badge>`}>
      <Badge>Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warn">Warn</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="outline">Outline</Badge>
    </DocExample>

    <DocExample title="Small" code={`<Badge size="sm" variant="accent">12</Badge>`}>
      <Badge size="sm" variant="accent">12</Badge>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add badge`} />
  </DocSection>
</DocLayout>
