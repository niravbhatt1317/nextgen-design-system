import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ButtonOld } from './ButtonOld';
import type { ButtonOldProps } from './ButtonOld.types';
import { Icon } from '../Icon';

/**
 * The ButtonOld component is used to trigger an action or event.
 * It supports multiple variants, sizes, and states for different use cases.
 */
const meta: Meta<typeof ButtonOld> = {
  title: 'Deprecated/Button Old',
  component: ButtonOld,
  tags: ['autodocs'],
  parameters: {
    status: {
      type: 'deprecated',
      since: '0.4.0',
      deprecation: {
        deprecatedSince: '0.4.0',
        removalIn: '1.0.0',
        replacement: 'Button',
        message:
          'Button is now the merged console button (10 September 2026): seven variants, three heights of 28, 32 and 36, one text size of 13/20, a 16 glyph at 1.5, gap 6, corner 8, and padding decided by what meets each edge. This earlier one keeps the wider surface — the success and AI families, the pill and circle shapes, elevation, uppercase, ripple, badges, shortcut chips and the built-in tooltip — and stays for anything that still needs them until the removal pull request.',
      },
    },
    layout: 'centered',
    docs: {
      description: {
        component:
          '## ⚠️ Deprecated — use `Button`. Button is now the merged console button (10 September 2026): seven variants, three heights, one text size. This earlier one keeps the wider surface — success and AI families, pill and circle shapes, elevation, uppercase, ripple, badges, shortcut chips, built-in tooltip — and stays for anything that still needs them. ' +
          'A versatile button component with multiple variants, sizes, and states.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    // === Core Props ===
    children: {
      control: 'text',
      description: 'ButtonOld content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    style: {
      control: 'object',
      description: 'Inline CSS styles',
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'link',
        'destructive',
        'destructiveSoft',
        'destructiveOutline',
        'destructiveGhost',
        'success',
        'successSoft',
        'successOutline',
        'successGhost',
        'ai',
      ],
      description:
        'Visual style variant. Destructive and success each run solid → soft → outline → ghost, loudest to quietest.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
      description: 'Size variant of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    className: {
      control: 'text',
      description: 'Add custom Tailwind classes here to test',
      table: {
        type: { summary: 'string' },
      },
    },

    // === High Priority Props ===
    shape: {
      control: 'select',
      options: ['square', 'rounded', 'pill', 'circle'],
      description: 'Corner style of the button',
      table: {
        defaultValue: { summary: 'rounded' },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Renders button as a square icon-only button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Custom text to display during loading state',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    active: {
      control: 'boolean',
      description: 'Active/selected state styling',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
      table: {
        type: { summary: 'string' },
      },
    },
    href: {
      control: 'text',
      description: 'When provided, renders as an anchor link',
      table: {
        type: { summary: 'string' },
      },
    },
    badge: {
      control: 'text',
      description: 'Badge indicator (number, text, or ReactNode)',
      table: {
        type: { summary: 'string | number | ReactNode' },
      },
    },

    // === Medium Priority Props ===
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Semantic color override (takes precedence over variant)',
      table: {
        type: { summary: 'ButtonOldColor' },
      },
    },
    elevation: {
      control: 'select',
      options: [0, 1, 2, 3],
      description: 'Shadow depth level',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    loadingPosition: {
      control: 'select',
      options: ['left', 'right', 'center'],
      description: 'Position of loading spinner',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    success: {
      control: 'boolean',
      description: 'Success state with checkmark icon',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    successIcon: {
      control: false,
      description: 'Custom success icon to display instead of default checkmark',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    successText: {
      control: 'text',
      description: 'Custom success text to display with success state',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state styling',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    tooltipContent: {
      control: 'text',
      description: 'Tooltip text on hover',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus event handler',
      table: {
        type: { summary: '(event: FocusEvent) => void' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur event handler',
      table: {
        type: { summary: '(event: FocusEvent) => void' },
      },
    },
    iconSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Icon size override',
      table: {
        type: { summary: 'IconSize' },
      },
    },
    badgePosition: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right'],
      description: 'Position of badge indicator',
      table: {
        defaultValue: { summary: 'top-right' },
      },
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Link target (only with href)',
      table: {
        type: { summary: 'string' },
      },
    },

    // === Low Priority Props ===
    uppercase: {
      control: 'boolean',
      description: 'Transform text to uppercase',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    preventDefaultOnClick: {
      control: 'boolean',
      description: 'Prevent default click behavior',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconClassName: {
      control: 'text',
      description: 'Custom classes for icon wrapper',
      table: {
        type: { summary: 'string' },
      },
    },
    iconSpacing: {
      control: 'select',
      options: ['compact', 'normal', 'relaxed'],
      description: 'Gap spacing between icon and text',
      table: {
        defaultValue: { summary: 'normal' },
      },
    },
    rotateIcon: {
      control: 'boolean',
      description: 'Rotate icon 180 degrees',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ripple: {
      control: 'boolean',
      description: 'Material-style ripple effect on click',
      table: {
        defaultValue: { summary: 'false' },
      },
    },

    // === Icon Props ===
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side',
      table: {
        type: { summary: 'ReactNode' },
      },
    },

    // === State Props ===
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables the button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Merge props into child element (Radix Slot)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },

    // === Event Handlers ===
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    children: 'ButtonOld',
  },
};

export default meta;
type Story = StoryObj<ButtonOldProps>;

/**
 * The default button with primary variant.
 */
export const Default: Story = {
  args: {
    children: 'ButtonOld',
  },
};

/**
 * Primary variant - used for main call-to-action buttons.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary ButtonOld',
  },
};

/**
 * Secondary variant - used for less prominent actions.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary ButtonOld',
  },
};

/**
 * Outline variant - used for bordered buttons with transparent background.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline ButtonOld',
  },
};

/**
 * Ghost variant - minimal styling, appears on hover.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost ButtonOld',
  },
};

/**
 * Destructive variant - used for dangerous/irreversible actions.
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
};

/**
 * Success variant - used for confirming, approving, and completing.
 *
 * The positive counterpart to `destructive`, and the same weight: a solid fill
 * carrying white text. It is a different thing from the `success` *prop*, which
 * is the momentary "that worked" state any variant can enter.
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Approve request',
  },
};

/**
 * AI variant - for actions handed to the assistant rather than performed directly.
 *
 * Deliberately not a recoloured primary. Three of the four product systems built
 * an AI button independently and all three landed on the same treatment: a pale
 * purple ground, deep purple text, a faint purple edge and a sparkle on the left.
 * The sparkle comes with the variant - pass `leftIcon` and yours wins.
 */
export const AskAI: Story = {
  args: {
    variant: 'ai',
    children: 'Ask AI',
  },
};

/**
 * Link variant - appears as a text link.
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link ButtonOld',
  },
};

/**
 * Different size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-4">
      <ButtonOld size="xs">Extra Small</ButtonOld>
      <ButtonOld size="sm">Small</ButtonOld>
      <ButtonOld size="md">Medium</ButtonOld>
      <ButtonOld size="lg">Large</ButtonOld>
      <ButtonOld size="xl">Extra Large</ButtonOld>
    </div>
  ),
};

/**
 * Icon-only button.
 */
export const IconButton: Story = {
  args: {
    size: 'icon',
    children: <Icon name="plus" size="sm" aria-hidden />,
    'aria-label': 'Add item',
  },
};

/**
 * ButtonOld with left icon.
 */
export const WithLeftIcon: Story = {
  args: {
    children: 'Add Item',
    leftIcon: <Icon name="plus" size="sm" aria-hidden />,
  },
};

/**
 * ButtonOld with right icon.
 */
export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    rightIcon: <Icon name="arrow-right" size="sm" aria-hidden />,
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled ButtonOld',
  },
};

/**
 * Loading state with spinner.
 */
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

/**
 * Full width button.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width ButtonOld',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

/** Small caption above each row in the grouped stories below. */
const Row = ({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-2">
    <span className="mdt-text-xs mdt-font-medium mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
      {label}
    </span>
    <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">{children}</div>
  </div>
);

/**
 * All variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Neutral">
        <ButtonOld variant="primary">Primary</ButtonOld>
        <ButtonOld variant="secondary">Secondary</ButtonOld>
        <ButtonOld variant="outline">Outline</ButtonOld>
        <ButtonOld variant="ghost">Ghost</ButtonOld>
        <ButtonOld variant="link">Link</ButtonOld>
      </Row>
      <Row label="Destructive — solid to quiet">
        <ButtonOld variant="destructive">Destructive</ButtonOld>
        <ButtonOld variant="destructiveSoft">Soft</ButtonOld>
        <ButtonOld variant="destructiveOutline">Outline</ButtonOld>
        <ButtonOld variant="destructiveGhost">Ghost</ButtonOld>
      </Row>
      <Row label="Success — solid to quiet">
        <ButtonOld variant="success">Success</ButtonOld>
        <ButtonOld variant="successSoft">Soft</ButtonOld>
        <ButtonOld variant="successOutline">Outline</ButtonOld>
        <ButtonOld variant="successGhost">Ghost</ButtonOld>
      </Row>
      <Row label="AI">
        <ButtonOld variant="ai">Ask AI</ButtonOld>
      </Row>
      <Row label="Disabled">
        <ButtonOld variant="primary" disabled>
          Primary
        </ButtonOld>
        <ButtonOld variant="destructive" disabled>
          Destructive
        </ButtonOld>
        <ButtonOld variant="destructiveSoft" disabled>
          Soft
        </ButtonOld>
        <ButtonOld variant="success" disabled>
          Success
        </ButtonOld>
        <ButtonOld variant="successOutline" disabled>
          Outline
        </ButtonOld>
        <ButtonOld variant="ai" disabled>
          Ask AI
        </ButtonOld>
      </Row>
    </div>
  ),
};

/**
 * The success family at every volume, size and state.
 *
 * Success mirrors destructive step for step, so a positive action can be pitched
 * as loudly or as quietly as a dangerous one.
 */
export const SuccessFamily: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Volume">
        <ButtonOld variant="success">Approve</ButtonOld>
        <ButtonOld variant="successSoft">Approve</ButtonOld>
        <ButtonOld variant="successOutline">Approve</ButtonOld>
        <ButtonOld variant="successGhost">Approve</ButtonOld>
      </Row>
      <Row label="Sizes">
        <ButtonOld variant="success" size="xs">
          xs
        </ButtonOld>
        <ButtonOld variant="success" size="sm">
          sm
        </ButtonOld>
        <ButtonOld variant="success" size="md">
          md
        </ButtonOld>
        <ButtonOld variant="success" size="lg">
          lg
        </ButtonOld>
        <ButtonOld variant="success" size="xl">
          xl
        </ButtonOld>
        {/* iconOnly hides children - the glyph has to arrive as leftIcon */}
        <ButtonOld
          variant="success"
          iconOnly
          ariaLabel="Approve"
          leftIcon={<Icon name="check" size="sm" />}
        >
          Approve
        </ButtonOld>
      </Row>
      <Row label="States">
        <ButtonOld variant="success">Approve</ButtonOld>
        <ButtonOld variant="success" disabled>
          Approve
        </ButtonOld>
        <ButtonOld variant="success" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="success" success successText="Approved">
          Approve
        </ButtonOld>
      </Row>
      <Row label="Icons and shapes">
        <ButtonOld variant="success" leftIcon={<Icon name="check" size="sm" />}>
          Approve
        </ButtonOld>
        <ButtonOld variant="success" rightIcon={<Icon name="arrow-right" size="sm" />}>
          Approve
        </ButtonOld>
        <ButtonOld variant="success" shape="pill">
          Approve
        </ButtonOld>
        <ButtonOld variant="success" shape="square">
          Approve
        </ButtonOld>
      </Row>
    </div>
  ),
};

/**
 * The destructive family, now matching success step for step.
 *
 * The quieter three are new — destructive used to be solid-only, which meant a
 * "Remove domain" link in a table had no correct treatment.
 */
export const DestructiveFamily: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Volume">
        <ButtonOld variant="destructive">Delete</ButtonOld>
        <ButtonOld variant="destructiveSoft">Delete</ButtonOld>
        <ButtonOld variant="destructiveOutline">Delete</ButtonOld>
        <ButtonOld variant="destructiveGhost">Delete</ButtonOld>
      </Row>
      <Row label="Sizes">
        <ButtonOld variant="destructive" size="xs">
          xs
        </ButtonOld>
        <ButtonOld variant="destructive" size="sm">
          sm
        </ButtonOld>
        <ButtonOld variant="destructive" size="md">
          md
        </ButtonOld>
        <ButtonOld variant="destructive" size="lg">
          lg
        </ButtonOld>
        <ButtonOld variant="destructive" size="xl">
          xl
        </ButtonOld>
        {/* iconOnly hides children - the glyph has to arrive as leftIcon */}
        <ButtonOld
          variant="destructive"
          iconOnly
          ariaLabel="Delete"
          leftIcon={<Icon name="trash" size="sm" />}
        >
          Delete
        </ButtonOld>
      </Row>
      <Row label="States">
        <ButtonOld variant="destructive">Delete</ButtonOld>
        <ButtonOld variant="destructive" disabled>
          Delete
        </ButtonOld>
        <ButtonOld variant="destructive" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
      </Row>
    </div>
  ),
};

/**
 * The AI button.
 *
 * The sparkle arrives with the variant. Its loading state matters more than most
 * — an AI action is the one users expect to take a moment.
 */
export const AiFamily: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Sizes">
        <ButtonOld variant="ai" size="xs">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="sm">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="md">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="lg">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="xl">
          Ask AI
        </ButtonOld>
      </Row>
      <Row label="States">
        <ButtonOld variant="ai">Ask AI</ButtonOld>
        <ButtonOld variant="ai" disabled>
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" loading loadingText="Thinking…">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" success successText="Done">
          Ask AI
        </ButtonOld>
      </Row>
      <Row label="Shapes and your own icon">
        <ButtonOld variant="ai" shape="pill">
          Ask AI
        </ButtonOld>
        {/* An ai button supplies its own sparkle, so iconOnly needs nothing extra */}
        <ButtonOld variant="ai" iconOnly ariaLabel="Ask AI">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" leftIcon={<Icon name="wand" size="sm" />}>
          Summarise
        </ButtonOld>
      </Row>
    </div>
  ),
};

