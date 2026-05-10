<script lang="ts">
  import Kbd from '@a3tai/mittsu-svelte5/components/kbd/kbd.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'class', type: 'string', description: 'Extra classes; merged via cn().'},
    {name: 'children', type: 'Snippet', description: 'Glyph(s) to display inside the key cap.'},
  ];
</script>

<DocLayout
  title="Kbd"
  category="Foundation"
  description="Keyboard shortcut hint, styled like a tactile key cap. Use for ⌘K hints, menu shortcuts, tooltips."
>
  <DocSection title="Examples">
    <DocExample title="Single key" code={`<Kbd>⌘</Kbd> <Kbd>K</Kbd>`}>
      <Kbd>⌘</Kbd> <Kbd>K</Kbd>
    </DocExample>

    <DocExample title="Modifier chain" code={`<Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>P</Kbd>`}>
      <Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>P</Kbd>
    </DocExample>

    <DocExample title="Cross-platform" code={`<Kbd>Ctrl</Kbd> <Kbd>F</Kbd>`}>
      <Kbd>Ctrl</Kbd> <Kbd>F</Kbd>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add kbd`} />
  </DocSection>
</DocLayout>
