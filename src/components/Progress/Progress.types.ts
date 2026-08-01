import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { progressVariants } from './Progress';

export type ProgressVariantsType = VariantProps<typeof progressVariants>;

/** What the fill means. */
export type ProgressTone = 'default' | 'success' | 'warning' | 'danger';

export type ProgressSize = 'sm' | 'md' | 'lg';

/**
 * A line of words beside the bar.
 *
 * Left and right sit at the two ends of the same line, which is what makes
 * "Storage used" and "62%" read as one sentence about one bar rather than two
 * labels that happen to be near each other. Either end may be left out; give it
 * a bare node and that is the left end on its own.
 */
export type ProgressCaption = ReactNode | { left?: ReactNode; right?: ReactNode };

/** What a swatch in the key stands for. */
export type ProgressLegendSwatch = ProgressTone | 'track' | 'baseline' | 'floor';

export interface ProgressLegendItem {
  /** What the colour means. */
  label: ReactNode;
  /** The figure behind it, set in aligned digits. Optional. */
  value?: ReactNode;
  /** @default 'default' */
  swatch?: ProgressLegendSwatch;
}

export interface ProgressOwnProps {
  /** How far along, between 0 and `max`. Clamped. */
  value: number;

  /** @default 100 */
  max?: number;

  /** @default 'default' */
  tone?: ProgressTone;

  /** @default 'md' */
  size?: ProgressSize;

  /**
   * A reference point drawn on the track, as a percentage.
   *
   * Org Mgmt's ConstraintMeter uses this for the baseline a tenant is measured
   * against - the value is fine below it and notable above it.
   */
  baseline?: number;

  /** A lower bound drawn on the track, as a percentage. */
  floor?: number;

  /**
   * The line of words above the bar. What it is about on the left, the headline
   * number on the right.
   */
  above?: ProgressCaption;

  /**
   * The line of words below the bar. The detail on the left, what is left or
   * when on the right. Quieter than the line above, because it is the footnote.
   */
  below?: ProgressCaption;

  /**
   * A key, on its own line under everything.
   *
   * **For the markers, not the fill.** One colour needs no key, so this earns
   * its place only when there is more than one thing on the track - which for a
   * progress bar means `baseline` and `floor`. A bar split into named parts is
   * `ProgressBreakdown`, not this.
   */
  legend?: ProgressLegendItem[];

  /**
   * What is being measured. Required, because a bar with no name tells a screen
   * reader nothing at all.
   */
  'aria-label': string;

  className?: string;
}

export type ProgressProps = ProgressOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'color' | 'aria-label' | 'children'>;

/** One named part of a whole. */
export interface ProgressSegment {
  /** What this part is. Shown in the key. */
  label: ReactNode;
  /** How much of `max` it takes. */
  value: number;
  /** @default 'default' */
  tone?: ProgressTone;
  /** Shown in the key instead of the raw number - "48 GB" rather than 48. */
  valueLabel?: ReactNode;
}

export interface ProgressBreakdownOwnProps {
  /** The parts, drawn in the order given. */
  segments: ProgressSegment[];

  /**
   * The whole the parts are measured against. Left out, the parts are taken to
   * be the whole and are drawn as shares of their own total.
   */
  max?: number;

  /** @default 'md' */
  size?: ProgressSize;

  /** The line of words above the bar. */
  above?: ProgressCaption;

  /** The line of words below the bar. */
  below?: ProgressCaption;

  /**
   * Name for the part of the track nothing reached - "Free", "Unassigned". With
   * it, the key gains a final entry in the track's own colour. Only used when
   * `max` is set and the parts do not fill it.
   */
  remainderLabel?: ReactNode;

  /**
   * How a raw number is written in the key.
   *
   * Used for any part with no `valueLabel`, and for the leftover - which the
   * component works out itself, so there is nowhere else to say that it is
   * gigabytes. Without it the key reads "Backups 14 GB · Free 16", which is the
   * same figure written two ways on one line.
   */
  formatValue?: (value: number) => ReactNode;

  /** @default true */
  showLegend?: boolean;

  /**
   * What the whole bar is about. Required: a breakdown is announced as one
   * picture, so this sentence is the only thing a screen reader gets.
   */
  'aria-label': string;

  className?: string;
}

export type ProgressBreakdownProps = ProgressBreakdownOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'color' | 'aria-label' | 'children'>;
