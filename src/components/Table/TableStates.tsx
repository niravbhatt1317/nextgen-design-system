import { useLayoutEffect, useRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { TABLE_GUTTER, tableCellVariants } from './Table';
import type { TableBlankKind, TableBlankProps, TableSkeletonProps } from './Table.types';

const COPY: Record<
  TableBlankKind,
  { icon: IconName; title: string; body: string; action: string }
> = {
  first: {
    icon: 'user-plus',
    title: 'No users yet',
    body: 'Invite people by email, or connect a directory to bring them in.',
    action: 'Invite users',
  },
  empty: {
    icon: 'search-x',
    title: 'No users match',
    body: 'Try another spelling, or clear the filters you applied.',
    action: 'Clear filters',
  },
  error: {
    icon: 'alert-triangle',
    title: 'Couldn’t load users',
    body: 'Something went wrong on our side. Your search and filters are kept.',
    action: 'Try again',
  },
};

/**
 * The three blank states, centred in the visible card: nothing yet, nothing
 * found, could not load. An icon, a title, one line, one button.
 *
 * CENTRED IN WHAT YOU CAN SEE (Pranjal, 2026-09-28: "in empty state why are not showing it in the middle of the table
 * its hiding at the bottom a little getting cutoff as well. It should be in the middle based on the view port. as in
 * table viewport."). The page-filling card is as tall as the room under the dock line, so at rest its foot sits below
 * the window; a fixed 300px block under an ever-growing viewport landed at that foot, half off screen. Now the block
 * takes the card's whole body (300 at least - a card with no page to fill looks as before), and the part of it hidden
 * below the window becomes bottom padding, so the message sits in the middle of the visible table and moves back to
 * the true middle as the page scrolls the card up.
 */
function TableBlank({ kind, title, body, action, onAction }: TableBlankProps) {
  const c = COPY[kind];
  const primary = kind === 'first';
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el === null) return undefined;
    let page: HTMLElement | null = el.parentElement;
    while (page !== null && !/(auto|scroll)/.test(getComputedStyle(page).overflowY)) page = page.parentElement;
    const place = (): void => {
      el.style.paddingBottom = '';
      const box = el.getBoundingClientRect();
      const bottom = Math.min(window.innerHeight, page ? page.getBoundingClientRect().bottom : window.innerHeight);
      const hidden = Math.max(0, Math.round(box.bottom - bottom));
      /* never so much that the message would have less than the 300 it always had */
      const room = Math.max(0, box.height - 300);
      if (hidden > 0) el.style.paddingBottom = `${String(24 + Math.min(hidden, room))}px`;
    };
    place();
    const target: HTMLElement | Window = page ?? window;
    target.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    return () => {
      target.removeEventListener('scroll', place);
      window.removeEventListener('resize', place);
    };
  }, []);
  return (
    <div
      ref={ref}
      role="status"
      className="tbl-blank mdt-flex mdt-min-h-[300px] mdt-flex-1 mdt-flex-col mdt-items-center mdt-justify-center mdt-gap-1.5 mdt-p-6 mdt-text-center"
    >
      <span
        className={cn(
          'mdt-mb-2 mdt-inline-flex mdt-h-11 mdt-w-11 mdt-items-center mdt-justify-center mdt-rounded-xl',
          kind === 'error'
            ? 'mdt-bg-yellow-5 mdt-text-[#8A5A00]'
            : 'mdt-bg-neutral-10 mdt-text-neutral-90'
        )}
      >
        <Icon name={c.icon} size={22} />
      </span>
      <span className="mdt-text-sm mdt-font-semibold mdt-leading-[1.4] mdt-text-neutral-130">
        {title ?? c.title}
      </span>
      <span className="mdt-max-w-[360px] mdt-text-xs mdt-text-faint">{body ?? c.body}</span>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            'mdt-mt-3 mdt-inline-flex mdt-h-8 mdt-items-center mdt-rounded-lg mdt-border mdt-border-solid mdt-px-3 mdt-text-[13px] mdt-font-medium',
            primary
              ? 'mdt-border-neutral-150 mdt-bg-neutral-150 mdt-text-primary-foreground'
              : 'mdt-border-neutral-30 mdt-bg-background mdt-text-neutral-90 hover:mdt-border-neutral-90 hover:mdt-bg-neutral-10'
          )}
        >
          {action ?? c.action}
        </button>
      )}
    </div>
  );
}

const BAR = 'mdt-inline-block mdt-h-2.5 mdt-rounded-[5px] mdt-bg-neutral-20 mdt-align-middle';
const SHAPES = [120, 96, 132, 108, 124];

/** Five grey rows while the list loads. Bars fall where the content will. */
function TableSkeleton({ widths, rows = 5 }: TableSkeletonProps) {
  return (
    <tbody aria-hidden="true" className="tbl-body">
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className="tbl-row">
          {widths.map((w, j) => (
            // eslint-disable-next-line react/no-array-index-key -- skeleton cells have no identity but their position
            <td key={j} className={tableCellVariants({ align: j === 0 ? 'center' : 'left' })}>
              {j === 0 ? (
                <span className={BAR} style={{ width: 12 }} />
              ) : j === 1 ? (
                <span className="mdt-inline-flex mdt-items-center mdt-gap-2.5">
                  <span className={cn(BAR, 'mdt-h-8 mdt-w-8 mdt-rounded-full')} />
                  <span className={BAR} style={{ width: SHAPES[i % SHAPES.length] }} />
                </span>
              ) : (
                <span
                  className={BAR}
                  style={{ width: Math.min(w - 32, 40 + ((i * 37 + j * 53) % 120)) }}
                />
              )}
            </td>
          ))}
          <td className={tableCellVariants({})} style={{ width: TABLE_GUTTER }} />
        </tr>
      ))}
    </tbody>
  );
}

export { TableBlank, TableSkeleton };
