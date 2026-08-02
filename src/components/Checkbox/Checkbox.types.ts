import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { checkboxVariants as CheckboxVariantsCVA } from './Checkbox';

/**
 * Checkbox variants derived from CVA configuration
 */
export type CheckboxVariants = VariantProps<typeof CheckboxVariantsCVA>;

/**
 * How a group of choices is laid out.
 *
 * `chip` is a row of separate outlined chips that wraps onto the next line, each
 * taking a tick on the right when chosen. `default` stacks them, each with its
 * own box.
 *
 * Both are the same control underneath: several answers, all submitted with the
 * form, each announced as a checkbox. `Radio`'s segmented strip is the one-of
 * counterpart - joined says "one of these", separate says "as many as you like".
 * `TagPill` is neither: it shows what has already been chosen and offers a cross
 * to take it away.
 */
export type CheckboxGroupVariant = 'default' | 'chip';

/** Chip height. `md` is 32px, clear of TagPill's 24px. */
export type CheckboxSize = 'sm' | 'md';

/** Carried from the group to its chips, so it is written once. */
export interface CheckboxGroupContextValue {
  variant: CheckboxGroupVariant;
  size: CheckboxSize;
}

/**
 * Props for the CheckboxGroup component
 */
export interface CheckboxGroupProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'aria-label'
> {
  children?: ReactNode;

  /** @default 'chip' */
  variant?: CheckboxGroupVariant;

  /**
   * Chip height, for a chip group.
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * What the choices are for, read out before the chips themselves. Without it
   * a screen reader announces six checkboxes and no reason for them.
   */
  label?: string;
}

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'>,
    CheckboxVariants {
  /**
   * What the checkbox holds: the label of a chip, or the content of a card.
   */
  children?: ReactNode;

  /** Overrides the group's size for this chip alone. */
  size?: CheckboxSize;
}
