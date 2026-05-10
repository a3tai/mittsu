<script lang="ts">
  import AspectRatio from '@a3tai/mittsu-svelte5/components/aspect-ratio/aspect-ratio.svelte';
  import Center from '@a3tai/mittsu-svelte5/components/center/center.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'ratio', type: 'number', default: '16 / 9', description: 'width:height ratio. Common picks: 16/9, 4/3, 1, 3/2.'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="AspectRatio"
  category="Layout"
  description="Locks a child block to a fixed width:height ratio. Wraps the CSS aspect-ratio property."
>
  <DocSection title="Examples">
    <DocExample title="16 / 9" code={`<AspectRatio ratio={16/9}>…</AspectRatio>`}>
      <AspectRatio ratio={16/9} style="background:var(--uin-mat-hover); border-radius:var(--uin-r-sm); width:100%;">
        <Center>16 / 9</Center>
      </AspectRatio>
    </DocExample>

    <DocExample title="1:1" code={`<AspectRatio ratio={1}>…</AspectRatio>`}>
      <AspectRatio ratio={1} style="background:var(--uin-mat-selected); border-radius:var(--uin-r-sm); max-width:200px;">
        <Center>1 / 1</Center>
      </AspectRatio>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add aspect-ratio`} />
  </DocSection>
</DocLayout>
