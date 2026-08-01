import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './Pagination';

describe('Pagination', () => {
  it('renders pagination navigation', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'pagination');
  });

  it('renders pagination links', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#page1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#page2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders active link with aria-current', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              Active
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const activeLink = screen.getByText('Active');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders previous button', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#prev" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const prev = screen.getByLabelText('Go to previous page');
    expect(prev).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });

  it('renders next button', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const next = screen.getByLabelText('Go to next page');
    expect(next).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders ellipsis', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('More pages')).toBeInTheDocument();
  });

  it('renders custom button labels', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" label="Back" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" label="Forward" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" size="sm">
              Small
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="lg">
              Large
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('Small')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    const paginationRef = { current: null as HTMLElement | null };
    const linkRef = { current: null as HTMLAnchorElement | null };
    render(
      <Pagination ref={paginationRef}>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" ref={linkRef}>
              Link
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(paginationRef.current).toBeInstanceOf(HTMLElement);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
  });

  describe('link or button', () => {
    it('is a link when it has somewhere to go', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="/tickets?page=2">2</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const link = screen.getByRole('link', { name: '2' });
      expect(link).toHaveAttribute('href', '/tickets?page=2');
    });

    it('is a button when it has not', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      // An anchor with no href is neither focusable nor announced as a link,
      // and one with href="#" navigates. A page held in component state is a
      // button.
      const button = screen.getByRole('button', { name: '2' });
      expect(button).toHaveAttribute('type', 'button');
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('calls back when the button is pressed', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink onClick={onClick}>3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      await user.click(screen.getByRole('button', { name: '3' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('disables the button for real', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled onClick={onClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      const previous = screen.getByRole('button', { name: 'Go to previous page' });
      expect(previous).toBeDisabled();
      await user.click(previous);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('says a link is disabled and takes it out of the tab order', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext href="#next" disabled />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      // HTML has no disabled link, so this is the whole of what can be done -
      // and it is what a screen reader needs regardless.
      const next = screen.getByRole('link', { name: 'Go to next page' });
      expect(next).toHaveAttribute('aria-disabled', 'true');
      expect(next).toHaveAttribute('tabindex', '-1');
    });

    it('marks the page you are on either way', () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink isActive>4</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      expect(screen.getByRole('button', { name: '4' })).toHaveAttribute('aria-current', 'page');
    });
  });
});
