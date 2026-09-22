import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SelectOld2 } from './SelectOld2';
import type { SelectOld2Option, SelectOld2Props } from './SelectOld2.types';

const meta: Meta<typeof SelectOld2> = {
  title: 'Deprecated 2/Select Old',
  component: SelectOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'Select',
        message:
          'The Select as it was before 17 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Select`',
          '',
          'The Select as it was before 17 September 2026. Deprecated 2026-09-22 when Pranjal',
          'ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
          '',
          'A dropdown for one value or many: search, pills, select all, groups, icons and',
          'avatars, a borderless trigger, and an overlay placement that covers the trigger.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    mode: { control: 'select', options: ['single', 'multiple'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'borderless'] },
    placement: { control: 'select', options: ['bottom', 'overlay'] },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<SelectOld2Props>;

const countries: SelectOld2Option[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'in', label: 'India' },
  { value: 'au', label: 'Australia' },
];

const fruits: SelectOld2Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const priorities: SelectOld2Option[] = [
  { value: 'critical', label: 'Critical', icon: <span>🔴</span> },
  { value: 'high', label: 'High', icon: <span>🟠</span> },
  { value: 'medium', label: 'Medium', icon: <span>🟡</span> },
  { value: 'low', label: 'Low', icon: <span>🟢</span> },
];

const teamMembers: SelectOld2Option[] = [
  { value: '1', label: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { value: '2', label: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { value: '3', label: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { value: '4', label: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4' },
];

export const Default: Story = {
  args: { options: countries, placeholder: 'Select country', 'aria-label': 'Country' },
};

export const WithLabel: Story = {
  args: {
    options: fruits,
    placeholder: 'Choose your favourite',
    label: 'Favourite fruit',
    helperText: 'This helps us personalise your experience',
  },
};

export const WithError: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select country',
    error: 'Please select a country',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <SelectOld2 options={fruits} size="sm" placeholder="Small" aria-label="Small" />
      <SelectOld2 options={fruits} size="md" placeholder="Medium" aria-label="Medium" />
      <SelectOld2 options={fruits} size="lg" placeholder="Large" aria-label="Large" />
    </div>
  ),
};

export const WithIcons: Story = {
  args: { options: priorities, label: 'Priority', placeholder: 'Select priority' },
};

export const WithAvatars: Story = {
  args: { options: teamMembers, label: 'Assignee', placeholder: 'Select a person' },
};

export const Searchable: Story = {
  args: {
    options: teamMembers,
    label: 'Search team members',
    searchable: true,
    searchPlaceholder: 'Type to search...',
  },
};

export const MultiSelect: Story = {
  args: {
    mode: 'multiple',
    options: fruits,
    label: 'Fruits',
    placeholder: 'Choose several',
    showPills: true,
    maxPills: 3,
  },
};

export const MultiSelectAdvanced: Story = {
  args: {
    mode: 'multiple',
    options: teamMembers,
    label: 'Team members',
    searchable: true,
    clearable: true,
    showPills: true,
    selectAll: true,
  },
};

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
    label: 'Grocery items',
    grouped: true,
    showPills: true,
  },
};

export const Clearable: Story = {
  render: function ClearableStory() {
    const [value, setValue] = useState<string | string[] | null>('us');
    return (
      <SelectOld2 options={countries} label="Country" clearable value={value} onChange={setValue} />
    );
  },
};

export const TriggerVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <SelectOld2 options={fruits} variant="default" placeholder="Default" aria-label="Default" />
      <SelectOld2
        options={fruits}
        variant="borderless"
        placeholder="Borderless"
        aria-label="Borderless"
      />
    </div>
  ),
};

export const OverlayPlacement: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Opens over the trigger',
    placement: 'overlay',
  },
};

export const Disabled: Story = {
  args: { options: fruits, label: 'Disabled field', disabled: true },
};

export const Loading: Story = {
  args: { options: [], label: 'Loading options', loading: true },
};

export const Required: Story = {
  args: { options: countries, label: 'Country', placeholder: 'Required', required: true },
};
