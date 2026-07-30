import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './Select';
import type { SelectOption, SelectProps } from './Select.types';
import { cn } from '@/utils';

/**
 * The Select component provides single and multiple value selection.
 * It supports search, virtual scrolling, grouping, and custom renderers.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile select component for single and multiple value selection with search, grouping, and performance features.',
      },
    },
    // Disable nested-interactive rule - HoverCardTrigger (button) contains pill with remove button
    // This is intentional UX: hover on pill for details, click X to remove
    a11y: {
      config: {
        rules: [{ id: 'nested-interactive', enabled: false }],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // === Core Props ===
    options: {
      control: 'object',
      description: 'Array of selectable options',
      table: {
        type: { summary: 'SelectOption[]' },
      },
    },
    value: {
      control: 'object',
      description: 'Currently selected value(s) - string for single, string[] for multiple',
      table: {
        type: { summary: 'string | string[] | null' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: string | string[] | null) => void' },
      },
    },
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Selection mode - single or multiple values',
      table: {
        defaultValue: { summary: 'single' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the select',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the select',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message - displays error state when provided',
      table: {
        type: { summary: 'string' },
      },
    },

    // === UI/UX Props ===
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the select',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'borderless'],
      description:
        'Trigger border variant - default has border, borderless shows border on hover only',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    placement: {
      control: 'select',
      options: ['bottom', 'overlay'],
      description:
        'Options placement - bottom appears below trigger, overlay appears over trigger hiding it',
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: 'boolean',
      description: 'Shows clear button to reset selection',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },

    // === Search Props ===
    searchable: {
      control: 'boolean',
      description: 'Enables search/filter functionality',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
      table: {
        type: { summary: 'string' },
      },
    },
    onSearch: {
      action: 'searched',
      description: 'Callback when search value changes',
      table: {
        type: { summary: '(searchTerm: string) => void' },
      },
    },

    // === Multi-Select Props ===
    showPills: {
      control: 'boolean',
      description: 'Shows selected values as pills/chips (multi-select)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxPills: {
      control: 'number',
      description: 'Maximum pills to display before showing "+N more"',
      table: {
        type: { summary: 'number' },
      },
    },
    selectAll: {
      control: 'boolean',
      description: 'Shows "Select All" option (multi-select)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    pillHoverCard: {
      control: 'boolean',
      description: 'Enable hover card on pills (multi-select)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onRemovePill: {
      action: 'pill-removed',
      description: 'Handler when pill is removed',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },

    // === Grouping Props ===
    grouped: {
      control: 'boolean',
      description: 'Enables option grouping (requires group property in options)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showSelectedOnTop: {
      control: 'boolean',
      description: 'Shows selected items at the top with a visual separator',
      table: {
        defaultValue: { summary: 'false' },
      },
    },

    // === Performance Props ===
    virtual: {
      control: 'boolean',
      description: 'Enables virtual scrolling for large datasets (1000+ items)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    itemHeight: {
      control: 'number',
      description: 'Height of each item in pixels (required for virtual scrolling)',
      table: {
        defaultValue: { summary: '40' },
      },
    },

    // === Custom Renderers ===
    renderTrigger: {
      control: false,
      description: 'Custom render function for the trigger/input area',
      table: {
        type: { summary: '(props: TriggerRenderProps) => ReactNode' },
      },
    },
    renderItem: {
      control: false,
      description: 'Custom render function for each option item',
      table: {
        type: { summary: '(props: SelectItemRenderProps) => ReactNode' },
      },
    },
    renderValue: {
      control: false,
      description: 'Custom render function for value display',
      table: {
        type: { summary: '(option: SelectOption) => ReactNode' },
      },
    },
    renderPillHoverCard: {
      control: false,
      description: 'Custom render function for pill hover cards',
      table: {
        type: { summary: '(props: SelectPillHoverCardRenderProps) => ReactNode' },
      },
    },
    prefixIcon: {
      control: false,
      description: 'Prefix icon for trigger',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    showAvatar: {
      control: 'boolean',
      description: 'Show avatar in options',
      table: {
        defaultValue: { summary: 'false' },
      },
    },

    // === Advanced Features ===
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown on selection (single-select default: true)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus search on open',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'select',
      options: ['popper', 'item-aligned'],
      description: 'Position of dropdown',
      table: {
        defaultValue: { summary: 'popper' },
      },
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of dropdown in pixels',
      table: {
        type: { summary: 'number' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Empty message text when no options',
      table: {
        type: { summary: 'string' },
      },
    },
    renderEmpty: {
      control: false,
      description: 'Custom empty state renderer',
      table: {
        type: { summary: '() => ReactNode' },
      },
    },
    renderError: {
      control: false,
      description: 'Custom error state renderer',
      table: {
        type: { summary: '(error: Error) => ReactNode' },
      },
    },
    sortOptions: {
      control: false,
      description: 'Custom sort function for options',
      table: {
        type: { summary: '(a: SelectOption, b: SelectOption) => number' },
      },
    },
    filterFn: {
      control: false,
      description: 'Custom filter function for search',
      table: {
        type: { summary: '(option: SelectOption, query: string) => boolean' },
      },
    },
    searchDebounce: {
      control: 'number',
      description: 'Search debounce delay in milliseconds',
      table: {
        type: { summary: 'number' },
      },
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom CSS classes for the wrapper',
      table: {
        type: { summary: 'string' },
      },
    },

    // === Callbacks ===
    onOpen: {
      action: 'opened',
      description: 'Callback when dropdown opens',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when dropdown closes',
      table: {
        type: { summary: '() => void' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Callback when select receives focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback when select loses focus',
      table: {
        type: { summary: '() => void' },
      },
    },

    // === Async & Infinite Scroll ===
    loadMore: {
      action: 'load-more',
      description: 'Load more handler for infinite scroll',
      table: {
        type: { summary: '() => Promise<void>' },
      },
    },
    hasMore: {
      control: 'boolean',
      description: 'Whether more items can be loaded',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onLoadOptions: {
      action: 'load-options',
      description: 'Async options loader',
      table: {
        type: { summary: '(query: string) => Promise<SelectOption[]>' },
      },
    },

    // === Advanced Props ===
    className: {
      control: 'text',
      description: 'Custom CSS classes for the container',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Name attribute for form integration',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'ID attribute for the select',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: 'text',
      description: 'ARIA described by',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'ARIA invalid state',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

// Sample data
const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'in', label: 'India' },
  { value: 'au', label: 'Australia' },
];

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const priorities: SelectOption[] = [
  { value: 'critical', label: 'Critical', icon: <span>🔴</span> },
  { value: 'high', label: 'High', icon: <span>🟠</span> },
  { value: 'medium', label: 'Medium', icon: <span>🟡</span> },
  { value: 'low', label: 'Low', icon: <span>🟢</span> },
];

const teamMembers: SelectOption[] = [
  { value: '1', label: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { value: '2', label: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { value: '3', label: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { value: '4', label: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4' },
];

/**
 * Default single-select dropdown.
 */
