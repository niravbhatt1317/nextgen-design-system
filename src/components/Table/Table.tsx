import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableContextValue,
  TableSection,
  TableSortOrder,
} from './Table.types';

/**
 * Density and striping are set once on `Table` but applied by every cell, so
 * they travel by context rather than by descendant selector.
 *
 * The reason is specificity. A rule like `[&_td]:mdt-p-2` on the table compiles
 * to `.class td`, which outranks a cell's own `.mdt-p-4` - so a per-cell
 * override would silently lose. Context keeps `cn()` merging working normally.
 */
const TableContext = createContext<TableContextValue>({
  density: 'default',
  striped: false,
  stickyHeader: false,
});

/** Which part of the table we are in. Striping is body-only; sticky is header-only. */
const TableSectionContext = createContext<TableSection>('body');

/**
 * `default` is exactly the spacing this table had before density existed, so an
 * existing table does not move unless it asks to.
 *
 * The `align` map is written out in full in both definitions below rather than
 * shared as a constant, and that repetition is deliberate.
 * `scripts/extract-variants.mjs` reads these definitions **statically** to build
 * `component-catalog.json` - it cannot resolve an identifier, so hoisting the
 * map to `const ALIGN` silently published `align: []` to the catalogue. A model
 * reading the catalogue would have been told this table has no alignment
 * options at all. Machine-readability is the point of this library, so it wins
 * over saving three lines.
 */
export const tableHeadVariants = cva(
  'mdt-align-middle mdt-font-medium mdt-text-muted-foreground [&:has([role=checkbox])]:mdt-pr-0',
  {
    variants: {
      density: {
        condensed: 'mdt-h-8 mdt-px-2',
        default: 'mdt-h-12 mdt-px-4',
        relaxed: 'mdt-h-14 mdt-px-6',
      },
      align: {
        left: 'mdt-text-left',
        center: 'mdt-text-center',
        right: 'mdt-text-right',
      },
    },
    defaultVariants: { density: 'default', align: 'left' },
  }
);

export const tableCellVariants = cva('mdt-align-middle [&:has([role=checkbox])]:mdt-pr-0', {
  variants: {
    density: {
      condensed: 'mdt-px-2 mdt-py-1',
      default: 'mdt-p-4',
      relaxed: 'mdt-px-6 mdt-py-5',
    },
    align: {
      left: 'mdt-text-left',
      center: 'mdt-text-center',
      right: 'mdt-text-right',
    },
  },
  defaultVariants: { density: 'default', align: 'left' },
});

export const tableRowVariants = cva('mdt-border-b mdt-transition-colors', {
  variants: {
    /** Only body rows respond to hover - a header row is not a target. */
    interactive: { true: 'hover:mdt-bg-muted/50', false: '' },
    striped: { true: 'odd:mdt-bg-muted/50', false: '' },
    selected: { true: 'mdt-bg-muted', false: '' },
  },
  compoundVariants: [
    // A selected row must stay readable in a striped table, so the stripe is
    // not applied to it at all. Suppressing the class beats relying on source
    // order, which is what `compoundVariants` running last is for.
    { striped: true, selected: true, class: 'odd:mdt-bg-muted' },
  ],
  defaultVariants: { interactive: false, striped: false, selected: false },
});

/** The icon that says "sortable" and the two that say which way. */
const SORT_ICON: Record<
  'none' | 'ascend' | 'descend',
  'arrow-up-down' | 'arrow-up' | 'arrow-down'
> = {
  none: 'arrow-up-down',
  ascend: 'arrow-up',
  descend: 'arrow-down',
};

const ARIA_SORT: Record<'none' | 'ascend' | 'descend', 'none' | 'ascending' | 'descending'> = {
  none: 'none',
  ascend: 'ascending',
  descend: 'descending',
};

const sortKey = (order: TableSortOrder): 'none' | 'ascend' | 'descend' => order ?? 'none';

