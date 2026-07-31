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
import type { TableSortOrder } from './Table.types';

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
    <Table striped>
      <TableCaption>
        One prop. Striping applies to body rows only — a striped header reads as a mistake.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
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
 * All three densities, side by side. `default` is exactly the spacing this table
 * had before density existed, so an existing table does not move.
 */
export const Density: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-8">
      {(['condensed', 'default', 'relaxed'] as const).map((density) => (
        <div key={density}>
          <p className="mdt-mb-2 mdt-text-sm mdt-font-medium mdt-text-muted-foreground">
            density=&quot;{density}&quot;
          </p>
          <Table density={density}>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="mdt-font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
};

/**
 * Alignment follows the **data type**, not preference: text left, numbers right
 * so digits line up by place value and magnitudes compare at a glance.
 */
export const Alignment: Story = {
  render: () => (
    <Table>
      <TableCaption>
        Numbers on the right. This one rule fixes most “messy table” complaints.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead align="center">Qty</TableHead>
          <TableHead align="right">Unit price</TableHead>
          <TableHead align="right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { item: 'Annual licence', qty: 12, unit: '1,204.00', total: '14,448.00' },
          { item: 'Support hours', qty: 3, unit: '95.50', total: '286.50' },
          { item: 'Onboarding', qty: 1, unit: '2,000.00', total: '2,000.00' },
        ].map((row) => (
          <TableRow key={row.item}>
            <TableCell className="mdt-font-medium">{row.item}</TableCell>
            <TableCell align="center">{row.qty}</TableCell>
            <TableCell align="right">{row.unit}</TableCell>
            <TableCell align="right">{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell align="right">16,734.50</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * A sticky header becomes necessary the moment a table is tall enough that the
 * column titles scroll out of view. Scroll the area below to see it hold.
 */
export const StickyHeader: Story = {
  render: () => (
    <div className="mdt-h-64 mdt-overflow-auto mdt-rounded-md mdt-border">
      <Table stickyHeader density="condensed">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead align="right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 30 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="mdt-font-medium">Row {i + 1}</TableCell>
              <TableCell>row{i + 1}@example.com</TableCell>
              <TableCell align="right">{(i + 1) * 7}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * Sorting is a contract, not an implementation. `TableHead` renders the control
 * and the affordance and sets `aria-sort`; the sorting itself stays yours, so
 * you can sort locally, on a server, or through TanStack Table without the
 * component getting in the way.
 *
 * A column that is sortable but not currently sorted shows a neutral
 * double-arrow rather than an arrow pointing somewhere arbitrary — an arrow with
 * no state is the commonest sort bug there is.
 */
export const SortableHeaders: Story = {
  render: function SortableTable() {
    type SortKey = 'name' | 'email' | 'role' | 'status';

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<TableSortOrder>(null);

    // Ascending, then descending, then off. Cycling back to unsorted matters:
    // without it there is no way back to the data's natural order.
    const handleSort = (key: SortKey) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortOrder('ascend');
        return;
      }
      if (sortOrder === 'ascend') {
        setSortOrder('descend');
        return;
      }
      setSortKey(null);
      setSortOrder(null);
    };

    const sortedUsers = [...users].sort((a, b) => {
      if (!sortKey || !sortOrder) return 0;
      const direction = sortOrder === 'ascend' ? 1 : -1;
      return a[sortKey] > b[sortKey] ? direction : -direction;
    });

    const columns: { key: SortKey; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ];

    return (
      <Table>
        <TableCaption>
          Click a header to sort. Third click returns to the unsorted order.
        </TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                sortable
                sortOrder={sortKey === column.key ? sortOrder : null}
                onSort={() => {
                  handleSort(column.key);
                }}
              >
                {column.label}
              </TableHead>
            ))}
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
              <TableRow key={user.id} selected={selectedRows.includes(user.id)}>
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
 * The same table at `density="condensed"`. This used to be hand-written padding
 * on every single cell — the story demonstrated a capability the component did
 * not actually have, so every product rebuilt it slightly differently.
 */
export const CompactDense: Story = {
  render: () => (
    <Table density="condensed">
      <TableCaption>One prop on the table, not a class on every cell.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead align="right">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell align="right">{user.id}</TableCell>
            <TableCell className="mdt-font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
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
              <TableRow key={user.id} selected={selectedRows.includes(user.id)}>
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
