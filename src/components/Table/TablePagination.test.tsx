import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TablePagination } from './TablePagination';

/** Page 2 of 5, 25 to a page, 120 rows - the ordinary case. */
const props = {
  page: 2,
  pageCount: 5,
  from: 25,
  to: 50,
  total: 120,
  pageSize: 25,
  onPageChange: () => undefined,
};

describe('TablePagination', () => {
  describe('the count', () => {
    it('says which rows these are, out of how many', () => {
      render(<TablePagination {...props} />);
      // `from` is a 0-based index and this is a sentence about rows.
      expect(screen.getByText('26–50 of 120')).toBeInTheDocument();
    });

    it('says nothing odd about an empty table', () => {
      render(<TablePagination {...props} page={1} pageCount={1} from={0} to={0} total={0} />);
      expect(screen.getByText('0 of 0')).toBeInTheDocument();
    });

    it('stays when there is only one page', () => {
      render(<TablePagination {...props} page={1} pageCount={1} from={0} to={8} total={8} />);
      // The pager has nothing to offer; the table still has something to say.
      expect(screen.getByText('1–8 of 8')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('the pages', () => {
    it('offers every page while they fit', () => {
      render(<TablePagination {...props} />);
      for (const page of [1, 2, 3, 4, 5]) {
        expect(screen.getByRole('button', { name: `Go to page ${String(page)}` })).toBeVisible();
      }
    });

    it('marks the page you are on', () => {
      render(<TablePagination {...props} />);
      expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute(
        'aria-current',
        'page'
      );
    });

    it('goes to the page that was pressed', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...props} onPageChange={onPageChange} />);
      await user.click(screen.getByRole('button', { name: 'Go to page 4' }));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('steps forward and back', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...props} onPageChange={onPageChange} />);
      await user.click(screen.getByRole('button', { name: 'Go to next page' }));
      expect(onPageChange).toHaveBeenLastCalledWith(3);
      await user.click(screen.getByRole('button', { name: 'Go to previous page' }));
      expect(onPageChange).toHaveBeenLastCalledWith(1);
    });

    it('disables the ends, for real', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...props} page={1} onPageChange={onPageChange} />);
      const previous = screen.getByRole('button', { name: 'Go to previous page' });
      expect(previous).toBeDisabled();
      await user.click(previous);
      // A disabled anchor is a thing that does not exist, which is why the
      // whole pager renders as buttons when there is nowhere to navigate to.
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it('disables the far end on the last page', () => {
      render(<TablePagination {...props} page={5} />);
      expect(screen.getByRole('button', { name: 'Go to next page' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeEnabled();
    });

    it('gaps a long list rather than printing forty numbers', () => {
      render(<TablePagination {...props} page={10} pageCount={40} />);
      expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeVisible();
      expect(screen.getByRole('button', { name: 'Go to page 40' })).toBeVisible();
      expect(screen.queryByRole('button', { name: 'Go to page 20' })).not.toBeInTheDocument();
    });
  });

  describe('rows per page', () => {
    it('appears only when there is something to do with it', () => {
      render(<TablePagination {...props} />);
      expect(screen.queryByText('Rows per page')).not.toBeInTheDocument();
    });

    it('offers the sizes and reports the choice', async () => {
      const user = userEvent.setup();
      const onPageSizeChange = vi.fn();
      render(<TablePagination {...props} onPageSizeChange={onPageSizeChange} />);
      await user.click(screen.getByRole('combobox', { name: 'Rows per page' }));
      await user.click(screen.getByRole('option', { name: '50' }));
      expect(onPageSizeChange).toHaveBeenCalledWith(50);
    });

    it('offers the sizes it was given', async () => {
      const user = userEvent.setup();
      render(
        <TablePagination {...props} pageSizes={[5, 500]} onPageSizeChange={() => undefined} />
      );
      await user.click(screen.getByRole('combobox', { name: 'Rows per page' }));
      expect(screen.getByRole('option', { name: '500' })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: '25' })).not.toBeInTheDocument();
    });
  });
});
