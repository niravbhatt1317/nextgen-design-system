import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, AnchorHTMLAttributes } from 'react';
import type { paginationLinkVariants as PaginationLinkVariantsCVA } from './Pagination';

/**
 * Pagination link variants from CVA
 */
export type PaginationLinkVariants = VariantProps<typeof PaginationLinkVariantsCVA>;

/**
 * Props for the Pagination component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationProps extends ComponentPropsWithoutRef<'nav'> {}

/**
 * Props for the PaginationContent component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationContentProps extends ComponentPropsWithoutRef<'ul'> {}

/**
 * Props for the PaginationItem component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationItemProps extends ComponentPropsWithoutRef<'li'> {}

/**
 * Props for the PaginationLink component
 */
export interface PaginationLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, PaginationLinkVariants {
  /**
   * Whether this page is currently active
   */
  isActive?: boolean;
}

/**
 * Props for the PaginationEllipsis component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationEllipsisProps extends ComponentPropsWithoutRef<'span'> {}
