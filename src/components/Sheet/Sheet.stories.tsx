import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ArgTypes } from '@storybook/react-vite';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';
import { ButtonOld as Button } from '../ButtonOld';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { Icon } from '../Icon';
import type { SheetContentProps } from './Sheet.types';

// Extended argTypes to include SheetContent props for documentation
type SheetArgTypes = ArgTypes<React.ComponentProps<typeof Sheet> & SheetContentProps>;

const meta: Meta<typeof Sheet> & { argTypes: SheetArgTypes } = {
  title: 'New Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A panel — a drawer, in most vocabularies — that slides in from the edge of the',
          'screen, for a record you clicked,',
          'a set of filters, a form of stacked fields. Default width for left and right',
          'sheets is 75% on mobile, capped at 24rem above that.',
          '',
          '### Sheet or Dialog?',
          '',
          'They share an overlay, a focus trap, escape handling and an animation, so the',
          'mechanics will not tell you which to reach for. One question does:',
          '',
          '> **Does the task need the thing behind it?**',
          '',
          '**Yes — a Sheet.** You came from a list, a record, a canvas, and you are going',
          'back to it. **No — a `Dialog`.** It interrupts, and the background is dimmed',
          'because it has stopped mattering.',
          '',
          '| | |',
          '| --- | --- |',
          '| Inspect a record clicked in a list | **Sheet** |',
          '| Filters | **Sheet** |',
          '| A long form of stacked fields | **Sheet** |',
          '| Anything opened dozens of times a session | **Sheet** — the gentler interruption |',
          '| Destructive confirm | `Dialog`, always |',
          '| Blocking — session expired, forced upgrade | `Dialog` |',
          '| Compare options side by side | `Dialog` |',
          '| Settings, or picking from a grid | `Dialog`, full size |',
          '| Wizard or onboarding sequence | `Dialog` |',
          '',
          '**Shape follows content**, and it settles more cases than any principle. A Sheet',
          'is tall and narrow, so it suits a vertical stack — fields, properties, an',
          'activity feed. Three pricing tiers physically do not fit in one.',
          '',
          '**Never:** a destructive confirm or a wizard in a Sheet; a Sheet stacked on a',
          'Sheet. A Dialog over a Sheet is the one legitimate stack — a confirmation',
          'interrupting a panel.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    // === Sheet Root Props ===
    open: {
      control: 'boolean',
      description: 'Controlled open state of the sheet',
      table: {
        type: { summary: 'boolean' },
        category: 'Sheet',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The open state when initially rendered (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Sheet',
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Event handler called when the open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Sheet',
      },
    },
    modal: {
      control: 'boolean',
      description:
        'Whether the sheet should be modal. When true, interaction with outside elements is disabled and only sheet content is visible to screen readers.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Sheet',
      },
    },
    // === SheetContent Props ===
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The side of the screen from which the sheet slides in',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'right' },
        category: 'SheetContent',
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to display the close button (X) in the top-right corner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'SheetContent',
      },
    },
    className: {
      control: 'text',
      description:
        'Additional CSS classes for SheetContent. Use to customize width (e.g., "mdt-w-[400px]", "sm:mdt-max-w-lg", "mdt-w-1/2")',
      table: {
        type: { summary: 'string' },
        category: 'SheetContent',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sheet that slides in from the right side.
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-grid mdt-gap-4 mdt-py-4">
          <Input id="name" label="Name" defaultValue="John Doe" />
          <Input id="username" label="Username" defaultValue="@johndoe" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet with a form for editing settings.
 */
export const WithForm: Story = {
  render: () => {
    const languageOptions = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
    ];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Settings</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Account Settings</SheetTitle>
            <SheetDescription>Update your account preferences and settings.</SheetDescription>
          </SheetHeader>
          <form className="mdt-mt-6 mdt-space-y-6">
            <Input id="email" label="Email" type="email" defaultValue="john@example.com" />
            <Select
              label="Language"
              options={languageOptions}
              defaultValue="en"
              placeholder="Select language"
            />
            <div className="mdt-flex mdt-items-center mdt-gap-2">
              <Checkbox id="notifications" />
              <label htmlFor="notifications" className="mdt-text-sm mdt-text-foreground">
                Enable email notifications
              </label>
            </div>
          </form>
          <SheetFooter className="mdt-mt-6">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save Settings</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Sheet without the close button.
 */
export const WithoutCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Custom Close</SheetTitle>
          <SheetDescription>
            This sheet has the default close button hidden. Use the button below to close.
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-mt-6 mdt-flex mdt-justify-center">
          <SheetClose asChild>
            <Button>Close Sheet</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Filter panel sheet for data tables or lists.
 */
export const FilterPanel: Story = {
  render: () => {
    const categoryOptions = [
      { value: 'all', label: 'All Categories' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'books', label: 'Books' },
    ];

    const statusFilters = ['Active', 'Pending', 'Completed', 'Cancelled'];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="filter" size="sm" />}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Refine your search results.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-6 mdt-space-y-6">
            <div className="mdt-space-y-3">
              <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Status</h4>
              <div className="mdt-space-y-2">
                {statusFilters.map((status) => (
                  <div key={status} className="mdt-flex mdt-items-center mdt-gap-2">
                    <Checkbox id={`status-${status}`} />
                    <label
                      htmlFor={`status-${status}`}
                      className="mdt-cursor-pointer mdt-text-sm mdt-text-foreground"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Select
              label="Category"
              options={categoryOptions}
              defaultValue="all"
              placeholder="Select category"
            />
            <div className="mdt-space-y-2">
              <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Price Range</h4>
              <div className="mdt-flex mdt-gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
          </div>
          <SheetFooter className="mdt-mt-6">
            <SheetClose asChild>
              <Button variant="outline">Reset</Button>
            </SheetClose>
            <Button>Apply Filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Custom width examples for left/right sheets.
 * Pass any width class via className to override the default width.
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Narrow (300px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[300px]">
          <SheetHeader>
            <SheetTitle>Narrow Sheet</SheetTitle>
            <SheetDescription>This sheet has a fixed width of 300px.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Medium (480px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[480px]">
          <SheetHeader>
            <SheetTitle>Medium Sheet</SheetTitle>
            <SheetDescription>This sheet has a fixed width of 480px.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-space-y-4">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="Enter your email" />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Wide (640px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[640px]">
          <SheetHeader>
            <SheetTitle>Wide Sheet</SheetTitle>
            <SheetDescription>
              This sheet has a fixed width of 640px. Great for detailed forms or content.
            </SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-grid mdt-grid-cols-2 mdt-gap-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Half Screen (50%)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-1/2">
          <SheetHeader>
            <SheetTitle>Half Screen Sheet</SheetTitle>
            <SheetDescription>This sheet takes up 50% of the screen width.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Full Screen</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-full">
          <SheetHeader>
            <SheetTitle>Full Screen Sheet</SheetTitle>
            <SheetDescription>
              This sheet takes up the entire screen width. Useful for complex workflows.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
