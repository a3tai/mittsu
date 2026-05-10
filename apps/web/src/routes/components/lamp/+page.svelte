<script lang="ts">
  import Lamp from '@a3tai/mittsu-svelte5/components/lamp/lamp.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'state', type: "'idle' | 'running' | 'warn' | 'fail'", default: "'idle'", description: 'Color + halo state.'},
    {name: 'size', type: 'number', default: '8', description: 'Diameter in px.'},
  ];
</script>

<DocLayout
  title="Lamp"
  category="Display"
  description="Colored status dot with halo. Pure presentational — pair with a label for assistive tech."
>
  <DocSection title="Examples">
    <DocExample title="States" code={`<Lamp state="idle" /> idle
<Lamp state="running" /> running
<Lamp state="warn" /> warn
<Lamp state="fail" /> fail`}>
      <span style="display:inline-flex; align-items:center; gap:8px; color:var(--uin-fg-mute); font-size:12.5px;"><Lamp state="idle" /> idle</span>
      <span style="display:inline-flex; align-items:center; gap:8px; color:var(--uin-fg-mute); font-size:12.5px;"><Lamp state="running" /> running</span>
      <span style="display:inline-flex; align-items:center; gap:8px; color:var(--uin-fg-mute); font-size:12.5px;"><Lamp state="warn" /> warn</span>
      <span style="display:inline-flex; align-items:center; gap:8px; color:var(--uin-fg-mute); font-size:12.5px;"><Lamp state="fail" /> fail</span>
    </DocExample>

    <DocExample title="Larger" code={`<Lamp state="running" size={14} />`}>
      <Lamp state="running" size={14} />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add lamp`} />
  </DocSection>
</DocLayout>
