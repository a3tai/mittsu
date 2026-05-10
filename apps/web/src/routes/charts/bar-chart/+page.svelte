<script lang="ts">
  import BarChart from '@a3tai/mittsu-charts/components/bar-chart/bar-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {activity, compact, intake, signed} from '$lib/docs/charts';

  const props = [
    {name: 'data', type: 'ChartDatum[]', description: 'Categorical rows to plot.'},
    {name: 'series', type: 'ChartSeries[]', description: 'Bar series config with key, label, color, icon, and unit metadata.'},
    {name: 'xKey', type: 'string', default: "'x'", description: 'Field used for category labels.'},
    {name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Controls whether bars grow upward or sideways.'},
    {name: 'stacked', type: 'boolean', default: 'false', description: 'Stack series in each category instead of grouping them.'},
    {name: 'showLabels', type: 'boolean', default: 'false', description: 'Render value labels near each bar.'},
    {name: 'negativeColor', type: 'string', default: "'var(--uin-chart-negative)'", description: 'Color used for negative values.'},
  ];
</script>

<DocLayout
  title="BarChart"
  category="Cartesian"
  description="Categorical bar chart with grouped, stacked, horizontal, labeled, active, and negative value variants."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Stacked with metrics" code={`<BarChart
  title="Bar Chart - Interactive"
  xKey="day"
  data={activity}
  stacked
  metrics={[
    {label: 'Running', value: '2,530', color: 'var(--uin-chart-1)'},
    {label: 'Swimming', value: '2,550', color: 'var(--uin-chart-2)'}
  ]}
  series={[
    {key: 'running', label: 'Running', unit: 'kcal'},
    {key: 'swimming', label: 'Swimming', unit: 'kcal'}
  ]}
/>`}>
      <div class="chart-doc-preview chart-doc-preview-wide">
        <BarChart
          title="Bar Chart - Interactive"
          description="Daily activity by type with top-line metrics."
          xKey="day"
          data={activity}
          stacked
          metrics={[
            {label: 'Running', value: '2,530', color: 'var(--uin-chart-1)'},
            {label: 'Swimming', value: '2,550', color: 'var(--uin-chart-2)'}
          ]}
          series={[
            {key: 'running', label: 'Running', unit: 'kcal'},
            {key: 'swimming', label: 'Swimming', unit: 'kcal'}
          ]}
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Grouped" code={`<BarChart
  title="Bar Chart - Grouped"
  xKey="source"
  data={intake}
  series={[
    {key: 'imported', label: 'Imported'},
    {key: 'indexed', label: 'Indexed'},
    {key: 'failed', label: 'Failed'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <BarChart
          title="Bar Chart - Grouped"
          description="Compare pipeline stages side by side."
          xKey="source"
          data={intake}
          series={[
            {key: 'imported', label: 'Imported'},
            {key: 'indexed', label: 'Indexed'},
            {key: 'failed', label: 'Failed'}
          ]}
        />
      </div>
    </DocExample>

    <DocExample title="Horizontal" code={`<BarChart
  title="Bar Chart - Horizontal"
  xKey="source"
  data={intake}
  orientation="horizontal"
  showLabels
  series={[{key: 'indexed', label: 'Indexed'}]}
/>`}>
      <div class="chart-doc-preview">
        <BarChart
          title="Bar Chart - Horizontal"
          description="Horizontal bars improve label readability."
          xKey="source"
          data={intake}
          orientation="horizontal"
          showLabels
          series={[{key: 'indexed', label: 'Indexed'}]}
        />
      </div>
    </DocExample>

    <DocExample title="Negative values" code={`<BarChart
  title="Bar Chart - Negative"
  xKey="label"
  data={signed}
  showLabels
  series={[{key: 'net', label: 'Net'}]}
/>`}>
      <div class="chart-doc-preview">
        <BarChart
          title="Bar Chart - Negative"
          description="Positive and negative values share a zero baseline."
          xKey="label"
          data={signed}
          showLabels
          series={[{key: 'net', label: 'Net'}]}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install d3-array d3-scale d3-shape
npx @a3tai/mittsu add bar-chart --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
