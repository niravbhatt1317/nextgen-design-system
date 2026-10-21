/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Combobox } from './Combobox';
import type { ComboboxOption } from './Combobox.types';
import { Icon } from '../Icon';
import { Button } from '../Button';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A searchable combobox component with keyboard navigation. Perfect for large datasets where users need to search and filter options. Uses the command palette pattern for optimal UX.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    search: {
      control: 'inline-radio',
      options: ['list', 'field'],
      description:
        "Where the typing happens: 'list' - a search box at the top of the open list; 'field' - the field itself (the type-in picker)",
      table: {
        defaultValue: { summary: 'list' },
      },
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the combobox',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark the field as required',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mdt-w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const frameworks: ComboboxOption[] = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
  },
  { value: 'vue', label: 'Vue', description: 'The Progressive JavaScript Framework' },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
  },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'next', label: 'Next.js', description: 'The React Framework for Production' },
  { value: 'nuxt', label: 'Nuxt', description: 'The Intuitive Vue Framework' },
  { value: 'remix', label: 'Remix', description: 'Build Better Websites' },
  { value: 'astro', label: 'Astro', description: 'Build fast websites, faster' },
  { value: 'solid', label: 'SolidJS', description: 'Simple and performant reactivity' },
  { value: 'qwik', label: 'Qwik', description: 'The HTML-first framework' },
];

const languages: ComboboxOption[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
];

const countries: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'in', label: 'India' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'br', label: 'Brazil' },
];

/**
 * Simple selection test with basic options.
 */
export const DebugSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ],
    placeholder: 'Click to select...',
    searchPlaceholder: 'Search...',
    label: 'Framework Selection',
  },
};

/**
 * Default combobox example with frameworks (with state management).
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    label: 'Framework',
  },
};

/**
 * Combobox with a label and helper text.
 */
export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    label: 'Programming Language',
    helperText: 'Choose your preferred programming language',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...',
  },
};

/**
 * Required field with asterisk indicator.
 */
export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    label: 'Programming Language',
    required: true,
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...',
  },
};

/**
 * Combobox with an error state.
 */
export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    error: 'Please select a framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Disabled combobox.
 */
export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    disabled: true,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Combobox with clearable option enabled.
 */
export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    clearable: true,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Small size variant.
 */
export const SizeSmall: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    size: 'sm',
    label: 'Small Size',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...',
  },
};

/**
 * Medium size variant (default).
 */
export const SizeMedium: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    size: 'md',
    label: 'Medium Size',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...',
  },
};

/**
 * Large size variant.
 */
export const SizeLarge: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    size: 'lg',
    label: 'Large Size',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...',
  },
};

/**
 * Outline variant style.
 */
export const VariantOutline: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    variant: 'outline',
    label: 'Outline Variant',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Combobox with options that have descriptions.
 */
export const WithDescriptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Combobox with some disabled options.
 */
export const WithDisabledOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue', disabled: true },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte', disabled: true },
      { value: 'next', label: 'Next.js' },
    ],
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Empty state when no options are available.
 */
export const EmptyState: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: [],
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No frameworks available',
  },
};

/**
 * Controlled combobox with state management showing selected value.
 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('react');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} value={value} onValueChange={setValue} />
        <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm">
          <div className="mdt-font-medium">Selected value:</div>
          <div className="mdt-font-mono mdt-text-muted-foreground">{value || 'null'}</div>
        </div>
      </div>
    );
  },
  args: {
    options: frameworks,
    label: 'Framework',
    clearable: true,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

/**
 * Custom render function for options: a bolder label over its description. The row around it still wears the one
 * selection look (Pranjal, 2026-10-21) - the pale ground when picked, the grey one under the pointer - so the custom
 * part draws only the tick, on the RIGHT in the reading ink, in a slot that stays empty on unpicked rows.
 */
export const CustomRenderOption: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    renderOption: ({ option, selected }) => (
      <div className="mdt-flex mdt-w-full mdt-items-center mdt-gap-3">
        <div className="mdt-flex mdt-flex-1 mdt-flex-col">
          <span className="mdt-font-medium">{option.label}</span>
          {option.description && (
            <span className="mdt-text-xs mdt-text-muted-foreground">{option.description}</span>
          )}
        </div>
        <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center">
          {selected && <Icon name="check" size="sm" aria-hidden />}
        </span>
      </div>
    ),
  },
};

/**
 * Custom render function for selected value with emoji.
 */
export const CustomRenderValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    renderValue: (option) => (
      <span className="mdt-font-semibold mdt-text-primary">✨ {option.label}</span>
    ),
  },
};

/**
 * Custom trigger with badge style.
 */
