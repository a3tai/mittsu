<script lang="ts">
  import PinInput from '@a3tai/mittsu-svelte5/components/pin-input/pin-input.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let otp = $state('');
  let pin = $state('');

  const props = [
    {name: 'value', type: 'string', default: "''", description: 'Bindable string of entered characters.'},
    {name: 'length', type: 'number', default: '6', description: 'Number of slots to render.'},
    {name: 'pattern', type: "'numeric' | 'alphanumeric'", default: "'numeric'", description: 'Allowed character class.'},
    {name: 'mask', type: 'boolean', default: 'false', description: 'Use type=password to mask each slot.'},
    {name: 'autoFocus', type: 'boolean', default: 'false', description: 'Focus the first slot on mount.'},
    {name: 'onComplete', type: '(code: string) => void', description: 'Fires when all slots are filled.'},
  ];
</script>

<DocLayout
  title="PinInput"
  category="Form"
  description="Fixed-length OTP / verification code field. Auto-advance on input, backspace clears + moves back, paste fills all slots."
>
  <DocSection title="Examples">
    <DocExample title="6-digit OTP" code={`<PinInput
  bind:value={otp}
  length={6}
  onComplete={(code) => alert(code)}
/>`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-2);">
        <PinInput bind:value={otp} length={6} onComplete={(c) => alert('Code: ' + c)} />
        <span style="color:var(--uin-fg-mute); font-size:12.5px;">Value: {otp || '(empty)'}</span>
      </div>
    </DocExample>

    <DocExample title="Masked, alphanumeric" code={`<PinInput length={4} pattern="alphanumeric" mask />`}>
      <PinInput bind:value={pin} length={4} pattern="alphanumeric" mask />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add pin-input`} />
  </DocSection>
</DocLayout>
