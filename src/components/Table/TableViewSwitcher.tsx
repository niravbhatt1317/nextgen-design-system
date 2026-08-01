import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../Command';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import type { TableViewNamePanelProps, TableViewSwitcherProps } from './Table.types';

/** Not `iconOnly`: it hides children and then the Button prop union wants an `href`. */
const ICON_BUTTON = 'mdt-h-7 mdt-w-7 mdt-px-0';

const FOOTER = 'mdt-flex mdt-flex-col mdt-gap-1 mdt-border-t mdt-border-border mdt-p-2';

/**
 * Naming a view, whether it is new or being renamed.
 *
 * One panel for both because they are the same act with a different starting
 * value, and two of them would be two places to fix the day someone decides a
 * view name can be 40 characters.
 */
const TableViewNamePanel = ({
  title,
  initialName,
  onCommit,
  onCancel,
}: TableViewNamePanelProps) => {
  const [name, setName] = useState(initialName);
  const field = useRef<HTMLInputElement>(null);
  const trimmed = name.trim();

  // Focused on arrival rather than with `autoFocus`, which the a11y rules
  // rightly ban for a page: it steals focus from wherever someone actually is.
  // Inside a panel that opened because they asked to name something, the field
  // is the only thing here, and leaving focus behind means a second click to
  // start typing.
  useEffect(() => {
    field.current?.focus();
  }, []);

  const commit = () => {
    if (trimmed === '') return;
    onCommit(trimmed);
  };

  return (
    <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-p-2">
      <span className="mdt-text-sm mdt-font-medium">{title}</span>
      <Input
        ref={field}
        size="sm"
        aria-label={title}
        placeholder="View name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        onKeyDown={(event) => {
          // Enter saves, because reaching for the mouse to confirm one field is
          // the slow way round. Escape is not handled here: Radix listens for
          // it on the document, which a React `stopPropagation` never reaches -
          // the panel's owner catches it on `onEscapeKeyDown` instead.
          if (event.key !== 'Enter') return;
          event.preventDefault();
          commit();
        }}
      />
      <div className="mdt-flex mdt-justify-end mdt-gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        {/*
          Disabled on an empty name rather than saving a view called "" - a row
          in the list with nothing to click on and nothing to read.
        */}
        <Button size="sm" disabled={trimmed === ''} onClick={commit}>
          Save
        </Button>
      </div>
    </div>
  );
};
TableViewNamePanel.displayName = 'TableViewNamePanel';

/**
 * TableViewSwitcher - the saved views, and what you can do to them.
 *
 * A view is a name for a table you have already set up: the columns you kept,
 * the sort you chose, the filters you applied. Everything from 5a to 5f reports
 * its state; this is the control that makes that state worth keeping.
 *
 * **The trigger shows the view you are in, not the word "Views".** It is the
 * one label on the screen that says which of six similar-looking tables you are
 * looking at, and a generic word there wastes it.
 *
 * **Changing the table does not change the view.** It marks it - the dot on the
 * trigger, "Unsaved changes" in the panel - and waits. A view that saved itself
 * as you worked would quietly rewrite the thing you go back to when an
 * experiment does not work out, which is the entire point of having saved it.
 *
 * **Renaming and creating share one panel**, reached by drilling in, the same
 * way `TableFilterMenu` drills into an attribute. A text field inside a command
 * list fights the list for the keyboard - Enter selects a row, typing jumps to
 * a match - so the list gets out of the way while you type.
 */