/**
 * Loading on every variant.
 *
 * The spinner takes its colour from the button's own text, so it works on a
 * solid fill and a pale one without any per-variant handling.
 */
export const LoadingEveryVariant: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Neutral">
        <ButtonOld variant="primary" loading loadingText="Saving…">
          Save
        </ButtonOld>
        <ButtonOld variant="secondary" loading loadingText="Saving…">
          Save
        </ButtonOld>
        <ButtonOld variant="outline" loading loadingText="Saving…">
          Save
        </ButtonOld>
        <ButtonOld variant="ghost" loading loadingText="Saving…">
          Save
        </ButtonOld>
      </Row>
      <Row label="Destructive">
        <ButtonOld variant="destructive" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
        <ButtonOld variant="destructiveSoft" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
        <ButtonOld variant="destructiveOutline" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
        <ButtonOld variant="destructiveGhost" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
      </Row>
      <Row label="Success">
        <ButtonOld variant="success" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="successSoft" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="successOutline" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="successGhost" loading loadingText="Approving…">
          Approve
        </ButtonOld>
      </Row>
      <Row label="AI">
        <ButtonOld variant="ai" loading loadingText="Thinking…">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" loading size="sm" loadingText="Thinking…">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" loading iconOnly ariaLabel="Thinking">
          Ask AI
        </ButtonOld>
      </Row>
    </div>
  ),
};

