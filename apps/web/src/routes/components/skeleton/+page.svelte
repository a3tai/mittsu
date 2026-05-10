<script lang="ts">
  import Skeleton from '@a3tai/mittsu-svelte5/components/skeleton/skeleton.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'variant', type: "'rect' | 'text' | 'circle'", default: "'rect'", description: 'Default shape; text is a pill, circle is 1:1.'},
    {name: 'width', type: 'string', description: 'Explicit width (any CSS length).'},
    {name: 'height', type: 'string', description: 'Explicit height (any CSS length).'},
    {name: 'class', type: 'string', description: 'Extra classes; merged via cn().'},
  ];
</script>

<DocLayout
  title="Skeleton"
  category="Foundation"
  description="Pulsing placeholder block for loading states. Use one per discrete piece of pending content."
>
  <DocSection title="Examples">
    <DocExample title="Avatar + lines" code={`<div style="display:flex; gap:var(--uin-s-3); align-items:center;">
  <Skeleton variant="circle" />
  <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="40%" />
  </div>
</div>`}>
      <div style="display:flex; gap:var(--uin-s-3); align-items:center; width:100%;">
        <Skeleton variant="circle" />
        <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </DocExample>

    <DocExample title="Block" code={`<Skeleton height="120px" />`}>
      <Skeleton height="120px" />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add skeleton`} />
  </DocSection>
</DocLayout>
