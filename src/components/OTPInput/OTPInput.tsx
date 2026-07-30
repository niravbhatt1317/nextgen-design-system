'use client';

import { forwardRef, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { cn } from '@/utils';
import type { OTPInputProps } from './OTPInput.types';

/**
 * OTPInput - One-Time Password input component
 *
 * A fully accessible OTP input component with the following features:
 * - Auto-focus on first empty input
 * - Auto-advance on input
 * - Backspace navigation
 * - Paste support (pastes complete OTP)
 * - Arrow key navigation
 * - Keyboard accessible
 * - Supports numeric and alphanumeric modes
 *
 * @example
 * ```tsx
 * <OTPInput
 *   length={6}
 *   value={otp}
 *   onChange={setOtp}
 * />
 * ```
 */
const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      className,
      length = 6,
      value = '',
      onChange,
      onComplete,
      type = 'numeric',
      disabled = false,
      autoFocus = true,
      placeholder = '○',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Initialize value array from string
    const valueArray = value.split('').slice(0, length);
    while (valueArray.length < length) {
      valueArray.push('');
    }

    // Auto-focus first input on mount
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    // Call onComplete when OTP is fully entered
    useEffect(() => {
      if (value.length === length && onComplete) {
        onComplete(value);
      }
    }, [value, length, onComplete]);

    const focusInput = (index: number) => {
      const input = inputRefs.current[index];
      if (input) {
        input.focus();
        input.select();
      }
    };

    const handleChange = (index: number, inputValue: string) => {
      if (disabled) return;

      // Get only the last character entered
      const newChar = inputValue.slice(-1);

      // Validate input based on type
      if (type === 'numeric' && newChar && !/^\d$/.test(newChar)) {
        return;
      }
      if (type === 'alphanumeric' && newChar && !/^[a-zA-Z0-9]$/.test(newChar)) {
        return;
      }

      // Update value
      const newValueArray = [...valueArray];
      newValueArray[index] = newChar;
      const newValue = newValueArray.join('');

      onChange?.(newValue);

      // Auto-advance to next input
      if (newChar && index < length - 1) {
        focusInput(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      // Backspace: clear current and move to previous
      if (e.key === 'Backspace') {
        e.preventDefault();
        const newValueArray = [...valueArray];

        if (valueArray[index]) {
          // Clear current input
          newValueArray[index] = '';
          onChange?.(newValueArray.join(''));
        } else if (index > 0) {
          // Move to previous input and clear it
          newValueArray[index - 1] = '';
          onChange?.(newValueArray.join(''));
          focusInput(index - 1);
        }
      }

      // Arrow Left: move to previous
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      }

      // Arrow Right: move to next
      if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }

      // Home: focus first input
      if (e.key === 'Home') {
        e.preventDefault();
        focusInput(0);
      }

      // End: focus last input
      if (e.key === 'End') {
        e.preventDefault();
        focusInput(length - 1);
      }

      // Delete: clear current input
      if (e.key === 'Delete') {
        e.preventDefault();
        const newValueArray = [...valueArray];
        newValueArray[index] = '';
        onChange?.(newValueArray.join(''));
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (disabled) return;

      const pastedData = e.clipboardData.getData('text/plain').trim();

      // Validate pasted data
      const isValid =
        type === 'numeric' ? /^\d+$/.test(pastedData) : /^[a-zA-Z0-9]+$/.test(pastedData);

      if (!isValid) return;

      // Take only the required length
      const pastedValue = pastedData.slice(0, length);
      onChange?.(pastedValue);

      // Focus the last filled input or the next empty one
      const nextIndex = Math.min(pastedValue.length, length - 1);
      focusInput(nextIndex);
    };

    return (
      <div ref={ref} className={cn('mdt-flex mdt-items-center mdt-gap-2', className)} {...props}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type={type === 'numeric' ? 'tel' : 'text'}
            inputMode={type === 'numeric' ? 'numeric' : 'text'}
            maxLength={1}
            value={valueArray[index] ?? ''}
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(index, e);
            }}
            onPaste={handlePaste}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={`OTP digit ${String(index + 1)} of ${String(length)}`}
            className={cn(
              // Base styles
              'mdt-flex',
              'mdt-items-center mdt-justify-center',
              'mdt-rounded-md mdt-border mdt-border-input',
              'mdt-bg-transparent',
              'mdt-text-center mdt-font-medium mdt-text-foreground',
              'mdt-shadow-sm mdt-transition-colors',
              'placeholder:mdt-text-muted-foreground',
              'focus-visible:mdt-outline-none',
              'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50',
              // Size variants
              size === 'sm' && 'mdt-h-9 mdt-w-9 mdt-text-sm',
              size === 'md' && 'mdt-h-12 mdt-w-12 mdt-text-lg',
              size === 'lg' && 'mdt-h-14 mdt-w-14 mdt-text-xl'
            )}
          />
        ))}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';

export { OTPInput };
