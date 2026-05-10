<script lang="ts">
  import Table from '@a3tai/mittsu-svelte5/components/table/table.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let sort = $state<{key: string; dir: 'asc' | 'desc'} | undefined>(undefined);

  const columns = [
    {key: 'title', label: 'Title', sortable: true},
    {key: 'author', label: 'Author', sortable: true},
    {key: 'pages', label: 'Pages', align: 'right' as const, sortable: true, width: '100px'},
  ];

  const rows = [
    {title: 'The Selfish Gene', author: 'Dawkins', pages: 360},
    {title: 'Gödel, Escher, Bach', author: 'Hofstadter', pages: 777},
    {title: 'Thinking, Fast and Slow', author: 'Kahneman', pages: 499},
    {title: 'The Code Book', author: 'Singh', pages: 432},
  ];

  const props = [
    {name: 'columns', type: '{key, label, align?, width?, sortable?}[]', description: 'Column definitions.'},
    {name: 'rows', type: 'Record<string, unknown>[]', description: 'Row data (looked up by column key).'},
    {name: 'sort', type: '{key, dir} | undefined', description: 'Bindable sort state.'},
    {name: 'striped', type: 'boolean', default: 'false', description: 'Zebra rows.'},
    {name: 'hoverable', type: 'boolean', default: 'true', description: 'Highlight on hover.'},
    {name: 'density', type: "'compact' | 'comfortable'", default: "'comfortable'", description: 'Cell padding tier.'},
  ];
</script>

<DocLayout
  title="Table"
  category="Data"
  description="Data-driven HTML table with sticky header, sortable columns, and striping options. For richer interactions use DataTable (later wave)."
>
  <DocSection title="Examples">
    <DocExample title="Sortable" code={`<Table
  columns={[
    {key: 'title', label: 'Title', sortable: true},
    {key: 'author', label: 'Author', sortable: true},
    {key: 'pages', label: 'Pages', align: 'right', sortable: true},
  ]}
  rows={books}
  bind:sort
  striped
/>`}>
      <div style="width:100%;">
        <Table {columns} {rows} bind:sort striped />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add table`} />
  </DocSection>
</DocLayout>
