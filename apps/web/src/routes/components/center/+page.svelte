<script lang="ts">
  import Center from '@a3tai/mittsu-svelte5/components/center/center.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'class', type: 'string', description: 'Extra classes; merged via cn().'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="Center"
  category="Layout"
  description="Flex container that centers its children on both axes. The smallest possible 'make this thing live in the middle' wrapper."
>
  <DocSection title="Examples">
    <DocExample title="Centered content" code={`<Center style="height:140px;">
  <Badge variant="accent">Centered</Badge>
</Center>`}>
      <Center style="height:140px; background:var(--uin-mat-hover); border-radius:var(--uin-r-sm); width:100%;">
        <Badge variant="accent">Centered</Badge>
      </Center>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add center`} />
  </DocSection>
</DocLayout>
