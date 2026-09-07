import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import type { TableLoadMoreProps, TablePagerProps } from './Table.types';

const fmt = (n: number) => n.toLocaleString('en-US');

const CONTROL =
  'mdt-inline-flex mdt-h-8 mdt-items-center mdt-justify-center mdt-gap-1.5 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-text-[13px] mdt-font-medium mdt-text-neutral-90 hover:mdt-border-neutral-90 hover:mdt-bg-neutral-10 disabled:mdt-cursor-default disabled:mdt-opacity-40 disabled:hover:mdt-border-neutral-30 disabled:hover:mdt-bg-background';

/**
 * The pager on the card's foot: the count on the left, rows per page, first,
 * previous, a typed page box, next and last on the right. Thousands get a
 * comma. Built for 401 pages.
 */
function TablePager({
  total,
  page,
  pageSize,
  pageSizes = [25, 50, 100],
  onPage,
  onPageSize,
  noun,
  message,
}: TablePagerProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const [typed, setTyped] = useState(String(page));
  useEffect(() => {
    setTyped(String(page));
  }, [page]);
  const commit = () => {
    const n = parseInt(typed, 10);
    if (Number.isNaN(n)) setTyped(String(page));
    else onPage(Math.min(pages, Math.max(1, n)));
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
  };
  const disabled = total === 0;

  return (
    <div className="mdt-flex mdt-h-[49px] mdt-items-center mdt-justify-between mdt-rounded-b-xl mdt-border-t mdt-border-solid mdt-border-neutral-20 mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-[13px] mdt-font-medium mdt-leading-[1.5] mdt-text-neutral-90">
      <span className="tbl-count">
        {message ?? `${fmt(from)}–${fmt(to)} of ${fmt(total)} ${noun}`}
      </span>
      <span className="mdt-inline-flex mdt-items-center mdt-gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(CONTROL, 'mdt-px-2.5')}
              aria-label="Rows per page"
              disabled={disabled}
            >
              {pageSize} rows/page
              <Icon name="chevron-down" size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="mdt-min-w-[10rem]">
            {pageSizes.map((s) => (
              <DropdownMenuItem
                key={s}
                onSelect={() => {
                  onPageSize(s);
                }}
              >
                {s} rows/page
                {s === pageSize && <Icon name="check" size={14} className="mdt-ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          type="button"
          className={cn(CONTROL, 'mdt-w-8')}
          aria-label="First page"
          disabled={disabled || page <= 1}
          onClick={() => {
            onPage(1);
          }}
        >
          <Icon name="chevrons-left" size={14} />
        </button>
        <button
          type="button"
          className={cn(CONTROL, 'mdt-w-8')}
          aria-label="Previous page"
          disabled={disabled || page <= 1}
          onClick={() => {
            onPage(page - 1);
          }}
        >
          <Icon name="chevron-left" size={14} />
        </button>
        <span>Page</span>
        <input
          className={cn(
            CONTROL,
            'mdt-w-11 mdt-text-center mdt-tabular-nums mdt-text-neutral-130 mdt-outline-none focus:mdt-border-neutral-90'
          )}
          value={typed}
          inputMode="numeric"
          aria-label="Page number"
          disabled={disabled}
          onChange={(e) => {
            setTyped(e.target.value);
          }}
          onBlur={commit}
          onKeyDown={onKey}
        />
        <span>of {fmt(pages)}</span>
        <button
          type="button"
          className={cn(CONTROL, 'mdt-w-8')}
          aria-label="Next page"
          disabled={disabled || page >= pages}
          onClick={() => {
            onPage(page + 1);
          }}
        >
          <Icon name="chevron-right" size={14} />
        </button>
        <button
          type="button"
          className={cn(CONTROL, 'mdt-w-8')}
          aria-label="Last page"
          disabled={disabled || page >= pages}
          onClick={() => {
            onPage(pages);
          }}
        >
          <Icon name="chevrons-right" size={14} />
        </button>
      </span>
    </div>
  );
}

/** The other footer: a count and a "Load more" button that the table also presses as you scroll near the bottom. */
function TableLoadMore({ shown, total, noun, loading = false, onMore }: TableLoadMoreProps) {
  return (
    <div className="mdt-flex mdt-h-[49px] mdt-items-center mdt-justify-center mdt-gap-3 mdt-rounded-b-xl mdt-border-t mdt-border-solid mdt-border-neutral-20 mdt-bg-background mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
      <span>
        Showing {fmt(Math.min(shown, total))} of {fmt(total)} {noun}
      </span>
      {shown < total && (
        <button
          type="button"
          className={cn(CONTROL, 'mdt-px-2.5')}
          onClick={onMore}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  );
}

export { TablePager, TableLoadMore };
