import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Textarea } from './Textarea';

/**
 * The Textarea component is used for multi-line text input fields.
 * It supports labels, error states, helper text, and character counting.
 */
const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A multi-line text input component with support for labels, validation states, and character counting.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    // === Core Props ===
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the textarea',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Visual style variant of the textarea',
      table: {
        type: { summary: '"default" | "filled"' },
        defaultValue: { summary: 'default' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
      description: 'Resize behavior of the textarea',
      table: {
        type: { summary: '"none" | "vertical" | "both"' },
        defaultValue: { summary: 'vertical' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when textarea is empty',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Controlled value of the textarea',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled textarea',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for the textarea element',
      table: {
        type: { summary: 'string' },
      },
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom CSS classes for the wrapper container',
      table: {
        type: { summary: 'string' },
      },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
      table: {
        type: { summary: 'number' },
      },
    },
    cols: {
      control: 'number',
      description: 'Visible width in average character widths',
      table: {
        type: { summary: 'number' },
      },
    },

    // === Label & Messages ===
    label: {
      control: 'text',
      description: 'Label text displayed above the textarea',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the textarea (shows red styling)',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the textarea (hidden when error is present)',
      table: {
        type: { summary: 'string' },
      },
    },

    // === States ===
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea and prevents user interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the textarea read-only (can be focused but not edited)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the textarea as required (for form validation)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // === Textarea Attributes ===
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the textarea element',
      table: {
        type: { summary: 'string' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Automatically focus the textarea when component mounts',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters allowed',
      table: {
        type: { summary: 'number' },
      },
    },
    minLength: {
      control: 'number',
      description: 'Minimum number of characters required',
      table: {
        type: { summary: 'number' },
      },
    },
    wrap: {
      control: 'select',
      options: ['soft', 'hard', 'off'],
      description: 'How the text should be wrapped when submitted in a form',
      table: {
        type: { summary: '"soft" | "hard" | "off"' },
      },
    },

    // === Event Handlers ===
    onChange: {
      action: 'changed',
      description: 'Callback fired when the textarea value changes',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLTextAreaElement>) => void' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Callback fired when the textarea receives focus',
      table: {
        type: { summary: '(event: FocusEvent<HTMLTextAreaElement>) => void' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback fired when the textarea loses focus',
      table: {
        type: { summary: '(event: FocusEvent<HTMLTextAreaElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Callback fired when a key is pressed down',
      table: {
        type: { summary: '(event: KeyboardEvent<HTMLTextAreaElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Callback fired when a key is released',
      table: {
        type: { summary: '(event: KeyboardEvent<HTMLTextAreaElement>) => void' },
      },
    },

    // === ARIA Attributes ===
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers (use when label prop is not provided)',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the textarea',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-invalid': {
      control: 'boolean',
      description:
        'Indicates whether the textarea value is invalid (automatically set when error prop is present)',
      table: {
        type: { summary: 'boolean' },
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
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default textarea.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    'aria-label': 'Message textarea',
  },
};

/**
 * Different size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea size="sm" placeholder="Small textarea" aria-label="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea (default)" aria-label="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" aria-label="Large textarea" />
    </div>
  ),
};

/**
 * Textarea with placeholder.
 */
export const WithPlaceholder: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
  },
};

/**
 * Textarea with default value.
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Bio',
    defaultValue: 'This is a pre-filled bio text that can be edited.',
  },
};

/**
 * Disabled textarea.
 */
export const Disabled: Story = {
  args: {
    label: 'Comments',
    disabled: true,
    defaultValue: 'This textarea is disabled and cannot be edited.',
  },
};

/**
 * Textarea with character count.
 */
export const WithCharacterCount: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    const maxLength = 200;
    const remaining = maxLength - value.length;

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          maxLength={maxLength}
          helperText={`${String(remaining)} characters remaining`}
        />
      </div>
    );
  },
};

/**
 * Form example with multiple textareas.
 */
export const FormExample: Story = {
  render: () => (
    <form className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea label="Subject" placeholder="Enter subject" rows={2} required />
      <Textarea
        label="Message"
        placeholder="Enter your message"
        rows={5}
        helperText="Please provide detailed information"
        required
      />
      <Textarea label="Additional Notes" placeholder="Any additional information" rows={3} />
    </form>
  ),
};

/**
 * Auto-resize example.
 */
export const AutoResize: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      // Auto-resize logic
      e.target.style.height = 'auto';
      e.target.style.height = `${String(e.target.scrollHeight)}px`;
    };

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Textarea
          label="Auto-resize Textarea"
          placeholder="Start typing and watch the textarea grow..."
          value={value}
          onChange={handleChange}
          resize="none"
          rows={3}
          helperText="This textarea automatically adjusts its height based on content"
        />
      </div>
    );
  },
};

