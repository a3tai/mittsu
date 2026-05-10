<script lang="ts">
  import ChartFrame from '@a3tai/mittsu-charts/components/chart-frame/chart-frame.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';

  const props = [
    {name: 'title', type: 'string', description: 'Optional chart title rendered in the figure caption.'},
    {name: 'description', type: 'string', description: 'Optional supporting copy below the title.'},
    {name: 'legend', type: 'ChartLegendItem[]', default: '[]', description: 'Legend items rendered in the header.'},
    {name: 'metrics', type: 'ChartMetric[]', default: '[]', description: 'Header metrics for interactive chart summaries.'},
    {name: 'footer', type: 'Snippet', description: 'Optional footer slot for trend copy or notes.'},
    {name: 'children', type: 'Snippet', description: 'Chart body, usually an SVG plus optional overlay tooltip.'},
  ];
</script>

<DocLayout
  title="ChartFrame"
  category="Primitives"
  description="Shared figure shell for chart title, description, metrics, legend, body, and footer. Chart components compose this rather than duplicating header chrome."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Frame with metrics and legend" code={`<ChartFrame
  title="Visitors"
  description="Showing total visitors for the last 6 weeks."
  metrics={[
    {label: 'Desktop', value: '1,749', color: 'var(--uin-chart-1)'},
    {label: 'Mobile', value: '1,351', color: 'var(--uin-chart-2)'}
  ]}
  legend={[
    {key: 'desktop', label: 'Desktop', color: 'var(--uin-chart-1)'},
    {key: 'mobile', label: 'Mobile', color: 'var(--uin-chart-2)'}
  ]}
>
  <svg>...</svg>
</ChartFrame>`}>
      <div class="chart-doc-preview">
        <ChartFrame
          title="Visitors"
          description="Showing total visitors for the last 6 weeks."
          metrics={[
            {label: 'Desktop', value: '1,749', color: 'var(--uin-chart-1)'},
            {label: 'Mobile', value: '1,351', color: 'var(--uin-chart-2)'}
          ]}
          legend={[
            {key: 'desktop', label: 'Desktop', color: 'var(--uin-chart-1)'},
            {key: 'mobile', label: 'Mobile', color: 'var(--uin-chart-2)'}
          ]}
        >
          <div class="frame-demo" aria-hidden="true">
            <span style="height: 54%;"></span>
            <span style="height: 72%;"></span>
            <span style="height: 42%;"></span>
            <span style="height: 86%;"></span>
            <span style="height: 63%;"></span>
            <span style="height: 78%;"></span>
          </div>
        </ChartFrame>
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add chart-frame --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>

<style>
  .frame-demo {
    display: flex;
    align-items: end;
    gap: 10px;
    height: 180px;
    padding: var(--uin-s-4) var(--uin-s-3) 0;
    border-top: 1px solid var(--uin-chart-grid);
  }

  .frame-demo span {
    flex: 1 1 0;
    border-radius: 8px 8px 3px 3px;
    background: linear-gradient(180deg, var(--uin-chart-1), var(--uin-chart-2));
    opacity: 0.86;
  }
</style>
