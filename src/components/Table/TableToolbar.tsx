import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { TableToolbarActionsProps, TableToolbarProps } from './Table.types';

const TOOLBAR = [
  'mdt-flex mdt-w-full mdt-flex-wrap mdt-items-center mdt-gap-2',
  // Wraps rather than scrolls. A toolbar that scrolls sideways hides controls
  // behind a gesture nobody looks for, and these are the controls that decide
  // what the table below even shows.
  'mdt-py-2',
].join(' ');

/**
 * TableToolbar - the controls that act on the whole table.
 *
 * The line between this and `TableColumnMenu` is what each one acts on. The
 * column menu asks "what about this column"; the toolbar asks "what should this
 * table show at all" - search, filters, sorting, grouping, which columns exist.
 *
 * **It is a shell, not a set of controls.** Four product teams need the same
 * spacing, the same alignment and the same wrap behaviour, and completely
 * different buttons - a service desk needs a priority quick-filter, a billing
 * table does not. Fixing the contents here would be wrong in three of the four
 * cases; fixing the arrangement is right in all of them.
 *
 * Put the searching and filtering first and the view controls in
 * `TableToolbarActions`, which pushes them to the trailing edge.
 *
 * @example
 * ```tsx
 * <TableToolbar>
 *   <Input type="search" aria-label="Search tickets" />
 *   <Button variant="outline" size="sm">Filters</Button>
 *   <TableToolbarActions>
 *     <TableSortMenu ... />
 *     <TableViewMenu ... />
 *   </TableToolbarActions>
 * </TableToolbar>
 * ```
 */
const TableToolbar = forwardRef<HTMLDivElement, TableToolbarProps>(
  ({ className, label = 'Table controls', ...props }, ref) => (
    <div
      ref={ref}
      // A toolbar role, because that is what it is: a group of controls that a
      // screen reader should announce as one thing rather than as loose buttons
      // scattered above a table.
      role="toolbar"
      aria-label={label}
      aria-orientation="horizontal"
      className={cn(TOOLBAR, className)}
      {...props}
    />
  )
);
TableToolbar.displayName = 'TableToolbar';

/**
 * The trailing group of a toolbar.
 *
 * `ml-auto` rather than `justify-between` on the toolbar itself: with a single
 * child, `justify-between` leaves it on the left, and with three it spreads
 * them across the width. Pushing one group to the end behaves the same however
 * many controls each side has.
 */
const TableToolbarActions = forwardRef<HTMLDivElement, TableToolbarActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mdt-ml-auto mdt-flex mdt-items-center mdt-gap-2', className)}
      {...props}
    />
  )
);
TableToolbarActions.displayName = 'TableToolbarActions';

export { TableToolbar, TableToolbarActions };
