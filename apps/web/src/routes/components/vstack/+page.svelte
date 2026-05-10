<script lang="ts">
  import VStack from '@a3tai/mittsu-svelte5/components/vstack/vstack.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'gap', type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', default: '2', description: 'Maps to spacing tokens.'},
    {name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'align-items value.'},
    {name: 'justify', type: "'start' | 'center' | 'end' | 'between'", default: "'start'", description: 'justify-content value.'},
  ];
</script>

<DocLayout
  title="VStack"
  category="Layout"
  description="Naming-symmetric twin of HStack. Functionally identical to Stack — pick whichever convention reads better in your code."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<VStack gap={3}>
  <Badge>One</Badge>
  <Badge>Two</Badge>
  <Badge variant="accent">Three</Badge>
</VStack>`}>
      <VStack gap={3} style="background:var(--uin-mat-hover); padding:var(--uin-s-3); border-radius:var(--uin-r-sm); width:100%;">
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge variant="accent">Three</Badge>
      </VStack>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add vstack`} />
  </DocSection>
</DocLayout>
