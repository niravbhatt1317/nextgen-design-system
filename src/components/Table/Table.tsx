import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useCallback, useContext, useRef, useState } from 'react';
import type {
  KeyboardEvent,
  MouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';
import { cn } from '@/utils';
import { Checkbox } from '../Checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../DropdownMenu';
import { Icon } from '../Icon';
import type {
  TableAlign,
  TableCellProps,
  TableColGroupProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSelectAllProps,
  TableSelectionCellProps,
  TableViewportProps,
} from './Table.types';
import './table.css';

/** The width of the row-number column and of the elastic tail. */
export const TABLE_GUTTER = 60;
/** Every content column starts here on the console; a person can drag it from 120 to 720. */
export const TABLE_COLUMN_WIDTH = 200;
export const TABLE_COLUMN_MIN = 120;
export const TABLE_COLUMN_MAX = 720;

const ALIGN: Record<TableAlign, string> = {
  left: 'mdt-text-left',
  center: 'mdt-text-center',
  right: 'mdt-text-right mdt-tabular-nums',
};

/**
 * Table cell styles: 54px rows, a 16px inset, 12px type. Frozen cells stay put
 * while the table scrolls sideways.
 */
export const tableCellVariants = cva(
  [
    'tbl-cell mdt-h-[54px] mdt-px-4 mdt-py-[5px] mdt-align-middle',
    'mdt-overflow-hidden mdt-text-ellipsis mdt-whitespace-nowrap',
    'mdt-bg-background mdt-text-neutral-130 dark:mdt-text-neutral-10',
  ],
  {
    variants: {
      frozen: { true: 'mdt-sticky mdt-z-[2]', false: '' },
      align: ALIGN,
    },
    defaultVariants: { frozen: false, align: 'left' },
  }
);

/**
 * Heading styles: 40px tall, 11px slate type, sticky to the top of the region.
 * The grip, the sort arrow and the "⋯" menu are revealed by table.css.
 */
export const tableHeadVariants = cva(
  [
    'tbl-head mdt-relative mdt-h-10 mdt-px-4 mdt-py-px mdt-align-middle',
    'mdt-text-[11px] mdt-font-normal mdt-leading-[1.5] mdt-text-neutral-90 dark:mdt-text-neutral-40',
    'mdt-select-none mdt-whitespace-nowrap mdt-bg-background',
    'mdt-sticky mdt-top-0 mdt-z-[3]',
  ],
  {
    variants: {
      frozen: { true: 'mdt-z-[4]', false: '' },
      align: ALIGN,
    },
    defaultVariants: { frozen: false, align: 'left' },
  }
);

/** Row styles. Hover, selected and focus are drawn by table.css across the row's cells. */
export const tableRowVariants = cva(['tbl-row mdt-outline-none'], {
  variants: {
    inert: { true: 'mdt-cursor-default', false: 'mdt-cursor-pointer' },
  },
  defaultVariants: { inert: false },
});

/**
 * How far the card has become the page: 0 at rest, 1 docked. `driven` means a
 * page is scrolling this card to its dock line, so the card takes the page's
 * height and its rows are clipped, not scrolled, until the dock.
 */
export interface TableMorph {
  morph: number;
  driven: boolean;
}
const TableMorphContext = createContext<TableMorph>({ morph: 0, driven: false });
export const useTableMorph = (): TableMorph => useContext(TableMorphContext);

/** `docked` read: `true` is 1, a number is clamped to 0..1, `false` or unset is an ordinary card. */
export function tableMorphOf(docked: boolean | number | undefined): TableMorph {
  if (docked === true) return { morph: 1, driven: true };
  if (docked === false || docked === undefined) return { morph: 0, driven: false };
  return { morph: Math.min(1, Math.max(0, docked)), driven: true };
}

/**
 * Table - the card that holds a list: rows, a bulk bar and a pager.
 *
 * @example
 * ```tsx
 * <Table label="Users">
 *   <TableViewport tableWidth={1637} maxHeight={600}>
 *     <TableColGroup widths={[60, 200, 100, 217, 200]} />
 *     <TableHeader>…</TableHeader>
 *     <TableBody>…</TableBody>
 *   </TableViewport>
 *   <TablePager … />
 * </Table>
 * ```
 */
const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  { className, label, divider = 'default', docked, style, children, ...props },
  ref
) {
  const state = tableMorphOf(docked);
  const { morph } = state;
  return (
    <TableMorphContext.Provider value={state}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        data-divider={divider}
        data-docked={morph >= 1}
        className={cn(
          'tbl mdt-relative mdt-flex mdt-flex-col mdt-border mdt-border-solid mdt-border-neutral-20 mdt-bg-background dark:mdt-border-neutral-120',
          'mdt-font-sans mdt-text-neutral-130 dark:mdt-text-neutral-10',
          className
        )}
        style={{ ...style, '--tbl-morph': morph } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    </TableMorphContext.Provider>
  );
});
Table.displayName = 'Table';

