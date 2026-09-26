import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { useTableMorph } from './Table';
import type { TableBulkActionProps, TableBulkBarProps } from './Table.types';

const fmt = (n: number) => n.toLocaleString('en-US');

/**
 * The dark pill that appears once rows are picked. It sits 62px above the
 * card's end - the pager strip plus a 12px gap - over the last row, and reads
 * its count aloud as it changes. The count is plain words: the selector glyph
 * before it and the "Choose what to select" popover it opened went on
 * 2026-09-26 (Pranjal).
 *
 * WHERE IT HANGS FROM (2026-09-26). On a real page the card runs past the
 * bottom of the window: the console's Users page fills the card to the room
 * under its dock line, so at rest its last rows and its pager sit below the
 * fold, and a bar hung 62px above the card's end landed 135px below the fold -
 * invisible until the page was scrolled. The console's own bar had always
 * been `position: sticky; bottom: 62px` against the page, and that is what
 * Pranjal expects: pick rows, the bar is there at the bottom of the window.
 *
 * So the bar hangs from a 0px-tall hook laid out at the card's end (`order`
 * puts it last whatever the markup order, so a hand-built table may still
 * write it before the pager). The hook is sticky at the bottom of whatever
 * scrolls the card - the page, a drawer's body - so the bar pins 62px above
 * that edge while the card runs past it, and rides up with the card once the
 * card's end is in view; where it can, it is exactly where it always was. The
 * card's layout does not change when a selection appears: the hook has no
 * height, and the bar still overlays the last row.
 *
 * Once the card IS the page (docked - morph 1 - its rows scrolling inside it
 * with the header and pager pinned), the hook stands still and the bar hangs
 * from the card's own end as before: the two lines are the same one there.
 * The bar reads the morph the card reads, so the switch needs no prop.
 *
 * The card keeps its `overflow` unset and the viewport clips with `clip`, not
 * `hidden`: a hidden or auto overflow between the hook and the page would make
 * that box the hook's scroller and the bar would stick to nothing.
 *
 * Its ink and its washes read primary-foreground, never white: the pill's
 * ground (neutral-150) is the bold ink in light and a light grey in dark, and
 * primary-foreground is the ink that sits on a bold fill in both themes
 * (2026-09-26).
 */
const TableBulkBar = forwardRef<HTMLDivElement, TableBulkBarProps>(function TableBulkBar(
  { className, count, onClear, children, ...props },
  ref
) {
  const { morph } = useTableMorph();
  if (count <= 0) return null;
  const anchor = morph >= 1 ? 'card' : 'page';
  return (
    <div
      data-anchor={anchor}
      className={cn(
        'tbl-bulk mdt-order-1 mdt-h-0 mdt-w-full',
        anchor === 'page' && 'mdt-sticky mdt-bottom-0 mdt-z-[6]'
      )}
    >
      <div
        ref={ref}
        role="region"
        aria-label="Selection"
        className={cn(
          'mdt-absolute mdt-bottom-[62px] mdt-left-1/2 mdt-z-[6] -mdt-translate-x-1/2',
          'mdt-inline-flex mdt-h-12 mdt-items-center mdt-gap-1.5 mdt-whitespace-nowrap mdt-rounded-xl mdt-py-0 mdt-pl-4 mdt-pr-2',
          'mdt-bg-neutral-150 mdt-text-[13px] mdt-font-semibold mdt-leading-none mdt-text-primary-foreground mdt-shadow-[0_12px_32px_rgba(29,43,62,0.25)]',
          className
        )}
        {...props}
      >
        <span
          className="mdt-inline-flex mdt-h-8 mdt-items-center mdt-pr-2.5 mdt-font-semibold mdt-text-[#7C88A2]"
          aria-live="polite"
        >
          {fmt(count)} selected
        </span>
        <span
          className="mdt-mx-1.5 mdt-h-5 mdt-w-px mdt-bg-primary-foreground/20"
          aria-hidden="true"
        />
        {children}
        <button
          type="button"
          className="mdt-inline-flex mdt-h-8 mdt-w-8 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-[#B5BFD1] hover:mdt-bg-primary-foreground/10 hover:mdt-text-primary-foreground"
          aria-label="Clear selection"
          onClick={onClear}
        >
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );
});
TableBulkBar.displayName = 'TableBulkBar';

/** One action in the bar: a 32px text button with a 16px icon. */
const TableBulkAction = forwardRef<HTMLButtonElement, TableBulkActionProps>(
  function TableBulkAction({ className, icon, danger = false, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'mdt-inline-flex mdt-h-8 mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-px-2.5 mdt-font-semibold',
          'hover:mdt-bg-primary-foreground/10 disabled:mdt-cursor-default disabled:mdt-opacity-40',
          '[&_svg]:mdt-size-4',
          danger && 'mdt-text-[#FF8A80]',
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);
TableBulkAction.displayName = 'TableBulkAction';

/** The thin divider between groups of actions. */
function TableBulkSeparator() {
  return (
    <span className="mdt-mx-1.5 mdt-h-5 mdt-w-px mdt-bg-primary-foreground/20" aria-hidden="true" />
  );
}

export { TableBulkBar, TableBulkAction, TableBulkSeparator };
