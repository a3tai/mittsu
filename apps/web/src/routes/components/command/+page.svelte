<script lang="ts">
  import Command from '@a3tai/mittsu-svelte5/components/command/command.svelte';
  import Dialog from '@a3tai/mittsu-svelte5/components/dialog/dialog.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {toast} from '@a3tai/mittsu-svelte5/components/toast/toast.svelte.js';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const items = [
    {value: 'open', label: 'Open file', kbd: '⌘O', group: 'File'},
    {value: 'save', label: 'Save', kbd: '⌘S', group: 'File'},
    {value: 'export', label: 'Export as PDF', group: 'File'},
    {value: 'cut', label: 'Cut', kbd: '⌘X', group: 'Edit'},
    {value: 'copy', label: 'Copy', kbd: '⌘C', group: 'Edit'},
    {value: 'paste', label: 'Paste', kbd: '⌘V', group: 'Edit'},
    {value: 'theme', label: 'Toggle theme', kbd: '⌘⇧T', group: 'View'},
    {value: 'logout', label: 'Sign out', group: 'Account'},
  ];

  let paletteOpen = $state(false);

  function handleSelect(v: string) {
    paletteOpen = false;
    toast({title: `Selected: ${v}`});
  }

  const props = [
    {name: 'items', type: 'CommandItem[]', description: 'List of items with optional groups, hints, kbd shortcuts.'},
    {name: 'placeholder', type: 'string', default: "'Search…'", description: 'Search input placeholder.'},
    {name: 'onSelect', type: '(value: T) => void', description: 'Fires when an item is chosen via click or Enter.'},
    {name: 'autoFocus', type: 'boolean', default: 'true', description: 'Focus the search input on mount.'},
    {name: 'emptyLabel', type: 'string', default: "'No results'", description: 'Shown when the filter yields zero items.'},
  ];

  const itemType = `type CommandItem<V extends string = string> = {
  value: V;
  label: string;
  hint?: string;
  kbd?: string;
  group?: string;
  icon?: Snippet;
  disabled?: boolean;
};`;
</script>

<DocLayout
  title="Command"
  category="Overlay"
  description="Searchable ⌘K palette. Pure Svelte — no headless dep. Mount inline (this page) or inside a Dialog for a modal palette. Keyboard nav: ↑↓ to move, ↩ to select."
>
  <DocSection title="Examples">
    <DocExample title="Inline palette" code={`<Command
  items={[
    {value: 'open', label: 'Open file', kbd: '⌘O', group: 'File'},
    {value: 'save', label: 'Save', kbd: '⌘S', group: 'File'},
    …
  ]}
  onSelect={(v) => …}
/>`}>
      <div style="width:100%; max-width:480px;">
        <Command {items} onSelect={handleSelect} autoFocus={false} />
      </div>
    </DocExample>

    <DocExample title="Inside a Dialog" code={`<Button onclick={() => open = true}>Open palette</Button>
<Dialog bind:open title="Quick actions" size="md">
  <Command items={…} onSelect={…} />
</Dialog>`}>
      <Button onclick={() => (paletteOpen = true)}>Open palette</Button>
      <Dialog bind:open={paletteOpen} title="Quick actions" size="md">
        <Command {items} onSelect={handleSelect} />
      </Dialog>
    </DocExample>
  </DocSection>

  <DocSection title="CommandItem type">
    <DocCode code={itemType} />
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add command`} />
  </DocSection>
</DocLayout>
