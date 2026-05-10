<script lang="ts">
  import Dialog from '@a3tai/mittsu-svelte5/components/dialog/dialog.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let basicOpen = $state(false);
  let footerOpen = $state(false);
  let largeOpen = $state(false);

  const props = [
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state. Use bind:open or set + listen to onOpenChange.'},
    {name: 'title', type: 'string', description: 'Heading rendered with the display font.'},
    {name: 'description', type: 'string', description: 'Optional muted line below the title.'},
    {name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Max-width tier — 400 / 480 / 640.'},
    {name: 'onOpenChange', type: '(open: boolean) => void', description: 'Fires whenever the dialog opens or closes.'},
    {name: 'footer', type: 'Snippet', description: 'Optional bottom action row.'},
    {name: 'children', type: 'Snippet', description: 'Body content.'},
  ];
</script>

<DocLayout
  title="Dialog"
  category="Overlay"
  description="Modal overlay built on bits-ui — focus trap, ESC, click-outside, portal mount, scroll lock all handled. Bind open and the consumer drives visibility."
>
  <DocSection title="Examples">
    <DocExample title="Basic" code={`<Button onclick={() => open = true}>Open dialog</Button>
<Dialog bind:open title="Hello" description="A simple modal.">
  <p>Body content goes here.</p>
</Dialog>`}>
      <Button onclick={() => (basicOpen = true)}>Open dialog</Button>
      <Dialog bind:open={basicOpen} title="Hello" description="A simple modal — try ESC to close.">
        <p style="margin:0; line-height:1.5;">Body content goes here. Tab cycles focus inside the dialog; ESC dismisses; clicking the overlay closes it.</p>
      </Dialog>
    </DocExample>

    <DocExample title="With footer" code={`<Dialog bind:open title="Save changes?" description="Your work will be saved to the cloud.">
  <p>Body…</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => open = false}>Cancel</Button>
    <Button onclick={() => open = false}>Save</Button>
  {/snippet}
</Dialog>`}>
      <Button onclick={() => (footerOpen = true)}>With footer</Button>
      <Dialog
        bind:open={footerOpen}
        title="Save changes?"
        description="Your work will be saved to the cloud."
      >
        <p style="margin:0; line-height:1.5;">Confirm to publish; cancel to keep editing.</p>
        {#snippet footer()}
          <Button variant="ghost" onclick={() => (footerOpen = false)}>Cancel</Button>
          <Button onclick={() => (footerOpen = false)}>Save</Button>
        {/snippet}
      </Dialog>
    </DocExample>

    <DocExample title='size="lg"' code={`<Dialog bind:open size="lg" title="Wide dialog">…</Dialog>`}>
      <Button onclick={() => (largeOpen = true)}>Open lg</Button>
      <Dialog bind:open={largeOpen} size="lg" title="Wide dialog" description="Up to 640px.">
        <p style="margin:0; line-height:1.5;">More room for forms, tables, or step-through flows.</p>
      </Dialog>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add dialog`} />
  </DocSection>
</DocLayout>
