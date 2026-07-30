import type { StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow } from './HoverCard';

/**
 * The HoverCard component displays rich content in a popup when hovering over a trigger element.
 * Built on Radix UI HoverCard for accessibility and smooth animations.
 */
const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible hover card component for displaying rich content on hover. Perfect for user profiles, previews, and contextual information.',
      },
    },
  },
  argTypes: {
    // === HoverCard Root Props ===
    defaultOpen: {
      control: 'boolean',
      description: 'The open state when initially rendered (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state of the hover card',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Event handler called when the open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    openDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'The duration from when the mouse enters the trigger until the hover card opens',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '700' },
      },
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description:
        'The duration from when the mouse leaves the trigger or content until the hover card closes',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },

    // === HoverCardTrigger Props ===
    asChild: {
      control: 'boolean',
      description:
        'Change the default rendered element for the one passed as a child, merging their props and behavior',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // === HoverCardContent Props ===
    className: {
      control: 'text',
      description:
        'Custom CSS classes for styling the hover card content (e.g., "mdt-w-96" for width, "mdt-max-w-sm" for max-width)',
      table: {
        type: { summary: 'string' },
      },
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against when open',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: "'bottom'" },
      },
    },
    sideOffset: {
      control: { type: 'number', min: -50, max: 50, step: 1 },
      description: 'The distance in pixels from the trigger',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: "'center'" },
      },
    },
    alignOffset: {
      control: { type: 'number', min: -50, max: 50, step: 1 },
      description: 'An offset in pixels from the "start" or "end" alignment options',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    avoidCollisions: {
      control: 'boolean',
      description:
        'When true, overrides the side and align preferences to prevent collisions with boundary edges',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    collisionBoundary: {
      control: false,
      description: 'The element used as the collision boundary. By default this is the viewport',
      table: {
        type: { summary: 'Element | null | (Element | null)[]' },
        defaultValue: { summary: '[]' },
      },
    },
    collisionPadding: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description:
        'The distance in pixels from the boundary edges where collision detection should occur',
      table: {
        type: { summary: 'number | Partial<Record<Side, number>>' },
        defaultValue: { summary: '0' },
      },
    },
    arrowPadding: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'The padding between the arrow and the edges of the content',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    sticky: {
      control: { type: 'select' },
      options: ['partial', 'always'],
      description:
        'The sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless',
      table: {
        type: { summary: "'partial' | 'always'" },
        defaultValue: { summary: "'partial'" },
      },
    },
    hideWhenDetached: {
      control: 'boolean',
      description: 'Whether to hide the content when the trigger becomes fully occluded',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // === HoverCardPortal Props ===
    forceMount: {
      control: 'boolean',
      description:
        'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries',
      table: {
        type: { summary: 'boolean' },
      },
    },
    container: {
      control: false,
      description: 'Specify a container element to portal the content into',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' },
      },
    },

    // === HoverCardArrow Props ===
    arrowWidth: {
      control: { type: 'number', min: 5, max: 30, step: 1 },
      description: 'The width of the arrow in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    arrowHeight: {
      control: { type: 'number', min: 3, max: 20, step: 1 },
      description: 'The height of the arrow in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic hover card with user profile information.
 * Hover over the username to see the profile card.
 */
export const Default: Story = {
  render: () => (
    <div className="mdt-p-8">
      <p className="mdt-text-sm">
        Hover over{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @nextjs
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="mdt-flex mdt-gap-4">
              <div className="mdt-flex mdt-h-12 mdt-w-12 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground">
                <span className="mdt-text-lg mdt-font-semibold">N</span>
              </div>
              <div className="mdt-space-y-1">
                <h4 className="mdt-text-sm mdt-font-semibold">@nextjs</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  The React Framework - created and maintained by @vercel.
                </p>
                <div className="mdt-flex mdt-items-center mdt-pt-2">
                  <span className="mdt-text-xs mdt-text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>{' '}
        to see their profile.
      </p>
    </div>
  ),
};

/**
 * Hover card with avatar image and social stats.
 * Hover over the username to see the full profile.
 */
export const WithAvatar: Story = {
  render: () => (
    <div className="mdt-p-8">
      <p className="mdt-text-sm">
        Check out{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @shadcn
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="mdt-w-80">
            <div className="mdt-flex mdt-gap-4">
              <div className="mdt-h-14 mdt-w-14 mdt-overflow-hidden mdt-rounded-full mdt-bg-muted">
                <div className="mdt-flex mdt-h-full mdt-w-full mdt-items-center mdt-justify-center mdt-bg-gradient-to-br mdt-from-purple-400 mdt-to-pink-600 mdt-text-white">
                  <span className="mdt-text-xl mdt-font-bold">S</span>
                </div>
              </div>
              <div className="mdt-flex-1 mdt-space-y-1">
                <h4 className="mdt-text-sm mdt-font-semibold">shadcn</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  Building UI components with Radix UI and Tailwind CSS.
                </p>
                <div className="mdt-flex mdt-gap-4 mdt-pt-2 mdt-text-xs mdt-text-muted-foreground">
                  <div>
                    <span className="mdt-font-semibold mdt-text-foreground">2.5k</span> followers
                  </div>
                  <div>
                    <span className="mdt-font-semibold mdt-text-foreground">312</span> following
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        's amazing work!
      </p>
    </div>
  ),
};

/**
 * Hover card with arrow pointer.
 * The arrow points to the trigger element for better visual connection.
 */
export const WithArrow: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-justify-center mdt-p-16">
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="mdt-inline-flex mdt-cursor-help mdt-items-center mdt-gap-1 mdt-rounded mdt-border mdt-border-border mdt-bg-secondary mdt-px-3 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-secondary/80">
            Hover for details
            <span className="mdt-text-xs">ⓘ</span>
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow />
          <div className="mdt-space-y-2">
            <h4 className="mdt-font-semibold">Feature Preview</h4>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              This hover card includes an arrow pointing to the trigger element for better visual
              connection.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Different side placements.
 */
export const Sides: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-16">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p className="mdt-text-sm">Content appears above the trigger</p>
        </HoverCardContent>
      </HoverCard>

      <div className="mdt-flex mdt-gap-16">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Left</Button>
          </HoverCardTrigger>
          <HoverCardContent side="left">
            <p className="mdt-text-sm">Content appears on the left</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Right</Button>
          </HoverCardTrigger>
          <HoverCardContent side="right">
            <p className="mdt-text-sm">Content appears on the right</p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom (default)</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          <p className="mdt-text-sm">Content appears below the trigger</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Different alignments.
 */
export const Alignments: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <p className="mdt-text-sm">Aligned to the start of the trigger</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align Center (default)</Button>
        </HoverCardTrigger>
        <HoverCardContent align="center">
          <p className="mdt-text-sm">Centered with the trigger</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align End</Button>
        </HoverCardTrigger>
        <HoverCardContent align="end">
          <p className="mdt-text-sm">Aligned to the end of the trigger</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Custom delays for opening and closing.
 */
export const CustomDelays: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Fast (100ms)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="mdt-text-sm">Opens and closes quickly</p>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            openDelay: 100ms, closeDelay: 100ms
          </p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={700} closeDelay={300}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Default (700ms/300ms)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="mdt-text-sm">Standard timing</p>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            openDelay: 700ms, closeDelay: 300ms
          </p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={1500} closeDelay={500}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Slow (1500ms/500ms)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="mdt-text-sm">Opens and closes slowly</p>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            openDelay: 1500ms, closeDelay: 500ms
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Repository information card.
 */
export const RepositoryInfo: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">react</Button>
      </HoverCardTrigger>
      <HoverCardContent className="mdt-w-80">
        <div className="mdt-space-y-3">
          <div className="mdt-flex mdt-items-start mdt-gap-2">
            <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-blue-500 mdt-text-white">
              <span className="mdt-text-lg mdt-font-bold">R</span>
            </div>
            <div className="mdt-flex-1">
              <h4 className="mdt-font-semibold">facebook/react</h4>
              <p className="mdt-text-xs mdt-text-muted-foreground">Public repository</p>
            </div>
          </div>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            A declarative, efficient, and flexible JavaScript library for building user interfaces.
          </p>
          <div className="mdt-flex mdt-gap-4 mdt-text-xs mdt-text-muted-foreground">
            <div className="mdt-flex mdt-items-center mdt-gap-1">
              <span className="mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-blue-500" />
              TypeScript
            </div>
            <div>⭐ 220k</div>
            <div>🔱 45k forks</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

/**
 * Multiple hover cards in a sentence.
 */
export const InlineText: Story = {
  render: () => (
    <div className="mdt-max-w-md mdt-text-sm">
      <p>
        The project was created by{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @john
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="mdt-flex mdt-gap-3">
              <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-green-500 mdt-text-white">
                J
              </div>
              <div>
                <h4 className="mdt-text-sm mdt-font-semibold">John Doe</h4>
                <p className="mdt-text-xs mdt-text-muted-foreground">Senior Developer</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>{' '}
        and{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @sarah
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="mdt-flex mdt-gap-3">
              <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-purple-500 mdt-text-white">
                S
              </div>
              <div>
                <h4 className="mdt-text-sm mdt-font-semibold">Sarah Smith</h4>
                <p className="mdt-text-xs mdt-text-muted-foreground">Lead Designer</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        . They have been collaborating since 2022.
      </p>
    </div>
  ),
};

/**
 * Custom styled content.
 */
export const CustomStyling: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Premium Feature</Button>
      </HoverCardTrigger>
      <HoverCardContent className="mdt-w-96 mdt-border-2 mdt-border-primary mdt-bg-gradient-to-br mdt-from-primary/5 mdt-to-transparent">
        <div className="mdt-space-y-3">
          <div className="mdt-inline-flex mdt-rounded-full mdt-bg-primary mdt-px-3 mdt-py-1 mdt-text-xs mdt-font-semibold mdt-text-primary-foreground">
            PRO
          </div>
          <h4 className="mdt-text-lg mdt-font-bold">Unlock Premium Features</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Get access to advanced analytics, priority support, and exclusive templates.
          </p>
          <Button className="mdt-w-full">Upgrade Now</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
