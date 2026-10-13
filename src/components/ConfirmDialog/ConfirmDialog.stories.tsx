import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner } from '../Banner';
import { Button } from '../Button';
import { ConfirmDialog } from './ConfirmDialog';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

/**
 * A ready-made "are you sure" - ported from the console (Pranjal, 2026-10-13),
 * where it was hand-built seven times: the plain confirm in `compat/om/atoms.jsx`
 * and the typed "delete" confirms for users, teams, roles, service accounts,
 * attributes and access profiles.
 *
 * **What it carries:** a title, what will happen and what will be lost, Cancel as
 * the safe answer and one concrete action. The header is the console's - a 16 / 24
 * title over a hairline - at its two widths, 480 and 560.
 *
 * **A typed word** (`typedWord="delete"`) locks the action until the word is
 * typed. Pasting counts, case does not, a trailing space is forgiven. The dialog
 * opens with the cursor in the field; without one it opens on Cancel.
 *
 * **Busy:** return a promise from `onConfirm` and the action spins until it
 * settles, with Cancel, Escape, the ✕ and a press outside all held shut. It
 * closes when the promise resolves, and stays open on `false` or a rejection.
 *
 * **The bin** sits in front of a destructive action whose label starts with
 * Delete, Remove or Permanently delete (Pranjal, 2026-10-11 design picks).
 */
const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A ready-made confirm dialog: title, what will happen or be lost, an optional "type the word to confirm" ' +
          'field, Cancel as the safe default and the action busy while it runs. Ported from the console ' +
          '(Pranjal, 2026-10-13), built on `Dialog` and `useTypedConfirmation`.',
      },
    },
  },
  args: {
    title: 'Disable user',
    confirmLabel: 'Disable user',
    tone: 'default',
    width: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Opens from a button, the way every page holds it. */
function Opener({
  trigger,
  ...props
}: Omit<ConfirmDialogProps, 'open' | 'onOpenChange' | 'onConfirm'> & {
  trigger: string;
  onConfirm?: ConfirmDialogProps['onConfirm'];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={props.tone === 'destructive' ? 'destructive' : 'outline'}
        onClick={() => {
          setOpen(true);
        }}
      >
        {trigger}
      </Button>
      <ConfirmDialog onConfirm={() => undefined} {...props} open={open} onOpenChange={setOpen} />
    </>
  );
}

/** The plain confirm: a reversible step, so the primary button and no typed word. */
export const Default: Story = {
  render: (args) => (
    <Opener {...args} trigger="Disable user">
      Disabling <b>Emily Davis</b> will take effect across the organization. This is reversible -
      you can enable the user again later with access intact.
    </Opener>
  ),
};

/** Open from the start, for the docs page and visual checks. */
export const Open: Story = {
  args: { open: true },
  render: (args) => (
    <ConfirmDialog {...args} onConfirm={() => undefined}>
      Disabling <b>Emily Davis</b> will take effect across the organization. This is reversible -
      you can enable the user again later with access intact.
    </ConfirmDialog>
  ),
};

/**
 * Irreversible, so the red action, the bin, and "delete" typed to unlock it -
 * the console's Delete team.
 */
export const TypedDelete: Story = {
  render: () => (
    <Opener
      trigger="Delete team"
      title="Delete team"
      tone="destructive"
      typedWord="delete"
      confirmLabel="Delete team"
    >
      This will permanently delete <b>Platform engineering</b> and revoke the access it grants to 12
      members. This action cannot be undone.
    </Opener>
  ),
};

/**
 * What will be lost, spelled out in a Banner inside the body - the console's
 * Delete attribute.
 */
export const WithConsequences: Story = {
  render: () => (
    <Opener
      trigger="Delete attribute"
      title="Delete attribute"
      tone="destructive"
      typedWord="delete"
      confirmLabel="Permanently delete"
    >
      <div className="mdt-flex mdt-flex-col mdt-gap-3.5">
        <p>
          This will permanently delete <b>Employee ID</b> and purge its values. This action cannot
          be undone.
        </p>
        <Banner
          tone="danger"
          title="Values will be purged"
          description="Applies across all client organizations · 214 memberships currently hold a value."
        />
      </div>
    </Opener>
  ),
};

/**
 * A supporting line in the header and the wider 560 - the console's Delete role,
 * which also asks what happens to the holders.
 */
export const WithDescription: Story = {
  render: () => (
    <Opener
      trigger="Delete role"
      title="Delete Helpdesk agent"
      description="Roles are definitions - retiring one means deciding what happens to its holders."
      width="md"
      tone="destructive"
      typedWord="delete"
      confirmLabel="Delete role"
    >
      This role isn&apos;t referenced by any access profile - deleting it is permanent and affects
      no one.
    </Opener>
  ),
};

/** The action takes two seconds: it spins, and nothing closes the dialog meanwhile. */
export const Busy: Story = {
  render: () => (
    <Opener
      trigger="Delete service account"
      title="Delete service account"
      tone="destructive"
      confirmLabel="Delete account"
      onConfirm={() =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 2000);
        })
      }
    >
      This will permanently delete <b>ci-deployer</b> and revoke its 3 credentials.
    </Opener>
  ),
};

/** One button, for a notice - the console's "Can't disable the Tenant Owner". */
export const NoticeOnly: Story = {
  render: () => (
    <Opener
      trigger="Disable owner"
      title="Can't disable the Tenant Owner"
      hideCancel
      confirmLabel="Got it"
    >
      <b>Emily Davis</b> holds the Tenant Owner designation. Transfer it via{' '}
      <b>Tenant Management</b> first, then this action can proceed.
    </Opener>
  ),
};
