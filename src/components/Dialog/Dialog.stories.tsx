import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

/**
 * The Dialog component displays content in a modal overlay.
 * Built on Radix UI Dialog for accessibility and keyboard navigation.
 */
const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'An accessible modal dialog built with Radix UI primitives.',
          '',
          '### Dialog or Sheet?',
          '',
          'They share an overlay, a focus trap, escape handling and an animation, so the',
          'mechanics will not tell you which to reach for. One question does:',
          '',
          '> **Does the task need the thing behind it?**',
          '',
          '**No — a Dialog.** It interrupts, and the background is dimmed because it has',
          'stopped mattering. **Yes — a `Sheet`.** It attends to something on screen, which',
          'stays legible because you are going back to it.',
          '',
          '| | |',
          '| --- | --- |',
          '| Destructive confirm | **Dialog**, always |',
          '| Blocking — session expired, forced upgrade | **Dialog** |',
          '| Compare options side by side | **Dialog** |',
          '| Settings, or picking from a grid | **Dialog**, full size |',
          '| Wizard or onboarding sequence | **Dialog** |',
          '| Inspect a record clicked in a list | `Sheet` |',
          '| Filters | `Sheet` |',
          '| A long form of stacked fields | `Sheet` |',
          '',
          '**Shape follows content**, and it settles more cases than any principle. A Dialog',
          'is wide, so it suits horizontal composition — three plan cards, a grid, a form',
          'beside a preview. A Sheet is tall and narrow. Three pricing tiers physically do',
          'not fit in a drawer.',
          '',
          '**Creating something new depends on where you came from.** From a list, a Sheet',
          'keeps the list visible. From a global "New" button there is no context to',
          "preserve, so a Dialog is right — Linear's new issue is a modal, Attio's new",
          'record is a drawer, and both are correct.',
          '',
          '**Never:** a destructive confirm or a wizard in a Sheet; a Sheet stacked on a',
          'Sheet. A Dialog over a Sheet is the one legitimate stack.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    // === Dialog Root Props ===
    open: {
      control: 'boolean',
      description: 'Controlled open state of the dialog',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Whether dialog is modal (traps focus)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic dialog with title, description, and content.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog. It provides additional context about the content.
          </DialogDescription>
        </DialogHeader>
        <div className="mdt-py-4">
          <p>Dialog content goes here. You can put any content inside.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with a form inside.
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:mdt-max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="mdt-grid mdt-gap-4 mdt-py-4">
          <Input label="Name" defaultValue="John Doe" />
          <Input label="Username" defaultValue="@johndoe" />
          <Input label="Email" type="email" defaultValue="john@example.com" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Confirmation dialog for destructive actions.
 */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mdt-gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Yes, delete my account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog without close button.
 */
export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>Please read and accept our terms to continue.</DialogDescription>
        </DialogHeader>
        <div className="mdt-max-h-[200px] mdt-overflow-y-auto mdt-py-4">
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Decline</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Accept</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Controlled dialog with external state management.
 */
export const Controlled: Story = {
  render: function ControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-text-sm mdt-text-muted-foreground">
          Dialog is: {open ? 'Open' : 'Closed'}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open Controlled Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>This dialog state is controlled externally.</DialogDescription>
            </DialogHeader>
            <div className="mdt-py-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close via state
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * Interactive story to test modal prop.
 * Toggle the `modal` control to see the difference between modal and non-modal behavior.
 *
 * - **modal=true**: Focus trapped, dark overlay, background blocked
 * - **modal=false**: Can Tab out, no overlay, background interactive
 */
export const InteractiveModal: Story = {
  args: {
    modal: true,
  },
  render: function InteractiveModalDialog(args) {
    return (
      <div className="mdt-space-y-4">
        <div className="mdt-rounded mdt-border mdt-p-4">
          <h3 className="mdt-font-semibold">Test Area</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This is background content. When modal=false, you can interact with these elements while
            the dialog is open.
          </p>
          <div className="mdt-mt-2 mdt-space-x-2">
            <Button size="sm" variant="outline">
              Background Button 1
            </Button>
            <Button size="sm" variant="outline">
              Background Button 2
            </Button>
          </div>
        </div>

        <Dialog modal={args.modal ?? true}>
          <DialogTrigger asChild>
            <Button>Open Dialog (modal={String(args.modal)})</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog with modal={String(args.modal)}</DialogTitle>
              <DialogDescription>
                {args.modal
                  ? 'Modal is TRUE: Focus is trapped. Try pressing Tab - you cannot reach the background buttons. Click outside to close.'
                  : 'Modal is FALSE: Focus is not trapped. Try pressing Tab - you can reach the background buttons! Background is fully interactive.'}
              </DialogDescription>
            </DialogHeader>
            <div className="mdt-space-y-4 mdt-py-4">
              <p className="mdt-text-sm">
                {args.modal
                  ? '✓ Focus trapped inside dialog\n✓ Dark overlay blocks background\n✓ Esc key closes dialog\n✓ Click overlay to close'
                  : '✓ Can Tab to background elements\n✓ No dark overlay\n✓ Background remains interactive\n✓ Dialog floats above content'}
              </p>
              <Input label="Test Input" placeholder="Try tabbing from here..." />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="mdt-text-xs mdt-text-muted-foreground">
          💡 Tip: Toggle the &quot;modal&quot; control in the Controls panel to see the difference!
        </p>
      </div>
    );
  },
};

/**
 * Modal vs Non-Modal Dialog comparison.
 *
 * - **Modal (default)**: Traps focus, blocks background interaction, shows overlay
 * - **Non-Modal**: Allows background interaction, no focus trap, no dark overlay
 */
export const ModalComparison: Story = {
  render: function ModalComparisonDialog() {
    return (
      <div className="mdt-flex mdt-gap-4">
        {/* Modal Dialog */}
        <Dialog modal={true}>
          <DialogTrigger asChild>
            <Button>Open Modal Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modal Dialog (modal=true)</DialogTitle>
              <DialogDescription>
                This dialog traps focus. You cannot interact with the background or Tab out of this
                dialog. Notice the dark overlay blocking the page behind.
              </DialogDescription>
            </DialogHeader>
            <div className="mdt-py-4">
              <p className="mdt-text-sm">
                Try pressing Tab - focus stays within the dialog. Background is not clickable.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Non-Modal Dialog */}
        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button variant="secondary">Open Non-Modal Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Non-Modal Dialog (modal=false)</DialogTitle>
              <DialogDescription>
                This dialog does NOT trap focus. You can Tab out and interact with the background
                page. Notice there's no dark overlay - background remains visible and interactive.
              </DialogDescription>
            </DialogHeader>
            <div className="mdt-py-4">
              <p className="mdt-text-sm">
                Try pressing Tab - focus can move to the background. You can click outside this
                dialog.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * Dialog with scrollable content.
 */
export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Long Content</Button>
      </DialogTrigger>
      <DialogContent className="mdt-max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>Last updated: January 2024</DialogDescription>
        </DialogHeader>
        <div className="mdt-max-h-[400px] mdt-overflow-y-auto mdt-pr-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mdt-mb-4">
              <h4 className="mdt-font-semibold">Section {i + 1}</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>I understand</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Nested dialogs example.
 */
export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open First Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First Dialog</DialogTitle>
          <DialogDescription>This dialog contains another dialog.</DialogDescription>
        </DialogHeader>
        <div className="mdt-py-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open Nested Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nested Dialog</DialogTitle>
                <DialogDescription>This is a nested dialog.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Custom width dialog.
 */
export const CustomWidth: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Wide Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:mdt-max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Wide Dialog</DialogTitle>
          <DialogDescription>This dialog has a custom maximum width of 800px.</DialogDescription>
        </DialogHeader>
        <div className="mdt-grid mdt-grid-cols-2 mdt-gap-4 mdt-py-4">
          <div className="mdt-rounded mdt-border mdt-p-4">
            <h4 className="mdt-font-semibold">Column 1</h4>
            <p className="mdt-text-sm mdt-text-muted-foreground">Content for the first column.</p>
          </div>
          <div className="mdt-rounded mdt-border mdt-p-4">
            <h4 className="mdt-font-semibold">Column 2</h4>
            <p className="mdt-text-sm mdt-text-muted-foreground">Content for the second column.</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
