import { cva } from 'class-variance-authority';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/utils';
import { TableColumnBoundary } from './TableColumnBoundary';
import {
  FROZEN_BAND,
  FROZEN_CELL,
  FROZEN_HEAD,
  FROZEN_LAST,
  FROZEN_LAST_EDGE,
  FROZEN_STICKY_CORNER,
  STUCK_BOTTOM,
  STUCK_TOP,
} from './Table.classes';

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
  TableGroupRowProps,
  TableExpandTriggerProps,
  TableContextValue,
  TableSection,
  TableSortOrder,
  TableStickyEdge,
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
  density: 'compact',
  striped: false,
  stickyHeader: false,
});

/** Which part of the table we are in. Striping is body-only; sticky is header-only. */
const TableSectionContext = createContext<TableSection>('body');

/**
 * Which edge the current row pins to, if any.
 *
 * A row cannot carry the sticky treatment itself: `position: sticky` on a `<tr>`
 * is unreliable across browsers, and a `box-shadow` on one does not render at
 * all under `border-collapse: collapse`. Both have to sit on the cells, so the
 * row announces its intent here and `TableCell` applies it.
 */
const TableStickyRowContext = createContext<TableStickyEdge | undefined>(undefined);

/**
 * Where each pinned column sits, measured from the real table.
 *
 * The first pinned column is at zero; the second starts at whatever the first
 * turned out to be. That is a runtime measurement, not a design value - the
 * width depends on content, on `layout`, and on whatever the user dragged it
 * to - so it cannot be a class and has to be measured and applied inline.
 *
 * `count` is here so a cell can tell whether it is the last pinned one, which
 * is the only one that draws the boundary and the shadow band.
 */
interface TableFrozenValue {
  offsets: number[];
  count: number;
}

const TableFrozenContext = createContext<TableFrozenValue>({ offsets: [], count: 0 });

/**
 * Resolves a `frozen` prop into a position.
 *
 * `frozen` is a boolean or an index because one pinned column - by far the
 * common case - should not have to say `frozen={0}`.
 */
const useFrozenPlacement = (frozen: boolean | number) => {
  const { offsets, count } = useContext(TableFrozenContext);
  const isFrozen = frozen !== false;
  const index = typeof frozen === 'number' ? frozen : 0;
  return {
    isFrozen,
    index,
    // With no measurement yet, `count` is 0 and a single pinned column is
    // still the last one. Without this the boundary flickers in on first paint.
    isLast: isFrozen && (count === 0 ? index === 0 : index === count - 1),
    left: isFrozen ? (offsets[index] ?? 0) : undefined,
  };
};

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
  'mdt-relative mdt-border-border mdt-align-middle mdt-font-medium mdt-text-muted-foreground [&:has([role=checkbox])]:mdt-pr-0',
  {
    variants: {
      density: {
        short: 'mdt-h-8 mdt-px-2',
        compact: 'mdt-h-10 mdt-px-3',
        default: 'mdt-h-12 mdt-px-4',
        relaxed: 'mdt-h-14 mdt-px-6',
      },
      align: {
        left: 'mdt-text-left',
        center: 'mdt-text-center',
        right: 'mdt-text-right',
      },
    },
    defaultVariants: { density: 'compact', align: 'left' },
  }
);

export const tableCellVariants = cva(
  'mdt-border-border mdt-align-middle [&:has([role=checkbox])]:mdt-pr-0',
  {
    variants: {
      density: {
        short: 'mdt-px-2 mdt-py-1',
        compact: 'mdt-px-3 mdt-py-2',
        default: 'mdt-p-4',
        relaxed: 'mdt-px-6 mdt-py-5',
      },
      align: {
        left: 'mdt-text-left',
        center: 'mdt-text-center',
        right: 'mdt-text-right',
      },
      // Declared after `density` so its left padding wins - CVA applies variants
      // in declaration order, and `pl-*` has to override the `px-*` above it.
      //
      // Tailwind's own steps, evenly spaced 1.5rem apart. No arbitrary values:
      // spacing has no tokens yet, so the default scale is the correct thing to
      // use, but a raw `pl-[5.5rem]` would be a violation.
      indent: {
        0: '',
        1: 'mdt-pl-8',
        2: 'mdt-pl-14',
        3: 'mdt-pl-20',
      },
    },
    defaultVariants: { density: 'compact', align: 'left', indent: 0 },
  }
);

