import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { toolbarOldVariants as ToolbarVariantsCVA } from './ToolbarOld';

/**
 * ToolbarOld variants derived from CVA configuration
 */
export type ToolbarOldVariants = VariantProps<typeof ToolbarVariantsCVA>;

/**
 * Props for the ToolbarOld component
 */
export interface ToolbarOldProps extends ComponentPropsWithoutRef<'div'>, ToolbarOldVariants {
  /**
   * Content to display inside the toolbar
   */
  children: ReactNode;
}