export const Default: Story = {
  args: {
    options: countries,
    placeholder: 'Select country',
    'aria-label': 'Country selection',
  },
};

/**
 * Select with label and helper text.
 */
export const WithLabel: Story = {
  args: {
    options: fruits,
    placeholder: 'Choose your favorite',
    label: 'Favorite Fruit',
    helperText: 'This helps us personalize your experience',
  },
};

/**
 * Error state with validation message.
 */
export const WithError: Story = {
  args: {
    options: fruits,
    placeholder: 'Select...',
    label: 'Required Field',
    error: 'This field is required',
    required: true,
  },
};

/**
 * Small size variant.
 */
export const Small: Story = {
  args: {
    options: fruits,
    size: 'sm',
    placeholder: 'Small size',
    'aria-label': 'Small size select',
  },
};

/**
 * Medium size variant (default).
 */
export const Medium: Story = {
  args: {
    options: fruits,
    size: 'md',
    placeholder: 'Medium size',
    'aria-label': 'Medium size select',
  },
};

/**
 * Large size variant.
 */
export const Large: Story = {
  args: {
    options: fruits,
    size: 'lg',
    placeholder: 'Large size',
    'aria-label': 'Large size select',
  },
};

/**
 * Options with icon indicators.
 */
export const WithIcons: Story = {
  args: {
    options: priorities,
    label: 'Priority',
    placeholder: 'Select priority',
  },
};

