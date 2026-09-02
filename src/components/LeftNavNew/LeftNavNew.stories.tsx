import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { LeftNavNew, LeftNavNewTrigger } from './LeftNavNew';
import type { LeftNavNewAccount, LeftNavNewCollection, LeftNavNewTheme } from './LeftNavNew.types';

const meta: Meta<typeof LeftNavNew> = {
  title: 'Components/LeftNav New',
  component: LeftNavNew,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* The console's own workspace seed: three collections of boards. */
const COLLECTIONS: LeftNavNewCollection[] = [
  {
    key: 'incident',
    label: 'Incident Response',
    defaultOpen: true,
    children: [
      { key: 'alerts', label: 'Active Alerts Board', live: true },
      { key: 'warroom', label: 'Incident War Room', live: true },
      { key: 'rca', label: 'Root Cause Analysis Board', live: true },
    ],
  },
  {
    key: 'monitoring',
    label: 'Monitoring & Metrics',
    children: [
      { key: 'health', label: 'Service Health', live: true },
      { key: 'capacity', label: 'Capacity Planning', live: true },
    ],
  },
  {
    key: 'kb',
    label: 'Knowledge Base & Solutions',
    children: [
      { key: 'articles', label: 'Articles', live: true },
      { key: 'runbooks', label: 'Runbooks', live: true },
    ],
  },
];

/* Demo organizations — obviously-fictional names, sized so the member-count
 * formatting shows both its forms. */
const ORGS = [
  { id: 'northwind', name: 'Northwind Traders', memberCount: 1284 },
  { id: 'fabrikam', name: 'Fabrikam', memberCount: 342 },
  { id: 'contoso', name: 'Contoso Ltd', memberCount: 2210 },
  { id: 'wayside', name: 'Wayside Systems', memberCount: 96 },
];

const FIXED_ROWS: Record<string, string> = {
  settings: 'Settings',
  inbox: 'Inbox',
  explore: 'Explore',
};

function labelOf(key: string, collections: LeftNavNewCollection[]): string {
  const board = collections.flatMap((c) => c.children).find((ch) => ch.key === key);
  return board?.label ?? FIXED_ROWS[key] ?? key;
}

/**
 * The frame every story shares, shaped like the console's shell: the rail owns
 * the full height on the left, and everything else is the right section. The
 * trigger sits in THAT section's header band ([panel icon] | title) — there is
 * no full-width top bar. The canvas echoes whatever the rail last selected.
 */
function WorkspaceDemo({
  startCollapsed = false,
  startOrg = 'northwind',
  startActive = 'warroom',
  collections = COLLECTIONS,
  withAccount = true,
}: {
  startCollapsed?: boolean;
  startOrg?: string | null;
  startActive?: string;
  collections?: LeftNavNewCollection[];
  withAccount?: boolean;
}) {
  const [active, setActive] = useState(startActive);
  const [collapsed, setCollapsed] = useState(startCollapsed);
  const [orgId, setOrgId] = useState<string | null>(startOrg);
  const [theme, setTheme] = useState<LeftNavNewTheme>('light');
  const account: LeftNavNewAccount = {
    email: 'demo.admin@motadata.com',
    orgs: ORGS,
    currentOrgId: orgId,
    onSwitchOrg: setOrgId,
    theme,
    onThemeChange: setTheme,
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: 'hsl(var(--mdt-background))',
      }}
    >
      <LeftNavNew
        collections={collections}
        activeKey={active}
        onSelect={setActive}
        onSettings={() => {
          setActive('settings');
        }}
        {...(withAccount ? { account } : {})}
        collapsed={collapsed}
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 48,
            padding: '0 12px',
            borderBottom: '1px solid hsl(var(--mdt-neutral-20))',
            flex: '0 0 auto',
          }}
        >
          <LeftNavNewTrigger
            collapsed={collapsed}
            onToggle={() => {
              setCollapsed(!collapsed);
            }}
          />
          <span style={{ fontSize: 13, color: 'hsl(var(--mdt-muted-foreground))' }}>Workspace</span>
        </header>
        <main
          style={{
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            color: 'hsl(var(--mdt-muted-foreground))',
            fontSize: 13,
          }}
        >
          Selected: {labelOf(active, collections)}
        </main>
      </div>
    </div>
  );
}

/**
 * The whole rail, as the product ships it: account/place card at the top,
 * the quiet search (⌘K works), Inbox and Explore, the folder tree with its
 * connector spine, and Settings pinned at the bottom. Click a folder to fold
 * its boards; type in the search to filter them.
 */
export const Workspace: Story = {
  render: () => <WorkspaceDemo />,
};

/**
 * The 56px icon rail. Names survive as tooltips, the account card shows its
 * avatar alone, and hovering (or clicking) a folder opens its boards in a
 * flyout with a short grace timer for the pointer's travel. The header-band
 * trigger expands it again.
 */
export const CollapsedRail: Story = {
  render: () => <WorkspaceDemo startCollapsed />,
};

/**
 * The account card opens the destination panel to its right: where you are,
 * the go-to-organization list (recently-left places float up), the MSP-wide
 * door, then email, theme tabs, and Log out. This story starts in the
 * MSP-wide view — travel into an organization and back.
 */
export const AccountSwitcher: Story = {
  render: () => <WorkspaceDemo startOrg={null} />,
};

/**
 * Row states side by side: a selected board, live boards, a not-live board
 * that keeps its normal look but refuses the click, and a "Soon" board that
 * fades to 40% while the badge keeps full strength. The rail also renders
 * without an account card, as here.
 */
export const RowStates: Story = {
  render: () => (
    <WorkspaceDemo
      withAccount={false}
      startActive="selected"
      collections={[
        {
          key: 'states',
          label: 'Board States',
          defaultOpen: true,
          children: [
            { key: 'selected', label: 'A selected board', live: true },
            { key: 'live', label: 'A live board', live: true },
            { key: 'notlive', label: 'Not wired up yet' },
            { key: 'soon', label: 'Permissions', soon: true },
          ],
        },
        ...COLLECTIONS,
      ]}
    />
  ),
};
