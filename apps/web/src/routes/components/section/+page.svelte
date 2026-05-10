<script lang="ts">
  import Section from '@a3tai/mittsu-svelte5/components/section/section.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Heading text rendered with the display font.'},
    {name: 'subtitle', type: 'string', description: 'Muted subtitle below the heading.'},
    {name: 'level', type: '2 | 3 | 4', default: '2', description: 'Heading element depth (h2 / h3 / h4).'},
  ];
</script>

<DocLayout
  title="Section"
  category="Layout"
  description="Semantic <section> with optional display-font title and muted subtitle. The page-region wrapper."
>
  <DocSection title="Examples">
    <DocExample title="With title and subtitle" code={`<Section title="Recently added" subtitle="Books imported in the last 7 days">
  <p>Body content sits below the heading block.</p>
</Section>`}>
      <Card style="width:100%;">
        <Section title="Recently added" subtitle="Books imported in the last 7 days">
          <p style="margin:0; color:var(--uin-fg-mute);">Body content sits below the heading block.</p>
        </Section>
      </Card>
    </DocExample>

    <DocExample title='level="3"' code={`<Section title="Sub-heading" level={3}>…</Section>`}>
      <Card style="width:100%;">
        <Section title="Sub-heading" level={3}>
          <p style="margin:0; color:var(--uin-fg-mute);">Renders an h3 instead of h2.</p>
        </Section>
      </Card>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add section`} />
  </DocSection>
</DocLayout>
