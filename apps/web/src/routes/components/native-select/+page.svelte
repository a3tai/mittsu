<script lang="ts">
  import NativeSelect from '@a3tai/mittsu-svelte5/components/native-select/native-select.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let format = $state<'epub' | 'pdf' | 'txt'>('epub');

  const props = [
    {name: 'options', type: '{value, label, disabled?}[]', description: 'Option definitions.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'placeholder', type: 'string', description: 'Disabled first option shown when no value.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Height tier.'},
    {name: '...rest', type: 'HTMLSelectAttributes', description: 'Spread onto the underlying <select>.'},
  ];
</script>

<DocLayout
  title="NativeSelect"
  category="Form"
  description="System <select> with our chrome. Use when the OS-native picker is preferred — mobile drawers, screen-reader-friendly forms, server-rendered pages without JS hydration."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<NativeSelect
  bind:value={format}
  options={[
    {value: 'epub', label: 'EPUB'},
    {value: 'pdf', label: 'PDF'},
    {value: 'txt', label: 'Plain text'},
  ]}
/>`}>
      <div style="width:200px;">
        <NativeSelect
          bind:value={format}
          options={[
            {value: 'epub', label: 'EPUB'},
            {value: 'pdf', label: 'PDF'},
            {value: 'txt', label: 'Plain text'},
          ]}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add native-select`} />
  </DocSection>
</DocLayout>
