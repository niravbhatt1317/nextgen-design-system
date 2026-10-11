import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from '../Badge';
import type { FilterKey } from '../AdvancedFilter';
import { DataTable } from './DataTable';
import { PersonCell } from './TableCells';
import { sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDef } from './Table.types';

/* QUICK FILTERS ARE DISABLED UNDER AN ADVANCED FILTER - disabled, not hidden (Pranjal, 2026-09-27: "make quick filter
 * disabled instead of disappearing them"; the day before, 2026-09-26, they hid: "whenever I apply an advanced filter,
 * the quick filters won't be visible. All the quick-filter options, like Status and Organisation, which we removed
 * before from the advanced filter, will all be visible inside the advanced filter now, because the quick filters will
 * be hidden." - that quote is history). These tests hold the table to the rule: the square is there and live at rest,
 * still there but disabled while a row is applied - no menu, a bubble that says where to set it - and live again on
 * Clear all; a tick in the square rides into the applied rows; a quick key the page forgot to list is never dropped. */

/** The words on the disabled square's bubble. */
const HINT = 'Set inside More filters while a filter is applied';

const USERS = sampleUsers(40);
const ACTIVE = USERS.filter((u) => u.status === 'Active').length;
const INACTIVE = USERS.filter((u) => u.status === 'Inactive').length;
const COLS: TableColumnDef<SampleUser>[] = [
  { key: 'email', label: 'Email', sortable: true, cell: (u) => u.email },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    cell: (u) => <Badge size="sm">{u.status}</Badge>,
  },
  { key: 'role', label: 'Role', cell: (u) => u.role },
];
const STATUS = ['Active', 'Inactive', 'Invited'];
const ROLE_KEY: FilterKey<SampleUser> = {
  id: 'role',
  label: 'Role',
  type: 'pick',
  options: ['Admin', 'Member', 'Viewer', 'Billing'],
};
const EMAIL_KEY: FilterKey<SampleUser> = { id: 'email', label: 'Email', type: 'text' };
const STATUS_KEY: FilterKey<SampleUser> = {
  id: 'status',
  label: 'Status',
  type: 'pick',
  options: STATUS,
};
/* the page did its homework: the quick filter's key is among the advanced keys */
const KEYS_WITH_STATUS = [EMAIL_KEY, STATUS_KEY, ROLE_KEY];
/* the page forgot: Status is a quick filter but not a key */
const KEYS_WITHOUT_STATUS = [EMAIL_KEY, ROLE_KEY];

function Users(props: Partial<React.ComponentProps<typeof DataTable<SampleUser>>>) {
  return (
    <DataTable<SampleUser>
      label="Users"
      noun="users"
      rows={USERS}
      getRowId={(u) => u.id}
      nameColumn={{ sortValue: (u) => u.name, cell: (u) => <PersonCell name={u.name} /> }}
      columns={COLS}
      pageSize={100}
      quickFilter={{
        columnKey: 'status',
        label: 'Filter by status',
        options: STATUS,
        value: (u) => u.status,
      }}
      advancedFilter={{ keys: KEYS_WITH_STATUS }}
      {...props}
    />
  );
}

const square = () => screen.queryByRole('button', { name: /^Filter by status/ });
const door = () => screen.getByRole('button', { name: /More filters/ });
const rowCount = () =>
  screen.getByRole('table', { name: 'Users' }).querySelectorAll('tbody tr.tbl-row').length;
const doorCount = () =>
  within(door()).queryByTestId('toolbar-button-count')?.textContent?.trim() ?? '';

/** Tick one value in the Status square and close its menu. */
async function tickStatus(user: ReturnType<typeof userEvent.setup>, value: string) {
  await user.click(square() as HTMLElement);
  await user.click(await screen.findByRole('menuitemcheckbox', { name: value }));
  await user.keyboard('{Escape}');
}

/** Open the panel, fill its blank row with "Email contains <text>" and Apply. A text key: the row the panel builds
 * itself, with no list to pick from. */
