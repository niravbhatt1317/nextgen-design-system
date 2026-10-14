import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner } from '../Banner';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Select } from '../Select';
import { SelectableCard, SelectableCardGroup } from '../SelectableCard';
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
  title: 'New Components/ConfirmDialog',
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

const PROFILES = [
  { value: 'helpdesk', label: 'Helpdesk Access' },
  { value: 'special', label: 'Special Access' },
  { value: 'vendor', label: 'Vendor Portal Access' },
];

/** One line of the holders' banner: a dot in the line's tone, then the sentence. */
const Consequence = ({
  danger = false,
  children,
}: {
  danger?: boolean;
  children: React.ReactNode;
}) => (
  <li className="mdt-flex mdt-items-start mdt-gap-2">
    <span
      aria-hidden
      className={`mdt-mt-1.5 mdt-size-1.5 mdt-shrink-0 mdt-rounded-full ${danger ? 'mdt-bg-destructive' : 'mdt-bg-neutral-90'}`}
    />
    <span>{children}</span>
  </li>
);

/**
 * Deleting something people hold: a banner says who is affected, three answer
 * cards say what happens to them, and the first card asks its follow-up in
 * place. The action unlocks once an answer is complete and "delete" is typed;
 * its words and colour follow the answer. The console's Delete access profile.
 */
export const DeleteWithReplacement: Story = {
  render: function DeleteWithReplacementStory() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('existing');
    const [target, setTarget] = useState('');
    const remove = mode === 'remove';
    const label = { existing: 'Delete & reassign', fresh: 'Delete & build replacement' }[mode];
    return (
      <>
        <Button
          variant="destructive"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete access profile
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete Security Operations Access"
          description="An access profile is an assignment - deleting one means deciding what happens to the people and teams who hold it."
          width="md"
          typedWord="delete"
          tone={remove ? 'destructive' : 'default'}
          confirmLabel={label ?? 'Delete access profile'}
          confirmDisabled={mode === 'existing' && target === ''}
          onConfirm={() => undefined}
        >
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <Banner
              tone="info"
              icon={<Icon name="tabler-info-circle" />}
              title="Held by 2 people and 1 team"
              description={
                <ul className="mdt-flex mdt-flex-col mdt-gap-2">
                  <Consequence danger>
                    <b className="mdt-text-destructive">Removed without a replacement,</b> every
                    holder loses what this profile opens, immediately - 4 roles in 6 organizations.
                  </Consequence>
                  <Consequence>
                    <b>Replaced,</b> every holder moves to the other profile and keeps their own end
                    date.
                  </Consequence>
                </ul>
              }
            />
            <div className="mdt-flex mdt-flex-col mdt-gap-2.5">
              <span
                id="holders-mode"
                className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90"
              >
                How should its holders be handled?
              </span>
              <SelectableCardGroup
                aria-labelledby="holders-mode"
                value={mode}
                onValueChange={setMode}
              >
                <SelectableCard
                  value="existing"
                  title="Replace with an existing access profile"
                  description="Every holder moves to the chosen profile with the end date they have today."
                >
                  {mode === 'existing' && (
                    <Select
                      aria-label="Replacement access profile"
                      placeholder="Select an access profile…"
                      options={PROFILES}
                      value={target}
                      onChange={(v) => {
                        setTarget(typeof v === 'string' ? v : '');
                      }}
                    />
                  )}
                </SelectableCard>
                <SelectableCard
                  value="fresh"
                  title="Replace with a new access profile"
                  description="Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it."
                />
                <SelectableCard
                  value="remove"
                  title="Remove without replacement"
                  description="Every holder loses this access. The record stays in the audit trail."
                />
              </SelectableCardGroup>
            </div>
          </div>
        </ConfirmDialog>
      </>
    );
  },
};

const DOMAIN = /^(?!-)[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63})+$/;
const REASONS = [
  'Access your platform using your own branded domain',
  'Provide a professional and trusted experience',
  'Maintain a consistent brand presence',
];

/**
 * A short form in a dialog: why, on the sunken panel with its ticked reasons;
 * the one field; and a tip. The action unlocks once the field holds a domain.
 * The console's Domain configuration.
 */
export const FormDialog: Story = {
  render: function FormDialogStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const domain = value.trim().toLowerCase();
    const valid = DOMAIN.test(domain);
    return (
      <>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          Use your own domain
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Domain configuration"
          confirmLabel="Add domain"
          confirmDisabled={!valid}
          onConfirm={() => undefined}
        >
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <section
              aria-label="About custom domains"
              className="mdt-flex mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-secondary mdt-p-4"
            >
              <p>
                Set up a custom domain where your platform will be directly accessible. Once
                connected, your platform will be available on the domain entered below.
              </p>
              <b className="mdt-text-foreground">Why use a custom domain</b>
              <ul className="mdt-flex mdt-flex-col mdt-gap-2">
                {REASONS.map((reason) => (
                  <li key={reason} className="mdt-flex mdt-items-center mdt-gap-2">
                    <span
                      aria-hidden
                      className="mdt-inline-flex mdt-size-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-azure-60 mdt-text-background"
                    >
                      <Icon name="check" size={10} strokeWidth={3} />
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </section>
            <Input
              label="Domain name"
              placeholder="Eg. support.yourcompany.com"
              startAdornment={<Icon name="globe" size={14} />}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              {...(domain && !valid
                ? { error: 'Enter a domain like support.yourcompany.com' }
                : {})}
            />
            <Banner
              tone="info"
              icon={<Icon name="bulb" />}
              title="Make sure you have access to your domain provider or DNS settings to complete the setup."
            />
          </div>
        </ConfirmDialog>
      </>
    );
  },
};
