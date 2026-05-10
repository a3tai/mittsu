<script lang="ts">
  import Drawer from '@a3tai/mittsu-svelte5/components/drawer/drawer.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let open = $state(false);
  let large = $state(false);

  const props = [
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.'},
    {name: 'title', type: 'string', description: 'Optional heading.'},
    {name: 'description', type: 'string', description: 'Optional subhead.'},
    {name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Height as a vh fraction (40 / 60 / 80 / 100).'},
    {name: 'children', type: 'Snippet', description: 'Body content.'},
    {name: 'footer', type: 'Snippet', description: 'Optional action row.'},
  ];
</script>

<DocLayout
  title="Drawer"
  category="Overlay"
  description="Bottom-anchored slide-up sheet with a drag handle. The shape iOS apps use for share sheets and settings sub-pages. For non-bottom edges, use Sheet."
>
  <DocSection title="Examples">
    <DocExample title="Default (md)" code={`<Button onclick={() => open = true}>Open drawer</Button>
<Drawer bind:open title="Share book" description="Pick a destination.">
  <p>Body content scrolls if it overflows.</p>
</Drawer>`}>
      <Button onclick={() => (open = true)}>Open drawer</Button>
      <Drawer bind:open title="Share book" description="Pick a destination.">
        <p style="margin:0; line-height:1.5;">Body content scrolls if it overflows. The drag handle at the top hints that the panel is dismissible.</p>
        {#snippet footer()}
          <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
          <Button onclick={() => (open = false)}>Share</Button>
        {/snippet}
      </Drawer>
    </DocExample>

    <DocExample title='size="lg"' code={`<Drawer bind:open size="lg" title="Filter library">…</Drawer>`}>
      <Button variant="outline" onclick={() => (large = true)}>Open lg drawer</Button>
      <Drawer bind:open={large} size="lg" title="Filter library">
        <p style="margin:0; line-height:1.5;">More room for forms or long lists.</p>
      </Drawer>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add drawer`} />
  </DocSection>
</DocLayout>
