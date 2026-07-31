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
 * The shadow a pinned element casts, and only while something is under it.
 *
 * `mdt-group` on the scroll container plus these `group-data-*` variants keep
 * the rule on the cell's own class list. A descendant selector would outrank
 * the cell's classes - the same specificity trap density avoids by using
 * context.
 */
// The pinned surface matches the page in BOTH themes. No tonal lift: a header
// that changes colour when it pins reads as a different surface rather than the
// same one held in place.
const STUCK_BASE = 'mdt-sticky mdt-z-sticky mdt-bg-background';

// The border is not decoration. A sticky cell leaves its row behind, and the
// row's own border does not travel with it - so a pinned header had no edge.
//
// The depth cue is a gradient band drawn by `::after`, NOT a `box-shadow`. Under
// `border-separate` every cell is its own box, so a box-shadow casts on all four
// sides and the left and right halves of adjacent cells stack into visible
// vertical seams between every column. A band pinned to the cell's full width
// only ever fades downward, and neighbouring bands butt together into one
// continuous edge.
// 16px. Long enough to read as depth rather than a second border line - 6px did
// read as a line - without the 24px reach that made the dark band look heavy.
const STUCK_SHADOW_BASE =
  "after:mdt-pointer-events-none after:mdt-absolute after:mdt-inset-x-0 after:mdt-h-4 after:mdt-opacity-0 after:mdt-transition-opacity after:mdt-content-['']";

// The edge only lightens once the row is actually pinned.
//
// At rest a sticky header should be indistinguishable from an ordinary one - a
// third-weight edge under a header that is not doing anything yet reads as
// disconnected from the table. The moment content scrolls underneath, the wash
// arrives and the border steps back to let it carry the separation.
//
// Light mode only. In dark the wash can reach about four luminance points, so
// the edge has to keep its full weight or the pinned row loses its boundary
// altogether.
const STUCK_BORDER_TOP =
  'mdt-border-border group-data-[scrolled-top=true]:mdt-border-border/30 dark:group-data-[scrolled-top=true]:mdt-border-border';
const STUCK_BORDER_BOTTOM =
  'mdt-border-border group-data-[scrolled-bottom=true]:mdt-border-border/30 dark:group-data-[scrolled-bottom=true]:mdt-border-border';

// One wash, darkening, in both themes. The band is the same 24px height in each
// - only the opacity differs, and only because the two backgrounds give it very
// different amounts of room.
//
// Light has the whole page to fall through. Dark does not: the page is
// luminance 21 and `--mdt-black` is 14, about seven points of range. But a small
// absolute dip near black is a large RELATIVE change, so dark needs far less
// opacity than the raw numbers suggest, not more. At full strength it read as a
// heavy band. Seven luminance points is the hard ceiling here - `--mdt-black` is
// lum 14 against a page of lum 21 - so 70% lands at about five, which is as much
// depth as this palette can give a dark surface without a tonal lift.
//
// This cannot be a `box-shadow`, and so cannot reuse the --mdt-shadow-* tokens:
// on a table cell a box-shadow casts on all four sides, and on a `<tr>` browsers
// still render it per cell. Either way the left and right halves stack into a
// visible seam at every column boundary. A gradient band pinned across the
// cell's width only ever fades one way, and adjacent bands butt together.
const STUCK_WASH = 'after:mdt-from-black/5 dark:after:mdt-from-black/70';

const STUCK_TOP = [
  STUCK_BASE,
  'mdt-top-0 mdt-border-b',
  STUCK_BORDER_TOP,
  STUCK_SHADOW_BASE,
  'after:mdt-top-full after:mdt-bg-gradient-to-b after:mdt-to-transparent',
  STUCK_WASH,
  'group-data-[scrolled-top=true]:after:mdt-opacity-100',
].join(' ');

const STUCK_BOTTOM = [
  STUCK_BASE,
  'mdt-bottom-0 mdt-border-t',
  STUCK_BORDER_BOTTOM,
  STUCK_SHADOW_BASE,
  'after:mdt-bottom-full after:mdt-bg-gradient-to-t after:mdt-to-transparent',
  STUCK_WASH,
  'group-data-[scrolled-bottom=true]:after:mdt-opacity-100',
].join(' ');

// A column pinned to the left edge.
//
// The same shape as the row treatment above, turned ninety degrees: an edge, and
// a band that only appears once something has slid underneath. The band is drawn
// by `::before` because `::after` already carries the row's wash - a frozen cell
// inside a pinned row uses both at once.
//
// The header variant sits on `z-sticky-header` rather than `z-sticky`. A frozen
// body cell and the frozen header cell cross at the top-left corner, and equal
// z-index would let the body cell paint over the header, because tbody comes
// after thead in the DOM.
const FROZEN_BASE = [
  'mdt-sticky mdt-left-0 mdt-bg-background',
  'mdt-border-r mdt-border-border',
  'group-data-[scrolled-x=true]:mdt-border-border/30',
  'dark:group-data-[scrolled-x=true]:mdt-border-border',
  "before:mdt-pointer-events-none before:mdt-absolute before:mdt-inset-y-0 before:mdt-left-full before:mdt-w-4 before:mdt-opacity-0 before:mdt-transition-opacity before:mdt-content-['']",
  'before:mdt-bg-gradient-to-r before:mdt-to-transparent',
  'before:mdt-from-black/5 dark:before:mdt-from-black/70',
  'group-data-[scrolled-x=true]:before:mdt-opacity-100',
].join(' ');

const FROZEN_CELL = `${FROZEN_BASE} mdt-z-sticky`;
const FROZEN_HEAD = `${FROZEN_BASE} mdt-z-sticky-header`;

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
  'mdt-border-border mdt-align-middle mdt-font-medium mdt-text-muted-foreground [&:has([role=checkbox])]:mdt-pr-0',
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
        <div
          ref={scrollRef}
          // `group` is what lets a sticky cell react to the scroll state without
          // a descendant selector, which would outrank the cell's own classes.
          className={cn('mdt-group mdt-relative mdt-w-full mdt-overflow-auto', containerClassName)}
          data-scrolled-top={scrolled.top ? 'true' : 'false'}
          data-scrolled-bottom={scrolled.bottom ? 'true' : 'false'}
          data-scrolled-x={scrolled.x ? 'true' : 'false'}
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
  ({ className, selected = false, summary = false, sticky, ...props }, ref) => {
    const { striped } = useContext(TableContext);
    const section = useContext(TableSectionContext);
    // A summary row is a conclusion, not a record - it should not offer hover
    // feedback as though it were selectable.
    const isBody = section === 'body' && !summary;

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
      children,
      ...props
    },
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
          stickyHeader && STUCK_TOP,
          frozen && FROZEN_HEAD,
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
  ({ className, align = 'left', indent = 0, frozen = false, ...props }, ref) => {
    const { density } = useContext(TableContext);
    const sticky = useContext(TableStickyRowContext);
    return (
      <td
        ref={ref}
        className={cn(
          tableCellVariants({ density, align, indent }),
          sticky === 'top' && STUCK_TOP,
          sticky === 'bottom' && STUCK_BOTTOM,
          frozen && FROZEN_CELL,
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
