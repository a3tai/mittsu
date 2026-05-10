<script lang="ts">
  import Sheet from '@a3tai/mittsu-svelte5/components/sheet/sheet.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let rightOpen = $state(false);
  let leftOpen = $state(false);
  let bottomOpen = $state(false);

  const props = [
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.'},
    {name: 'title', type: 'string', description: 'Optional heading.'},
    {name: 'description', type: 'string', description: 'Optional subhead.'},
    {name: 'side', type: "'right' | 'left' | 'top' | 'bottom'", default: "'right'", description: 'Edge to slide in from.'},
    {name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Cross-axis dimension.'},
    {name: 'children', type: 'Snippet', description: 'Body content.'},
    {name: 'footer', type: 'Snippet', description: 'Optional action row.'},
  ];
</script>

<DocLayout
  title="Sheet"
  category="Overlay"
  description="Slide-in panel from a screen edge. macOS-flavored. Built on bits-ui's Dialog primitive — same focus trap and ESC, but content slides in from one of four sides."
>
  <DocSection title="Examples">
    <DocExample title='side="right" (default)' code={`<Button onclick={() => open = true}>Open right sheet</Button>
<Sheet bind:open title="Inspector" description="Properties for the selection.">
  <p>Sheet body content scrolls if it overflows.</p>
</Sheet>`}>
      <Button onclick={() => (rightOpen = true)}>Right sheet</Button>
      <Sheet bind:open={rightOpen} title="Inspector" description="Properties for the selection.">
        <p style="margin:0; line-height:1.5;">Sheet body content scrolls if it overflows. Use for inspectors, settings sub-pages, contextual editors.</p>
        {#snippet footer()}
          <Button variant="ghost" onclick={() => (rightOpen = false)}>Done</Button>
        {/snippet}
      </Sheet>
    </DocExample>

    <DocExample title='side="left"' code={`<Sheet bind:open side="left" title="Navigation">…</Sheet>`}>
      <Button variant="outline" onclick={() => (leftOpen = true)}>Left sheet</Button>
      <Sheet bind:open={leftOpen} side="left" title="Navigation">
        <p style="margin:0; line-height:1.5;">Common pattern for mobile nav drawers.</p>
      </Sheet>
    </DocExample>

    <DocExample title='side="bottom"' code={`<Sheet bind:open side="bottom" size="md" title="Filters">…</Sheet>`}>
      <Button variant="ghost" onclick={() => (bottomOpen = true)}>Bottom sheet</Button>
      <Sheet bind:open={bottomOpen} side="bottom" size="md" title="Filters">
        <p style="margin:0; line-height:1.5;">Bottom-anchored sheets are popular for mobile filter / sort UI.</p>
      </Sheet>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add sheet`} />
  </DocSection>
</DocLayout>
