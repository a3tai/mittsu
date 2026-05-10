<script lang="ts">
  import Box from '@a3tai/mittsu-svelte5/components/box/box.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'pad', type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', description: 'Padding token (--uin-s-N).'},
    {name: 'radius', type: "'sm' | 'md' | 'lg' | 'xl'", description: 'Border-radius token (--uin-r-X).'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="Box"
  category="Layout"
  description="Generic <div> wrapper with token-driven padding and radius shortcuts. The unstyled foundation."
>
  <DocSection title="Examples">
    <DocExample title="Padding + radius" code={`<Box pad={2} radius="sm">…</Box>
<Box pad={4} radius="md">…</Box>
<Box pad={6} radius="lg">…</Box>`}>
      <Box pad={2} radius="sm" style="background:var(--uin-mat-hover);">pad=2 r=sm</Box>
      <Box pad={4} radius="md" style="background:var(--uin-mat-hover);">pad=4 r=md</Box>
      <Box pad={6} radius="lg" style="background:var(--uin-mat-hover);">pad=6 r=lg</Box>
    </DocExample>

    <DocExample title="Accented" code={`<Box pad={3} radius="xl" style="background:var(--uin-mat-selected);">accented</Box>`}>
      <Box pad={3} radius="xl" style="background:var(--uin-mat-selected);">accented</Box>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add box`} />
  </DocSection>
</DocLayout>
