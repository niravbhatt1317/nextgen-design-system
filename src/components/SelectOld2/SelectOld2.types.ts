import type { ReactNode } from 'react';

/**
 * Option data structure for SelectOld2 component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectOld2Option<T = any> {
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
export interface SelectOld2OptionGroup<T = any> {
  /** Group label */
  label: string;
  /** Options in this group */
  options: SelectOld2Option<T>[];
}

/**
 * SelectOld2 mode type
 */
export type SelectOld2Mode = 'single' | 'multiple';

/**
 * Size variants for SelectOld2
 */
export type SelectOld2Size = 'sm' | 'md' | 'lg';

/**
 * Trigger variant styles for SelectOld2
 */
export type SelectOld2TriggerVariant = 'default' | 'borderless';

/**
 * Options placement relative to trigger
 */
export type SelectOld2Placement = 'bottom' | 'overlay';

/**
 * SelectOld2 value type - single value, multiple values, or null
 */
export type SelectOld2Value = string | string[] | null;

/**
 * Props for custom trigger renderer
 */
export interface SelectOld2TriggerRenderProps {
  /** Selected value(s) */
  value: SelectOld2Value;
  /** Selected option(s) */
  selectedOptions: SelectOld2Option[];
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
export interface SelectOld2ItemRenderProps {
  /** Option data */
  option: SelectOld2Option;
  /** Whether item is selected */
  selected: boolean;
  /** Whether item is disabled */
  disabled: boolean;
}

/**
 * Props for custom pill hover card renderer
 */
export interface SelectOld2PillHoverCardRenderProps {
  /** Option data */
  option: SelectOld2Option;
}

/**
 * Main SelectOld2 component props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectOld2Props<T = any> {
  // === Core Props ===
  /** Selection mode - single or multiple */
  mode?: SelectOld2Mode;
  /** Controlled value */
  value?: SelectOld2Value;
  /** Default value for uncontrolled mode */
  defaultValue?: string | string[];
  /** Change handler */
  onChange?: (value: SelectOld2Value) => void;
  /** Array of options */
  options: SelectOld2Option<T>[];

  // === UI Basics ===
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Size variant */
  size?: SelectOld2Size;
  /** Trigger variant style (default: has border, borderless: border on hover only) */
  variant?: SelectOld2TriggerVariant;
  /** Options placement (bottom: below trigger, overlay: over trigger hiding it) */
  placement?: SelectOld2Placement;
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
  filterFn?: (option: SelectOld2Option<T>, query: string) => boolean;
  /** Search debounce delay in ms */
  searchDebounce?: number;

  // === Customization Props ===
  /** Custom trigger renderer */
  renderTrigger?: (props: SelectOld2TriggerRenderProps) => ReactNode;
  /** Custom item renderer */
  renderItem?: (props: SelectOld2ItemRenderProps) => ReactNode;
  /** Custom value display renderer */
  renderValue?: (option: SelectOld2Option) => ReactNode;
  /** Prefix icon for trigger */
  prefixIcon?: ReactNode;
  /** Show avatar in options */
  showAvatar?: boolean;

  // === Multi-SelectOld2 Pills Props ===
  /** Show selected items as pills */
  showPills?: boolean;
  /** Maximum pills to show before overflow */
  maxPills?: number;
  /** Enable hover card on pills */
  pillHoverCard?: boolean;
  /** Custom pill hover card renderer */
  renderPillHoverCard?: (props: SelectOld2PillHoverCardRenderProps) => ReactNode;
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
  onLoadOptions?: (query: string) => Promise<SelectOld2Option<T>[]>;

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
  sortOptions?: (a: SelectOld2Option<T>, b: SelectOld2Option<T>) => number;
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
 * Internal state for SelectOld2 component
 */
export interface SelectOld2State {
  /** Currently selected value(s) */
  value: SelectOld2Value;
  /** Whether dropdown is open */
  open: boolean;
  /** Search query */
  search: string;
  /** Whether component is focused */
  focused: boolean;
  /** All options */
  options: SelectOld2Option[];
  /** Filtered options based on search */
  filteredOptions: SelectOld2Option[];
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: Error | null;
  /** Current page for pagination */
  page: number;
  /** Whether more items available */
  hasMore: boolean;
  /** Selected options (for quick lookup) */
  selectedOptions: SelectOld2Option[];
}

/**
 * Props for SelectOld2Trigger component
 */
export interface SelectOld2TriggerProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

/**
 * Props for SelectOld2Content component
 */
export interface SelectOld2ContentProps {
  children?: ReactNode;
  className?: string;
  position?: 'popper' | 'item-aligned';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

/**
 * Props for SelectOld2Item component
 */
export interface SelectOld2ItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Props for SelectOld2Search component
 */
export interface SelectOld2SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/**
 * Props for SelectOld2Pill component
 */
export interface SelectOld2PillProps {
  option: SelectOld2Option;
  onRemove?: () => void;
  showHoverCard?: boolean;
  renderHoverCard?: (props: SelectOld2PillHoverCardRenderProps) => ReactNode;
  className?: string;
}

/**
 * Props for SelectOld2Empty component
 */
export interface SelectOld2EmptyProps {
  message?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Props for SelectOld2Loading component
 */
export interface SelectOld2LoadingProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props for SelectOld2Group component
 */
export interface SelectOld2GroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Props for SelectOld2Label component
 */
export interface SelectOld2LabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Props for SelectOld2Separator component
 */
export interface SelectOld2SeparatorProps {
  className?: string;
}

/**
 * Props for SelectOld2Value component
 */
export interface SelectOld2ValueProps {
  placeholder?: string;
  className?: string;
}
