<script lang="ts">
  import OutlineView from '@a3tai/mittsu-svelte5/components/outline-view/outline-view.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let selected = $state<string>('');

  const nodes = [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            {id: 'button', label: 'Button.svelte'},
            {id: 'input', label: 'Input.svelte'},
            {id: 'tabs', label: 'Tabs.svelte'},
          ],
        },
        {id: 'app', label: 'App.svelte'},
        {id: 'main', label: 'main.ts'},
      ],
    },
    {
      id: 'tests',
      label: 'tests',
      children: [
        {id: 'unit', label: 'unit'},
        {id: 'e2e', label: 'e2e'},
      ],
    },
    {id: 'package', label: 'package.json'},
    {id: 'readme', label: 'README.md'},
  ];

  const props = [
    {name: 'nodes', type: 'TreeNode[]', description: 'Recursive `{id, label, icon?, children?}`.'},
    {name: 'selectedId', type: 'string', description: 'Bindable selection.'},
    {name: 'defaultExpanded', type: 'string[]', default: '[]', description: 'IDs to expand on first render.'},
    {name: 'onSelect', type: '(id: string) => void', description: 'Fires on row click.'},
  ];
</script>

<DocLayout
  title="OutlineView"
  category="macOS"
  description="Disclosure tree (TreeView). Recursive list with chevron toggles, selection state, and Finder-style indentation."
>
  <DocSection title="Examples">
    <DocExample title="File explorer" code={`<OutlineView
  nodes={[…]}
  bind:selectedId={selected}
  defaultExpanded={['src', 'components']}
/>`}>
      <div style="width:280px; padding:var(--uin-s-2); border:1px solid var(--uin-line); border-radius:var(--uin-r-md); background:var(--uin-mat-sidebar);">
        <OutlineView
          {nodes}
          bind:selectedId={selected}
          defaultExpanded={['src', 'components']}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add outline-view`} />
  </DocSection>
</DocLayout>
