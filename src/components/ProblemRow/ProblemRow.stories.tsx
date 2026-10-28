import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { Card, CardBody, CardHeader } from '../Card';
import { ProblemList, ProblemRow } from './ProblemRow';

const meta: Meta<typeof ProblemRow> = {
  title: 'New Components/ProblemRow',
  component: ProblemRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One problem in a **Needs attention** list: a round tile tinted by how bad it is, what the problem is (a leading count in semibold), one line of detail, and **View** at the right end while the row is hovered or focused. **The whole row is the button** - there is no separate View button.',
          '',
          'Rows stack in a `ProblemList`, worst first, a hairline between each; the hairline hides under a hovered row so the wash never sits on a line. Inside a card body the rows bleed 10px into its padding, so the tiles line up with the heading.',
          '',
          'The tile says only **how bad**: danger a rose octagon, warning an amber triangle, info a blue info mark - the banners’ own three glyphs. The words say what it is. Pass `icon` only where the problem has its own icon platform-wide.',
          '',
          '**Ported from the console (Pranjal, 2026-10-28)**: Agent Fleet and Collector Fleet’s Health tab, `issueRow` in `health/Overview.tsx` and `.hl-row` in `health.css`.',
        ].join('\n'),
      },
    },
  },
  args: {
    severity: 'warning',
    title: '125 hosts with a crashing module',
    detail: 'Metrics on 40 · Logs on 30 · Patch on 19',
    onClick: fn(),
  },
  argTypes: {
    severity: { control: 'inline-radio', options: ['danger', 'warning', 'info'] },
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The card the console puts the list in: Needs attention, the rows, View all under them. */
const AttentionCard = ({ children, more }: { children: ReactNode; more?: ReactNode }) => (
  <Card className="mdt-w-[436px] mdt-max-w-full mdt-rounded-xl">
    <CardHeader plain heading="Needs attention" />
    <CardBody className="mdt-flex mdt-flex-col mdt-gap-2.5">
      {children}
      {more}
    </CardBody>
  </Card>
);

export const Default: Story = {
  render: (args) => (
    <AttentionCard>
      <ProblemList>
        <ProblemRow {...args} />
      </ProblemList>
    </AttentionCard>
  ),
};

/** The Health tab's card: the worst four, then View all as an outline button the card's width. */
export const NeedsAttention: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AttentionCard
      more={
        <Button variant="outline" className="mdt-w-full">
          View all 6
        </Button>
      }
    >
      <ProblemList>
        <ProblemRow
          severity="danger"
          title="41 agents not reporting"
          detail="3 heartbeats missed · 18 for more than a day"
          aria-label="41 agents not reporting. Critical. Open its agents."
        />
        <ProblemRow
          severity="warning"
          title="125 hosts with a crashing module"
          detail="Metrics on 40 · Logs on 30 · Patch on 19"
          aria-label="125 hosts with a crashing module. Warning. Open its agents."
        />
        <ProblemRow
          severity="warning"
          title="26 agents holding data"
          detail="Cannot reach the platform · 348,117 events waiting to be sent"
          aria-label="26 agents holding data. Warning. Open its agents."
        />
        <ProblemRow
          severity="info"
          title="212 agents behind the current version"
          detail="On 4.11 or older · the current version is 4.12.2"
          aria-label="212 agents behind the current version. Notice. Open its agents."
        />
      </ProblemList>
    </AttentionCard>
  ),
};

/** One of each level: the tile's tint and glyph are the only things that change. */
export const Severities: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AttentionCard>
      <ProblemList>
        <ProblemRow
          severity="danger"
          title="9 collectors down"
          detail="Network zone eu-west · since 14:20"
        />
        <ProblemRow
          severity="warning"
          title="3 collectors over capacity"
          detail="Load above 90% for an hour"
        />
        <ProblemRow
          severity="info"
          title="A collector isn't placed in a network zone"
          detail="col-ams-01 takes no work"
        />
      </ProblemList>
    </AttentionCard>
  ),
};

/** The pointer on the second row: the accent wash, View underlined at the right, and no hairline above or below it. */
export const Hovered: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AttentionCard>
      <ProblemList>
        <ProblemRow
          severity="warning"
          title="125 hosts with a crashing module"
          detail="Metrics on 40 · Logs on 30 · Patch on 19"
        />
        <ProblemRow
          severity="warning"
          title="32 agents silent"
          detail="18 silent for more than a day · the longest for 47h"
        />
        <ProblemRow
          severity="warning"
          title="26 agents holding data"
          detail="Cannot reach the platform · 348,117 events waiting"
        />
      </ProblemList>
    </AttentionCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button', { name: /32 agents silent/ }));
  },
};

/** A long title and a long detail: each stays on one line, cut with an ellipsis, the whole of it on hover. */
export const LongWords: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AttentionCard>
      <ProblemList>
        <ProblemRow
          severity="danger"
          title="1,204 agents on hosts that have not reported a heartbeat since the last maintenance window"
          detail="Network zones eu-west-1, eu-west-2, ap-south-1, us-east-1 and 14 more · the longest silent for 9 days"
        />
      </ProblemList>
    </AttentionCard>
  ),
};

/** Pressing a row opens its list - here, the count of presses. */
export const Pressing: Story = {
  parameters: { controls: { disable: true } },
  render: function PressingStory() {
    const [opened, setOpened] = useState<string | null>(null);
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <AttentionCard>
          <ProblemList>
            <ProblemRow
              severity="warning"
              title="32 agents silent"
              detail="18 for more than a day"
              onClick={() => {
                setOpened('32 agents silent');
              }}
            />
            <ProblemRow
              severity="info"
              title="212 agents behind"
              detail="On 4.11 or older"
              onClick={() => {
                setOpened('212 agents behind');
              }}
            />
          </ProblemList>
        </AttentionCard>
        <p className="mdt-text-sm mdt-text-muted-foreground" role="status">
          {opened ? `Opened: ${opened}` : 'Nothing opened yet'}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /212 agents behind/ }));
    await expect(canvas.getByRole('status')).toHaveTextContent('Opened: 212 agents behind');
  },
};
