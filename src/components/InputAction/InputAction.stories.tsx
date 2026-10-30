import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { InputAction } from './InputAction';
import type { InputActionProps } from './InputAction.types';
import { PathBrowserDialog } from './PathBrowserDialog';
import type { TreeViewNode } from '../TreeView';

const meta: Meta<typeof InputAction> = {
  title: 'New Components/InputAction',
  component: InputAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'An action that rides **inside a field**, at its right end: a glyph and a word on a quiet ghost control, behind a hairline that runs from the field’s top border to its bottom one. It goes in the Input’s `endAdornment`; give the field a right padding as wide as the control so the text stops short of it (116 for Browse).',
          '',
          'The control is 24 tall in a 6-cornered well, 8 in a side, the glyph 14 and the word 13/500 in the reading ink, 6 apart; the lightest tint under the pointer, the primary ring on keyboard focus. Off, the word goes faint and the pointer shows not-allowed - a disabled button takes no hover, so `disabledReason` shows on the wrapper instead.',
          '',
          'With `copyText` it is a copy action: a click copies the text, then the control reads **Copied** with a check in the success ink for 1.5s (`copiedLabel`, `copiedDuration`) and goes back.',
          '',
          '**Ported from the console (Ronak, 2026-10-09)**: the credential form’s Reference path field with Browse, a control the console then reused for Replace on a stored secret and Copy in the secret-store dialog.',
          '',
          '**PathBrowserDialog** is what Browse opens: a centred 560 dialog - the store’s path-list endpoint and its sync line on a card with Sync now, then the store’s paths in a **TreeView** (folders open and shut, keys are picked), the selected path under it, and Cancel · Use this path. It opens on the path already in the field. A store with no path-list API gets a warning in place of the tree. Press Browse in the Default story to open it; it lives here until it moves into Dialog as a variant.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Browse', icon: 'folder', disabled: false },
  argTypes: {
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    disabledReason: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: ReactNode }) => (
  <div className="mdt-flex mdt-w-[42rem] mdt-max-w-full mdt-flex-col mdt-gap-4">{children}</div>
);

/* the console's HashiCorp Vault tree (credential-profiles data.js pathTreeFor) and the key a sync brings in */
const VAULT_TREE: TreeViewNode[] = [
  {
    label: 'secret/',
    kind: 'folder',
    children: [
      {
        label: 'data/',
        kind: 'folder',
        children: [
          {
            label: 'db/',
            kind: 'folder',
            children: [
              { label: 'postgres-prod-ro', kind: 'item', value: 'secret/data/db/postgres-prod-ro' },
              { label: 'mysql-billing', kind: 'item', value: 'secret/data/db/mysql-billing' },
            ],
          },
          {
            label: 'network/',
            kind: 'folder',
            children: [
              { label: 'cisco-ro', kind: 'item', value: 'secret/data/network/cisco-ro' },
              { label: 'snmp-v3-dc', kind: 'item', value: 'secret/data/network/snmp-v3-dc' },
            ],
          },
        ],
      },
    ],
  },
];
const FRESH_KEY: TreeViewNode = {
  label: '★ postgres-prod-rw  (just synced)',
  kind: 'item',
  value: 'secret/data/db/postgres-prod-rw',
  fresh: true,
};
const VAULT_SOURCE = {
  url: 'https://vault.acme.io/v1/secret/metadata?list=true',
  syncedLabel: 'Synced moments ago · auto every 10 min',
};
const SYNC_MS = 700;

