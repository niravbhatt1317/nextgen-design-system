import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { toolbarVariants as ToolbarVariantsCVA } from './Toolbar';

export type ToolbarVariants = VariantProps<typeof ToolbarVariantsCVA>;

/**
 * Props for Toolbar, the strip above a list.
 *
 * There is one strip, 60px tall with a 24px inset and 10px between controls.
 * It has no sizes on purpose: every list page wears the same one, and every
 * control in it is a 32px ToolbarButton or a small Input.
 */
export interface ToolbarProps extends ComponentPropsWithoutRef<'div'>, ToolbarVariants {
  /** The controls. Put the right-hand run in a ToolbarSection after a ToolbarSpacer. */
  children: ReactNode;

  /** The strip's spoken name. @default 'Toolbar' */
  label?: string | undefined;
}
