import { forwardRef, useId, useRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { InputVariants } from '../Input/Input';

/**
 * NumberInput - THE FIELD with its own stepper (Pranjal, 2026-09-17, the
 * inputs mock). The browser's native spinner is an unstylable grey block, so
 * the field hides it and draws its own up/down pair at the right: two 18 × 11
 * buttons stacked 4 from the edge, 9-px chevrons, transparent at rest and
 * neutral-20 under the pointer. Keyboard arrows and typing keep working;
 * clamping to min / max is the caller's job at apply time - mid-typing values
 * are never fought.
 */
export interface NumberInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'type'
> {
  /** The field's value, as the input holds it (a string, so a half-typed number is never fought) */
  value?: string | number | undefined;
  /** Fires with the next value as a string - from typing or from the stepper */
  onChange?: ((value: string) => void) | undefined;
  /** Optional label rendered above */
  label?: ReactNode;
  /** Error text under the field; also paints the danger border */
  error?: string | undefined;
  /** Helper text under the field, shown when there is no error */
  helperText?: string | undefined;
  /** The step the buttons and the arrow keys take */
  step?: number | undefined;
  /** 32 (sm, the default) · 36 (md) · 40 (lg) */
  size?: 'sm' | 'md' | 'lg' | undefined;
  /** Class name for the outer wrapper */
  wrapperClassName?: string | undefined;
  /** A held field (Pranjal, 2026-09-17): disabled, the lock inside in place of the stepper */
  locked?: boolean | undefined;
  /**
   * The unit the number counts - "Seconds", "Minutes", "Hours", "Days", "Months". Drawn inside the field at its end,
   * behind a hairline that runs border to border, in place of the stepper; the arrow keys still step. Keep the field
   * short (`wrapperClassName="mdt-w-40"`) - the box holds a few digits and the word.
   */
  unit?: ReactNode;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      label,
      error,
      helperText,
      step = 1,
      size = 'sm',
      min,
      max,
      disabled,
      locked,
      unit,
      className,
      wrapperClassName,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const held = Boolean(locked);
    const hasUnit = unit !== undefined && unit !== null && unit !== '' && !held;
    const off = Boolean(disabled) || held;
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);
    const inner = useRef<HTMLInputElement | null>(null);

    const setRef = (el: HTMLInputElement | null) => {
      inner.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

    const stepBy = (direction: 1 | -1) => {
      if (off) return;
      const current = Number(inner.current?.value ?? value ?? 0) || 0;
      let next = current + direction * step;
      if (typeof min === 'number') next = Math.max(min, next);
      if (typeof max === 'number') next = Math.min(max, next);
      onChange?.(String(next));
    };

    const stepButton =
      'mdt-flex mdt-h-[11px] mdt-w-[18px] mdt-cursor-pointer mdt-items-center mdt-justify-center mdt-rounded-[3px] mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 disabled:mdt-pointer-events-none disabled:mdt-text-neutral-40';

    return (
      <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
            {label}
          </label>
        )}
        <div className="mdt-relative mdt-flex mdt-items-center">
          <input
            id={id}
            ref={setRef}
            type="number"
            value={value ?? ''}
            min={min}
            max={max}
            step={step}
            disabled={off}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
            className={cn(
              InputVariants({ size, hasError }),
              'mdt-pr-[30px] mdt-tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:mdt-appearance-none [&::-webkit-outer-spin-button]:mdt-appearance-none',
              /* held: the lock takes the stepper's place - 34 at the right, the value ends in an ellipsis */
              held && 'mdt-text-ellipsis mdt-pr-[34px]',
              /* with a unit: the digits stop 84 short of the edge, clear of the word ("30  Seconds") */
              hasUnit && 'mdt-pr-[84px]',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...props}
          />
          {held ? (
            <span className="mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-faint">
              <Icon name="lock" size={14} aria-hidden />
            </span>
          ) : hasUnit ? (
            /* THE UNIT INSIDE (ported from the console's NumberField, Ronak 2026-10-09: "remove the Seconds text at
             * right side of the label and add that in the input field at right side", "the vertical full separator
             * line like we did in the browse field"): a hairline from the field's top border to its bottom one, 11
             * to the word, 13 in the faint ink, 12 from the edge. Clicks pass through to the field. */
            <span className="mdt-pointer-events-none mdt-absolute mdt-inset-y-px mdt-right-3 mdt-flex mdt-items-center mdt-whitespace-nowrap mdt-border-l mdt-border-neutral-30 mdt-pl-[11px] mdt-text-[13px] mdt-leading-none mdt-text-faint">
              {unit}
            </span>
          ) : (
            <span className="mdt-absolute mdt-right-1 mdt-top-1/2 mdt-flex -mdt-translate-y-1/2 mdt-flex-col mdt-gap-px">
              <button
                type="button"
                tabIndex={-1}
                aria-label="Increase"
                disabled={off}
                className={stepButton}
                onClick={() => {
                  stepBy(1);
                }}
              >
                <Icon name="chevron-up" size={9} aria-hidden />
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Decrease"
                disabled={off}
                className={stepButton}
                onClick={() => {
                  stepBy(-1);
                }}
              >
                <Icon name="chevron-down" size={9} aria-hidden />
              </button>
            </span>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="mdt-flex mdt-items-start mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
            role="alert"
          >
            {/* the alert mark, 12, before the message (K-Field-10) */}
            <Icon name="alert-circle" size={12} className="mdt-mt-0.5 mdt-shrink-0" aria-hidden />
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

NumberInput.displayName = 'NumberInput';
