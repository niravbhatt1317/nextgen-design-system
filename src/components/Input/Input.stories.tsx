import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Input } from './Input';

/**
 * The Input component is used for text input fields.
 * It supports labels, error states, helper text, and adornments.
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A text input component with support for labels, validation states, and adornments.',
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
      description: 'Size variant of the input',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
        'color',
      ],
      description: 'HTML input type attribute',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Controlled value of the input',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled input',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for the input element',
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

    // === Label & Messages ===
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input (shows red styling)',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input (hidden when error is present)',
      table: {
        type: { summary: 'string' },
      },
    },

    // === Adornments ===
    startAdornment: {
      control: false,
      description: 'Icon, text, or element displayed at the start of the input (left side)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    endAdornment: {
      control: false,
      description:
        'Icon, text, or element displayed at the end of the input (right side). Commonly used for clear buttons, password visibility toggles, or units',
      table: {
        type: { summary: 'ReactNode' },
      },
    },

    // === States ===
    disabled: {
      control: 'boolean',
      description: 'Disables the input and prevents user interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the input read-only (can be focused but not edited)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the input as required (for form validation)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // === Input Attributes ===
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the input element',
      table: {
        type: { summary: 'string' },
      },
    },
    autoComplete: {
      control: 'text',
      description: 'HTML autocomplete attribute for browser autofill',
      table: {
        type: { summary: 'string' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Automatically focus the input when component mounts',
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
    pattern: {
      control: 'text',
      description: 'Regular expression pattern for validation',
      table: {
        type: { summary: 'string' },
      },
    },
    min: {
      control: 'text',
      description: 'Minimum value (for number, date, time inputs)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    max: {
      control: 'text',
      description: 'Maximum value (for number, date, time inputs)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    step: {
      control: 'text',
      description: 'Stepping interval (for number, date, time inputs)',
      table: {
        type: { summary: 'string | number' },
      },
    },

    // === Event Handlers ===
    onChange: {
      action: 'changed',
      description: 'Callback fired when the input value changes',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Callback fired when the input receives focus',
      table: {
        type: { summary: '(event: FocusEvent<HTMLInputElement>) => void' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback fired when the input loses focus',
      table: {
        type: { summary: '(event: FocusEvent<HTMLInputElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Callback fired when a key is pressed down',
      table: {
        type: { summary: '(event: KeyboardEvent<HTMLInputElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Callback fired when a key is released',
      table: {
        type: { summary: '(event: KeyboardEvent<HTMLInputElement>) => void' },
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
      description: 'ID of element that describes the input',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-invalid': {
      control: 'boolean',
      description:
        'Indicates whether the input value is invalid (automatically set when error prop is present)',
      table: {
        type: { summary: 'boolean' },
      },
    },
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

/**
 * The default input.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    'aria-label': 'Text input',
  },
};

/**
 * Input with a label.
 */
export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

/**
 * Input with helper text.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Password must be at least 8 characters',
  },
};

/**
 * Input in error state with error message.
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

/**
 * Different size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Input size="sm" placeholder="Small input" aria-label="Small input" />
      <Input size="md" placeholder="Medium input (default)" aria-label="Medium input" />
      <Input size="lg" placeholder="Large input" aria-label="Large input" />
    </div>
  ),
};

/**
 * Input with start adornment (icon).
 */
export const WithStartAdornment: Story = {
  args: {
    placeholder: 'Search...',
    'aria-label': 'Search input',
    startAdornment: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
};

/**
 * Input with end adornment (icon).
 */
export const WithEndAdornment: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    endAdornment: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mdt-cursor-pointer"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

/**
 * Input with both adornments.
 */
export const WithBothAdornments: Story = {
  args: {
    placeholder: 'Amount',
    startAdornment: <span className="mdt-text-sm">$</span>,
    endAdornment: <span className="mdt-text-sm">USD</span>,
    type: 'number',
  },
};

/**
 * Disabled input.
 */
export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    placeholder: 'Disabled input',
    defaultValue: 'disabled@example.com',
  },
};

/**
 * Read-only input.
 */
export const ReadOnly: Story = {
  args: {
    label: 'Account ID',
    readOnly: true,
    defaultValue: 'ACC-123456',
    helperText: 'This field cannot be edited',
  },
};

/**
 * Required input.
 */
export const Required: Story = {
  args: {
    label: 'Username',
    required: true,
    placeholder: 'Required field',
  },
};

/**
 * Various input types.
 */
export const InputTypes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="Email input" />
      <Input label="Password" type="password" placeholder="Password input" />
      <Input label="Number" type="number" placeholder="Number input" />
      <Input label="Tel" type="tel" placeholder="Phone input" />
      <Input label="URL" type="url" placeholder="URL input" />
      <Input label="Search" type="search" placeholder="Search input" />
    </div>
  ),
};

/**
 * Form example with multiple inputs.
 */