/**
 * Textarea with label.
 */
export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
};

/**
 * Textarea with helper text.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your feedback',
    helperText: 'Your feedback helps us improve our service',
  },
};

/**
 * Textarea in error state.
 */
export const WithError: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Enter your comment',
    error: 'Comment is required',
    defaultValue: '',
  },
};

/**
 * Different resize variants.
 */
export const ResizeVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea
        label="No Resize"
        placeholder="This textarea cannot be resized"
        resize="none"
        aria-label="No resize textarea"
      />
      <Textarea
        label="Vertical Resize (Default)"
        placeholder="This textarea can be resized vertically"
        resize="vertical"
        aria-label="Vertical resize textarea"
      />
      <Textarea
        label="Both Directions"
        placeholder="This textarea can be resized in both directions"
        resize="both"
        aria-label="Both directions resize textarea"
      />
    </div>
  ),
};

/**
 * Different variant styles.
 */
export const Variants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea
        label="Default Variant"
        placeholder="Default background"
        variant="default"
        aria-label="Default variant textarea"
      />
      <Textarea
        label="Filled Variant"
        placeholder="Filled background"
        variant="filled"
        aria-label="Filled variant textarea"
      />
    </div>
  ),
};

/**
 * Read-only textarea.
 */
export const ReadOnly: Story = {
  args: {
    label: 'Terms and Conditions',
    readOnly: true,
    defaultValue:
      'This is a read-only textarea. You can select and copy the text, but you cannot edit it.',
    helperText: 'This field cannot be edited',
  },
};

/**
 * Required textarea.
 */
export const Required: Story = {
  args: {
    label: 'Reason',
    required: true,
    placeholder: 'Please provide a reason (required)',
  },
};

/**
 * Textarea with rows attribute.
 */
export const WithRows: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea label="2 Rows" rows={2} placeholder="Two visible rows" aria-label="2 rows" />
      <Textarea label="5 Rows" rows={5} placeholder="Five visible rows" aria-label="5 rows" />
      <Textarea label="10 Rows" rows={10} placeholder="Ten visible rows" aria-label="10 rows" />
    </div>
  ),
};

/**
 * Interaction test - Typing text into textarea.
 */
export const InteractionTestTyping: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', { name: /message/i });

    // Test: Textarea is visible and empty
    await expect(textarea).toBeInTheDocument();
    await expect(textarea).toHaveValue('');

    // Test: Type into the textarea
    await userEvent.type(textarea, 'Hello, this is a test message!');

    // Test: Verify value was typed
    await expect(textarea).toHaveValue('Hello, this is a test message!');

    // Test: Verify onChange was called
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/**
 * Interaction test - Disabled textarea should not accept input.
 */
export const InteractionTestDisabled: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Disabled textarea',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', { name: /comments/i });

    // Test: Textarea is disabled
    await expect(textarea).toBeDisabled();

    // Test: Try to type (should not work)
    await userEvent.type(textarea, 'This should not appear');

    // Test: Verify no value was entered
    await expect(textarea).toHaveValue('');

    // Test: Verify onChange was NOT called
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

/**
 * Interaction test - Clear textarea and verify onChange.
 */
export const InteractionTestClear: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Enter notes',
    defaultValue: 'Initial notes content',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', { name: /notes/i });

    // Test: Textarea has initial value
    await expect(textarea).toHaveValue('Initial notes content');

    // Test: Clear the textarea
    await userEvent.clear(textarea);

    // Test: Verify textarea is empty
    await expect(textarea).toHaveValue('');

    // Test: Type new value
    await userEvent.type(textarea, 'New notes content');

    // Test: Verify new value
    await expect(textarea).toHaveValue('New notes content');

    // Test: Verify onChange was called
    await expect(args.onChange).toHaveBeenCalled();
  },
};
