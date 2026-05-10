<script lang="ts">
  import List from '@a3tai/mittsu-svelte5/components/list/list.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const items = [
    {label: 'Inbox', description: '12 unread'},
    {label: 'Drafts', description: '3 saved'},
    {label: 'Sent', description: 'All caught up'},
    {label: 'Archive', description: '4 months old'},
  ];

  const props = [
    {name: 'items', type: '{label, description?, onClick?, disabled?}[]', description: 'Row data.'},
    {name: 'bordered', type: 'boolean', default: 'true', description: 'Show dividers between rows.'},
    {name: 'interactive', type: 'boolean', default: 'false', description: 'Make all rows hover/clickable.'},
    {name: 'children', type: 'Snippet', description: 'Custom row content if items prop is omitted.'},
  ];
</script>

<DocLayout
  title="List"
  category="Data"
  description="Vertical row list with primary label and optional description. For tabular data with multiple columns use Table."
>
  <DocSection title="Examples">
    <DocExample title="Static" code={`<List items={[
  {label: 'Inbox', description: '12 unread'},
  ...
]} />`}>
      <div style="width:100%; max-width:480px;">
        <List {items} />
      </div>
    </DocExample>

    <DocExample title="Interactive" code={`<List interactive items={[
  {label: 'Inbox', onClick: () => navigate('/inbox')},
  ...
]} />`}>
      <div style="width:100%; max-width:480px;">
        <List
          interactive
          items={items.map((it) => ({...it, onClick: () => alert(it.label)}))}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add list`} />
  </DocSection>
</DocLayout>
