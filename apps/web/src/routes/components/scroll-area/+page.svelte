<script lang="ts">
  import ScrollArea from '@a3tai/mittsu-svelte5/components/scroll-area/scroll-area.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'maxHeight', type: 'string', description: 'Cap on the content height (any CSS length).'},
    {name: 'axis', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Which overflow axis to enable.'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];

  const rows = Array.from({length: 20}, (_, i) => i + 1);
</script>

<DocLayout
  title="ScrollArea"
  category="Layout"
  description="Overflow container with native-feel styled scrollbars. Pure-CSS — no JS deps."
>
  <DocSection title="Examples">
    <DocExample title="Vertical with maxHeight" code={`<ScrollArea maxHeight="180px">
  {#each rows as i}
    <p>Row {i}</p>
  {/each}
</ScrollArea>`}>
      <Card padding={false} style="width:100%;">
        <ScrollArea maxHeight="180px" style="padding:var(--uin-s-3);">
          {#each rows as i}
            <p style="margin:0 0 var(--uin-s-2);">Row {i}</p>
          {/each}
        </ScrollArea>
      </Card>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add scroll-area`} />
  </DocSection>
</DocLayout>
