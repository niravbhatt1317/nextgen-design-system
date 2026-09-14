import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { KpiCard } from './KpiCard';
import type { KpiMetricProps } from './KpiCard.types';
import { KpiBars, KpiGauge } from './KpiCharts';

// The card's props are a union (one metric, or `items`); the controls table follows the single-metric shape.
const meta: Meta<KpiMetricProps> = {
  title: 'Components/KPI Card',
  component: KpiCard as React.ComponentType<KpiMetricProps>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '**Behaviour reference — Claude artifacts:** [KPI Card](https://claude.ai/code/artifact/c3071fdf-27df-4e5a-8a29-b8de2bea769d) and [KPI Group](https://claude.ai/code/artifact/e93baf81-b8e3-4264-b2a8-d7ec6f717c22), live pages showing how the card and the group behave. Open them to see the intended behaviour — they are what this component was designed and approved from.',
          '',
          'One metric on one card: a label, a big number, one quiet line of context. It can carry a trend chip, and it has an area kept for a chart. By default it is a plain fact. Clickable is a switch that can be turned on for any card, chip or chart included; then it says so on hover.',
          'Give it `items` instead of one metric and it becomes a group: two or more related metrics sharing one card, split by inset hairlines. Each segment is a whole card with its own switch.',
          'Widths: a plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural; a group is the sum. In a KpiStrip the cards grow evenly until the row is full and the strip scrolls past the fit. Dark mode comes from the theme toggle.',
        ].join('\n\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-6">{children}</div>
);

/** A plain card at its 174 floor: label, value, supporting line. A number is rounded to one decimal with k or M. */
export const Default: Story = {
  args: { label: 'Total users', value: 8200, hint: 'across all organisations' },
};

/** Whole numbers, no supporting line, a wider card. On its own a card sits at the floor unless given a width. */
export const Variations: Story = {
  render: () => (
    <Row>
      <KpiCard label="Dormant users" value={256} hint="no sign-in in 90+ days" />
      <KpiCard label="Active users" value={7640} />
      <KpiCard
        label="Total users"
        value={8200}
        hint="across all organisations"
        style={{ width: 220 }}
      />
    </Row>
  ),
};

/** The verdict lives only in the chip: fill, no outline, an arrow up or down. Four tones by meaning. It renders only when the data carries a change. */
export const WithTrendChip: Story = {
  render: () => (
    <Row>
      <KpiCard
        label="Active users"
        value={7640}
        hint="93% of total"
        delta={{ label: '3.1%', direction: 'up', tone: 'good' }}
      />
      <KpiCard
        label="Failed sign-ins"
        value={142}
        hint="last 24 hours"
        delta={{ label: '12%', direction: 'up', tone: 'bad' }}
      />
      <KpiCard
        label="Privileged accounts"
        value={12}
        hint="admin / elevated"
        delta={{ label: '4.5%', direction: 'up', tone: 'caution' }}
      />
      <KpiCard
        label="Pending invites"
        value={11}
        hint="awaiting acceptance"
        delta={{ label: '2', direction: 'down', tone: 'flat' }}
      />
    </Row>
  ),
};

/** The right side of the card is kept for a chart and nothing else. KpiGauge and KpiBars are the first two; any chart drawn to fit 104 × 62 can go there. A chart card has no floor; the chart keeps its size and the text side gives way first. */
export const WithChart: Story = {
  render: () => (
    <Row>
      <KpiCard
        label="Licensed users limit"
        value={8200}
        hint="10k allowed"
        chart={<KpiGauge percent={82} caption="capacity" />}
      />
      <KpiCard
        label="Anomalous growth"
        value={47}
        hint="users in last 24h"
        chart={<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />}
      />
    </Row>
  ),
};

