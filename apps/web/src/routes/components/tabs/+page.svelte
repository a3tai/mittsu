<script lang="ts">
  import Tabs from '@a3tai/mittsu-svelte5/components/tabs/tabs.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let tab = $state<'books' | 'passages' | 'authors'>('books');

  const props = [
    {name: 'tabs', type: '{value, label, count?, disabled?}[]', description: 'Tab definitions. Bind by value.'},
    {name: 'value', type: 'T', description: 'Bindable selected value.'},
    {name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction.'},
    {name: 'onChange', type: '(next: T) => void', description: 'Optional change callback.'},
    {name: 'ariaLabel', type: 'string', description: 'Accessible label for the tablist.'},
  ];
</script>

<DocLayout
  title="Tabs"
  category="Navigation"
  description="Pill-style tab strip with optional counts. Vertical (default) or horizontal."
>
  <DocSection title="Examples">
    <DocExample title="Horizontal with counts" code={`<Tabs
  direction="horizontal"
  tabs={[
    {value: 'books', label: 'Books', count: 1204},
    {value: 'passages', label: 'Passages', count: 8421},
    {value: 'authors', label: 'Authors', count: 312},
  ]}
  bind:value
/>`}>
      <Tabs
        direction="horizontal"
        tabs={[
          {value: 'books', label: 'Books', count: 1204},
          {value: 'passages', label: 'Passages', count: 8421},
          {value: 'authors', label: 'Authors', count: 312},
        ]}
        bind:value={tab}
      />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add tabs`} />
  </DocSection>
</DocLayout>
