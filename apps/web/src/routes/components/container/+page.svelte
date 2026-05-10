<script lang="ts">
  import Container from '@a3tai/mittsu-svelte5/components/container/container.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'lg'", description: 'Max-width tier — 640 / 768 / 1024 / 1280 / none.'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="Container"
  category="Layout"
  description="Max-width content well with auto margins. Centers a column of content with a token-driven horizontal gutter."
>
  <DocSection title="Examples">
    <DocExample title="size=sm" code={`<Container size="sm">…</Container>`}>
      <Container size="sm" style="background:var(--uin-mat-hover); border-radius:var(--uin-r-sm); padding-block:var(--uin-s-3);">
        Content stays within 640px and re-centers as the viewport grows.
      </Container>
    </DocExample>

    <DocExample title="size=lg (default)" code={`<Container>…</Container>`}>
      <Container style="background:var(--uin-mat-hover); border-radius:var(--uin-r-sm); padding-block:var(--uin-s-3);">
        The default for marketing pages and docs.
      </Container>
    </DocExample>

    <DocExample title="size=full" code={`<Container size="full">…</Container>`}>
      <Container size="full" style="background:var(--uin-mat-hover); border-radius:var(--uin-r-sm); padding-block:var(--uin-s-3);">
        Full-bleed section that still keeps the gutter.
      </Container>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add container`} />
  </DocSection>
</DocLayout>
