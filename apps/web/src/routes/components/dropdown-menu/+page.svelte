<script lang="ts">
  import DropdownMenu from '@a3tai/mittsu-svelte5/components/dropdown-menu/dropdown-menu.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {toast} from '@a3tai/mittsu-svelte5/components/toast/toast.svelte.js';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const items = [
    {label: 'Edit', shortcut: '⌘E', onSelect: () => toast({title: 'Edit'})},
    {label: 'Duplicate', shortcut: '⌘D', onSelect: () => toast({title: 'Duplicate'})},
    {type: 'separator' as const},
    {type: 'label' as const, label: 'More'},
    {label: 'Export', onSelect: () => toast({title: 'Export'})},
    {label: 'Archive', onSelect: () => toast({title: 'Archive'})},
    {type: 'separator' as const},
    {label: 'Delete', tone: 'danger' as const, onSelect: () => toast.error({title: 'Deleted'})},
  ];

  const props = [
    {name: 'items', type: 'MenuItem[]', description: 'Array of items, separators, or label rows. See type below.'},
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.'},
    {name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Where to anchor the menu.'},
    {name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Cross-axis alignment.'},
    {name: 'trigger', type: 'Snippet', description: 'The element that opens the menu when clicked.'},
  ];

  const itemType = `type MenuItem =
  | { label: string; shortcut?: string; disabled?: boolean; tone?: 'default' | 'danger'; onSelect?: () => void }
  | { type: 'separator' }
  | { type: 'label'; label: string };`;
</script>

<DocLayout
  title="DropdownMenu"
  category="Overlay"
  description="Pop-up menu of actions. Items are declared as data — no nested subcomponents — for a compact registry surface that covers the 90% case."
>
  <DocSection title="Examples">
    <DocExample title="Basic" code={`<DropdownMenu items={[
  {label: 'Edit', shortcut: '⌘E', onSelect: () => …},
  {label: 'Duplicate', shortcut: '⌘D', onSelect: () => …},
  {type: 'separator'},
  {label: 'Delete', tone: 'danger', onSelect: () => …},
]}>
  {#snippet trigger(props)}
    <Button {...props}>Actions</Button>
  {/snippet}
</DropdownMenu>`}>
      <DropdownMenu {items}>
        {#snippet trigger(props)}
          <Button {...props}>Actions</Button>
        {/snippet}
      </DropdownMenu>
    </DocExample>
  </DocSection>

  <DocSection title="MenuItem type">
    <DocCode code={itemType} />
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add dropdown-menu`} />
  </DocSection>
</DocLayout>