/** Off by default. With a click the card is a real button, whatever it holds: on hover or keyboard focus the label takes the reading ink and a dotted underline, a gear appears beside it, a soft fill sits 6px inside the edges, and the card presses to 97%. */
export const Clickable: Story = {
  render: function ClickableStory() {
    const [note, setNote] = useState('Click a card.');
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Row>
          <KpiCard
            label="Pending invites"
            value={11}
            hint="awaiting acceptance"
            onClick={() => {
              setNote('Pending invites: the Invitations drawer opens on its Pending tab.');
            }}
          />
          <KpiCard
            label="Privileged accounts"
            value={12}
            hint="admin / elevated"
            delta={{ label: '4.5%', direction: 'up', tone: 'caution' }}
            onClick={() => {
              setNote('Privileged accounts: the list, filtered to privileged roles.');
            }}
          />
          <KpiCard
            label="Licensed users limit"
            value={8200}
            hint="10k allowed"
            chart={<KpiGauge percent={82} caption="capacity" />}
            onClick={() => {
              setNote('Licensed users limit: the licence page.');
            }}
          />
        </Row>
        <p className="mdt-m-0 mdt-text-xs mdt-text-muted-foreground" aria-live="polite">
          {note}
        </p>
      </div>
    );
  },
};

/** The label truncates with an ellipsis at the card's width and never wraps; the supporting line does the same. The number never shrinks. */
export const LongLabel: Story = {
  render: () => (
    <Row>
      <KpiCard
        label="Accounts without multi-factor authentication"
        value={1204}
        hint="across every organisation in the tenant"
      />
      <KpiCard
        label="Accounts without multi-factor authentication"
        value={1204}
        hint="across every organisation in the tenant"
        style={{ width: 270 }}
      />
    </Row>
  ),
};

/** Two related metrics sharing one card: the Users invitations pair. One hairline, 12px clear of the edges. */
export const Group: Story = {
  render: () => (
    <KpiCard
      label="Invitations"
      items={[
        { label: 'Pending invites', value: 11, hint: 'awaiting acceptance' },
        { label: 'Active invitation links', value: 4, hint: '37 issued' },
      ]}
    />
  ),
};

/** As many segments as belong together; chips ride inside segments like anywhere else. */
export const GroupOfFour: Story = {
  render: () => (
    <KpiCard
      label="Members"
      items={[
        { label: 'Total', value: 68, hint: 'members' },
        {
          label: 'Active',
          value: 48,
          hint: 'signed in this month',
          delta: { label: '6%', direction: 'up', tone: 'good' },
        },
        { label: 'Inactive', value: 10, hint: 'no sign-in in 90+ days' },
        {
          label: 'Pending invites',
          value: 10,
          hint: 'awaiting acceptance',
          delta: { label: '2', direction: 'down', tone: 'flat' },
        },
      ]}
    />
  ),
};

/** A segment may carry a chart in its chart area, exactly as a single card does. */
export const GroupWithCharts: Story = {
  render: () => (
    <KpiCard
      label="Capacity"
      items={[
        { label: 'Active users', value: 7640, hint: '8.2k total' },
        {
          label: 'Licensed users limit',
          value: 8200,
          hint: '10k allowed',
          chart: <KpiGauge percent={82} caption="capacity" />,
        },
        {
          label: 'Anomalous growth',
          value: 47,
          hint: 'users in last 24h',
          chart: <KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />,
        },
      ]}
    />
  ),
};

/** Each segment has its own switch. A clickable segment shows the cue on its own; its neighbours do not react and the outer card never lifts. */
export const GroupClickable: Story = {
  render: function GroupClickableStory() {
    const [note, setNote] = useState('Click a segment.');
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <KpiCard
          label="Invitations"
          items={[
            {
              label: 'Pending invites',
              value: 11,
              hint: 'awaiting acceptance',
              onClick: () => {
                setNote('Pending invites: the drawer opens on its Pending tab.');
              },
            },
            {
              label: 'Active invitation links',
              value: 4,
              hint: '37 issued',
              onClick: () => {
                setNote('Active invitation links: the drawer opens on its Links tab.');
              },
            },
            { label: 'Expired links', value: 2, hint: 'this month' },
          ]}
        />
        <p className="mdt-m-0 mdt-text-xs mdt-text-muted-foreground" aria-live="polite">
          {note}
        </p>
      </div>
    );
  },
};