export const CustomTrigger: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework (Custom Trigger)',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    renderTrigger: ({ selectedOption, placeholder, open, disabled }) => (
      <Button
        variant="outline"
        role="combobox"
        aria-label="Select a framework"
        aria-expanded={open}
        aria-controls="combobox-list"
        disabled={disabled}
        className="mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/5 mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-transition-colors hover:mdt-bg-primary/10"
      >
        {selectedOption ? (
          <span className="mdt-flex mdt-items-center mdt-gap-2">
            <span className="mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-primary" />
            <span className="mdt-text-primary">{selectedOption.label}</span>
          </span>
        ) : (
          <span className="mdt-text-muted-foreground">{placeholder}</span>
        )}
        <Icon name="chevrons-up-down" size="sm" color="primary" aria-hidden />
      </Button>
    ),
  },
};

/**
 * Large dataset example showing combobox performance.
 */
export const LargeDataset: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: Array.from({ length: 100 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
      description: `Description for option ${i + 1}`,
    })),
    label: 'Large Dataset (100 options)',
    placeholder: 'Search from 100 options...',
    searchPlaceholder: 'Type to search...',
  },
};

/**
 * Real-world example: Country selector with state display.
 */
export const CountrySelector: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} value={value} onValueChange={setValue} />
        {value && (
          <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm">
            <div className="mdt-font-medium">Selected country:</div>
            <div className="mdt-font-semibold mdt-text-primary">
              {countries.find((c) => c.value === value)?.label}
            </div>
          </div>
        )}
      </div>
    );
  },
  args: {
    options: countries,
    label: 'Country',
    required: true,
    clearable: true,
    placeholder: 'Select your country...',
    searchPlaceholder: 'Search countries...',
    helperText: 'Select the country where you are located',
  },
};

/**
 * Async data loading from API simulation.
 */
export const AsyncDataLoading: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        setOptions([
          { value: '1', label: 'User 1', description: 'user1@example.com' },
          { value: '2', label: 'User 2', description: 'user2@example.com' },
          { value: '3', label: 'User 3', description: 'user3@example.com' },
          { value: '4', label: 'User 4', description: 'user4@example.com' },
          { value: '5', label: 'User 5', description: 'user5@example.com' },
        ]);
        setLoading(false);
      }, 1500);
    }, []);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} options={options} value={value} onValueChange={setValue} />
        {loading && (
          <div className="mdt-text-sm mdt-text-muted-foreground">Loading users from API...</div>
        )}
      </div>
    );
  },
  args: {
    label: 'User (Async Loading)',
    placeholder: 'Select user...',
    searchPlaceholder: 'Search users...',
    emptyMessage: 'Loading users...',
  },
};

/**
 * Server-side search/filtering example.
 */
export const ServerSideFiltering: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [options, setOptions] = useState<ComboboxOption[]>(frameworks);
    const [loading, setLoading] = useState(false);

    const handleSearch = (query: string) => {
      if (!query) {
        setOptions(frameworks);
        return;
      }

      // Simulate API call for server-side filtering
      setLoading(true);
      setTimeout(() => {
        const filtered = frameworks.filter(
          (fw) =>
            fw.label.toLowerCase().includes(query.toLowerCase()) ||
            fw.description?.toLowerCase().includes(query.toLowerCase())
        );
        setOptions(filtered);
        setLoading(false);
      }, 500);
    };

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox
          {...args}
          options={options}
          value={value}
          onValueChange={setValue}
          onSearch={handleSearch}
        />
        {loading && (
          <div className="mdt-text-sm mdt-text-muted-foreground">Searching on server...</div>
        )}
      </div>
    );
  },
  args: {
    label: 'Framework (Server-side Search)',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Type to search server...',
    helperText: 'Search is performed on the server',
  },
};

/**
 * All size variants displayed together.
 */
export const AllSizes: Story = {
  render: () => {
    const [valueSm, setValueSm] = useState<string | null>(null);
    const [valueMd, setValueMd] = useState<string | null>(null);
    const [valueLg, setValueLg] = useState<string | null>(null);

    return (
      <div className="mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4">
        <Combobox
          options={languages}
          value={valueSm}
          onValueChange={setValueSm}
          size="sm"
          label="Small"
          placeholder="Select language..."
          searchPlaceholder="Search..."
        />
        <Combobox
          options={languages}
          value={valueMd}
          onValueChange={setValueMd}
          size="md"
          label="Medium"
          placeholder="Select language..."
          searchPlaceholder="Search..."
        />
        <Combobox
          options={languages}
          value={valueLg}
          onValueChange={setValueLg}
          size="lg"
          label="Large"
          placeholder="Select language..."
          searchPlaceholder="Search..."
        />
      </div>
    );
  },
};

/**
 * All variants displayed together.
 */
