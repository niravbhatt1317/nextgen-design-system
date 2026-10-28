'use client';

import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/utils';
import { PICKED_ROW_CLASSES } from '@/utils/picked-row';
import { Icon } from '../Icon';
import { Popover, PopoverAnchor, PopoverContent } from '../Popover';
import { RequiredMark } from '../RequiredMark';
import { selectTriggerVariants } from '../Select/Select';
import type { ComboboxOption, ComboboxProps } from './Combobox.types';

/** A typed query matches the label, the value or the second line, ignoring case. */
const matches = (option: ComboboxOption, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    option.label.toLowerCase().includes(q) ||
    option.value.toLowerCase().includes(q) ||
    (option.description?.toLowerCase().includes(q) ?? false)
  );
};

/** The next row the keys can land on, skipping disabled ones; -1 when there is none. */
const step = (list: ComboboxOption[], from: number, by: 1 | -1) => {
  const n = list.length;
  for (let k = 1; k <= n; k++) {
    const i = (((from + by * k) % n) + n) % n;
    if (!list[i]?.disabled) return i;
  }
  return -1;
};

/**
 * THE TYPE-IN PICKER - `<Combobox search="field">` (Pranjal, 2026-10-21: "in type to search drop down input field itself
 * will act as search ... there should not be two different input field for search and shown results").
 *
 * The field IS the search box. A click (or ArrowDown) opens every option; typing narrows them and lights the first
 * match grey, so Enter picks it. Picked, the list closes and the field reads the label, a hairline and the second line
 * ("env:staging | 353 agents") - or the label alone for a one-line option. Reopening shows the whole list again with
 * the pick on the pale ground and its tick at the right, its name selected so typing replaces it. Escape, Tab or a
 * click elsewhere closes the list and keeps the last pick: nothing changes until something is picked. The field wears
 * the Select's own box (selectTriggerVariants), so the two read as one family.
 */
