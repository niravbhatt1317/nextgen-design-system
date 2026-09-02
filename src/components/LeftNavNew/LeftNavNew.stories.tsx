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

/* The console's first ten organizations, names verbatim, so the panel reads
 * exactly like the product. Per-org member counts are demo values in the
 * console's own 40–1,440 range; MSP_TOTAL is the product's real 50-org
 * population, carried explicitly so the where-you-are strip matches. */
const ORGS = [
  { id: 'finserve', name: 'Finserve Bank', memberCount: 1284 },
  { id: 'acmehealth', name: 'Acme Healthcare', memberCount: 812 },
  { id: 'northwind', name: 'Northwind Manufacturing', memberCount: 1391 },
  { id: 'kestrel', name: 'Kestrel Retail Group', memberCount: 264 },
  { id: 'voltaic', name: 'Voltaic Energy', memberCount: 508 },
  { id: 'beacon', name: 'Beacon Legal LLP', memberCount: 129 },
  { id: 'saffron', name: 'Saffron Hospitality', memberCount: 976 },
  { id: 'polaris', name: 'Polaris Logistics', memberCount: 1108 },
  { id: 'mosaic', name: 'Mosaic Education Trust', memberCount: 342 },
  { id: 'cedarwood', name: 'Cedarwood Public Library', memberCount: 87 },
];
const MSP_TOTAL = 38700;

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
  startOrg = 'finserve',
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
    totalMembers: MSP_TOTAL,
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
 * The whole rail, as the product ships it: account/place card at the top
 * (starting in the MSP-wide view, exactly where the product lands after
 * login), the quiet search (⌘K works), Inbox and Explore, the folder tree
 * with its connector spine, and Settings pinned at the bottom. Click a folder
 * to fold its boards; type in the search to filter them.
 */
export const Workspace: Story = {
  render: () => <WorkspaceDemo startOrg={null} />,
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
 * door, then email, theme tabs, and Log out. This story starts inside an
 * organization so the door shows — travel out and back.
 */
export const AccountSwitcher: Story = {
  render: () => <WorkspaceDemo />,
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