/**
 * Options with user avatars.
 */
export const WithAvatars: Story = {
  args: {
    options: teamMembers,
    label: 'Assign to',
    placeholder: 'Select team member',
  },
};

/**
 * Searchable select for filtering options.
 */
export const Searchable: Story = {
  args: {
    options: teamMembers,
    label: 'Search Team Members',
    searchable: true,
    searchPlaceholder: 'Type to search...',
  },
};

/**
 * Multi-select mode with pills display.
 */
export const MultiSelect: Story = {
  args: {
    mode: 'multiple',
    options: fruits,
    label: 'Select Fruits',
    placeholder: 'Choose multiple fruits',
    showPills: true,
    maxPills: 3,
  },
};

/**
 * Multi-select with search and select all features.
 */
export const MultiSelectAdvanced: Story = {
  args: {
    mode: 'multiple',
    options: teamMembers,
    label: 'Team Members',
    searchable: true,
    clearable: true,
    showPills: true,
    selectAll: true,
  },
};

/**
 * Pills with hover cards showing detailed information.
 */
export const PillHoverCards: Story = {
  render: function RenderPillHoverCards() {
    const [value, setValue] = useState<string[]>(['1', '3']);
    return (
      <Select
        mode="multiple"
        options={teamMembers}
        value={value}
        onChange={(val) => {
          setValue(val as string[]);
        }}
        label="Team Members with Details"
        showPills
        pillHoverCard
        renderPillHoverCard={({ option }) => (
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <div className="mdt-flex mdt-items-center mdt-gap-3">
              {option.avatar && (
                <img
                  src={option.avatar}
                  alt={option.label}
                  className="mdt-h-12 mdt-w-12 mdt-rounded-full"
                />
              )}
              <div>
                <h4 className="mdt-font-semibold">{option.label}</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">Team Member</p>
              </div>
            </div>
            <div className="mdt-text-xs mdt-text-muted-foreground">
              <p>Click the X to remove from selection</p>
            </div>
          </div>
        )}
      />
    );
  },
};

/**
 * Options with descriptions for detailed information.
 */
export const WithDescriptions: Story = {
  render: function RenderWithDescriptions() {
    const [value, setValue] = useState<string | null>(null);
    const optionsWithDesc: SelectOption[] = [
      {
        value: 'basic',
        label: 'Basic Plan',
        description: 'For individuals and small teams',
      },
      {
        value: 'pro',
        label: 'Pro Plan',
        description: 'For growing teams and businesses',
      },
      {
        value: 'enterprise',
        label: 'Enterprise Plan',
        description: 'For large organizations',
      },
    ];

    return (
      <Select
        options={optionsWithDesc}
        value={value}
        onChange={(val) => {
          setValue(val as string);
        }}
        placeholder="Select plan..."
        label="Subscription Plan"
      />
    );
  },
};

/**
 * Multi-select with select all checkbox.
 */
export const MultiSelectWithSelectAll: Story = {
  render: function RenderMultiSelectWithSelectAll() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Select
        mode="multiple"
        options={priorities}
        value={value}
        onChange={(val) => {
          setValue(val as string[]);
        }}
        placeholder="Select priorities..."
        label="Priority Filters"
        selectAll
        clearable
        showPills
      />
    );
  },
};

/**
 * Multi-select without pills showing count.
 */
export const MultiSelectWithoutPills: Story = {
  render: function RenderMultiSelectWithoutPills() {
    const [value, setValue] = useState<string[]>(['apple', 'banana']);
    return (
      <Select
        mode="multiple"
        options={fruits}
        value={value}
        onChange={(val) => {
          setValue(val as string[]);
        }}
        placeholder="Select fruits..."
        label="Fruits (count display)"
        showPills={false}
        clearable
      />
    );
  },
};

/**
 * Grouped options by category.
 */
