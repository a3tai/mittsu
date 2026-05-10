<script lang="ts">
  import Collapsible from '@a3tai/mittsu-svelte5/components/collapsible/collapsible.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.'},
    {name: 'title', type: 'string', description: 'Trigger label.'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'Lock the trigger.'},
  ];
</script>

<DocLayout
  title="Collapsible"
  category="Shell"
  description="Single toggle-visibility container built on bits-ui. Trigger row with a chevron + body that shows/hides."
>
  <DocSection title="Examples">
    <DocExample title="Basic" code={`<Collapsible title="Show details">
  Hidden by default.
</Collapsible>`}>
      <div style="width:100%; max-width:480px;">
        <Collapsible title="Show details">
          <p style="margin:0; color:var(--uin-fg-mute); line-height:1.5;">
            This region toggles open and closed when you click the trigger above.
          </p>
        </Collapsible>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install bits-ui
npx @a3tai/mittsu add collapsible`} />
  </DocSection>
</DocLayout>
