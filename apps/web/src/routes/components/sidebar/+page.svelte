<script lang="ts">
  import Sidebar from '@a3tai/mittsu-svelte5/components/sidebar/sidebar.svelte';
  import NavItem from '@a3tai/mittsu-svelte5/components/nav-item/nav-item.svelte';
  import Lamp from '@a3tai/mittsu-svelte5/components/lamp/lamp.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let active = $state('library');

  const props = [
    {name: 'collapsed', type: 'boolean', default: 'false', description: 'Shrink to icon rail (collapsedWidth).'},
    {name: 'side', type: "'left' | 'right'", default: "'left'", description: 'Which border the panel attaches to.'},
    {name: 'width', type: 'string', default: "'240px'", description: 'Expanded width.'},
    {name: 'collapsedWidth', type: 'string', default: "'48px'", description: 'Width when collapsed.'},
    {name: 'header', type: 'Snippet', description: 'Top region.'},
    {name: 'footer', type: 'Snippet', description: 'Bottom region.'},
  ];
</script>

<DocLayout
  title="Sidebar"
  category="Shell"
  description="Collapsible side panel with header / body / footer slots. Presentational — wire the collapsed state from your shell."
>
  <DocSection title="Examples">
    <DocExample title="With NavItems" code={`<Sidebar>
  <NavItem active>Library</NavItem>
  ...
</Sidebar>`}>
      <div style="height:240px; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <Sidebar>
          <NavItem active={active === 'library'} onclick={() => (active = 'library')}>
            {#snippet dot()}<Lamp state="running" />{/snippet}
            Library
            {#snippet aside()}1,204{/snippet}
          </NavItem>
          <NavItem active={active === 'recent'} onclick={() => (active = 'recent')}>
            {#snippet dot()}<Lamp state="idle" />{/snippet}
            Recent
          </NavItem>
        </Sidebar>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add sidebar`} />
  </DocSection>
</DocLayout>