export const FormExample: Story = {
  render: () => (
    <form className="mdt-flex mdt-flex-col mdt-gap-4">
      <Input label="Full Name" placeholder="John Doe" required />
      <Input label="Email" type="email" placeholder="john@example.com" required />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        helperText="Include country code"
      />
      <Input label="Website" type="url" placeholder="https://example.com" />
    </form>
  ),
};

/**
 * Interaction test - Typing text into input.
 * This story demonstrates how to test user typing interactions in Storybook.
 */
export const InteractionTestTyping: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: /username/i });

    // Test: Input is visible and empty
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveValue('');

    // Test: Type into the input
    await userEvent.type(input, 'john_doe');

    // Test: Verify value was typed
    await expect(input).toHaveValue('john_doe');

    // Test: Verify onChange was called
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/**
 * Interaction test - Disabled input should not accept input.
 */
export const InteractionTestDisabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Disabled input',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: /email/i });

    // Test: Input is disabled
    await expect(input).toBeDisabled();

    // Test: Try to type (should not work)
    await userEvent.type(input, 'test@example.com');

    // Test: Verify no value was entered
    await expect(input).toHaveValue('');

    // Test: Verify onChange was NOT called
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

/**
 * Interaction test - Clear input and verify onChange.
 */
export const InteractionTestClear: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search',
    defaultValue: 'initial value',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: /search/i });

    // Test: Input has initial value
    await expect(input).toHaveValue('initial value');

    // Test: Clear the input
    await userEvent.clear(input);

    // Test: Verify input is empty
    await expect(input).toHaveValue('');

    // Test: Type new value
    await userEvent.type(input, 'new search term');

    // Test: Verify new value
    await expect(input).toHaveValue('new search term');

    // Test: Verify onChange was called multiple times
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/**
 * Industry-standard adornment examples.
 * These examples demonstrate common patterns used in production applications.
 */
export const AdornmentExamples: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      {/* Search with magnifying glass icon */}
      <Input
        label="Search"
        placeholder="Search users..."
        startAdornment={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        }
      />

      {/* Email with icon */}
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        startAdornment={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        }
      />

      {/* Currency input with text adornments */}
      <Input
        label="Price"
        type="number"
        placeholder="0.00"
        startAdornment={<span className="mdt-text-sm mdt-font-medium">$</span>}
        endAdornment={<span className="mdt-text-xs mdt-text-muted-foreground">USD</span>}
      />

      {/* Percentage input */}
      <Input
        label="Discount"
        type="number"
        placeholder="0"
        endAdornment={<span className="mdt-text-sm mdt-font-medium">%</span>}
      />

      {/* Unit measurement */}
      <Input
        label="Weight"
        type="number"
        placeholder="0"
        endAdornment={<span className="mdt-text-xs mdt-text-muted-foreground">kg</span>}
      />

      {/* Password with visibility toggle */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        endAdornment={
          <button
            type="button"
            aria-label="Toggle password visibility"
            className="mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-p-0 hover:mdt-text-foreground"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('Toggle password visibility');
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        }
      />

      {/* Clear button */}
      <Input
        label="Username"
        placeholder="Enter username"
        defaultValue="john_doe"
        endAdornment={
          <button
            type="button"
            aria-label="Clear input"
            className="mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-p-0 hover:mdt-text-foreground"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('Clear input');
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </button>
        }
      />

      {/* Loading/spinner indicator */}
      <Input
        label="API Key"
        placeholder="Validating..."
        disabled
        endAdornment={
          <svg
            className="mdt-animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        }
      />

      {/* Phone with country code */}
      <Input
        label="Phone Number"
        type="tel"
        placeholder="123-456-7890"
        startAdornment={<span className="mdt-text-sm mdt-font-medium">+1</span>}
      />

      {/* URL with protocol */}
      <Input
        label="Website"
        type="url"
        placeholder="example.com"
        startAdornment={<span className="mdt-text-xs mdt-text-muted-foreground">https://</span>}
      />

      {/* User handle */}
      <Input
        label="Twitter Handle"
        placeholder="username"
        startAdornment={<span className="mdt-text-sm mdt-font-medium">@</span>}
      />

      {/* File size limit */}
      <Input
        label="Max Upload Size"
        type="number"
        placeholder="100"
        endAdornment={<span className="mdt-text-xs mdt-text-muted-foreground">MB</span>}
      />

      {/* Temperature */}
      <Input
        label="Temperature"
        type="number"
        placeholder="0"
        endAdornment={<span className="mdt-text-sm mdt-font-medium">°C</span>}
      />

      {/* Validation success indicator */}
      <Input
        label="Email (Validated)"
        type="email"
        defaultValue="user@example.com"
        endAdornment={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mdt-text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        }
      />

      {/* Copy button */}
      <Input
        label="Share Link"
        readOnly
        defaultValue="https://app.example.com/share/abc123"
        endAdornment={
          <button
            type="button"
            aria-label="Copy to clipboard"
            className="mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-p-0 hover:mdt-text-foreground"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('Copy to clipboard');
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        }
      />
    </div>
  ),
};
