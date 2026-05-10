/**
 * Manifest and demo data for the chart reference pages.
 */

export type ChartMeta = {
  name: string;
  title: string;
  category: ChartCategory;
  description: string;
};

export type ChartRecipe = {
  title: string;
  domain: string;
  description: string;
  chart: string;
  palette: string;
  prompt: string;
};

export type ChartCategory = 'Cartesian' | 'Circular' | 'Radial' | 'Primitives';

export const charts: ChartMeta[] = [
  {name: 'area-chart', title: 'AreaChart', category: 'Cartesian', description: 'Area chart with monotone, linear, step, stacked, and expanded modes.'},
  {name: 'bar-chart', title: 'BarChart', category: 'Cartesian', description: 'Grouped, stacked, horizontal, labeled, active, and negative categorical bars.'},
  {name: 'line-chart', title: 'LineChart', category: 'Cartesian', description: 'Multi-series line chart with linear, monotone, step, dot, label, and area-fill variants.'},
  {name: 'donut-chart', title: 'DonutChart', category: 'Circular', description: 'Pie and donut chart with labels, active slices, center totals, and legends.'},
  {name: 'radar-chart', title: 'RadarChart', category: 'Radial', description: 'Radar chart with polygon or circular grids, filled areas, dots, and multiple series.'},
  {name: 'radial-chart', title: 'RadialChart', category: 'Radial', description: 'Concentric radial progress rings and stacked gauge arcs.'},
  {name: 'chart-frame', title: 'ChartFrame', category: 'Primitives', description: 'Shared chart shell with title, description, metrics, legend, body, and footer slot.'},
  {name: 'chart-tooltip', title: 'ChartTooltip', category: 'Primitives', description: 'Shared tooltip content with label, marker, unit, icon, and total row variants.'},
];

export const chartCategories: ChartCategory[] = [
  'Cartesian',
  'Circular',
  'Radial',
  'Primitives',
];

export const chartRecipes: ChartRecipe[] = [
  {
    title: 'Operations health',
    domain: 'Admin consoles',
    description: 'Show open work, warnings, completed work, and backlog movement in one operational view.',
    chart: 'LineChart + BarChart',
    palette: 'critical, warning, success',
    prompt: 'Use for queues, incidents, SLAs, support load, and release burn-downs.'
  },
  {
    title: 'Signal timelines',
    domain: 'Developer tools',
    description: 'Track event streams over time without pretending every spike is equal. Let urgent series earn the accent.',
    chart: 'AreaChart or LineChart',
    palette: 'info with warning accents',
    prompt: 'Use for logs, builds, jobs, syncs, traces, and local agent timelines.'
  },
  {
    title: 'Local collections',
    domain: 'Library apps',
    description: 'Use quiet circular and radial summaries for collection state, content mix, and sync health.',
    chart: 'DonutChart + RadialChart',
    palette: 'categorical, low saturation',
    prompt: 'Use for collections, progress, categories, and storage.'
  },
  {
    title: 'Cross-platform readiness',
    domain: 'macOS, Windows, Linux, mobile',
    description: 'Compare native surface coverage across platforms without turning the page into a dashboard wall.',
    chart: 'RadarChart',
    palette: 'neutral plus accent',
    prompt: 'Use for platform coverage, capability maps, and product maturity.'
  }
];

export function findChart(name: string): ChartMeta | undefined {
  return charts.find((chart) => chart.name === name);
}

export const compact = new Intl.NumberFormat(undefined, {notation: 'compact'});

export const workTrend = [
  {week: 'W01', urgent: 42, queued: 118, completed: 18},
  {week: 'W02', urgent: 39, queued: 104, completed: 31},
  {week: 'W03', urgent: 31, queued: 96, completed: 46},
  {week: 'W04', urgent: 27, queued: 82, completed: 64},
  {week: 'W05', urgent: 19, queued: 74, completed: 83},
  {week: 'W06', urgent: 14, queued: 61, completed: 105}
];

export const workIntake = [
  {surface: 'Queue A', urgent: 18, high: 42, medium: 76},
  {surface: 'Queue B', urgent: 14, high: 36, medium: 58},
  {surface: 'Queue C', urgent: 9, high: 31, medium: 64},
  {surface: 'Queue D', urgent: 6, high: 27, medium: 48},
  {surface: 'Queue E', urgent: 4, high: 19, medium: 41}
];

