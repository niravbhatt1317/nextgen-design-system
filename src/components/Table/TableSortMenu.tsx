import { useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../Command';
import { Icon } from '../Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Separator } from '../Separator';
import type { TableSortMenuProps } from './Table.types';

/**
 * A 32px square button carrying only an icon.
 *
 * Not `iconOnly`: that prop hides children and takes the glyph as `leftIcon`,
 * which leaves the element with no children at all - and children are what tell
 * `ButtonProps` from `LinkButtonProps`, so the type then demands an `href`. The
 * cell recipes reached for the same override for the same reason, which makes
 * this the third time round: worth fixing in Button rather than working around
 * again.
 */
const ICON_BUTTON = 'mdt-w-8 mdt-px-0';

/**
 * TableSortMenu - which columns sort the table, and in what order.
 *
 * **A searchable list, so it cannot be a `DropdownMenu`.** Radix's menu
 * typeahead treats every keystroke as a jump-to-item, which fights a text field
 * sitting inside it. `Command` in a `Popover` is the same shape without that
 * conflict, and `cmdk` is already a dependency.
 *
 * **The active sorts sit above the columns, not among them.** They are a
 * statement of what is already true; the list below is a set of things you can
 * do. Mixing the two makes "Status" mean both "sorted by status" and "sort by
 * status" depending on where you look.
 *
 * **Order is editable, because order is the answer.** Sorting by status then
 * date is a different table from date then status, and a list that could not be
 * reordered would leave the second one unreachable.
 */
const TableSortMenu = ({
  columns,
  rules,
  onToggleDirection,
  onRemove,
  onMove,
  onClear,
  onSortBy,
  label = 'Sort',
  className,
}: TableSortMenuProps) => {
  const sorted = new Set(rules.map((rule) => rule.column));
  const labelOf = (key: string) => columns.find((column) => column.key === key)?.label ?? key;

  // Dragging inside the panel. Short list, so the whole thing is local: nothing
  // else needs to know a row is mid-flight, and the order still changes exactly
  // once, on drop.
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragTo, setDragTo] = useState<number | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);

  const rowsOf = () => [...(listRef.current?.children ?? [])] as HTMLElement[];

  const startDrag = (index: number) => (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragFrom(index);
    setDragTo(index);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragFrom === null) return;
    // Which row the pointer is over, by its middle. Same rule as the column
    // drag: the row you have passed is the row you would land after.
    let next = dragFrom;
    rowsOf().forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const middle = rect.top + rect.height / 2;
      if (index < dragFrom && event.clientY < middle) next = Math.min(next, index);
      if (index > dragFrom && event.clientY > middle) next = Math.max(next, index);
    });
    setDragTo(next);
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (dragFrom !== null && dragTo !== null && dragFrom !== dragTo) onMove(dragFrom, dragTo);
    setDragFrom(null);
    setDragTo(null);
  };

  const nudge = (index: number) => (event: ReactKeyboardEvent<HTMLElement>) => {
    const step = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
    if (step === 0) return;
    const to = index + step;
    if (to < 0 || to >= rules.length) return;
    // The grip is the only control now, so it carries the keyboard equivalent.
    // A drag with no keyboard path would put reordering out of reach entirely.
    event.preventDefault();
    onMove(index, to);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={label}
          className={cn(ICON_BUTTON, rules.length > 0 && 'mdt-border-primary', className)}
        >
          <Icon name="arrow-up-down" size="sm" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="mdt-w-80 mdt-p-0">
        <p className="mdt-px-3 mdt-pt-3 mdt-text-sm mdt-font-medium">Sort by</p>

        {rules.length > 0 && (
          <>
            <div className="mdt-flex mdt-items-center mdt-justify-between mdt-px-3 mdt-pt-3">
              <span className="mdt-text-xs mdt-text-muted-foreground">Sorting order</span>
              <Button variant="link" size="sm" className="mdt-h-auto mdt-p-0" onClick={onClear}>
                Clear all
              </Button>
            </div>
            <ol ref={listRef} className="mdt-flex mdt-flex-col mdt-gap-1 mdt-p-2">
              {rules.map((rule, index) => (
                <li
                  key={rule.column}
                  className={cn(
                    'mdt-flex mdt-items-center mdt-gap-1 mdt-rounded-sm',
                    // Nothing shuffles mid-drag. The row in your hand dims and a
                    // line shows where it would land - the same answer the
                    // column drag arrived at, for the same reason.
                    dragFrom === index && 'mdt-opacity-40',
                    dragTo === index && dragFrom !== index && 'mdt-bg-muted'
                  )}
                >
                  {/*
                    One grip that drags and takes the arrow keys, rather than a
                    pair of step buttons. Dragging is what the reference shows
                    and what people reach for; the arrow keys are what keeps it
                    reachable without a pointer, and they cost nothing here
                    because the grip is already focusable.
                  */}
                  <button
                    type="button"
                    aria-label={`Reorder ${labelOf(rule.column)}. Use the arrow keys, or drag`}
                    onPointerDown={startDrag(index)}
                    onPointerMove={moveDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={nudge(index)}
                    className={cn(
                      'mdt-flex mdt-h-8 mdt-w-6 mdt-shrink-0 mdt-cursor-grab mdt-touch-none',
                      'mdt-items-center mdt-justify-center mdt-rounded-sm',
                      'mdt-text-muted-foreground hover:mdt-text-foreground',
                      'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
                    )}
                  >
                    <Icon name="grip-vertical" size="sm" aria-hidden />
                  </button>

                  <span className="mdt-flex-1 mdt-truncate mdt-text-sm">
                    {labelOf(rule.column)}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className={ICON_BUTTON}
                    aria-label={`${labelOf(rule.column)} is ${
                      rule.direction === 'ascend' ? 'ascending' : 'descending'
                    }. Reverse it`}
                    onClick={() => {
                      onToggleDirection(rule.column);
                    }}
                  >
                    <Icon
                      name={rule.direction === 'ascend' ? 'arrow-up' : 'arrow-down'}
                      size="sm"
                      aria-hidden
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={ICON_BUTTON}
                    aria-label={`Stop sorting by ${labelOf(rule.column)}`}
                    onClick={() => {
                      onRemove(rule.column);
                    }}
                  >
                    <Icon name="x" size="sm" aria-hidden />
                  </Button>
                </li>
              ))}
            </ol>
            <Separator />
          </>
        )}

        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No columns match.</CommandEmpty>
            <CommandGroup>
              {columns
                .filter((column) => !sorted.has(column.key))
                .map((column) => (
                  <CommandItem
                    key={column.key}
                    value={column.label}
                    onSelect={() => {
                      onSortBy(column.key);
                    }}
                  >
                    {column.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

TableSortMenu.displayName = 'TableSortMenu';

export { TableSortMenu };
