import type { ReactNode } from 'react';

/**
 * Option data structure for Select component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectOption<T = any> {
  /** Unique value for the option */
  value: string | number;
  /** Display label */
  label: string;
  /** Optional description shown below label */
  description?: string;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Icon to display before label */
  icon?: ReactNode;
  /** Avatar URL for user options */
  avatar?: string;
  /** Group name for grouped options */
  group?: string;
  /** Additional metadata */
  metadata?: T;
}

/**
 * Option group structure
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectOptionGroup<T = any> {
  /** Group label */
  label: string;
  /** Options in this group */
  options: SelectOption<T>[];
}

/**
 * Select mode type
 */
export type SelectMode = 'single' | 'multiple';

/**
 * Size variants for Select
 */
export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Trigger variant styles for Select
 */
export type SelectTriggerVariant = 'default' | 'borderless';

/**
 * Options placement relative to trigger
 */
export type SelectPlacement = 'bottom' | 'overlay';

/**
 * Select value type - single value, multiple values, or null
 */
export type SelectValue = string | string[] | null;

/**
 * Props for custom trigger renderer
 */
export interface SelectTriggerRenderProps {
  /** Selected value(s) */
  value: SelectValue;
  /** Selected option(s) */
  selectedOptions: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether select is open */
  open: boolean;
  /** Whether select is disabled */
  disabled: boolean;
}

/**
 * Props for custom item renderer
 */
export interface SelectItemRenderProps {
  /** Option data */
  option: SelectOption;
  /** Whether item is selected */
  selected: boolean;
  /** Whether item is disabled */
  disabled: boolean;
}

/**
 * Props for custom pill hover card renderer
 */
export interface SelectPillHoverCardRenderProps {
  /** Option data */
  option: SelectOption;
}

/**
 * Main Select component props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectProps<T = any> {
  // === Core Props ===
  /** Selection mode - single or multiple */
  mode?: SelectMode;
  /** Controlled value */
  value?: SelectValue;
  /** Default value for uncontrolled mode */
  defaultValue?: string | string[];
  /** Change handler */
  onChange?: (value: SelectValue) => void;
  /** Array of options */
  options: SelectOption<T>[];

  // === UI Basics ===
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Size variant */
  size?: SelectSize;
  /** Trigger variant style (default: has border, borderless: border on hover only) */
  variant?: SelectTriggerVariant;
  /** Options placement (bottom: below trigger, overlay: over trigger hiding it) */
  placement?: SelectPlacement;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Whether select is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Name attribute for forms */
  name?: string;
  /** ID attribute */
  id?: string;
  /** Custom class for trigger */
  className?: string;
  /** Custom class for wrapper */
  wrapperClassName?: string;

  // === Search Props ===
  /** Enable search/filter */
  searchable?: boolean;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Search change handler */
  onSearch?: (query: string) => void;
  /** Custom filter function */
  filterFn?: (option: SelectOption<T>, query: string) => boolean;
  /** Search debounce delay in ms */
  searchDebounce?: number;

  // === Customization Props ===
  /** Custom trigger renderer */
  renderTrigger?: (props: SelectTriggerRenderProps) => ReactNode;
  /** Custom item renderer */
  renderItem?: (props: SelectItemRenderProps) => ReactNode;
  /** Custom value display renderer */
  renderValue?: (option: SelectOption) => ReactNode;
  /** Prefix icon for trigger */
  prefixIcon?: ReactNode;
  /** Show avatar in options */
  showAvatar?: boolean;

  // === Multi-Select Pills Props ===
  /** Show selected items as pills */
  showPills?: boolean;
  /** Maximum pills to show before overflow */
  maxPills?: number;
  /** Enable hover card on pills */
  pillHoverCard?: boolean;
  /** Custom pill hover card renderer */
  renderPillHoverCard?: (props: SelectPillHoverCardRenderProps) => ReactNode;
  /** Handler when pill is removed */
  onRemovePill?: (value: string) => void;

  // === Advanced Data Props ===
  /** Enable virtual scrolling */
  virtual?: boolean;
  /** Height of each item for virtual scrolling */
  itemHeight?: number;
  /** Loading state */
  loading?: boolean;
  /** Load more handler for infinite scroll */
  loadMore?: () => Promise<void>;
  /** Whether more items can be loaded */
  hasMore?: boolean;
  /** Async options loader */
  onLoadOptions?: (query: string) => Promise<SelectOption<T>[]>;

  // === UX Feature Props ===
  /** Show clear button */
  clearable?: boolean;
  /** Show select all checkbox (multi-select) */
  selectAll?: boolean;
  /** Close dropdown on selection (single-select default: true) */
  closeOnSelect?: boolean;
  /** Auto-focus search on open */
  autoFocus?: boolean;
  /** Whether options are grouped */
  grouped?: boolean;
  /** Custom sort function */
  sortOptions?: (a: SelectOption<T>, b: SelectOption<T>) => number;
  /** Position of dropdown */
  position?: 'popper' | 'item-aligned';
  /** Max height of dropdown */
  maxHeight?: number;
  /** Show selected items at top with separator */
  showSelectedOnTop?: boolean;

  // === Empty/Error States ===
  /** Custom empty state renderer */
  renderEmpty?: () => ReactNode;
  /** Custom error state renderer */
  renderError?: (error: Error) => ReactNode;
  /** Empty message text */
  emptyMessage?: string;

  // === Event Handlers ===
  /** Handler when dropdown opens */
  onOpen?: () => void;
  /** Handler when dropdown closes */
  onClose?: () => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;

  // === ARIA Props ===
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA invalid */
  'aria-invalid'?: boolean;
}

/**
 * Internal state for Select component
 */
export interface SelectState {
  /** Currently selected value(s) */
  value: SelectValue;
  /** Whether dropdown is open */
  open: boolean;
  /** Search query */
  search: string;
  /** Whether component is focused */
  focused: boolean;
  /** All options */
  options: SelectOption[];
  /** Filtered options based on search */
  filteredOptions: SelectOption[];
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: Error | null;
  /** Current page for pagination */
  page: number;
  /** Whether more items available */
  hasMore: boolean;
  /** Selected options (for quick lookup) */
  selectedOptions: SelectOption[];
}

/**
 * Props for SelectTrigger component
 */
export interface SelectTriggerProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

/**
 * Props for SelectContent component
 */
export interface SelectContentProps {
  children?: ReactNode;
  className?: string;
  position?: 'popper' | 'item-aligned';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

/**
 * Props for SelectItem component
 */
export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Props for SelectSearch component
 */
export interface SelectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/**
 * Props for SelectPill component
 */
export interface SelectPillProps {
  option: SelectOption;
  onRemove?: () => void;
  showHoverCard?: boolean;
  renderHoverCard?: (props: SelectPillHoverCardRenderProps) => ReactNode;
  className?: string;
}

/**
 * Props for SelectEmpty component
 */
export interface SelectEmptyProps {
  message?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Props for SelectLoading component
 */
export interface SelectLoadingProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props for SelectGroup component
 */
export interface SelectGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Props for SelectLabel component
 */
export interface SelectLabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Props for SelectSeparator component
 */
export interface SelectSeparatorProps {
  className?: string;
}

/**
 * Props for SelectValue component
 */
export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}
