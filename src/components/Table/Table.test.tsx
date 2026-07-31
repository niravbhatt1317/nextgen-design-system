import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableGroupRow,
  TableExpandTrigger,
  TableHead,
  TableCell,
  TableCaption,
} from './Table';
import type { TableDensity, TableAlign } from './Table.types';

describe('Table', () => {
  it('renders table structure', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('renders table with caption', () => {
    render(
      <Table>
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    expect(screen.getByText('User List')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders table body rows', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders table footer', () => {
    render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const table = container.querySelector('table');
    expect(table).toHaveClass('custom-table');
  });

  it('renders complete table example', () => {
    render(
      <Table>
        <TableCaption>A list of recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$400.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
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
      <Table>
        <table ref={tableRef}>
          <TableHeader ref={headerRef}>
            <TableRow ref={rowRef}>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </table>
      </Table>
    );

    expect(headerRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
  });

  describe('density', () => {
    const cases: [TableDensity, string, string][] = [
      ['short', 'mdt-h-8', 'mdt-px-2'],
      ['compact', 'mdt-h-10', 'mdt-px-3'],
      ['default', 'mdt-h-12', 'mdt-p-4'],
      ['relaxed', 'mdt-h-14', 'mdt-px-6'],
    ];

    it.each(cases)('applies %s density to head and cell', (density, headClass, cellClass) => {
      const { container } = render(
        <Table density={density}>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>C</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('th')).toHaveClass(headClass);
      expect(container.querySelector('td')).toHaveClass(cellClass);
    });

    it('defaults to compact density when not given', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>C</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).toHaveClass('mdt-px-3');
      expect(container.querySelector('td')).toHaveClass('mdt-py-2');
    });
  });

  describe('alignment', () => {
    const cases: [TableAlign, string][] = [
      ['left', 'mdt-text-left'],
      ['center', 'mdt-text-center'],
      ['right', 'mdt-text-right'],
    ];

    it.each(cases)('aligns a cell %s', (align, expected) => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align={align}>C</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).toHaveClass(expected);
    });

    it.each(cases)('aligns a header %s', (align, expected) => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead align={align}>H</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      expect(container.querySelector('th')).toHaveClass(expected);
    });
  });

  describe('striping', () => {
    it('stripes body rows when striped', () => {
      const { container } = render(
        <Table striped>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('tbody tr')).toHaveClass('odd:mdt-bg-muted/50');
    });

    it('does not stripe when striped is off', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('tbody tr')).not.toHaveClass('odd:mdt-bg-muted/50');
    });

    it('never stripes header or footer rows, even when striped', () => {
      const { container } = render(
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
          <TableFooter>
            <TableRow>
              <TableCell>F</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
      expect(container.querySelector('thead tr')).not.toHaveClass('odd:mdt-bg-muted/50');
      expect(container.querySelector('tfoot tr')).not.toHaveClass('odd:mdt-bg-muted/50');
    });

    it('only body rows get the hover treatment', () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>C</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('tbody tr')).toHaveClass('hover:mdt-bg-muted/50');
      expect(container.querySelector('thead tr')).not.toHaveClass('hover:mdt-bg-muted/50');
    });
  });

  describe('selection', () => {
    it('marks a selected row with data-state', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveAttribute('data-state', 'selected');
      expect(row).toHaveClass('mdt-bg-muted');
    });

    it('leaves an unselected row without data-state', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('tbody tr')).not.toHaveAttribute('data-state');
    });

    it('a selected row keeps a solid background in a striped table', () => {
      // The stripe must not win over selection, or selection becomes unreadable
      // on alternate rows.
      const { container } = render(
        <Table striped>
          <TableBody>
            <TableRow selected>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table stickyHeader>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      expect(container.querySelector('th')).not.toHaveClass('mdt-sticky');
    });
  });

  describe('sorting', () => {
    const renderSortable = (props: Partial<Parameters<typeof TableHead>[0]> = {}) =>
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sortable {...props}>
                Name
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

    it('renders a real button so the control is reachable by keyboard', () => {
      renderSortable();
      expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();
    });

    it('renders no button when not sortable', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table>
          <TableBody>
            <TableRow summary>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveClass('mdt-font-medium');
      expect(row).toHaveClass('mdt-bg-muted/50');
    });

    it('does not offer hover feedback - a total is not selectable', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow summary>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('tbody tr')).not.toHaveClass('hover:mdt-bg-muted/50');
    });

    it('is never striped, even in a striped table', () => {
      const { container } = render(
        <Table striped>
          <TableBody>
            <TableRow summary>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table>
          <TableBody>
            <TableRow>
              <TableCell indent={indent}>Child</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).toHaveClass(expected);
    });

    it('adds no indent at level 0', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Top level</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table>
          <TableBody>
            <TableGroupRow colSpan={4}>Mobile App</TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).toHaveAttribute('colspan', '4');
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
    });

    it('shows a count when given one', () => {
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2} count={12}>
              Platform
            </TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('omits the count when not given', () => {
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2}>Platform</TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.queryByText('12')).not.toBeInTheDocument();
    });

    it('renders no control at all for a static group', () => {
      // A dead control is worse than none - it invites a click that does nothing.
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2}>Static</TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a disclosure control when collapsible, with aria-expanded', () => {
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2} expanded onToggle={() => undefined}>
              Mobile App
            </TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('button', { name: 'Mobile App' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('reports aria-expanded false when collapsed', () => {
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2} expanded={false} onToggle={() => undefined}>
              Mobile App
            </TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('button', { name: 'Mobile App' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('calls onToggle when the control is used', async () => {
      const onToggle = vi.fn();
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2} onToggle={onToggle}>
              Mobile App
            </TableGroupRow>
          </TableBody>
        </Table>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Mobile App' }));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('falls back to a generic label when the heading is not plain text', () => {
      render(
        <Table>
          <TableBody>
            <TableGroupRow colSpan={2} onToggle={() => undefined}>
              <strong>Rich</strong>
            </TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('button', { name: 'Toggle group' })).toBeInTheDocument();
    });

    it('accepts an explicit toggle label', () => {
      render(
        <Table>
          <TableBody>
            <TableGroupRow
              colSpan={2}
              toggleLabel="Open the mobile group"
              onToggle={() => undefined}
            >
              Mobile App
            </TableGroupRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('button', { name: 'Open the mobile group' })).toBeInTheDocument();
    });
  });

  describe('expand trigger', () => {
    it('reports aria-expanded and a default label', () => {
      render(<TableExpandTrigger expanded={false} onToggle={() => undefined} />);
      const button = screen.getByRole('button', { name: 'Toggle row' });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('reports aria-expanded when open', () => {
      render(<TableExpandTrigger expanded onToggle={() => undefined} />);
      expect(screen.getByRole('button', { name: 'Toggle row' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('accepts a custom label', () => {
      render(<TableExpandTrigger expanded onToggle={() => undefined} label="Show time entries" />);
      expect(screen.getByRole('button', { name: 'Show time entries' })).toBeInTheDocument();
    });

    it('calls onToggle when clicked', async () => {
      const onToggle = vi.fn();
      render(<TableExpandTrigger expanded={false} onToggle={onToggle} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('is operable by keyboard', async () => {
      const onToggle = vi.fn();
      render(<TableExpandTrigger expanded={false} onToggle={onToggle} />);
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
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="top" summary>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('mdt-sticky');
      expect(td).toHaveClass('mdt-top-0');
      expect(td).toHaveClass('mdt-z-sticky-header');
      expect(container.querySelector('tbody tr')).not.toHaveClass('mdt-sticky');
    });

    it('pins a row to the bottom', () => {
      const { container } = render(
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="bottom" summary>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('mdt-bottom-0');
      expect(td).not.toHaveClass('mdt-top-0');
    });

    it('leaves cells unpinned by default', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Plain</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).not.toHaveClass('mdt-sticky');
    });

    it('shows the shadow only while something is scrolled underneath', () => {
      // The shadow is conditioned on the container's scroll state, so a pinned
      // total sitting at the true end of the data stays flat.
      const { container } = render(
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="top">
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table maxHeight="12rem">
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('[data-scrolled-top]')).toHaveStyle({ maxHeight: '12rem' });
    });

    it('sets no max-height when not asked', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const el = container.querySelector('[data-scrolled-top]') as HTMLElement;
      expect(el.style.maxHeight).toBe('');
    });
  });

  describe('layout', () => {
    it('uses fixed layout when asked, so columns stop moving as rows appear', () => {
      const { container } = render(
        <Table layout="fixed">
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('table')).toHaveClass('mdt-table-fixed');
    });

    it('defaults to auto layout', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table maxHeight="10rem" stickyHeader>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="top">
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).toHaveClass('mdt-border-b');
    });

    it('gives a bottom-pinned cell a border on the other edge', () => {
      const { container } = render(
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="bottom">
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('mdt-border-t');
      expect(td).not.toHaveClass('mdt-border-b');
    });

    it('puts containerClassName on the scroll container, which is what clips', () => {
      const { container } = render(
        <Table containerClassName="mdt-rounded-md mdt-border" maxHeight="10rem">
          <TableBody>
            <TableRow>
              <TableCell>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const scroller = container.querySelector('[data-scrolled-top]');
      expect(scroller).toHaveClass('mdt-rounded-md');
      expect(scroller).toHaveClass('mdt-overflow-auto');
    });
  });

  describe('the pinned edge only lightens once pinned', () => {
    it('carries a full-strength border at rest and a lighter one when scrolled', () => {
      const { container } = render(
        <Table maxHeight="10rem" stickyHeader>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table maxHeight="10rem" stickyHeader>
          <TableHeader>
            <TableRow>
              <TableHead>H</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      expect(container.querySelector('th')).toHaveClass(
        'dark:group-data-[scrolled-top=true]:mdt-border-border'
      );
    });

    it('applies the same rule to a bottom-pinned row, on its own edge', () => {
      const { container } = render(
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="bottom">
              <TableCell>Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('group-data-[scrolled-bottom=true]:mdt-border-border/30');
      expect(td).not.toHaveClass('group-data-[scrolled-top=true]:mdt-border-border/30');
    });
  });

  describe('frozen columns', () => {
    it('drops the right band on the corner cell, keeping the edge', () => {
      // A frozen column and a sticky header each cast their own wash, and two
      // straight gradients cannot join smoothly where they cross. The corner is
      // resolved by leaving the vertical band out of it rather than blending.
      const { container } = render(
        <Table maxHeight="10rem" stickyHeader>
          <TableHeader>
            <TableRow>
              <TableHead frozen>Name</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const th = container.querySelector('th');
      expect(th).toHaveClass('mdt-left-0');
      expect(th).toHaveClass('mdt-border-r');
      expect(th).not.toHaveClass('group-data-[scrolled-x=true]:before:mdt-opacity-100');
    });

    it('keeps the band on a frozen header when there is no sticky header', () => {
      // No sticky header means no horizontal wash, so no corner to resolve.
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead frozen>Name</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table maxHeight="10rem">
          <TableHeader>
            <TableRow>
              <TableHead frozen>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const [first, second] = [...container.querySelectorAll('th')];
      expect(first).toHaveClass('mdt-sticky');
      expect(first).toHaveClass('mdt-left-0');
      // No sticky header here, so no corner - the frozen header sits on the
      // header plane, above any frozen body cell.
      expect(first).toHaveClass('mdt-z-sticky-header');
      expect(second).not.toHaveClass('mdt-sticky');
    });

    it('pins a body cell on the lower sticky plane', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell frozen>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const [first, second] = [...container.querySelectorAll('td')];
      expect(first).toHaveClass('mdt-z-sticky');
      expect(first).not.toHaveClass('mdt-z-sticky-header');
      expect(second).not.toHaveClass('mdt-sticky');
    });

    it('leaves cells unfrozen by default', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Plain</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).not.toHaveClass('mdt-left-0');
    });

    it('reveals its edge only once something has slid underneath', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell frozen>Name</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = container.querySelector('td');
      // full-weight edge at rest, lighter once scrolled, band fades in
      expect(td).toHaveClass('mdt-border-r');
      expect(td).toHaveClass('group-data-[scrolled-x=true]:mdt-border-border/30');
      expect(td).toHaveClass('group-data-[scrolled-x=true]:before:mdt-opacity-100');
    });

    it('uses ::before so a frozen cell inside a pinned row can use both', () => {
      const { container } = render(
        <Table maxHeight="10rem">
          <TableBody>
            <TableRow sticky="top">
              <TableCell frozen>Corner</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = container.querySelector('td');
      // A body cell is not the corner - it keeps both.
      expect(td).toHaveClass('group-data-[scrolled-x=true]:before:mdt-opacity-100');
      expect(td).toHaveClass('group-data-[scrolled-top=true]:after:mdt-opacity-100');
    });

    it('tracks horizontal scroll on the container', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell frozen>A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table maxHeight="10rem" stickyHeader>
          <TableHeader>
            <TableRow>
              <TableHead frozen>Market</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell frozen>PAIR-1</TableCell>
              <TableCell>90,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <Table layout="fixed">
          <TableHeader>
            <TableRow>
              <TableHead resizable width={200} {...props}>
                Name
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table layout="fixed">
          <TableHeader>
            <TableRow>
              <TableHead resizable width={200}>
                <strong>Rich</strong>
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
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
