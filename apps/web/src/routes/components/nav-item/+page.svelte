<script lang="ts">
  import NavItem from '@a3tai/mittsu-svelte5/components/nav-item/nav-item.svelte';
  import Lamp from '@a3tai/mittsu-svelte5/components/lamp/lamp.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let active = $state<string>('library');

  const props = [
    {name: 'active', type: 'boolean', default: 'false', description: 'Highlight the row as the current page.'},
    {name: 'dot', type: 'Snippet', description: 'Left-side slot — typically a <Lamp /> or icon.'},
    {name: 'aside', type: 'Snippet', description: 'Right-side slot — count, badge, etc.'},
    {name: '...rest', type: 'HTMLButtonAttributes', description: 'Spread onto the underlying <button>.'},
  ];
</script>

<DocLayout
  title="NavItem"
  category="Navigation"
  description="Sidebar navigation row with three slots: dot (left) / label (middle) / aside (right). Renders a <button>."
>
  <DocSection title="Examples">
    <DocExample title="Sidebar" code={`<Card padding={false}>
  <div class="navlist">
    <NavItem active={active === 'library'} onclick={() => active = 'library'}>
      {#snippet dot()}<Lamp state="running" />{/snippet}
      Library
      {#snippet aside()}1,204{/snippet}
    </NavItem>
    …
  </div>
</Card>`}>
      <Card padding={false} style="width:100%;">
        <div style="display:flex; flex-direction:column; padding:6px;">
          <NavItem active={active === 'library'} onclick={() => (active = 'library')}>
            {#snippet dot()}<Lamp state="running" />{/snippet}
            Library
            {#snippet aside()}1,204{/snippet}
          </NavItem>
          <NavItem active={active === 'recent'} onclick={() => (active = 'recent')}>
            {#snippet dot()}<Lamp state="idle" />{/snippet}
            Recently Added
          </NavItem>
          <NavItem active={active === 'unprocessed'} onclick={() => (active = 'unprocessed')}>
            {#snippet dot()}<Lamp state="warn" />{/snippet}
            Unprocessed
            {#snippet aside()}24{/snippet}
          </NavItem>
        </div>
      </Card>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add nav-item`} />
  </DocSection>
</DocLayout>
