<script lang="ts">
  import SearchInput from '@a3tai/mittsu-svelte5/components/search-input/search-input.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let q = $state('');

  const props = [
    {name: 'value', type: 'string', default: "''", description: 'Bindable search string.'},
    {name: 'showShortcut', type: 'boolean', default: 'true', description: 'Show the ⌘K hint when value is empty.'},
    {name: 'shortcutLabel', type: 'string', default: "'⌘K'", description: 'Label for the shortcut hint.'},
    {name: 'onclear', type: '() => void', description: 'Called when the × clear button is pressed.'},
    {name: '...rest', type: 'HTMLInputAttributes', description: 'Spread onto the underlying <input>.'},
  ];
</script>

<DocLayout
  title="SearchInput"
  category="Foundation"
  description="Pill search field built on Input — magnifier glyph leading, ⌘K hint or × clear button trailing."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<SearchInput bind:value placeholder="Search · try author:turing" />`}>
      <SearchInput bind:value={q} placeholder="Search · try author:turing" />
    </DocExample>

    <DocExample title="Custom shortcut" code={`<SearchInput shortcutLabel="Ctrl+F" />`}>
      <SearchInput shortcutLabel="Ctrl+F" />
    </DocExample>

    <DocExample title="Without shortcut hint" code={`<SearchInput showShortcut={false} />`}>
      <SearchInput showShortcut={false} />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add search-input`} />
  </DocSection>
</DocLayout>
