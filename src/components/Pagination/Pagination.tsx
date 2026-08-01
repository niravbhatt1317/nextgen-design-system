import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationEllipsisProps,
} from './Pagination.types';

/**
 * Pagination link variants using CVA
 */
const paginationLinkVariants = cva(
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-h-9 mdt-min-w-9 mdt-px-3',
    'mdt-rounded-md mdt-text-sm mdt-font-medium',
    'mdt-transition-colors',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
  ],
  {
    variants: {
      variant: {
        default:
          'mdt-bg-transparent mdt-text-foreground hover:mdt-bg-muted hover:mdt-text-foreground',
        outline:
          'mdt-border mdt-border-input mdt-bg-background hover:mdt-bg-muted hover:mdt-text-foreground',
        active: 'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90',
      },
      size: {
        sm: 'mdt-h-8 mdt-min-w-8 mdt-px-2 mdt-text-xs',
        md: 'mdt-h-9 mdt-min-w-9 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-min-w-10 mdt-px-4 mdt-text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Pagination root component.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={cn('mdt-flex mdt-w-full mdt-justify-center', className)}
    {...props}
  />
));
Pagination.displayName = 'Pagination';

/**
 * PaginationContent - container for pagination items.
 */
const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('mdt-flex mdt-flex-row mdt-items-center mdt-gap-1', className)}
      {...props}
    />
  )
);
PaginationContent.displayName = 'PaginationContent';

/**
 * PaginationItem - wrapper for each pagination item.
 */
const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

/**
 * PaginationLink - one page control.
 *
 * **An anchor with an `href`, a button without one.** Both kinds of pager are
 * real: `/tickets?page=3` is an address worth having - openable in a new tab,
 * bookmarkable, crawlable - while a table that pages in place has nowhere to
 * go, and its controls are state.
 *
 * Rendering an anchor for both is the version of this that looks fine and is
 * not: an `<a>` with no `href` is neither focusable nor announced as a link,
 * one with `href="#"` navigates, and no anchor can be disabled - which a pager
 * needs at both ends.
 *
 * @example
 * ```tsx
 * <PaginationLink href="/tickets?page=2">2</PaginationLink>
 * <PaginationLink onClick={() => { goTo(2); }} isActive>2</PaginationLink>
 * ```
 */
const PaginationLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = 'md', href, disabled = false, children, ...props }, ref) => {
    const shared = {
      'aria-current': isActive ? ('page' as const) : undefined,
      className: cn(
        paginationLinkVariants({ variant: isActive ? 'active' : 'default', size }),
        // The CVA base disables through `:disabled`, which an anchor never
        // matches. Both paths need the same look, so the state carries it.
        disabled && 'mdt-pointer-events-none mdt-opacity-50',
        className
      ),
    };

    if (href === undefined) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          {...shared}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        // HTML has no disabled link. Taking it out of the tab order and saying
        // so is the whole of what can be done, and it is what a screen reader
        // needs anyway.
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...shared}
        {...props}
      >
        {children}
      </a>
    );
  }
);
PaginationLink.displayName = 'PaginationLink';

/**
 * PaginationPrevious - previous page button.
 */
const PaginationPrevious = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PaginationLinkProps & { label?: string }
>(({ className, label = 'Previous', ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    className={cn('mdt-gap-1 mdt-pl-2.5', className)}
    {...props}
  >
    <Icon name="chevron-left" size="sm" aria-hidden />
    <span>{label}</span>
  </PaginationLink>
));
PaginationPrevious.displayName = 'PaginationPrevious';

/**
 * PaginationNext - next page button.
 */
const PaginationNext = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PaginationLinkProps & { label?: string }
>(({ className, label = 'Next', ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    className={cn('mdt-gap-1 mdt-pr-2.5', className)}
    {...props}
  >
    <span>{label}</span>
    <Icon name="chevron-right" size="sm" aria-hidden />
  </PaginationLink>
));
PaginationNext.displayName = 'PaginationNext';

/**
 * PaginationEllipsis - shows ellipsis for skipped pages.
 */
const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn('mdt-flex mdt-h-9 mdt-w-9 mdt-items-center mdt-justify-center', className)}
      {...props}
    >
      <Icon name="more-horizontal" size="sm" aria-hidden />
      <span className="mdt-sr-only">More pages</span>
    </span>
  )
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationLinkVariants,
};