/** The scrolling region and the `<table>` inside it. Headings stick to its top. */
const TableViewport = forwardRef<HTMLDivElement, TableViewportProps>(function TableViewport(
  {
    className,
    maxHeight = 600,
    tableWidth,
    rowCount,
    refreshing = false,
    hasSelection = false,
    label,
    children,
    ...props
  },
  ref
) {
  const [scrolledX, setScrolledX] = useState(false);
  const { morph, driven } = useTableMorph();
  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrolledX(e.currentTarget.scrollLeft > 0);
  }, []);
  return (
    <div
      ref={ref}
      data-scrolled-x={scrolledX}
      data-clip={driven && morph < 1}
      onScroll={onScroll}
      className={cn('tbl-viewport mdt-relative mdt-overflow-auto', className)}
      style={driven ? undefined : { maxHeight }}
      {...props}
    >
      <table
        className="tbl-table mdt-table-fixed mdt-border-separate mdt-border-spacing-0 mdt-text-xs mdt-leading-[1.45]"
        style={{ width: tableWidth }}
        aria-label={label}
        aria-rowcount={rowCount}
        data-has-selection={hasSelection}
        data-refreshing={refreshing}
      >
        {children}
      </table>
    </div>
  );
});
TableViewport.displayName = 'TableViewport';

/** One `<col>` per visible column plus the 60px elastic tail. */
function TableColGroup({ widths }: TableColGroupProps) {
  return (
    <colgroup>
      {widths.map((w, i) => (
        // eslint-disable-next-line react/no-array-index-key -- a col has no identity but its position
        <col key={i} style={{ width: w }} />
      ))}
      <col style={{ width: TABLE_GUTTER }} />
    </colgroup>
  );
}

const TableHeader = forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'thead'>>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn('tbl-header', className)} {...props} />;
  }
);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tbody'>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn('tbl-body', className)} {...props} />;
  }
);
TableBody.displayName = 'TableBody';

const INTERACTIVE =
  'button, a, input, select, textarea, [role="menu"], [role="dialog"], [data-no-open]';

/**
 * A row. Focusable: Space picks it, Enter opens it, the arrow keys move to the
 * next row. A click on the row body opens it; clicks on controls inside do not.
 */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  {
    className,
    selected = false,
    inert = false,
    onOpen,
    onToggle,
    onArrow,
    onClick,
    onKeyDown,
    children,
    ...props
  },
  ref
) {
  const handleClick = (e: MouseEvent<HTMLTableRowElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
    if (!inert) onOpen?.();
  };
  const handleKey = (e: KeyboardEvent<HTMLTableRowElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.target !== e.currentTarget) return;
    if (e.key === ' ') {
      e.preventDefault();
      if (!inert) onToggle?.(e.shiftKey);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!inert) onOpen?.();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      onArrow?.(e.key === 'ArrowDown' ? 1 : -1);
    }
  };
  return (
    <tr
      ref={ref}
      tabIndex={0}
      data-state={selected ? 'selected' : undefined}
      data-inert={inert ? '' : undefined}
      aria-selected={inert ? undefined : selected}
      className={cn(tableRowVariants({ inert }), className)}
      onClick={handleClick}
      onKeyDown={handleKey}
      {...props}
    >
      {children}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  {
    className,
    frozen,
    frozenEdge = false,
    align = 'left',
    dragging = false,
    style,
    children,
    ...props
  },
  ref
) {
  return (
    <td
      ref={ref}
      data-dragging={dragging || undefined}
      className={cn(
        tableCellVariants({ frozen: frozen !== undefined, align }),
        frozenEdge && 'tbl-frozen-edge',
        className
      )}
      style={frozen !== undefined ? { ...style, left: frozen } : style}
      {...props}
    >
      {children}
    </td>
  );
});
TableCell.displayName = 'TableCell';

