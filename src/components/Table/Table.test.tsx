import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
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
      ['condensed', 'mdt-h-8', 'mdt-px-2'],
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

    it('defaults to `default` density when not given', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>C</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('td')).toHaveClass('mdt-p-4');
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
      expect(th).toHaveClass('mdt-z-sticky');
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
});
