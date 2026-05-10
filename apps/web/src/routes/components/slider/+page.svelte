<script lang="ts">
  import Slider from '@a3tai/mittsu-svelte5/components/slider/slider.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let volume = $state(40);
  let opacity = $state(0.7);

  const props = [
    {name: 'value', type: 'number', default: '0', description: 'Bindable numeric value.'},
    {name: 'min', type: 'number', default: '0', description: 'Lower bound of the range.'},
    {name: 'max', type: 'number', default: '100', description: 'Upper bound of the range.'},
    {name: 'step', type: 'number', default: '1', description: 'Increment per arrow-key press / drag tick.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track + thumb dimension tier.'},
    {name: '...rest', type: 'HTMLInputAttributes', description: 'Spread onto the underlying range input.'},
  ];
</script>

<DocLayout
  title="Slider"
  category="Form"
  description="Single-thumb value picker on a continuous range. Native <input type='range'> for full keyboard support — ←/→, Home/End, PageUp/PageDown."
>
  <DocSection title="Examples">
    <DocExample title="Volume" code={`<Slider bind:value={volume} min={0} max={100} />`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-2); width:280px;">
        <Slider bind:value={volume} min={0} max={100} />
        <span style="color:var(--uin-fg-mute); font-size:12.5px;">Volume: {volume}</span>
      </div>
    </DocExample>

    <DocExample title="Fractional step" code={`<Slider bind:value={opacity} min={0} max={1} step={0.05} />`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-2); width:280px;">
        <Slider bind:value={opacity} min={0} max={1} step={0.05} />
        <span style="color:var(--uin-fg-mute); font-size:12.5px;">Opacity: {opacity.toFixed(2)}</span>
      </div>
    </DocExample>

    <DocExample title="Small" code={`<Slider size="sm" min={0} max={100} />`}>
      <div style="width:240px;"><Slider size="sm" min={0} max={100} /></div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add slider`} />
  </DocSection>
</DocLayout>
