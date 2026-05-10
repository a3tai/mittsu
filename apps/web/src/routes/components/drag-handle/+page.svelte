<script lang="ts">
  import DragHandle from '@a3tai/mittsu-svelte5/components/drag-handle/drag-handle.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Dot grid direction.'},
  ];
</script>

<DocLayout
  title="DragHandle"
  category="Shell"
  description="Grip-dot indicator for resize / reorder targets. Pure presentational — wire up the drag/resize behavior at the parent."
>
  <DocSection title="Examples">
    <DocExample title="Vertical + horizontal" code={`<DragHandle />
<DragHandle orientation="horizontal" />`}>
      <span style="display:inline-flex; align-items:center; gap:var(--uin-s-3);">
        <DragHandle />
        <DragHandle orientation="horizontal" />
      </span>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add drag-handle`} />
  </DocSection>
</DocLayout>
