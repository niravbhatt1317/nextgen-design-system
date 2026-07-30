import { forwardRef } from 'react';
import { cn } from '@/utils';
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './Table.types';

/**
 * Table component - Root table element.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>A list of users</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = forwardRef<HTMLTableElement, TableProps>(({ className, children, ...props }, ref) => (
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
));
Table.displayName = 'Table';

/**
 * TableHeader component - Contains table header rows.
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *     <TableHead>Status</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:mdt-border-b', className)} {...props} />
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
 *     <TableCell>Data 1</TableCell>
 *     <TableCell>Data 2</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:mdt-border-0', className)} {...props} />
  )
);
TableBody.displayName = 'TableBody';

/**
 * TableFooter component - Contains table footer rows.
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
    <tfoot
      ref={ref}
      className={cn(
        'mdt-border-t mdt-bg-muted/50 mdt-font-medium [&>tr]:last:mdt-border-b-0',
        className
      )}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

/**
 * TableRow component - A table row.
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>Cell 1</TableCell>
 *   <TableCell>Cell 2</TableCell>
 * </TableRow>
 * ```
 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'mdt-border-b mdt-transition-colors hover:mdt-bg-muted/50 data-[state=selected]:mdt-bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

/**
 * TableHead component - A table header cell.
 *
 * @example
 * ```tsx
 * <TableHead className="mdt-w-[100px]">ID</TableHead>
 * <TableHead>Name</TableHead>
 * ```
 */
const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'mdt-h-12 mdt-px-4 mdt-text-left mdt-align-middle mdt-font-medium mdt-text-muted-foreground [&:has([role=checkbox])]:mdt-pr-0',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

/**
 * TableCell component - A table data cell.
 *
 * @example
 * ```tsx
 * <TableCell>John Doe</TableCell>
 * <TableCell className="mdt-font-medium">john@example.com</TableCell>
 * ```
 */
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('mdt-p-4 mdt-align-middle [&:has([role=checkbox])]:mdt-pr-0', className)}
      {...props}
    />
  )
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
