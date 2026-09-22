import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabsAdd, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { useEditableTabs } from './useEditableTabs';
import type { TabsType } from './Tabs.types';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Sections you visit in any order. Two types at the numbers Pranjal ruled on 2026-09-17',
          '(mocks/foundation/tabs.html; rulebook K-Tabs-01 to K-Tabs-26), in the library since',
          '2026-09-22. The component as it was before is `TabsOld2`, under Deprecated 2.',
          '',
          '| Type | For | Looks |',
          '| --- | --- | --- |',
          "| `underline` (the default) | A drawer band or a page band. | The label 13/500 in neutral-70, the active one 600 in the primary colour, over a 2px line that sits ON the strip's hairline and spans the label plus 12 at both sides; the tabs flush, so labels read 24 apart; 9 above the label, 11 below. |",
          "| `filled` | A switch inside a body — a view toggle, a form's mode — where a track reads better than a line. | A 32 track, corners 8, neutral-20, 3 in, holding 26 chips with corners 5, 10 at the sides and 2 between; the active chip white with the label at 500 in the primary colour under a hairline shadow. |",
          '',
          '**Not Tabs.** A sequence is a `Stepper`; a view preference is a `ToggleGroup`; "one of',
          'these" is a Radio strip (K-Tabs-25).',
          '',
          '| Rule | |',
          '| --- | --- |',
          "| **One size** | 13/500 on an 18 line — the field's size (K-Tabs-02). |",
          '| **Hover** | The label darkens to neutral-90; a chip also tints primary at 4% (K-Tabs-04). |',
          '| **Disabled** | neutral-40 with a not-allowed cursor; the arrow keys skip it (K-Tabs-05). |',
          '| **Icon** | `icon`, drawn at 14 with 6 before the label (K-Tabs-13). |',
          '| **Count** | `count`, an 18-high pill at 11/600, muted, inverted on the active tab; `countMax` caps it at 99+ (K-Tabs-14). A tab carries a count and never a button. |',
          '| **The active tab ignores a click** | Re-selecting the selected tab does nothing — `onValueChange` is not called (K-Tabs-12). |',
          '| **The strip starts on the content edge** | So the active line lines up with the text under it; the first label sits 12 in (K-Tabs-08). |',
          '| **Keyboard** | Tab reaches the selected tab; the arrow keys move between tabs and select as they go; Home and End jump. |',
          '| **Set the type once** | On the `TabsList`; every tab inside inherits it. |',
          '',
          "Three calls the rulebook lists as open are built at the console's value: the active",
          'underline label at 600 (K-Tabs-07), the chip at 26 in the 32 track (K-Tabs-10), the icon',
          'at 14 with 6 before the label (K-Tabs-13).',
        ].join('\n'),
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The tab selected to begin with, when the tabs are not controlled',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'The selected tab, when controlled',
      table: { type: { summary: 'string' } },
    },
    onValueChange: {
      action: 'value changed',
      description: 'Called when a different tab is selected; not for the one already selected',
      table: { type: { summary: '(value: string) => void' } },
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: 'Whether a tab is selected as soon as it is focused, or only on Enter or Space',
      table: { defaultValue: { summary: 'automatic' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ── shared pieces ─────────────────────────────────────────────────────── */

const Text = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-m-0 mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90">{children}</p>
);

/** The Users drawer's five tabs (K-Tabs-15): About · Grants 3 · Teams 2 · Effective permissions · Sessions. */
const DRAWER_TABS: { value: string; label: string; count?: number }[] = [
  { value: 'about', label: 'About' },
  { value: 'grants', label: 'Grants', count: 3 },
  { value: 'teams', label: 'Teams', count: 2 },
  { value: 'permissions', label: 'Effective permissions' },
  { value: 'sessions', label: 'Sessions' },
];

const DrawerTriggers = () => (
  <>
    {DRAWER_TABS.map((tab) => (
      <TabsTrigger
        key={tab.value}
        value={tab.value}
        {...(tab.count !== undefined ? { count: tab.count } : {})}
      >
        {tab.label}
      </TabsTrigger>
    ))}
  </>
);

const DrawerPanels = ({ className }: { className?: string }) => (
  <>
    {DRAWER_TABS.map((tab) => (
      <TabsContent
        key={tab.value}
        value={tab.value}
        {...(className !== undefined ? { className } : {})}
      >
        <Text>
          {tab.label}: the text under the band starts on the same edge as the strip, so the active
          line lines up with it (K-Tabs-08).
        </Text>
      </TabsContent>
    ))}
  </>
);

/* ── the two types ─────────────────────────────────────────────────────── */

/**
 * The default. The label 13/500 in neutral-70, the active one 600 in the primary
 * colour; a 2px primary line on the strip's hairline, the tab's full width (the
 * label plus 12 at both sides); the tabs flush so labels read 24 apart; 9 above
 * the label, 11 below (K-Tabs-02, 03, 06, 07).
 */
export const Underline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default, for a drawer band or a page band. Label 13/500 in neutral-70, the active one 600 in the primary colour (K-Tabs-02, 03, 07); a 2px primary line ON the strip’s hairline, spanning the label plus 12 at both sides; the tabs flush, so labels read 24 apart; 9 above the label, 11 below (K-Tabs-06). The content sits 8 under the strip (K-Tabs-23).',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="about" className="mdt-w-[560px]">
      <TabsList>
        <DrawerTriggers />
      </TabsList>
      <DrawerPanels />
    </Tabs>
  ),
};

