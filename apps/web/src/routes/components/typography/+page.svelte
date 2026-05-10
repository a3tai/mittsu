<script lang="ts">
  import Typography from '@a3tai/mittsu-svelte5/components/typography/typography.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'variant', type: "'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'lead' | 'body' | 'caption' | 'eyebrow'", default: "'body'", description: 'Typographic preset.'},
    {name: 'tone', type: "'default' | 'muted' | 'dim'", default: "'default'", description: 'Text color tier (caption + eyebrow auto-mute on default).'},
    {name: 'as', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'", description: 'Override the rendered element when document outline calls for it.'},
    {name: '...rest', type: 'HTMLAttributes<HTMLElement>', description: 'Spread onto the rendered element.'},
  ];
</script>

<DocLayout
  title="Typography"
  category="Foundation"
  description="Preset typographic styles. One component, nine variants × three tones, optional element override via `as`."
>
  <DocSection title="Examples">
    <DocExample title="Variants" code={`<Typography variant="display">Display heading</Typography>
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="lead">A leading paragraph…</Typography>
<Typography variant="body">Default body text.</Typography>
<Typography variant="caption">A caption…</Typography>
<Typography variant="eyebrow">Eyebrow above heading</Typography>`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-2); width:100%;">
        <Typography variant="display">Display heading</Typography>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="lead">A leading paragraph that introduces a section.</Typography>
        <Typography variant="body">Default body text.</Typography>
        <Typography variant="caption">A caption sits below an image or chart.</Typography>
        <Typography variant="eyebrow">Eyebrow above heading</Typography>
      </div>
    </DocExample>

    <DocExample title="Tones" code={`<Typography variant="body">Default tone</Typography>
<Typography variant="body" tone="muted">Muted</Typography>
<Typography variant="body" tone="dim">Dim</Typography>`}>
      <div style="display:flex; flex-direction:column; gap:var(--uin-s-1); width:100%;">
        <Typography variant="body">Default tone</Typography>
        <Typography variant="body" tone="muted">Muted</Typography>
        <Typography variant="body" tone="dim">Dim</Typography>
      </div>
    </DocExample>

    <DocExample title="Element override" code={`<Typography variant="h2" as="h3">Visual h2 styled element h3</Typography>`}>
      <Typography variant="h2" as="h3">Visual h2 styled element h3</Typography>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add typography`} />
  </DocSection>
</DocLayout>
