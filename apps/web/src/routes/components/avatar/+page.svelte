<script lang="ts">
  import Avatar from '@a3tai/mittsu-svelte5/components/avatar/avatar.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'src', type: 'string', description: 'Image URL. Falls back to initials on error.'},
    {name: 'alt', type: 'string', description: 'Image alt text (also used as accessible name).'},
    {name: 'name', type: 'string', description: 'Full name; first letter is used for the fallback if no initials given.'},
    {name: 'initials', type: 'string', description: 'Explicit fallback text (overrides name-derived).'},
    {name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Diameter — 20 / 24 / 32 / 40 / 56 px.'},
  ];
</script>

<DocLayout
  title="Avatar"
  category="Foundation"
  description="Circular user image with initials fallback. Falls back automatically when the image fails to load."
>
  <DocSection title="Examples">
    <DocExample title="Sizes" code={`<Avatar size="xs" name="Ada Lovelace" />
<Avatar size="sm" name="Alan Turing" />
<Avatar size="md" name="Grace Hopper" />
<Avatar size="lg" name="Donald Knuth" />
<Avatar size="xl" initials="JS" />`}>
      <Avatar size="xs" name="Ada Lovelace" />
      <Avatar size="sm" name="Alan Turing" />
      <Avatar size="md" name="Grace Hopper" />
      <Avatar size="lg" name="Donald Knuth" />
      <Avatar size="xl" initials="JS" />
    </DocExample>

    <DocExample title="Image fallback" description="A broken image src falls back to initials." code={`<Avatar size="lg" src="https://broken.example/missing.png" name="Rachel Carson" />`}>
      <Avatar size="lg" src="https://broken.example/missing.png" name="Rachel Carson" />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add avatar`} />
  </DocSection>
</DocLayout>