/**
 * A heading. Sortable ones sort on click. Movable ones show a grip and a "⋯"
 * menu on hover; resizable ones carry a handle on their right boundary that
 * drags, or moves 16px per arrow key.
 */
const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  {
    className,
    columnKey,
    label,
    width,
    minWidth = TABLE_COLUMN_MIN,
    frozen,
    frozenEdge = false,
    align = 'left',
    sortable = false,
    sort = null,
    onSort,
    movable = false,
    onGripPointerDown,
    onGripMove,
    menu,
    glyph,
    filtered = false,
    dragging = false,
    resizable = false,
    onResize,
    onBoundaryHover,
    style,
    children,
    ...props
  },
  ref
) {
  const [menuOpen, setMenuOpen] = useState(false);
  const startX = useRef(0);
  const startW = useRef(width);
  const moved = useRef(false);

  const sortKey = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSort?.();
    }
  };
  const gripKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      onGripMove?.(e.key === 'ArrowLeft' ? -1 : 1);
    }
  };
  const rzDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startX.current = e.clientX;
    startW.current = width;
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const rzMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 1) moved.current = true;
    onResize?.(clampWidth(startW.current + dx, minWidth), false);
  };
  const rzUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (moved.current) onResize?.(width, true);
  };
  const rzKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 16 : e.key === 'ArrowLeft' ? -16 : 0;
    if (step) onResize?.(clampWidth(width + step, minWidth), true);
    else if (e.key === 'Home') onResize?.(minWidth, true);
    else if (e.key === 'End') onResize?.(TABLE_COLUMN_MAX, true);
    else return;
    e.preventDefault();
  };

  return (
    <th
      ref={ref}
      scope="col"
      data-key={columnKey}
      data-movable={movable}
      data-sortable={sortable}
      data-filtered={filtered || undefined}
      data-dragging={dragging || undefined}
      data-open={menuOpen || undefined}
      aria-sort={sort ? (sort === 'asc' ? 'ascending' : 'descending') : undefined}
      className={cn(
        tableHeadVariants({ frozen: frozen !== undefined, align }),
        frozenEdge && 'tbl-frozen-edge',
        className
      )}
      style={{ ...style, width, left: frozen }}
      {...props}
    >
      {movable && (
        <button
          type="button"
          className="tbl-grip mdt-absolute mdt-left-4 mdt-top-3 mdt-h-4 mdt-w-3.5 mdt-cursor-grab mdt-items-center mdt-justify-center mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-neutral-40 active:mdt-cursor-grabbing dark:mdt-text-neutral-90"
          aria-label={`Move column ${label}. Arrow keys move it one place`}
          onPointerDown={onGripPointerDown}
          onKeyDown={gripKey}
        >
          <Icon name="grip-vertical" size={14} />
        </button>
      )}
      <span
        className={cn(
          'tbl-hcell mdt-inline-flex mdt-max-w-full mdt-items-center',
          sortable && 'mdt-cursor-pointer'
        )}
        {...(sortable
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `Sort by ${label}`,
              onClick: onSort,
              onKeyDown: sortKey,
            }
          : {})}
      >
        {glyph && (
          <span className="tbl-glyph mdt-mr-2 mdt-inline-flex mdt-w-3.5 mdt-justify-center mdt-text-neutral-90 dark:mdt-text-neutral-40 [&_svg]:mdt-size-3.5">
            {glyph}
          </span>
        )}
        <span className="mdt-overflow-hidden mdt-text-ellipsis">{children ?? label}</span>
        {sortable && (
          <span
            className="tbl-sortmark mdt-ml-2 mdt-text-azure-60 [&_svg]:mdt-size-3"
            aria-hidden="true"
          >
            <Icon name="arrow-up" size={12} />
          </span>
        )}
      </span>
      {movable && menu && (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="tbl-more mdt-absolute mdt-right-2 mdt-top-2.5 mdt-h-5 mdt-w-5 mdt-items-center mdt-justify-center mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-neutral-90 dark:mdt-text-neutral-40"
              aria-label={`Options for ${label}`}
            >
              <Icon name="more-horizontal" size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mdt-w-48">
            {menu}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {resizable && (
        <div
          className="tbl-rz mdt-absolute -mdt-right-[5px] mdt-top-0 mdt-z-[5] mdt-h-10 mdt-w-[10px] mdt-cursor-col-resize"
          role="slider"
          tabIndex={0}
          aria-orientation="vertical"
          aria-label={`Resize ${label}`}
          aria-valuenow={width}
          aria-valuemin={minWidth}
          aria-valuemax={TABLE_COLUMN_MAX}
          onPointerDown={rzDown}
          onPointerMove={rzMove}
          onPointerUp={rzUp}
          onKeyDown={rzKey}
          onPointerEnter={() => onBoundaryHover?.(true)}
          onPointerLeave={() => onBoundaryHover?.(false)}
        />
      )}
      <span
        className="tbl-nick mdt-pointer-events-none mdt-absolute mdt-right-0 mdt-top-3 mdt-h-4 mdt-w-px mdt-bg-neutral-30 dark:mdt-bg-neutral-100"
        aria-hidden="true"
      />
    </th>
  );
});
TableHead.displayName = 'TableHead';

