<script lang="ts">
  import TrafficLights from '@a3tai/mittsu-svelte5/components/traffic-lights/traffic-lights.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'onClose', type: '() => void', description: 'Called when the red dot is clicked.'},
    {name: 'onMinimise', type: '() => void', description: 'Called when the yellow dot is clicked.'},
    {name: 'onZoom', type: '() => void', description: 'Called when the green dot is clicked.'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'All dots become inactive.'},
    {name: 'alwaysShowGlyphs', type: 'boolean', default: 'false', description: "Don't require hover to show the × − + glyphs."},
  ];
</script>

<DocLayout
  title="TrafficLights"
  category="macOS"
  description="macOS window controls — close (red) / minimise (yellow) / zoom (green). Wire each callback to your window manager (Tauri / Wails / Electron)."
>
  <DocSection title="Examples">
    <DocExample title="Default (hover to reveal glyphs)" code={`<TrafficLights
  onClose={() => …}
  onMinimise={() => …}
  onZoom={() => …}
/>`}>
      <TrafficLights
        onClose={() => alert('close')}
        onMinimise={() => alert('min')}
        onZoom={() => alert('zoom')}
      />
    </DocExample>

    <DocExample title="Always show glyphs" code={`<TrafficLights alwaysShowGlyphs />`}>
      <TrafficLights alwaysShowGlyphs />
    </DocExample>

    <DocExample title="Disabled" code={`<TrafficLights disabled />`}>
      <TrafficLights disabled />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add traffic-lights`} />
  </DocSection>
</DocLayout>