export const AllVariants: Story = {
  render: () => {
    const [valueDefault, setValueDefault] = useState<string | null>(null);
    const [valueOutline, setValueOutline] = useState<string | null>(null);

    return (
      <div className="mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4">
        <Combobox
          options={frameworks}
          value={valueDefault}
          onValueChange={setValueDefault}
          variant="default"
          label="Default"
          placeholder="Select framework..."
          searchPlaceholder="Search..."
        />
        <Combobox
          options={frameworks}
          value={valueOutline}
          onValueChange={setValueOutline}
          variant="outline"
          label="Outline"
          placeholder="Select framework..."
          searchPlaceholder="Search..."
        />
      </div>
    );
  },
};

/**
 * Search callback example showing how to handle search events.
 */
export const WithSearchCallback: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox
          {...args}
          value={value}
          onValueChange={setValue}
          onSearch={(query) => {
            setSearchQuery(query);
            console.log('Search query:', query);
          }}
        />
        {searchQuery && (
          <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm">
            <div className="mdt-font-medium">Current search:</div>
            <div className="mdt-font-mono mdt-text-muted-foreground">{searchQuery}</div>
          </div>
        )}
      </div>
    );
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Type to search...',
  },
};

/* THE TYPE-IN PICKER (search="field", Pranjal 2026-10-21) - sample data for the three stories below. */

/** Agent tags with how many agents carry each: a two-line option, the count as its second line. */
const agentTags: ComboboxOption[] = [
  { value: 'env:prod', label: 'env:prod', description: '1,781 agents' },
  { value: 'env:staging', label: 'env:staging', description: '353 agents' },
  { value: 'owner:platform', label: 'owner:platform', description: '245 agents' },
  { value: 'pci:in-scope', label: 'pci:in-scope', description: '484 agents' },
  { value: 'role:databases', label: 'role:databases', description: '352 agents' },
  { value: 'role:edge', label: 'role:edge', description: '383 agents' },
  { value: 'role:kubernetes', label: 'role:kubernetes', description: '329 agents' },
  { value: 'role:production', label: 'role:production', description: '359 agents' },
  { value: 'role:staging', label: 'role:staging', description: '353 agents' },
  { value: 'role:web', label: 'role:web', description: '358 agents' },
];

/** IANA time zone names: a one-line option, the label alone. */
const timeZones: ComboboxOption[] = [
  'Asia/Kolkata',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Jakarta',
  'Australia/Sydney',
  'Pacific/Auckland',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Europe/Madrid',
  'Europe/Istanbul',
  'Africa/Johannesburg',
  'Africa/Lagos',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Sao_Paulo',
].map((zone) => ({ value: zone, label: zone }));

/** 400 hosts, a hundred to a subnet (edge-32-0012 at 10.32.0.14): a long list to type into. */
const agentHosts: ComboboxOption[] = ['edge', 'web', 'db', 'kube'].flatMap((role, block) => {
  const subnet = 32 + block;
  return Array.from({ length: 100 }, (_, i) => {
    const host = `${role}-${subnet}-${String(i + 1).padStart(4, '0')}`;
    return { value: host, label: host, description: `10.${subnet}.0.${i + 3}` };
  });
});

/**
 * The type-in picker, two-line options: `search="field"` makes the field itself the search box, so there is one input,
 * not a field plus a second search box inside the list, and the list only shows results. A click or ArrowDown opens
 * every option; typing narrows them (label, value or second line) and lights the first match, so Enter picks it;
 * Escape, Tab or a click elsewhere keeps the last pick. Picked, the field reads the name and the detail with a hairline
 * between - "env:staging | 353 agents". `emptyMessage` can be a function of what was typed.
 */
export const TypeInTwoLine: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    search: 'field',
    size: 'sm',
    options: agentTags,
    label: 'Which tag',
    placeholder: 'Type to find a tag',
    emptyMessage: (q) => `No tag matches "${q}"`,
  },
};

/**
 * The type-in picker, one-line options: an option with no `description` is the name alone, in the list and in the
 * field once picked ("Asia/Kolkata", no hairline). Reopening shows the whole list again with the pick ticked, its
 * name selected in the field so typing replaces it.
 */
export const TypeInOneLine: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    search: 'field',
    size: 'sm',
    options: timeZones,
    label: 'Time zone',
    placeholder: 'Type to find a time zone',
  },
};

/**
 * The type-in picker on a long list: 400 hosts, each with its address as the second line. Typing a few characters of
 * the name or the address ("0012", "10.34") narrows the list to a handful; the arrow keys keep the lit row in view.
 * Picked, the field reads "edge-32-0012 | 10.32.0.14".
 */
export const TypeInLongList: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    search: 'field',
    size: 'sm',
    options: agentHosts,
    label: 'Which agent',
    placeholder: 'Type a host name',
  },
};
