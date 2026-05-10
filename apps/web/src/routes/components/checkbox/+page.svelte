<script lang="ts">
  import Checkbox from '@a3tai/mittsu-svelte5/components/checkbox/checkbox.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let agree = $state(false);
  let news = $state(true);

  const props = [
    {name: 'checked', type: 'boolean', default: 'false', description: 'Bindable boolean state.'},
    {name: 'indeterminate', type: 'boolean', default: 'false', description: 'Mixed-state visual (horizontal bar instead of checkmark).'},
    {name: 'label', type: 'string', description: 'Inline caption next to the box.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Box dimension tier.'},
    {name: '...rest', type: 'HTMLInputAttributes', description: 'Spread onto the hidden native <input>.'},
  ];
</script>

<DocLayout
  title="Checkbox"
  category="Form"
  description="Boolean form control. Native checkbox under the hood — keyboard focus, form submission, and accessibility come for free."
>
  <DocSection title="Examples">
    <DocExample title="With labels" code={`<Checkbox bind:checked={agree} label="I agree to the terms" />
<Checkbox bind:checked={news} label="Send me product updates" />`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-2);">
        <Checkbox bind:checked={agree} label="I agree to the terms" />
        <Checkbox bind:checked={news} label="Send me product updates" />
      </div>
    </DocExample>

    <DocExample title="Indeterminate (select-all row)" code={`<Checkbox indeterminate label="3 of 7 selected" />`}>
      <Checkbox indeterminate label="3 of 7 selected" />
    </DocExample>

    <DocExample title="Disabled" code={`<Checkbox disabled label="Disabled" />`}>
      <Checkbox disabled label="Disabled" />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add checkbox`} />
  </DocSection>
</DocLayout>
