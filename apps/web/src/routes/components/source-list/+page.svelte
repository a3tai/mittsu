<script lang="ts">
  import SourceList from '@a3tai/mittsu-svelte5/components/source-list/source-list.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let active = $state<string>('library');

  const items = [
    {type: 'heading' as const, label: 'Library'},
    {value: 'library', label: 'All Books', count: 1204},
    {value: 'recent', label: 'Recently Added', count: 42},
    {value: 'unprocessed', label: 'Unprocessed', count: 8},
    {type: 'heading' as const, label: 'Smart Lists'},
    {value: 'fiction', label: 'Fiction', count: 612},
    {value: 'nonfiction', label: 'Non-fiction', count: 592},
    {type: 'heading' as const, label: 'Authors'},
    {value: 'turing', label: 'Alan Turing'},
    {value: 'lovelace', label: 'Ada Lovelace'},
  ];

  const props = [
    {name: 'items', type: 'SourceItem[]', description: 'Headings or selectable rows.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'onSelect', type: '(v: T) => void', description: 'Fires when a row is picked.'},
  ];
</script>

<DocLayout
  title="SourceList"
  category="macOS"
  description="Finder-style sidebar list with icons / labels / counts and grouped headings. The classic macOS sidebar pattern."
>
  <DocSection title="Examples">
    <DocExample title="Library + Smart lists" code={`<SourceList items={[
  {type: 'heading', label: 'Library'},
  {value: 'library', label: 'All Books', count: 1204},
  ...
]} bind:value />`}>
      <div style="width:240px; height:340px; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden; background:var(--uin-mat-sidebar);">
        <SourceList {items} bind:value={active} />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add source-list`} />
  </DocSection>
</DocLayout>