async function applyEmailContains(user: ReturnType<typeof userEvent.setup>, text: string) {
  await user.click(door());
  const panel = await screen.findByRole('dialog', { name: 'Filters' });
  const fields = within(panel).getAllByRole('combobox');
  await user.click(fields[0] as HTMLElement);
  await user.click(await screen.findByRole('option', { name: 'Email' }));
  await user.click(within(panel).getAllByRole('combobox')[1] as HTMLElement);
  await user.click(await screen.findByRole('option', { name: 'contains' }));
  await user.type(within(panel).getByPlaceholderText('Type a value'), text);
  await user.click(within(panel).getByRole('button', { name: /^Apply/ }));
}

/** Open the panel and press Clear all: the advanced filter goes back to empty. */
async function clearAll(user: ReturnType<typeof userEvent.setup>) {
  await user.click(door());
  const panel = await screen.findByRole('dialog', { name: 'Filters' });
  await user.click(within(panel).getByRole('button', { name: 'Clear all' }));
}

/** The square's wrapper - the Tooltip's trigger, a span around the button (a disabled button takes no pointer). */
const wrapper = () => (square() as HTMLElement).parentElement as HTMLElement;

/** What a browser sends when the square is pressed: the pointer's own event, not user-event's (which refuses a
 * disabled button outright). React lets pointer and key events through to a disabled button, so these reach the Radix
 * trigger's guard - the thing under test. */
function press(el: HTMLElement) {
  fireEvent.pointerDown(el, { button: 0, ctrlKey: false, pointerType: 'mouse' });
  fireEvent.keyDown(el, { key: 'Enter' });
  fireEvent.keyDown(el, { key: 'ArrowDown' });
}

beforeEach(() => localStorage.clear());

