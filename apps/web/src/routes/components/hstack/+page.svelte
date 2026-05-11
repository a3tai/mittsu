<script lang="ts">
  import HStack from '@a3tai/mittsu-svelte5/components/hstack/hstack.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', default: '2', description: 'Maps to 0 or spacing tokens.'},
    {name: 'align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", default: "'center'", description: 'Horizontal layouts default to center alignment.'},
    {name: 'justify', type: "'start' | 'center' | 'end' | 'between'", default: "'start'", description: 'justify-content value.'},
    {name: 'wrap', type: 'boolean', default: 'false', description: 'Allow items to break onto multiple lines.'},
  ];
</script>

<DocLayout
  title="HStack"
  category="Layout"
  description="Horizontal flex row with token-driven gap. Default align=center because horizontal layouts almost always want vertical centering."
>
  <DocSection title="Examples">
    <DocExample title='justify="between"' code={`<HStack justify="between">
  <Badge>Left</Badge>
  <Badge variant="accent">Middle</Badge>
  <Badge>Right</Badge>
</HStack>`}>
      <HStack justify="between" style="background:var(--uin-mat-hover); padding:var(--uin-s-2); border-radius:var(--uin-r-sm); width:100%;">
        <Badge>Left</Badge>
        <Badge variant="accent">Middle</Badge>
        <Badge>Right</Badge>
      </HStack>
    </DocExample>

    <DocExample title="Wrap" code={`<HStack gap={2} wrap>
  <Badge>tag-one</Badge>
  <Badge>tag-two</Badge>
  …
</HStack>`}>
      <HStack gap={2} wrap style="background:var(--uin-mat-hover); padding:var(--uin-s-2); border-radius:var(--uin-r-sm); width:100%;">
        <Badge>tag-one</Badge>
        <Badge>tag-two</Badge>
        <Badge>tag-three</Badge>
        <Badge>tag-four</Badge>
        <Badge>tag-five</Badge>
        <Badge>tag-six</Badge>
        <Badge>tag-seven</Badge>
      </HStack>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add hstack`} />
  </DocSection>
</DocLayout>
