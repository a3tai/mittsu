<script lang="ts">
  import RadarChart from '@a3tai/mittsu-charts/components/radar-chart/radar-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {radarData} from '$lib/docs/charts';

  const props = [
    {name: 'data', type: 'ChartDatum[]', description: 'Axis rows. Each row includes the axis label and every series key.'},
    {name: 'series', type: 'ChartSeries[]', description: 'Series config with key, label, color, icon, and unit metadata.'},
    {name: 'xKey', type: 'string', default: "'axis'", description: 'Field used for radial axis labels.'},
    {name: 'maxValue', type: 'number', description: 'Explicit maximum for the radial value scale.'},
    {name: 'gridShape', type: "'polygon' | 'circle' | 'none'", default: "'polygon'", description: 'Grid geometry.'},
    {name: 'gridFill', type: 'boolean', default: 'false', description: 'Fill grid bands for a denser radar style.'},
    {name: 'showArea', type: 'boolean', default: 'true', description: 'Render translucent filled series areas.'},
    {name: 'showPoints', type: 'boolean', default: 'false', description: 'Render points at every series/axis value.'},
  ];
</script>

<DocLayout
  title="RadarChart"
  category="Radial"
  description="Radial categorical comparison chart with polygon or circular grids, filled areas, line-only overlays, dots, and legends."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Multiple series" code={`<RadarChart
  title="Radar Chart - Multiple"
  data={radarData}
  maxValue={100}
  showPoints
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <RadarChart
          title="Radar Chart - Multiple"
          description="Compare platform characteristics across dimensions."
          data={radarData}
          maxValue={100}
          showPoints
          series={[
            {key: 'desktop', label: 'Desktop'},
            {key: 'mobile', label: 'Mobile'}
          ]}
        />
      </div>
    </DocExample>

    <DocExample title="Circle grid" code={`<RadarChart
  title="Radar Chart - Circle Grid"
  data={radarData}
  maxValue={100}
  gridShape="circle"
  gridFill
  series={[{key: 'mobile', label: 'Mobile'}]}
/>`}>
      <div class="chart-doc-preview">
        <RadarChart
          title="Radar Chart - Circle Grid"
          description="Circular grid with filled bands."
          data={radarData}
          maxValue={100}
          gridShape="circle"
          gridFill
          series={[{key: 'mobile', label: 'Mobile'}]}
        />
      </div>
    </DocExample>

    <DocExample title="Line only" code={`<RadarChart
  title="Radar Chart - Lines"
  data={radarData}
  maxValue={100}
  showArea={false}
  showPoints
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <RadarChart
          title="Radar Chart - Lines"
          description="Line-only mode for dense overlays."
          data={radarData}
          maxValue={100}
          showArea={false}
          showPoints
          series={[
            {key: 'desktop', label: 'Desktop'},
            {key: 'mobile', label: 'Mobile'}
          ]}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npm install d3-array d3-scale
npx @a3tai/mittsu add radar-chart --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
