<script lang="ts">
  import Empty from '@a3tai/mittsu-svelte5/components/empty/empty.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Required headline.'},
    {name: 'description', type: 'string', description: 'Optional muted body line.'},
    {name: 'icon', type: 'Snippet', description: 'Optional icon snippet (typically an SVG).'},
    {name: 'action', type: 'Snippet', description: 'Optional action slot below the body (typically a Button).'},
  ];
</script>

<DocLayout
  title="Empty"
  category="Foundation"
  description="Empty-state placeholder for lists, tables, and panels with nothing to render. Centered icon + title + description + action."
>
  <DocSection title="Examples">
    <DocExample title="Full layout" code={`<Empty
  title="No books yet"
  description="Drop an EPUB or PDF here, or import from the cloud."
>
  {#snippet icon()}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  {/snippet}
  {#snippet action()}
    <Button>Import library</Button>
  {/snippet}
</Empty>`}>
      <Card padding={false} style="width:100%;">
        <Empty title="No books yet" description="Drop an EPUB or PDF here, or import from the cloud.">
          {#snippet icon()}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>
          {/snippet}
          {#snippet action()}
            <Button>Import library</Button>
          {/snippet}
        </Empty>
      </Card>
    </DocExample>

    <DocExample title="Title only" code={`<Empty title="Nothing here yet" />`}>
      <Card padding={false} style="width:100%;">
        <Empty title="Nothing here yet" />
      </Card>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add empty`} />
  </DocSection>
</DocLayout>
