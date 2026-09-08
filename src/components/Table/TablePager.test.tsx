import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TableLoadMore, TablePager } from './TablePager';

function pager(overrides: Partial<Parameters<typeof TablePager>[0]> = {}) {
  const onPage = vi.fn();
  const onPageSize = vi.fn();
  const view = render(
    <TablePager
      total={1240}
      page={3}
      pageSize={25}
      onPage={onPage}
      onPageSize={onPageSize}
      noun="people"
      {...overrides}
    />
  );
  return { ...view, onPage, onPageSize, user: userEvent.setup() };
}

const button = (name: string) => screen.getByRole('button', { name });
const pageBox = () => screen.getByLabelText('Page number');

describe('TablePager', () => {
  describe('the count', () => {
    it('reads as a range out of the total, with thousands separated', () => {
      pager();
      expect(screen.getByText('51–75 of 1,240 people')).toBeInTheDocument();
    });

    it('starts at zero when there is nothing', () => {
      pager({ total: 0 });
      expect(screen.getByText('0–0 of 0 people')).toBeInTheDocument();
    });

    it('stops at the total on a short last page', () => {
      pager({ total: 55, page: 3 });
      expect(screen.getByText('51–55 of 55 people')).toBeInTheDocument();
    });

    it('gives way to a message when one is supplied', () => {
      pager({ message: '12 selected' });
      expect(screen.getByText('12 selected')).toBeInTheDocument();
      expect(screen.queryByText(/of 1,240 people/)).not.toBeInTheDocument();
    });
  });

  describe('the page count', () => {
    it('rounds up to cover a partial page', () => {
      pager({ total: 1240, pageSize: 25 });
      expect(screen.getByText('of 50')).toBeInTheDocument();
    });

    it('is never less than one, even with no rows', () => {
      pager({ total: 0 });
      expect(screen.getByText('of 1')).toBeInTheDocument();
    });
  });

  describe('stepping', () => {
    it('goes to the first page', async () => {
      const { user, onPage } = pager();
      await user.click(button('First page'));
      expect(onPage).toHaveBeenCalledWith(1);
    });

    it('goes back one', async () => {
      const { user, onPage } = pager();
      await user.click(button('Previous page'));
      expect(onPage).toHaveBeenCalledWith(2);
    });

    it('goes forward one', async () => {
      const { user, onPage } = pager();
      await user.click(button('Next page'));
      expect(onPage).toHaveBeenCalledWith(4);
    });

    it('goes to the last page', async () => {
      const { user, onPage } = pager();
      await user.click(button('Last page'));
      expect(onPage).toHaveBeenCalledWith(50);
    });

    it('cannot go back from the first page', () => {
      pager({ page: 1 });
      expect(button('First page')).toBeDisabled();
      expect(button('Previous page')).toBeDisabled();
      expect(button('Next page')).toBeEnabled();
    });

    it('cannot go on from the last page', () => {
      pager({ page: 50 });
      expect(button('Next page')).toBeDisabled();
      expect(button('Last page')).toBeDisabled();
      expect(button('Previous page')).toBeEnabled();
    });

    it('disables everything when there is nothing to page through', () => {
      pager({ total: 0, page: 1 });
      expect(button('First page')).toBeDisabled();
      expect(button('Next page')).toBeDisabled();
      expect(button('Rows per page')).toBeDisabled();
      expect(pageBox()).toBeDisabled();
    });
  });

  describe('typing a page', () => {
    it('shows the page it is on', () => {
      pager();
      expect(pageBox()).toHaveValue('3');
    });

    it('goes there on Enter', async () => {
      const { user, onPage } = pager();
      await user.clear(pageBox());
      await user.type(pageBox(), '12{Enter}');
      expect(onPage).toHaveBeenCalledWith(12);
    });

    it('goes there on leaving the box', async () => {
      const { user, onPage } = pager();
      await user.clear(pageBox());
      await user.type(pageBox(), '12');
      await user.tab();
      expect(onPage).toHaveBeenCalledWith(12);
    });

    it('does nothing on other keys', async () => {
      const { user, onPage } = pager();
      await user.type(pageBox(), '9');
      expect(onPage).not.toHaveBeenCalled();
    });

    it('clamps past the last page', async () => {
      const { user, onPage } = pager();
      await user.clear(pageBox());
      await user.type(pageBox(), '999{Enter}');
      expect(onPage).toHaveBeenCalledWith(50);
    });

    it('clamps below the first page', async () => {
      const { user, onPage } = pager();
      await user.clear(pageBox());
      await user.type(pageBox(), '0{Enter}');
      expect(onPage).toHaveBeenCalledWith(1);
    });

    it('puts back the current page when what was typed is not a number', async () => {
      const { user, onPage } = pager();
      await user.clear(pageBox());
      await user.type(pageBox(), 'abc{Enter}');
      expect(onPage).not.toHaveBeenCalled();
      expect(pageBox()).toHaveValue('3');
    });

    it('follows the page when it changes from outside', () => {
      const { rerender } = pager();
      expect(pageBox()).toHaveValue('3');
      rerender(
        <TablePager
          total={1240}
          page={7}
          pageSize={25}
          onPage={vi.fn()}
          onPageSize={vi.fn()}
          noun="people"
        />
      );
      expect(pageBox()).toHaveValue('7');
    });
  });

  describe('rows per page', () => {
    it('shows the size it is on', () => {
      pager();
      expect(button('Rows per page')).toHaveTextContent('25 rows/page');
    });

    it('offers the sizes and changes to one', async () => {
      const { user, onPageSize } = pager();
      await user.click(button('Rows per page'));
      await user.click(await screen.findByRole('menuitem', { name: /50 rows\/page/ }));
      expect(onPageSize).toHaveBeenCalledWith(50);
    });

    it('takes a custom set of sizes', async () => {
      const { user } = pager({ pageSizes: [10, 20] });
      await user.click(button('Rows per page'));
      expect(await screen.findByRole('menuitem', { name: /10 rows\/page/ })).toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /100 rows\/page/ })).not.toBeInTheDocument();
    });
  });
});

describe('TableLoadMore', () => {
  it('says how many of the total are showing', () => {
    render(<TableLoadMore shown={25} total={1240} noun="people" onMore={vi.fn()} />);
    expect(screen.getByText('Showing 25 of 1,240 people')).toBeInTheDocument();
  });

  it('never claims to show more than there are', () => {
    render(<TableLoadMore shown={99} total={40} noun="people" onMore={vi.fn()} />);
    expect(screen.getByText('Showing 40 of 40 people')).toBeInTheDocument();
  });

  it('loads more', async () => {
    const user = userEvent.setup();
    const onMore = vi.fn();
    render(<TableLoadMore shown={25} total={1240} noun="people" onMore={onMore} />);
    await user.click(screen.getByRole('button', { name: 'Load more' }));
    expect(onMore).toHaveBeenCalled();
  });

  it('offers nothing more once everything is shown', () => {
    render(<TableLoadMore shown={40} total={40} noun="people" onMore={vi.fn()} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('waits while it loads', () => {
    render(<TableLoadMore shown={25} total={1240} noun="people" loading onMore={vi.fn()} />);
    const more = screen.getByRole('button', { name: 'Loading…' });
    expect(more).toBeDisabled();
    expect(more).toHaveAttribute('aria-busy', 'true');
  });
});
