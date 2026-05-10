<script lang="ts">
  import Combobox from '@a3tai/mittsu-svelte5/components/combobox/combobox.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let framework = $state<string>('svelte');

  const frameworks = [
    {value: 'svelte', label: 'Svelte'},
    {value: 'react', label: 'React'},
    {value: 'vue', label: 'Vue'},
    {value: 'solid', label: 'Solid'},
    {value: 'qwik', label: 'Qwik'},
    {value: 'angular', label: 'Angular'},
    {value: 'lit', label: 'Lit'},
    {value: 'preact', label: 'Preact'},
    {value: 'ember', label: 'Ember'},
  ];

  const props = [
    {name: 'options', type: '{value, label, disabled?}[]', description: 'Option definitions. bits-ui filters by `label` automatically.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'onValueChange', type: '(next: T) => void', description: 'Fires when selection changes.'},
    {name: 'placeholder', type: 'string', default: "'Search…'", description: 'Search input placeholder.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Height tier.'},
    {name: 'ariaLabel', type: 'string', description: 'Accessible name override.'},
  ];
</script>

<DocLayout
  title="Combobox"
  category="Form"
  description="Typeahead select built on bits-ui's Combobox. Type to filter the list, ↑↓ to navigate, ↩ to select. bits-ui filters items by their `label` automatically."
>
  <DocSection title="Examples">
    <DocExample title="Framework picker" code={`<Combobox
  bind:value={framework}
  options={[
    {value: 'svelte', label: 'Svelte'},
    {value: 'react', label: 'React'},
    …
  ]}
  placeholder="Search frameworks…"
/>`}>
      <div style="width:280px;">
        <Combobox
          bind:value={framework}
          options={frameworks}
          placeholder="Search frameworks…"
          ariaLabel="Framework"
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add combobox`} />
  </DocSection>
</DocLayout>
