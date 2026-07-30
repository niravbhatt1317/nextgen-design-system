import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../Pagination';
import { Skeleton } from '../Skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A semantic HTML table component with sub-components for building accessible and well-structured data tables. Includes support for headers, body, footer, captions, and various interactive features.',
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

// Sample data
const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
];

/**
 * Default table with basic invoice data.
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="mdt-w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="mdt-text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="mdt-font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="mdt-text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with a caption describing the data.
 */
export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="mdt-w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="mdt-text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 5).map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="mdt-font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="mdt-text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with a footer row showing totals.
 */
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="mdt-w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="mdt-text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 5).map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="mdt-font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="mdt-text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="mdt-text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * Table with alternating row colors (striped).
 */
export const StripedRows: Story = {
  render: () => (
    <Table>
      <TableCaption>User list with striped rows for better readability.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id} className={index % 2 === 0 ? 'mdt-bg-muted/50' : undefined}>
            <TableCell className="mdt-font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Interactive table with sortable headers.
 */
export const SortableHeaders: Story = {
  render: function SortableTable() {
    type SortKey = 'name' | 'email' | 'role' | 'status';
    type SortOrder = 'asc' | 'desc' | null;

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);

    const handleSort = (key: SortKey) => {
      if (sortKey === key) {
        if (sortOrder === 'asc') {
          setSortOrder('desc');
        } else if (sortOrder === 'desc') {
          setSortKey(null);
          setSortOrder(null);
        } else {
          setSortOrder('asc');
        }
      } else {
        setSortKey(key);
        setSortOrder('asc');
      }
    };

    const sortedUsers = [...users].sort((a, b) => {
      if (!sortKey || !sortOrder) return 0;

      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => (
      <span className="mdt-ml-2 mdt-inline-flex mdt-flex-col">
        <Icon
          name="chevron-up"
          size="xs"
          className={
            active && order === 'asc' ? 'mdt-text-foreground' : 'mdt-text-muted-foreground/40'
          }
        />
        <Icon
          name="chevron-down"
          size="xs"
          className={`mdt--mt-1 ${active && order === 'desc' ? 'mdt-text-foreground' : 'mdt-text-muted-foreground/40'}`}
        />
      </span>
    );

    return (
      <Table>
        <TableCaption>Click on column headers to sort the data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleSort('name');
                }}
                className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                aria-label="Sort by name"
              >
                Name
                <SortIcon
                  active={sortKey === 'name'}
                  order={sortKey === 'name' ? sortOrder : null}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleSort('email');
                }}
                className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                aria-label="Sort by email"
              >
                Email
                <SortIcon
                  active={sortKey === 'email'}
                  order={sortKey === 'email' ? sortOrder : null}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleSort('role');
                }}
                className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                aria-label="Sort by role"
              >
                Role
                <SortIcon
                  active={sortKey === 'role'}
                  order={sortKey === 'role' ? sortOrder : null}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleSort('status');
                }}
                className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                aria-label="Sort by status"
              >
                Status
                <SortIcon
                  active={sortKey === 'status'}
                  order={sortKey === 'status' ? sortOrder : null}
                />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="mdt-font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * Table with selectable rows using checkboxes.
 */
