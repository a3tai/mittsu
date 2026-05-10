<script lang="ts">
  import StatusRow from '@a3tai/mittsu-svelte5/components/status-row/status-row.svelte';
  import Spinner from '@a3tai/mittsu-svelte5/components/spinner/spinner.svelte';
  import ProgressBar from '@a3tai/mittsu-svelte5/components/progress-bar/progress-bar.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Operation name (e.g. "Importing").'},
    {name: 'leading', type: 'Snippet', description: 'Left-side slot — typically a Spinner or Lamp.'},
    {name: 'aside', type: 'Snippet', description: 'Right-side accent slot.'},
    {name: 'bar', type: 'Snippet', description: 'Optional ProgressBar slotted between body and meta.'},
    {name: 'meta', type: 'Snippet', description: 'Optional secondary line below the body.'},
    {name: 'onClick', type: '() => void', description: 'When set, renders as <button>; otherwise a <div>.'},
  ];
</script>

<DocLayout
  title="StatusRow"
  category="Display"
  description="Compact card summarising an in-progress operation. Multiple slots for leading icon, body text, progress bar, and metadata."
>
  <DocSection title="Examples">
    <DocExample title="With progress + meta" code={`<StatusRow title="Importing" onClick={() => alert('open dialog')}>
  {#snippet leading()}<Spinner size="sm" />{/snippet}
  1,204 of 1,500 · 80%
  {#snippet bar()}<ProgressBar value={0.8} size="sm" />{/snippet}
  {#snippet meta()}Hydrating 47 in queue{/snippet}
</StatusRow>`}>
      <div style="width:100%;">
        <StatusRow title="Importing" onClick={() => alert('open dialog')}>
          {#snippet leading()}<Spinner size="sm" />{/snippet}
          1,204 of 1,500 · 80%
          {#snippet bar()}<ProgressBar value={0.8} size="sm" />{/snippet}
          {#snippet meta()}Hydrating 47 in queue{/snippet}
        </StatusRow>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add status-row`} />
  </DocSection>
</DocLayout>
