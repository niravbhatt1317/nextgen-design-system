'use client';

import { cva } from 'class-variance-authority';
import { forwardRef, useCallback, useEffect, useId, useState } from 'react';
import { cn } from '@/utils';
import type { ComboboxProps } from './Combobox.types';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';
import { Icon } from '../Icon';

/**
 * Combobox trigger variants using Class Variance Authority (CVA)
 */
export const comboboxTriggerVariants = cva(
  [
    'mdt-flex mdt-w-full mdt-items-center mdt-justify-between',
    'mdt-rounded-md',
    'mdt-bg-background mdt-text-foreground',
    'mdt-transition-colors',
    'focus:mdt-outline-none',
    'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50',
    '[&>span]:mdt-line-clamp-1',
  ],
  {
    variants: {
      variant: {
        default: 'mdt-border mdt-border-input hover:mdt-bg-muted/50',
        outline: 'mdt-border mdt-border-input',
      },
      size: {
        sm: 'mdt-h-8 mdt-gap-1 mdt-px-3 mdt-text-xs',
        md: 'mdt-h-9 mdt-gap-2 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-gap-2 mdt-px-4 mdt-text-base',
      },
      hasError: {
        true: 'mdt-border-destructive',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hasError: false,
    },
  }
);

/**
 * Combobox component with search and keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Combobox
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'angular', label: 'Angular' },
 *   ]}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select framework..."
 * />
 *
 * // With search
 * <Combobox
 *   options={frameworks}
 *   value={value}
 *   onValueChange={setValue}
 *   searchPlaceholder="Search frameworks..."
 *   emptyMessage="No framework found."
 * />
 * ```
 */
const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      // Core props
      options = [],
      value: controlledValue,
      defaultValue,
      onValueChange,

      // UI props
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      size = 'md',
      variant = 'default',
      disabled = false,
      required = false,
      error,
      label,
      helperText,
      name,
      id: propId,
      className,
      wrapperClassName,

      // Customization props
      clearable = false,
      renderOption,
      renderValue,
      renderTrigger,

      // Event handlers
      onSearch,
      onOpenChange,

      // ARIA props
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    },
    ref
  ) => {
    // Generate IDs
    const generatedId = useId();
    const comboboxId = propId ?? generatedId;
    const errorId = `${comboboxId}-error`;
    const helperId = `${comboboxId}-helper`;
    const hasError = Boolean(error);

    // State management
    const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Handle value changes
    const handleValueChange = useCallback(
      (newValue: string | null) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    // Handle option select
    const handleSelect = useCallback(
      (optionValue: string) => {
        const newValue = currentValue === optionValue ? null : optionValue;
        handleValueChange(newValue);
        setOpen(false);
        setSearch('');
      },
      [currentValue, handleValueChange]
    );

    // Handle clear
    const handleClear = useCallback(
      (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        if ('key' in e && e.key !== 'Enter' && e.key !== ' ') {
          return;
        }
        if ('key' in e) {
          e.preventDefault();
        }
        handleValueChange(null);
        setSearch('');
      },
      [handleValueChange]
    );

    // Handle open/close
    const handleOpenChange = useCallback(
      (isOpen: boolean) => {
        setOpen(isOpen);
        onOpenChange?.(isOpen);
        if (!isOpen) {
          setSearch(''); // Clear search on close
        }
      },
      [onOpenChange]
    );

    // Handle search change
    const handleSearchChange = useCallback(
      (value: string) => {
        setSearch(value);
        onSearch?.(value);
      },
      [onSearch]
    );

    // Filter options based on search
    const filteredOptions = search
      ? options.filter((option) => {
          const searchLower = search.toLowerCase();
          return (
            option.label.toLowerCase().includes(searchLower) ||
            option.value.toLowerCase().includes(searchLower) ||
            (option.description?.toLowerCase().includes(searchLower) ?? false)
          );
        })
      : options;

    // Find selected option
    const selectedOption = options.find((opt) => opt.value === currentValue);

    // Get display value - extract nested ternary to separate logic
    const getDisplayValue = () => {
      if (!selectedOption) {
        return placeholder;
      }
      return renderValue?.(selectedOption) ?? selectedOption.label;
    };
    const displayValue = getDisplayValue();

    // Cleanup on unmount
    useEffect(() => {
      if (!open) {
        setSearch('');
      }
    }, [open]);

    // Determine aria-describedby value
    let describedBy: string | undefined;
    if (hasError) {
      describedBy = errorId;
    } else if (helperText) {
      describedBy = helperId;
    } else {
      describedBy = ariaDescribedBy;
    }

    return (
      <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={comboboxId} className="mdt-text-sm mdt-font-medium mdt-text-foreground">
            {label}
            {required && <span className="mdt-ml-1 mdt-text-destructive">*</span>}
          </label>
        )}

        <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
          <PopoverPrimitive.Trigger asChild>
            {renderTrigger ? (
              renderTrigger({
                value: currentValue,
                selectedOption,
                placeholder,
                open,
                disabled,
              })
            ) : (
              <button
                ref={ref}
                id={comboboxId}
                type="button"
                aria-expanded={open}
                aria-controls={open ? `${comboboxId}-listbox` : undefined}
                aria-haspopup="listbox"
                aria-label={ariaLabel}
                aria-describedby={describedBy}
                data-invalid={(ariaInvalid ?? hasError) ? 'true' : undefined}
                disabled={disabled}
                className={cn(comboboxTriggerVariants({ variant, size, hasError }), className)}
                {...(name && { name })}
              >
                <span
                  className={cn(
                    'mdt-flex-1 mdt-text-left',
                    !selectedOption && 'mdt-text-muted-foreground'
                  )}
                >
                  {displayValue}
                </span>
                <div className="mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-1">
                  {clearable && currentValue && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="mdt-flex mdt-h-4 mdt-w-4 mdt-items-center mdt-justify-center mdt-rounded-sm mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-opacity-50 hover:mdt-opacity-100 focus:mdt-opacity-100 focus:mdt-outline-none"
                      aria-label="Clear selection"
                    >
                      <Icon name="x" size="xs" aria-hidden />
                    </button>
                  )}
                  <Icon name="chevrons-up-down" size="sm" className="mdt-opacity-50" aria-hidden />
                </div>
              </button>
            )}
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              id={`${comboboxId}-listbox`}
              role="listbox"
              side="bottom"
              align="start"
              sideOffset={4}
              onOpenAutoFocus={(e) => {
                e.preventDefault();
              }}
              className={cn(
                'mdt-z-50 mdt-w-[var(--radix-popover-trigger-width)] mdt-rounded-md',
                'mdt-border mdt-bg-popover mdt-p-0 mdt-text-popover-foreground mdt-shadow-md',
                'data-[state=open]:mdt-animate-in data-[state=closed]:mdt-animate-out',
                'data-[state=closed]:mdt-fade-out-0 data-[state=open]:mdt-fade-in-0',
                'data-[state=closed]:mdt-zoom-out-95 data-[state=open]:mdt-zoom-in-95',
                'data-[side=bottom]:mdt-slide-in-from-top-2',
                'data-[side=top]:mdt-slide-in-from-bottom-2'
              )}
            >
              <CommandPrimitive
                className="mdt-flex mdt-h-full mdt-w-full mdt-flex-col mdt-overflow-hidden mdt-rounded-md mdt-bg-popover mdt-text-popover-foreground"
                shouldFilter={false}
              >
                <div className="mdt-flex mdt-items-center mdt-border-b mdt-px-3">
                  <CommandPrimitive.Input
                    value={search}
                    onValueChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    className={cn(
                      'mdt-flex mdt-h-10 mdt-w-full mdt-rounded-md mdt-bg-transparent mdt-py-3',
                      'mdt-text-sm mdt-outline-none',
                      'placeholder:mdt-text-muted-foreground',
                      'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50'
                    )}
                  />
                </div>
                <CommandPrimitive.List className="mdt-max-h-[300px] mdt-overflow-y-auto mdt-overflow-x-hidden mdt-p-1">
                  {filteredOptions.length === 0 && (
                    <CommandPrimitive.Empty className="mdt-py-6 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
                      {emptyMessage}
                    </CommandPrimitive.Empty>
                  )}
                  {filteredOptions.map((option) => {
                    const isSelected = currentValue === option.value;

                    return (
                      <CommandPrimitive.Item
                        key={option.value}
                        value={option.value}
                        onSelect={(value) => {
                          handleSelect(value);
                        }}
                        onPointerDown={(e) => {
                          // Fallback for cmdk v1+ where onSelect might not fire on click
                          e.preventDefault();
                          if (!option.disabled) {
                            handleSelect(option.value);
                          }
                        }}
                        {...(option.disabled ? { disabled: true } : {})}
                        className={cn(
                          'mdt-relative mdt-flex mdt-cursor-pointer mdt-select-none mdt-items-center mdt-rounded-sm',
                          'mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-outline-none',
                          'mdt-text-foreground',
                          'hover:mdt-bg-neutral-10',
                          "data-[disabled='true']:mdt-pointer-events-none data-[disabled='true']:mdt-opacity-50",
                          'aria-selected:mdt-bg-neutral-10',
                          isSelected && 'mdt-bg-neutral-10'
                        )}
                      >
                        {renderOption ? (
                          renderOption({ option, selected: isSelected })
                        ) : (
                          <>
                            <Icon
                              name="check"
                              size="sm"
                              className={cn(
                                'mdt-mr-2',
                                isSelected ? 'mdt-opacity-100' : 'mdt-opacity-0'
                              )}
                              aria-hidden
                            />
                            <div className="mdt-flex mdt-flex-1 mdt-flex-col">
                              <span>{option.label}</span>
                              {option.description && (
                                <span className="mdt-text-xs mdt-text-muted-foreground">
                                  {option.description}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </CommandPrimitive.Item>
                    );
                  })}
                </CommandPrimitive.List>
              </CommandPrimitive>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

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

Combobox.displayName = 'Combobox';

export { Combobox };
