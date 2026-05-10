<script lang="ts">
  import Timeline from '@a3tai/mittsu-svelte5/components/timeline/timeline.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const events = [
    {time: '4:32 pm', title: 'Build started', tone: 'default' as const},
    {time: '4:34 pm', title: 'Tests passed', description: '247 tests, 0 failures', tone: 'success' as const},
    {time: '4:35 pm', title: 'Lint warning', description: 'Unused import in src/utils.ts', tone: 'warn' as const},
    {time: '4:38 pm', title: 'Deploy failed', description: 'API timeout — retry initiated', tone: 'danger' as const},
    {time: '4:41 pm', title: 'Deploy succeeded', tone: 'success' as const},
  ];

  const props = [
    {name: 'events', type: '{time?, title, description?, tone?}[]', description: 'Sequential events.'},
  ];
</script>

<DocLayout
  title="Timeline"
  category="Data"
  description="Vertical chronological event list. Markers tinted by tone (default / success / warn / danger). Use for activity feeds, build logs, history rails."
>
  <DocSection title="Examples">
    <DocExample title="Build log" code={`<Timeline events={[
  {time: '4:32 pm', title: 'Build started'},
  {time: '4:34 pm', title: 'Tests passed', tone: 'success'},
  ...
]} />`}>
      <div style="width:100%; max-width:480px;">
        <Timeline {events} />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add timeline`} />
  </DocSection>
</DocLayout>