/**
 * A switch inside a body. A 32 track, corners 8, neutral-20, 3 in; 26 chips
 * with corners 5, 10 at the sides, 2 between; the active chip white, its label
 * 500 in the primary colour (not bold), under a hairline shadow (K-Tabs-09,
 * 10, 11). The active chip ignores a click (K-Tabs-12).
 */
export const Filled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'For a switch inside a body — the Source of truth switch, a form’s mode, a view toggle. A 32 track, corners 8, neutral-20, 3 in (K-Tabs-09); 26 chips with corners 5, 10 at the sides, 2 between (K-Tabs-10, built at 26 so the chip sits at exactly 3 · 3); the active chip white with the label at 500 in the primary colour — not bold, the white chip and the colour carry it — under a hairline shadow (K-Tabs-11). Hover tints a chip primary at 4% (K-Tabs-04). Clicking the chip that is already active does nothing (K-Tabs-12).',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="manual" className="mdt-w-[560px]">
      <TabsList type="filled">
        <TabsTrigger value="manual">Manual</TabsTrigger>
        <TabsTrigger value="ldap">LDAP</TabsTrigger>
        <TabsTrigger value="scim">SCIM</TabsTrigger>
      </TabsList>
      <TabsContent value="manual">
        <Text>Manual: people are added and edited here.</Text>
      </TabsContent>
      <TabsContent value="ldap">
        <Text>LDAP: the directory is the source of truth; fields it owns are read-only here.</Text>
      </TabsContent>
      <TabsContent value="scim">
        <Text>
          SCIM: the identity provider pushes people in; fields it owns are read-only here.
        </Text>
      </TabsContent>
    </Tabs>
  ),
};

/* ── the matrix ────────────────────────────────────────────────────────── */

type MatrixState = 'default' | 'hover' | 'active' | 'disabled' | 'icon' | 'icon-count';

const STATES: { key: MatrixState; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'icon', label: 'With icon' },
  { key: 'icon-count', label: 'Icon + count' },
];

/**
 * The hover column is drawn, not pointed at: the second tab carries the hover
 * colours by className, which is the same class the real hover applies.
 */
const HOVER_CLASS: Record<TabsType, string> = {
  underline: 'mdt-text-neutral-90',
  filled: 'mdt-text-neutral-90 mdt-bg-primary/[0.04]',
};

