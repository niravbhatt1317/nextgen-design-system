import type * as TogglePrimitive from '@radix-ui/react-toggle';
import type { VariantProps } from 'class-variance-authority';
import type { toggleVariants as ToggleVariantsCVA } from './Toggle';

/**
 * Toggle component variants derived from CVA configuration
 */
export type ToggleVariants = VariantProps<typeof ToggleVariantsCVA>;

/**
 * Props for the Toggle component
 * Extends Radix UI Toggle primitive props with custom variants
 */
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, ToggleVariants {}
