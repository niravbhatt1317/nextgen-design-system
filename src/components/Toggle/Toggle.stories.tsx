import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Toggle } from './Toggle';
import type { ToggleProps } from './Toggle.types';

/**
 * The Toggle component is a two-state button that can be toggled on or off.
 * Built on Radix UI Toggle primitive for accessibility and keyboard support.
 */
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A two-state button that can be toggled on or off. Perfect for formatting toolbars, settings, and filters.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant of the toggle',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the toggle',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    pressed: {
      control: 'boolean',
      description: 'The controlled pressed state of the toggle',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultPressed: {
      control: 'boolean',
      description: 'The initial pressed state in uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onPressedChange: {
      action: 'pressedChange',
      description: 'Event handler called when the pressed state changes',
      table: {
        type: { summary: '(pressed: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle with icon.
 */
export const Default: Story = {
  args: {
    'aria-label': 'Toggle bold',
    children: (
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
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
      </svg>
    ),
  },
};

/**
 * All size variants displayed together.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-4">
      <Toggle size="sm" aria-label="Toggle small">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
      </Toggle>
      <Toggle size="md" aria-label="Toggle medium">
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
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
      </Toggle>
      <Toggle size="lg" aria-label="Toggle large">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
      </Toggle>
    </div>
  ),
};

/**
 * All variants displayed together.
 */
export const Variants: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-4">
      <Toggle variant="default" aria-label="Toggle default">
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
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle outline">
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
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
      </Toggle>
    </div>
  ),
};

/**
 * Toggle with only an icon.
 */
export const WithIcon: Story = {
  args: {
    'aria-label': 'Toggle italic',
    children: (
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
        <line x1="19" x2="10" y1="4" y2="4" />
        <line x1="14" x2="5" y1="20" y2="20" />
        <line x1="15" x2="9" y1="4" y2="20" />
      </svg>
    ),
  },
};

/**
 * Toggle with only text.
 */
export const WithText: Story = {
  args: {
    children: 'Bold',
  },
};

/**
 * Toggle with both icon and text.
 */
export const WithIconAndText: Story = {
  args: {
    children: (
      <>
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
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
        Bold
      </>
    ),
  },
};

/**
 * Controlled toggle state example.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [pressed, setPressed] = useState(false);

      return (
        <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
          <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle controlled">
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
              <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
            </svg>
            Bold
          </Toggle>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            State: {pressed ? 'Pressed' : 'Not pressed'}
          </p>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Disabled toggle state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Toggle disabled',
    children: (
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
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
      </svg>
    ),
  },
};

/**
 * Formatting toolbar example with multiple toggles.
 */
export const FormattingToolbar: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-1 mdt-rounded-md mdt-border mdt-border-input mdt-p-1">
      <Toggle aria-label="Toggle bold">
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
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
      </Toggle>
      <Toggle aria-label="Toggle italic">
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
          <line x1="19" x2="10" y1="4" y2="4" />
          <line x1="14" x2="5" y1="20" y2="20" />
          <line x1="15" x2="9" y1="4" y2="20" />
        </svg>
      </Toggle>
      <Toggle aria-label="Toggle underline">
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
          <path d="M6 4v6a6 6 0 0 0 12 0V4" />
          <line x1="4" x2="20" y1="20" y2="20" />
        </svg>
      </Toggle>
      <Toggle aria-label="Toggle strikethrough">
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
          <path d="M16 4H9a3 3 0 0 0-2.83 4" />
          <path d="M14 12a4 4 0 0 1 0 8H6" />
          <line x1="4" x2="20" y1="12" y2="12" />
        </svg>
      </Toggle>
    </div>
  ),
};

/**
 * Outline variant toolbar example.
 */
export const OutlineToolbar: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-2">
      <Toggle variant="outline" aria-label="Toggle bold">
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
          <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
        </svg>
        Bold
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
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
          <line x1="19" x2="10" y1="4" y2="4" />
          <line x1="14" x2="5" y1="20" y2="20" />
          <line x1="15" x2="9" y1="4" y2="20" />
        </svg>
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
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
          <path d="M6 4v6a6 6 0 0 0 12 0V4" />
          <line x1="4" x2="20" y1="20" y2="20" />
        </svg>
        Underline
      </Toggle>
    </div>
  ),
};

/**
 * Interaction test - Click toggle and verify state changes.
 */
export const InteractionTest: Story = {
  args: {
    'aria-label': 'Toggle test',
    onPressedChange: fn(),
    children: (
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
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
      </svg>
    ),
  },
  play: async ({ args, canvasElement }: { args: ToggleProps; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle test/i });

    // Test: Toggle is visible
    await expect(toggle).toBeInTheDocument();

    // Test: Initial state should be off
    await expect(toggle).toHaveAttribute('data-state', 'off');

    // Test: Click the toggle
    await userEvent.click(toggle);

    // Test: Verify onPressedChange was called with true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((args as any).onPressedChange).toHaveBeenCalledWith(true);

    // Test: State should be on after click
    await expect(toggle).toHaveAttribute('data-state', 'on');

    // Test: Click again to toggle off
    await userEvent.click(toggle);

    // Test: Verify onPressedChange was called with false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((args as any).onPressedChange).toHaveBeenCalledWith(false);
  },
};

/**
 * Interaction test - Disabled toggle should not be clickable.
 */
export const InteractionTestDisabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled toggle test',
    onPressedChange: fn(),
    children: (
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
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
      </svg>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /disabled toggle test/i });

    // Test: Toggle is disabled
    await expect(toggle).toBeDisabled();

    // Test: Toggle has disabled attribute
    await expect(toggle).toHaveAttribute('disabled');
  },
};
