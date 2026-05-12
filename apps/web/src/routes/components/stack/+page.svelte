<script lang="ts">
  import Stack from '@a3tai/mittsu-svelte5/components/stack/stack.svelte';
  import Badge from '@a3tai/mittsu-svelte5/components/badge/badge.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', default: '2', description: 'Maps to 0 or spacing tokens --uin-s-1 through --uin-s-8.'},
    {name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'align-items value for the flex column.'},
    {name: 'justify', type: "'start' | 'center' | 'end' | 'between'", default: "'start'", description: 'justify-content value.'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="Stack"
  category="Layout"
  description="Vertical flex column with token-driven gap, align, and justify. The default Wave-1 layout primitive."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<Stack>
  <Badge>One</Badge>
  <Badge>Two</Badge>
  <Badge>Three</Badge>
</Stack>`}>
      <Stack>
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </Stack>
    </DocExample>

    <DocExample title="Custom gap" code={`<Stack gap={5}>…</Stack>`}>
      <Stack gap={5}>
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </Stack>
    </DocExample>

    <DocExample title='align="center"' code={`<Stack gap={3} align="center">…</Stack>`}>
      <Stack gap={3} align="center">
        <Badge>One</Badge>
        <Badge variant="accent">Two</Badge>
        <Badge>Three</Badge>
      </Stack>
    </DocExample>

    <DocExample title='justify="between"' code={`<Stack gap={2} justify="between" style="height:120px;">…</Stack>`}>
      <Stack gap={2} justify="between" style="height:120px;">
        <Badge>Top</Badge>
        <Badge>Middle</Badge>
        <Badge>Bottom</Badge>
      </Stack>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add stack`} />
  </DocSection>
</DocLayout>
