<script lang="ts">
  import Separator from '@a3tai/mittsu-svelte5/components/separator/separator.svelte';
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Horizontal renders <hr>; vertical renders a 1px column.'},
    {name: 'dashed', type: 'boolean', default: 'false', description: 'Swap the solid line for a 1px dashed border.'},
    {name: 'class', type: 'string', description: 'Extra classes; merged via cn().'},
  ];
</script>

<DocLayout
  title="Separator"
  category="Foundation"
  description="Horizontal or vertical rule. Solid by default; dashed for a quieter divider inside cards."
>
  <DocSection title="Examples">
    <DocExample title="Horizontal" code={`<Card>
  above
  <Separator />
  below
  <Separator dashed />
  quieter
</Card>`}>
      <Card>
        above
        <Separator />
        below
        <Separator dashed />
        quieter
      </Card>
    </DocExample>

    <DocExample title="Vertical" code={`<div style="display:flex; align-items:center; height:24px;">
  left <Separator orientation="vertical" /> right
</div>`}>
      <div style="display:flex; align-items:center; gap:var(--uin-s-2); height:24px;">
        left <Separator orientation="vertical" /> right
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add separator`} />
  </DocSection>
</DocLayout>
