import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { AdvancedFilter, applyAdvanced, countConditions, EMPTY_FILTER } from './AdvancedFilter';
import type { FilterKey, FilterValue } from './AdvancedFilter.types';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

/**
 * The "More filters" panel: rows of key · operator · value that stack, and
 * groups of them. Ruled on the Users list (2026-09-17 → 20) and built there
 * first; this is the same panel as a library part.
 */
const meta: Meta<typeof AdvancedFilter> = {
  title: 'Components/AdvancedFilter',
  component: AdvancedFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Key · operator · value rows that stack; the one And / Or switch on the second row; a key with options takes many values; a key is used once; a row can become a group with its own And / Or. Apply, or Enter, hands the page a filter to run through applyAdvanced().',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AdvancedFilter>;

/* ── a small list to filter ── */
interface Person {
  name: string;
  email: string;
  role: string;
  team: string;
  source: 'Manual' | 'LDAP' | 'SCIM';
  org: string;
  vip: boolean;
  lastLogin: Date | null;
}
const daysAgo = (n: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};
const PEOPLE: Person[] = [
  {
    name: 'Michael Smith',
    email: 'michael.smith@company.com',
    role: 'Account Manager',
    team: 'HR Manager',
    source: 'Manual',
    org: 'Acme Corp',
    vip: true,
    lastLogin: daysAgo(0),
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'Approver',
    team: 'Developer - Full Stack',
    source: 'LDAP',
    org: 'Beta Innovations',
    vip: false,
    lastLogin: daysAgo(2),
  },
  {
    name: 'Ava Thompson',
    email: 'ava.thompson@company.com',
    role: 'Client Operator',
    team: 'UX Designer',
    source: 'LDAP',
    org: 'Acme Corp',
    vip: false,
    lastLogin: daysAgo(9),
  },
  {
    name: 'Noah White',
    email: 'noah.white@company.com',
    role: 'Client Technician',
    team: 'Product Owner',
    source: 'LDAP',
    org: 'Gamma Ltd',
    vip: false,
    lastLogin: daysAgo(1),
  },
  {
    name: 'Owen Green',
    email: 'owen.green@company.com',
    role: 'Content Strategist',
    team: 'Data Scientist',
    source: 'SCIM',
    org: 'Beta Innovations',
    vip: true,
    lastLogin: daysAgo(30),
  },
  {
    name: 'Reyansh Patel',
    email: 'reyansh.patel@company.com',
    role: 'Data Scientist',
    team: 'Marketing Specialist',
    source: 'Manual',
    org: 'Acme Corp',
    vip: false,
    lastLogin: null,
  },
  {
    name: 'Zoya Patel',
    email: 'zoya.patel@company.com',
    role: 'Developer - Full Stack',
    team: 'Product Manager',
    source: 'Manual',
    org: 'Gamma Ltd',
    vip: false,
    lastLogin: daysAgo(4),
  },
  {
    name: 'Diya Iyer',
    email: 'diya.iyer@company.com',
    role: 'End User',
    team: 'UX Designer',
    source: 'Manual',
    org: 'Beta Innovations',
    vip: false,
    lastLogin: daysAgo(12),
  },
  {
    name: 'Vihaan Iyer',
    email: 'vihaan.iyer@company.com',
    role: 'Finance',
    team: 'Support Ops',
    source: 'SCIM',
    org: 'Acme Corp',
    vip: true,
    lastLogin: daysAgo(0),
  },
  {
    name: 'Aditya Iyer',
    email: 'aditya.iyer@company.com',
    role: 'Account Manager',
    team: 'Developer - Full Stack',
    source: 'LDAP',
    org: 'Gamma Ltd',
    vip: false,
    lastLogin: daysAgo(60),
  },
  {
    name: 'Isha Khan',
    email: 'isha.khan@company.com',
    role: 'Approver',
    team: 'Contractors',
    source: 'Manual',
    org: 'Beta Innovations',
    vip: false,
    lastLogin: daysAgo(3),
  },
  {
    name: 'Arjun Khan',
    email: 'arjun.khan@company.com',
    role: 'End User',
    team: 'Interns',
    source: 'SCIM',
    org: 'Acme Corp',
    vip: false,
    lastLogin: null,
  },
];
const uniq = (pick: (p: Person) => string): string[] => [...new Set(PEOPLE.map(pick))].sort();
const KEYS: FilterKey<Person>[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'text' },
  { id: 'role', label: 'Role', type: 'pick', options: uniq((p) => p.role) },
  { id: 'team', label: 'Team', type: 'pick', options: uniq((p) => p.team) },
  { id: 'source', label: 'Source of truth', type: 'pick', options: ['Manual', 'LDAP', 'SCIM'] },
  { id: 'org', label: 'Organization', type: 'pick', options: uniq((p) => p.org) },
  {
    id: 'vip',
    label: 'VIP',
    type: 'pick',
    options: ['Yes', 'No'],
    get: (p) => (p.vip ? 'Yes' : 'No'),
  },
  { id: 'lastLogin', label: 'Last login', type: 'date' },
];

