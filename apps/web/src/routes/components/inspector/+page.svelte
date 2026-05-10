<script lang="ts">
  import Inspector from '@a3tai/mittsu-svelte5/components/inspector/inspector.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const sections = [
    {
      title: 'General',
      rows: [
        {label: 'Title', value: 'The Selfish Gene'},
        {label: 'Author', value: 'Richard Dawkins'},
        {label: 'Format', value: 'EPUB'},
        {label: 'Language', value: 'English'},
      ],
    },
    {
      title: 'Metadata',
      rows: [
        {label: 'Pages', value: '360'},
        {label: 'Published', value: '1976'},
        {label: 'Added', value: '2026-04-12'},
        {label: 'Last opened', value: '2 days ago'},
      ],
    },
  ];

  const props = [
    {name: 'title', type: 'string', description: 'Header text.'},
    {name: 'sections', type: '{title, rows: {label, value}[]}[]', description: 'Sectioned property rows.'},
    {name: 'width', type: 'string', default: "'280px'", description: 'CSS length for the inspector column.'},
    {name: 'children', type: 'Snippet', description: 'Custom content to render below the sections.'},
  ];
</script>

<DocLayout
  title="Inspector"
  category="macOS"
  description="Right-side property panel — the macOS-app Properties pattern. Sectioned rows of label / value pairs."
>
  <DocSection title="Examples">
    <DocExample title="Book metadata" code={`<Inspector title="Properties" sections={[…]} />`}>
      <div style="height:340px; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <Inspector title="Properties" {sections} />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add inspector`} />
  </DocSection>
</DocLayout>
