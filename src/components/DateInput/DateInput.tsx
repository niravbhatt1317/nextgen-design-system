import { forwardRef, useId, useState } from 'react';
import { cn } from '@/utils';
import { DatePicker, formatDay } from '../DatePicker';
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
 * neutral-70, a neutral-30 edge; the primary border under the pointer; the
 * primary border with the 3-px 8% halo when focused or open; disabled on the
 * neutral-10 ground in the placeholder colour; error in the danger border with
 * the red halo and the message under. The calendar glyph is 16 at the RIGHT,
 * 12 from the edge (K-Field-28); held, the 14 lock takes its place and the
 * value truncates before it (K-Field-11).
 *
 * Click, Enter or Space opens the DatePicker below in the library Popover;
 * picking a day, Clear, Done and Escape close it. The value is a DAY,
 * "YYYY-MM-DD", shown as "22 Oct 2026" - three-letter months always, never the
 * browser's "Sept".
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
      placeholder = 'Pick a date',
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

    const shown = formatDay(value);
    const filled = shown !== '';

    const close = () => {
      setOpen(false);
    };
    const pick = (day: string) => {
      onChange?.(day);
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
                <span className={cn('mdt-truncate', !filled && 'mdt-text-neutral-70')}>
                  {filled ? shown : placeholder}
                </span>
              </button>
            </PopoverTrigger>
            <span
              className="mdt-pointer-events-none mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-neutral-70"
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
            align="start"
            sideOffset={4}
            className="mdt-w-auto mdt-rounded-2xl mdt-p-5"
          >
            <DatePicker
              value={value}
              min={min}
              max={max}
              onChange={pick}
              onClear={
                clearable
                  ? () => {
                      pick('');
                    }
                  : undefined
              }
              onDone={close}
              aria-label={calendarName}
            />
          </PopoverContent>
        </Popover>
        {error && (
          <p id={errorId} className="mdt-text-xs mdt-text-destructive" role="alert">
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