const TableViewSwitcher = ({
  views,
  activeId = null,
  dirty = false,
  onApply,
  onSave,
  onSaveAs,
  onRename,
  onRemove,
  onReset,
  label = 'Views',
  className,
}: TableViewSwitcherProps) => {
  const [open, setOpen] = useState(false);
  // `list`, or the id being renamed, or `new` for one being created.
  const [naming, setNaming] = useState<string | null>(null);

  const active = views.find((view) => view.id === activeId) ?? null;
  const renaming = naming === null || naming === 'new' ? null : views.find((v) => v.id === naming);

  const close = (next: boolean) => {
    setOpen(next);
    // The next open starts on the list, not halfway through naming something
    // you walked away from.
    if (!next) setNaming(null);
  };

  const commitName = (name: string) => {
    if (naming === 'new') onSaveAs(name);
    else if (naming !== null) onRename?.(naming, name);
    setNaming(null);
  };

  return (
    <Popover open={open} onOpenChange={close}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn('mdt-max-w-56', className)}>
          <Icon name="bookmark" size="sm" aria-hidden />
          <span className="mdt-truncate">{active?.name ?? label}</span>
          {/*
            A dot rather than the word "unsaved": the trigger is already showing
            a name of unknown length, and a second string turns the one control
            that says where you are into a sentence.
          */}
          {dirty && (
            <span
              aria-label="Unsaved changes"
              role="img"
              className="mdt-h-1.5 mdt-w-1.5 mdt-shrink-0 mdt-rounded-full mdt-bg-primary"
            />
          )}
          <Icon name="chevron-down" size="sm" aria-hidden />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="mdt-w-72 mdt-p-0"
        onEscapeKeyDown={(event) => {
          // While naming, Escape backs out to the list rather than closing
          // everything. Someone who mistypes a name wants the name gone, not
          // the panel gone - and Radix will not hear a `stopPropagation` from
          // the field, because it listens on the document.
          if (naming === null) return;
          event.preventDefault();
          setNaming(null);
        }}
      >
        {naming !== null ? (
          <TableViewNamePanel
            title={renaming ? 'Rename view' : 'Save this view'}
            initialName={renaming?.name ?? ''}
            onCommit={commitName}
            onCancel={() => {
              setNaming(null);
            }}
          />
        ) : (
          <>
            <Command>
              <CommandList>
                <CommandEmpty>No saved views yet.</CommandEmpty>
                <CommandGroup heading="Saved views">
                  {views.map((view) => (
                    <CommandItem
                      key={view.id}
                      value={view.name}
                      className="mdt-group/view mdt-gap-2"
                      onSelect={() => {
                        onApply(view.id);
                        close(false);
                      }}
                    >
                      <Icon
                        name="check"
                        size="sm"
                        aria-hidden
                        className={cn(view.id !== activeId && 'mdt-invisible')}
                      />
                      <span className="mdt-flex-1 mdt-truncate">{view.name}</span>
                      {/*
                        Revealed on hover and on focus. Always-on rename and
                        delete buttons make a list of views look like a list of
                        controls, and the thing you nearly always want is to
                        click the name.
                      */}
                      <span className="mdt-flex mdt-items-center mdt-opacity-0 focus-within:mdt-opacity-100 group-hover/view:mdt-opacity-100">
                        {onRename !== undefined && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={ICON_BUTTON}
                            aria-label={`Rename ${view.name}`}
                            onClick={(event) => {
                              // The row applies the view; these two must not.
                              event.stopPropagation();
                              setNaming(view.id);
                            }}
                          >
                            <Icon name="pencil" size="sm" aria-hidden />
                          </Button>
                        )}
                        {onRemove !== undefined && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={ICON_BUTTON}
                            aria-label={`Delete ${view.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              onRemove(view.id);
                            }}
                          >
                            <Icon name="trash-2" size="sm" aria-hidden />
                          </Button>
                        )}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>

            <div className={FOOTER}>
              {dirty && active !== null && (
                <>
                  <span className="mdt-px-2 mdt-text-xs mdt-text-muted-foreground">
                    Unsaved changes to {active.name}
                  </span>
                  {onSave !== undefined && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mdt-justify-start"
                      onClick={() => {
                        onSave();
                        close(false);
                      }}
                    >
                      <Icon name="save" size="sm" aria-hidden />
                      Save changes
                    </Button>
                  )}
                  {onReset !== undefined && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mdt-justify-start"
                      onClick={() => {
                        onReset();
                        close(false);
                      }}
                    >
                      <Icon name="rotate-ccw" size="sm" aria-hidden />
                      Discard changes
                    </Button>
                  )}
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="mdt-justify-start"
                onClick={() => {
                  setNaming('new');
                }}
              >
                <Icon name="plus" size="sm" aria-hidden />
                Save as new view
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
TableViewSwitcher.displayName = 'TableViewSwitcher';

export { TableViewSwitcher, TableViewNamePanel };
