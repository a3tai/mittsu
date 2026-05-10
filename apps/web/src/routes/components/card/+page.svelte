<script lang="ts">
  import Card from '@a3tai/mittsu-svelte5/components/card/card.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'variant', type: "'flat' | 'tinted'", default: "'flat'", description: 'Flat is neutral; tinted adds an accent gradient wash.'},
    {name: 'padding', type: 'boolean', default: 'true', description: 'Set to false when the card contains its own padded sections.'},
    {name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Spread onto the underlying <div>.'},
  ];
</script>

<DocLayout
  title="Card"
  category="Foundation"
  description="Generic surface — the atom most other UI sits on top of when it needs to read as an enclosed thing."
>
  <DocSection title="Examples">
    <DocExample title="Flat (default)" code={`<Card>
  <strong>Flat card</strong>
  <p>Default surface for any panel boundary.</p>
</Card>`}>
      <Card>
        <strong>Flat card</strong>
        <p style="margin: 4px 0 0;">Default surface for any panel boundary.</p>
      </Card>
    </DocExample>

    <DocExample title="Tinted" code={`<Card variant="tinted">
  <strong>Tinted card</strong>
  <p>Soft accent gradient for primary-action regions.</p>
</Card>`}>
      <Card variant="tinted">
        <strong>Tinted card</strong>
        <p style="margin: 4px 0 0;">Soft accent gradient for primary-action regions.</p>
      </Card>
    </DocExample>

    <DocExample title="Padding off" code={`<Card padding={false}>
  <div style="padding: var(--uin-s-3);">Bring your own padding.</div>
</Card>`}>
      <Card padding={false}>
        <div style="padding: var(--uin-s-3);">Bring your own padding.</div>
      </Card>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add card`} />
  </DocSection>
</DocLayout>
