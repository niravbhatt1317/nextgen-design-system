import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Popover, PopoverAnchor, PopoverContent } from '../Popover';
import type { TableScopeMenuProps, TableSelectionScope } from './Table.types';

const fmt = (n: number) => n.toLocaleString('en-US');

/**
 * What a select-all should take: this page, every row that matches, or a
 * number you type. Opened from the header chevron and from the bulk bar's count.
 */
function TableScopeMenu({
  open,
  onOpenChange,
  anchor,
  pageCount,
  allCount,
  noun,
  onApply,
}: TableScopeMenuProps) {
  const [choice, setChoice] = useState<TableSelectionScope>('page');
  const [custom, setCustom] = useState('100');
  const anchorRef = useRef<HTMLElement | null>(anchor);
  anchorRef.current = anchor;
  useEffect(() => {
    if (open) setChoice('page');
  }, [open]);

  const options: { value: TableSelectionScope; label: string; count: number | null }[] = [
    { value: 'page', label: 'Select this page', count: pageCount },
    { value: 'all', label: `Select all ${noun}`, count: allCount },
    { value: 'custom', label: 'Custom', count: null },
  ];
  const apply = () => {
    const n =
      choice === 'page'
        ? pageCount
        : choice === 'all'
          ? allCount
          : Math.min(allCount, Math.max(0, parseInt(custom, 10) || 0));
    onApply(choice, n);
    onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor virtualRef={anchorRef} />
      <PopoverContent
        align="start"
        sideOffset={6}
        className="mdt-w-[252px] mdt-rounded-xl mdt-p-3"
        aria-label="Choose what to select"
      >
        <div role="radiogroup" className="mdt-flex mdt-flex-col">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={choice === o.value}
              onClick={() => {
                setChoice(o.value);
              }}
              className="mdt-flex mdt-min-h-8 mdt-items-center mdt-gap-2.5 mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-px-1 mdt-text-left mdt-text-[13px] mdt-font-medium mdt-text-neutral-130 hover:mdt-bg-neutral-10"
            >
              <span
                className={cn(
                  'mdt-inline-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-border mdt-border-solid',
                  choice === o.value
                    ? 'mdt-border-neutral-150 after:mdt-block after:mdt-h-2 after:mdt-w-2 after:mdt-rounded-full after:mdt-bg-neutral-150 after:mdt-content-[""]'
                    : 'mdt-border-neutral-40'
                )}
                aria-hidden="true"
              />
              <span>{o.label}</span>
              {o.count !== null ? (
                <span className="mdt-ml-auto mdt-rounded-full mdt-bg-neutral-10 mdt-px-2 mdt-py-0.5 mdt-text-xs mdt-tabular-nums mdt-text-neutral-90">
                  {fmt(o.count)}
                </span>
              ) : (
                choice === 'custom' && (
                  <input
                    className="mdt-ml-auto mdt-h-7 mdt-w-16 mdt-rounded-md mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-px-2 mdt-text-[13px] mdt-text-neutral-130 mdt-outline-none focus:mdt-border-neutral-90"
                    value={custom}
                    inputMode="numeric"
                    aria-label="How many"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      setCustom(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') apply();
                    }}
                  />
                )
              )}
            </button>
          ))}
        </div>
        <div className="mdt-mt-2.5 mdt-flex mdt-justify-end mdt-gap-2 mdt-border-t mdt-border-solid mdt-border-neutral-20 mdt-pt-2.5">
          <button
            type="button"
            className="mdt-h-8 mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-px-3 mdt-text-[13px] mdt-font-semibold mdt-text-neutral-90 hover:mdt-bg-neutral-10"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="mdt-h-8 mdt-rounded-lg mdt-border-0 mdt-bg-neutral-150 mdt-px-3 mdt-text-[13px] mdt-font-semibold mdt-text-white dark:mdt-bg-neutral-10 dark:mdt-text-neutral-150"
            onClick={apply}
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { TableScopeMenu };
