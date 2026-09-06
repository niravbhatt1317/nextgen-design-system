import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { toolbarButtonVariants } from './ToolbarButton';

export type ToolbarButtonVariants = VariantProps<typeof toolbarButtonVariants>;

/**
 * Props for ToolbarButton, the 32px control that lives in a Toolbar strip.
 *
 * One look, four states, by Pranjal's ruling of 4 September 2026:
 * - rest: white ground, neutral-30 edge, slate glyph and label;
 * - hover and keyboard focus: the ground lifts one step, the edge turns slate;
 * - open (its menu or drawer is showing): the same as hover;
 * - active (something is applied through it): white ground, slate edge, and a
 *   marker that says why: a count, or a dot on the top-right corner.
 *
 * Applied filters are never shown as chips. The button carries the whole signal.
 */
export interface ToolbarButtonOwnProps {
  /**
   * A 14px glyph before the label. The button sizes it, so pass the icon bare.
   * With no `children` the button becomes a 32px square; give it an `aria-label` then.
   */
  icon?: ReactNode | undefined;

  /**
   * The menu or drawer this button opens is showing. Same look as hover.
   * A Radix trigger (Popover, DropdownMenu) reports this on its own through
   * `data-state="open"`, so the prop is only needed for things like a drawer.
   * @default false
   */
  open?: boolean | undefined;

  /**
   * Something is applied through this control, so the edge stays slate at rest.
   * Implied by `count` and `dot`; pass `false` to override them.
   */
  active?: boolean | undefined;

  /**
   * How many things are applied. Renders a small slate Badge 12px after the
   * label, capped at 9+. Zero renders nothing.
   */
  count?: number | undefined;

  /**
   * A 6px dot in the info colour, centred on the top-right corner of the
   * button, for squares whose applied state has no number (the quick filter,
   * Sort). Columns has no applied state, by ruling.
   * @default false
   */
  dot?: boolean | undefined;

  /** What the count or dot means, read out to a screen reader. @default 'applied' */
  activeLabel?: string | undefined;

  /** The label. Leave it out for a square. */
  children?: ReactNode | undefined;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type ToolbarButtonProps = ToolbarButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'>;
