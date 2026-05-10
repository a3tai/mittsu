<script lang="ts">
  import RadialChart from '@a3tai/mittsu-charts/components/radial-chart/radial-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {calories, compact, radialData} from '$lib/docs/charts';

  const props = [
    {name: 'data', type: 'RadialDatum[]', description: 'Radial segments with label, value, optional max, id, and color.'},
    {name: 'variant', type: "'rings' | 'stacked'", default: "'rings'", description: 'Concentric progress rings or stacked segments on one shared track.'},
    {name: 'startAngle', type: 'number', default: '0', description: 'Arc start angle in radians.'},
    {name: 'endAngle', type: 'number', default: 'Math.PI * 2', description: 'Arc end angle in radians.'},
    {name: 'maxValue', type: 'number', description: 'Shared max value for progress calculation.'},
    {name: 'showLabels', type: 'boolean', default: 'false', description: 'Render labels over each arc.'},
    {name: 'centerValue', type: 'string', description: 'Override the computed center total.'},
    {name: 'centerLabel', type: 'string', default: "'Total'", description: 'Small label rendered under the center value.'},
  ];
</script>

<DocLayout
  title="RadialChart"
  category="Radial"
  description="D3 arc-based radial progress component for rings, partial gauges, stacked gauges, center totals, labels, and legends."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Rings" code={`<RadialChart
  title="Radial Chart - Rings"
  data={radialData}
  showLabels
  centerLabel="Visitors"
/>`}>
      <div class="chart-doc-preview">
        <RadialChart
          title="Radial Chart - Rings"
          description="Multiple radial progress arcs."
          data={radialData}
          showLabels
          centerLabel="Visitors"
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Gauge" code={`<RadialChart
  title="Radial Chart - Gauge"
  data={[{label: 'Visitors', value: 1260, max: 1600}]}
  startAngle={-Math.PI * 0.75}
  endAngle={Math.PI * 0.75}
  showLegend={false}
/>`}>
      <div class="chart-doc-preview">
        <RadialChart
          title="Radial Chart - Gauge"
          description="A partial radial gauge with center text."
          data={[{label: 'Visitors', value: 1260, max: 1600}]}
          startAngle={-Math.PI * 0.75}
          endAngle={Math.PI * 0.75}
          showLegend={false}
          centerLabel="Visitors"
          valueFormatter={(value) => compact.format(value)}
        />
      </div>
    </DocExample>

    <DocExample title="Stacked" code={`<RadialChart
  title="Radial Chart - Stacked"
  data={calories}
  variant="stacked"
  startAngle={-Math.PI * 0.75}
  endAngle={Math.PI * 0.75}
  maxValue={1000}
/>`}>
      <div class="chart-doc-preview">
        <RadialChart
          title="Radial Chart - Stacked"
          description="Stacked segments on a shared radial track."
          data={calories}
          variant="stacked"
          startAngle={-Math.PI * 0.75}
          endAngle={Math.PI * 0.75}
          maxValue={1000}
          centerLabel="kcal"
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
npx @a3tai/mittsu add radial-chart --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
