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
  /** The big number. A number is formatted to one decimal with k or M; a string or node is shown as given. */
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

interface KpiCardCommonProps {
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

export interface KpiGaugeProps {
  /** 0 to 100. */
  percent: number;
  /** The word under the number: "capacity". */
  caption?: string | undefined;
  /** Spoken description; defaults to "<percent>% <caption>". */
  label?: string | undefined;
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