export const Grouped: Story = {
  args: {
    mode: 'multiple',
    options: [
      { value: 'apple', label: 'Apple', group: 'Fruits' },
      { value: 'banana', label: 'Banana', group: 'Fruits' },
      { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
      { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
      { value: 'chicken', label: 'Chicken', group: 'Protein' },
      { value: 'fish', label: 'Fish', group: 'Protein' },
    ],
    label: 'Grocery Items',
    grouped: true,
    showPills: true,
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    options: fruits,
    label: 'Disabled Field',
    disabled: true,
  },
};

/**
 * Loading state while fetching data.
 */
export const Loading: Story = {
  args: {
    options: [],
    label: 'Loading Data',
    loading: true,
  },
};

/**
 * Virtual scrolling for large datasets (1000+ items).
 */
export const VirtualScrolling: Story = {
  args: {
    options: Array.from({ length: 1000 }, (_, i) => ({
      value: String(i),
      label: `Item ${String(i + 1)}`,
    })),
    label: '1000 Items with Virtual Scroll',
    searchable: true,
    virtual: true,
    itemHeight: 40,
  },
};

/**
 * Clearable select with clear button.
 */
export const Clearable: Story = {
  render: function RenderClearable() {
    const [value, setValue] = useState<string | null>('in');
    return (
      <Select
        options={countries}
        value={value}
        onChange={(val) => {
          setValue(val as string);
        }}
        label="Country"
        placeholder="Select country"
        clearable
      />
    );
  },
};

/**
 * Required field indicator.
 */
export const Required: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select country',
    required: true,
  },
};

/**
 * All size variants displayed together.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="mdt-space-y-4">
      <Select options={fruits} size="sm" placeholder="Small" aria-label="Small select" />
      <Select
        options={fruits}
        size="md"
        placeholder="Medium (default)"
        aria-label="Medium select"
      />
      <Select options={fruits} size="lg" placeholder="Large" aria-label="Large select" />
    </div>
  ),
};

/**
 * Trigger variants - default has visible border, borderless shows border only on hover.
 */
export const TriggerVariants: Story = {
  render: () => (
    <div className="mdt-space-y-4">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-text-muted-foreground">Default (with border)</p>
        <Select
          options={fruits}
          variant="default"
          placeholder="Select fruit..."
          aria-label="Default variant select"
        />
      </div>
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-text-muted-foreground">
          Borderless (border on hover)
        </p>
        <Select
          options={fruits}
          variant="borderless"
          placeholder="Select fruit..."
          aria-label="Borderless variant select"
        />
      </div>
    </div>
  ),
};

/**
 * Borderless variant example - clean appearance with border and chevron appearing on hover.
 */
export const BorderlessExample: Story = {
  render: function RenderBorderlessExample() {
    const [value, setValue] = useState<string | null>('apple');
    return (
      <div className="mdt-space-y-6">
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Single Select - Borderless</h3>
          <Select
            variant="borderless"
            options={fruits}
            value={value}
            onChange={(val) => {
              setValue(val as string | null);
            }}
            placeholder="Select fruit..."
            aria-label="Borderless single select"
          />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">With Label - Borderless</h3>
          <Select
            variant="borderless"
            options={fruits}
            label="Favorite Fruit"
            placeholder="Select fruit..."
            aria-label="Borderless with label"
          />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Clearable - Borderless</h3>
          <Select
            variant="borderless"
            options={fruits}
            clearable
            placeholder="Select fruit..."
            aria-label="Borderless clearable"
          />
        </div>
      </div>
    );
  },
};

/**
 * Overlay placement - options appear over the trigger, hiding it.
 */
export const OverlayPlacement: Story = {
  render: function RenderOverlayPlacement() {
    const [singleValue, setSingleValue] = useState<string | null>('apple');
    const [multiValue, setMultiValue] = useState<string[]>(['apple', 'banana']);
    return (
      <div className="mdt-space-y-6">
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">
            Single Select - Overlay Placement
          </h3>
          <Select
            placement="overlay"
            options={fruits}
            value={singleValue}
            onChange={(val) => {
              setSingleValue(val as string | null);
            }}
            placeholder="Select fruit..."
            aria-label="Overlay placement single select"
          />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Multi Select - Overlay Placement</h3>
          <Select
            mode="multiple"
            placement="overlay"
            options={fruits}
            value={multiValue}
            onChange={(val) => {
              setMultiValue(val as string[]);
            }}
            placeholder="Select fruits..."
            showPills
            aria-label="Overlay placement multi select"
          />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">
            Borderless + Overlay (Clean Look)
          </h3>
          <Select
            variant="borderless"
            placement="overlay"
            options={fruits}
            placeholder="Select fruit..."
            aria-label="Borderless with overlay"
          />
        </div>
      </div>
    );
  },
};

