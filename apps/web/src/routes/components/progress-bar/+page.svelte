<script lang="ts">
  import ProgressBar from '@a3tai/mittsu-svelte5/components/progress-bar/progress-bar.svelte';
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let progress = $state(0.42);

  const props = [
    {name: 'value', type: 'number', default: '0', description: 'Current value (0..max).'},
    {name: 'max', type: 'number', default: '1', description: 'Maximum value.'},
    {name: 'indeterminate', type: 'boolean', default: 'false', description: 'Render the looping indeterminate variant.'},
    {name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height.'},
    {name: 'label', type: 'string', description: 'Accessible label for screen readers.'},
  ];
</script>

<DocLayout
  title="ProgressBar"
  category="Display"
  description="Determinate or indeterminate progress. Pass a value for determinate; set indeterminate for the looping variant."
>
  <DocSection title="Examples">
    <DocExample title="Determinate" code={`<ProgressBar value={0.42} />
<ProgressBar value={0.42} size="lg" />`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-3); width:100%;">
        <ProgressBar value={progress} />
        <ProgressBar value={progress} size="lg" />
        <div style="display:flex; align-items:center; gap:var(--uin-s-2);">
          <Button size="sm" onclick={() => (progress = Math.max(0, progress - 0.1))}>−10%</Button>
          <Button size="sm" onclick={() => (progress = Math.min(1, progress + 0.1))}>+10%</Button>
          <span style="color:var(--uin-fg-mute); font-size:12.5px;">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </DocExample>

    <DocExample title="Indeterminate" code={`<ProgressBar indeterminate size="lg" />`}>
      <div style="width:100%;"><ProgressBar indeterminate size="lg" /></div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add progress-bar`} />
  </DocSection>
</DocLayout>