/**
 * Interaction test example - Click button and verify handler is called.
 * This story demonstrates how to test user interactions in Storybook.
 */
export const InteractionTest: Story = {
  args: {
    children: 'Click Me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }: { args: ButtonOldProps; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Test: ButtonOld is visible
    await expect(button).toBeInTheDocument();

    // Test: Click the button
    await userEvent.click(button);

    // Test: Verify onClick was called
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((args as any).onClick).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((args as any).onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Interaction test - Disabled button should not trigger onClick.
 */
export const InteractionTestDisabled: Story = {
  args: {
    children: 'Disabled ButtonOld',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement }: { args: ButtonOldProps; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });

    // Test: ButtonOld is disabled
    await expect(button).toBeDisabled();

    // Test: ButtonOld has disabled attribute
    await expect(button).toHaveAttribute('disabled');

    // Note: We don't attempt to click because disabled buttons have pointer-events: none
    // The disabled state itself ensures onClick cannot be triggered
  },
};

/**
 * Interaction test - Loading state should disable button.
 */
export const InteractionTestLoading: Story = {
  args: {
    children: 'Loading ButtonOld',
    loading: true,
    onClick: fn(),
  },
  play: async ({ canvasElement }: { args: ButtonOldProps; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test: ButtonOld is disabled when loading
    await expect(button).toBeDisabled();

    // Test: ButtonOld has aria-busy attribute
    await expect(button).toHaveAttribute('aria-busy', 'true');

    // Test: Loading spinner should be visible
    const spinner = button.querySelector('svg');
    await expect(spinner).toBeInTheDocument();

    // Note: We don't attempt to click because loading buttons have pointer-events: none
    // The disabled state ensures onClick cannot be triggered during loading
  },
};

/**
 * Example: Experimental Status
 * Shows how to mark a component as experimental with a badge
 */
export const ExperimentalExample: Story = {
  args: {
    children: 'Experimental ButtonOld',
  },
  parameters: {
    status: {
      type: 'experimental',
      since: '1.5.0',
      message: 'This API may change in future releases',
    },
  },
};

/**
 * Example: Beta Status
 * Shows how to mark a component as beta
 */
export const BetaExample: Story = {
  args: {
    children: 'Beta ButtonOld',
  },
  parameters: {
    status: {
      type: 'beta',
      since: '2.0.0-beta.1',
      message: 'Testing phase - stable API expected soon',
    },
  },
};

/**
 * Example: Deprecated Status
 * Shows how to mark a component as deprecated with full information
 */
export const DeprecatedExample: Story = {
  args: {
    children: 'Deprecated ButtonOld',
    variant: 'outline',
  },
  parameters: {
    status: {
      type: 'deprecated',
      deprecation: {
        deprecatedSince: '2.0.0',
        removalIn: '3.0.0',
        replacement: 'MotadataNewButton',
        migrationGuide: '?path=/docs/documentation-deprecations--docs',
        message: 'This variant has been replaced with a new implementation',
      },
    },
  },
};
