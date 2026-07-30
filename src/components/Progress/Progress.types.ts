import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { progressVariants } from './Progress';

export type ProgressVariantsType = VariantProps<typeof progressVariants>;

/** What the fill means. */
export type ProgressTone = 'default' | 'success' | 'warning' | 'danger';

export type ProgressSize = 'sm' | 'md' | 'lg';

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
   * What is being measured. Required, because a bar with no name tells a screen
   * reader nothing at all.
   */
  'aria-label': string;

  className?: string;
}

export type ProgressProps = ProgressOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'color' | 'aria-label' | 'children'>;
