import type { ReactElement, ReactNode } from 'react';

/* The charts the console's Health drew by hand (Agent Fleet and Collector Fleet, 2026-10-15 to 2026-10-28), ported
 * as they are. Every mark has a one-line hover (ChartTip): the mark and its value, never a list or a breakdown. */

/** ChartTip: the trigger and its one line. */
export interface ChartTipProps {
  /**
   * The one line: the mark and its value - "6–24h silent · 10 agents", "Metrics · Crashing · 40 agents",
   * "0–0.5 % · 43 hosts". A string on purpose, so a second line, a list of names or a "Select to see them" hint cannot
   * creep back in (Pranjal, 2026-10-28: "keep them direct to the point").
   */
  text: string;
  /** The mark: a focusable element (a button, or an element with tabIndex). */
  children: ReactElement;
}

/** The colour of a count mark: the chart blue, the danger red, or the quiet grey. */
export type ChartCountTone = 'bar' | 'crit' | 'quiet';

/** One column of a ColumnChart. */
export interface ColumnChartColumn {
  /** The group, under the column: "1–6h". Also the column's key, so it is unique. */
  label: string;
  /** The count, drawn above the column. A zero column is disabled and its count is quiet. */
  n: number;
  /** The column's one-line hover: "1–6h silent · 4 agents". */
  tip: string;
  /** This column's colour; the chart's `tone` otherwise. */
  tone?: ChartCountTone | undefined;
  /** What a click on the column opens (its members). */
  onPick?: (() => void) | undefined;
}

export interface ColumnChartProps {
  /** The columns, left to right. */
  cols: ColumnChartColumn[];
  /** Every column's colour unless the column names its own. @default 'bar' */
  tone?: 'bar' | 'crit' | undefined;
  /**
   * The columns fill their card: the chart grows to the card's height (at least 210), the gaps are 12, the counts
   * 14/600 and each column at most 64 wide. The fleet Overviews' "Silent for how long" and "How full they are".
   * @default false
   */
  fill?: boolean | undefined;
  /** A dashed line with its word, just before the column at index `at`: where "1 day" or "At capacity" starts. */
  marker?: { at: number; label: string } | undefined;
  className?: string | undefined;
}

/** One row of a BarList. */
export interface BarListRow {
  /** The group, at the left: "Linux". Also the row's key, so it is unique. */
  label: string;
  /** The count. The bar is scaled to the biggest row; the share of the total sits beside the count. */
  n: number;
  /** The row's one-line hover: "Linux · 412 agents". */
  tip: string;
  /** The current one (the version everyone should be on): its bar in the good green and a quiet "current". */
  current?: boolean | undefined;
  /** This bar's colour: the danger red or the quiet grey. The chart blue otherwise. */
  tone?: 'crit' | 'quiet' | undefined;
  /** What a click on the row opens. */
  onPick?: (() => void) | undefined;
}

export interface BarListProps {
  rows: BarListRow[];
  /** A pale full-width track under every bar, and 12px bars with round ends. @default false */
  track?: boolean | undefined;
  className?: string | undefined;
}

/** One block of a StatusBlocks history: one period. */
export interface StatusBlock {
  /** The period's name, used in its hover and in the note under the chart: "16:30–17:00", "Now". Unique. */
  label: string;
  /** The share for that period, 0 to 100. */
  value: number;
}

export interface StatusBlocksProps {
  /** One block per period, oldest first. More than 60 and the gaps close to 2. */
  blocks: StatusBlock[];
  /** The labels under the row, spread evenly: ["24h ago", "12h ago", "Now"]. */
  axis: string[];
  /** The spoken name of the row: "Agents sending data, the last 24 hours". */
  label: string;
  /** What the share counts, after the number in each hover: "sending data" reads "Now · 98.2% sending data". */
  what?: string | undefined;
  /** At or above this, a block is green. @default 98 */
  good?: number | undefined;
  /** At or above this (and under `good`), amber; under it, red. @default 96 */
  warn?: number | undefined;
  /** A control on the legend's row, at its right (a range switch). */
  control?: ReactNode;
  className?: string | undefined;
}

/** One reading on a TrendLine. */
export interface TrendPoint {
  /** When: a timestamp, also the point's key. */
  t: number;
  /** The reading, on the `lo` to `hi` scale. */
  v: number;
}

