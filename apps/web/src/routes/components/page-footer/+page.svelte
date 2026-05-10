<script lang="ts">
  import PageFooter from '@a3tai/mittsu-svelte5/components/page-footer/page-footer.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'children', type: 'Snippet', description: 'Footer content — typically copyright, links, or footnotes.'},
  ];
</script>

<DocLayout
  title="PageFooter"
  category="Shell"
  description="Page-level footer with bordered top, muted small text. Pairs with PageHeader and PageBody."
>
  <DocSection title="Examples">
    <DocExample title="With links" code={`<PageFooter>
  <span>© 2026 a3tai</span>
  <span>Built with Svelte 5</span>
</PageFooter>`}>
      <div style="width:100%;">
        <PageFooter>
          <span>© 2026 a3tai</span>
          <span>Built with Svelte 5</span>
        </PageFooter>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add page-footer`} />
  </DocSection>
</DocLayout>
