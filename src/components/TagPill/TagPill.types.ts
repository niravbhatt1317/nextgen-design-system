import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { tagPillVariants as TagPillVariantsCVA } from './TagPill';

/**
 * TagPill variants derived from CVA configuration
 */
export type TagPillVariants = VariantProps<typeof TagPillVariantsCVA>;

/**
 * Props for the TagPill component
 */
export interface TagPillProps extends ComponentPropsWithoutRef<'span'>, TagPillVariants {
  /**
   * Content to display inside the tag pill
   */
  children: ReactNode;
  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;
  /**
   * Optional callback when close button is clicked.
   * When provided, renders a close button.
   */
  onClose?: () => void;
}
