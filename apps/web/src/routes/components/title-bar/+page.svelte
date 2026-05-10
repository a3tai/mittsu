<script lang="ts">
  import TitleBar from '@a3tai/mittsu-svelte5/components/title-bar/title-bar.svelte';
  import TrafficLights from '@a3tai/mittsu-svelte5/components/traffic-lights/traffic-lights.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Centered window title.'},
    {name: 'subtitle', type: 'string', description: 'Smaller line below.'},
    {name: 'height', type: 'string', default: "'38px'", description: 'CSS length for the bar height.'},
    {name: 'leading', type: 'Snippet', description: 'Left-side island (typically TrafficLights).'},
    {name: 'trailing', type: 'Snippet', description: 'Right-side island (window-level affordances).'},
  ];
</script>

<DocLayout
  title="TitleBar"
  category="macOS"
  description="Drag region with centered title — the macOS-style window chrome. Drag-to-move via -webkit-app-region: drag; islands are no-drag."
>
  <DocSection title="Examples">
    <DocExample title="Default with TrafficLights" code={`<TitleBar title="Library" subtitle="3,204 books">
  {#snippet leading()}
    <TrafficLights onClose={…} onMinimise={…} onZoom={…} />
  {/snippet}
</TitleBar>`}>
      <div style="width:100%; border:1px solid var(--uin-line); border-radius:var(--uin-r-md); overflow:hidden;">
        <TitleBar title="Library" subtitle="3,204 books · 47 authors">
          {#snippet leading()}
            <TrafficLights
              onClose={() => alert('close')}
              onMinimise={() => alert('min')}
              onZoom={() => alert('zoom')}
            />
          {/snippet}
          {#snippet trailing()}
            <Button variant="ghost" size="sm">Share</Button>
          {/snippet}
        </TitleBar>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add title-bar`} />
  </DocSection>
</DocLayout>