/** The field and its browser together, as the credential form wires them: Browse opens the dialog, Use this path fills the field. */
function BrowseField({ action }: { action?: Partial<InputActionProps> }) {
  const [path, setPath] = useState('');
  const [open, setOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [synced, setSynced] = useState('moments ago');
  return (
    <Frame>
      <Input
        label="Reference path"
        required
        placeholder="secret/data/<path>"
        value={path}
        onChange={(e) => {
          setPath(e.target.value);
        }}
        style={{ paddingRight: 116 }}
        endAdornment={
          <InputAction
            icon="folder"
            aria-label="Browse the vault's paths"
            {...action}
            onClick={() => {
              setFresh(false);
              setSynced('moments ago');
              setOpen(true);
            }}
          >
            Browse
          </InputAction>
        }
      />
      <PathBrowserDialog
        open={open}
        onOpenChange={setOpen}
        subtitle="platform-vault-prod · HashiCorp Vault"
        source={{ ...VAULT_SOURCE, syncedLabel: `Synced ${synced} · auto every 10 min` }}
        syncing={syncing}
        onSync={() => {
          setSyncing(true);
          setTimeout(() => {
            setSyncing(false);
            setSynced('just now');
            setFresh(true);
          }, SYNC_MS);
        }}
        tree={fresh ? [FRESH_KEY, ...VAULT_TREE] : VAULT_TREE}
        value={path}
        onPick={(picked) => {
          setPath(picked);
          setOpen(false);
        }}
      />
    </Frame>
  );
}

/** A write-only secret on an edit form, as the console's StoredSecret draws it: the field held on the quiet ground - the
 * lock, the dots, "Stored · write-only" faint at its end - and Replace inside it. Replace only appears when a value is
 * stored; pressing it hands back an empty password field to type the new value in, with Undo where Replace sat. */
function StoredSecretField({ label }: { label: string }) {
  const [replacing, setReplacing] = useState(false);
  const [value, setValue] = useState('');
  const field = useRef<HTMLInputElement>(null);
  /* Replace hands the caret to the new field */
  useEffect(() => {
    if (replacing) field.current?.focus();
  }, [replacing]);
  if (replacing) {
    /* the way back (Ronak, 2026-10-26): Undo rides the field where Replace sat - the typed value is dropped and the
     * stored secret held again */
    return (
      <Input
        label={label}
        type="password"
        ref={field}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Enter a new value to replace the stored secret"
        className="mdt-font-mono"
        style={{ paddingRight: 100 }}
        endAdornment={
          <InputAction
            icon="undo-2"
            title="Keep the stored secret"
            aria-label="Undo - keep the stored secret"
            onClick={() => {
              setValue('');
              setReplacing(false);
            }}
          >
            Undo
          </InputAction>
        }
      />
    );
  }
  return (
    <Input
      label={label}
      readOnly
      tabIndex={-1}
      value="••••••••"
      aria-label="Stored secret, write-only"
      startAdornment={<Icon name="lock" size={14} aria-hidden />}
      className="mdt-cursor-default mdt-border-neutral-30 mdt-bg-neutral-10 mdt-font-mono mdt-tracking-[2px] mdt-text-faint hover:mdt-border-neutral-30 focus:mdt-border-neutral-30 focus:mdt-shadow-none"
      style={{ paddingRight: 236 }}
      endAdornment={
        <span className="mdt-inline-flex mdt-items-center">
          <span className="mdt-mr-2.5 mdt-whitespace-nowrap mdt-text-xs mdt-leading-none mdt-text-faint">
            Stored · write-only
          </span>
          <InputAction
            icon="pencil"
            aria-label={`Replace the stored ${label.toLowerCase()}`}
            onClick={() => {
              setValue('');
              setReplacing(true);
            }}
          >
            Replace
          </InputAction>
        </span>
      }
    />
  );
}

/** The credential form's Reference path field, as the console draws it. Press Browse: the vault's paths open in a centred dialog. */
export const Default: Story = {
  render: (args) => <BrowseField action={args} />,
};

/** Off: no store picked, or a store with no path-list API - the reason shows on hover. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <Input
        label="Reference path"
        required
        placeholder="secret/data/<path>"
        style={{ paddingRight: 116 }}
        endAdornment={
          <InputAction icon="folder" disabled disabledReason="No path-list API on this store">
            Browse
          </InputAction>
        }
      />
    </Frame>
  ),
};

/** The field in error: its border and message turn red; the control stays as it is. */
export const WithError: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <Input
        label="Reference path"
        required
        placeholder="secret/data/<path>"
        error="Reference path required."
        style={{ paddingRight: 116 }}
        endAdornment={
          <InputAction icon="folder" disabled disabledReason="Pick a store first">
            Browse
          </InputAction>
        }
      />
    </Frame>
  ),
};

/** Pressing Browse hands a path back to the field - here a stand-in for the console's path browser. */
export const PicksAValue: Story = {
  parameters: { controls: { disable: true } },
  render: function PicksAValue() {
    const [path, setPath] = useState('');
    return (
      <Frame>
        <Input
          label="Reference path"
          required
          placeholder="secret/data/<path>"
          value={path}
          onChange={(e) => {
            setPath(e.target.value);
          }}
          style={{ paddingRight: 116 }}
          endAdornment={
            <InputAction
              icon="folder"
              onClick={() => {
                setPath('secret/data/prod/windows/svc-discovery');
              }}
            >
              Browse
            </InputAction>
          }
        />
      </Frame>
    );
  },
};

/** The same control with other words: Browse; Replace on a stored secret (it shows only while a value is stored - press it to type a new one, and Undo to keep the stored one); Copy (it reads Copied with a green check for a moment); and a word with no glyph. */
export const Variations: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <Input
        label="Reference path"
        placeholder="secret/data/<path>"
        style={{ paddingRight: 116 }}
        endAdornment={<InputAction icon="folder">Browse</InputAction>}
      />
      <StoredSecretField label="Password" />
      <Input
        label="Callback URL"
        defaultValue="https://oneops.example.com/hooks/vault"
        style={{ paddingRight: 104 }}
        endAdornment={
          <InputAction icon="copy" copyText="https://oneops.example.com/hooks/vault">
            Copy
          </InputAction>
        }
      />
      <Input
        label="Certificate"
        placeholder="Upload a PEM file"
        style={{ paddingRight: 96 }}
        endAdornment={<InputAction>Upload</InputAction>}
      />
    </Frame>
  ),
};
