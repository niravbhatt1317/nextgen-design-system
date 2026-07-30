import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { toolbarVariants as ToolbarVariantsCVA } from './Toolbar';

/**
 * Toolbar variants derived from CVA configuration
 */
export type ToolbarVariants = VariantProps<typeof ToolbarVariantsCVA>;

/**
 * Props for the Toolbar component
 */
export interface ToolbarProps extends ComponentPropsWithoutRef<'div'>, ToolbarVariants {
  /**
   * Content to display inside the toolbar
   */
  children: ReactNode;
}
