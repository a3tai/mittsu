<script lang="ts">
  import ContextMenu from '@a3tai/mittsu-svelte5/components/context-menu/context-menu.svelte';
  import {toast} from '@a3tai/mittsu-svelte5/components/toast/toast.svelte.js';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const items = [
    {label: 'Cut', shortcut: '⌘X', onSelect: () => toast({title: 'Cut'})},
    {label: 'Copy', shortcut: '⌘C', onSelect: () => toast({title: 'Copy'})},
    {label: 'Paste', shortcut: '⌘V', onSelect: () => toast({title: 'Paste'})},
    {type: 'separator' as const},
    {label: 'Inspect element', onSelect: () => toast({title: 'Inspect'})},
    {type: 'separator' as const},
    {label: 'Delete', tone: 'danger' as const, onSelect: () => toast.error({title: 'Deleted'})},
  ];

  const props = [
    {name: 'items', type: 'MenuItem[]', description: 'Same shape as DropdownMenu — see DropdownMenu page for the type.'},
    {name: 'children', type: 'Snippet', description: 'The target region. Right-click anywhere inside to open the menu.'},
  ];
</script>

<DocLayout
  title="ContextMenu"
  category="Overlay"
  description="Right-click pop-up menu. Wrap a region; right-clicking inside it opens the menu at the cursor. Reuses DropdownMenu's items API."
>
  <DocSection title="Examples">
    <DocExample title="Right-click target" code={`<ContextMenu items={…}>
  <div>Right-click me</div>
</ContextMenu>`}>
      <ContextMenu {items}>
        <div style="padding:var(--uin-s-5) var(--uin-s-6); border:1px dashed var(--uin-line-strong); border-radius:var(--uin-r-md); color:var(--uin-fg-mute); font-size:13px; user-select:none;">
          Right-click anywhere inside this box.
        </div>
      </ContextMenu>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add context-menu`} />
  </DocSection>
</DocLayout>
