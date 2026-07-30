/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
} from './InputGroup';
import { Icon } from '../Icon';
import { useState } from 'react';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'InputGroup displays additional information or actions alongside inputs and textareas. Based on shadcn/ui input-group component.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'InputGroupInput with optional InputGroupAddon components',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic search input with icon addon at the end.
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <InputGroup>
        <InputGroupInput placeholder="Search..." aria-label="Search" />
        <InputGroupAddon>
          <Icon name="search" size="sm" aria-hidden />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Icon addons at different positions (inline-start and inline-end).
 */
export const IconAddons: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ width: '400px' }}>
      {/* Icon at start */}
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Icon name="search" size="sm" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." aria-label="Search" />
      </InputGroup>

      {/* Icon at end */}
      <InputGroup>
        <InputGroupInput placeholder="Email" type="email" aria-label="Email" />
        <InputGroupAddon align="inline-end">
          <Icon name="mail" size="sm" aria-hidden />
        </InputGroupAddon>
      </InputGroup>

      {/* Icons at both sides */}
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Icon name="user" size="sm" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput placeholder="Username" aria-label="Username" />
        <InputGroupAddon align="inline-end">
          <Icon name="at-sign" size="sm" aria-hidden />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Text addons for currency, URLs, email domains, etc.
 */
export const TextAddons: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ width: '400px' }}>
      {/* URL prefix */}
      <InputGroup>
        <InputGroupText align="inline-start">https://</InputGroupText>
        <InputGroupInput placeholder="example.com" aria-label="Website URL" />
      </InputGroup>

      {/* Email domain suffix */}
      <InputGroup>
        <InputGroupInput placeholder="username" aria-label="Email username" />
        <InputGroupText align="inline-end">@example.com</InputGroupText>
      </InputGroup>

      {/* Currency */}
      <InputGroup>
        <InputGroupText align="inline-start">$</InputGroupText>
        <InputGroupInput type="number" placeholder="0.00" aria-label="Price" />
        <InputGroupText align="inline-end">USD</InputGroupText>
      </InputGroup>
    </div>
  ),
};

/**
 * Button addons for actions like search, submit, copy, etc.
 */
export const ButtonAddons: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ width: '400px' }}>
      {/* Search button */}
      <InputGroup>
        <InputGroupInput placeholder="Search..." aria-label="Search" />
        <InputGroupButton align="inline-end" aria-label="Search">
          <Icon name="search" size="sm" aria-hidden />
        </InputGroupButton>
      </InputGroup>

      {/* Copy button */}
      <InputGroup>
        <InputGroupInput defaultValue="https://example.com/share" aria-label="Share link" />
        <InputGroupButton align="inline-end" aria-label="Copy">
          <Icon name="copy" size="sm" aria-hidden />
        </InputGroupButton>
      </InputGroup>

      {/* Submit button */}
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter email..." aria-label="Email" />
        <InputGroupButton align="inline-end" aria-label="Subscribe">
          <Icon name="send" size="sm" aria-hidden />
        </InputGroupButton>
      </InputGroup>
    </div>
  ),
};

/**
 * Password toggle example with button addon.
 */
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icon name="lock" size="sm" aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            aria-label="Password"
          />
          <InputGroupButton
            align="inline-end"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <Icon name="eye-off" size="sm" aria-hidden />
            ) : (
              <Icon name="eye" size="sm" aria-hidden />
            )}
          </InputGroupButton>
        </InputGroup>
      </div>
    );
  },
};

/**
 * Loading/spinner addon.
 */
export const LoadingState: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <InputGroup>
        <InputGroupInput placeholder="Searching..." disabled aria-label="Search" />
        <InputGroupAddon>
          <Icon name="loader-2" size="sm" className="mdt-animate-spin" aria-hidden />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Label addon - displays contextual information above the input.
 */
export const LabelAddon: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <span className="mdt-text-xs">Optional</span>
        </InputGroupAddon>
        <InputGroupInput placeholder="Middle name" aria-label="Middle name" />
      </InputGroup>
    </div>
  ),
};

/**
 * Helper text addon - displays additional information below the input.
 */
export const HelperAddon: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Email address" aria-label="Email" />
        <InputGroupAddon align="block-end">
          <span className="mdt-text-xs">We'll never share your email</span>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Textarea with addon for character count.
 */
export const TextareaAddon: Story = {
  render: () => {
    const [text, setText] = useState('');
    const maxLength = 200;

    return (
      <div style={{ width: '400px' }}>
        <InputGroup>
          <InputGroupTextarea
            placeholder="Enter your message..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            maxLength={maxLength}
            aria-label="Message"
          />
          <InputGroupAddon align="block-end">
            <span className="mdt-text-xs">
              {text.length}/{maxLength} characters
            </span>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
};

/**
 * Complex form patterns combining multiple features.
 */
export const FormPatterns: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ width: '400px' }}>
      {/* Username with icon */}
      <div>
        <label htmlFor="username" className="mdt-mb-1.5 mdt-block mdt-text-sm mdt-font-medium">
          Username
        </label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icon name="user" size="sm" aria-hidden />
          </InputGroupAddon>
          <InputGroupInput id="username" placeholder="johndoe" aria-label="Username" />
        </InputGroup>
      </div>

      {/* Email with domain */}
      <div>
        <label htmlFor="email" className="mdt-mb-1.5 mdt-block mdt-text-sm mdt-font-medium">
          Email
        </label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icon name="mail" size="sm" aria-hidden />
          </InputGroupAddon>
          <InputGroupInput id="email" type="email" placeholder="john" aria-label="Email" />
          <InputGroupText align="inline-end">@company.com</InputGroupText>
        </InputGroup>
      </div>

      {/* Amount with currency */}
      <div>
        <label htmlFor="amount" className="mdt-mb-1.5 mdt-block mdt-text-sm mdt-font-medium">
          Amount
        </label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icon name="dollar-sign" size="sm" aria-hidden />
          </InputGroupAddon>
          <InputGroupInput id="amount" type="number" placeholder="0.00" aria-label="Amount" />
        </InputGroup>
      </div>

      {/* Date picker */}
      <div>
        <label htmlFor="date" className="mdt-mb-1.5 mdt-block mdt-text-sm mdt-font-medium">
          Date
        </label>
        <InputGroup>
          <InputGroupInput id="date" type="date" aria-label="Date" />
          <InputGroupButton align="inline-end" aria-label="Pick date">
            <Icon name="calendar" size="sm" aria-hidden />
          </InputGroupButton>
        </InputGroup>
      </div>
    </div>
  ),
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ width: '400px' }}>
      <InputGroup>
        <InputGroupText align="inline-start">https://</InputGroupText>
        <InputGroupInput placeholder="example.com" disabled aria-label="Website URL" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Disabled input" disabled aria-label="Disabled input" />
        <InputGroupButton align="inline-end" disabled aria-label="Search">
          <Icon name="search" size="sm" aria-hidden />
        </InputGroupButton>
      </InputGroup>
    </div>
  ),
};
