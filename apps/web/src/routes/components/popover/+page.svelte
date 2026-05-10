<script lang="ts">
  import Popover from '@a3tai/mittsu-svelte5/components/popover/popover.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.'},
    {name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Edge of the trigger to anchor the panel.'},
    {name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Cross-axis alignment.'},
    {name: 'sideOffset', type: 'number', default: '6', description: 'Gap (px) between trigger and panel.'},
    {name: 'trigger', type: 'Snippet', description: 'The element that opens the popover when clicked.'},
    {name: 'children', type: 'Snippet', description: 'Panel content.'},
  ];
</script>

<DocLayout
  title="Popover"
  category="Overlay"
  description="Anchored floating panel. Built on bits-ui's Popover — positioning, focus management, ESC, and click-outside come from the headless layer."
>
  <DocSection title="Examples">
    <DocExample title="Basic" code={`<Popover>
  {#snippet trigger(props)}<Button>Open popover</Button>{/snippet}
  <p style="margin:0;">Anchored panel content.</p>
</Popover>`}>
      <Popover>
        {#snippet trigger(props)}
          <Button {...props}>Open popover</Button>
        {/snippet}
        <p style="margin:0; max-width:240px;">Anchored panel content. Click outside or press ESC to dismiss.</p>
      </Popover>
    </DocExample>

    <DocExample title='side="right"' code={`<Popover side="right">
  {#snippet trigger(props)}<Button variant="outline">→ Right</Button>{/snippet}
  Side-anchored
</Popover>`}>
      <Popover side="right">
        {#snippet trigger(props)}
          <Button variant="outline" {...props}>→ Right</Button>
        {/snippet}
        Side-anchored panel.
      </Popover>
    </DocExample>

    <DocExample title='align="start"' code={`<Popover align="start">
  {#snippet trigger(props)}<Button variant="ghost">Aligned to start</Button>{/snippet}
  …
</Popover>`}>
      <Popover align="start">
        {#snippet trigger(props)}
          <Button variant="ghost" {...props}>Aligned to start</Button>
        {/snippet}
        Cross-axis aligned to the start edge.
      </Popover>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add popover`} />
  </DocSection>
</DocLayout>