/** One cell of the matrix: three tabs, the second carrying the named state. */
const MatrixCell = ({ type, state }: { type: TabsType; state: MatrixState }) => {
  const withIcon = state === 'icon' || state === 'icon-count';
  const withCount = state === 'icon-count';
  const active = state === 'active' || state === 'icon-count' ? 'grants' : 'about';
  return (
    <Tabs defaultValue={active}>
      <TabsList type={type}>
        <TabsTrigger value="about" {...(withIcon ? { icon: <Icon name="user" /> } : {})}>
          About
        </TabsTrigger>
        <TabsTrigger
          value="grants"
          disabled={state === 'disabled'}
          {...(state === 'hover' ? { className: HOVER_CLASS[type] } : {})}
          {...(withIcon ? { icon: <Icon name="key" /> } : {})}
          {...(withCount ? { count: 3 } : {})}
        >
          Grants
        </TabsTrigger>
        <TabsTrigger
          value="teams"
          {...(withIcon ? { icon: <Icon name="users" /> } : {})}
          {...(withCount ? { count: 2 } : {})}
        >
          Teams
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const HEAD =
  'mdt-bg-neutral-10 mdt-px-4 mdt-py-3 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-[0.04em] mdt-text-neutral-90';
const CELL = 'mdt-flex mdt-items-end mdt-border-t mdt-border-neutral-20 mdt-px-4 mdt-py-5';

/**
 * Two types × six states (K-Tabs-15). In every cell the second tab carries the
 * state named in the column.
 */
export const States: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The matrix of K-Tabs-15: two types × six states — default, hover, active, disabled, with icon, icon + count. In every cell the second tab carries the state named in the column. Rest neutral-70; hover neutral-90 (a chip also tints primary at 4%); active primary (600 on the line, 500 on the chip); disabled neutral-40 with a not-allowed cursor; the icon 14 with 6 before the label; the count an 18-high pill at 11/600, inverted on the active tab (K-Tabs-03, 04, 05, 13, 14). The hover column is drawn with the hover classes so it can be seen without pointing.',
      },
    },
  },
  render: () => (
    <div className="mdt-p-8">
      <div
        className="mdt-grid mdt-w-max mdt-overflow-hidden mdt-rounded-xl mdt-border mdt-border-neutral-20 mdt-bg-white"
        style={{ gridTemplateColumns: '150px repeat(4, 236px) 300px 390px' }}
      >
        <div className={HEAD}>Type</div>
        {STATES.map((s) => (
          <div key={s.key} className={HEAD}>
            {s.label}
          </div>
        ))}
        {(['underline', 'filled'] as TabsType[]).map((type) => (
          <>
            <div
              key={`${type}-kind`}
              className={`${CELL} mdt-flex-col mdt-items-start mdt-justify-center mdt-text-[13px] mdt-font-medium mdt-text-primary`}
            >
              {type === 'underline' ? 'Underline' : 'Filled'}
              <span className="mdt-text-xs mdt-font-normal mdt-text-neutral-90">
                {type === 'underline' ? 'the default' : 'track 32, chip 26'}
              </span>
            </div>
            {STATES.map((s) => (
              <div key={`${type}-${s.key}`} className={CELL}>
                <MatrixCell type={type} state={s.key} />
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  ),
};

/* ── in context ────────────────────────────────────────────────────────── */

/**
 * The drawer band: 720 wide, 48 high, the strip starting on the content edge
 * (the band's 20), so the active line lines up with the text under it and the
 * first label sits 12 in (K-Tabs-08, K-Tabs-15).
 */
export const InADrawerBand: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A drawer band 720 wide and 48 high — the Users drawer’s five tabs (K-Tabs-15). The strip starts on the content edge, the band’s 20, so the active line lines up with the text under it and the first label sits 12 in; the pulled strip (−12) was drawn and ruled out (K-Tabs-08). The tabs are bottom-aligned, so in a 48 band the line still lands on the band’s own divider (K-Tabs-06).',
      },
    },
  },
  render: () => (
    <div className="mdt-w-[720px] mdt-rounded-xl mdt-border mdt-border-neutral-20 mdt-bg-white">
      <Tabs defaultValue="about">
        <div className="mdt-px-5">
          <TabsList className="mdt-h-12">
            <DrawerTriggers />
          </TabsList>
        </div>
        <div className="mdt-px-5 mdt-py-4">
          <DrawerPanels className="mdt-mt-0" />
        </div>
      </Tabs>
    </div>
  ),
};

/**
 * The page band: 60 high, full width, the strip on the band's 24 like the
 * surface under it, which insets 16 top and bottom (K-Tabs-08, K-Tabs-23).
 */
export const InAPageBand: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The page band under a hero: 60 high, full width, the strip starting on the band’s 24 like the content under it, so the active line lines up with the text below and the first label sits 12 in (K-Tabs-08). The band ends in the active tab’s 2px line, so the surface under it is inset 16 top and bottom rather than 6 and 20 — at 6 that line and a table’s top edge read as one (K-Tabs-23). A page’s tabs carry a count and never a button (K-Tabs-14).',
      },
    },
  },
  render: () => (
    <div className="mdt-min-h-[320px] mdt-bg-neutral-10">
      <Tabs defaultValue="users">
        <div className="mdt-flex mdt-h-[60px] mdt-items-stretch mdt-bg-white mdt-px-6">
          <TabsList>
            <TabsTrigger value="users" count={1284}>
              Users
            </TabsTrigger>
            <TabsTrigger value="teams" count={12}>
              Teams
            </TabsTrigger>
            <TabsTrigger value="roles" count={9}>
              Roles
            </TabsTrigger>
            <TabsTrigger value="grants">Grants</TabsTrigger>
          </TabsList>
        </div>
        <div className="mdt-px-6 mdt-py-4">
          {['users', 'teams', 'roles', 'grants'].map((value) => (
            <TabsContent key={value} value={value} className="mdt-mt-0">
              <div className="mdt-rounded-xl mdt-border mdt-border-neutral-20 mdt-bg-white mdt-p-4">
                <Text>
                  The {value} table starts here, on the same 24 as the strip; 16 above it so the
                  active line and the table’s top edge never read as one line.
                </Text>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  ),
};

/* ── counts ────────────────────────────────────────────────────────────── */

/**
 * The count is an 18-high pill at 11/600, muted, inverted on the active tab;
 * above `countMax` (99) it reads 99+ (K-Tabs-14).
 */
export const WithCounts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A count is the console’s CountBadge as it is: an 18-high pill at 11/600, muted (neutral-20 under neutral-70; a step darker, neutral-30, on the filled track), inverted on the active tab (neutral-90 under white) and faded with a disabled label (K-Tabs-14). Above `countMax`, 99 by default, it reads 99+. The pill sits 6 after the label, like the icon before it. A tab carries a count and never a button. A `Badge` still fits through `badge` for a status that is not a number.',
      },
    },
  },
  render: () => (
    <div className="mdt-flex mdt-w-[560px] mdt-flex-col mdt-gap-6">
      <Tabs defaultValue="grants">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="grants" count={3}>
            Grants
          </TabsTrigger>
          <TabsTrigger value="teams" count={2}>
            Teams
          </TabsTrigger>
          <TabsTrigger value="sessions" count={1284}>
            Sessions
          </TabsTrigger>
          <TabsTrigger value="archive" count={7} disabled>
            Archive
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="grants">
        <TabsList type="filled">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="grants" count={3}>
            Grants
          </TabsTrigger>
          <TabsTrigger value="teams" count={2}>
            Teams
          </TabsTrigger>
          <TabsTrigger value="sessions" count={1284}>
            Sessions
          </TabsTrigger>
          <TabsTrigger value="archive" count={7} disabled>
            Archive
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger
            value="grants"
            badge={
              <Badge tone="warning" size="sm">
                Soon
              </Badge>
            }
          >
            Grants
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
};

