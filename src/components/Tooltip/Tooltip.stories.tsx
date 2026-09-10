import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { ContactChips, TagList } from '../Table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A small dark bubble that names or explains the thing under the pointer. It opens on hover and on keyboard focus, sits on any side of its trigger, turns away from the screen edge, and follows the page as it scrolls. One look, two themes, no tones.',
          "The merged console's bubble on the library's engine (7 September 2026): the console fill and text; the library's spacing, arrow, sides and delay handling. Two content pieces come from the console: `hint`, a quieter second line, and `items`, a list that scrolls past seven entries. Plain text wraps at 280px and reads centred.",
          'Dark mode comes from the theme toggle in the toolbar: the fill and text swap through the tokens, nothing else changes.',
        ].join('\n\n'),
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    instant: {
      control: 'boolean',
      description: 'No wait at all. For chips and counters that reveal a value.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    open: {
      control: 'boolean',
      description: 'Drive the open state yourself',
      table: { type: { summary: 'boolean' } },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Open when first rendered',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="mdt-flex mdt-min-h-[200px] mdt-items-center mdt-justify-center">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TEAMS = [
  'Platform',
  'Security',
  'Finance',
  'Design',
  'Web',
  'Support',
  'Data',
  'Sales',
  'Ops',
  'Product',
];

/** Opens 100ms after the pointer arrives, or at once on keyboard focus: Tab to the button. Neighbouring triggers open without the wait. Escape closes it. */
export const Default: Story = {
  args: { defaultOpen: false, instant: false },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a helpful tooltip</TooltipContent>
    </Tooltip>
  ),
};

/** The same bubble with the arrow off. Sits 4px from the trigger instead of 9. */
export const WithoutArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>Same bubble, arrow off</TooltipContent>
    </Tooltip>
  ),
};

/** Top by default. Any side on request; near a screen edge it flips to the opposite side by itself. */
export const Sides: Story = {
  render: () => (
    <div className="mdt-grid mdt-grid-cols-3 mdt-gap-4">
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <div />
    </div>
  ),
};

/** Alignment slides the bubble to the start or end of a wide trigger. */
export const Alignment: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Tooltip key={align}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="mdt-w-[280px]">
              align=&quot;{align}&quot;
            </Button>
          </TooltipTrigger>
          <TooltipContent align={align}>Aligned to the {align}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/** A quieter second line under the value: what happens if you click. The Table's contact chips carry it, open at once, and say "Copied!" after a click until the pointer leaves. */
export const WithHint: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-12">
      <ContactChips email="michael.smith@company.com" phone="+1 415 555 0100" />
      <Tooltip instant>
        <TooltipTrigger asChild>
          <Button variant="outline">Copy link</Button>
        </TooltipTrigger>
        <TooltipContent hint="Click to copy the link">company.com/invite/8f3k2</TooltipContent>
      </Tooltip>
    </div>
  ),
};

/** Plain text wraps at 280px and reads centred. Short copy stays on one line. */
export const LongCopy: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-12">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Scheduled suspension</Button>
        </TooltipTrigger>
        <TooltipContent>
          This account is scheduled for suspension on 14 October 2026 because the last owner left
          the organisation.
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Short</Button>
        </TooltipTrigger>
        <TooltipContent>Short copy stays on one line</TooltipContent>
      </Tooltip>
    </div>
  ),
};

/** The "+N" in a Teams or Roles cell lists the rest. Bullet lines 3px apart; past seven the list scrolls inside the bubble, and the pointer may travel into it. */
export const List: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-12">
      <TagList items={TEAMS.slice(0, 5)} />
      <TagList items={TEAMS} max={1} />
    </div>
  ),
};

/** Side by side: the default 100ms wait, and `instant`. */
export const Instant: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">100ms</Button>
        </TooltipTrigger>
        <TooltipContent>Opens after the wait</TooltipContent>
      </Tooltip>
      <Tooltip instant>
        <TooltipTrigger asChild>
          <Button variant="outline">Instant</Button>
        </TooltipTrigger>
        <TooltipContent>Opens at once</TooltipContent>
      </Tooltip>
    </div>
  ),
};

/** Drive it yourself: the button toggles the bubble, the pointer no longer does. */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(true);
    return (
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setOpen((o) => !o);
            }}
          >
            {open ? 'Close it' : 'Open it'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Held open by the page</TooltipContent>
      </Tooltip>
    );
  },
};
