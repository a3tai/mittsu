<script lang="ts">
  import Button from '@a3tai/mittsu-svelte5/components/button/button.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'variant', type: "'primary' | 'ghost' | 'outline'", default: "'primary'", description: 'Visual chrome alternative.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Compact (~24px) or default (~30px).'},
    {name: 'icon', type: 'boolean', default: 'false', description: 'Square hit-target sized for a single SVG glyph; pair with aria-label.'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled state.'},
    {name: '...rest', type: 'HTMLButtonAttributes', description: 'Spread onto the underlying <button>.'},
  ];
</script>

<DocLayout
  title="Button"
  category="Foundation"
  description="Primary action element. Three variants drive the chrome, two sizes drive the height."
>
  <DocSection title="Examples">
    <DocExample title="Variants" code={`<Button>Primary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>`}>
      <Button>Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </DocExample>

    <DocExample title="Sizes" code={`<Button size="sm">Small</Button>
<Button>Default</Button>`}>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
    </DocExample>

    <DocExample title="Icon-only" code={`<Button icon aria-label="Search">⌕</Button>`}>
      <Button icon aria-label="Search">⌕</Button>
    </DocExample>

    <DocExample title="Disabled" code={`<Button disabled>Disabled</Button>`}>
      <Button disabled>Disabled</Button>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add button`} />
  </DocSection>
</DocLayout>