export const SelectableRows: Story = {
  render: function SelectableTable() {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const toggleRow = (id: number) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };

    const toggleAll = () => {
      setSelectedRows((prev) => (prev.length === users.length ? [] : users.map((u) => u.id)));
    };

    return (
      <div>
        <div className="mdt-mb-4 mdt-text-sm mdt-text-muted-foreground">
          {selectedRows.length} of {users.length} row(s) selected.
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="mdt-w-[50px]">
                <Checkbox
                  checked={selectedRows.length === users.length}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                data-state={selectedRows.includes(user.id) ? 'selected' : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={() => {
                      toggleRow(user.id);
                    }}
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>
                <TableCell className="mdt-font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

/**
 * Compact/dense table with reduced padding.
 */
export const CompactDense: Story = {
  render: () => (
    <Table>
      <TableCaption>Compact table with reduced cell padding.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="mdt-h-8 mdt-px-2">ID</TableHead>
          <TableHead className="mdt-h-8 mdt-px-2">Name</TableHead>
          <TableHead className="mdt-h-8 mdt-px-2">Email</TableHead>
          <TableHead className="mdt-h-8 mdt-px-2">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="mdt-px-2 mdt-py-2">{user.id}</TableCell>
            <TableCell className="mdt-px-2 mdt-py-2 mdt-font-medium">{user.name}</TableCell>
            <TableCell className="mdt-px-2 mdt-py-2">{user.email}</TableCell>
            <TableCell className="mdt-px-2 mdt-py-2">{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table showing loading state with skeletons.
 */
export const WithLoadingState: Story = {
  render: () => (
    <Table>
      <TableCaption>Loading table data...</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="mdt-text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="mdt-h-4 mdt-w-[80px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="mdt-h-4 mdt-w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="mdt-h-4 mdt-w-[120px]" />
            </TableCell>
            <TableCell className="mdt-text-right">
              <Skeleton className="mdt-ml-auto mdt-h-4 mdt-w-[80px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with pagination controls.
 */
export const WithPagination: Story = {
  render: function PaginatedTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(invoices.length / itemsPerPage);

    const paginatedData = invoices.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <div className="mdt-space-y-4">
        <Table>
          <TableCaption>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, invoices.length)} of {invoices.length} invoices.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="mdt-w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="mdt-text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="mdt-font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="mdt-text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

/**
 * Table showing empty state.
 */
export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableCaption>No invoices found.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="mdt-w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="mdt-text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="mdt-h-24 mdt-text-center">
            <div className="mdt-flex mdt-flex-col mdt-items-center mdt-justify-center mdt-gap-2">
              <Icon name="inbox" size="xl" color="muted" className="mdt-opacity-50" />
              <div className="mdt-text-sm mdt-text-muted-foreground">No data available.</div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Full-featured table with sorting, selection, and pagination.
 */
export const FullFeatured: Story = {
  render: function FullFeaturedTable() {
    type SortKey = 'name' | 'email' | 'role' | 'status';
    type SortOrder = 'asc' | 'desc' | null;

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handleSort = (key: SortKey) => {
      if (sortKey === key) {
        if (sortOrder === 'asc') {
          setSortOrder('desc');
        } else if (sortOrder === 'desc') {
          setSortKey(null);
          setSortOrder(null);
        } else {
          setSortOrder('asc');
        }
      } else {
        setSortKey(key);
        setSortOrder('asc');
      }
    };

    const sortedUsers = [...users].sort((a, b) => {
      if (!sortKey || !sortOrder) return 0;

      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const paginatedUsers = sortedUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const toggleRow = (id: number) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };

    const toggleAll = () => {
      const currentPageIds = paginatedUsers.map((u) => u.id);
      const allCurrentSelected = currentPageIds.every((id) => selectedRows.includes(id));

      if (allCurrentSelected) {
        setSelectedRows((prev) => prev.filter((id) => !currentPageIds.includes(id)));
      } else {
        setSelectedRows((prev) => [...new Set([...prev, ...currentPageIds])]);
      }
    };

    const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => (
      <span className="mdt-ml-2 mdt-inline-flex mdt-flex-col">
        <Icon
          name="chevron-up"
          size="xs"
          className={
            active && order === 'asc' ? 'mdt-text-foreground' : 'mdt-text-muted-foreground/40'
          }
        />
        <Icon
          name="chevron-down"
          size="xs"
          className={`mdt--mt-1 ${active && order === 'desc' ? 'mdt-text-foreground' : 'mdt-text-muted-foreground/40'}`}
        />
      </span>
    );

    return (
      <div className="mdt-space-y-4">
        <div className="mdt-text-sm mdt-text-muted-foreground">
          {selectedRows.length} of {users.length} row(s) selected.
        </div>

        <Table>
          <TableCaption>Full-featured table with sorting, selection, and pagination.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="mdt-w-[50px]">
                <Checkbox
                  checked={paginatedUsers.every((u) => selectedRows.includes(u.id))}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows on this page"
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSort('name');
                  }}
                  className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                  aria-label="Sort by name"
                >
                  Name
                  <SortIcon
                    active={sortKey === 'name'}
                    order={sortKey === 'name' ? sortOrder : null}
                  />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSort('email');
                  }}
                  className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                  aria-label="Sort by email"
                >
                  Email
                  <SortIcon
                    active={sortKey === 'email'}
                    order={sortKey === 'email' ? sortOrder : null}
                  />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSort('role');
                  }}
                  className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                  aria-label="Sort by role"
                >
                  Role
                  <SortIcon
                    active={sortKey === 'role'}
                    order={sortKey === 'role' ? sortOrder : null}
                  />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSort('status');
                  }}
                  className="mdt-flex mdt-items-center mdt-font-medium hover:mdt-text-foreground"
                  aria-label="Sort by status"
                >
                  Status
                  <SortIcon
                    active={sortKey === 'status'}
                    order={sortKey === 'status' ? sortOrder : null}
                  />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                data-state={selectedRows.includes(user.id) ? 'selected' : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={() => {
                      toggleRow(user.id);
                    }}
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>
                <TableCell className="mdt-font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};
