<script lang="ts">
  import LineChart from '@a3tai/mittsu-charts/components/line-chart/line-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {areaMix, compact, traffic} from '$lib/docs/charts';

  const props = [
    {name: 'data', type: 'ChartDatum[]', description: 'Rows to plot. Each row must include the xKey and every series key.'},
    {name: 'series', type: 'ChartSeries[]', description: 'Line series config with key, label, color, icon, unit, and showPoints.'},
    {name: 'xKey', type: 'string', default: "'x'", description: 'Field used for the x-axis value.'},
    {name: 'xType', type: "'point' | 'linear' | 'time'", description: 'Override inferred x-axis scale kind.'},
    {name: 'curve', type: "'linear' | 'monotone' | 'step'", default: "'monotone'", description: 'D3 curve interpolation for the line.'},
    {name: 'showArea', type: 'boolean', default: 'false', description: 'Render a translucent area under each line.'},
    {name: 'showPoints', type: 'boolean', default: 'false', description: 'Render point markers for every datum.'},
    {name: 'showLabels', type: 'boolean', default: 'false', description: 'Render value labels above points.'},
  ];
</script>

<DocLayout
  title="LineChart"
  category="Cartesian"
  description="Multi-series SVG line chart for time, numeric, or categorical x-values with smooth, linear, step, point, label, and area-fill variants."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Multiple series" code={`<LineChart
  title="Line Chart - Multiple"
  xKey="date"
  data={traffic}
  showPoints
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <LineChart
          title="Line Chart - Multiple"
          description="Smooth multi-series trend lines."
          xKey="date"
          data={traffic}
          showPoints
          series={[
            {key: 'desktop', label: 'Desktop'},
            {key: 'mobile', label: 'Mobile'}
          ]}
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Step" code={`<LineChart
  title="Line Chart - Step"
  xKey="month"
  data={areaMix}
  curve="step"
  series={[{key: 'mobile', label: 'Mobile', showPoints: true}]}
/>`}>
      <div class="chart-doc-preview">
        <LineChart
          title="Line Chart - Step"
          description="Discrete changes without interpolation."
          xKey="month"
          data={areaMix}
          curve="step"
          series={[{key: 'mobile', label: 'Mobile', showPoints: true}]}
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Labels" code={`<LineChart
  title="Line Chart - Labels"
  xKey="month"
  data={areaMix}
  showLabels
  showPoints
  series={[{key: 'desktop', label: 'Desktop'}]}
/>`}>
      <div class="chart-doc-preview">
        <LineChart
          title="Line Chart - Labels"
          description="Point labels for small categorical series."
          xKey="month"
          data={areaMix}
          showLabels
          showPoints
          series={[{key: 'desktop', label: 'Desktop'}]}
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
npx @a3tai/mittsu add line-chart --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
