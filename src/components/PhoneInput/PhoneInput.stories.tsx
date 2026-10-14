import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PhoneInput } from './PhoneInput';
import type { PhoneInputProps, PhoneInputValue } from './PhoneInput.types';

/**
 * `PhoneInput` is one field for a phone number: the country at its start - its flag, its dial code and a chevron -
 * and the national number typed after it. The country opens a searchable list of every country with its dial code.
 *
 * Ported from the console's PhoneField (Pranjal, 2026-10-13): the site, contact and profile drawers' phone.
 */
const meta: Meta<typeof PhoneInput> = {
  title: 'New Components/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'One field joining a searchable country-code picker (the library Combobox) and the national number (the library Input), with the Input\'s label, help, error, held state and sizes. The value is `{ country, number }` or a stored phone string ("+44 20 7946 0958"); `onChange` hands back both the parts and the joined "+<dial> <national>" string. The field hints the chosen country\'s own number format. Without `renderFlag` a country shows its two-letter code in a small tile.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    locked: { control: 'boolean' },
  },
  args: { label: 'Phone', defaultValue: { country: 'IN', number: '' } },
  decorators: [
    (Story) => (
      <div className="mdt-w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A controlled field and the string a record would keep, side by side. */
const ControlledDemo = (args: PhoneInputProps) => {
  const [value, setValue] = useState<PhoneInputValue>({ country: 'GB', number: '20 7946 0958' });
  const [phone, setPhone] = useState('+44 20 7946 0958');
  return (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <PhoneInput
        {...args}
        value={value}
        onChange={(next, joined) => {
          setValue(next);
          setPhone(joined);
        }}
      />
      <span className="mdt-text-xs mdt-text-muted-foreground">Stored: {phone || '(empty)'}</span>
    </div>
  );
};

/** Controlled with the two parts; the joined string is what a record keeps. */
export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
};

/** A stored string in: split into the country and the national number. */
export const FromString: Story = {
  args: { defaultValue: '+1868 555 0100' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Used for account recovery only' },
};

export const WithError: Story = {
  args: { defaultValue: { country: 'US', number: '555' }, error: 'Enter a full phone number' },
};

/** Held: a directory-managed person's phone - disabled with the lock, and the country closed too. */
export const Locked: Story = {
  args: { defaultValue: '+91 98765 43210', locked: true },
};

export const Disabled: Story = {
  args: { defaultValue: { country: 'DE', number: '030 1234567' }, disabled: true },
};

/** No country chosen yet: a dash in the tile, the generic format. */
export const NoCountry: Story = {
  args: { defaultValue: { country: '', number: '' } },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <PhoneInput {...args} size="sm" label="Small" />
      <PhoneInput {...args} size="md" label="Medium" />
      <PhoneInput {...args} size="lg" label="Large" />
    </div>
  ),
};
