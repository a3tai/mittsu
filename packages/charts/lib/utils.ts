import type {
  ChartLegendItem,
  ChartMargin,
  ChartSeries,
  ChartX,
  XScaleKind
} from "./types";

export const CHART_COLORS = [
  "var(--uin-chart-1)",
  "var(--uin-chart-2)",
  "var(--uin-chart-3)",
  "var(--uin-chart-4)",
  "var(--uin-chart-5)",
  "var(--uin-chart-6)",
  "var(--uin-chart-7)",
  "var(--uin-chart-8)"
];

export function getSeriesColor(series: ChartSeries, index: number): string {
  return series.color ?? CHART_COLORS[index % CHART_COLORS.length];
}

export function buildLegend(series: ChartSeries[]): ChartLegendItem[] {
  return series.map((s, i) => ({
    key: s.key,
    label: s.label ?? s.key,
    color: getSeriesColor(s, i)
  }));
}

export function normalizeMargin(
  margin: Partial<ChartMargin> | undefined,
  fallback: ChartMargin
): ChartMargin {
  return {
    top: margin?.top ?? fallback.top,
    right: margin?.right ?? fallback.right,
    bottom: margin?.bottom ?? fallback.bottom,
    left: margin?.left ?? fallback.left
  };
}

export function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function toDate(value: unknown): Date | null {
  if (value instanceof Date && Number.isFinite(value.getTime())) return value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? date : null;
  }
  return null;
}

export function isChartX(value: unknown): value is ChartX {
  return typeof value === "string" || typeof value === "number" || value instanceof Date;
}

export function inferXKind(values: ChartX[]): XScaleKind {
  if (values.length === 0) return "point";
  if (values.every((v) => v instanceof Date)) return "time";
  if (
    values.every((v) => typeof v === "string") &&
    values.every((v) => toDate(v) !== null)
  ) {
    return "time";
  }
  if (values.every((v) => typeof v === "number")) return "linear";
  return "point";
}

export function formatX(value: unknown): string {
  if (value instanceof Date) {
    return new Intl.DateTimeFormat(undefined, {month: "short", day: "numeric"}).format(value);
  }
  return value == null ? "" : String(value);
}

export function formatValue(value: number, key: string, formatter?: (value: number, key: string) => string): string {
  return formatter ? formatter(value, key) : new Intl.NumberFormat().format(value);
}

/**
 * Deduplicates by `formatX`'d value. Two distinct values that share the same
 * formatted representation will collapse — e.g. two Date instances on the
 * same day will both render as "Jan 1" and merge. For categorical x-axes
 * where this matters, pass already-formatted strings.
 */
export function uniqueStrings(values: unknown[]): string[] {
  return Array.from(new Set(values.map((v) => formatX(v))));
}

export function padDomain(
  min: number,
  max: number,
  options?: {includeZero?: boolean}
): [number, number] {
  if (min === max) return [min - 1, max + 1];
  const pad = Math.abs(max - min) * 0.06;
  if (options?.includeZero) {
    return [min < 0 ? min - pad : 0, max < 0 ? 0 : max + pad];
  }
  return [min - pad, max + pad];
}

export function clamp(value: number, minValue: number, maxValue: number): number {
  return Math.max(minValue, Math.min(maxValue, value));
}

export function polarPoint(radius: number, angle: number): [number, number] {
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
}

export function pathFromPoints(points: Array<[number, number]>, close = true): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first[0]} ${first[1]}${rest.map(([x, y]) => ` L ${x} ${y}`).join("")}${close ? " Z" : ""}`;
}

let __chartIdCounter = 0;
export function nextChartId(prefix = "uin-chart"): string {
  __chartIdCounter += 1;
  return `${prefix}-${__chartIdCounter}`;
}
