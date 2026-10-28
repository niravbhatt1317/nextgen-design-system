import type { CSSProperties, ReactNode } from 'react';

/** What a trend means: good, bad, a caution, or no verdict. */
export type KpiTrendTone = 'good' | 'bad' | 'caution' | 'flat';

/** The trend chip beside the number. Rendered only when the data carries a change. */
export interface KpiTrend {
  /** "4.5%", "12", "+3". */
  label: string;
  /** The arrow. Left out, the chip has none. */
  direction?: 'up' | 'down' | undefined;
  /** @default 'flat' */
  tone?: KpiTrendTone | undefined;
}

/** One metric: a card on its own, or one segment of a group. */
export interface KpiMetricProps {
  /** The metric's name, sentence case. Truncates, never wraps. */
  label: string;
  /**
   * The big number. A number is formatted to one decimal with k or M; a string or node is shown as given.
   * A node with nothing else on the segment (no hint, chip or chart) is a line of text, not a figure: the segment
   * drops its 98 floor and its 174 width floor and sizes to the line, as the drawers' facts cards do (Pranjal,
   * 2026-09-30: "why is there this empty space in the kpi card in the bottom").
   */
  value: ReactNode;
  /** The quiet line under the number. */
  hint?: ReactNode | undefined;
  /** The trend chip. */
  delta?: KpiTrend | undefined;
  /**
   * The chart area, pinned to the right. Charts only: KpiGauge, KpiBars, or any
   * chart drawn to fit 104 × 62. With a chart the card has no floor and starts at 270.
   */
  chart?: ReactNode | undefined;
  /** A quiet 16px icon top-right, only when asked for. */
  icon?: ReactNode | undefined;
  /** The switch: given, the card (or segment) is a button with the hover cue. */
  onClick?: (() => void) | undefined;
  /** The floor. 174 for a plain card, none with a chart. */
  minWidth?: number | undefined;
  /** A ceiling, only if the page wants one. Cards grow freely by default. */
  maxWidth?: number | undefined;
}

/** How loud the number is: `md` the 24px figure, `sm` a quieter 16px one. */
export type KpiCardSize = 'md' | 'sm';

/** The card's surface: `outlined` the white card on a hairline, `filled` a grey ground with no edge. */
export type KpiCardVariant = 'outlined' | 'filled';

interface KpiCardCommonProps {
  /**
   * `outlined` is the card on the page: the card ground inside the neutral-30 hairline. `filled` is the card inside
   * a drawer: the neutral-10 ground and no edge, as the facts card under a drawer's identity band draws it (Users,
   * Service accounts, Teams, Roles, Credential profiles, Secret stores, Discovery profiles and runs). Everything
   * else - the segments, the hairlines between them, the click cue - is the same on both.
   * @default 'outlined'
   */
  variant?: KpiCardVariant | undefined;
  /**
   * `sm` steps the number down from 24 to 16/24 at 600, so a card that sits beside a section's content registers
   * without competing with it (Pranjal, 2026-10-15, on the two-column settings pages: "use smaller text so that it
   * doesnt get that much attention just enough to show its there"). A card holding a chart keeps the 24 figure,
   * because the gauge beside it is drawn to that size. Only the number changes; the label, hint and chip do not.
   * @default 'md'
   */
  size?: KpiCardSize | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

/** A single card: the metric's props on the card itself. */
export interface KpiSingleCardProps extends KpiMetricProps, KpiCardCommonProps {
  items?: undefined;
}

/** A group: two or more metrics sharing one card, split by inset hairlines. */
export interface KpiGroupCardProps extends KpiCardCommonProps {
  /** The segments, in order. Each takes the metric props, including its own `onClick`. */
  items: KpiMetricProps[];
  /** Spoken name of the group ("Invitations"). */
  label?: string | undefined;
}

export type KpiCardProps = KpiSingleCardProps | KpiGroupCardProps;

export interface KpiStripProps {
  children: ReactNode;
  /** The page's side margin the strip bleeds through, so a cut card is cut at the page edge. @default 24 */
  inset?: number | undefined;
  /** @default 12 */
  gap?: number | undefined;
  /** Spoken name of the row ("Key figures"). */
  label?: string | undefined;
  /** Scrolling stops on a card's left edge. @default false */
  snap?: boolean | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

/** The gauge's outline: the half gauge for a card's chart area, or the full health ring. */
export type KpiGaugeShape = 'half' | 'ring';

export interface KpiGaugeProps {
  /** 0 to 100. */
  percent: number;
  /** The word under the number: "capacity". Drawn by the half gauge only; the ring only speaks it. */
  caption?: string | undefined;
  /** Spoken description; defaults to "<percent>% <caption>". */
  label?: string | undefined;
  /**
   * `half`: 104 × 62 in the neutral ladder, for a KpiCard's chart area.
   * `ring`: the console Overview's health ring, 150 × 150, in the success green; a thin outer ring at 100%.
   * @default 'half'
   */
  shape?: KpiGaugeShape | undefined;
  /** Ring only: the fill in the danger colour instead of the success green. @default false */
  bad?: boolean | undefined;
}

export interface KpiBarsProps {
  /** Six or so recent readings, oldest first. */
  values: number[];
  /** The base line. */
  base: number;
  /** The threshold line, drawn in the danger colour. */
  threshold: number;
  /** @default 'Base' */
  baseLabel?: string | undefined;
  /** @default '2x' */
  thresholdLabel?: string | undefined;
  /** Spoken description. */
  label?: string | undefined;
}