/**
 * Table component - Root table element.
 *
 * @example
 * ```tsx
 * <Table density="condensed" striped stickyHeader>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead sortable sortOrder="ascend" onSort={sortByName}>Name</TableHead>
 *       <TableHead align="right">Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow selected>
 *       <TableCell>Ada Lovelace</TableCell>
 *       <TableCell align="right">1,204.00</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    { className, children, density = 'default', striped = false, stickyHeader = false, ...props },
    ref
  ) => {
    const context = useMemo<TableContextValue>(
      () => ({ density, striped, stickyHeader }),
      [density, striped, stickyHeader]
    );

    return (
      <TableContext.Provider value={context}>
        <div className="mdt-relative mdt-w-full mdt-overflow-auto">
          {/*
            Table is a compound component - headers are provided via TableHeader/TableHead children.
            Accessibility: Users must include <TableHeader> with <TableHead> cells for proper a11y.
          */}
          <table
            ref={ref}
            className={cn('mdt-w-full mdt-caption-bottom mdt-text-sm', className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
Table.displayName = 'Table';

/**
 * TableHeader component - Contains table header rows.
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <TableSectionContext.Provider value="header">
      <thead ref={ref} className={cn('[&_tr]:mdt-border-b', className)} {...props} />
    </TableSectionContext.Provider>
  )
);
TableHeader.displayName = 'TableHeader';

/**
 * TableBody component - Contains table data rows.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Data</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <TableSectionContext.Provider value="body">
      <tbody ref={ref} className={cn('[&_tr:last-child]:mdt-border-0', className)} {...props} />
    </TableSectionContext.Provider>
  )
);
TableBody.displayName = 'TableBody';

/**
 * TableFooter component - Contains table footer rows, usually a total.
 *
 * @example
 * ```tsx
 * <TableFooter>
 *   <TableRow>
 *     <TableCell colSpan={3}>Total: $1,234.00</TableCell>
 *   </TableRow>
 * </TableFooter>
 * ```
 */
const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <TableSectionContext.Provider value="footer">
      <tfoot
        ref={ref}
        className={cn(
          'mdt-border-t mdt-bg-muted/50 mdt-font-medium [&>tr]:last:mdt-border-b-0',
          className
        )}
        {...props}
      />
    </TableSectionContext.Provider>
  )
);
TableFooter.displayName = 'TableFooter';

/**
 * TableRow component - A table row.
 *
 * @example
 * ```tsx
 * <TableRow selected>
 *   <TableCell>Cell</TableCell>
 * </TableRow>
 * ```
 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, ...props }, ref) => {
    const { striped } = useContext(TableContext);
    const section = useContext(TableSectionContext);
    const isBody = section === 'body';

    return (
      <tr
        ref={ref}
        data-state={selected ? 'selected' : undefined}
        className={cn(
          tableRowVariants({
            interactive: isBody,
            striped: striped && isBody,
            selected,
          }),
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = 'TableRow';

/**
 * TableHead component - A table header cell, optionally a sort control.
 *
 * @example
 * ```tsx
 * <TableHead>Name</TableHead>
 * <TableHead align="right">Amount</TableHead>
 * <TableHead sortable sortOrder="ascend" onSort={handleSort}>Created</TableHead>
 * ```
 */
const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { className, align = 'left', sortable = false, sortOrder = null, onSort, children, ...props },
    ref
  ) => {
    const { density, stickyHeader } = useContext(TableContext);
    const key = sortKey(sortOrder);

    return (
      <th
        ref={ref}
        aria-sort={sortable ? ARIA_SORT[key] : undefined}
        className={cn(
          tableHeadVariants({ density, align }),
          // The background is required, not decoration: without it the body
          // scrolls visibly underneath the header instead of behind it.
          stickyHeader && 'mdt-sticky mdt-top-0 mdt-z-sticky mdt-bg-background',
          className
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={onSort}
            className={cn(
              'mdt-inline-flex mdt-items-center mdt-gap-1 mdt-font-medium',
              'hover:mdt-text-foreground focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
              // Keep the control flush with the cell's own alignment.
              align === 'right' && 'mdt-flex-row-reverse'
            )}
          >
            {children}
            <Icon
              name={SORT_ICON[key]}
              size="sm"
              className={cn(key === 'none' && 'mdt-opacity-50')}
              aria-hidden
            />
          </button>
        ) : (
          children
        )}
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

/**
 * TableCell component - A table data cell.
 *
 * @example
 * ```tsx
 * <TableCell>Ada Lovelace</TableCell>
 * <TableCell align="right">1,204.00</TableCell>
 * ```
 */
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const { density } = useContext(TableContext);
    return (
      <td ref={ref} className={cn(tableCellVariants({ density, align }), className)} {...props} />
    );
  }
);
TableCell.displayName = 'TableCell';

/**
 * TableCaption component - A table caption/title.
 *
 * @example
 * ```tsx
 * <TableCaption>A list of your recent invoices.</TableCaption>
 * ```
 */
const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mdt-mt-4 mdt-text-sm mdt-text-muted-foreground', className)}
      {...props}
    />
  )
);
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