export interface TrendLineProps {
  /** The readings, oldest first. */
  points: TrendPoint[];
  /** The bottom of the scale. */
  lo: number;
  /** The top of the scale. */
  hi: number;
  /** The line and its wash: the good green or the neutral blue. @default 'info' */
  tone?: 'good' | 'info' | undefined;
  /** Each point's one-line hover: "14:00 · 98.2%". */
  tip: (point: TrendPoint, index: number) => string;
  /** The three labels under the line: the start, the middle and the end ("Now"). */
  axis: [string, string, string];
  /** After each number on the side scale. @default '%' */
  unit?: string | undefined;
  className?: string | undefined;
}

export interface HistogramProps {
  /** One reading per member (a host), in the budget's unit. */
  vals: number[];
  /**
   * The budget. Every bar is a tenth of it wide, so the budget sits on a bar edge and no bar mixes members under and
   * over it; the scale ends just past the last reading or at 1.25 × the budget; bars past it are red.
   */
  budget: number;
  /** The unit, after the numbers: "%", "MB", "Mbps". */
  unit: string;
  /** What one reading is, in the hovers: singular at 1. @default { one: 'host', many: 'hosts' } */
  noun?: { one: string; many: string } | undefined;
  /** How a bar's edges are written. @default up to two decimals ("0.5", "12") */
  format?: ((value: number) => string) | undefined;
  /**
   * Makes every bar with members a button handing back which `vals` fall in it (their indexes) and its range
   * ("0.5–1 %").
   */
  onPick?: ((members: number[], range: string) => void) | undefined;
  className?: string | undefined;
}

/** One cell of a HeatTable: a count out of its row, shaded against the whole's rate. */
export interface HeatCell {
  /** The count in this cell. A zero cell is disabled. */
  n: number;
  /** Out of how many (the row's members). */
  of: number;
  /** The same count's rate across the whole (0 to 1): the cell is lighter when its own rate is better than this. */
  fleetRate: number;
  /** The cell's one-line hover: "Retail stores · Silent · 16 agents". */
  tip: string;
  /** What a click on the cell opens. */
  onPick: () => void;
}

/** One row of a HeatTable: a group. */
export interface HeatRow {
  /** The group: "Retail stores". Also the row's key, so it is unique. */
  label: string;
  /** A quiet word after it: "current". */
  note?: string | undefined;
  /** How many members the group has. */
  n: number;
  /** One cell per column, in the columns' order. */
  cells: HeatCell[];
}

export interface HeatTableProps {
  /** The first column's heading: what the rows are ("Zone", "Platform"). */
  head: string;
  /** The count column's heading: "Agents", "Collectors". */
  countLabel: string;
  /** The problem columns' headings. */
  cols: string[];
  rows: HeatRow[];
  className?: string | undefined;
}

/** A segment's colour in a StackedBars chart: red, amber, grey or green. */
export type StackedBarsTone = 'crit' | 'warn' | 'quiet' | 'good';

/** One colour of a StackedBars chart: a state every row is split into. */
export interface StackedBarsSeries {
  /** The key the rows' `values` use. */
  key: string;
  /** Its word in the legend and the hovers: "Crashing". */
  label: string;
  tone: StackedBarsTone;
}

/** One bar of a StackedBars chart. */
export interface StackedBarsRow {
  id: string;
  /** The row's name, at the left of its bar: "Metrics". */
  name: string;
  /** What the row is on, under its name: "on 2,114 agents". */
  total: number;
  /** The count per series key. */
  values: Record<string, number>;
}

/** The line beside a bar, in the column on the right: `lead` first (red with a dot when `alert`), then `rest`. */
export interface StackedBarsSide {
  /** "40 crashing · 1.9%". */
  lead: string;
  /** Any at all is the problem: the lead turns red with a dot. */
  alert?: boolean | undefined;
  /** " · 184 restarts". */
  rest?: string | undefined;
}

export interface StackedBarsProps {
  /** The card's heading, at the left of its title row (the legend sits at the right): "Module health" with its ⓘ. */
  title: ReactNode;
  /** The colours, in the order each bar draws them and the legend lists them. */
  series: StackedBarsSeries[];
  /** The bars, in the caller's order. */
  rows: StackedBarsRow[];
  /** What the counts count: { one: 'agent', many: 'agents' }. The axis is named with `many`. */
  unit: { one: string; many: string };
  /** The column beside the chart: each row's name again and this line. Left out, the chart takes the card's width. */
  side?: ((row: StackedBarsRow) => StackedBarsSide) | undefined;
  /** The spoken name of the column beside: "Crashing and restarts per module". */
  sideLabel?: string | undefined;
  /** A row (`'all'`) or one colour of its bar (that series' key) was clicked. */
  onPick: (row: StackedBarsRow, key: string) => void;
  /** Rendered inside the card after its body: the caller's drawer. */
  children?: ReactNode;
  className?: string | undefined;
}
