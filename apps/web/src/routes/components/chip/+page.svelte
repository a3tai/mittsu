<script lang="ts">
  import Chip from '@a3tai/mittsu-svelte5/components/chip/chip.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let formats = $state(new Set<string>(['epub']));
  function toggle(name: string) {
    const next = new Set(formats);
    if (next.has(name)) next.delete(name); else next.add(name);
    formats = next;
  }

  const props = [
    {name: 'active', type: 'boolean', default: 'false', description: 'Filled accent state when true.'},
    {name: 'count', type: 'number', description: 'Optional small count after the label.'},
    {name: 'onClick', type: '() => void', description: 'When set, renders as <button> with hover/focus chrome.'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled state for interactive chips.'},
    {name: 'ariaLabel', type: 'string', description: 'Accessible name override.'},
  ];
</script>

<DocLayout
  title="Chip"
  category="Display"
  description="Toggleable filter pill. Pressable when onClick is set; static span otherwise."
>
  <DocSection title="Examples">
    <DocExample title="Filter strip" code={`{#each [['epub', 942], ['pdf', 248], ['txt', 14]] as [name, n]}
  <Chip
    active={formats.has(name)}
    onClick={() => toggle(name)}
    count={n}
  >
    {name.toUpperCase()}
  </Chip>
{/each}`}>
      {#each [['epub', 942], ['pdf', 248], ['txt', 14]] as const as [name, n]}
        <Chip active={formats.has(name)} onClick={() => toggle(name)} count={n}>
          {name.toUpperCase()}
        </Chip>
      {/each}
    </DocExample>

    <DocExample title="Static (non-interactive)" code={`<Chip>EPUB</Chip>`}>
      <Chip>EPUB</Chip>
      <Chip count={4}>PDF</Chip>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add chip`} />
  </DocSection>
</DocLayout>
