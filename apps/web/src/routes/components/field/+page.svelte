<script lang="ts">
  import Field from '@a3tai/mittsu-svelte5/components/field/field.svelte';
  import Input from '@a3tai/mittsu-svelte5/components/input/input.svelte';
  import Textarea from '@a3tai/mittsu-svelte5/components/textarea/textarea.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'label', type: 'string', description: 'Renders a Label above the control linked by id.'},
    {name: 'description', type: 'string', description: 'Helper text below the control. Hidden when error is set.'},
    {name: 'error', type: 'string', description: 'Error message; flips invalid state and replaces description.'},
    {name: 'required', type: 'boolean', default: 'false', description: 'Adds a required marker on the label.'},
    {name: 'id', type: 'string', description: 'Override auto-generated id (default: uin-field-N counter).'},
    {name: 'children', type: 'Snippet<[{id, describedBy, invalid}]>', description: 'Receives wiring args; pass them to the control.'},
  ];
</script>

<DocLayout
  title="Field"
  category="Foundation"
  description="Labeled form-field wrapper. Auto-generates an id and exposes ARIA wiring (id, aria-describedby, aria-invalid) via the children snippet."
>
  <DocSection title="Examples">
    <DocExample title="With description" code={`<Field
  label="Email"
  description="We'll only use this for password resets."
  required
>
  {#snippet children({id, describedBy})}
    <Input {id} type="email" placeholder="you@example.com" aria-describedby={describedBy} />
  {/snippet}
</Field>`}>
      <Field label="Email" description="We'll only use this for password resets." required>
        {#snippet children({id, describedBy})}
          <Input {id} type="email" placeholder="you@example.com" aria-describedby={describedBy} />
        {/snippet}
      </Field>
    </DocExample>

    <DocExample title="With error" code={`<Field label="Username" error="That username is already taken.">
  {#snippet children({id, describedBy, invalid})}
    <Input {id} value="taken-name" aria-describedby={describedBy} aria-invalid={invalid || undefined} />
  {/snippet}
</Field>`}>
      <Field label="Username" error="That username is already taken.">
        {#snippet children({id, describedBy, invalid})}
          <Input {id} value="taken-name" aria-describedby={describedBy} aria-invalid={invalid || undefined} />
        {/snippet}
      </Field>
    </DocExample>

    <DocExample title="With Textarea" code={`<Field label="Bio" description="Markdown supported. 280 char max.">
  {#snippet children({id, describedBy})}
    <Textarea {id} placeholder="Tell us about yourself" aria-describedby={describedBy} />
  {/snippet}
</Field>`}>
      <Field label="Bio" description="Markdown supported. 280 char max.">
        {#snippet children({id, describedBy})}
          <Textarea {id} placeholder="Tell us about yourself" aria-describedby={describedBy} />
        {/snippet}
      </Field>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add field`} />
  </DocSection>
</DocLayout>
