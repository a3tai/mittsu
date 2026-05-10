<script lang="ts">
  import Toggle from '@a3tai/mittsu-svelte5/components/toggle/toggle.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let bold = $state(false);
  let italic = $state(true);

  const props = [
    {name: 'pressed', type: 'boolean', default: 'false', description: 'Bindable on/off state. Use bind:pressed.'},
    {name: 'onPressedChange', type: '(next: boolean) => void', description: 'Fires when state flips (the controlled-pattern callback).'},
    {name: 'variant', type: "'default' | 'outline'", default: "'default'", description: 'Default fills when pressed; outline always shows a border.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Compact (24) or default (30).'},
    {name: '...rest', type: 'HTMLButtonAttributes', description: 'Spread onto the underlying <button>.'},
  ];
</script>

<DocLayout
  title="Toggle"
  category="Form"
  description="Pressable button with persistent on/off state. Reach for it for modal state on a single control — bold/italic in an editor, sidebar visibility, favorite star."
>
  <DocSection title="Examples">
    <DocExample title="Standalone (bind:pressed)" code={`<Toggle bind:pressed={bold}>Bold</Toggle>
<Toggle bind:pressed={italic} variant="outline">Italic</Toggle>`}>
      <Toggle bind:pressed={bold}>Bold</Toggle>
      <Toggle bind:pressed={italic} variant="outline">Italic</Toggle>
    </DocExample>

    <DocExample title="Sizes" code={`<Toggle size="sm">Small</Toggle>
<Toggle>Default</Toggle>`}>
      <Toggle size="sm">Small</Toggle>
      <Toggle>Default</Toggle>
    </DocExample>

    <DocExample title="Disabled" code={`<Toggle disabled>Disabled</Toggle>`}>
      <Toggle disabled>Disabled</Toggle>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add toggle`} />
  </DocSection>
</DocLayout>
