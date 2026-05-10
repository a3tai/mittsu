<script lang="ts">
  import SplitView from '@a3tai/mittsu-svelte5/components/split-view/split-view.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'panes', type: '{content: Snippet, defaultSize?, min?, max?}[]', description: 'Array of pane definitions.'},
    {name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Split direction.'},
  ];
</script>

<DocLayout
  title="SplitView"
  category="Shell"
  description="Multi-pane container with hairline dividers. macOS-flavored. For two panes use Resizable; SplitView is the 3+-pane variant."
>
  <DocSection title="Examples">
    <DocExample title="Three panes" code={`<SplitView panes={[
  {content: leftSnippet, defaultSize: 25},
  {content: midSnippet,  defaultSize: 50},
  {content: rightSnippet, defaultSize: 25},
]} />`}>
      <div style="height:200px; width:100%; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <SplitView
          panes={[
            {content: leftPane, defaultSize: 25},
            {content: midPane, defaultSize: 50},
            {content: rightPane, defaultSize: 25},
          ]}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add split-view`} />
  </DocSection>
</DocLayout>

{#snippet leftPane()}<div style="padding:var(--uin-s-3); height:100%; background:var(--uin-mat-row); font-size:12.5px;">Left</div>{/snippet}
{#snippet midPane()}<div style="padding:var(--uin-s-3); height:100%; background:var(--uin-mat-panel); font-size:12.5px;">Middle</div>{/snippet}
{#snippet rightPane()}<div style="padding:var(--uin-s-3); height:100%; background:var(--uin-mat-hover); font-size:12.5px;">Right</div>{/snippet}
