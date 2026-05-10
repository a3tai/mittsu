# @a3tai/mittsu-charts — changelog

## Unreleased

A six-phase refactor that took the package from "feature-complete but rough"
to "publishable". All entries below are part of the same pre-0.1 sweep.

### Breaking

- `padDomain` no longer force-clamps the lower bound to 0. Line and area
  charts now pad their y-domain symmetrically around the data; bar and
  area-stacked charts opt back into the old behaviour with
  `{includeZero: true}`. Charts that previously rendered empty space
  between 0 and the data minimum will now zoom in on the data range.
- `inferXKind` now treats arrays of ISO-date strings (e.g. `"2024-01-01"`)
  as `"time"` instead of falling through to `"point"`. Charts whose `xKey`
  is a date string will switch from a categorical to a time-scale x-axis.

### Added

- `responsive` (default `true`) and `aspectRatio` props on every chart.
  ResizeObserver tracks the chart shell; observed width drives derived
  width/height, so scales, ticks, and margins reflow at the actual
  rendered size. Pass `responsive={false}` to keep the old fixed-size
  behaviour.
- `lib/charts.shared.css` — shared chart primitives (svg shell,
  gridlines, axis lines, ticks, hidden-table sr style, swatch dot)
  pulled out of `chart-frame.css` so each component CSS is independent.
- Per-chart `export type Props` so consumers can type their own wrappers.
- `lib/index.ts` barrel — re-exports the public types and util surface.
- `nextChartId` util + ARIA wiring on every chart: SVG `aria-labelledby`
  → generated `<title id>`, `aria-describedby` → generated `<desc id>`
  (when present) and the hidden data table id. Hidden tables get
  `<th scope="col">`.
- SVGs are `tabindex=0` with a focus ring (`--uin-chart-focus-ring`) so
  visual keyboard users can land on the chart.
- `prefers-reduced-motion: no-preference` gates around bar, donut, and
  radial transitions.
- `'icon'` value on `ChartTooltipIndicator`.
- `showCenter` prop on RadialChart (matches DonutChart).
- `'none'` and `'percent'` on RadialChart's `labelMode` (matches
  DonutChart).
- `xKey` and `showPoints` on RadarChart, with `axisKey` and `showDots`
  preserved as deprecated aliases.
- `vitest` test suite for `lib/utils.ts` (39 cases covering the inferXKind
  and padDomain regressions).
- CHANGELOG.

### Changed

- D3 imports are now per sub-package (`d3-array`, `d3-scale`, `d3-shape`).
  `d3` is no longer a peer dep; the sub-packages are. Build size drops
  ~32 KB on the apps/web kitchen sink.
- ChartTooltip's CSS lives in `chart-tooltip.css` instead of being
  embedded inside `chart-frame.css`. ChartTooltip is now genuinely
  standalone.
- README rewritten with correct package import paths and a minimal
  usage example.

### Fixed

- ChartTooltip CSS dependency on chart-frame is gone; the registry
  reflects this (`chart-tooltip` no longer depends on `chart-frame`).
- Radial chart's center text no longer renders when the chart has no data
  and no explicit `centerValue`.
- Hidden data tables now have a stable id and proper `<th scope="col">`
  semantics so screen readers parse them correctly.

### Deferred (next pre-0.1 wave)

- Full keyboard arrow-key traversal of chart marks (focus the SVG, then
  move active datum with Left/Right). The `tabindex` and ARIA wiring
  ship now; the interaction layer needs a per-chart-family design pass.
- `bind:active` two-way active-key API across all charts (pairs with
  keyboard nav).
- Bar's `activeKey` and donut's `activeId` rename to a unified `active`
  prop (collides with internal hover state; needs the `bind:active`
  design first).