export const tableRowVariants = cva('mdt-transition-colors [&>*]:mdt-border-b', {
  variants: {
    /** Only body rows respond to hover - a header row is not a target. */
    interactive: { true: 'hover:mdt-bg-muted/50', false: '' },
    striped: { true: 'odd:mdt-bg-muted/50', false: '' },
    selected: { true: 'mdt-bg-muted', false: '' },
    /** A total or subtotal - reads as a conclusion rather than another record. */
    summary: { true: 'mdt-bg-muted/50 mdt-font-medium', false: '' },
  },
  compoundVariants: [
    // A selected row must stay readable in a striped table, so the stripe is
    // not applied to it at all. Suppressing the class beats relying on source
    // order, which is what `compoundVariants` running last is for.
    { striped: true, selected: true, class: 'odd:mdt-bg-muted' },
    // A summary row needs no equivalent: `TableRow` never passes `striped` for
    // one, because a total carries its own tint and a stripe under it muddies
    // both. Handling it there keeps this list free of a branch that can never
    // be reached.
  ],
  defaultVariants: {
    interactive: false,
    striped: false,
    selected: false,
    summary: false,
  },
});

/**
 * The group header row that spans the whole table.
 *
 * Grouped rows were the commonest structure across the reference tables - Jira,
 * Height, ClickUp, GitHub Projects, Attio and bank statements all use them.
 */
export const tableGroupRowVariants = cva(
  'mdt-bg-muted/50 mdt-font-medium mdt-text-foreground [&>*]:mdt-border-b'
);

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
    {
      className,
      children,
      density = 'compact',
      striped = false,
      stickyHeader = false,
      maxHeight,
      layout = 'auto',
      containerClassName,
      ...props
    },
    ref
  ) => {
    const context = useMemo<TableContextValue>(
      () => ({ density, striped, stickyHeader }),
      [density, striped, stickyHeader]
    );

    // A pinned row should only cast a shadow while something is actually
    // scrolled underneath it. A total sitting at the true end of the data is
    // not floating over anything, and a shadow there is a lie about depth.
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState({ top: false, bottom: false, x: false });
    // Cumulative left offsets for the pinned columns, measured off the header.
    const [frozen, setFrozen] = useState<TableFrozenValue>({ offsets: [], count: 0 });

    const measure = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      const atTop = el.scrollTop <= 0;
      // One pixel of slack: fractional scroll heights on high-density displays
      // otherwise leave `bottom` permanently true.
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      // Horizontal is one flag, not two: a frozen column only ever pins to the
      // left, so all it needs to know is whether anything has slid under it.
      const scrolledX = el.scrollLeft > 0;
      setScrolled((prev) =>
        prev.top === !atTop && prev.bottom === !atBottom && prev.x === scrolledX
          ? prev
          : { top: !atTop, bottom: !atBottom, x: scrolledX }
      );

      // Measure off the header row rather than the body: it is the row that is
      // always present, and its cells are the ones the widths come from.
      const cells = el.querySelectorAll<HTMLElement>('thead tr:first-child > [data-frozen-index]');
      const widths: number[] = [];
      cells.forEach((cell) => {
        const index = Number(cell.dataset.frozenIndex);
        if (Number.isNaN(index)) return;
        widths[index] = cell.getBoundingClientRect().width;
      });
      const offsets: number[] = [];
      let running = 0;
      for (let i = 0; i < widths.length; i += 1) {
        offsets[i] = running;
        running += widths[i] ?? 0;
      }
      setFrozen((prev) =>
        prev.count === offsets.length && prev.offsets.every((value, i) => value === offsets[i])
          ? prev
          : { offsets, count: offsets.length }
      );
    }, []);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return undefined;
      measure();
      el.addEventListener('scroll', measure, { passive: true });
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      return () => {
        el.removeEventListener('scroll', measure);
        observer.disconnect();
      };
    }, [measure, children]);

    return (
      <TableContext.Provider value={context}>
        <TableFrozenContext.Provider value={frozen}>
          <div
            ref={scrollRef}
            // `group` is what lets a sticky cell react to the scroll state without
            // a descendant selector, which would outrank the cell's own classes.
            className={cn(
              'mdt-group mdt-relative mdt-w-full mdt-overflow-auto',
              containerClassName
            )}
            // Lets a drag inside the table find what to scroll.
            data-table-scroller=""
            data-scrolled-top={scrolled.top ? 'true' : 'false'}
            data-scrolled-bottom={scrolled.bottom ? 'true' : 'false'}
            data-scrolled-x={scrolled.x ? 'true' : 'false'}
            // Whether the pinned corner should draw its own header wash. Two
            // `group-data-*` variants cannot be chained - Tailwind nests them into
            // a selector that never matches - so the condition is computed once
            // here instead.
            data-corner-wash={scrolled.top && !scrolled.x ? 'true' : 'false'}
            style={maxHeight === undefined ? undefined : { maxHeight }}
          >
            {/*
            Table is a compound component - headers are provided via TableHeader/TableHead children.
            Accessibility: Users must include <TableHeader> with <TableHead> cells for proper a11y.
          */}
            <table
              ref={ref}
              className={cn(
                // `border-separate` rather than the usual `collapse`, and this is
                // load-bearing: browsers do not paint `box-shadow` on a table cell
                // under the collapsed border model. A sticky header's shadow was
                // being reported by getComputedStyle and rendered by nothing.
                //
                // The cost is that borders on a `<tr>` stop rendering entirely, so
                // every row divider below sits on the cells instead.
                'mdt-w-full mdt-caption-bottom mdt-border-separate mdt-border-spacing-0 mdt-text-sm',
                layout === 'fixed' && 'mdt-table-fixed',
                className
              )}
              {...props}
            >
              {children}
            </table>
          </div>
        </TableFrozenContext.Provider>
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
      <thead ref={ref} className={cn('[&_tr>*]:mdt-border-b', className)} {...props} />
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
      <tbody ref={ref} className={cn('[&_tr:last-child>*]:mdt-border-b-0', className)} {...props} />
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
          'mdt-bg-muted/50 mdt-font-medium [&>tr]:last:[&>*]:mdt-border-b-0 [&_tr>*]:mdt-border-t',
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
  ({ className, selected = false, summary = false, sticky, interactive, ...props }, ref) => {
    const { striped } = useContext(TableContext);
    const section = useContext(TableSectionContext);
    // A summary row is a conclusion, not a record - it should not offer hover
    // feedback as though it were selectable.
    // `interactive` overrides the default when the caller has an opinion; a
    // summary row is a conclusion rather than a record, so it never offers it.
    const isBody = interactive ?? (section === 'body' && !summary);

    return (
      <TableStickyRowContext.Provider value={sticky}>
        <tr
          ref={ref}
          data-state={selected ? 'selected' : undefined}
          className={cn(
            tableRowVariants({
              summary,
              interactive: isBody,
              striped: striped && isBody,
              selected,
            }),
            className
          )}
          {...props}
        />
      </TableStickyRowContext.Provider>
    );
  }
);
TableRow.displayName = 'TableRow';

