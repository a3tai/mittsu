export type ChartX = string | number | Date;

export type ChartDatum = Record<string, unknown>;

export type ChartSeries = {
  key: string;
  label?: string;
  color?: string;
  icon?: string;
  unit?: string;
  showPoints?: boolean;
};

export type ChartLegendItem = {
  key: string;
  label: string;
  color: string;
};

export type ChartMargin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type XScaleKind = "point" | "linear" | "time";

export type ChartValueFormatter = (value: number, key: string) => string;

export type ChartXFormatter = (value: ChartX) => string;

export type ChartTooltipIndicator = "dot" | "line" | "icon" | "none";

export type ChartTooltipRow = {
  key: string;
  label: string;
  value: string;
  color?: string;
  icon?: string;
  unit?: string;
};

export type ChartMetric = {
  label: string;
  value: string;
  color?: string;
  description?: string;
};

export type DonutDatum = {
  label: string;
  value: number;
  color?: string;
  id?: string;
};

export type RadialDatum = DonutDatum & {
  max?: number;
};
