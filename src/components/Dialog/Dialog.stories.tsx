import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Callout } from '../Callout';
import { Tabs, TabsList, TabsTrigger } from '../Tabs';
import { Input } from '../Input';
import { DialogSteps } from './DialogSteps';
import type { DialogDensity } from './Dialog.types';
import { useSubmitShortcut } from './useSubmitShortcut';
import { useTypedConfirmation } from './useTypedConfirmation';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMedia,
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
 * `modal` decides whether the page behind is still there.
 *
 * **`modal` (the default): the page is out of reach.** Focus is trapped, Tab
 * cannot leave, and the overlay dims and blocks everything under it. That is
 * what a dialog is for — one thing at a time.
 *
 * **`modal={false}`: the page keeps working.** No overlay, no focus trap, Tab
 * walks straight out into the content behind. For a panel somebody consults
 * while carrying on — picking a value out of a list they can still scroll.
 *
 * Toggle it and try tabbing out of the dialog into the two buttons behind it.
 * There were two stories for this prop; one that lets you feel the difference
 * beats two that describe it.
 */
export const Modal: Story = {
  args: { modal: true },
  render: function ModalDemo(args) {
    const isModal = args.modal ?? true;

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
          <p className="mdt-text-xs mdt-text-muted-foreground">
            The page behind. Reachable by Tab only when `modal` is false.
          </p>
          <div className="mdt-flex mdt-gap-2">
            <Button size="sm" variant="outline">
              Behind one
            </Button>
            <Button size="sm" variant="outline">
              Behind two
            </Button>
          </div>
        </div>

        <Dialog modal={isModal}>
          <DialogTrigger asChild>
            <Button>Open, modal={String(isModal)}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isModal ? 'The page is out of reach' : 'The page still works'}
              </DialogTitle>
              <DialogDescription>
                {isModal
                  ? 'Focus is trapped and the overlay blocks what is behind. Tab cannot leave.'
                  : 'No overlay and no trap. Tab from the field below and you land on the buttons behind.'}
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Input label="Try tabbing from here" placeholder="Then press Tab twice…" />
            </DialogBody>
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
                shortcut={['mod', 'enter']}
                onClick={() => {
                  setSaved((n) => n + 1);
                  setOpen(false);
                }}
              >
                Finish setup
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
              <DialogTitle
                tag={
                  <Badge tone="warning" size="sm" shape="pill">
                    Guest
                  </Badge>
                }
              >
                Invite guest users
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
            <DialogBody>
              {step === 0 ? (
                <Input label="Invite by email" placeholder="You can add more than one email…" />
              ) : (
                <Input label="Expiry date and time" placeholder="16 Oct 2025, 12:30 PM" />
              )}
            </DialogBody>
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
                shortcut={['mod', 'enter']}
              >
                {step === 0 ? 'Next' : 'Send invite'}
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

/**
 * The footer's rule is a choice, on any dialog.
 *
 * `divider` is a prop on `DialogFooter` and nothing else depends on it — it
 * works at every size, every density, and with `scroll="page"` or `"body"`.
 *
 * **With the rule** — the default, and right for a form. A line above the
 * buttons says the reading is over and the deciding starts. The header
 * deliberately has no matching rule; that asymmetry is the house style.
 *
 * **Without it** — for a dialog that was never in two parts. An announcement
 * with one button, a confirmation of two sentences: there is no reading to
 * separate from the deciding, and a line drawn across it invents a seam.
 *
 * **They are not the same spacing minus a line.** Without a rule the
 * separation has to be done by space alone, so the buttons sit **24px** from
 * the reading rather than the 16 the gap alone would give. With a rule, 24 is
 * where the line sits and the buttons are 12 below it.
 */
export const FooterRule: Story = {
  render: function FooterRuleDemo() {
    const [open, setOpen] = useState<'rule' | 'none' | null>(null);
    const close = () => {
      setOpen(null);
    };

    return (
      <div className="mdt-flex mdt-gap-2">
        <Button
          onClick={() => {
            setOpen('rule');
          }}
        >
          With the rule
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpen('none');
          }}
        >
          Without
        </Button>

        <Dialog open={open === 'rule'} onOpenChange={close}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename this view</DialogTitle>
              <DialogDescription>Everyone who uses it will see the new name.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Input label="Name" defaultValue="Unassigned, this week" />
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button shortcut={['mod', 'enter']} onClick={close}>
                Rename
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={open === 'none'} onOpenChange={close}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your export is on its way</DialogTitle>
              <DialogDescription>
                We will email a link when it is ready. Large exports can take a few minutes.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter divider={false}>
              <Button shortcut={['enter']} onClick={close}>
                Got it
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * The Panel's slots — **one dialog each**, because that is how they are used.
 *
 * They were first shown all four at once and it was unreadable: a picture, a
 * back link, a counter and a row of tabs above one form is not a panel anybody
 * would design. Each button below opens a panel using the one slot it is about.
 *
 * - **Media** — `DialogMedia`, the one region with no gutter. A product shot
 *   inset by 16px reads as a picture somebody placed in a dialog; the same shot
 *   reaching both edges reads as the dialog's own. Its footer carries
 *   `divider={false}`: a dialog led by a picture is an announcement rather than
 *   a form, and a rule above its one button divides something that was never in
 *   two parts.
 * - **Tabs** — inside the header, not above the body. The header is the part
 *   that does not move, and tabs that scrolled away would leave you unable to
 *   switch back without scrolling up.
 * - **Back and a counter** — for one step of something longer. Back is **not**
 *   close: it goes back inside the dialog, close leaves. Two exits doing
 *   different things are drawn differently — an arrow on the left, a cross on
 *   the right.
 */
export const PanelSlots: Story = {
  render: function PanelSlotsDemo() {
    const [open, setOpen] = useState<'media' | 'tabs' | 'steps' | null>(null);
    const [tab, setTab] = useState('details');
    const close = () => {
      setOpen(null);
    };

    const rows = (word: string, n: number) =>
      Array.from({ length: n }, (_, index) => (
        <Input key={index} label={`${word} ${String(index + 1)}`} placeholder="…" />
      ));

    return (
      <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        <Button
          onClick={() => {
            setOpen('media');
          }}
        >
          Media
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpen('tabs');
          }}
        >
          Tabs
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpen('steps');
          }}
        >
          Back and counter
        </Button>

        <Dialog open={open === 'media'} onOpenChange={close}>
          <DialogContent scroll="body">
            <DialogMedia>
              <div className="mdt-flex mdt-h-36 mdt-items-center mdt-justify-center mdt-bg-muted">
                <span className="mdt-text-xs mdt-text-muted-foreground">A product shot</span>
              </div>
            </DialogMedia>
            <DialogHeader>
              <DialogTitle>Saved views are here</DialogTitle>
              <DialogDescription>
                Save a filter and a column layout together and give the pair a name. Anyone on your
                team can open it, and changing the view changes it for all of them — so a queue
                everybody works from stays one queue rather than five that drift apart.
              </DialogDescription>
            </DialogHeader>
            {/*
              No rule. A dialog led by a picture is an announcement rather than
              a form, and a line above its one button divides a thing that was
              never in two parts. `divider={false}` is what that is for.
            */}
            <DialogFooter divider={false}>
              <Button shortcut={['enter']} onClick={close}>
                Got it
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={open === 'tabs'} onOpenChange={close}>
          <DialogContent size="lg" scroll="body">
            <DialogHeader
              tabs={
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList variant="underline">
                    <TabsTrigger variant="underline" value="details">
                      Details
                    </TabsTrigger>
                    <TabsTrigger variant="underline" value="access">
                      Access
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            >
              <DialogTitle>Configure integration</DialogTitle>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-4">
              {rows(tab === 'details' ? 'Detail' : 'Permission', 8)}
            </DialogBody>
            <DialogFooter align="between">
              <Button variant="ghost" onClick={close}>
                Cancel
              </Button>
              <Button shortcut={['mod', 'enter']} onClick={close}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={open === 'steps'} onOpenChange={close}>
          <DialogContent scroll="body">
            <DialogHeader onBack={close} backLabel="All integrations" counter="2 of 5">
              <DialogTitle>Map the fields</DialogTitle>
              <DialogDescription>
                Match each column in the file to a field on the ticket.
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-4">{rows('Column', 6)}</DialogBody>
            <DialogFooter align="between">
              <Button variant="ghost" onClick={close}>
                Back
              </Button>
              <Button shortcut={['mod', 'enter']} onClick={close}>
                Next
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * The three densities, side by side.
 *
 * One number each - **compact 12 · comfortable 16 · spacious 24** - and every
 * other measurement in the dialog derived from it. The gutter every region
 * shares is that number; the space above the header is that number; the floor
 * beneath the buttons and the rule above them are that number minus 4, because
 * the footer already carries a line and a full gutter under it as well left the
 * actions floating away from the box.
 *
 * The scale is not evenly spaced. 12 → 16 is the difference between a control
 * panel and a form; 16 → 24 is the difference between a form and a page that
 * happens to be in a box. A step in between would be a choice nobody could make
 * from a screenshot.
 *
 * **Two things deliberately do not scale**: the gap between a title and its
 * description, and the 4px the steps add beneath themselves. Both are
 * relationships between two pieces of text rather than between text and a box.
 */
export const Density: Story = {
  render: function DensityDemo() {
    const [mode, setMode] = useState<DialogDensity | null>(null);

    return (
      <div className="mdt-flex mdt-gap-2">
        <Button
          onClick={() => {
            setMode('comfortable');
          }}
        >
          Comfortable
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setMode('compact');
          }}
        >
          Compact
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setMode('spacious');
          }}
        >
          Spacious
        </Button>

        <Dialog
          open={mode !== null}
          onOpenChange={() => {
            setMode(null);
          }}
        >
          <DialogContent size="lg" density={mode ?? 'comfortable'}>
            <DialogHeader>
              <DialogTitle
                tag={
                  <Badge tone="warning" size="sm" shape="pill">
                    Guest
                  </Badge>
                }
              >
                Invite guest users
              </DialogTitle>
              <DialogDescription>
                Guest users get temporary access to your organisation after accepting.
              </DialogDescription>
            </DialogHeader>

            <DialogSteps
              steps={[
                { key: 'details', label: 'Invite details' },
                { key: 'access', label: 'Access duration' },
              ]}
              current={0}
            />
            <DialogBody>
              <div className="mdt-flex mdt-flex-col mdt-gap-4">
                <Input label="Invite by email" placeholder="You can add more than one email…" />
                <Input label="Select a parent organisation" placeholder="MSP owner organisation" />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button shortcut={['mod', 'enter']}>Next</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
