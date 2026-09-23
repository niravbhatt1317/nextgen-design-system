import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TextareaOld2 } from './TextareaOld2';

const meta: Meta<typeof TextareaOld2> = {
  title: 'Deprecated 2/Textarea Old',
  component: TextareaOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'Textarea',
        message:
          'The Textarea as it was before 17 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Textarea`',
          '',
          'The Textarea as it was before 17 September 2026. Deprecated 2026-09-22 when Pranjal',
          'ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
          '',
          'A multi-line text field with a label, an error line and helper text. Three sizes,',
          'a `filled` variant, and `resize` set to none, vertical or both.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      table: { defaultValue: { summary: 'default' } },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
      table: { defaultValue: { summary: 'vertical' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter your message...', 'aria-label': 'Message' },
};

export const WithLabel: Story = {
  args: { label: 'Description', placeholder: 'Describe the issue' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    helperText: 'Shown on your public profile.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    defaultValue: '',
    error: 'A message is required.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <TextareaOld2 size="sm" placeholder="Small (min 80px)" aria-label="Small" />
      <TextareaOld2 size="md" placeholder="Medium (min 100px)" aria-label="Medium" />
      <TextareaOld2 size="lg" placeholder="Large (min 120px)" aria-label="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <TextareaOld2 variant="default" placeholder="Default" aria-label="Default" />
      <TextareaOld2 variant="filled" placeholder="Filled" aria-label="Filled" />
    </div>
  ),
};

export const ResizeVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <TextareaOld2 resize="none" placeholder="No resize" aria-label="No resize" />
      <TextareaOld2 resize="vertical" placeholder="Vertical only" aria-label="Vertical" />
      <TextareaOld2 resize="both" placeholder="Both directions" aria-label="Both" />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: function WithCharacterCountStory() {
    const [value, setValue] = useState('');
    const max = 200;
    return (
      <TextareaOld2
        label="Bio"
        placeholder="Up to 200 characters"
        maxLength={max}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        helperText={`${String(value.length)} / ${String(max)}`}
      />
    );
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: 'Cannot type here', disabled: true },
};

export const ReadOnly: Story = {
  args: { label: 'Read only', defaultValue: 'A value you can copy but not change', readOnly: true },
};

export const Required: Story = {
  args: { label: 'Reason', placeholder: 'Required', required: true },
};
