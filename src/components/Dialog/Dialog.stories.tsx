import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ButtonOld as Button } from '../ButtonOld';
import { Callout } from '../Callout';
import { Input } from '../Input';
import { useTypedConfirmation } from './useTypedConfirmation';
import {
  Dialog,
  DialogBody,
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
  title: 'New Components/Dialog',
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
        <DialogBody>
          <div className="mdt-py-4">
            <p>Dialog content goes here. You can put any content inside.</p>
          </div>
        </DialogBody>
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
            <DialogBody>
              <Input
                label="Name"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </DialogBody>
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
        {(
          [
            'sm',
            'md',
          ] /* the console's MODAL_WIDTHS: sm 448 and md 512; lg, xl and full have no console twin */ as const
        ).map((option) => (
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
                shortcut={['enter']}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * **Panel — the workhorse.** Seven of the twelve product screens this was read
 * from are this shape: a header that stays, a body that scrolls, a footer that
 * stays.
 *
 * `scroll="body"` is what makes it. Without it a long dialog grows past the
 * screen and the dimmed area behind it scrolls instead — which works, but puts
 * the primary action at the bottom of a long form, where somebody filling it in
 * has to scroll past everything to reach it. Here the action never moves.
 *
 * Scroll the body and watch the title and the buttons stay put.
 */
export const Panel: Story = {
  render: function PanelDemo() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add a field
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="lg" scroll="body">
            <DialogHeader>
              <DialogTitle>Add a field</DialogTitle>
              <DialogDescription>Fields appear on every ticket in this project.</DialogDescription>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-4">
              <Callout tone="info" size="sm">
                A field cannot be deleted once tickets have used it — it can only be hidden.
              </Callout>
              {Array.from({ length: 9 }, (_, index) => (
                <Input
                  key={index}
                  label={`Attribute ${String(index + 1)}`}
                  placeholder="Enough rows that it has to scroll…"
                />
              ))}
            </DialogBody>
            <DialogFooter align="between">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                shortcut={['mod', 'enter']}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Add field
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * **Prompt — one decision, and the two things that make a destructive one safe.**
 *
 * A `Callout` lists what is about to go. Not prose: a list is countable, and
 * *"3 members, 12 files, every API key"* is a different sentence from *"this
 * will delete your data"*.
 *
 * Then `useTypedConfirmation` makes you type the workspace's own name. **Its
 * name, not the word DELETE** — a name has to be read off the screen and copied
 * deliberately, where `DELETE` is the same five letters on every dialog anybody
 * has ever seen and gets typed from memory without looking at what it is about
 * to destroy.
 *
 * It is a speed bump, not a security control. Anybody determined will be past
 * it in two seconds, and that is fine: the job is to turn an automatic click
 * into a deliberate one.
 *
 * **No ⏎ chip and no `useSubmitShortcut`**, deliberately and for the same
 * reason — a keyboard path *is* muscle memory, and this dialog exists to
 * interrupt it.
 */
export const Prompt: Story = {
  render: function PromptDemo() {
    const [open, setOpen] = useState(false);
    const workspace = 'Acme Production';
    const confirm = useTypedConfirmation({ phrase: workspace });

    const close = () => {
      setOpen(false);
      confirm.reset();
    };

    return (
      <>
        <Button
          variant="destructive"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete workspace
        </Button>
        <Dialog open={open} onOpenChange={close}>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Delete {workspace}?</DialogTitle>
              <DialogDescription>This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-4">
              <Callout tone="danger" size="sm">
                Deleting it removes:
                <ul className="mdt-mt-1.5 mdt-list-disc mdt-space-y-0.5 mdt-pl-4">
                  <li>3 members, immediately</li>
                  <li>12 files, permanently</li>
                  <li>Every API key issued to this workspace</li>
                </ul>
              </Callout>
              <Input
                label={`Type ${workspace} to confirm`}
                value={confirm.value}
                onChange={confirm.onChange}
                placeholder={workspace}
                autoComplete="off"
              />
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button variant="destructive" disabled={!confirm.confirmed} onClick={close}>
                Delete workspace
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
