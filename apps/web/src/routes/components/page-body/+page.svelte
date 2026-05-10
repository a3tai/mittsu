<script lang="ts">
  import PageBody from '@a3tai/mittsu-svelte5/components/page-body/page-body.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'padded', type: 'boolean', default: 'true', description: 'Apply token-driven block padding.'},
    {name: 'children', type: 'Snippet', description: 'Page content.'},
  ];
</script>

<DocLayout
  title="PageBody"
  category="Shell"
  description="Page-level main content region; renders a <main> with optional padding. Pairs with PageHeader and PageFooter."
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<PageBody>
  <p>Page body content lives here.</p>
</PageBody>`}>
      <div style="width:100%; border:1px dashed var(--uin-line); border-radius:var(--uin-r-md);">
        <PageBody>
          <p style="margin:0; color:var(--uin-fg-mute); padding-inline:var(--uin-s-3);">Page body content lives here.</p>
        </PageBody>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add page-body`} />
  </DocSection>
</DocLayout>
