# @a3tai/mittsu-charts

Svelte 5 chart components for `@a3tai/mittsu`.

The package follows the same source-first model as the core UI package:
components are plain Svelte files with sibling global CSS files. D3 is used
for chart math — scales, ticks, paths, arcs, and stacking — while Svelte
owns rendering and interaction state.

## Components

- `ChartFrame` — shared figure shell: header, description, legend, metrics,
  footer.
- `ChartTooltip` — tooltip content with label, marker, unit, icon, and
  total variants.
- `AreaChart` — time / numeric / categorical area chart with stacked and
  expanded modes.
- `LineChart` — time / numeric / categorical x-axis line chart with step,
  monotone, and linear curves.
- `BarChart` — grouped, stacked, vertical, or horizontal categorical bars
  with a negative-value variant.
- `DonutChart` — pie or donut chart with labels (inside / outside), active
  slices, legend, and center total.
- `RadarChart` — polygon or circular radar with filled, line-only, and dot
  variants.
- `RadialChart` — radial progress rings or stacked gauge arcs.

## Install

```bash
npm install d3-array d3-scale d3-shape
npx @a3tai/mittsu add line-chart \
  --registry https://raw.githubusercontent.com/a3tai/mittsu/main/packages/charts/registry.json
```

Charts pull from individual D3 sub-packages so you don't ship the full
`d3` umbrella. If you already have `d3` installed, those sub-packages
come with it — no extra step needed.

The CLI copies the requested component plus shared `lib/` and `tokens/`
files into your project. Import the resulting CSS once at the root of
your app:

```css
/* design tokens — load before component CSS */
@import './lib/styles/charts.css';        /* tokens/charts.css */
@import './lib/styles/charts.shared.css'; /* lib/charts.shared.css */

/* per chart you've copied */
@import './lib/components/ui/chart-frame/chart-frame.css';
@import './lib/components/ui/chart-tooltip/chart-tooltip.css';
@import './lib/components/ui/line-chart/line-chart.css';
```

The exact destination paths depend on your CLI config; the structure
above mirrors what most consumers end up with. The package also ships
the source tree directly (`packages/charts/...`) so you can import via
package path during development:

```css
@import '@a3tai/mittsu-charts/tokens/charts.css';
@import '@a3tai/mittsu-charts/lib/charts.shared.css';
@import '@a3tai/mittsu-charts/components/chart-frame/chart-frame.css';
@import '@a3tai/mittsu-charts/components/chart-tooltip/chart-tooltip.css';
@import '@a3tai/mittsu-charts/components/line-chart/line-chart.css';
```

## Tokens

Chart tokens (`tokens/charts.css`) are layered on top of
`@a3tai/mittsu-svelte5/tokens/tokens.css`. Every reference includes a
fallback so charts render in isolation, but you'll get the intended look
when the base tokens are also imported.

The palette includes both categorical tokens (`--uin-chart-1` through
`--uin-chart-8`) and semantic tokens for product data:

- `--uin-chart-critical`, `--uin-chart-danger`, and `--uin-chart-warning` for security risk and failed states.
- `--uin-chart-success` and `--uin-chart-info` for healthy, remediated, selected, or informational series.
- `--uin-chart-neutral` for baselines, archived states, and low-emphasis comparisons.

LLM-friendly chart rule: generate plain `data` arrays first, then a small
`series` array with explicit `key`, `label`, and semantic `color` values.
Avoid one-off hex colors in examples and prefer tokens that explain intent.

## Usage

```svelte
<script lang="ts">
  import LineChart from '@a3tai/mittsu-charts/components/line-chart/line-chart.svelte';

  const data = [
    {date: new Date('2025-01-01'), desktop: 1240, mobile: 940},
    {date: new Date('2025-02-01'), desktop: 1380, mobile: 1110},
    {date: new Date('2025-03-01'), desktop: 1610, mobile: 1280},
  ];
</script>

<LineChart
  xKey="date"
  {data}
  series={[
    {key: 'desktop', label: 'Desktop'},
    {key: 'mobile',  label: 'Mobile'},
  ]}
  title="Active visitors"
  description="Last 90 days"
  showPoints
/>
```

`BarChart`, `AreaChart`, and `LineChart` share `data` + `series` shape.
`DonutChart` and `RadialChart` accept a flat `{label, value, color?}[]`
list. `RadarChart` uses the `data` + `series` pattern with an
`xKey` (default `"axis"`).

## Local development

```bash
npm --workspace @a3tai/mittsu-charts run check
```
