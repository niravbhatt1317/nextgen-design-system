/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible One-Time Password (OTP) input component with auto-advance, paste support, keyboard navigation, and validation.',
      },
    },
  },
  argTypes: {
    length: {
      control: 'number',
      description: 'Number of OTP input boxes',
      table: {
        defaultValue: { summary: '6' },
      },
    },
    value: {
      control: 'text',
      description: 'Current OTP value',
      table: {
        defaultValue: { summary: '' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when OTP value changes',
    },
    onComplete: {
      action: 'completed',
      description: 'Callback when OTP is completely filled',
    },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric'],
      description: 'Type of input allowed',
      table: {
        defaultValue: { summary: 'numeric' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all inputs',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus first input on mount',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder character for empty inputs',
      table: {
        defaultValue: { summary: '○' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the OTP inputs',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default OTP input with 6 digits.
 */
export const Default: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput
          value={otp}
          onChange={setOtp}
          onComplete={(value) => {
            // OTP Complete
            void value;
          }}
        />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Current value: {otp || 'empty'}
        </p>
      </div>
    );
  },
};

/**
 * 4-digit OTP for PIN codes.
 */
export const FourDigit: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput
          length={4}
          value={otp}
          onChange={setOtp}
          onComplete={(value) => {
            // PIN Complete
            void value;
          }}
        />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Current PIN: {otp || 'empty'}
        </p>
      </div>
    );
  },
};

/**
 * 8-digit OTP for more secure codes.
 */
export const EightDigit: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput
          length={8}
          value={otp}
          onChange={setOtp}
          onComplete={(value) => {
            // OTP Complete
            void value;
          }}
        />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Current value: {otp || 'empty'}
        </p>
      </div>
    );
  },
};

/**
 * Alphanumeric OTP (letters and numbers).
 */
export const Alphanumeric: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput
          type="alphanumeric"
          value={otp}
          onChange={setOtp}
          onComplete={(value) => {
            // Code Complete
            void value;
          }}
        />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Current value: {otp || 'empty'}
        </p>
        <p className="mdt-text-center mdt-text-xs mdt-text-muted-foreground">
          Accepts: a-z, A-Z, 0-9
        </p>
      </div>
    );
  },
};

/**
 * Pre-filled OTP value.
 */
export const PreFilled: Story = {
  render: () => {
    const [otp, setOtp] = useState('123456');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput value={otp} onChange={setOtp} />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Current value: {otp}
        </p>
      </div>
    );
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  render: () => {
    const [otp] = useState('123456');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput value={otp} disabled />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          This OTP input is disabled
        </p>
      </div>
    );
  },
};

/**
 * Custom placeholder character.
 */
export const CustomPlaceholder: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <OTPInput value={otp} onChange={setOtp} placeholder="−" />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Using "−" as placeholder
        </p>
      </div>
    );
  },
};

/**
 * Without auto-focus.
 * Note: autoFocus is disabled for accessibility reasons.
 */
export const NoAutoFocus: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <OTPInput value={otp} onChange={setOtp} autoFocus={false} />
        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Click an input box to start entering
        </p>
      </div>
    );
  },
};

/**
 * Form integration example with verification flow.
 */
export const FormExample: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');

    const handleComplete = (value: string) => {
      setIsVerifying(true);
      setError('');

      // Simulate API call
      setTimeout(() => {
        if (value === '123456') {
          setIsVerified(true);
          setIsVerifying(false);
        } else {
          setError('Invalid OTP. Try 123456');
          setIsVerifying(false);
          setOtp('');
        }
      }, 1500);
    };

    const handleReset = () => {
      setOtp('');
      setIsVerified(false);
      setError('');
    };

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4" style={{ width: '400px' }}>
        <div className="mdt-text-center">
          <h3 className="mdt-text-lg mdt-font-semibold">Verify Your Account</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Enter the 6-digit code sent to your phone
          </p>
          <p className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">(Hint: Try 123456)</p>
        </div>

        <OTPInput
          value={otp}
          onChange={setOtp}
          onComplete={handleComplete}
          disabled={isVerifying || isVerified}
        />

        {isVerifying && <p className="mdt-text-sm mdt-text-muted-foreground">Verifying...</p>}

        {error && <p className="mdt-text-sm mdt-text-destructive">{error}</p>}

        {isVerified && (
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <p className="mdt-text-sm mdt-text-green-600">✓ Verification successful!</p>
            <button
              type="button"
              onClick={handleReset}
              className="mdt-text-sm mdt-text-primary mdt-underline"
            >
              Reset
            </button>
          </div>
        )}

        <div className="mdt-text-center mdt-text-xs mdt-text-muted-foreground">
          <p>Didn't receive a code?</p>
          <button type="button" className="mdt-text-primary mdt-underline">
            Resend OTP
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Small size variant.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    length: 4,
    'aria-label': 'Small OTP input',
  },
};

/**
 * Medium size variant (default).
 */
export const Medium: Story = {
  args: {
    size: 'md',
    length: 6,
    'aria-label': 'Medium OTP input',
  },
};

/**
 * Large size variant.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    length: 6,
    'aria-label': 'Large OTP input',
  },
};

/**
 * Different sizes demonstration.
 */
export const Sizes: Story = {
  render: () => {
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-8">
        {/* Small */}
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <div className="mdt-text-sm mdt-font-medium">Small (4-digit PIN)</div>
          <OTPInput length={4} size="sm" value={otp1} onChange={setOtp1} />
        </div>

        {/* Medium (default) */}
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <div className="mdt-text-sm mdt-font-medium">Medium (6-digit OTP)</div>
          <OTPInput length={6} size="md" value={otp2} onChange={setOtp2} />
        </div>

        {/* Large */}
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <div className="mdt-text-sm mdt-font-medium">Large (6-digit OTP)</div>
          <OTPInput length={6} size="lg" value={otp3} onChange={setOtp3} />
        </div>
      </div>
    );
  },
};

/**
 * Paste functionality demonstration.
 */
export const PasteDemo: Story = {
  render: () => {
    const [otp, setOtp] = useState('');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ width: '400px' }}>
        <div className="mdt-text-center">
          <h3 className="mdt-text-lg mdt-font-semibold">Paste OTP</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Try pasting this code: <strong>987654</strong>
          </p>
        </div>

        <OTPInput value={otp} onChange={setOtp} />

        <div className="mdt-rounded-md mdt-bg-muted mdt-p-3 mdt-text-sm">
          <p className="mdt-font-medium">Features:</p>
          <ul className="mdt-mt-2 mdt-list-inside mdt-list-disc mdt-space-y-1 mdt-text-muted-foreground">
            <li>Paste complete OTP from clipboard</li>
            <li>Auto-fills all inputs at once</li>
            <li>Validates pasted content</li>
            <li>Focuses last filled input</li>
          </ul>
        </div>

        <p className="mdt-text-center mdt-text-sm mdt-text-muted-foreground">
          Current value: {otp || 'empty'}
        </p>
      </div>
    );
  },
};
