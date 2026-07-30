import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
});
