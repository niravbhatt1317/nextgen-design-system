import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  TableOld,
  TableHeaderOld,
  TableBodyOld,
  TableFooterOld,
  TableRowOld,
  TableGroupRowOld,
  TableExpandTriggerOld,
  TableHeadOld,
  TableCellOld,
  TableCaptionOld,
} from './TableOld';
import type { TableDensityOld, TableAlignOld } from './TableOld.types';

describe('TableOld', () => {
  it('renders table structure', () => {
    const { container } = render(
      <TableOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld>Name</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld>
          <TableRowOld>
            <TableCellOld>John</TableCellOld>
          </TableRowOld>
        </TableBodyOld>
      </TableOld>
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('renders table with caption', () => {
    render(
      <TableOld>
        <TableCaptionOld>User List</TableCaptionOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld>Name</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
      </TableOld>
    );
    expect(screen.getByText('User List')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(
      <TableOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld>Name</TableHeadOld>
            <TableHeadOld>Email</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
      </TableOld>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders table body rows', () => {
    render(
      <TableOld>
        <TableBodyOld>
          <TableRowOld>
            <TableCellOld>John Doe</TableCellOld>
            <TableCellOld>john@example.com</TableCellOld>
          </TableRowOld>
        </TableBodyOld>
      </TableOld>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders table footer', () => {
    render(
      <TableOld>
        <TableFooterOld>
          <TableRowOld>
            <TableCellOld>Total</TableCellOld>
          </TableRowOld>
        </TableFooterOld>
      </TableOld>
    );
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TableOld className="custom-table">
        <TableBodyOld>
          <TableRowOld>
            <TableCellOld>Data</TableCellOld>
          </TableRowOld>
        </TableBodyOld>
      </TableOld>
    );
    const table = container.querySelector('table');
    expect(table).toHaveClass('custom-table');
  });

  it('renders complete table example', () => {
    render(
      <TableOld>
        <TableCaptionOld>A list of recent invoices</TableCaptionOld>
        <TableHeaderOld>
          <TableRowOld>
            <TableHeadOld>Invoice</TableHeadOld>
            <TableHeadOld>Status</TableHeadOld>
            <TableHeadOld>Amount</TableHeadOld>
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld>
          <TableRowOld>
            <TableCellOld>INV001</TableCellOld>
            <TableCellOld>Paid</TableCellOld>
            <TableCellOld>$250.00</TableCellOld>
          </TableRowOld>
          <TableRowOld>
            <TableCellOld>INV002</TableCellOld>
            <TableCellOld>Pending</TableCellOld>
            <TableCellOld>$150.00</TableCellOld>
          </TableRowOld>
        </TableBodyOld>
        <TableFooterOld>
          <TableRowOld>
            <TableCellOld colSpan={2}>Total</TableCellOld>
            <TableCellOld>$400.00</TableCellOld>
          </TableRowOld>
        </TableFooterOld>
      </TableOld>
    );
    expect(screen.getByText('A list of recent invoices')).toBeInTheDocument();
    expect(screen.getByText('INV001')).toBeInTheDocument();
    expect(screen.getByText('$400.00')).toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    const tableRef = { current: null as HTMLTableElement | null };
    const headerRef = { current: null as HTMLTableSectionElement | null };
    const rowRef = { current: null as HTMLTableRowElement | null };

    render(
      <TableOld>
        <table ref={tableRef}>
          <TableHeaderOld ref={headerRef}>
            <TableRowOld ref={rowRef}>
              <TableHeadOld>Header</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </table>
      </TableOld>
    );

    expect(headerRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
  });

  describe('density', () => {
    const cases: [TableDensityOld, string, string][] = [
      ['short', 'mdt-h-8', 'mdt-px-2'],
      ['compact', 'mdt-h-10', 'mdt-px-3'],
      ['default', 'mdt-h-12', 'mdt-p-4'],
      ['relaxed', 'mdt-h-14', 'mdt-px-6'],
    ];

    it.each(cases)('applies %s density to head and cell', (density, headClass, cellClass) => {
      const { container } = render(
        <TableOld density={density}>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>C</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('th')).toHaveClass(headClass);
      expect(container.querySelector('td')).toHaveClass(cellClass);
    });

    it('defaults to compact density when not given', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>C</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).toHaveClass('mdt-px-3');
      expect(container.querySelector('td')).toHaveClass('mdt-py-2');
    });
  });

  describe('alignment', () => {
    const cases: [TableAlignOld, string][] = [
      ['left', 'mdt-text-left'],
      ['center', 'mdt-text-center'],
      ['right', 'mdt-text-right'],
    ];

    it.each(cases)('aligns a cell %s', (align, expected) => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld align={align}>C</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).toHaveClass(expected);
    });

    it.each(cases)('aligns a header %s', (align, expected) => {
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld align={align}>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(container.querySelector('th')).toHaveClass(expected);
    });
  });

  describe('striping', () => {
    it('stripes body rows when striped', () => {
      const { container } = render(
        <TableOld striped>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('tbody tr')).toHaveClass('odd:mdt-bg-muted/50');
    });

    it('does not stripe when striped is off', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('tbody tr')).not.toHaveClass('odd:mdt-bg-muted/50');
    });

    it('never stripes header or footer rows, even when striped', () => {
      const { container } = render(
        <TableOld striped>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableFooterOld>
            <TableRowOld>
              <TableCellOld>F</TableCellOld>
            </TableRowOld>
          </TableFooterOld>
        </TableOld>
      );
      expect(container.querySelector('thead tr')).not.toHaveClass('odd:mdt-bg-muted/50');
      expect(container.querySelector('tfoot tr')).not.toHaveClass('odd:mdt-bg-muted/50');
    });

    it('only body rows get the hover treatment', () => {
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>C</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('tbody tr')).toHaveClass('hover:mdt-bg-muted/50');
      expect(container.querySelector('thead tr')).not.toHaveClass('hover:mdt-bg-muted/50');
    });
  });

  describe('selection', () => {
    it('marks a selected row with data-state', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld selected>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveAttribute('data-state', 'selected');
      expect(row).toHaveClass('mdt-bg-muted');
    });

    it('leaves an unselected row without data-state', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('tbody tr')).not.toHaveAttribute('data-state');
    });

    it('a selected row keeps a solid background in a striped table', () => {
      // The stripe must not win over selection, or selection becomes unreadable
      // on alternate rows.
      const { container } = render(
        <TableOld striped>
          <TableBodyOld>
            <TableRowOld selected>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveClass('mdt-bg-muted');
      expect(row).toHaveClass('odd:mdt-bg-muted');
      expect(row).not.toHaveClass('odd:mdt-bg-muted/50');
    });
  });

  describe('sticky header', () => {
    it('makes header cells sticky when asked', () => {
      const { container } = render(
        <TableOld stickyHeader>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      const th = container.querySelector('th');
      expect(th).toHaveClass('mdt-sticky');
      // A pinned row sits above any frozen column: equal z-index resolves by DOM
      // order, and tbody comes after thead, so a frozen body cell would
      // otherwise paint its shadow straight over the header.
      expect(th).toHaveClass('mdt-z-sticky-header');
      // Without an opaque background the body scrolls visibly under the header.
      expect(th).toHaveClass('mdt-bg-background');
    });

    it('leaves header cells unstuck by default', () => {
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(container.querySelector('th')).not.toHaveClass('mdt-sticky');
    });
  });

  describe('sorting', () => {
    const renderSortable = (props: Partial<Parameters<typeof TableHeadOld>[0]> = {}) =>
      render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld sortable {...props}>
                Name
              </TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );

    it('renders a real button so the control is reachable by keyboard', () => {
      renderSortable();
      expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();
    });

    it('renders no button when not sortable', () => {
      render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('reports aria-sort as none when sortable but not the active column', () => {
      const { container } = renderSortable();
      expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'none');
    });

    it('reports aria-sort ascending', () => {
      const { container } = renderSortable({ sortOrder: 'ascend' });
      expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'ascending');
    });

    it('reports aria-sort descending', () => {
      const { container } = renderSortable({ sortOrder: 'descend' });
      expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'descending');
    });

    it('sets no aria-sort on a column that is not sortable', () => {
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(container.querySelector('th')).not.toHaveAttribute('aria-sort');
    });

    it('calls onSort when clicked', async () => {
      const onSort = vi.fn();
      renderSortable({ onSort });
      await userEvent.click(screen.getByRole('button', { name: /name/i }));
      expect(onSort).toHaveBeenCalledTimes(1);
    });

    it('is operable by keyboard', async () => {
      const onSort = vi.fn();
      renderSortable({ onSort });
      screen.getByRole('button', { name: /name/i }).focus();
      await userEvent.keyboard('{Enter}');
      expect(onSort).toHaveBeenCalled();
    });

    it('reverses the control for a right-aligned column so it stays flush', () => {
      renderSortable({ align: 'right' });
      expect(screen.getByRole('button', { name: /name/i })).toHaveClass('mdt-flex-row-reverse');
    });

    it('does not reverse for a left-aligned column', () => {
      renderSortable({ align: 'left' });
      expect(screen.getByRole('button', { name: /name/i })).not.toHaveClass('mdt-flex-row-reverse');
    });
  });

  describe('summary rows', () => {
    it('gives a summary row its own weight and tint', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld summary>
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveClass('mdt-font-medium');
      expect(row).toHaveClass('mdt-bg-muted/50');
    });

    it('does not offer hover feedback - a total is not selectable', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld summary>
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('tbody tr')).not.toHaveClass('hover:mdt-bg-muted/50');
    });

    it('is never striped, even in a striped table', () => {
      const { container } = render(
        <TableOld striped>
          <TableBodyOld>
            <TableRowOld summary>
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('tbody tr')).not.toHaveClass('odd:mdt-bg-muted/50');
    });
  });

  describe('indentation', () => {
    it.each([
      [1, 'mdt-pl-8'],
      [2, 'mdt-pl-14'],
      [3, 'mdt-pl-20'],
    ] as const)('indents a cell to level %i', (indent, expected) => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld indent={indent}>Child</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).toHaveClass(expected);
    });

    it('adds no indent at level 0', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>Top level</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      expect(td).not.toHaveClass('mdt-pl-8');
      expect(td).not.toHaveClass('mdt-pl-14');
      expect(td).not.toHaveClass('mdt-pl-20');
    });
  });

  describe('group rows', () => {
    it('spans the whole table', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={4}>Mobile App</TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).toHaveAttribute('colspan', '4');
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
    });

    it('shows a count when given one', () => {
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2} count={12}>
              Platform
            </TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('omits the count when not given', () => {
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2}>Platform</TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.queryByText('12')).not.toBeInTheDocument();
    });

    it('renders no control at all for a static group', () => {
      // A dead control is worse than none - it invites a click that does nothing.
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2}>Static</TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a disclosure control when collapsible, with aria-expanded', () => {
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2} expanded onToggle={() => undefined}>
              Mobile App
            </TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.getByRole('button', { name: 'Mobile App' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('reports aria-expanded false when collapsed', () => {
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2} expanded={false} onToggle={() => undefined}>
              Mobile App
            </TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.getByRole('button', { name: 'Mobile App' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('calls onToggle when the control is used', async () => {
      const onToggle = vi.fn();
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2} onToggle={onToggle}>
              Mobile App
            </TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Mobile App' }));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('falls back to a generic label when the heading is not plain text', () => {
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld colSpan={2} onToggle={() => undefined}>
              <strong>Rich</strong>
            </TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.getByRole('button', { name: 'Toggle group' })).toBeInTheDocument();
    });

    it('accepts an explicit toggle label', () => {
      render(
        <TableOld>
          <TableBodyOld>
            <TableGroupRowOld
              colSpan={2}
              toggleLabel="Open the mobile group"
              onToggle={() => undefined}
            >
              Mobile App
            </TableGroupRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(screen.getByRole('button', { name: 'Open the mobile group' })).toBeInTheDocument();
    });
  });

  describe('expand trigger', () => {
    it('reports aria-expanded and a default label', () => {
      render(<TableExpandTriggerOld expanded={false} onToggle={() => undefined} />);
      const button = screen.getByRole('button', { name: 'Toggle row' });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('reports aria-expanded when open', () => {
      render(<TableExpandTriggerOld expanded onToggle={() => undefined} />);
      expect(screen.getByRole('button', { name: 'Toggle row' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('accepts a custom label', () => {
      render(
        <TableExpandTriggerOld expanded onToggle={() => undefined} label="Show time entries" />
      );
      expect(screen.getByRole('button', { name: 'Show time entries' })).toBeInTheDocument();
    });

    it('calls onToggle when clicked', async () => {
      const onToggle = vi.fn();
      render(<TableExpandTriggerOld expanded={false} onToggle={onToggle} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('is operable by keyboard', async () => {
      const onToggle = vi.fn();
      render(<TableExpandTriggerOld expanded={false} onToggle={onToggle} />);
      screen.getByRole('button').focus();
      await userEvent.keyboard('{Enter}');
      expect(onToggle).toHaveBeenCalled();
    });
  });

  describe('sticky rows and scroll state', () => {
    it('pins a row to the top through its cells, not the row itself', () => {
      // `position: sticky` on a <tr> is unreliable, and a box-shadow on one does
      // not render under border-collapse. Both have to land on the cells.
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="top" summary>
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('mdt-sticky');
      expect(td).toHaveClass('mdt-top-0');
      expect(td).toHaveClass('mdt-z-sticky-header');
      expect(container.querySelector('tbody tr')).not.toHaveClass('mdt-sticky');
    });

    it('pins a row to the bottom', () => {
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="bottom" summary>
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('mdt-bottom-0');
      expect(td).not.toHaveClass('mdt-top-0');
    });

    it('leaves cells unpinned by default', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>Plain</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).not.toHaveClass('mdt-sticky');
    });

    it('shows the shadow only while something is scrolled underneath', () => {
      // The shadow is conditioned on the container's scroll state, so a pinned
      // total sitting at the true end of the data stays flat.
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="top">
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      // A gradient band, not a box-shadow: under border-separate a box-shadow
      // casts on all four sides of every cell and stacks into vertical seams
      // between the columns.
      expect(container.querySelector('td')).toHaveClass(
        'group-data-[scrolled-top=true]:after:mdt-opacity-100'
      );
      // Nothing is scrolled in jsdom, so the container reports both edges false.
      const scroller = container.querySelector('[data-scrolled-top]');
      expect(scroller).toHaveAttribute('data-scrolled-top', 'false');
      expect(scroller).toHaveAttribute('data-scrolled-bottom', 'false');
    });

    it('applies maxHeight to the scroll container', () => {
      const { container } = render(
        <TableOld maxHeight="12rem">
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('[data-scrolled-top]')).toHaveStyle({ maxHeight: '12rem' });
    });

    it('sets no max-height when not asked', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const el = container.querySelector('[data-scrolled-top]') as HTMLElement;
      expect(el.style.maxHeight).toBe('');
    });
  });

  describe('layout', () => {
    it('uses fixed layout when asked, so columns stop moving as rows appear', () => {
      const { container } = render(
        <TableOld layout="fixed">
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('table')).toHaveClass('mdt-table-fixed');
    });

    it('defaults to auto layout', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('table')).not.toHaveClass('mdt-table-fixed');
    });
  });

  describe('scroll state tracking', () => {
    /** jsdom has no real layout, so the container's metrics have to be faked. */
    const fakeMetrics = (el: HTMLElement, scrollTop: number, clientH: number, scrollH: number) => {
      Object.defineProperty(el, 'scrollTop', { value: scrollTop, configurable: true });
      Object.defineProperty(el, 'clientHeight', { value: clientH, configurable: true });
      Object.defineProperty(el, 'scrollHeight', { value: scrollH, configurable: true });
    };

    const renderScroller = () => {
      const { container } = render(
        <TableOld maxHeight="10rem" stickyHeader>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      return container.querySelector('[data-scrolled-top]') as HTMLElement;
    };

    it('reports content above once scrolled down', async () => {
      const el = renderScroller();
      fakeMetrics(el, 40, 100, 400);
      fireEvent.scroll(el);
      await waitFor(() => {
        expect(el).toHaveAttribute('data-scrolled-top', 'true');
      });
      expect(el).toHaveAttribute('data-scrolled-bottom', 'true');
    });

    it('reports nothing below once scrolled to the end', async () => {
      const el = renderScroller();
      fakeMetrics(el, 300, 100, 400);
      fireEvent.scroll(el);
      await waitFor(() => {
        expect(el).toHaveAttribute('data-scrolled-bottom', 'false');
      });
      expect(el).toHaveAttribute('data-scrolled-top', 'true');
    });

    it('reports both edges clear when the content fits', async () => {
      const el = renderScroller();
      fakeMetrics(el, 0, 400, 400);
      fireEvent.scroll(el);
      await waitFor(() => {
        expect(el).toHaveAttribute('data-scrolled-top', 'false');
      });
      expect(el).toHaveAttribute('data-scrolled-bottom', 'false');
    });
  });

  describe('the stuck edge is visible', () => {
    it('gives a top-pinned cell its own border', () => {
      // A sticky cell leaves its row behind, and under border-collapse the row's
      // border does not travel with it - so without this a pinned header has no
      // edge at all.
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="top">
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).toHaveClass('mdt-border-b');
    });

    it('gives a bottom-pinned cell a border on the other edge', () => {
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="bottom">
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('mdt-border-t');
      expect(td).not.toHaveClass('mdt-border-b');
    });

    it('puts containerClassName on the scroll container, which is what clips', () => {
      const { container } = render(
        <TableOld containerClassName="mdt-rounded-md mdt-border" maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const scroller = container.querySelector('[data-scrolled-top]');
      expect(scroller).toHaveClass('mdt-rounded-md');
      expect(scroller).toHaveClass('mdt-overflow-auto');
    });
  });

  describe('the pinned edge only lightens once pinned', () => {
    it('carries a full-strength border at rest and a lighter one when scrolled', () => {
      const { container } = render(
        <TableOld maxHeight="10rem" stickyHeader>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      const th = container.querySelector('th');
      // At rest it matches an ordinary header edge...
      expect(th).toHaveClass('mdt-border-border');
      // ...and steps back only once content is underneath it.
      expect(th).toHaveClass('group-data-[scrolled-top=true]:mdt-border-border/30');
    });

    it('keeps the dark edge at full weight even when pinned', () => {
      // The dark wash reaches about four luminance points, so the border has to
      // carry the boundary there.
      const { container } = render(
        <TableOld maxHeight="10rem" stickyHeader>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>H</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(container.querySelector('th')).toHaveClass(
        'dark:group-data-[scrolled-top=true]:mdt-border-border'
      );
    });

    it('applies the same rule to a bottom-pinned row, on its own edge', () => {
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="bottom">
              <TableCellOld>Total</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('group-data-[scrolled-bottom=true]:mdt-border-border/30');
      expect(td).not.toHaveClass('group-data-[scrolled-top=true]:mdt-border-border/30');
    });
  });

  describe('frozen columns', () => {
    it('is positioned by default, so an absolute child resolves against it', () => {
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(container.querySelector('th')).toHaveClass('mdt-relative');
    });

    it('upgrades that to sticky when pinned, rather than keeping both', () => {
      // `relative` in the base and `sticky` from the frozen classes are the same
      // tailwind-merge group, so the later one has to win. If both survived, the
      // pinned column would stop pinning and its `left` offset would shove it
      // sideways instead - which is exactly what happened.
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld frozen>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      const th = container.querySelector('th');
      expect(th).toHaveClass('mdt-sticky');
      expect(th).not.toHaveClass('mdt-relative');
    });

    it('drops the right band on the corner cell, keeping the edge', () => {
      // A frozen column and a sticky header each cast their own wash, and two
      // straight gradients cannot join smoothly where they cross. The corner is
      // resolved by leaving the vertical band out of it rather than blending.
      const { container } = render(
        <TableOld maxHeight="10rem" stickyHeader>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld frozen>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      const th = container.querySelector('th');
      // `left` is a measured value now, not a class: with two pinned columns
      // the second sits at the first's real width.
      expect(th).toHaveStyle({ left: '0px' });
      expect(th).toHaveClass('mdt-border-r');
      expect(th).not.toHaveClass('group-data-[scrolled-x=true]:before:mdt-opacity-100');
    });

    it('keeps the band on a frozen header when there is no sticky header', () => {
      // No sticky header means no horizontal wash, so no corner to resolve.
      const { container } = render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld frozen>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(container.querySelector('th')).toHaveClass(
        'group-data-[scrolled-x=true]:before:mdt-opacity-100'
      );
    });

    it('pins a header cell to the left on the upper sticky plane', () => {
      // A frozen body cell and the frozen header cell cross at the top-left
      // corner. Equal z-index would let the body cell paint over the header,
      // because tbody comes after thead in the DOM.
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld frozen>Name</TableHeadOld>
              <TableHeadOld>Email</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      const [first, second] = [...container.querySelectorAll('th')];
      expect(first).toHaveClass('mdt-sticky');
      expect(first).toHaveStyle({ left: '0px' });
      // No sticky header here, so no corner - the frozen header sits on the
      // header plane, above any frozen body cell.
      expect(first).toHaveClass('mdt-z-sticky-header');
      expect(second).not.toHaveClass('mdt-sticky');
    });

    it('pins a body cell on the lower sticky plane', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld frozen>Name</TableCellOld>
              <TableCellOld>Email</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const [first, second] = [...container.querySelectorAll('td')];
      expect(first).toHaveClass('mdt-z-sticky');
      expect(first).not.toHaveClass('mdt-z-sticky-header');
      expect(second).not.toHaveClass('mdt-sticky');
    });

    it('leaves cells unfrozen by default', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld>Plain</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('td')).not.toHaveClass('mdt-left-0');
    });

    it('reveals its edge only once something has slid underneath', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld frozen>Name</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      // full-weight edge at rest, lighter once scrolled, band fades in
      expect(td).toHaveClass('mdt-border-r');
      expect(td).toHaveClass('group-data-[scrolled-x=true]:mdt-border-border/30');
      expect(td).toHaveClass('group-data-[scrolled-x=true]:before:mdt-opacity-100');
    });

    it('uses ::before so a frozen cell inside a pinned row can use both', () => {
      const { container } = render(
        <TableOld maxHeight="10rem">
          <TableBodyOld>
            <TableRowOld sticky="top">
              <TableCellOld frozen>Corner</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const td = container.querySelector('td');
      // A body cell is not the corner - it keeps both.
      expect(td).toHaveClass('group-data-[scrolled-x=true]:before:mdt-opacity-100');
      expect(td).toHaveClass('group-data-[scrolled-top=true]:after:mdt-opacity-100');
    });

    it('tracks horizontal scroll on the container', () => {
      const { container } = render(
        <TableOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld frozen>A</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      expect(container.querySelector('[data-scrolled-x]')).toHaveAttribute(
        'data-scrolled-x',
        'false'
      );
    });
  });

  describe('the three sticky planes', () => {
    it('layers frozen column below pinned header below the corner', () => {
      // All three pin, and all three can overlap. Equal z-index resolves by DOM
      // order and tbody comes after thead, so without distinct planes a frozen
      // body cell paints its shadow straight over the header.
      const { container } = render(
        <TableOld maxHeight="10rem" stickyHeader>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld frozen>Market</TableHeadOld>
              <TableHeadOld>Price</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            <TableRowOld>
              <TableCellOld frozen>PAIR-1</TableCellOld>
              <TableCellOld>90,000</TableCellOld>
            </TableRowOld>
          </TableBodyOld>
        </TableOld>
      );
      const [corner, header] = [...container.querySelectorAll('th')];
      const [frozenBody, plainBody] = [...container.querySelectorAll('td')];

      expect(frozenBody).toHaveClass('mdt-z-sticky'); //        frozen column
      expect(header).toHaveClass('mdt-z-sticky-header'); //     pinned header, above it
      expect(corner).toHaveClass('mdt-z-sticky-corner'); //     the crossing, above both
      expect(plainBody).not.toHaveClass('mdt-sticky'); //       ordinary content
    });
  });

  describe('column resizing', () => {
    const renderResizable = (props: Record<string, unknown> = {}) =>
      render(
        <TableOld layout="fixed">
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld resizable width={200} {...props}>
                Name
              </TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );

    it('renders a focusable separator, not a button', () => {
      // A moveable boundary is a separator - the window-splitter pattern - and it
      // has to be focusable to be usable without a mouse.
      renderResizable();
      const handle = screen.getByRole('separator');
      expect(handle).toHaveAttribute('aria-orientation', 'vertical');
      expect(handle).toHaveAttribute('tabindex', '0');
    });

    it('reports its current width and bounds to a screen reader', () => {
      renderResizable({ minWidth: 80, maxWidth: 500 });
      const handle = screen.getByRole('separator');
      expect(handle).toHaveAttribute('aria-valuenow', '200');
      expect(handle).toHaveAttribute('aria-valuemin', '80');
      expect(handle).toHaveAttribute('aria-valuemax', '500');
    });

    it('names each handle, since a table always has more than one', () => {
      renderResizable();
      expect(screen.getByRole('separator', { name: 'Resize Name' })).toBeInTheDocument();
    });

    it('falls back to a generic name when the header is not plain text', () => {
      render(
        <TableOld layout="fixed">
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld resizable width={200}>
                <strong>Rich</strong>
              </TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(screen.getByRole('separator', { name: 'Resize column' })).toBeInTheDocument();
    });

    it('accepts an explicit handle name', () => {
      renderResizable({ resizeLabel: 'Widen the name column' });
      expect(screen.getByRole('separator', { name: 'Widen the name column' })).toBeInTheDocument();
    });

    it('applies the width as an inline style', () => {
      const { container } = renderResizable();
      expect(container.querySelector('th')).toHaveStyle({ width: '200px' });
    });

    it('positions the cell so the handle lands on its own edge', () => {
      // Without this the handle resolves against the scroll container and sits
      // at the table's edge rather than the column's.
      const { container } = renderResizable();
      expect(container.querySelector('th')).toHaveClass('mdt-relative');
    });

    it('renders no handle when not resizable', () => {
      render(
        <TableOld>
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>Name</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
        </TableOld>
      );
      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    });

    describe('keyboard', () => {
      it('widens on ArrowRight and narrows on ArrowLeft', async () => {
        const onResize = vi.fn();
        renderResizable({ onResize });
        const handle = screen.getByRole('separator');
        handle.focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(onResize).toHaveBeenLastCalledWith(216);
        await userEvent.keyboard('{ArrowLeft}');
        expect(onResize).toHaveBeenLastCalledWith(184);
      });

      it('jumps to the bounds on Home and End', async () => {
        const onResize = vi.fn();
        renderResizable({ onResize, minWidth: 80, maxWidth: 500 });
        const handle = screen.getByRole('separator');
        handle.focus();
        await userEvent.keyboard('{Home}');
        expect(onResize).toHaveBeenLastCalledWith(80);
        await userEvent.keyboard('{End}');
        expect(onResize).toHaveBeenLastCalledWith(500);
      });

      it('clamps rather than passing a width past the bounds', async () => {
        const onResize = vi.fn();
        renderResizable({ onResize, width: 70, minWidth: 64 });
        const handle = screen.getByRole('separator');
        handle.focus();
        await userEvent.keyboard('{ArrowLeft}');
        expect(onResize).toHaveBeenLastCalledWith(64);
      });

      it('ignores keys that are not resize keys', async () => {
        const onResize = vi.fn();
        renderResizable({ onResize });
        const handle = screen.getByRole('separator');
        handle.focus();
        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard('a');
        expect(onResize).not.toHaveBeenCalled();
      });
    });
  });
});
