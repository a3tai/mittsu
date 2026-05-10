<script lang="ts">
  import Stepper from '@a3tai/mittsu-svelte5/components/stepper/stepper.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  let n = $state(4);

  const props = [
    {name: 'onIncrement', type: '() => void', description: 'Fires on ▲ click.'},
    {name: 'onDecrement', type: '() => void', description: 'Fires on ▼ click.'},
    {name: 'incrementDisabled', type: 'boolean', default: 'false', description: 'Disable just the up arrow (e.g. at max).'},
    {name: 'decrementDisabled', type: 'boolean', default: 'false', description: 'Disable just the down arrow (e.g. at min).'},
    {name: 'disabled', type: 'boolean', default: 'false', description: 'Disable both arrows.'},
    {name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Chassis dimension tier.'},
  ];
</script>

<DocLayout
  title="Stepper"
  category="macOS"
  description="▲▼ connected button pair for increment / decrement. Used standalone or composed inside NumberInput."
>
  <DocSection title="Examples">
    <DocExample title="Standalone counter" code={`<Stepper
  onIncrement={() => n++}
  onDecrement={() => n--}
/>`}>
      <span style="display:inline-flex; align-items:center; gap:var(--uin-s-2); font-family:var(--uin-font-mono); font-size:13px; color:var(--uin-fg);">
        Quantity: {n}
        <Stepper onIncrement={() => n++} onDecrement={() => n--} />
      </span>
    </DocExample>

    <DocExample title="Disabled bounds" code={`<Stepper
  onIncrement={...}
  onDecrement={...}
  decrementDisabled={n <= 0}
  incrementDisabled={n >= 10}
/>`}>
      <Stepper
        onIncrement={() => (n = Math.min(10, n + 1))}
        onDecrement={() => (n = Math.max(0, n - 1))}
        decrementDisabled={n <= 0}
        incrementDisabled={n >= 10}
      />
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add stepper`} />
  </DocSection>
</DocLayout>
