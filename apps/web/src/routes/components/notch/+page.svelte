<script lang="ts">
  import Notch from '@a3tai/mittsu-svelte5/components/notch/notch.svelte';
  import Lamp from '@a3tai/mittsu-svelte5/components/lamp/lamp.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Bold title text.'},
    {name: 'subtitle', type: 'string', description: 'Smaller subtitle below the title.'},
    {name: 'leading', type: 'Snippet', description: 'Left-side slot — typically an icon or Lamp.'},
    {name: 'trailing', type: 'Snippet', description: 'Right-side slot — actions, badges, etc.'},
  ];
</script>

<DocLayout
  title="Notch"
  category="macOS"
  description="Frosted-material section header with leading / trailing slots. macOS-native by default — wrap in position:sticky for stick-on-scroll behavior."
>
  <DocSection title="Examples">
    <DocExample title="Header bar" code={`<Notch title="Library" subtitle="3,204 books · 47 authors">
  {#snippet leading()}<Lamp state="running" />{/snippet}
  {#snippet trailing()}<Badge variant="accent">Live</Badge>{/snippet}
</Notch>`}>
      <Card padding={false} style="width:100%;">
        <Notch title="Library" subtitle="3,204 books · 47 authors">
          {#snippet leading()}<Lamp state="running" />{/snippet}
          {#snippet trailing()}<Badge variant="accent">Live</Badge>{/snippet}
        </Notch>
        <div style="padding:var(--uin-s-3); color:var(--uin-fg-mute); font-size:13px;">Body content sits below the notch.</div>
      </Card>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add notch`} />
  </DocSection>
</DocLayout>