/* the door, the panel under it, and the list that follows */
function Demo({
  initial = EMPTY_FILTER,
  startOpen = true,
}: {
  initial?: FilterValue;
  startOpen?: boolean;
}) {
  const [applied, setApplied] = useState<FilterValue>(initial);
  const [open, setOpen] = useState(startOpen);
  const shown = useMemo(() => applyAdvanced(PEOPLE, applied, KEYS), [applied]);
  const count = countConditions(applied);
  return (
    <div className="mdt-flex mdt-flex-col mdt-gap-4" style={{ minHeight: 560 }}>
      <div className="mdt-flex mdt-items-center mdt-gap-2.5">
        {/* the door and the panel share one relative wrapper: the panel hangs 40 under the door's top, on its left edge */}
        <span className="mdt-relative mdt-inline-flex">
          <Button
            variant="outline"
            leftIcon={<Icon name="sliders-horizontal" size={16} />}
            onClick={() => {
              setOpen((v) => !v);
            }}
          >
            More filters
            {count > 0 && (
              <Badge tone="neutral" size="sm">
                {count}
              </Badge>
            )}
          </Button>
          <AdvancedFilter<Person>
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            keys={KEYS}
            value={applied}
            onApply={setApplied}
          />
        </span>
        <span className="mdt-ml-auto mdt-text-xs mdt-text-neutral-90">
          {count ? String(count) + (count === 1 ? ' filter · ' : ' filters · ') : ''}
          {shown.length} of {PEOPLE.length} people
        </span>
      </div>
      <table className="mdt-w-full mdt-border-collapse mdt-text-[13px]">
        <thead>
          <tr className="mdt-bg-neutral-10 mdt-text-left mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-[0.04em] mdt-text-neutral-90">
            {['Name', 'Role', 'Team', 'Source', 'Organization'].map((h) => (
              <th
                key={h}
                className="mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2 mdt-font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shown.map((p) => (
            <tr key={p.email}>
              <td className="mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-foreground">
                {p.name}
              </td>
              <td className="mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90">
                {p.role}
              </td>
              <td className="mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90">
                {p.team}
              </td>
              <td className="mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90">
                {p.source}
              </td>
              <td className="mdt-border-b mdt-border-neutral-20 mdt-px-3 mdt-py-2.5 mdt-text-neutral-90">
                {p.org}
              </td>
            </tr>
          ))}
          {shown.length === 0 && (
            <tr>
              <td colSpan={5} className="mdt-px-3 mdt-py-6 mdt-text-center mdt-text-neutral-90">
                Nobody matches these filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/** The panel open on one empty row: Where · Select key · Select operator · Select value. */
export const Empty: Story = {
  render: () => <Demo />,
};

/** The worked example from the mock: Team is three teams · And a group (Source of truth is LDAP · Or Organization is Beta Innovations). */
export const WorkedExample: Story = {
  render: () => (
    <Demo
      initial={{
        join: 'and',
        rows: [
          {
            key: 'team',
            op: 'is',
            value: ['UX Designer', 'Developer - Full Stack', 'Data Scientist'],
          },
          {
            group: true,
            join: 'or',
            rows: [
              { key: 'source', op: 'is', value: ['LDAP'] },
              { key: 'org', op: 'is', value: ['Beta Innovations'] },
            ],
          },
        ],
      }}
    />
  ),
};

/** Closed, with two conditions applied: the door counts them and the list is already narrowed. */
export const Applied: Story = {
  render: () => (
    <Demo
      startOpen={false}
      initial={{
        join: 'and',
        rows: [
          { key: 'vip', op: 'is', value: ['Yes'] },
          { key: 'lastLogin', op: 'within', value: '7' },
        ],
      }}
    />
  ),
};
