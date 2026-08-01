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
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, PaginationLinkVariants {
  /**
   * Whether this page is currently active
   */
  isActive?: boolean;

  /**
   * Where this page lives.
   *
   * **Its presence decides what gets rendered.** With an `href` this is an
   * anchor, because the page is a real address: it can be opened in a new tab,
   * bookmarked, and read by a crawler. Without one it is a `button`, because
   * the page is component state and there is nowhere to go.
   *
   * The distinction is not cosmetic. An anchor with no `href` is not focusable
   * and not announced as a link; one with `href="#"` navigates. And an anchor
   * cannot be disabled, which is exactly what a pager needs at both ends.
   */
  href?: string;

  /**
   * Greys the control out and stops it responding.
   *
   * Real on the button; on the anchor it is `aria-disabled` and removal from
   * the tab order, since HTML has no way to disable a link.
   */
  disabled?: boolean;
}

/**
 * Props for the PaginationEllipsis component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationEllipsisProps extends ComponentPropsWithoutRef<'span'> {}
