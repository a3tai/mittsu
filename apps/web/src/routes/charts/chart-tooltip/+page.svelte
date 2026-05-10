<script lang="ts">
  import ChartTooltip from '@a3tai/mittsu-charts/components/chart-tooltip/chart-tooltip.svelte';
  import BarChart from '@a3tai/mittsu-charts/components/bar-chart/bar-chart.svelte';
  import {DocLayout, DocSection, DocExample, DocProps, DocCode} from '$lib/docs';
  import {activity} from '$lib/docs/charts';

  const rows = [
    {key: 'running', label: 'Running', value: '380', unit: 'kcal', color: 'var(--uin-chart-1)'},
    {key: 'swimming', label: 'Swimming', value: '420', unit: 'kcal', color: 'var(--uin-chart-2)'}
  ];

  const props = [
    {name: 'label', type: 'string', description: 'Tooltip heading, usually the active x/category value.'},
    {name: 'rows', type: 'ChartTooltipRow[]', default: '[]', description: 'Rows with label, formatted value, color, icon, and unit metadata.'},
    {name: 'indicator', type: "'dot' | 'line' | 'none'", default: "'dot'", description: 'Visual marker rendered before row labels.'},
    {name: 'hideLabel', type: 'boolean', default: 'false', description: 'Hide the heading while keeping the rows.'},
    {name: 'totalLabel', type: 'string', default: "'Total'", description: 'Label for the optional total row.'},
    {name: 'total', type: 'string', description: 'Optional preformatted total value.'},
  ];
</script>

<DocLayout
  title="ChartTooltip"
  category="Primitives"
  description="Shared chart tooltip content for consistent labels, markers, icons, units, hidden labels, and totals across every chart type."
  backHref="/charts"
  backLabel="Charts"
>
  <DocSection title="Examples">
    <DocExample title="Default" code={`<ChartTooltip
  label="July 16, 2024"
  rows={[
    {key: 'running', label: 'Running', value: '380', color: 'var(--uin-chart-1)'},
    {key: 'swimming', label: 'Swimming', value: '420', color: 'var(--uin-chart-2)'}
  ]}
/>`}>
      <div class="chart-tooltip-preview">
        <ChartTooltip label="July 16, 2024" rows={rows} />
      </div>
    </DocExample>

    <DocExample title="Line indicator" code={`<ChartTooltip
  label="July 16, 2024"
  indicator="line"
  rows={rows}
/>`}>
      <div class="chart-tooltip-preview">
        <ChartTooltip label="July 16, 2024" indicator="line" rows={rows} />
      </div>
    </DocExample>

    <DocExample title="Icons and total" code={`<ChartTooltip
  label="Activities"
  indicator="none"
  rows={[
    {key: 'running', label: 'Running', value: '380', unit: 'kcal', icon: '⌁'},
    {key: 'swimming', label: 'Swimming', value: '420', unit: 'kcal', icon: '≈'}
  ]}
  total="800 kcal"
/>`}>
      <div class="chart-tooltip-preview">
        <ChartTooltip
          label="Activities"
          indicator="none"
          rows={[
            {key: 'running', label: 'Running', value: '380', unit: 'kcal', icon: '⌁'},
            {key: 'swimming', label: 'Swimming', value: '420', unit: 'kcal', icon: '≈'}
          ]}
          total="800 kcal"
        />
      </div>
    </DocExample>

    <DocExample title="Used by a chart" code={`<BarChart
  title="Tooltip - Line Indicator"
  xKey="day"
  data={activity}
  stacked
  tooltipIndicator="line"
  series={[
    {key: 'running', label: 'Running'},
    {key: 'swimming', label: 'Swimming'}
  ]}
/>`}>
      <div class="chart-doc-preview">
        <BarChart
          title="Tooltip - Line Indicator"
          description="Tooltip rows can use line indicators."
          xKey="day"
          data={activity}
          stacked
          tooltipIndicator="line"
          series={[
            {key: 'running', label: 'Running'},
            {key: 'swimming', label: 'Swimming'}
          ]}
        />
      </div>
    </DocExample>
  </DocSection>

  <DocSection title="Props">
    <DocProps {props} />
  </DocSection>

  <DocSection title="Install">
    <DocCode label="CLI" code={`npx @a3tai/mittsu add chart-tooltip --registry ./packages/charts/registry.json`} />
  </DocSection>
</DocLayout>
