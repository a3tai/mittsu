<script lang="ts">
  import VirtualList from '@a3tai/mittsu-svelte5/components/virtual-list/virtual-list.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const items = Array.from({length: 10000}, (_, i) => ({
    id: i,
    label: `Row ${i + 1}`,
    meta: `id-${i.toString().padStart(5, '0')}`,
  }));

  const props = [
    {name: 'items', type: 'T[]', description: 'Full dataset; only the visible window is rendered.'},
    {name: 'itemHeight', type: 'number', description: 'Fixed row height in px.'},
    {name: 'height', type: 'string', default: "'320px'", description: 'Viewport height.'},
    {name: 'overscan', type: 'number', default: '3', description: 'Extra rows above/below viewport.'},
    {name: 'item', type: 'Snippet<[T, index]>', description: 'Per-row renderer.'},
  ];
</script>

<DocLayout
  title="VirtualList"
  category="Data"
  description="Windowed list for huge datasets — renders only the visible slice. Fixed item height; for variable-height virtualisation, fork and adapt."
>
  <DocSection title="Examples">
    <DocExample title="10,000 rows, 36px each" code={`<VirtualList items={items} itemHeight={36} height="240px">
  {#snippet item(it)}
    <div>{it.label}</div>
  {/snippet}
</VirtualList>`}>
      <div style="width:100%; max-width:480px; border:1px solid var(--uin-line); border-radius:var(--uin-r-md);">
        <VirtualList {items} itemHeight={36} height="240px">
          {#snippet item(it)}
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding-inline:var(--uin-s-3); border-bottom:1px solid var(--uin-line); font-size:12.5px;">
              <span>{it.label}</span>
              <span style="color:var(--uin-fg-mute); font-family:var(--uin-font-mono); font-size:11px;">{it.meta}</span>
            </div>
          {/snippet}
        </VirtualList>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add virtual-list`} />
  </DocSection>
</DocLayout>
