import { forwardRef, useId, useRef, useState } from 'react';
import { cn } from '@/utils';
import { DatePicker, formatDateTime, formatDay } from '../DatePicker';
import { Icon } from '../Icon';
import { InputVariants } from '../Input/Input';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import type { DateInputProps } from './DateInput.types';

/**
 * DateInput - THE FIELD for a day (Pranjal, 2026-09-22: "move date picker
 * field in input field").
 *
 * It is a button wearing the Input's box, so every ruled state comes from the
 * one place: 32 high, corners 8, 13 text in neutral-90, the placeholder in
 * the faint ink (#8FA0BD), a neutral-30 edge; the primary border under the pointer; the
 * primary border with the 3-px 8% halo when focused or open; disabled on the
 * neutral-10 ground in the placeholder colour; error in the danger border with
 * the red halo and the message under. The calendar glyph is 16 at the RIGHT,
 * 12 from the edge (K-Field-28); held, the 14 lock takes its place and the
 * value truncates before it (K-Field-11).
 *
 * Click, Enter or Space opens the DatePicker in the library Popover - below the
 * field, above it when there is no room - with the focus on the picked day (or
 * today). Choices there are a draft: Apply saves and closes, Escape or a press
 * outside closes without saving, and the focus returns to the field. The value
 * is a DAY, "YYYY-MM-DD", shown as "22 Oct 2026" - three-letter months always,
 * never the browser's "Sept". With `withTime` (a developer setting, never a
 * switch people see) it is "YYYY-MM-DDTHH:mm", shown as "13 Oct 2026, 14:30".
 *
 * @example
 * <DateInput label="Expires on" value={day} onChange={setDay} min={todayAsDay} />
 * <DateInput label="Joined" value="2024-03-01" locked />
 */
const DateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      value,
      onChange,
      withTime = false,
      timeStep,
      placeholder,
      min,
      max,
      disabled,
      locked,
      error,
      helperText,
      label,
      size = 'sm',
      clearable,
      'aria-label': ariaLabel,
      wrapperClassName,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const held = Boolean(locked);
    const off = Boolean(disabled) || held;
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);
    const [open, setOpen] = useState(false);

    const panelRef = useRef<HTMLDivElement>(null);

    const shown = withTime ? formatDateTime(value) : formatDay(value);
    const empty = placeholder ?? (withTime ? 'Pick a date and time' : 'Pick a date');
    const filled = shown !== '';

    const close = () => {
      setOpen(false);
    };
    const apply = (next: string) => {
      onChange?.(next);
      close();
    };

    let describedBy: string | undefined;
    if (hasError) describedBy = errorId;
    else if (helperText) describedBy = helperId;

    const calendarName = typeof label === 'string' ? label : (ariaLabel ?? 'Calendar');

    return (
      <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="mdt-text-[13px] mdt-text-neutral-90">
            {label}
          </label>
        )}
        <Popover
          open={open && !off}
          onOpenChange={(next) => {
            setOpen(next && !off);
          }}
        >
          <div className="mdt-relative mdt-flex mdt-items-center">
            <PopoverTrigger asChild>
              <button
                id={id}
                ref={ref}
                type="button"
                disabled={off}
                aria-label={ariaLabel}
                /* a button may not carry aria-invalid; the alert under it is linked through aria-describedby */
                data-invalid={hasError ? 'true' : undefined}
                aria-describedby={describedBy}
                className={cn(
                  InputVariants({ size, hasError }),
                  /* a button centres its text; the field starts it at the left and never wraps */
                  'mdt-cursor-pointer mdt-items-center mdt-justify-start mdt-whitespace-nowrap mdt-text-left',
                  /* open, the field keeps the focus look - the primary border and the halo */
                  'data-[state=open]:mdt-border-primary data-[state=open]:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
                  /* the text stops before the glyph: 12 + the 16 calendar + 8 = 36; held, 12 + the 14 lock + 8 = 34 */
                  held ? 'mdt-pr-[34px]' : 'mdt-pr-9',
                  className
                )}
                {...rest}
              >
                <span className={cn('mdt-truncate', !filled && 'mdt-font-normal mdt-text-faint')}>
                  {filled ? shown : empty}
                </span>
              </button>
            </PopoverTrigger>
            <span
              /* the lock and the calendar glyph both in the faint ink #8FA0BD, as the console's date field draws its glyph
               * (measured 2026-09-22; the library's neutral-70 is a different grey, C-112) */
              className="mdt-pointer-events-none mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-faint"
              aria-hidden
            >
              {held ? (
                <Icon name="lock" size={14} aria-hidden />
              ) : (
                <Icon name="calendar" size={16} aria-hidden />
              )}
            </span>
          </div>
          <PopoverContent
            ref={panelRef}
            align="start"
            /* 4 under the field (above it when there is no room below - Radix flips it), corners 12, the panel's
             * own padding inside the picker; the overlay ground, the neutral-30 hairline and the lg shadow */
            sideOffset={4}
            collisionPadding={8}
            className="mdt-w-auto mdt-rounded-xl mdt-p-0"
            onOpenAutoFocus={(e) => {
              /* the focus lands on the picked day (or today), not on the first arrow */
              e.preventDefault();
              panelRef.current?.querySelector<HTMLElement>('[data-day][tabindex="0"]')?.focus();
            }}
          >
            <DatePicker
              value={value}
              withTime={withTime}
              timeStep={timeStep}
              min={min}
              max={max}
              clearable={clearable}
              onChange={apply}
              aria-label={calendarName}
            />
          </PopoverContent>
        </Popover>
        {error && (
          <p
            id={errorId}
            className="mdt-flex mdt-items-center mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
            role="alert"
          >
            {/* the alert mark, 12, before the message (K-Field-10) */}
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

DateInput.displayName = 'DateInput';

export { DateInput };
