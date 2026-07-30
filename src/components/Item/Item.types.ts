import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode, MouseEvent } from 'react';
import type { itemVariants as ItemVariantsCVA } from './Item';

/**
 * Item variants from CVA
 */
export type ItemVariants = VariantProps<typeof ItemVariantsCVA>;

/**
 * Props for the Item component
 */
export interface ItemProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>, Omit<ItemVariants, 'clickable'> {
  /**
   * Icon to display before the label
   */
  icon?: ReactNode;
  /**
   * Main label text
   */
  label?: string;
  /**
   * Secondary description text
   */
  description?: string;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Whether the item is currently active/selected
   */
  active?: boolean;
  /**
   * Click handler
   */
  onClick?: (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}
