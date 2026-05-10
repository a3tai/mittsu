<script lang="ts">
  import Switch from '@a3tai/mittsu-svelte5/components/switch/switch.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let notifications = $state(true);
  let autoUpdate = $state(false);

  const props = [
    {name: 'checked', type: 'boolean', default: 'false', description: 'Bindable on/off state. Use bind:checked.'},
    {name: 'onCheckedChange', type: '(next: boolean) => void', description: 'Controlled-pattern callback.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track / thumb dimension tier.'},
    {name: 'label', type: 'string', description: 'Accessible label (sets aria-label since the visual is icon-only).'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled state.'},
  ];
</script>

<DocLayout
  title="Switch"
  category="Form"
  description="Sliding on/off control — the macOS-Settings shape. Use for setting toggles where Toggle's button shape would feel too noisy."
>
  <DocSection title="Examples">
    <DocExample title="Default + Settings list" code={`<Switch bind:checked={notifications} label="Notifications" />
<Switch bind:checked={autoUpdate} label="Auto-update" />`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-3); width:240px;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:13px; color:var(--uin-fg);">Notifications</span>
          <Switch bind:checked={notifications} label="Notifications" />
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:13px; color:var(--uin-fg);">Auto-update</span>
          <Switch bind:checked={autoUpdate} label="Auto-update" />
        </div>
      </div>
    </DocExample>

    <DocExample title="Sizes" code={`<Switch size="sm" />
<Switch />`}>
      <Switch size="sm" />
      <Switch />
    </DocExample>

    <DocExample title="Disabled" code={`<Switch disabled />`}>
      <Switch disabled />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add switch`} />
  </DocSection>
</DocLayout>
