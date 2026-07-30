import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { comboboxTriggerVariants as ComboboxTriggerVariantsCVA } from './Combobox';

/**
 * Combobox option type
 */
export interface ComboboxOption {
  /**
   * Unique value for the option
   */
  value: string;

  /**
   * Display label for the option
   */
  label: string;

  /**
   * Optional description shown below the label
   */
  description?: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

/**
 * Combobox trigger variants derived from CVA configuration
 */
export type ComboboxTriggerVariants = VariantProps<typeof ComboboxTriggerVariantsCVA>;

/**
 * Render option callback props
 */
export interface RenderOptionProps {
  /**
   * The option to render
   */
  option: ComboboxOption;

  /**
   * Whether the option is selected
   */
  selected: boolean;
}

/**
 * Render trigger callback props
 */
export interface RenderTriggerProps {
  /**
   * Current selected value
   */
  value: string | null;

  /**
   * Selected option object
   */
  selectedOption: ComboboxOption | undefined;

  /**
   * Placeholder text
   */
  placeholder: string;

  /**
   * Whether the combobox is open
   */
  open: boolean;

  /**
   * Whether the combobox is disabled
   */
  disabled: boolean;
}

/**
 * Props for the Combobox component
 */
export interface ComboboxProps
  extends
    Omit<ComponentPropsWithoutRef<'button'>, 'value' | 'onChange' | 'defaultValue'>,
    ComboboxTriggerVariants {
  /**
   * Available options for selection
   */
  options?: ComboboxOption[];

  /**
   * Controlled value (option value)
   */
  value?: string | null;

  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string | null;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string | null) => void;

  /**
   * Placeholder text shown when no option is selected
   * @default "Select..."
   */
  placeholder?: string;

  /**
   * Placeholder for the search input
   * @default "Search..."
   */
  searchPlaceholder?: string;

  /**
   * Message shown when no results are found
   * @default "No results found."
   */
  emptyMessage?: string;

  /**
   * Label for the combobox
   */
  label?: string;

  /**
   * Helper text shown below the combobox
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether to show a clear button when value is selected
   * @default false
   */
  clearable?: boolean;

  /**
   * Custom class name for the wrapper
   */
  wrapperClassName?: string;

  /**
   * Custom render function for options
   */
  renderOption?: (props: RenderOptionProps) => ReactNode;

  /**
   * Custom render function for the selected value
   */
  renderValue?: (option: ComboboxOption) => ReactNode;

  /**
   * Custom render function for the trigger button
   */
  renderTrigger?: (props: RenderTriggerProps) => ReactNode;

  /**
   * Callback when search query changes
   */
  onSearch?: (query: string) => void;

  /**
   * Callback when popover open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
