import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
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
 * ## ⚠️ Deprecated Dialog stories
 *
 * Seven stories that were written one-prop-at-a-time before the Dialog work,
 * and are now either **redundant** or **actively wrong** — two of them teach
 * the exact thing the component was rebuilt to remove.
 *
 * They are kept, not deleted, for two reasons. A story that still renders
 * cannot silently rot: CI builds this file, so if one of these breaks, the
 * breakage is real and visible. And anyone who bookmarked one finds it here
 * with a pointer to what replaced it, rather than a blank page.
 *
 * **Do not copy anything from this file.** Each story says what to use instead.
 *
 * | Deprecated | Use instead |
 * | --- | --- |
 * | `WithForm` | `Default`, `Panel` |
 * | `Confirmation` | `Destructive` |
 * | `NoCloseButton` | `Blocking` |
 * | `Controlled` | any story written since |
 * | `ScrollableContent` | `Panel` |
 * | `NestedDialogs` | `UnsavedChanges` |
 * | `CustomWidth` | `Sizes` |
 */
const meta: Meta<typeof Dialog> = {
  title: 'Deprecated/Dialog stories',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ⚠️ Deprecated — use **Default, and Panel**.
 *
 * A form is just content. Nothing here is about forms - it is `Default` with inputs in it.
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
        <DialogBody>
          <div className="mdt-grid mdt-gap-4 mdt-py-4">
            <Input label="Name" defaultValue="John Doe" />
            <Input label="Username" defaultValue="@johndoe" />
            <Input label="Email" type="email" defaultValue="john@example.com" />
          </div>
        </DialogBody>
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
 * ⚠️ Deprecated — use **Destructive**.
 *
 * `Destructive` is the same dialog and says the thing that matters: why it has no ⏎ chip.
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
 * ⚠️ Deprecated — use **Blocking**.
 *
 * `Blocking` is what this prop is for, and it draws the distinction that matters - removing the X against disabling it. An X that refuses to work reads as broken rather than as deliberate.
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
        <DialogBody>
          <div className="mdt-max-h-[200px] mdt-overflow-y-auto mdt-py-4">
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </DialogBody>
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
 * ⚠️ Deprecated — use **every story written since**.
 *
 * Every dialog with behaviour worth showing is controlled. A story to demonstrate `open` and `onOpenChange` is a story to demonstrate that props exist.
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
            <DialogBody>
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
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * ⚠️ Deprecated — use **Panel**.
 *
 * This predates `scroll="body"` and shows the worse way: the whole dialog grows and the dimmed area scrolls, which puts the primary action at the bottom of a long form.
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
        <DialogBody>
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
        </DialogBody>
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
 * ⚠️ Deprecated — use **UnsavedChanges**.
 *
 * The same stacked dialogs, with a reason to be stacked. A guard that refuses to close has to be able to ask, and the asking is a dialog.
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
        <DialogBody>
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
        </DialogBody>
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
 * ⚠️ Deprecated — use **Sizes**.
 *
 * This uses `sm:max-w-[800px]` - the arbitrary value the five-step size scale was built to remove. It teaches the thing the scale replaced.
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
        <DialogBody>
          <div className="mdt-grid mdt-grid-cols-2 mdt-gap-4 mdt-py-4">
            <div className="mdt-rounded mdt-border mdt-p-4">
              <h4 className="mdt-font-semibold">Column 1</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">Content for the first column.</p>
            </div>
            <div className="mdt-rounded mdt-border mdt-p-4">
              <h4 className="mdt-font-semibold">Column 2</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Content for the second column.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
