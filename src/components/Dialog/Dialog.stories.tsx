import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { CommandShortcut } from '../Command';
import { Input } from '../Input';
import { DialogSteps } from './DialogSteps';
import { DialogSubmitHint } from './DialogSubmitHint';
import { useSubmitShortcut } from './useSubmitShortcut';
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

/**
 * Closing a half-filled form should ask first.
 *
 * Type something, then try every way out — Escape, the X, a click on the
 * overlay. All three are one question, answered in one place: `onRequestClose`
 * returns `false` and a confirmation opens instead. Answering it in three
 * places is how they drift, and the one that gets forgotten is the overlay.
 *
 * The confirmation is a second `Dialog` **on top of the first** — supported
 * deliberately, because a guard that refuses to close has to be able to ask,
 * and the asking is a dialog. Both stay in the DOM; only the top one is
 * reachable by a screen reader, so nobody is offered a form they cannot get to.
 */
export const UnsavedChanges: Story = {
  render: function UnsavedChangesDemo() {
    const [open, setOpen] = useState(false);
    const [asking, setAsking] = useState(false);
    const [value, setValue] = useState('');
    const dirty = value.trim() !== '';

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Edit name
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            onRequestClose={() => {
              if (!dirty) return true;
              setAsking(true);
              return false;
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit name</DialogTitle>
              <DialogDescription>Type something, then try to close it.</DialogDescription>
            </DialogHeader>
            <Input
              label="Name"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Save
              </Button>
            </DialogFooter>

            <Dialog open={asking} onOpenChange={setAsking}>
              <DialogContent className="sm:mdt-max-w-[420px]">
                <DialogHeader>
                  <DialogTitle>Discard your changes?</DialogTitle>
                  <DialogDescription>What you have typed will not be kept.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAsking(false);
                    }}
                  >
                    Keep editing
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setAsking(false);
                      setValue('');
                      setOpen(false);
                    }}
                  >
                    Discard
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * While the work is in flight, nothing gets out.
 *
 * Press Save and for two seconds the button is busy, the close button is
 * disabled, and Escape and the overlay both refuse. Those two seconds are
 * exactly when an accidental Escape abandons a request that is already on its
 * way to the server.
 *
 * The close button is *disabled* rather than hidden — unlike a blocking dialog,
 * the way out still exists, it is just not available yet, and hiding it would
 * say something untrue.
 *
 * `Button` already had `loading`; nothing new was drawn for it.
 */