export const activitySignals = [
  {day: 'Mon', builds: 22, syncs: 38, jobs: 18},
  {day: 'Tue', builds: 28, syncs: 44, jobs: 24},
  {day: 'Wed', builds: 44, syncs: 62, jobs: 29},
  {day: 'Thu', builds: 31, syncs: 58, jobs: 46},
  {day: 'Fri', builds: 53, syncs: 72, jobs: 51},
  {day: 'Sat', builds: 37, syncs: 49, jobs: 34}
];

export const collectionMix = [
  {label: 'Active', value: 842, color: 'var(--uin-chart-info)'},
  {label: 'Queued', value: 314, color: 'var(--uin-chart-warning)'},
  {label: 'Reference', value: 186, color: 'var(--uin-chart-4)'},
  {label: 'Archived', value: 128, color: 'var(--uin-chart-neutral)'}
];

export const platformReadiness = [
  {axis: 'macOS', native: 94, mobile: 70},
  {axis: 'Windows', native: 82, mobile: 54},
  {axis: 'Linux', native: 76, mobile: 46},
  {axis: 'iOS', native: 58, mobile: 88},
  {axis: 'Android', native: 52, mobile: 84},
  {axis: 'Offline', native: 86, mobile: 78}
];

export const readinessRings = [
  {label: 'Desktop', value: 74, max: 100, color: 'var(--uin-chart-info)'},
  {label: 'Mobile', value: 68, max: 100, color: 'var(--uin-chart-warning)'},
  {label: 'Offline', value: 82, max: 100, color: 'var(--uin-chart-success)'}
];

export const traffic = [
  {date: 'Apr 1', desktop: 222, mobile: 150},
  {date: 'Apr 8', desktop: 248, mobile: 178},
  {date: 'Apr 15', desktop: 301, mobile: 212},
  {date: 'Apr 22', desktop: 277, mobile: 236},
  {date: 'Apr 29', desktop: 336, mobile: 264},
  {date: 'May 6', desktop: 365, mobile: 311}
];

export const areaMix = [
  {month: 'Jan', desktop: 186, mobile: 80, tablet: 42},
  {month: 'Feb', desktop: 305, mobile: 200, tablet: 72},
  {month: 'Mar', desktop: 237, mobile: 120, tablet: 54},
  {month: 'Apr', desktop: 273, mobile: 190, tablet: 66},
  {month: 'May', desktop: 209, mobile: 130, tablet: 58},
  {month: 'Jun', desktop: 214, mobile: 140, tablet: 63}
];

export const activity = [
  {day: 'Mon', running: 450, swimming: 300},
  {day: 'Tue', running: 380, swimming: 420},
  {day: 'Wed', running: 510, swimming: 240},
  {day: 'Thu', running: 220, swimming: 610},
  {day: 'Fri', running: 560, swimming: 460},
  {day: 'Sat', running: 410, swimming: 520}
];

export const intake = [
  {source: 'Books', imported: 420, indexed: 378, failed: 18},
  {source: 'PDFs', imported: 260, indexed: 221, failed: 31},
  {source: 'Web', imported: 188, indexed: 156, failed: 12},
  {source: 'Notes', imported: 134, indexed: 126, failed: 4}
];

export const signed = [
  {label: 'Jan', net: 880},
  {label: 'Feb', net: -220},
  {label: 'Mar', net: 640},
  {label: 'Apr', net: -140},
  {label: 'May', net: 940},
  {label: 'Jun', net: 720}
];

export const pieData = [
  {label: 'Desktop', value: 1242},
  {label: 'Mobile', value: 918},
  {label: 'Tablet', value: 286},
  {label: 'Other', value: 174}
];

export const radarData = [
  {axis: 'Speed', desktop: 86, mobile: 72},
  {axis: 'Memory', desktop: 74, mobile: 82},
  {axis: 'Battery', desktop: 52, mobile: 91},
  {axis: 'Offline', desktop: 68, mobile: 64},
  {axis: 'Search', desktop: 91, mobile: 77},
  {axis: 'Sync', desktop: 79, mobile: 84}
];

export const radialData = [
  {label: 'Desktop', value: 1260, max: 1600},
  {label: 'Mobile', value: 980, max: 1600},
  {label: 'Tablet', value: 620, max: 1600}
];

export const calories = [
  {label: 'Running', value: 380},
  {label: 'Swimming', value: 420}
];
