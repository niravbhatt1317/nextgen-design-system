import { forwardRef } from 'react';
import { cn } from '@/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../Pagination';
import { Select } from '../Select';
import { PAGE_GAP, pageList } from './pageList';
import type { TablePaginationProps } from './Table.types';

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

/**
 * TablePagination - the pager under a table.
 *
 * It is `Pagination` with the two things a table needs and a general pager does
 * not:
 *
 * **The count.** "1-25 of 431" is the only thing on the screen that says how
 * big the table is. Page 1 of 18 tells you how much paging is left, which is
 * not the same question, and neither number can be worked out from the other
 * without knowing the page size.
 *
 * **Rows per page.** `useTablePagination.setPageSize` keeps the first visible
 * row on screen when it changes, so someone reading row 300 who switches to 100
 * per page is still looking at row 300 - and until this control existed,
 * nothing ever called it.
 *
 * Like everything else under `Table` it holds no state: it takes the numbers
 * and reports the presses. `useTablePagination` is what usually feeds it, and a
 * table backed by an API can feed it from a response instead.
 *
 * @example
 * ```tsx
 * const pagination = useTablePagination({ total: rows.length, pageSize: 25 });
 * <TablePagination {...pagination} total={rows.length} onPageChange={pagination.goTo} />
 * ```
 */
const TablePagination = forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      page,
      pageCount,
      from,
      to,
      total,
      pageSize,
      pageSizes = DEFAULT_PAGE_SIZES,
      onPageChange,
      onPageSizeChange,
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'mdt-flex mdt-flex-wrap mdt-items-center mdt-justify-between mdt-gap-3 mdt-text-sm',
        className
      )}
      {...props}
    >
      <span className="mdt-flex mdt-items-center mdt-gap-3 mdt-text-muted-foreground">
        {/*
          `from` is a 0-based index and this is a sentence about rows, so it
          reads one higher. An empty table says "0 of 0" rather than "1-0 of 0".
        */}
        <span className="mdt-tabular-nums">
          {total === 0 ? '0 of 0' : `${String(from + 1)}–${String(to)} of ${String(total)}`}
        </span>

        {onPageSizeChange !== undefined && (
          <span className="mdt-flex mdt-items-center mdt-gap-2">
            <span className="mdt-whitespace-nowrap">Rows per page</span>
            <Select
              size="sm"
              aria-label="Rows per page"
              value={String(pageSize)}
              options={pageSizes.map((size) => ({ value: String(size), label: String(size) }))}
              onChange={(next) => {
                // Single mode, so the value is one string. `Number` of an array
                // would be NaN, which would silently show every row.
                if (typeof next === 'string') onPageSizeChange(Number(next));
              }}
              className="mdt-w-20"
            />
          </span>
        )}
      </span>

      {/*
        The numbers go when there is one page. The count above stays, because
        "1-8 of 8" is still worth knowing - it is the pager that has nothing to
        offer, not the table that has nothing to say.
      */}
      {pageCount > 1 && (
        <Pagination className="mdt-w-auto mdt-justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                size="sm"
                label=""
                disabled={page <= 1}
                onClick={() => {
                  onPageChange(page - 1);
                }}
              />
            </PaginationItem>

            {pageList(page, pageCount).map((slot, index) =>
              slot === PAGE_GAP ? (
                // Indexed key, because two gaps in one row are genuinely the
                // same thing in two places and have nothing else to be keyed by.
                <PaginationItem key={`gap-${String(index)}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={slot}>
                  <PaginationLink
                    size="sm"
                    isActive={slot === page}
                    aria-label={`Go to page ${String(slot)}`}
                    onClick={() => {
                      onPageChange(slot);
                    }}
                  >
                    {slot}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                size="sm"
                label=""
                disabled={page >= pageCount}
                onClick={() => {
                  onPageChange(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
);
TablePagination.displayName = 'TablePagination';

export { TablePagination };
