<script lang="ts">
  import Label from '@a3tai/mittsu-svelte5/components/label/label.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'tone', type: "'eyebrow' | 'strong'", default: "'eyebrow'", description: 'Eyebrow is uppercase tracked; strong is regular case.'},
    {name: 'required', type: 'boolean', default: 'false', description: 'Adds a small accent dot indicating required state.'},
    {name: 'for', type: 'string', description: 'Standard <label for> linkage to a form control id.'},
    {name: '...rest', type: 'HTMLLabelAttributes', description: 'Spread onto the underlying <label>.'},
  ];
</script>

<DocLayout
  title="Label"
  category="Foundation"
  description="Caption / eyebrow for form fields. Pair with Input, Textarea, Select, or any input-like primitive."
>
  <DocSection title="Examples">
    <DocExample title="Tones" code={`<Label tone="eyebrow">Eyebrow</Label>
<Label tone="strong">Strong</Label>`}>
      <Label tone="eyebrow">Eyebrow</Label>
      <Label tone="strong">Strong</Label>
    </DocExample>

    <DocExample title="Required" code={`<Label tone="strong" required>Required</Label>`}>
      <Label tone="strong" required>Required</Label>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add label`} />
  </DocSection>
</DocLayout>