/* ── editable tab bars ─────────────────────────────────────────────────── */

const ClosableDemo = ({ type }: { type: TabsType }) => {
  const [open, setOpen] = useState(['inbox', 'flagged', 'drafts']);
  const [active, setActive] = useState('inbox');
  const close = (value: string) => {
    setOpen((current) => {
      const remaining = current.filter((v) => v !== value);
      if (active === value) setActive(remaining[0] ?? '');
      return remaining;
    });
  };
  const label: Record<string, string> = { inbox: 'Inbox', flagged: 'Flagged', drafts: 'Drafts' };
  return (
    <Tabs value={active} onValueChange={setActive}>
      <TabsList type={type}>
        {open.map((value) => (
          <TabsTrigger
            key={value}
            value={value}
            closable={open.length > 1}
            onClose={() => {
              close(value);
            }}
          >
            {label[value]}
          </TabsTrigger>
        ))}
      </TabsList>
      {open.map((value) => (
        <TabsContent key={value} value={value}>
          <Text>{label[value]} — point at a tab, or reach it by keyboard, to see its cross.</Text>
        </TabsContent>
      ))}
    </Tabs>
  );
};

/**
 * A closable tab holds 36 of right padding always, so it never changes width;
 * a 20 cross sits 4 from the right edge (12 after the label), hidden until the
 * tab is active, hovered or focused; the cross sits beside the tab in the
 * markup (K-Tabs-21).
 */
