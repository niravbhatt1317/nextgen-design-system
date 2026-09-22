import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { TableBulkActionOld2Props, TableBulkBarOld2Props } from './TableOld2.types';

const fmt = (n: number) => n.toLocaleString('en-US');

/**
 * The dark pill that appears once rows are picked. It sits inside the card,
 * 13px above the pager, and reads its count aloud as it changes.
 */
const TableBulkBarOld2 = forwardRef<HTMLDivElement, TableBulkBarOld2Props>(
  function TableBulkBarOld2({ className, count, onScope, onClear, children, ...props }, ref) {
    if (count <= 0) return null;
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Selection"
        className={cn(
          'mdt-absolute mdt-bottom-[62px] mdt-left-1/2 mdt-z-[6] -mdt-translate-x-1/2',
          'mdt-inline-flex mdt-h-12 mdt-items-center mdt-gap-1.5 mdt-whitespace-nowrap mdt-rounded-xl mdt-py-0 mdt-pl-4 mdt-pr-2',
          'mdt-bg-neutral-150 mdt-text-[13px] mdt-font-semibold mdt-leading-none mdt-text-white mdt-shadow-[0_12px_32px_rgba(29,43,62,0.25)]',
          'dark:mdt-bg-neutral-10 dark:mdt-text-neutral-150',
          className
        )}
        {...props}
      >
        <button
          type="button"
          className="mdt-inline-flex mdt-h-8 mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-pl-0 mdt-pr-2.5 mdt-font-semibold mdt-text-[#7C88A2] hover:mdt-text-white dark:mdt-text-neutral-90 dark:hover:mdt-text-neutral-150"
          aria-haspopup="dialog"
          aria-live="polite"
          onClick={(e) => onScope?.(e.currentTarget)}
        >
          {fmt(count)} selected
          <Icon name="chevrons-up-down" size={14} />
        </button>
        <span
          className="mdt-mx-1.5 mdt-h-5 mdt-w-px mdt-bg-white/20 dark:mdt-bg-neutral-150/20"
          aria-hidden="true"
        />
        {children}
        <button
          type="button"
          className="mdt-inline-flex mdt-h-8 mdt-w-8 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-[#B5BFD1] hover:mdt-bg-white/10 hover:mdt-text-white dark:mdt-text-neutral-70 dark:hover:mdt-bg-neutral-150/10"
          aria-label="Clear selection"
          onClick={onClear}
        >
          <Icon name="x" size={16} />
        </button>
      </div>
    );
  }
);
TableBulkBarOld2.displayName = 'TableBulkBarOld2';

/** One action in the bar: a 32px text button with a 16px icon. */
const TableBulkActionOld2 = forwardRef<HTMLButtonElement, TableBulkActionOld2Props>(
  function TableBulkActionOld2({ className, icon, danger = false, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'mdt-inline-flex mdt-h-8 mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-px-2.5 mdt-font-semibold',
          'hover:mdt-bg-white/10 disabled:mdt-cursor-default disabled:mdt-opacity-40 dark:hover:mdt-bg-neutral-150/10',
          '[&_svg]:mdt-size-4',
          danger && 'mdt-text-[#FF8A80] dark:mdt-text-red-60',
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
TableBulkActionOld2.displayName = 'TableBulkActionOld2';

/** The thin divider between groups of actions. */
function TableBulkSeparatorOld2() {
  return (
    <span
      className="mdt-mx-1.5 mdt-h-5 mdt-w-px mdt-bg-white/20 dark:mdt-bg-neutral-150/20"
      aria-hidden="true"
    />
  );
}

export { TableBulkBarOld2, TableBulkActionOld2, TableBulkSeparatorOld2 };
