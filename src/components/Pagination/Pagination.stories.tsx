import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pagination with page navigation, ellipsis and accessible links. Supports custom sizes and variants.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pagination example with numbered pages.
 */
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * Pagination with ellipsis for many pages.
 */
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * Pagination with custom labels.
 */
export const CustomLabels: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" label="Prev" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" label="Next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * Small size pagination.
 */
export const Small: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="sm" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="sm">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="sm" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="sm">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="sm" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * Large size pagination.
 */
export const Large: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="lg" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="lg">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="lg" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="lg">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="lg" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * Interactive controlled pagination example.
 */
export const Controlled: Story = {
  render: function ControlledComponent() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const renderPageNumbers = () => {
      const pages = [];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i);
                }}
              >
                {String(i)}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Show pages with ellipsis
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              isActive={currentPage === 1}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (currentPage > 3) {
          pages.push(
            <PaginationItem key="ellipsis1">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i);
                }}
              >
                {String(i)}
              </PaginationLink>
            </PaginationItem>
          );
        }

        if (currentPage < totalPages - 2) {
          pages.push(
            <PaginationItem key="ellipsis2">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            >
              {String(totalPages)}
            </PaginationLink>
          </PaginationItem>
        );
      }

      return pages;
    };

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'mdt-pointer-events-none mdt-opacity-50' : ''}
              />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages ? 'mdt-pointer-events-none mdt-opacity-50' : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    );
  },
};

/**
 * Pagination with disabled state.
 */
export const Disabled: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="mdt-pointer-events-none mdt-opacity-50"
            aria-disabled="true"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * A link when it has somewhere to go, a button when it has not.
 *
 * **Both kinds of pager are real.** `/tickets?page=3` is an address worth
 * having - it can be opened in a new tab, bookmarked, sent to a colleague and
 * read by a crawler. A table that pages in place has nowhere to go, and its
 * controls are state.
 *
 * Rendering an anchor for both is the version of this that looks fine and is
 * not. An `<a>` with no `href` is neither focusable nor announced as a link;
 * one with `href="#"` navigates and puts a stray `#` in the address bar; and no
 * anchor can be disabled, which is exactly what a pager needs at both ends.
 *
 * So `href` decides. Tab through both rows below: the top one is three links
 * and the disabled control is still reachable, marked `aria-disabled`, because
 * that is the whole of what HTML allows. The bottom one is buttons, and the
 * disabled control is genuinely inert.
 */
export const LinksOrButtons: Story = {
  render: function LinksOrButtonsDemo() {
    const [page, setPage] = useState(2);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-text-sm mdt-font-medium">With an href - anchors</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#page1" disabled />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page1" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page2">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#page2" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-text-sm mdt-font-medium">Without one - buttons, page {page}</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={page === 1}
                  onClick={() => {
                    setPage((current) => Math.max(1, current - 1));
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    isActive={number === page}
                    onClick={() => {
                      setPage(number);
                    }}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  disabled={page === 3}
                  onClick={() => {
                    setPage((current) => Math.min(3, current + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
};
