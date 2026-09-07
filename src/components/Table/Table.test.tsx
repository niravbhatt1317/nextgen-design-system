import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Table,
  TableBody,
  TableCell,
  TableColGroup,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectionCell,
  TableNumberCell,
  TableNumberHead,
  TableTailCell,
  TableViewport,
} from './Table';
import { TableBulkAction, TableBulkBar } from './TableBulkBar';
import { TableLoadMore, TablePager } from './TablePager';
import { TableBlank, TableSkeleton } from './TableStates';

function Grid({
  hasSelection = false,
  selected = false,
  inert = false,
  onOpen = () => undefined,
  onToggle = () => undefined,
}) {
  return (
    <Table label="People">
      <TableViewport tableWidth={537} hasSelection={hasSelection} label="People grid">
        <TableColGroup widths={[60, 200, 217]} />
        <TableHeader>
          <tr>
            <TableSelectAll state="none" onToggle={() => undefined} onScope={() => undefined} />
            <TableHead
              columnKey="name"
              label="Name"
              width={200}
              frozen={60}
              sortable
              sort="asc"
              onSort={() => undefined}
            />
            <TableHead
              columnKey="email"
              label="Email"
              width={217}
              movable
              resizable
              menu={<span>items</span>}
            />
            <TableTailCell head />
          </tr>
        </TableHeader>
        <TableBody>
          <TableRow selected={selected} inert={inert} onOpen={onOpen} onToggle={onToggle}>
            <TableSelectionCell
              index={1}
              selected={selected}
              inert={inert}
              label="Sarah Johnson"
              onToggle={onToggle}
            />
            <TableCell frozen={60}>Sarah Johnson</TableCell>
            <TableCell>sarah@company.com</TableCell>
            <TableTailCell />
          </TableRow>
        </TableBody>
      </TableViewport>
    </Table>
  );
}