/**
 * TableGroupRow component - a heading row that spans the whole table.
 *
 * Grouping was the commonest structure across the reference tables. Pass
 * `onToggle` to make the group collapsible; leave it off and no control is
 * rendered at all, rather than a dead one.
 *
 * @example
 * ```tsx
 * <TableGroupRow colSpan={4} count={12} expanded={open} onToggle={toggle}>
 *   Mobile App
 * </TableGroupRow>
 * ```
 */
const TableGroupRow = forwardRef<HTMLTableRowElement, TableGroupRowProps>(
  (
    { className, colSpan, count, expanded = true, onToggle, toggleLabel, children, ...props },
    ref
  ) => {
    const { density } = useContext(TableContext);

    const label = (
      <>
        <span>{children}</span>
        {count !== undefined && (
          <span className="mdt-font-normal mdt-text-muted-foreground">{count}</span>
        )}
      </>
    );

    return (
      <tr ref={ref} className={cn(tableGroupRowVariants(), className)} {...props}>
        <td colSpan={colSpan} className={cn(tableCellVariants({ density }))}>
          {onToggle ? (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-label={toggleLabel ?? (typeof children === 'string' ? children : 'Toggle group')}
              className={cn(
                'mdt-inline-flex mdt-items-center mdt-gap-2 mdt-font-medium',
                'hover:mdt-text-foreground focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
              )}
            >
              {/* Same disclosure glyphs Sidebar uses for the same job. */}
              <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size="sm" aria-hidden />
              {label}
            </button>
          ) : (
            <span className="mdt-inline-flex mdt-items-center mdt-gap-2">{label}</span>
          )}
        </td>
      </tr>
    );
  }
);
TableGroupRow.displayName = 'TableGroupRow';

