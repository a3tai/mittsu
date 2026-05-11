<script lang="ts">
  import Flex from '@a3tai/mittsu-svelte5/components/flex/flex.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'direction', type: "'row' | 'column' | 'row-reverse' | 'column-reverse'", default: "'row'", description: 'flex-direction value.'},
    {name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', default: '2', description: 'Maps to 0 or spacing tokens.'},
    {name: 'align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", default: "'start'", description: 'align-items value.'},
    {name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", description: 'justify-content value.'},
    {name: 'wrap', type: "'nowrap' | 'wrap' | 'wrap-reverse'", default: "'nowrap'", description: 'flex-wrap value.'},
  ];
</script>

<DocLayout
  title="Flex"
  category="Layout"
  description="Generic flex container with all axes exposed. Reach for it when Stack / HStack / VStack aren't expressive enough."
>
  <DocSection title="Examples">
    <DocExample title='direction="row-reverse" wrap' code={`<Flex direction="row-reverse" wrap="wrap" gap={2}>
  <Badge>1</Badge>
  <Badge>2</Badge>
  <Badge>3</Badge>
  <Badge variant="accent">4</Badge>
</Flex>`}>
      <Flex direction="row-reverse" wrap="wrap" gap={2} style="background:var(--uin-mat-hover); padding:var(--uin-s-2); border-radius:var(--uin-r-sm); width:100%;">
        <Badge>1</Badge>
        <Badge>2</Badge>
        <Badge>3</Badge>
        <Badge variant="accent">4</Badge>
      </Flex>
    </DocExample>

    <DocExample title='justify="around"' code={`<Flex justify="around" gap={2}>…</Flex>`}>
      <Flex justify="around" gap={2} style="background:var(--uin-mat-hover); padding:var(--uin-s-2); border-radius:var(--uin-r-sm); width:100%;">
        <Badge>A</Badge>
        <Badge>B</Badge>
        <Badge>C</Badge>
      </Flex>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add flex`} />
  </DocSection>
</DocLayout>
