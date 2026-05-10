<script lang="ts">
  import Spacer from '@a3tai/mittsu-svelte5/components/spacer/spacer.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'class', type: 'string', description: 'Extra classes; merged via cn().'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="Spacer"
  category="Layout"
  description="Flex helper that fills remaining space. Drop one between two flex children to push them to opposite ends."
>
  <DocSection title="Examples">
    <DocExample title="Push apart" code={`<div style="display:flex; align-items:center; gap:var(--uin-s-2);">
  <Badge>Left</Badge>
  <Spacer />
  <Badge variant="accent">Right</Badge>
</div>`}>
      <div style="display:flex; align-items:center; gap:var(--uin-s-2); padding:var(--uin-s-2); background:var(--uin-mat-hover); border-radius:var(--uin-r-sm); width:100%;">
        <Badge>Left</Badge>
        <Spacer />
        <Badge variant="accent">Right</Badge>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add spacer`} />
  </DocSection>
</DocLayout>