export const Pending: Story = {
  render: function PendingDemo() {
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const save = () => {
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Save changes
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent busy={busy}>
            <DialogHeader>
              <DialogTitle>Save changes</DialogTitle>
              <DialogDescription>This takes two seconds. Try to escape it.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                disabled={busy}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button loading={busy} onClick={save}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * No way out, because there genuinely is not one.
 *
 * A session that has expired, a plan that has lapsed. No close button, no
 * Escape, no click outside — and no X at all rather than an X that refuses to
 * work, which reads as broken rather than as deliberate.
 *
 * **Reach for this rarely.** A dialog with no way out is the most hostile thing
 * an interface can do, and every use of it is a promise that the content
 * contains the way forward. Here it is the button.
 */
export const Blocking: Story = {
  render: function BlockingDemo() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Expire my session
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent blocking>
            <DialogHeader>
              <DialogTitle>Your session has expired</DialogTitle>
              <DialogDescription>
                Sign in again to carry on. Escape, the overlay and the close button all do nothing —
                the only way on is the button.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Sign in again
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * ⌘↵ submits, and the button says so.
 *
 * Not plain Enter: a dialog is full of fields, and Enter belongs to the one you
 * are in — it moves between them, it opens a select, it adds a line to a
 * textarea. Requiring the modifier is what lets a form with a `<textarea>` have
 * a keyboard submit at all.
 *
 * The shortcut nobody knows about is worth nothing, so the keys are rendered
 * next to the label — as Conductor does on *Finish setup*.
 */
export const SubmitShortcut: Story = {
  render: function SubmitShortcutDemo() {
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState(0);

    useSubmitShortcut({
      onSubmit: () => {
        setSaved((n) => n + 1);
        setOpen(false);
      },
      enabled: open,
    });

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-3">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Set up
        </Button>
        <p className="mdt-text-sm mdt-text-muted-foreground">Submitted {saved} times</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set up Conductor</DialogTitle>
              <DialogDescription>
                Press ⌘↵ — or Ctrl↵ — instead of reaching for the mouse.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setSaved((n) => n + 1);
                  setOpen(false);
                }}
              >
                Finish setup
                <CommandShortcut>⌘↵</CommandShortcut>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * The house style, assembled.
 *
 * Two steps, the underline stepper, an asymmetric footer, and the ⏎ chip on the
 * primary. Everything here is the product's own language rather than a generic
 * modal: the header flows into the body with no rule, the footer is the only
 * part separated by one, and the bar under each step is the progress rather
 * than a connector between dots.
 *
 * **The bar is the distinctive choice.** A row of circles joined by a line says
 * "these are stations on a route". A row of underlined labels says "these are
 * the parts, and you have done this many" — which is what somebody halfway
 * through a form is actually asking.
 */
export const Stepped: Story = {
  render: function SteppedDemo() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    const steps = [
      { key: 'details', label: 'Invite details' },
      { key: 'access', label: 'Access duration' },
    ];

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
            setStep(0);
          }}
        >
          Invite guest users
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle className="mdt-flex mdt-items-center mdt-gap-2">
                Invite guest users
                <Badge tone="warning" size="sm" shape="pill">
                  Guest
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Guest users get temporary access to your organisation after accepting.
              </DialogDescription>
            </DialogHeader>

            <DialogSteps
              steps={steps}
              current={step}
              onStepSelect={(_key, index) => {
                setStep(index);
              }}
            />

            {step === 0 ? (
              <Input label="Invite by email" placeholder="You can add more than one email…" />
            ) : (
              <Input label="Expiry date and time" placeholder="16 Oct 2025, 12:30 PM" />
            )}

            <DialogFooter align={step === 0 ? 'end' : 'between'}>
              {step === 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(0);
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={() => {
                  if (step === 0) setStep(1);
                  else setOpen(false);
                }}
              >
                {step === 0 ? 'Next' : 'Send invite'}
                <DialogSubmitHint />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * Destructive, and deliberately without the shortcut.
 *
 * Red fill rather than the dark primary, Cancel on the left of it, and **no ⏎
 * chip** — the one place in the system where the keyboard path is withheld on
 * purpose. Nobody should be able to delete something by muscle memory, and a
 * keyboard route to an irreversible act is exactly that.
 *
 * The same rule applies to `useSubmitShortcut`: leave both off anything that
 * destroys.
 */
export const Destructive: Story = {
  render: function DestructiveDemo() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          variant="destructive"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete user
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Delete this user?</DialogTitle>
              <DialogDescription>
                This permanently removes their access, data and assigned permissions from the
                workspace.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Permanently delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * Five widths, because the product clusters at five.
 *
 * `sm` a single decision · `md` the default · `lg` a form · `xl` something with
 * two columns or a builder in it · `full` a surface with its own navigation.
 *
 * Before this there was one width, and the stories escaped it with
 * `sm:max-w-[425px]` and `sm:max-w-[800px]` — arbitrary values, which is always
 * the tell that a scale is missing.
 */
export const Sizes: Story = {
  render: function SizesDemo() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);

    return (
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((option) => (
          <Button
            key={option}
            variant="outline"
            onClick={() => {
              setSize(option);
            }}
          >
            {option}
          </Button>
        ))}
        <Dialog
          open={size !== null}
          onOpenChange={() => {
            setSize(null);
          }}
        >
          <DialogContent size={size ?? 'md'}>
            <DialogHeader>
              <DialogTitle>Size {size}</DialogTitle>
              <DialogDescription>
                Each step is named for the job rather than the pixels.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setSize(null);
                }}
              >
                Close
                <DialogSubmitHint />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
