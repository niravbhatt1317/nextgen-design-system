/*
 * OverflowCount - ported from the product console's MoreCount (Pranjal, 2026-10-13).
 *
 * The quiet "+N" counter: the value wears the badge, the counter is muted 12px text with
 * no pill, and hovering or focusing it opens an instant tooltip listing the hidden values.
 * When only the number is known, the tooltip says what it counts instead ("More members").
 * Renders nothing at zero. Drawn exactly like the "+N" inside the Table's TagList, so the
 * two read as one counter across the console (Pranjal 2026-10-11: one "+N" everywhere).
 */
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';
import type { OverflowCountProps } from './OverflowCount.types';

const DEFAULT_LABEL = 'More assigned';

const OverflowCount = forwardRef<HTMLButtonElement, OverflowCountProps>(
  ({ items, count, label = DEFAULT_LABEL, className, ...props }, ref) => {
    const list = (items ?? []).filter(Boolean);
    const n = count ?? list.length;
    if (!Number.isFinite(n) || n <= 0) return null;

    const spoken =
      list.length > 0 ? `${String(n)} more: ${list.join(', ')}` : `${label}: ${String(n)}`;

    return (
      <TooltipProvider>
        <Tooltip instant>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              type="button"
              data-testid="overflow-count"
              aria-label={spoken}
              className={cn(
                'mdt-inline-flex mdt-shrink-0 mdt-cursor-default mdt-rounded mdt-border-0 mdt-bg-transparent mdt-p-0',
                'mdt-text-xs mdt-text-muted-foreground',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-primary',
                className
              )}
              {...props}
            >
              <span aria-hidden="true">+{n}</span>
            </button>
          </TooltipTrigger>
          {list.length > 0 ? (
            <TooltipContent items={list} />
          ) : (
            <TooltipContent>{label}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);
OverflowCount.displayName = 'OverflowCount';

export { OverflowCount };
