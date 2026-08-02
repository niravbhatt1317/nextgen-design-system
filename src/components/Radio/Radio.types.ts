import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type {
  radioGroupItemVariants as RadioGroupItemVariantsCVA,
  radioGroupVariants as RadioGroupVariantsCVA,
} from './Radio';

/**
 * RadioGroupItem variants derived from CVA configuration
 */
export type RadioGroupItemVariants = VariantProps<typeof RadioGroupItemVariantsCVA>;

/**
 * RadioGroup variants derived from CVA configuration
 */
export type RadioGroupVariants = VariantProps<typeof RadioGroupVariantsCVA>;

/**
 * How the group is laid out.
 *
 * `default` stacks the choices, each with its own circle. `segmented` joins
 * them into one strip - no circles, no gaps, one border round the lot.
 *
 * Both are the same control underneath: a value you submit with the form, and
 * one a screen reader announces as "Priority, radio group, Medium, 2 of 3".
 * Use `Tabs` when the point is to change what is on screen, and `ToggleGroup`
 * for a view preference that is not part of the form.
 */
export type RadioVariant = 'default' | 'segmented';

/** Segment height. Matches Button and Input at the same name. */
export type RadioSize = 'sm' | 'md';

/** Carried from the group to its segments, so it is written once. */
export interface RadioGroupContextValue {
  variant: RadioVariant;
  size: RadioSize;
  fullWidth: boolean;
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> {
  /**
   * Content to display inside the radio group
   */
  children: ReactNode;

  /** @default 'default' */
  variant?: RadioVariant;

  /**
   * Segment height, for a segmented group.
   * @default 'md'
   */
  size?: RadioSize;

  /**
   * Segments share the width equally and the strip fills its column, so it
   * lines up with the fields above and below. Only read when `segmented`.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Props for the RadioGroupItem component
 */
export interface RadioGroupItemProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'children'>,
    RadioGroupItemVariants {
  /**
   * What the item holds: the label of a segment, or the content of a card.
   */
  children?: ReactNode;

  /** Overrides the group's size for this segment alone. */
  size?: RadioSize;
}
