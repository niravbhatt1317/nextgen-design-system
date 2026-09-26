import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';
import { Table } from './Table';
import { TableBulkAction, TableBulkBar, TableBulkSeparator } from './TableBulkBar';
import { PersonCell } from './TableCells';
import { sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';

const USERS = sampleUsers(30);

function Users(props: Partial<React.ComponentProps<typeof DataTable<SampleUser>>>) {
  return (
    <DataTable<SampleUser>
      label="Users"
      noun="users"
      rows={USERS}
      getRowId={(u) => u.id}
      nameColumn={{ cell: (u) => <PersonCell name={u.name} /> }}
      columns={[{ key: 'email', label: 'Email', cell: (u) => u.email }]}
      isRowInert={(u) => u.status === 'Invited'}
      bulkActions={() => (
        <>
          <TableBulkAction>Activate</TableBulkAction>
          <TableBulkSeparator />
          <TableBulkAction>Delete</TableBulkAction>
        </>
      )}
      {...props}
    />
  );
}

const pickAll = () =>
  userEvent.click(screen.getByRole('checkbox', { name: 'Select all on this page' }));
const bar = () => screen.getByRole('region', { name: 'Selection' });
/** The 0px hook the bar hangs from: the card's child, the bar's parent. */
const hook = () => {
  const h = bar().parentElement;
  if (h === null) throw new Error('the bar has no hook');
  return h;
};

/* WHERE THE BAR HANGS FROM (2026-09-26): on a real page the card runs past the bottom of the window, and a bar hung
 * 62px above the card's end sat below the fold. jsdom lays nothing out, so this reads the classes that decide it. */
describe(
  'the bulk bar hangs from the page, or from the card once the card is the page',
  { timeout: 20000 },
  () => {
    it('on a page: a hook with no height, laid out last, sticky at the bottom; the bar 62px up inside it', async () => {
      render(<Users />);
      await pickAll();
      expect(hook()).toHaveAttribute('data-anchor', 'page');
      expect(hook()).toHaveClass(
        'mdt-sticky',
        'mdt-bottom-0',
        'mdt-h-0',
        'mdt-order-1',
        'mdt-w-full'
      );
      /* the hook is the card's own child, so the card is its containing block and the page its scroller */
      expect(hook().parentElement).toHaveClass('tbl');
      expect(bar()).toHaveClass('mdt-absolute', 'mdt-bottom-[62px]', 'mdt-left-1/2');
    });

    it('docked - the card is the page, its rows scroll inside it: the hook stands still and the bar hangs from the card', async () => {
      render(<Users docked maxHeight={520} />);
      await pickAll();
      expect(hook()).toHaveAttribute('data-anchor', 'card');
      expect(hook()).not.toHaveClass('mdt-sticky');
      expect(hook()).toHaveClass('mdt-h-0', 'mdt-order-1');
      expect(bar()).toHaveClass('mdt-absolute', 'mdt-bottom-[62px]');
    });

    it('while the page is still scrolling the card to its dock line, the bar follows the page', async () => {
      render(<Users docked={0.5} maxHeight={520} />);
      await pickAll();
      expect(hook()).toHaveAttribute('data-anchor', 'page');
      expect(hook()).toHaveClass('mdt-sticky');
    });

    it('a hand-built card may write the bar before the pager: the hook still lays out last', () => {
      render(
        <Table label="Users" expand={false}>
          <div className="tbl-viewport" />
          <TableBulkBar count={2} onClear={() => undefined}>
            <TableBulkAction>Activate</TableBulkAction>
          </TableBulkBar>
          <div className="tbl-foot" />
        </Table>
      );
      expect(hook()).toHaveClass('mdt-order-1');
      expect(hook()).toHaveAttribute('data-anchor', 'page');
    });

    it('keeps everything in the bar: the count read aloud, the actions, the separator, the clear button', async () => {
      render(<Users />);
      await pickAll();
      const selectable = USERS.slice(0, 25).filter((u) => u.status !== 'Invited').length;
      expect(screen.getByText(`${String(selectable)} selected`)).toHaveAttribute(
        'aria-live',
        'polite'
      );
      expect(screen.getByRole('button', { name: 'Activate' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
      expect(bar().querySelectorAll(':scope > span[aria-hidden="true"]')).toHaveLength(2);
      await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
      expect(screen.queryByRole('region', { name: 'Selection' })).not.toBeInTheDocument();
      expect(document.querySelector('.tbl-bulk')).toBeNull();
    });
  }
);
