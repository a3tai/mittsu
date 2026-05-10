<script lang="ts">
  import Breadcrumb from '@a3tai/mittsu-svelte5/components/breadcrumb/breadcrumb.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'items', type: '{label, href?}[]', description: 'Trail of crumbs. Items without href are non-interactive labels; the last item is treated as the current page.'},
    {name: 'separator', type: 'Snippet', description: 'Override the default "/" separator (e.g. with "›" or a chevron SVG).'},
    {name: 'ariaLabel', type: 'string', default: "'Breadcrumb'", description: 'Accessible name for the <nav>.'},
  ];
</script>

<DocLayout
  title="Breadcrumb"
  category="Navigation"
  description="Hierarchical navigation trail. The last item renders as the current page (no link, bolder); intermediate items are links."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<Breadcrumb items={[
  {label: 'Home', href: '/'},
  {label: 'Library', href: '/library'},
  {label: 'Recently Added'},
]} />`}>
      <Breadcrumb
        items={[
          {label: 'Home', href: '/'},
          {label: 'Library', href: '/library'},
          {label: 'Recently Added'},
        ]}
      />
    </DocExample>

    <DocExample title="Custom separator" code={`<Breadcrumb items={…}>
  {#snippet separator()}›{/snippet}
</Breadcrumb>`}>
      <Breadcrumb
        items={[
          {label: 'Home', href: '/'},
          {label: 'Library', href: '/library'},
          {label: 'Authors', href: '/library/authors'},
          {label: 'Turing'},
        ]}
      >
        {#snippet separator()}›{/snippet}
      </Breadcrumb>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add breadcrumb`} />
  </DocSection>
</DocLayout>
