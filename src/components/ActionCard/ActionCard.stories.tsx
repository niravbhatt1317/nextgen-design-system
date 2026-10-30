import { Fragment, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ActionCard } from './ActionCard';
import type { ActionCardProps } from './ActionCard.types';
import { Avatar, AvatarStack } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { Input } from '../Input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../Sheet';
import { MotadataSwitch } from '../Switch';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gap: 10, width: 760 }}>{children}</div>
);

interface MenuItem {
  label: string;
  icon: IconName;
  destructive?: boolean;
  /** Draw a separator above this item. */
  divided?: boolean;
  onSelect?: () => void;
}

/** A connection's actions, as the console's SSO page offers them. */
const CONNECTION_ITEMS: MenuItem[] = [
  { label: 'Edit setup', icon: 'pencil' },
  { label: 'Test connection', icon: 'zap' },
  { label: 'Remove connection…', icon: 'trash-2', destructive: true, divided: true },
];

/** The ⋯ menu: a ghost square that opens a DropdownMenu. */
const More = ({ name, items = CONNECTION_ITEMS }: { name: string; items?: MenuItem[] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        iconOnly
        variant="ghost"
        size="sm"
        ariaLabel={`More for ${name}`}
        leftIcon={<Icon name="more-horizontal" />}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {items.map((item) => (
        <Fragment key={item.label}>
          {item.divided && <DropdownMenuSeparator />}
          <DropdownMenuItem
            variant={item.destructive ? 'destructive' : 'default'}
            {...(item.onSelect ? { onSelect: item.onSelect } : {})}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </DropdownMenuItem>
        </Fragment>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const meta: Meta<typeof ActionCard> = {
  title: 'New Components/ActionCard',
  component: ActionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'One item on a settings page, as a row: a 36px tile, a title with its badge, a line under it, and controls on the right. ' +
          'Four faces: `default`, the dashed blue `add`, `edit` for an inline field, and `compact` - a quiet tinted card with a 14 glyph by a 12 title and its line, for inside a dialog or panel (the store endpoint with Sync now in the Browse popup). ' +
          'Give it `onClick` or `href` and the whole card is clickable - open a modal, a drawer, an inline edit, change the content, or go somewhere. ' +
          '`clickable={false}` holds it still. The switch, buttons and menu inside keep working on their own and never trigger the card.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'add', 'edit', 'compact'] },
    title: { control: 'text' },
    description: { control: 'text' },
    dim: { control: 'boolean', description: 'Fade the tile: retired or switched off' },
    clickable: {
      control: 'boolean',
      description: 'Respond to a click when onClick or href is set',
    },
    href: { control: 'text', description: 'Make the card a link' },
    icon: { control: false },
    badge: { control: false },
    actions: { control: false },
    menu: { control: false },
  },
  args: {
    icon: <Icon name="globe" />,
    title: 'Use your own domain',
    description: 'Serve the console and every portal from an address like support.yourcompany.com',
    onClick: fn(),
  },
};
export default meta;
type Story = StoryObj<ActionCardProps>;

/** Change anything in the controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Stack>
      <ActionCard {...args} />
    </Stack>
  ),
};

/** The `compact` face as the Browse popup draws it: the store's endpoint and its sync line, Sync now on the right. Press it. */
const SyncSource = () => {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState('moments ago');
  return (
    <ActionCard
      variant="compact"
      icon={<Icon name="globe" />}
      title="https://vault.acme.io/v1/secret/metadata?list=true"
      description={`Synced ${synced} · auto every 10 min`}
      actions={
        <Button
          variant="outline"
          leftIcon={<Icon name="refresh-cw" size={16} aria-hidden />}
          disabled={syncing}
          onClick={() => {
            setSyncing(true);
            setTimeout(() => {
              setSyncing(false);
              setSynced('just now');
            }, 700);
          }}
        >
          {syncing ? 'Syncing…' : 'Sync now'}
        </Button>
      }
    />
  );
};

/** Every face from the console: add cards, a domain, a setting, connections in each state, and the compact source card. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <ActionCard
        variant="add"
        icon={<Icon name="globe" />}
        title="Use your own domain"
        description="Serve the console and every portal from an address like support.yourcompany.com"
        onClick={fn()}
      />
      <ActionCard variant="add" icon={<Icon name="plus" />} title="Add domain" onClick={fn()} />
      <ActionCard
        icon={<Icon name="globe" />}
        title="northbridge.io"
        actions={<MotadataSwitch defaultChecked aria-label="Enable northbridge.io" />}
        menu={
          <More
            name="northbridge.io"
            items={[
              { label: 'Edit', icon: 'pencil' },
              { label: 'Delete', icon: 'trash-2', destructive: true },
            ]}
          />
        }
      />
      <ActionCard
        icon={<Icon name="lock" />}
        title="Require SSO"
        badge={<Badge size="sm">Off</Badge>}
        description="Members can sign in with Acme Corp SSO, Google Workspace, or with email and a one-time code"
        actions={<MotadataSwitch aria-label="Require SSO" />}
      />
      <ActionCard
        variant="add"
        icon={<Icon name="plus" />}
        title="Add connection"
        description="Let members sign in with the identity provider they already use"
        onClick={fn()}
        actions={
          <AvatarStack max={3} size="sm">
            <Avatar name="Acme Corp" />
            <Avatar name="Microsoft" />
            <Avatar name="Google" />
            <Avatar name="Okta" />
          </AvatarStack>
        }
      />
      <ActionCard
        icon={<Icon name="shield" />}
        title="Acme Corp SSO"
        badge={
          <Badge tone="success" size="sm">
            Live
          </Badge>
        }
        description={['SAML 2.0', '2,104 sign-ins in 30 days']}
        actions={
          <MotadataSwitch defaultChecked aria-label="Show Acme Corp SSO on the sign-in screen" />
        }
        menu={<More name="Acme Corp SSO" />}
      />
      <ActionCard
        icon={<Icon name="key-round" />}
        title="Contractor Okta"
        badge={
          <Badge tone="danger" size="sm">
            Test failed
          </Badge>
        }
        description="The identity provider rejected the connection details"
        actions={
          <Button variant="outline" size="sm" leftIcon={<Icon name="zap" />}>
            Run test
          </Button>
        }
        menu={<More name="Contractor Okta" />}
      />
      <ActionCard
        icon={<Icon name="key-round" />}
        title="Azure AD — Pilot"
        badge={<Badge size="sm">Draft</Badge>}
        description={['OpenID Connect', 'Setup not finished']}
        actions={
          <Button variant="outline" size="sm">
            Finish setup
          </Button>
        }
        menu={<More name="Azure AD — Pilot" />}
      />
      <ActionCard
        dim
        icon={<Icon name="key-round" />}
        title="Legacy ADFS (retired)"
        badge={<Badge size="sm">Off</Badge>}
        description={['Hidden from the sign-in screen', 'setup kept']}
        actions={<MotadataSwitch aria-label="Show Legacy ADFS on the sign-in screen" />}
        menu={<More name="Legacy ADFS" />}
      />
      <SyncSource />
    </Stack>
  ),
};

/**
 * Add domain, pressed, becomes the `edit` card in its place: the field, Cancel
 * and Add. Each domain's ⋯ works: Edit turns that card into the same field,
 * Delete removes it. Enter and Escape do what the two buttons do.
 */
export const InlineEdit: Story = {
  parameters: { controls: { disable: true } },
  render: function InlineEditStory() {
    const [domains, setDomains] = useState(['northbridge.io']);
    /* which card holds the field: 'new' for Add domain, a name for an Edit */
    const [editing, setEditing] = useState<string | null>(null);
    const [draft, setDraft] = useState('');
    const open = (key: string, value: string) => {
      setEditing(key);
      setDraft(value);
    };
    const close = () => {
      setEditing(null);
      setDraft('');
    };
    const commit = () => {
      const value = draft.trim();
      if (!value) return;
      setDomains((list) =>
        editing === 'new' ? [value, ...list] : list.map((d) => (d === editing ? value : d))
      );
      close();
    };
    const editCard = (verb: string, label: string) => (
      <ActionCard
        variant="edit"
        icon={<Icon name="globe" />}
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={close}>
              Cancel
            </Button>
            <Button size="sm" onClick={commit} disabled={!draft.trim()}>
              {verb}
            </Button>
          </>
        }
      >
        <Input
          aria-label={label}
          placeholder="acme-corp.com"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') close();
          }}
        />
      </ActionCard>
    );
    return (
      <Stack>
        {editing === 'new' ? (
          editCard('Add', 'New domain')
        ) : (
          <ActionCard
            variant="add"
            icon={<Icon name="plus" />}
            title="Add domain"
            onClick={() => {
              open('new', '');
            }}
          />
        )}
        {domains.map((d) =>
          editing === d ? (
            <Fragment key={d}>{editCard('Save', `Rename ${d}`)}</Fragment>
          ) : (
            <ActionCard
              key={d}
              icon={<Icon name="globe" />}
              title={d}
              actions={<MotadataSwitch defaultChecked aria-label={`Enable ${d}`} />}
              menu={
                <More
                  name={d}
                  items={[
                    {
                      label: 'Edit',
                      icon: 'pencil',
                      onSelect: () => {
                        open(d, d);
                      },
                    },
                    {
                      label: 'Delete',
                      icon: 'trash-2',
                      destructive: true,
                      onSelect: () => {
                        setDomains((list) => list.filter((x) => x !== d));
                      },
                    },
                  ]}
                />
              }
            />
          )
        )}
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Add domain' }));
    await userEvent.type(canvas.getByRole('textbox', { name: 'New domain' }), 'acme-corp.com');
    await userEvent.click(canvas.getByRole('button', { name: 'Add' }));
    await expect(canvas.getByText('acme-corp.com')).toBeInTheDocument();
  },
};

/**
 * What a click on the card can do. The switch and ⋯ on the drawer card stay
 * their own controls - flipping the switch does not open the drawer.
 */
export const ClickBehaviours: Story = {
  parameters: { controls: { disable: true } },
  render: function ClickBehavioursStory() {
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [count, setCount] = useState(0);
    return (
      <Stack>
        <ActionCard
          icon={<Icon name="lock" />}
          title="Open a modal"
          description="onClick opens a Dialog"
          onClick={() => {
            setModal(true);
          }}
        />
        <ActionCard
          icon={<Icon name="shield" />}
          title="Open a drawer"
          description="onClick opens a Sheet; the switch and menu stay their own controls"
          onClick={() => {
            setDrawer(true);
          }}
          actions={<MotadataSwitch defaultChecked aria-label="Enable the drawer card" />}
          menu={<More name="the drawer card" />}
        />
        <ActionCard
          icon={<Icon name="zap" />}
          title="Change the content"
          description={`Clicked ${String(count)} times`}
          onClick={() => {
            setCount((c) => c + 1);
          }}
        />
        <ActionCard
          icon={<Icon name="github" />}
          title="Redirect"
          description="href makes the card a link; this one opens in a new tab"
          href="https://github.com"
          target="_blank"
        />
        <ActionCard
          icon={<Icon name="globe" />}
          title="Not clickable"
          description="clickable={false} holds it still, even with an onClick"
          onClick={() => {
            setModal(true);
          }}
          clickable={false}
        />
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Opened from a card</DialogTitle>
              <DialogDescription>The card's onClick set this dialog open.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Sheet open={drawer} onOpenChange={setDrawer}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Opened from a card</SheetTitle>
              <SheetDescription>The card's onClick set this drawer open.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Stack>
    );
  },
};
