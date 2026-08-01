import { useState } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
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
import type { TableViewMenuProps } from './Table.types';

/** Which panel is showing. The menu drills in rather than flying out. */
type View = 'root' | 'group' | 'columns';

const ROW = [
  'mdt-flex mdt-w-full mdt-items-center mdt-gap-3 mdt-rounded-sm mdt-px-3 mdt-py-2 mdt-text-sm',
  'hover:mdt-bg-muted focus-visible:mdt-outline-none focus-visible:mdt-bg-muted',
].join(' ');

/**
 * TableViewMenu - grouping and which columns exist.
 *
 * **It drills in rather than flying out.** Radix menus do submenus as flyouts,
 * which are quick with a mouse and awkward with anything else: a flyout has to
 * be kept open by hovering a diagonal corridor, and on a narrow screen there is
 * nowhere for it to go. Both panels here also need a search field, which rules
 * out a menu anyway - Radix's typeahead treats every keystroke as jump-to-item.
 * `Popover` plus `Command` gives the search and makes drilling in just state.
 *
 * **The root shows each panel's current answer.** "Group by: None" and
 * "Columns: 12 shown" mean the common case - checking what a table is doing -
 * costs one click instead of three.
 */
const TableViewMenu = ({
  columns,
  groupBy = null,
  onGroupBy,
  onToggleColumn,
  onShowAll,
  onHideAll,
  label = 'View settings',
  className,
}: TableViewMenuProps) => {
  const [view, setView] = useState<View>('root');
  const [open, setOpen] = useState(false);

  const shown = columns.filter((column) => column.visible);
  const hidden = columns.filter((column) => !column.visible);
  const groupLabel = columns.find((column) => column.key === groupBy)?.label ?? 'None';
  const changed = groupBy !== null || hidden.length > 0;

  const close = () => {
    setOpen(false);
    // Back to the root, so the next open starts where it started last time.
    setView('root');
  };

  const back = (title: string) => (
    <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-px-2 mdt-pt-2">
      <Button
        variant="ghost"
        size="sm"
        className="mdt-w-8 mdt-px-0"
        aria-label="Back to view settings"
        onClick={() => {
          setView('root');
        }}
      >
        <Icon name="chevron-left" size="sm" aria-hidden />
      </Button>
      <span className="mdt-text-sm mdt-font-medium">{title}</span>
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setView('root');
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={label}
          className={cn('mdt-w-8 mdt-px-0', changed && 'mdt-border-primary', className)}
        >
          <Icon name="sliders-horizontal" size="sm" aria-hidden />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="mdt-w-72 mdt-p-0">
        {view === 'root' && (
          <div className="mdt-p-1">
            <button
              type="button"
              className={ROW}
              onClick={() => {
                setView('group');
              }}
            >
              <Icon name="layout-list" size="sm" aria-hidden />
              <span>Group by</span>
              {/* The current answer, so checking costs one click rather than three. */}
              <span className="mdt-ml-auto mdt-text-muted-foreground">{groupLabel}</span>
              <Icon name="chevron-right" size="sm" aria-hidden />
            </button>
            <button
              type="button"
              className={ROW}
              onClick={() => {
                setView('columns');
              }}
            >
              <Icon name="columns" size="sm" aria-hidden />
              <span>Columns</span>
              <span className="mdt-ml-auto mdt-text-muted-foreground">{shown.length} shown</span>
              <Icon name="chevron-right" size="sm" aria-hidden />
            </button>
          </div>
        )}

        {view === 'group' && (
          <>
            {back('Group by')}
            <Command>
              <CommandInput placeholder="Search" />
              <CommandList>
                <CommandEmpty>No columns match.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="None"
                    onSelect={() => {
                      onGroupBy(null);
                      close();
                    }}
                  >
                    None
                    {groupBy === null && (
                      <Icon name="check" size="sm" className="mdt-ml-auto" aria-hidden />
                    )}
                  </CommandItem>
                </CommandGroup>
                <Separator />
                <CommandGroup>
                  {columns
                    .filter((column) => column.visible)
                    .map((column) => (
                      <CommandItem
                        key={column.key}
                        value={column.label}
                        onSelect={() => {
                          onGroupBy(column.key);
                          close();
                        }}
                      >
                        {column.label}
                        {groupBy === column.key && (
                          <Icon name="check" size="sm" className="mdt-ml-auto" aria-hidden />
                        )}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </>
        )}

        {view === 'columns' && (
          <>
            {back('Columns')}
            <Command>
              <CommandInput placeholder="Search" />
              <CommandList>
                <CommandEmpty>No columns match.</CommandEmpty>
                <CommandGroup heading="Shown in table">
                  {shown.map((column) => (
                    <CommandItem
                      key={column.key}
                      value={`shown-${column.label}`}
                      disabled={column.locked === true}
                      onSelect={() => {
                        onToggleColumn(column.key);
                      }}
                    >
                      <span className="mdt-flex-1">{column.label}</span>
                      <Checkbox
                        checked
                        disabled={column.locked === true}
                        tabIndex={-1}
                        aria-hidden
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                {hidden.length > 0 && (
                  <CommandGroup heading="Hidden in table">
                    {hidden.map((column) => (
                      <CommandItem
                        key={column.key}
                        value={`hidden-${column.label}`}
                        onSelect={() => {
                          onToggleColumn(column.key);
                        }}
                      >
                        <span className="mdt-flex-1">{column.label}</span>
                        <Checkbox checked={false} tabIndex={-1} aria-hidden />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
            {(onShowAll !== undefined || onHideAll !== undefined) && (
              <>
                <Separator />
                <div className="mdt-flex mdt-justify-between mdt-p-2">
                  {onHideAll !== undefined && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mdt-h-auto mdt-p-0"
                      onClick={onHideAll}
                    >
                      Hide all
                    </Button>
                  )}
                  {onShowAll !== undefined && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mdt-ml-auto mdt-h-auto mdt-p-0"
                      onClick={onShowAll}
                    >
                      Show all
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

TableViewMenu.displayName = 'TableViewMenu';

export { TableViewMenu };
