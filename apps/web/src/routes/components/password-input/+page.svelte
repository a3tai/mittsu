<script lang="ts">
  import PasswordInput from '@a3tai/mittsu-svelte5/components/password-input/password-input.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let pw = $state('');

  const props = [
    {name: 'value', type: 'string', default: "''", description: 'Bindable password string.'},
    {name: 'showShowToggle', type: 'boolean', default: 'true', description: 'Show the eye icon toggle in the trailing slot.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Pass-through to Input.'},
    {name: '...rest', type: 'HTMLInputAttributes', description: 'Spread onto the underlying <input>.'},
  ];
</script>

<DocLayout
  title="PasswordInput"
  category="Form"
  description="Input with a show / hide eye toggle in the trailing slot. Default state is masked."
>
  <DocSection title="Examples">
    <DocExample title="With show toggle" code={`<PasswordInput bind:value={pw} placeholder="Password" />`}>
      <div style="width:280px;"><PasswordInput bind:value={pw} placeholder="Password" /></div>
    </DocExample>

    <DocExample title="Without toggle" code={`<PasswordInput showShowToggle={false} placeholder="Locked" />`}>
      <div style="width:280px;"><PasswordInput showShowToggle={false} placeholder="Locked" /></div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add password-input`} />
  </DocSection>
</DocLayout>
