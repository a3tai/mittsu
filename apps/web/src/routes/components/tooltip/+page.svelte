<script lang="ts">
  import Tooltip from '@a3tai/mittsu-svelte5/components/tooltip/tooltip.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'content', type: 'string', description: 'Tooltip text. Keep to one line ideally.'},
    {name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Edge of the trigger to anchor.'},
    {name: 'sideOffset', type: 'number', default: '6', description: 'Gap (px) between trigger and tooltip.'},
    {name: 'delayDuration', type: 'number', default: '250', description: 'How long the trigger must be hovered before showing.'},
    {name: 'trigger', type: 'Snippet<[TriggerProps]>', description: 'Snippet receiving bits-ui props. Spread them onto your own element so it (not a wrapper) is the actual trigger.'},
  ];
</script>

<DocLayout
  title="Tooltip"
  category="Overlay"
  description="Hover- or focus-triggered short label. Smaller than Popover and non-interactive — content shouldn't accept clicks. Use for icon-button labels and abbreviation hints."
>
  <DocSection title="Examples">
    <DocExample title="Default (top)" code={`<Tooltip content="Search · ⌘K">
  {#snippet trigger(props)}
    <Button icon aria-label="Search" {...props}>⌕</Button>
  {/snippet}
</Tooltip>`}>
      <Tooltip content="Search · ⌘K">
        {#snippet trigger(props)}
          <Button icon aria-label="Search" {...props}>⌕</Button>
        {/snippet}
      </Tooltip>
    </DocExample>

    <DocExample title='side="right"' code={`<Tooltip content="Saved 4 minutes ago" side="right">
  {#snippet trigger(props)}
    <Button variant="ghost" size="sm" {...props}>Saved</Button>
  {/snippet}
</Tooltip>`}>
      <Tooltip content="Saved 4 minutes ago" side="right">
        {#snippet trigger(props)}
          <Button variant="ghost" size="sm" {...props}>Saved</Button>
        {/snippet}
      </Tooltip>
    </DocExample>

    <DocExample title="Custom delay" code={`<Tooltip content="Shows immediately" delayDuration={0}>
  {#snippet trigger(props)}
    <Button variant="outline" {...props}>Instant</Button>
  {/snippet}
</Tooltip>`}>
      <Tooltip content="Shows immediately" delayDuration={0}>
        {#snippet trigger(props)}
          <Button variant="outline" {...props}>Instant</Button>
        {/snippet}
      </Tooltip>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add tooltip`} />
  </DocSection>
</DocLayout>