export const Closable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'For tab bars the person builds themselves — open documents, saved views — never for fixed sections. The tab keeps 36 of right padding whether or not the cross is showing, so it never changes width; the 20 cross sits 4 from the right edge, 12 after the label, and stays hidden (and unclickable) until the tab is active, hovered or focused. In the markup the cross sits beside the tab, since a button inside a button is invalid and unreachable by keyboard (K-Tabs-21). The last tab cannot be closed.',
      },
    },
  },
  render: () => (
    <div className="mdt-flex mdt-w-[560px] mdt-flex-col mdt-gap-6">
      <ClosableDemo type="underline" />
      <ClosableDemo type="filled" />
    </div>
  ),
};

const EditableDemo = ({ type }: { type: TabsType }) => {
  const editable = useEditableTabs({
    initialTabs: [
      { id: 'view-1', label: 'All users' },
      { id: 'view-2', label: 'Admins' },
    ],
    newTabLabel: (n) => `View ${String(n)}`,
  });
  return (
    <Tabs value={editable.active} onValueChange={editable.setActive}>
      <TabsList type={type}>
        {editable.tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            closable={editable.canClose(tab.id)}
            onClose={() => {
              editable.close(tab.id);
            }}
          >
            {tab.label}
          </TabsTrigger>
        ))}
        <TabsAdd onClick={editable.add} />
      </TabsList>
      {editable.tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <Text>{tab.label}: a saved view. Close it and the selection moves to its neighbour.</Text>
        </TabsContent>
      ))}
    </Tabs>
  );
};

/**
 * TabsAdd is a 32 square with a 16 plus at the end of the list; not a tab, so
 * the arrow keys skip it (K-Tabs-22). `useEditableTabs` holds the rules: a new
 * tab is selected at once; closing the active one selects its right-hand
 * neighbour, or the left one if it was last; the last tab cannot be closed.
 */
export const WithAdd: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'TabsAdd, a 32 square with a 16 plus at the end of the list; not a tab, so the arrow keys skip it (K-Tabs-22). With `useEditableTabs` the bar behaves the same everywhere: a new tab is selected the moment it is made; closing the tab you are on selects its right-hand neighbour, or the left one if it was last; closing any other tab changes nothing; the last tab cannot be closed.',
      },
    },
  },
  render: () => (
    <div className="mdt-flex mdt-w-[560px] mdt-flex-col mdt-gap-6">
      <EditableDemo type="underline" />
      <EditableDemo type="filled" />
    </div>
  ),
};