/**
 * Custom trigger renderer for complete control over appearance.
 */
export const CustomTrigger: Story = {
  render: function RenderCustomTrigger() {
    const [value, setValue] = useState<string[]>(['apple', 'banana', 'orange']);
    return (
      <Select
        mode="multiple"
        options={fruits}
        value={value}
        onChange={(val) => {
          setValue(val as string[]);
        }}
        renderTrigger={({ selectedOptions, placeholder, open }) => (
          <button
            type="button"
            aria-label="Select fruits"
            className={cn(
              'mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between',
              'mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/10',
              'mdt-px-4 mdt-text-sm mdt-font-medium',
              open && 'mdt-ring-2 mdt-ring-primary mdt-ring-offset-2'
            )}
          >
            {selectedOptions.length > 0 ? (
              <span className="mdt-text-primary">{selectedOptions.length} fruits selected</span>
            ) : (
              <span className="mdt-text-muted-foreground">{placeholder}</span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn('mdt-transition-transform', open && 'mdt-rotate-180')}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      />
    );
  },
};

/**
 * Custom item renderer for rich option display.
 */
export const CustomItem: Story = {
  render: function RenderCustomItem() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Select
        mode="multiple"
        options={teamMembers}
        value={value}
        onChange={(val) => {
          setValue(val as string[]);
        }}
        label="Custom Item Renderer"
        renderItem={({ option, selected, disabled }) => (
          <div
            className={cn(
              'mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-p-3',
              'mdt-transition-colors',
              selected && 'mdt-border mdt-border-primary mdt-bg-primary/10',
              !selected && 'mdt-hover:bg-accent',
              disabled && 'mdt-cursor-not-allowed mdt-opacity-50'
            )}
          >
            {option.avatar && (
              <img
                src={option.avatar}
                alt={option.label}
                className="mdt-h-10 mdt-w-10 mdt-rounded-full"
              />
            )}
            <div className="mdt-flex-1">
              <div className="mdt-font-medium">{option.label}</div>
              {option.description && (
                <div className="mdt-text-xs mdt-text-muted-foreground">{option.description}</div>
              )}
            </div>
            {selected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mdt-text-primary"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        )}
      />
    );
  },
};

/**
 * Single-select with selected item on top and separator.
 * Enable `showSelectedOnTop` to move selected item to the top with a visual separator.
 */
const SelectedOnTopSingleComponent = () => {
  const [value, setValue] = useState<string | null>('2');

  const userOptions: SelectOption[] = [
    { value: '1', label: 'Natasha Manglore', avatar: 'https://i.pravatar.cc/150?img=1' },
    { value: '2', label: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
    { value: '3', label: 'Liam Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
    { value: '4', label: 'Chloe Bennett', avatar: 'https://i.pravatar.cc/150?img=4' },
    { value: '5', label: 'Olivia Hart', avatar: 'https://i.pravatar.cc/150?img=5' },
    { value: '6', label: 'Emma Garcia', avatar: 'https://i.pravatar.cc/150?img=6' },
    { value: '7', label: 'Nina Parker', avatar: 'https://i.pravatar.cc/150?img=7' },
  ];

  return (
    <div className="mdt-space-y-4">
      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">With showSelectedOnTop</h3>
        <Select
          mode="single"
          options={userOptions}
          value={value}
          onChange={(newValue) => {
            setValue(newValue as string);
          }}
          placeholder="Select user..."
          aria-label="Select user with showSelectedOnTop"
          showAvatar
          showSelectedOnTop
        />
        <p className="mdt-mt-2 mdt-text-xs mdt-text-muted-foreground">
          Selected item appears at the top with a separator line
        </p>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">
          Without showSelectedOnTop (default)
        </h3>
        <Select
          mode="single"
          options={userOptions}
          value={value}
          onChange={(newValue) => {
            setValue(newValue as string);
          }}
          placeholder="Select user..."
          aria-label="Select user without showSelectedOnTop"
          showAvatar
        />
        <p className="mdt-mt-2 mdt-text-xs mdt-text-muted-foreground">
          Items maintain their original order
        </p>
      </div>
    </div>
  );
};

export const SelectedOnTopSingle: Story = {
  render: () => <SelectedOnTopSingleComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Use `showSelectedOnTop={true}` to display the selected item at the top of the dropdown with a visual separator. This makes it easy to see the current selection.',
      },
    },
  },
};

/**
 * Multi-select with selected items on top and separator.
 * Works with multiple selections, grouping selected items at the top.
 */
const SelectedOnTopMultipleComponent = () => {
  const [value, setValue] = useState<string[]>(['high', 'medium']);

  const priorityOptions: SelectOption[] = [
    {
      value: 'critical',
      label: 'Critical',
      icon: <div className="mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-red-500" />,
    },
    {
      value: 'high',
      label: 'High',
      icon: <div className="mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-orange-500" />,
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: <div className="mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-blue-500" />,
    },
    {
      value: 'low',
      label: 'Low',
      icon: <div className="mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-gray-400" />,
    },
    {
      value: 'none',
      label: 'None',
      icon: <div className="mdt-h-4 mdt-w-4 mdt-rounded mdt-border-2 mdt-border-gray-300" />,
    },
  ];

  return (
    <div className="mdt-space-y-4">
      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">With showSelectedOnTop</h3>
        <Select
          mode="multiple"
          options={priorityOptions}
          value={value}
          onChange={(newValue) => {
            setValue(newValue as string[]);
          }}
          placeholder="Select priorities..."
          showPills
          showSelectedOnTop
        />
        <p className="mdt-mt-2 mdt-text-xs mdt-text-muted-foreground">
          Selected: {value.length} item{value.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">
          Without showSelectedOnTop (default)
        </h3>
        <Select
          mode="multiple"
          options={priorityOptions}
          value={value}
          onChange={(newValue) => {
            setValue(newValue as string[]);
          }}
          placeholder="Select priorities..."
          showPills
        />
        <p className="mdt-mt-2 mdt-text-xs mdt-text-muted-foreground">
          Items maintain their original order
        </p>
      </div>
    </div>
  );
};

export const SelectedOnTopMultiple: Story = {
  render: () => <SelectedOnTopMultipleComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'In multi-select mode, `showSelectedOnTop={true}` groups all selected items at the top with a separator. Perfect for quickly seeing all your selections.',
      },
    },
  },
};

/**
 * Priority selector matching the design system with selected item on top.
 */
const PrioritySelectorComponent = () => {
  const [priority, setPriority] = useState<string | null>('high');

  const priorityOptions: SelectOption[] = [
    {
      value: 'critical',
      label: 'Critical',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mdt-text-red-500"
          aria-hidden="true"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" x2="4" y1="22" y2="15" />
        </svg>
      ),
    },
    {
      value: 'high',
      label: 'High',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mdt-text-orange-500"
          aria-hidden="true"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" x2="4" y1="22" y2="15" />
        </svg>
      ),
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mdt-text-blue-500"
          aria-hidden="true"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" x2="4" y1="22" y2="15" />
        </svg>
      ),
    },
    {
      value: 'low',
      label: 'Low',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mdt-text-gray-400"
          aria-hidden="true"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" x2="4" y1="22" y2="15" />
        </svg>
      ),
    },
  ];

  return (
    <Select
      mode="single"
      options={priorityOptions}
      value={priority}
      onChange={(newValue) => {
        setPriority(newValue as string);
      }}
      placeholder="Change priority"
      showSelectedOnTop
      label="Issue Priority"
      helperText="Selected priority appears at the top for easy access"
    />
  );
};

export const PrioritySelector: Story = {
  render: () => <PrioritySelectorComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example: Priority selector with colored flag icons. The selected priority stays at the top, matching the design from your screenshot.',
      },
    },
  },
};

/**
 * Form integration example with multiple fields.
 */
export const FormExample: Story = {
  render: () => (
    <div className="mdt-space-y-4">
      <Select
        options={countries}
        label="Country"
        placeholder="Select country"
        required
        helperText="Select your country of residence"
      />
      <Select options={priorities} label="Priority" placeholder="Select priority" />
      <Select
        mode="multiple"
        options={fruits}
        label="Interests"
        placeholder="Select your interests"
        showPills
        maxPills={2}
      />
    </div>
  ),
};
