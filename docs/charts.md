# Charts

`@a3tai/mittsu-charts` is a Svelte 5 chart sub-package built with the
same copy-in conventions as the core UI package.

## Design

- D3 handles visualization math: scales, ticks, line/area paths, pie/radial
  arcs, radar geometry, and bar/area stacking.
- Svelte handles markup and interaction state. Components render SVG directly
  instead of letting D3 mutate the DOM.
- CSS variables handle theming. Import `tokens/charts.css` after the core
  `tokens.css`.
- Each chart renders an SVG plus a screen-reader-only data table.

## LLM design grammar

- Start with the question: trend, comparison, composition, progress, or
  capability map.
- Use plain arrays for `data` and plain objects for `series`.
- Choose semantic tokens before categorical tokens for risk, health, and status:
  `--uin-chart-critical`, `--uin-chart-danger`, `--uin-chart-warning`,
  `--uin-chart-success`, `--uin-chart-info`, and `--uin-chart-neutral`.
- Use categorical tokens (`--uin-chart-1` through `--uin-chart-8`) when series
  are peers with no inherent severity order.
- Keep chart titles specific enough for screen readers and generated code. A
  good title is `Work burn-down by week`; a weak title is `Chart`.

## Research notes

- D3 is the right underlying engine because it is a low-level toolbox, not a
  fixed charting abstraction. We can use only the pieces we need: scales,
  ticks, shapes, arcs, and stack layouts.
- Recharts validates the component-composition model for app charts, but it is
  React-specific. This package borrows the "data + series config + chart shell"
  shape without depending on React.
- shadcn/ui's chart package shows the value of copied chart chrome, color
  tokens, tooltips, and legends. This package keeps those ideas but replaces
  Recharts with direct D3 math.
- Chart.js is strong for large canvas-rendered datasets, but canvas is a poor
  fit for this repo's CSS-token and source-owned SVG styling model.
- Highcharts sets the bar for accessibility: every chart should have a title,
  description, keyboard-aware interaction where relevant, and a data-table path.

Primary references:

- [D3](https://d3js.org/what-is-d3)
- [shadcn/ui Chart](https://ui.shadcn.com/docs/components/chart)
- [Recharts](https://recharts.github.io/)
- [Chart.js](https://www.chartjs.org/docs/latest/)
- [Highcharts accessibility](https://www.highcharts.com/docs/accessibility/accessibility-module)

## Local usage

```svelte
<script lang="ts">
  import LineChart from '@a3tai/mittsu-charts/components/line-chart/line-chart.svelte';

  const data = [
    {month: 'Jan', desktop: 120, mobile: 86},
    {month: 'Feb', desktop: 180, mobile: 122},
    {month: 'Mar', desktop: 150, mobile: 144}
  ];
</script>

<LineChart
  title="Traffic"
  description="Monthly visitors by device."
  xKey="month"
  {data}
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile', label: 'Mobile'}
  ]}
/>
```

## Copy-in usage

```bash
npm install d3-array d3-scale d3-shape
npx @a3tai/mittsu add line-chart \
  --registry ./packages/charts/registry.json
```

Import the copied CSS:

```css
@import './lib/styles/charts.css';
@import './lib/styles/charts.shared.css';
@import './lib/components/ui/chart-frame/chart-frame.css';
@import './lib/components/ui/chart-tooltip/chart-tooltip.css';
@import './lib/components/ui/line-chart/line-chart.css';
```

## Components

| Component | Purpose |
| --- | --- |
| `ChartFrame` | Shared chart shell, title, description, metrics, legend, and footer |
| `ChartTooltip` | Shared tooltip rows with dot, line, icon, unit, hidden-label, and total variants |
| `AreaChart` | Multi-series area charts with stacked and 100% expanded modes |
| `LineChart` | Multi-series line charts with linear, monotone, and step curves |
| `BarChart` | Grouped, stacked, horizontal, labeled, active, and negative categorical bars |
| `DonutChart` | Pie/donut composition with labels, active slices, center total, and legend |
| `RadarChart` | Polygon/circle radar charts with filled, line-only, dot, and multi-series modes |
| `RadialChart` | Concentric radial progress rings and stacked gauge arcs |

## Screenshot coverage

The local `/charts` page now implements versions of the reference families in
`reference/charts/charts1.png` through `charts7.png`: area, bar, line, pie,
radar, radial, and tooltip variants. The implementation is intentionally API
driven rather than one-off gallery markup, so the same primitives can be copied
into consumer apps.
