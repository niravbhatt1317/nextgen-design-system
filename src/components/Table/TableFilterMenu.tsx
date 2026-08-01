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
import type { TableFilterMenuProps } from './Table.types';

/**
 * TableFilterMenu - choose an attribute, then choose its values.
 *
 * **Two steps, not one.** A flat list of every value across every attribute is
 * unusable past about three attributes, and it cannot show which attribute a
 * value belongs to - "Open" means one thing under Status and another under
 * Sprint. Picking the attribute first is also how the panel stays short enough
 * to read.
 *
 * **Values are checkboxes, not a single choice.** "Status is Open or In
 * Process" is the ordinary case; forcing one value per filter would make people
 * apply the same filter twice and then wonder why nothing matches.
 *
 * **It stops at attribute-and-values.** Operators - is not, contains, before,
 * between - are a query builder, which is a feature in its own right. Half of
 * one built here would settle its shape by accident.
 */
const TableFilterMenu = ({
  attributes,
  valuesFor,
  onToggleValue,
  onClear,
  count = 0,
  label = 'Filters',
  className,
}: TableFilterMenuProps) => {
  const [open, setOpen] = useState(false);
  const [attribute, setAttribute] = useState<string | null>(null);

  const current = attributes.find((item) => item.key === attribute) ?? null;

  const close = (next: boolean) => {
    setOpen(next);
    // Back to the attribute list, so the next open starts where it started.
    if (!next) setAttribute(null);
  };

  return (
    <Popover open={open} onOpenChange={close}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(count > 0 && 'mdt-border-primary', className)}
        >
          <Icon name="list-filter" size="sm" aria-hidden />
          {label}
          {count > 0 && <span className="mdt-tabular-nums mdt-text-muted-foreground">{count}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="mdt-w-64 mdt-p-0">
        {current === null ? (
          <Command>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No attributes match.</CommandEmpty>
              <CommandGroup heading="Select attributes">
                {attributes.map((item) => {
                  const chosen = valuesFor(item.key).length;
                  return (
                    <CommandItem
                      key={item.key}
                      value={item.label}
                      onSelect={() => {
                        setAttribute(item.key);
                      }}
                    >
                      <span className="mdt-flex-1">{item.label}</span>
                      {/*
                        How many values are already chosen, so the list doubles
                        as a summary of what is filtered - otherwise finding out
                        means opening each attribute in turn.
                      */}
                      {chosen > 0 && (
                        <span className="mdt-tabular-nums mdt-text-muted-foreground">{chosen}</span>
                      )}
                      <Icon name="chevron-right" size="sm" aria-hidden />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <>
            <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-px-2 mdt-pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="mdt-w-8 mdt-px-0"
                aria-label="Back to attributes"
                onClick={() => {
                  setAttribute(null);
                }}
              >
                <Icon name="chevron-left" size="sm" aria-hidden />
              </Button>
              <span className="mdt-text-sm mdt-font-medium">{current.label}</span>
            </div>
            <Command>
              <CommandInput placeholder="Search" />
              <CommandList>
                <CommandEmpty>No values match.</CommandEmpty>
                <CommandGroup>
                  {current.values.map((value) => (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={() => {
                        onToggleValue(current.key, value);
                      }}
                    >
                      <span className="mdt-flex-1">{value}</span>
                      <Checkbox
                        checked={valuesFor(current.key).includes(value)}
                        tabIndex={-1}
                        aria-hidden
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </>
        )}

        {count > 0 && onClear !== undefined && (
          <div className="mdt-border-t mdt-border-border mdt-p-2">
            <Button variant="ghost" size="sm" className="mdt-w-full" onClick={onClear}>
              <Icon name="filter-x" size="sm" aria-hidden />
              Clear all filters
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

TableFilterMenu.displayName = 'TableFilterMenu';

export { TableFilterMenu };
