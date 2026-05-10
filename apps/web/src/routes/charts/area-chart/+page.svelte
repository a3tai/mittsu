<script lang="ts">
  import AreaChart from '@a3tai/mittsu-charts/components/area-chart/area-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {areaMix, compact, traffic} from '$lib/docs/charts';

  const props = [
    {name: 'data', type: 'ChartDatum[]', description: 'Rows to plot. Each row must include the xKey and every series key.'},
    {name: 'series', type: 'ChartSeries[]', description: 'Series config with key, label, color, icon, and unit metadata.'},
    {name: 'xKey', type: 'string', default: "'x'", description: 'Field used for the x-axis value.'},
    {name: 'curve', type: "'linear' | 'monotone' | 'step'", default: "'monotone'", description: 'D3 curve interpolation for the area and top line.'},
    {name: 'stacked', type: 'boolean', default: 'false', description: 'Stack series on top of each other.'},
    {name: 'expanded', type: 'boolean', default: 'false', description: 'Render a 100% stacked area chart.'},
    {name: 'metrics', type: 'ChartMetric[]', default: '[]', description: 'Optional header metrics rendered by ChartFrame.'},
  ];
</script>

<DocLayout
  title="AreaChart"
  category="Cartesian"
  description="Area chart for time, numeric, or categorical x-values. Supports basic fills, stepped curves, stacked totals, and 100% expanded comparisons."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Interactive" code={`<AreaChart
  title="Area Chart - Interactive"
  xKey="date"
  data={traffic}
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'}
  ]}
  metrics={[
    {label: 'Desktop', value: '1,749', color: 'var(--uin-chart-1)'},
    {label: 'Mobile', value: '1,351', color: 'var(--uin-chart-2)'}
  ]}
/>`}>
      <div class="chart-doc-preview chart-doc-preview-wide">
        <AreaChart
          title="Area Chart - Interactive"
          description="Showing total visitors for the last 6 weeks."
          xKey="date"
          data={traffic}
          series={[
            {key: 'desktop', label: 'Desktop'},
            {key: 'mobile', label: 'Mobile'}
          ]}
          metrics={[
            {label: 'Desktop', value: '1,749', color: 'var(--uin-chart-1)'},
            {label: 'Mobile', value: '1,351', color: 'var(--uin-chart-2)'}
          ]}
          showPoints
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Stacked" code={`<AreaChart
  title="Area Chart - Stacked"
  xKey="month"
  data={areaMix}
  stacked
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'},
    {key: 'tablet', label: 'Tablet'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <AreaChart
          title="Area Chart - Stacked"
          description="Multiple series stacked on a shared baseline."
          xKey="month"
          data={areaMix}
          stacked
          series={[
            {key: 'desktop', label: 'Desktop'},
            {key: 'mobile', label: 'Mobile'},
            {key: 'tablet', label: 'Tablet'}
          ]}
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Expanded" code={`<AreaChart
  title="Area Chart - Expanded"
  xKey="month"
  data={areaMix}
  expanded
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'},
    {key: 'tablet', label: 'Tablet'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <AreaChart
          title="Area Chart - Expanded"
          description="100% stacked area for share over time."
          xKey="month"
          data={areaMix}
          expanded
          series={[
            {key: 'desktop', label: 'Desktop'},
            {key: 'mobile', label: 'Mobile'},
            {key: 'tablet', label: 'Tablet'}
          ]}
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install d3-array d3-scale d3-shape
npx @a3tai/mittsu add area-chart --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
