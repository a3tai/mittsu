<script lang="ts">
  import DonutChart from '@a3tai/mittsu-charts/components/donut-chart/donut-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {compact, pieData} from '$lib/docs/charts';

  const props = [
    {name: 'data', type: 'DonutDatum[]', description: 'Slices with label, value, optional id, and optional color.'},
    {name: 'innerRadiusRatio', type: 'number', default: '0.62', description: '0 renders a pie; larger values render a donut.'},
    {name: 'labelMode', type: "'none' | 'label' | 'value' | 'percent'", default: "'none'", description: 'Controls labels rendered inside or outside slices.'},
    {name: 'labelPosition', type: "'inside' | 'outside'", default: "'inside'", description: 'Position for slice labels.'},
    {name: 'activeId', type: 'string', description: 'Slice id or label to offset from the center.'},
    {name: 'showCenter', type: 'boolean', description: 'Override automatic center total rendering.'},
    {name: 'centerLabel', type: 'string', default: "'Total'", description: 'Small label rendered under the center total.'},
  ];
</script>

<DocLayout
  title="DonutChart"
  category="Circular"
  description="Pie and donut composition powered by D3 pie and arc generators, with labels, active slices, legends, center totals, and tooltip rows."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Pie with outside labels" code={`<DonutChart
  title="Pie Chart - Labels"
  data={pieData}
  innerRadiusRatio={0}
  labelMode="percent"
  labelPosition="outside"
  showCenter={false}
/>`}>
      <div class="chart-doc-preview">
        <DonutChart
          title="Pie Chart - Labels"
          description="Outer labels with leader lines."
          data={pieData}
          innerRadiusRatio={0}
          labelMode="percent"
          labelPosition="outside"
          showCenter={false}
        />
      </div>
    </DocExample>

    <DocExample title="Donut center total" code={`<DonutChart
  title="Donut Chart - Center"
  data={pieData}
  centerLabel="Visitors"
/>`}>
      <div class="chart-doc-preview">
        <DonutChart
          title="Donut Chart - Center"
          description="Center value and legend are built into the shell."
          data={pieData}
          centerLabel="Visitors"
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Active slice" code={`<DonutChart
  title="Donut Chart - Active"
  data={pieData}
  activeId="Mobile"
  labelMode="label"
/>`}>
      <div class="chart-doc-preview">
        <DonutChart
          title="Donut Chart - Active"
          description="Highlight one slice with a controlled offset."
          data={pieData}
          activeId="Mobile"
          labelMode="label"
          centerLabel="Devices"
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install d3-shape
npx @a3tai/mittsu add donut-chart --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
