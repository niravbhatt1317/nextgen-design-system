import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { TableBulkActionProps, TableBulkBarProps } from './Table.types';

/**
 * The bar is an inverted surface, so everything on it inherits its colours.
 *
 * `primary` / `primary-foreground`, which is what `Tooltip` already uses for a
 * dark surface - so the two match, and the bar flips with the theme for free.
 * Everything on it is that pair at an opacity, rather than a new grey: a
 * palette that grows a colour per surface stops being a palette.
 */
const BAR = [
  // Floats above the page rather than sitting in the flow.
  //
  // A selection is not a property of one table's header, it is a thing you are
  // holding - so the bar follows you down a long table instead of scrolling
  // away with the rows you picked. `z-overlay` rather than higher: a dialog
  // opened from one of these actions must still cover it.
  'mdt-fixed mdt-bottom-6 mdt-left-1/2 -mdt-translate-x-1/2 mdt-z-overlay',
  // Hugs its contents. Stretched to the page it would read as a footer, and a
  // toolbar with a metre of empty space in it does not look like it is about
  // the three rows you ticked.
  'mdt-flex mdt-w-max mdt-max-w-full mdt-flex-wrap mdt-items-center mdt-gap-2',
  'mdt-rounded-lg mdt-bg-primary mdt-py-2 mdt-pl-3 mdt-pr-2 mdt-text-primary-foreground mdt-shadow-lg',
].join(' ');

const ACTION = [
  'mdt-inline-flex mdt-h-8 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-px-2.5',
  'mdt-text-sm mdt-font-medium',
  // A hint of a surface rather than none: on a dark bar a bare label reads as
  // text, and these are buttons. They carry full-strength text because they are
  // what you came here to press - the count beside them is context, and sits
  // back.
  'mdt-bg-primary-foreground/10 mdt-text-primary-foreground',
  'hover:mdt-bg-primary-foreground/20',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-primary-foreground/60',
  'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
].join(' ');

/**
 * TableBulkBar - what you can do with the rows you have selected.
 *
 * **It sits alongside the toolbar rather than replacing it.** Replacing was the
 * first instinct - selecting rows changes what the controls above are for - and
 * it is wrong, because a selection deliberately survives filtering. Building a
 * selection across two searches is a thing people do, and hiding the search box
 * the moment they tick a row makes it impossible.
 *
 * **It is an inverted surface**, which is what separates it from the table
 * rather than a border would. The table is a field of white rows; a bar that
 * matches them has to shout with weight or colour to be noticed, and one that
 * inverts is simply somewhere else.
 *
 * **The count is announced.** A bar that appears silently is invisible to
 * anyone not watching that part of the screen, and the number is the whole
 * point - "delete" means something very different at 3 than at 300.
 */
const TableBulkBar = forwardRef<HTMLDivElement, TableBulkBarProps>(
  ({ count, onClear, label, className, children, ...props }, ref) => {
    // Nothing selected, nothing to say.
    if (count === 0) return null;

    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Selected rows"
        aria-orientation="horizontal"
        className={cn(BAR, className)}
        {...props}
      >
        <span className="mdt-flex mdt-items-center mdt-gap-2 mdt-pl-1 mdt-pr-6">
          {/*
            The same partial-selection mark the header checkbox shows, so the
            bar reads as belonging to those ticks rather than floating in on its
            own. Clicking it clears, which is where people reach first.
          */}
          <button
            type="button"
            aria-label="Clear selection"
            onClick={onClear}
            disabled={onClear === undefined}
            className={cn(
              'mdt-flex mdt-h-4 mdt-w-4 mdt-items-center mdt-justify-center mdt-rounded-sm',
              'mdt-bg-primary-foreground mdt-text-primary',
              'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-primary-foreground/60',
              onClear === undefined && 'mdt-pointer-events-none'
            )}
          >
            <Icon name="minus" size="xs" aria-hidden />
          </button>
          <span
            aria-live="polite"
            className="mdt-whitespace-nowrap mdt-text-sm mdt-font-medium mdt-text-primary-foreground/70"
          >
            {label ?? `${String(count)} selected`}
          </span>
        </span>

        {children}
      </div>
    );
  }
);
TableBulkBar.displayName = 'TableBulkBar';

/**
 * One action on the bar.
 *
 * A component rather than a plain `Button` because the bar is inverted, and a
 * `ghost` Button renders dark text - invisible on it. Products should not have
 * to know that; they should have something that is simply the right shape.
 */
const TableBulkAction = forwardRef<HTMLButtonElement, TableBulkActionProps>(
  ({ icon, className, children, ...props }, ref) => (
    <button ref={ref} type="button" className={cn(ACTION, className)} {...props}>
      {icon}
      {children}
    </button>
  )
);
TableBulkAction.displayName = 'TableBulkAction';

/** A divider between groups of actions - destructive from routine, usually. */
const TableBulkSeparator = () => (
  <span aria-hidden className="mdt-h-5 mdt-w-px mdt-bg-primary-foreground/25" />
);
TableBulkSeparator.displayName = 'TableBulkSeparator';

export { TableBulkBar, TableBulkAction, TableBulkSeparator };
