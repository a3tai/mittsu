<script lang="ts">
  import Accordion from '@a3tai/mittsu-svelte5/components/accordion/accordion.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let single = $state<string>('a');
  let multi = $state<string[]>(['a']);

  const items = [
    {value: 'a', title: 'What is @a3tai/mittsu?', content: 'A native-feel Svelte 5 component library distributed by CLI — copy into your project, fork freely.'},
    {value: 'b', title: 'How is it different from shadcn?', content: 'Same copy-and-own model, tuned for macOS / iOS aesthetics. Tokens via CSS variables; chrome via BEM classes.'},
    {value: 'c', title: 'Does it support React?', content: 'Svelte 5 first; React + Vue ports planned for later waves.'},
  ];

  const props = [
    {name: 'items', type: '{value, title, content, disabled?}[]', description: 'Array of accordion items.'},
    {name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or many items can be open.'},
    {name: 'value', type: 'T | T[]', description: 'Bindable open state (string for single, string[] for multiple).'},
  ];
</script>

<DocLayout
  title="Accordion"
  category="Shell"
  description="Vertical stack of collapsible items. type='single' is radio-like; type='multiple' lets several open at once."
>
  <DocSection title="Examples">
    <DocExample title="Single (FAQ-style)" code={`<Accordion bind:value items={[...]} />`}>
      <div style="width:100%; max-width:560px;">
        <Accordion bind:value={single} {items} />
      </div>
    </DocExample>

    <DocExample title="Multiple" code={`<Accordion type="multiple" bind:value items={[...]} />`}>
      <div style="width:100%; max-width:560px;">
        <Accordion type="multiple" bind:value={multi} {items} />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add accordion`} />
  </DocSection>
</DocLayout>
