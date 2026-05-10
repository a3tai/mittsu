<script lang="ts">
  import Resizable from '@a3tai/mittsu-svelte5/components/resizable/resizable.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let pct = $state(40);

  const props = [
    {name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Split direction.'},
    {name: 'primarySize', type: 'number', default: '50', description: 'Primary pane size in percent (bindable).'},
    {name: 'minPrimary', type: 'number', default: '10', description: 'Min primary size (percent).'},
    {name: 'maxPrimary', type: 'number', default: '90', description: 'Max primary size (percent).'},
    {name: 'primary', type: 'Snippet', description: 'Left / top pane content.'},
    {name: 'secondary', type: 'Snippet', description: 'Right / bottom pane content.'},
  ];
</script>

<DocLayout
  title="Resizable"
  category="Shell"
  description="Two-pane container with a draggable handle. Pointer-based — works with mouse, touch, pen. No headless dep."
>
  <DocSection title="Examples">
    <DocExample title="Drag the divider" code={`<Resizable bind:primarySize>
  {#snippet primary()}<div>Left</div>{/snippet}
  {#snippet secondary()}<div>Right</div>{/snippet}
</Resizable>`}>
      <div style="height:200px; width:100%; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <Resizable bind:primarySize={pct}>
          {#snippet primary()}
            <div style="height:100%; padding:var(--uin-s-3); background:var(--uin-mat-row);">
              Left ({pct.toFixed(0)}%)
            </div>
          {/snippet}
          {#snippet secondary()}
            <div style="height:100%; padding:var(--uin-s-3); background:var(--uin-mat-hover);">
              Right ({(100 - pct).toFixed(0)}%)
            </div>
          {/snippet}
        </Resizable>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add resizable`} />
  </DocSection>
</DocLayout>