function clampWidth(w: number, min: number): number {
  return Math.max(min, Math.min(TABLE_COLUMN_MAX, Math.round(w)));
}

/** The first cell of a row: its number at rest, a checkbox on hover, focus, or once anything is picked. */
function TableSelectionCell({
  index,
  selected,
  inert = false,
  label,
  onToggle,
  frozen = 0,
}: TableSelectionCellProps) {
  return (
    <td
      className={cn(
        tableCellVariants({ frozen: true, align: 'center' }),
        'tbl-sel mdt-w-[60px] !mdt-px-0'
      )}
      style={{ left: frozen }}
    >
      <span className="tbl-rowsel mdt-inline-flex mdt-h-5 mdt-w-full mdt-items-center mdt-justify-center">
        <span className="tbl-num mdt-font-medium mdt-text-muted-foreground" aria-hidden={!inert}>
          {index}
        </span>
        {!inert && (
          <Checkbox
            className="tbl-cb data-[state=unchecked]:mdt-border-neutral-40 dark:data-[state=unchecked]:mdt-border-neutral-90"
            checked={selected}
            tabIndex={-1}
            aria-label={`Select ${label}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle(e.shiftKey);
            }}
          />
        )}
      </span>
    </td>
  );
}

/** The header's checkbox and the chevron that opens the scope menu. */
function TableSelectAll({ state, onToggle, onScope, frozen = 0 }: TableSelectAllProps) {
  return (
    <th
      scope="col"
      className={cn(tableHeadVariants({ frozen: true, align: 'center' }), 'mdt-w-[60px] !mdt-px-0')}
      style={{ left: frozen, width: TABLE_GUTTER }}
    >
      <span className="tbl-selall mdt-relative mdt-inline-flex mdt-items-center mdt-justify-center">
        <Checkbox
          className="data-[state=unchecked]:mdt-border-neutral-40 dark:data-[state=unchecked]:mdt-border-neutral-90"
          checked={state === 'all' ? true : state === 'some' ? 'indeterminate' : false}
          onCheckedChange={onToggle}
          aria-label="Select all on this page"
        />
        <button
          type="button"
          className="tbl-scope mdt-absolute mdt-left-[calc(100%+2px)] mdt-inline-flex mdt-h-4 mdt-w-4 mdt-items-center mdt-justify-center mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-muted-foreground hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 dark:hover:mdt-bg-neutral-120 dark:hover:mdt-text-neutral-40"
          aria-label="Choose what to select"
          aria-haspopup="dialog"
          onClick={(e) => {
            onScope(e.currentTarget);
          }}
        >
          <Icon name="chevron-down" size={12} />
        </button>
      </span>
    </th>
  );
}

/** The blank 60px tail that soaks up leftover width. */
function TableTailCell({ head = false }: { head?: boolean }) {
  return head ? (
    <th
      scope="col"
      className={cn(tableHeadVariants({}), '!mdt-px-0')}
      style={{ width: TABLE_GUTTER }}
      aria-hidden="true"
    />
  ) : (
    <td className={cn(tableCellVariants({}), '!mdt-px-0')} aria-hidden="true" />
  );
}

export type { ReactNode };
export {
  Table,
  TableMorphContext,
  TableViewport,
  TableColGroup,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableSelectionCell,
  TableSelectAll,
  TableTailCell,
};
