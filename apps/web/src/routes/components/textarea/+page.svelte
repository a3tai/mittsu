<script lang="ts">
  import Textarea from '@a3tai/mittsu-svelte5/components/textarea/textarea.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let bio = $state('');

  const props = [
    {name: 'value', type: 'string', default: "''", description: 'Bindable text. Use bind:value.'},
    {name: 'autoResize', type: 'boolean', default: 'false', description: 'Grow vertically as content overflows.'},
    {name: 'minRows', type: 'number', default: '3', description: 'Minimum height in lines (auto-resize floor).'},
    {name: 'maxRows', type: 'number', default: '12', description: 'Maximum height in lines before scrolling kicks in.'},
    {name: '...rest', type: 'HTMLTextareaAttributes', description: 'Spread onto the underlying <textarea>.'},
  ];
</script>

<DocLayout
  title="Textarea"
  category="Foundation"
  description="Multi-line text input. Mirrors Input's chrome and adds optional autoResize."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<Textarea bind:value placeholder="Tell us about yourself…" />`}>
      <Textarea bind:value={bio} placeholder="Tell us about yourself…" />
    </DocExample>

    <DocExample title="Auto-resize" code={`<Textarea autoResize bind:value placeholder="Auto-resizes as you type." />`}>
      <Textarea autoResize placeholder="Auto-resizes as you type." />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add textarea`} />
  </DocSection>
</DocLayout>