describe(
  'DataTable: quick filters are disabled under an advanced filter',
  { timeout: 30000 },
  () => {
    it('draws the Status square at rest, live, beside the More filters door', () => {
      render(<Users />);
      expect(square()).toBeInTheDocument();
      expect(square()).toBeEnabled();
      expect(square()).not.toHaveAttribute('aria-disabled');
      expect(door()).toBeInTheDocument();
      expect(rowCount()).toBe(USERS.length);
    });

    it('disables the square once an advanced row is applied - still in the strip - and wakes it on Clear all', async () => {
      const user = userEvent.setup();
      render(<Users />);
      await applyEmailContains(user, 'a');
      expect(doorCount()).toBe('1');
      expect(square()).toBeInTheDocument();
      expect(square()).toBeDisabled();
      expect(square()).toHaveAttribute('aria-disabled', 'true');
      expect(square()).toHaveAttribute('aria-label', 'Filter by status');
      expect(screen.getByRole('columnheader', { name: /Status/ })).not.toHaveAttribute(
        'data-filtered',
        'true'
      );
      await clearAll(user);
      expect(doorCount()).toBe('');
      expect(square()).toBeEnabled();
      expect(square()).not.toHaveAttribute('aria-disabled');
      expect(square()).not.toHaveAttribute('data-active', 'true');
      expect(rowCount()).toBe(USERS.length);
    });

    it('a disabled square opens no menu, by pointer or by key', async () => {
      const user = userEvent.setup();
      render(<Users />);
      /* the control: the same press on the live square does open it */
      press(square() as HTMLElement);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
      await applyEmailContains(user, 'a');
      expect(square()).toBeDisabled();
      press(square() as HTMLElement);
      await act(() => new Promise((r) => setTimeout(r, 50)));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(screen.queryByRole('menuitemcheckbox', { name: 'Active' })).not.toBeInTheDocument();
    });

    it('says where to set it: the disabled square shows the bubble on hover and on keyboard focus, never while live', async () => {
      const user = userEvent.setup();
      render(<Users />);
      /* live: the wrapper is out of the tab order and hovering it shows no bubble */
      expect(wrapper()).not.toHaveAttribute('tabindex');
      await user.hover(wrapper());
      await act(() => new Promise((r) => setTimeout(r, 250)));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      await user.unhover(wrapper());
      await applyEmailContains(user, 'a');
      /* held: the pointer resting on the square (its wrapper takes the hover) opens the bubble with the words */
      expect(square()).toBeDisabled();
      expect(wrapper()).toHaveAttribute('tabindex', '0');
      await user.hover(wrapper());
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toHaveTextContent(HINT);
      });
      /* the pointer moves off: in a browser the bubble closes on the pointer's next move outside its grace area, an
       * event jsdom never sends - Escape is the bubble's other way out and closes it here */
      await user.unhover(wrapper());
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
      /* held: keyboard focus opens it too, and the words describe the wrapper for a screen reader */
      act(() => {
        wrapper().focus();
      });
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toHaveTextContent(HINT);
      });
      expect(wrapper()).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);
    });

    it('folds a ticked quick value into the applied rows, then clears the square and disables it', async () => {
      const user = userEvent.setup();
      render(<Users />);
      await tickStatus(user, 'Active');
      expect(rowCount()).toBe(ACTIVE);
      expect(square()).toHaveAttribute('data-active', 'true');
      /* "Email contains ." matches everyone, so whatever narrows the list is the Status row that rode along */
      await applyEmailContains(user, '.');
      /* the square is still there, disabled, and EMPTY: its tick moved into the panel */
      expect(square()).toBeInTheDocument();
      expect(square()).toBeDisabled();
      expect(square()).not.toHaveAttribute('data-active', 'true');
      expect(doorCount()).toBe('2');
      expect(rowCount()).toBe(ACTIVE);
      /* the panel shows the row: a Status key holding the Active pill */
      await user.click(door());
      const panel = await screen.findByRole('dialog', { name: 'Filters' });
      expect(within(panel).getAllByText('Status').length).toBeGreaterThan(0);
      expect(within(panel).getByText('Active')).toBeInTheDocument();
      /* Clear all: the square wakes, empty - its tick moved into the panel and left with it */
      await user.click(within(panel).getByRole('button', { name: 'Clear all' }));
      expect(square()).toBeEnabled();
      expect(square()).not.toHaveAttribute('data-active', 'true');
      expect(rowCount()).toBe(USERS.length);
    });

    it('keeps a quick value applied when its key is not among the advanced keys', async () => {
      const user = userEvent.setup();
      render(<Users advancedFilter={{ keys: KEYS_WITHOUT_STATUS }} />);
      await tickStatus(user, 'Inactive');
      expect(rowCount()).toBe(INACTIVE);
      await applyEmailContains(user, '.');
      /* the square is disabled with its dot still on - nothing rode along (the door counts one), nothing was dropped,
       * and the list is STILL narrowed by the tick */
      expect(square()).toBeDisabled();
      expect(square()).toHaveAttribute('data-active', 'true');
      expect(doorCount()).toBe('1');
      expect(rowCount()).toBe(INACTIVE);
      /* clear the advanced filter: the square wakes with its tick still on */
      await clearAll(user);
      expect(square()).toBeEnabled();
      expect(square()).toHaveAttribute('data-active', 'true');
      expect(rowCount()).toBe(INACTIVE);
    });

    it('takes the heading wash off while the square is disabled', async () => {
      const user = userEvent.setup();
      render(<Users />);
      await tickStatus(user, 'Active');
      expect(screen.getByRole('columnheader', { name: /Status/ })).toHaveAttribute(
        'data-filtered',
        'true'
      );
      await applyEmailContains(user, '.');
      expect(screen.getByRole('columnheader', { name: /Status/ })).not.toHaveAttribute(
        'data-filtered',
        'true'
      );
    });

    it('applying with nothing complete folds nothing: the square stays, ticks and all', async () => {
      const user = userEvent.setup();
      render(<Users />);
      await tickStatus(user, 'Active');
      await user.click(door());
      const panel = await screen.findByRole('dialog', { name: 'Filters' });
      await user.click(within(panel).getByRole('button', { name: /^Apply/ }));
      expect(square()).toBeInTheDocument();
      expect(square()).toBeEnabled();
      expect(square()).toHaveAttribute('data-active', 'true');
      expect(rowCount()).toBe(ACTIVE);
    });
  }
);
