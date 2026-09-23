import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon';
import { InputOld2 } from './InputOld2';

const meta: Meta<typeof InputOld2> = {
  title: 'Deprecated 2/Input Old',
  component: InputOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'Input',
        message:
          'The Input as it was before 12 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Input`',
          '',
          'The Input as it was before 12 September 2026. Deprecated 2026-09-22 when Pranjal',
          'ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
          '',
          'A text input with a label, an error line, helper text and start or end adornments.',
          'Three sizes: `sm` 32px, `md` 36px, `lg` 40px.',
        ].join('\n'),
      },
    },
    controls: { exclude: ['class'] },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean' },
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text...', 'aria-label': 'Text input' },
};

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'you@company.com', type: 'email' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Letters, numbers and underscores only.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@company.com',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <InputOld2 size="sm" placeholder="Small (32px)" aria-label="Small" />
      <InputOld2 size="md" placeholder="Medium (36px)" aria-label="Medium" />
      <InputOld2 size="lg" placeholder="Large (40px)" aria-label="Large" />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <InputOld2
        placeholder="Search..."
        aria-label="Search"
        startAdornment={<Icon name="search" size={16} />}
      />
      <InputOld2
        placeholder="Amount"
        aria-label="Amount"
        endAdornment={<span className="mdt-text-sm">USD</span>}
      />
      <InputOld2
        placeholder="Both ends"
        aria-label="Both ends"
        startAdornment={<Icon name="mail" size={16} />}
        endAdornment={<Icon name="check" size={16} />}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: 'Cannot type here', disabled: true },
};

export const ReadOnly: Story = {
  args: { label: 'Read only', defaultValue: 'A value you can copy but not change', readOnly: true },
};

export const Required: Story = {
  args: { label: 'Full name', placeholder: 'Required', required: true },
};
