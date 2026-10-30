import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { OverflowTip } from './OverflowTip';

const meta: Meta<typeof OverflowTip> = {
  title: 'New Components/OverflowTip',
  component: OverflowTip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Anything cut short with "…" shows its full text in the library tooltip when the pointer rests on it.',
          'A line clamp works the same. Text that fits gets nothing.',
          '',
          '**Mount it once, near the root of the app** - no cell, label or name has to be wrapped. It looks at the',
          'element under the pointer and up to four of its parents for text the layout cut, so an ellipsis set on a',
          'cell, a link or a span inside them is found either way.',
          '',
          'It stands aside where a tooltip already explains the thing - inside a tooltip, or on a trigger that opens its',
          'own - and inside anything marked `data-no-overflow-tip` (a field with its own way to show the whole value).',
          '',
          '**Ported from the console\'s OverflowTip (Pranjal, 2026-10-15)**: "if something is truncated anywhere give',
          'tooltip on hover to show the full value".',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const FIRST = 'Northwind Retail - Eastern region distribution centre';
const ROWS = [FIRST, 'Acme Health Partners', 'Contoso Logistics and Warehousing (Rotterdam)'];

const Page = ({ children }: { children: ReactNode }) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-6 mdt-pt-16 mdt-text-foreground">
    {children}
    <OverflowTip />
  </div>
);

const NameColumn = () => (
  <ul
    className="mdt-m-0 mdt-flex mdt-w-56 mdt-list-none mdt-flex-col mdt-gap-2 mdt-p-0"
    aria-label="Organizations"
  >
    {ROWS.map((name) => (
      <li key={name} className="mdt-truncate mdt-text-sm" data-testid="row">
        {name}
      </li>
    ))}
  </ul>
);

/** A column of names in a narrow box: the first and last are cut and show whole on hover; the middle one fits. */
export const Default: Story = {
  render: () => (
    <Page>
      <NameColumn />
    </Page>
  ),
};

/** The pointer resting on a cut name: the whole of it, in the library tooltip, read from the left. */
export const Hovered: Story = {
  render: () => (
    <Page>
      <NameColumn />
    </Page>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText(FIRST));
    await waitFor(async () => {
      await expect(document.querySelector('.tt')).toHaveTextContent(FIRST);
    });
  },
};

/** A two-line clamp: the paragraph past its second line shows whole on hover. */
export const LineClamp: Story = {
  render: () => (
    <Page>
      <p className="mdt-m-0 mdt-line-clamp-2 mdt-w-72 mdt-text-sm" data-testid="clamp">
        Restarts the agent on every host in the ring, one host at a time, waiting for each to report
        healthy before the next one starts. Hosts that do not come back within ten minutes are held
        and listed for you.
      </p>
    </Page>
  ),
};

/** Inside `data-no-overflow-tip` nothing opens - for a part that shows its whole value its own way. */
export const StandsAside: Story = {
  render: () => (
    <Page>
      <div data-no-overflow-tip className="mdt-w-56">
        <span className="mdt-block mdt-truncate mdt-text-sm" data-testid="aside">
          {FIRST}
        </span>
      </div>
    </Page>
  ),
};