describe('Table', () => {
  it('is a named region holding a named grid with the console geometry', () => {
    render(<Grid />);
    const card = screen.getByRole('region', { name: 'People' });
    expect(card).toHaveClass('tbl', 'mdt-border-neutral-20');
    expect(card.style.getPropertyValue('--tbl-morph')).toBe('0');
    const th = screen.getByRole('columnheader', { name: /Name/ });
    expect(th).toHaveClass('mdt-h-10', 'mdt-text-[11px]', 'mdt-text-neutral-90', 'mdt-sticky');
    const cell = screen.getByText('sarah@company.com').closest('td');
    expect(cell).toHaveClass('mdt-h-[54px]', 'mdt-px-4');
  });

  it('speaks the sort and offers the heading as a sort button', () => {
    render(<Grid />);
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute(
      'aria-sort',
      'ascending'
    );
    expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument();
  });

  it('gives a movable heading a grip, a menu and a resize handle with its width spoken', () => {
    render(<Grid />);
    expect(screen.getByLabelText(/Move column Email/)).toBeInTheDocument();
    expect(screen.getByLabelText('Options for Email')).toHaveAttribute('aria-haspopup', 'menu');
    const handle = screen.getByRole('slider', { name: 'Resize Email' });
    expect(handle).toHaveAttribute('aria-valuenow', '217');
    expect(handle).toHaveAttribute('aria-valuemin', '120');
    expect(handle).toHaveAttribute('aria-valuemax', '720');
  });

  it('resizes by keyboard in 16px steps and jumps with Home and End', async () => {
    const onResize = vi.fn();
    render(
      <Table label="t">
        <TableViewport tableWidth={300}>
          <TableHeader>
            <tr>
              <TableHead
                columnKey="email"
                label="Email"
                width={200}
                resizable
                onResize={onResize}
              />
            </tr>
          </TableHeader>
        </TableViewport>
      </Table>
    );
    const handle = screen.getByRole('slider', { name: 'Resize Email' });
    handle.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onResize).toHaveBeenLastCalledWith(216, true);
    await userEvent.keyboard('{ArrowLeft}');
    expect(onResize).toHaveBeenLastCalledWith(184, true);
    await userEvent.keyboard('{Home}');
    expect(onResize).toHaveBeenLastCalledWith(120, true);
    await userEvent.keyboard('{End}');
    expect(onResize).toHaveBeenLastCalledWith(720, true);
  });

  it('marks the row picked, and the grid as holding a selection', () => {
    render(<Grid selected hasSelection />);
    const row = screen.getByRole('row', { selected: true });
    expect(row).toHaveAttribute('data-state', 'selected');
    expect(screen.getByRole('table')).toHaveAttribute('data-has-selection', 'true');
    expect(
      screen.getByRole('checkbox', { name: 'Select Sarah Johnson', hidden: true })
    ).toBeInTheDocument();
  });

  it('gives an invited row a number and no checkbox, and never opens it', async () => {
    const onOpen = vi.fn();
    render(<Grid inert onOpen={onOpen} />);
    expect(screen.queryByLabelText('Select Sarah Johnson')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    await userEvent.click(screen.getByText('sarah@company.com'));
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('opens on Enter or a body click, picks on Space, and Shift extends', async () => {
    const onOpen = vi.fn();
    const onToggle = vi.fn();
    render(<Grid onOpen={onOpen} onToggle={onToggle} />);
    const row = screen.getAllByRole('row')[1] as HTMLElement;
    row.focus();
    await userEvent.keyboard('{Enter}');
    expect(onOpen).toHaveBeenCalledTimes(1);
    await userEvent.keyboard(' ');
    expect(onToggle).toHaveBeenLastCalledWith(false);
    await userEvent.keyboard('{Shift>} {/Shift}');
    expect(onToggle).toHaveBeenLastCalledWith(true);
    await userEvent.click(screen.getByText('sarah@company.com'));
    expect(onOpen).toHaveBeenCalledTimes(2);
  });

  it('names the header checkbox and its scope chevron', () => {
    render(<Grid />);
    expect(screen.getByRole('checkbox', { name: 'Select all on this page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Choose what to select' })).toHaveAttribute(
      'aria-haspopup',
      'dialog'
    );
  });

  it('keeps the header checkbox on the column axis: the chevron hangs off it, not beside it', () => {
    render(<Grid />);
    const chevron = screen.getByRole('button', { name: 'Choose what to select' });
    expect(chevron.className).toContain('mdt-absolute');
    expect(chevron.parentElement?.className).toContain('mdt-relative');
  });

  it('draws the checkbox border only while unchecked, so a picked box is one solid fill', () => {
    render(<Grid selected hasSelection />);
    const box = screen.getByRole('checkbox', { name: 'Select Sarah Johnson', hidden: true });
    expect(box).toHaveAttribute('data-state', 'checked');
    expect(box.className).toContain('data-[state=unchecked]:mdt-border-neutral-40');
    expect(box.className.split(' ')).not.toContain('mdt-border-neutral-40');
    const all = screen.getByRole('checkbox', { name: 'Select all on this page' });
    expect(all.className.split(' ')).not.toContain('mdt-border-neutral-40');
  });
});

describe('TableNumberCell', () => {
  it('is a plain number under a named blank heading, with no checkbox to swap to', () => {
    render(
      <Table label="People">
        <TableViewport tableWidth={260}>
          <TableColGroup widths={[60, 200]} />
          <TableHeader>
            <tr>
              <TableNumberHead />
              <TableHead columnKey="name" label="Name" width={200} />
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow inert>
              <TableNumberCell index={7} inert />
              <TableCell>Priya Natarajan</TableCell>
            </TableRow>
          </TableBody>
        </TableViewport>
      </Table>
    );
    expect(screen.getByRole('columnheader', { name: 'Row number' })).toBeInTheDocument();
    expect(screen.getByText('7')).toHaveClass('tbl-num', 'mdt-opacity-60');
    expect(screen.queryByRole('checkbox', { hidden: true })).not.toBeInTheDocument();
    expect(document.querySelector('.tbl-rowsel')).toBeNull();
  });
});

describe('Table docking', () => {
  const Card = ({ docked }: { docked?: boolean | number }) => (
    <Table label="People" docked={docked} style={{ height: 600 }}>
      <TableViewport tableWidth={537} maxHeight={480}>
        <tbody />
      </TableViewport>
    </Table>
  );
  const parts = () => {
    const card = screen.getByRole('region', { name: 'People' });
    const viewport = card.querySelector('.tbl-viewport') as HTMLElement;
    return { card, viewport };
  };

  it('at rest is a rounded card whose rows scroll within the max height', () => {
    render(<Card />);
    const { card, viewport } = parts();
    expect(card).toHaveAttribute('data-docked', 'false');
    expect(card.style.getPropertyValue('--tbl-morph')).toBe('0');
    expect(viewport.style.maxHeight).toBe('480px');
    expect(viewport).toHaveAttribute('data-clip', 'false');
  });

  it('docked, it squares off, drops the max height and takes the height the page gives it', () => {
    render(<Card docked />);
    const { card, viewport } = parts();
    expect(card).toHaveAttribute('data-docked', 'true');
    expect(card.style.getPropertyValue('--tbl-morph')).toBe('1');
    expect(card.style.height).toBe('600px');
    expect(viewport.style.maxHeight).toBe('');
    expect(viewport).toHaveAttribute('data-clip', 'false');
  });

  it('half way, the morph is the number given and the rows are still clipped to the page scroll', () => {
    render(<Card docked={0.5} />);
    const { card, viewport } = parts();
    expect(card).toHaveAttribute('data-docked', 'false');
    expect(card.style.getPropertyValue('--tbl-morph')).toBe('0.5');
    expect(viewport).toHaveAttribute('data-clip', 'true');
  });
});

describe('TableBulkBar', () => {
  it('renders nothing at zero and a spoken count otherwise', () => {
    const { rerender } = render(<TableBulkBar count={0} onClear={() => undefined} />);
    expect(screen.queryByRole('region', { name: 'Selection' })).not.toBeInTheDocument();
    rerender(
      <TableBulkBar count={1234} onClear={() => undefined}>
        <TableBulkAction>Activate</TableBulkAction>
      </TableBulkBar>
    );
    expect(screen.getByRole('button', { name: /1,234 selected/ })).toHaveAttribute(
      'aria-live',
      'polite'
    );
    expect(screen.getByRole('button', { name: 'Activate' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
  });
});

describe('TablePager', () => {
  it('writes thousands with a comma and goes to a typed page on Enter', async () => {
    const onPage = vi.fn();
    render(
      <TablePager
        total={10001}
        page={1}
        pageSize={25}
        onPage={onPage}
        onPageSize={() => undefined}
        noun="users"
      />
    );
    expect(screen.getByText('1–25 of 10,001 users')).toBeInTheDocument();
    expect(screen.getByText('of 401')).toBeInTheDocument();
    const box = screen.getByRole('textbox', { name: 'Page number' });
    await userEvent.clear(box);
    await userEvent.type(box, '3{Enter}');
    expect(onPage).toHaveBeenLastCalledWith(3);
    await userEvent.click(screen.getByRole('button', { name: 'Last page' }));
    expect(onPage).toHaveBeenLastCalledWith(401);
    expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled();
  });

  it('offers a Load more footer that hides its button once everything is shown', () => {
    const { rerender } = render(
      <TableLoadMore shown={25} total={100} noun="users" onMore={() => undefined} />
    );
    expect(screen.getByText('Showing 25 of 100 users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument();
    rerender(<TableLoadMore shown={100} total={100} noun="users" onMore={() => undefined} />);
    expect(screen.queryByRole('button', { name: 'Load more' })).not.toBeInTheDocument();
  });
});

describe('TableBlank and TableSkeleton', () => {
  it('has the three states with their Users wording and a primary button only for a new tenant', () => {
    const { rerender } = render(<TableBlank kind="first" onAction={() => undefined} />);
    expect(screen.getByText('No users yet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Invite users' })).toHaveClass('mdt-bg-neutral-150');
    rerender(<TableBlank kind="empty" onAction={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Clear filters' })).not.toHaveClass(
      'mdt-bg-neutral-150'
    );
    rerender(<TableBlank kind="error" onAction={() => undefined} />);
    expect(screen.getByText('Couldn’t load users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('draws five hidden skeleton rows by default', () => {
    render(
      <table>
        <TableSkeleton widths={[60, 200, 200]} />
      </table>
    );
    expect(screen.getByRole('table').querySelectorAll('tbody tr')).toHaveLength(5);
    expect(screen.getByRole('table').querySelector('tbody')).toHaveAttribute('aria-hidden', 'true');
  });
});
