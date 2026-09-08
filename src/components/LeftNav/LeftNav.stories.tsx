import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { LeftNav, LeftNavTrigger } from './LeftNav';
import type {
  LeftNavAccount,
  LeftNavCollection,
  LeftNavSettingsSection,
  LeftNavTheme,
  LeftNavView,
} from './LeftNav.types';

const meta: Meta<typeof LeftNav> = {
  title: 'Components/LeftNav',
  component: LeftNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'The product navigation, ported from the merged console and held to it pixel for pixel.',
          'One rail, three floors:',
          '',
          '| Floor | What it holds | How you get there |',
          '| --- | --- | --- |',
          '| **Workspace** | Account card, search, Inbox and Explore, the folder tree of collections and boards, Favorite, and Settings pinned at the bottom | Where the product lands |',
          '| **Settings** | The categories of settings pages (People & Access, Administration, Customization, Operations, Discovery) | The pinned Settings row |',
          "| **Agent Fleet** | The fleet module's seven groups | The Agent Fleet entry on the Settings floor |",
          '',
          'On the two lower floors a **crumb strip** replaces the heading: home › Settings › Agent Fleet,',
          'every earlier step clickable. That strip is the only way back up; there is no exit row.',
          '',
          '### When to use it',
          '',
          'As the left edge of an application shell, 256px wide, full height. It is not a menu inside a',
          'page and not a settings panel on its own: for a self-contained settings list the deprecated',
          '`LeftNavOld` still exists for comparison, but nothing new should start on it.',
          '',
          '### Behaviour worth knowing',
          '',
          '- **Search** filters the current floor. It forces closed folders open when a board matches,',
          '  and Escape clears it. On the lower floors, scrolling the list tucks the search into the',
          "  crumb strip's right end; the magnifier there scrolls it back.",
          '- **Collapsed**, the rail is 56px: names become tooltips, a folder opens its boards in a flyout',
          '  with a short grace timer for the pointer, and the crumb strip folds into stacked icon',
          '  buttons. The collapse trigger lives in the page header band, exported as `LeftNavTrigger`.',
          "- **Descending picks the floor's first page**, exactly as the product routes: Settings lands on",
          '  Users, Agent Fleet on its command center. `onSelect` reports it like any other pick.',
          '- **One key space.** `activeKey` names a board or a page on any floor; the collection holding',
          '  a board is highlighted with it.',
          '- **Inbox and Explore are inert** because they are inert in the console. Replicate means',
          '  replicate.',
          '',
          '### Keyboard',
          '',
          '- Tab moves through the account card, the search, every row and the crumb chips; Enter or',
          "  Space activates. Every stop shows the library's focus ring.",
          '- Ctrl/⌘ K hands the search the caret from anywhere on the page.',
          '- Escape clears the search; a second Escape in the account panel closes it.',
          '',
          '### Colour, and the one exception',
          '',
          'Every colour is a palette step. The two small headings, **Collections** and **Favorite**, use',
          '`muted-foreground-subtle` (ink-400, #9B9EAA), which measures 2.67:1 on the panel: an accepted',
          'exception, chosen so a heading whispers. The six avatar tone pairs in the account panel are',
          'intentional and outside the palette by decision. Dark mode is carried but not yet audited.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* The console's own workspace seed: three collections of boards. */
const COLLECTIONS: LeftNavCollection[] = [
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

/* The console's settings floor, verbatim (MSP perspective, every entry). */
const SETTINGS: LeftNavSettingsSection[] = [
  {
    key: 'people',
    label: 'People & Access',
    items: [
      { key: 'users', label: 'Users', icon: 'users' },
      { key: 'service', label: 'Service accounts', icon: 'bot' },
      { key: 'teams', label: 'Teams', icon: 'users-2' },
      { key: 'roles', label: 'Roles', icon: 'shield' },
      { key: 'permissions', label: 'Permissions', icon: 'list-checks', soon: true },
    ],
  },
  {
    key: 'admin',
    label: 'Administration',
    items: [{ key: 'organizations', label: 'Organization', icon: 'building-2' }],
  },
  {
    key: 'custom',
    label: 'Customization',
    items: [
      { key: 'fields', label: 'User attributes', icon: 'user-cog' },
      { key: 'org_attributes', label: 'Organization attributes', icon: 'sliders-horizontal' },
    ],
  },
  {
    key: 'operations',
    label: 'Operations',
    items: [{ key: 'fleet', label: 'Agent Fleet', icon: 'cpu', section: 'fleet' }],
  },
  {
    key: 'discovery',
    label: 'Discovery',
    items: [
      { key: 'credentials', label: 'Credential profiles', icon: 'key-round' },
      { key: 'secret_stores', label: 'Secret stores', icon: 'lock' },
    ],
  },
];

/* The console's fleet floor, verbatim: Agent Fleet Management's seven groups. */
const FLEET: LeftNavSettingsSection[] = [
  {
    key: 'overview',
    label: 'Overview',
    items: [
      { key: 'home', label: 'Command center', icon: 'layout-dashboard' },
      { key: 'insights', label: 'Insights & alerts', icon: 'bell' },
    ],
  },
  {
    key: 'fleet',
    label: 'Fleet',
    items: [
      { key: 'inventory', label: 'Inventory', icon: 'package' },
      { key: 'enroll', label: 'Enroll agents', icon: 'package-plus' },
      { key: 'retire', label: 'Retire agents', icon: 'package-minus' },
    ],
  },
  {
    key: 'deployments',
    label: 'Deployments',
    items: [
      { key: 'config', label: 'Configuration', icon: 'settings-2' },
      { key: 'modules', label: 'Modules', icon: 'puzzle' },
      { key: 'upgrades', label: 'Upgrades', icon: 'arrow-up-circle' },
    ],
  },
  {
    key: 'fleet_ops',
    label: 'Operations',
    items: [
      { key: 'health_fp', label: 'Health & footprint', icon: 'heart-pulse' },
      { key: 'diagnose', label: 'Diagnose', icon: 'stethoscope' },
      { key: 'copilot', label: 'AI copilot', icon: 'sparkles' },
      { key: 'killswitch', label: 'Kill-switch', icon: 'power' },
    ],
  },
  {
    key: 'governance',
    label: 'Governance',
    items: [
      { key: 'security', label: 'Security & audit', icon: 'shield-check' },
      { key: 'aiagents', label: 'AI agents', icon: 'bot' },
    ],
  },
  {
    key: 'msp',
    label: 'Tenants',
    items: [{ key: 'tenants', label: 'MSP operations', icon: 'building-2' }],
  },
  {
    key: 'integrations',
    label: 'Integrations',
    items: [{ key: 'integrations', label: 'APIs & automation', icon: 'webhook' }],
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

/* The frame is sized so the rail still has to scroll on the fleet floor (its
 * longest list): that is where the search tucks into the crumb strip. */
const FRAME_HEIGHT = 720;
const FRAME_MAX_WIDTH = 1280;

const FIXED_ROWS: Record<string, string> = {
  settings: 'Settings',
  inbox: 'Inbox',
  explore: 'Explore',
};

const FLOOR_TITLE: Record<LeftNavView, string> = {
  workspace: 'Workspace',
  settings: 'Settings',
  fleet: 'Agent Fleet',
};

function labelOf(key: string, collections: LeftNavCollection[]): string {
  const board = collections.flatMap((c) => c.children).find((ch) => ch.key === key);
  if (board) return board.label;
  const page = [...SETTINGS, ...FLEET].flatMap((s) => s.items).find((it) => it.key === key);
  return page?.label ?? FIXED_ROWS[key] ?? key;
}

/**
 * The frame every story shares, shaped like the console's shell: the rail owns
 * the full height on the left, and everything else is the right section. The
 * trigger sits in THAT section's header band ([panel icon] | title) — there is
 * no full-width top bar. The frame is short on purpose, so the rail scrolls.
 * The canvas echoes whatever the rail last selected.
 */
function WorkspaceDemo({
  startCollapsed = false,
  startOrg = 'finserve',
  startActive = 'warroom',
  startView = 'workspace',
  collections = COLLECTIONS,
  settings = SETTINGS,
  fleet = FLEET,
  orgs = ORGS,
}: {
  startCollapsed?: boolean;
  startOrg?: string | null;
  startActive?: string;
  startView?: LeftNavView;
  collections?: LeftNavCollection[];
  settings?: LeftNavSettingsSection[];
  fleet?: LeftNavSettingsSection[];
  orgs?: typeof ORGS;
}) {
  const [active, setActive] = useState(startActive);
  const [view, setView] = useState<LeftNavView>(startView);
  const [collapsed, setCollapsed] = useState(startCollapsed);
  const [orgId, setOrgId] = useState<string | null>(startOrg);
  const [theme, setTheme] = useState<LeftNavTheme>('light');
  const account: LeftNavAccount = {
    email: 'demo.admin@motadata.com',
    orgs,
    totalMembers: MSP_TOTAL,
    currentOrgId: orgId,
    onSwitchOrg: setOrgId,
    theme,
    onThemeChange: setTheme,
  };
  return (
    <div style={{ padding: 24, background: 'hsl(var(--mdt-background))' }}>
      <div
        style={{
          display: 'flex',
          height: FRAME_HEIGHT,
          maxWidth: FRAME_MAX_WIDTH,
          border: '1px solid hsl(var(--mdt-neutral-20))',
          background: 'hsl(var(--mdt-background))',
          overflow: 'hidden',
        }}
      >
        <LeftNav
          collections={collections}
          settings={settings}
          fleet={fleet}
          view={view}
          onViewChange={setView}
          activeKey={active}
          onSelect={setActive}
          account={account}
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
            <LeftNavTrigger
              collapsed={collapsed}
              onToggle={() => {
                setCollapsed(!collapsed);
              }}
            />
            <span style={{ fontSize: 13, color: 'hsl(var(--mdt-muted-foreground))' }}>
              {FLOOR_TITLE[view]}
            </span>
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
            {view === 'workspace' ? 'Selected: ' : 'Page: '}
            {labelOf(active, collections)}
          </main>
        </div>
      </div>
    </div>
  );
}

/**
 * The whole rail, as the product ships it: account/place card at the top
 * (starting in the MSP-wide view, exactly where the product lands after
 * login), the quiet search (⌘K works), Inbox and Explore, the folder tree
 * with its connector spine, and Settings pinned at the bottom. Click a folder
 * to fold its boards; type in the search to filter them. Click Settings to
 * descend a floor.
 */
export const Workspace: Story = {
  render: () => <WorkspaceDemo startOrg={null} />,
};

/**
 * One floor down. The crumb strip (home › Settings) replaces the heading and
 * is the way back; the list is long enough to scroll, and scrolling tucks the
 * search into the strip's right end, where a magnifier brings it back (so does
 * ⌘K). Permissions reads disabled with its "soon" badge; Agent Fleet carries a
 * chevron because it descends again.
 */
export const Settings: Story = {
  render: () => <WorkspaceDemo startOrg={null} startView="settings" startActive="users" />,
};

/**
 * Two floors down: the Agent Fleet floor, with a three-step crumb (home ›
 * Settings › Agent Fleet). Every earlier step is clickable. The search
 * re-scopes to the fleet and takes the caret on arrival.
 */
export const AgentFleet: Story = {
  render: () => <WorkspaceDemo startOrg={null} startView="fleet" startActive="home" />,
};

/**
 * The 56px icon rail. Names survive as tooltips, the account card shows its
 * avatar alone, and hovering (or clicking) a folder opens its boards in a
 * flyout with a short grace timer for the pointer's travel. The header-band
 * trigger expands it again. On the settings floors the crumb strip folds into
 * stacked icon buttons: home, and one level up when on the fleet floor.
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
 * fades to 40% while the badge keeps full strength. The account card stays,
 * as it does everywhere in the product.
 */
export const RowStates: Story = {
  render: () => (
    <WorkspaceDemo
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

const ACTIVE_BY_FLOOR: Record<LeftNavView, string> = {
  workspace: 'warroom',
  settings: 'users',
  fleet: 'home',
};

/**
 * Every option on one page, driven by the Controls panel: collapse the rail,
 * start on any floor. Each change re-seeds the frame so the floor you pick is
 * the floor you see.
 */
export const Playground: Story = {
  args: { collapsed: false, defaultView: 'workspace' },
  argTypes: {
    collapsed: { control: 'boolean' },
    defaultView: { control: 'radio', options: ['workspace', 'settings', 'fleet'] },
  },
  render: (args) => {
    const view: LeftNavView = args.defaultView ?? 'workspace';
    const collapsed = args.collapsed ?? false;
    return (
      <WorkspaceDemo
        key={`${String(collapsed)}-${view}`}
        startCollapsed={collapsed}
        startView={view}
        startActive={ACTIVE_BY_FLOOR[view]}
        startOrg={null}
      />
    );
  },
};

/* The longest names a customer could plausibly type, everywhere a name can go. */
const LONG_COLLECTIONS: LeftNavCollection[] = [
  {
    key: 'long',
    label: 'Enterprise Infrastructure Monitoring and Capacity Planning Programme',
    defaultOpen: true,
    children: [
      {
        key: 'long-a',
        label: 'Quarterly Business Continuity and Disaster Recovery Readiness Review Board',
        live: true,
      },
      {
        key: 'long-b',
        label: 'Customer-Facing Service Level Agreement Breach Investigations',
        live: true,
      },
      {
        key: 'long-c',
        label: 'Regional Data Centre Power and Cooling Anomaly Watchlist',
        soon: true,
      },
    ],
  },
  ...COLLECTIONS,
];
const LONG_ORGS = [
  {
    id: 'long-org',
    name: 'Northwind Manufacturing and Logistics Holdings International Limited',
    memberCount: 1391,
  },
  ...ORGS.slice(1),
];
const LONG_SETTINGS: LeftNavSettingsSection[] = SETTINGS.map((sec) =>
  sec.key === 'operations'
    ? {
        ...sec,
        items: [
          {
            key: 'fleet',
            label: 'Agent Fleet Management and Remote Operations Centre',
            icon: 'cpu',
            section: 'fleet',
          },
        ],
      }
    : sec.key === 'custom'
      ? {
          ...sec,
          items: [
            {
              key: 'fields',
              label: 'User attributes and custom profile field definitions',
              icon: 'user-cog',
            },
            ...sec.items.slice(1),
          ],
        }
      : sec
);

/**
 * Long names in every place a name can go: the account card, a collection, its
 * boards, a settings page, and the fleet entry, whose label becomes the current
 * crumb on the fleet floor. Rows truncate with an ellipsis and keep their full
 * name as a tooltip; the crumb strip gives the current step what is left after
 * the earlier steps and the magnifier.
 */
export const LongLabels: Story = {
  render: () => (
    <WorkspaceDemo
      startOrg="long-org"
      startActive="long-a"
      collections={LONG_COLLECTIONS}
      settings={LONG_SETTINGS}
      orgs={LONG_ORGS}
    />
  ),
};
