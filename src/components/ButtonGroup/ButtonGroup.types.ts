import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import type { buttonGroupVariants as ButtonGroupVariantsCVA } from './ButtonGroup';

/**
 * ButtonGroup variants derived from CVA configuration
 */
export type ButtonGroupVariants = VariantProps<typeof ButtonGroupVariantsCVA>;

/**
 * Props for the ButtonGroup component
 */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, ButtonGroupVariants {
  /**
   * Button elements to group together
   */
  children: ReactNode;

  /**
   * Orientation of the button group
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Visual style variant
   * - 'attached': Buttons are seamlessly connected
   * - 'default': Buttons have spacing between them
   * @default 'attached'
   */
  variant?: 'attached' | 'default';

  /**
   * Size variant (affects spacing)
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether the button group should take full width
   * @default false
   */
  fullWidth?: boolean;
}