export const ComboboxFieldSearch = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = 'Select...',
      emptyMessage = 'No results found.',
      size = 'md',
      disabled = false,
      required = false,
      error,
      label,
      helperText,
      name,
      id: propId,
      className,
      wrapperClassName,
      clearable = false,
      renderOption,
      renderValue,
      onSearch,
      onOpenChange,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    },
    ref
  ) => {
    const generatedId = useId();
    const comboboxId = propId ?? generatedId;
    const listId = `${comboboxId}-listbox`;
    const optionId = (i: number) => `${comboboxId}-option-${String(i)}`;
    const errorId = `${comboboxId}-error`;
    const helperId = `${comboboxId}-helper`;
    const hasError = Boolean(error);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    /* set by the press that opens the list, read by its mousedown: React re-renders between the two */
    const openingRef = useRef(false);
    /* the field's input is both ours and the caller's */
    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
    const [open, setOpen] = useState(false);
    /* what is in the field while the list is open; `typed` turns filtering on, so reopening on a pick shows every option */
    const [query, setQuery] = useState('');
    const [typed, setTyped] = useState(false);
    const [active, setActive] = useState(-1);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((o) => o.value === currentValue);
    const shown = typed ? options.filter((o) => matches(o, query)) : options;

    const setOpenState = useCallback(
      (next: boolean) => {
        setOpen(next);
        onOpenChange?.(next);
      },
      [onOpenChange]
    );

    const openList = useCallback(() => {
      if (disabled || open) return;
      setTyped(false);
      setQuery(selectedOption?.label ?? '');
      setActive(selectedOption ? options.indexOf(selectedOption) : -1);
      setOpenState(true);
    }, [disabled, open, options, selectedOption, setOpenState]);

    const close = useCallback(() => {
      setTyped(false);
      setQuery('');
      setActive(-1);
      setOpenState(false);
    }, [setOpenState]);

    const pick = useCallback(
      (option: ComboboxOption | undefined) => {
        if (!option || option.disabled) return;
        if (!isControlled) setInternalValue(option.value);
        onValueChange?.(option.value);
        close();
      },
      [close, isControlled, onValueChange]
    );

    /* reopening on a pick selects its name, so typing replaces it */
    useEffect(() => {
      if (open && !typed && selectedOption) inputRef.current?.select();
    }, [open, typed, selectedOption]);

    /* the lit row stays in view as the keys move it, and a reopened long list starts at the pick. The list is drawn
     * through a portal that mounts a render later, so the scroll waits for the next frame. */
    useEffect(() => {
      if (!open || active < 0) return;
      const frame = requestAnimationFrame(() => {
        /* jsdom has no scrollIntoView, so the call stays optional */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        document.getElementById(optionId(active))?.scrollIntoView?.({ block: 'nearest' });
      });
      return () => {
        cancelAnimationFrame(frame);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- optionId is derived from comboboxId
    }, [open, active, comboboxId]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          e.preventDefault();
          if (!open) {
            openList();
            return;
          }
          if (shown.length) setActive(step(shown, active, e.key === 'ArrowDown' ? 1 : -1));
          return;
        }
        case 'Enter':
          if (open && active >= 0) {
            e.preventDefault();
            pick(shown[active]);
          } else if (!open) {
            e.preventDefault();
            openList();
          }
          return;
        case 'Escape':
          if (open) {
            /* the list closes; the drawer or dialog under it stays */
            e.preventDefault();
            e.stopPropagation();
            close();
          }
          return;
        case 'Tab':
          if (open) close();
          return;
        default:
      }
    };

    const clearTyped = open && typed && query !== '';
    const clearPick = !open && clearable && Boolean(selectedOption);
    const showValue = !open && Boolean(selectedOption);
    const describedBy = hasError ? errorId : helperText ? helperId : ariaDescribedBy;
    const empty = typeof emptyMessage === 'function' ? emptyMessage(query.trim()) : emptyMessage;

    return (
      <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
        {/* the Select's label: the field wears the Select's box, so the two read as one family */}
        {label && (
          <label
            htmlFor={comboboxId}
            className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90"
          >
            {label}
            {/* the field carries aria-required itself, so the mark stays quiet */}
            {required && <RequiredMark announce={false} />}
          </label>
        )}

        <Popover
          open={open}
          onOpenChange={(next) => {
            if (!next) close();
          }}
        >
          <PopoverAnchor asChild>
            {/* the box hands a press to its input; the keys live on the input */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              ref={anchorRef}
              data-state={open ? 'open' : 'closed'}
              data-disabled={disabled ? '' : undefined}
              onPointerDown={(e) => {
                if (disabled) return;
                if (e.target instanceof Element && e.target.closest('[data-combobox-clear]'))
                  return;
                openingRef.current = !open;
                if (e.target !== inputRef.current) e.preventDefault();
                inputRef.current?.focus();
                openList();
              }}
              onMouseDown={(e) => {
                /* opening, the press must not drop the caret into the text: the pick's name stays selected, so typing
                 * replaces it; once open, a press in the text places the caret as usual */
                if (openingRef.current || e.target !== inputRef.current) e.preventDefault();
                openingRef.current = false;
              }}
              className={cn(
                selectTriggerVariants({ size, hasError }),
                'mdt-relative mdt-cursor-text',
                'focus-within:mdt-border-primary focus-within:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
                disabled &&
                  'mdt-cursor-not-allowed mdt-bg-neutral-10 mdt-text-faint hover:mdt-border-neutral-30',
                className
              )}
            >
              <input
                ref={setInputRef}
                id={comboboxId}
                type="text"
                role="combobox"
                autoComplete="off"
                spellCheck={false}
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={describedBy}
                aria-invalid={(ariaInvalid ?? hasError) || undefined}
                aria-required={required || undefined}
                disabled={disabled}
                placeholder={selectedOption ? '' : placeholder}
                value={open ? query : ''}
                onChange={(e) => {
                  if (!open) setOpenState(true);
                  setQuery(e.target.value);
                  setTyped(true);
                  onSearch?.(e.target.value);
                  const next = options.filter((o) => matches(o, e.target.value));
                  setActive(next.findIndex((o) => !o.disabled));
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (open) close();
                }}
                className={cn(
                  'mdt-h-full mdt-min-w-0 mdt-flex-1 mdt-border-0 mdt-bg-transparent mdt-p-0',
                  'mdt-font-medium mdt-text-neutral-130 mdt-outline-none',
                  'placeholder:mdt-font-normal placeholder:mdt-text-faint',
                  'disabled:mdt-cursor-not-allowed',
                  showValue && 'mdt-text-transparent mdt-caret-transparent'
                )}
              />
              {/* the pick at rest: its name, the hairline, its second line (or the name alone) */}
              {showValue && selectedOption && (
                <span
                  aria-hidden
                  className="mdt-pointer-events-none mdt-absolute mdt-inset-y-0 mdt-left-3 mdt-right-9 mdt-flex mdt-min-w-0 mdt-items-center mdt-gap-2"
                >
                  {renderValue ? (
                    renderValue(selectedOption)
                  ) : (
                    <>
                      {selectedOption.icon && (
                        <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center">
                          {selectedOption.icon}
                        </span>
                      )}
                      <span className="mdt-max-w-[70%] mdt-shrink-0 mdt-truncate">
                        {selectedOption.label}
                      </span>
                      {selectedOption.description && (
                        <>
                          <span className="mdt-h-3 mdt-w-px mdt-shrink-0 mdt-bg-neutral-40" />
                          {/* a long second line gives way first and ends in "…"; the name keeps up to 70% */}
                          <span className="mdt-min-w-0 mdt-truncate mdt-font-normal mdt-text-neutral-90">
                            {selectedOption.description}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              )}
              {(clearTyped || clearPick) && (
                <button
                  type="button"
                  data-combobox-clear=""
                  aria-label={clearTyped ? 'Clear what you typed' : 'Clear selection'}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (clearTyped) {
                      setQuery('');
                      setTyped(false);
                      setActive(-1);
                      onSearch?.('');
                      inputRef.current?.focus();
                    } else {
                      if (!isControlled) setInternalValue(null);
                      onValueChange?.(null);
                    }
                  }}
                  className="mdt-flex mdt-h-5 mdt-w-5 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-muted-foreground hover:mdt-text-foreground focus-visible:mdt-outline-none"
                >
                  <Icon name="x" size={14} aria-hidden />
                </button>
              )}
              <Icon
                name="chevron-down"
                size={16}
                className="mdt-shrink-0 mdt-opacity-50"
                aria-hidden
              />
              {name && <input type="hidden" name={name} value={currentValue ?? ''} />}
            </div>
          </PopoverAnchor>

          {/* the library's own popover: portalled, the overlay surface, and its wheel and touch kept from a drawer's
              scroll lock so a long list scrolls inside a drawer or dialog */}
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
            }}
            onInteractOutside={(e) => {
              /* a press on the field itself is not "outside": it keeps typing */
              if (e.target instanceof Node && anchorRef.current?.contains(e.target))
                e.preventDefault();
            }}
            className="mdt-w-[var(--radix-popover-trigger-width)] mdt-overflow-hidden mdt-p-0"
          >
            <div
              id={listId}
              role="listbox"
              aria-label={label ?? ariaLabel}
              aria-labelledby={label ? undefined : ariaLabelledBy}
              className="mdt-max-h-[300px] mdt-overflow-y-auto mdt-overflow-x-hidden mdt-p-1"
            >
              {shown.length === 0 ? (
                <div className="mdt-py-6 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
                  {empty}
                </div>
              ) : (
                shown.map((option, i) => {
                  const isSelected = option.value === currentValue;
                  /* a group's heading over its first option */
                  const heading =
                    option.group !== undefined && option.group !== shown[i - 1]?.group;
                  return (
                    <Fragment key={option.value}>
                      {heading && (
                        <div
                          role="presentation"
                          className="mdt-px-2 mdt-py-1.5 mdt-text-xs mdt-font-semibold mdt-text-muted-foreground"
                        >
                          {option.group}
                        </div>
                      )}
                      {/* the keys live on the field (aria-activedescendant), so a row takes no tab stop */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                      <div
                        id={optionId(i)}
                        role="option"
                        tabIndex={-1}
                        aria-selected={isSelected}
                        aria-disabled={option.disabled ? true : undefined}
                        data-highlighted={i === active ? '' : undefined}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          pick(option);
                        }}
                        onMouseMove={() => {
                          if (i !== active && !option.disabled) setActive(i);
                        }}
                        className={cn(
                          'mdt-relative mdt-flex mdt-w-full mdt-cursor-pointer mdt-select-none mdt-items-center mdt-gap-2',
                          'mdt-rounded-sm mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-text-foreground mdt-outline-none',
                          i === active && 'mdt-bg-neutral-10',
                          option.disabled && 'mdt-pointer-events-none mdt-opacity-50',
                          /* the pick on the pale ground in every state, its tick at the right (2026-10-21) */
                          isSelected && PICKED_ROW_CLASSES
                        )}
                      >
                        {renderOption ? (
                          renderOption({ option, selected: isSelected })
                        ) : (
                          <>
                            {option.icon && (
                              <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center">
                                {option.icon}
                              </span>
                            )}
                            <div className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col">
                              <span className="mdt-truncate">{option.label}</span>
                              {option.description && (
                                <span className="mdt-text-xs mdt-text-muted-foreground">
                                  {option.description}
                                </span>
                              )}
                            </div>
                            <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center">
                              {isSelected && <Icon name="check" size={16} aria-hidden />}
                            </span>
                          </>
                        )}
                      </div>
                    </Fragment>
                  );
                })
              )}
            </div>
          </PopoverContent>
        </Popover>

        {error && (
          <p
            id={errorId}
            className="mdt-flex mdt-items-center mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
            role="alert"
          >
            {/* the Select's alert mark, 12, before the message */}
            <Icon name="alert-circle" size={12} aria-hidden />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mdt-text-xs mdt-text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ComboboxFieldSearch.displayName = 'ComboboxFieldSearch';
