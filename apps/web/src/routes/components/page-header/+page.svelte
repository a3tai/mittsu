<script lang="ts">
  import PageHeader from '@a3tai/mittsu-svelte5/components/page-header/page-header.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Display-font title (responsive size).'},
    {name: 'eyebrow', type: 'string', description: 'Tracked uppercase label above the title.'},
    {name: 'description', type: 'string', description: 'Muted paragraph below the title.'},
    {name: 'sticky', type: 'boolean', default: 'false', description: 'Stick to the top of the scroll viewport with a frosted backdrop.'},
    {name: 'actions', type: 'Snippet', description: 'Right-side action slot (typically Buttons).'},
  ];
</script>

<DocLayout
  title="PageHeader"
  category="Shell"
  description="Page-level header with display-font title, optional eyebrow + description, and an actions slot on the right."
>
  <DocSection title="Examples">
    <DocExample title="With actions" code={`<PageHeader
  eyebrow="Library"
  title="Recently Added"
  description="Books imported in the last 7 days."
>
  {#snippet actions()}
    <Button variant="outline">Filter</Button>
    <Button>Import</Button>
  {/snippet}
</PageHeader>`}>
      <div style="width:100%;">
        <PageHeader eyebrow="Library" title="Recently Added" description="Books imported in the last 7 days.">
          {#snippet actions()}
            <Button variant="outline">Filter</Button>
            <Button>Import</Button>
          {/snippet}
        </PageHeader>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add page-header`} />
  </DocSection>
</DocLayout>