/**
 * TableExpandTrigger component - the disclosure control for a row that reveals
 * child rows beneath it.
 *
 * Deliberately a separate control you place in a cell rather than a prop on
 * `TableRow`. Where the chevron belongs differs from table to table, and the
 * component has no business owning your tree state.
 *
 * @example
 * ```tsx
 * <TableCell>
 *   <TableExpandTrigger expanded={open} onToggle={toggle} label="Show entries" />
 * </TableCell>
 * ```
 */
const TableExpandTrigger = forwardRef<HTMLButtonElement, TableExpandTriggerProps>(
  ({ className, expanded, onToggle, label = 'Toggle row', ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={label}
      className={cn(
        'mdt-inline-flex mdt-items-center mdt-justify-center mdt-rounded-sm',
        'mdt-text-muted-foreground hover:mdt-text-foreground',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
        className
      )}
      {...props}
    >
      <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size="sm" aria-hidden />
    </button>
  )
);
TableExpandTrigger.displayName = 'TableExpandTrigger';

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
    {
      className,
      align = 'left',
      sortable = false,
      sortOrder = null,
      onSort,
      frozen = false,
      columnKey,
      resizable = false,
      width,
      onResize,
      minWidth = 64,
      maxWidth = 720,
      resizeLabel,
      insertColumns,
      insertSuggested,
      onInsert,
      insertLabel,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { density, stickyHeader } = useContext(TableContext);
    const pinned = useFrozenPlacement(frozen);
    const key = sortKey(sortOrder);

    return (
      <th
        ref={ref}
        aria-sort={sortable ? ARIA_SORT[key] : undefined}
        // The measurement finds pinned columns by this attribute.
        data-frozen-index={pinned.isFrozen ? pinned.index : undefined}
        data-column-key={columnKey}
        style={{
          ...style,
          ...(width === undefined ? null : { width }),
          ...(pinned.left === undefined ? null : { left: pinned.left }),
        }}
        className={cn(
          tableHeadVariants({ density, align }),
          // `relative` is in the base class now rather than here: the resize
          // handle, the insertion point and anything else absolute inside a
          // header all need a positioned ancestor, and a caller adding
          // `mdt-relative` themselves would silently beat the `sticky` a frozen
          // column depends on - `className` merges last, and last wins.
          // The background is required, not decoration: without it the body
          // scrolls visibly underneath the header instead of behind it.
          // Never both: layering them would emit two z-index utilities that
          // `cn()` cannot merge.
          pinned.isFrozen && stickyHeader && FROZEN_STICKY_CORNER,
          !pinned.isFrozen && stickyHeader && STUCK_TOP,
          pinned.isFrozen && !stickyHeader && FROZEN_HEAD,
          // Only the last pinned column carries the boundary...
          pinned.isLast && FROZEN_LAST_EDGE,
          // ...and the band, except on the corner, which resolves the crossing
          // of two gradients by leaving one out rather than blending them.
          pinned.isLast && !stickyHeader && FROZEN_BAND,
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
        {(resizable || onInsert !== undefined) && (
          <TableColumnBoundary
            resizable={resizable}
            {...(width === undefined ? {} : { width })}
            {...(onResize === undefined ? {} : { onResize })}
            minWidth={minWidth}
            maxWidth={maxWidth}
            resizeLabel={
              resizeLabel ?? (typeof children === 'string' ? `Resize ${children}` : 'Resize column')
            }
            {...(insertColumns === undefined ? {} : { columns: insertColumns })}
            {...(insertSuggested === undefined ? {} : { suggested: insertSuggested })}
            {...(onInsert === undefined ? {} : { onInsert })}
            insertLabel={
              insertLabel ??
              (typeof children === 'string'
                ? `Insert a column after ${children}`
                : 'Insert a column here')
            }
          />
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
  ({ className, align = 'left', indent = 0, frozen = false, columnKey, style, ...props }, ref) => {
    const { density } = useContext(TableContext);
    const sticky = useContext(TableStickyRowContext);
    const pinned = useFrozenPlacement(frozen);
    return (
      <td
        ref={ref}
        data-frozen-index={pinned.isFrozen ? pinned.index : undefined}
        data-column-key={columnKey}
        style={pinned.left === undefined ? style : { ...style, left: pinned.left }}
        className={cn(
          tableCellVariants({ density, align, indent }),
          sticky === 'top' && STUCK_TOP,
          sticky === 'bottom' && STUCK_BOTTOM,
          pinned.isFrozen && FROZEN_CELL,
          pinned.isLast && FROZEN_LAST,
          className
        )}
        {...props}
      />
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

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableGroupRow,
  TableExpandTrigger,
  TableHead,
  TableCell,
  TableCaption,
};
