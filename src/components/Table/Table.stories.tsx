import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import {
  Pagination,
  PaginationContent,
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
  TableExpandTrigger,
  TableGroupRow,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';
import type { TableSortOrder } from './Table.types';
import { useColumnWidths } from './useColumnWidths';

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
    density: {
      control: 'inline-radio',
      options: ['short', 'compact', 'default', 'relaxed'],
      description:
        'Row height and cell padding. Four steps, following Airtable — the only reference that ships a row-height picker to the user rather than fixing it at design time.',
      table: {
        type: { summary: "'short' | 'compact' | 'default' | 'relaxed'" },
        defaultValue: { summary: 'compact' },
      },
    },
    striped: {
      control: 'boolean',
      description:
        'Zebra-stripe alternate body rows. Off by default — a single row divider carries the structure in most tables, but long dense ones read better striped.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    stickyHeader: {
      control: 'boolean',
      description:
        'Keep the header visible while the body scrolls. **Needs `maxHeight`** — sticky positions against the nearest scrolling ancestor, and without a height the table never scrolls.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    maxHeight: {
      control: 'text',
      description:
        'Caps the height and makes the table scroll internally. This is what a sticky header and a pinned summary row hold onto. Accepts anything CSS does.',
      table: { type: { summary: 'string | number' } },
    },
    layout: {
      control: 'inline-radio',
      options: ['auto', 'fixed'],
      description:
        'How column widths are decided. Use `fixed` when rows appear and disappear — collapsing a group in an `auto` table visibly resizes every column.',
      table: { type: { summary: "'auto' | 'fixed'" }, defaultValue: { summary: 'auto' } },
    },
    containerClassName: {
      control: 'text',
      description:
        'Classes for the scroll container. A border radius has to go here rather than on a wrapper of your own — the scroll container is what clips, so a radius outside it gets painted over by the sticky header.',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the `<table>` element',
      table: { type: { summary: 'string' } },
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
  args: { density: 'compact', striped: false, layout: 'auto' },
  render: (args) => (
    <Table {...args}>
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
      {(['short', 'compact', 'default', 'relaxed'] as const).map((density) => (
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
              {users.slice(0, 2).map((user) => (
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
    <Table
      stickyHeader
      maxHeight="16rem"
      density="short"
      containerClassName="mdt-rounded-md mdt-border"
    >
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
 * The same table at `density="short"`. This used to be hand-written padding
 * on every single cell — the story demonstrated a capability the component did
 * not actually have, so every product rebuilt it slightly differently.
 */
export const CompactDense: Story = {
  render: () => (
    <Table density="short">
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
 * Everything at once — density, sorting, selection, a sticky header and
 * pagination — built entirely from the component's own props.
 *
 * This story used to hand-assemble its sorting: a bespoke `SortIcon`, stacked
 * chevrons, and every header wrapped in a `Button`. About fifty lines of
 * scaffolding, none of it reusable, and no `aria-sort` for screen readers.
 * It is six lines now, and it is the story people copy from.
 */
export const FullFeatured: Story = {
  render: function FullFeaturedTable() {
    type SortKey = 'name' | 'email' | 'role' | 'status';

    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortOrder, setSortOrder] = useState<TableSortOrder>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

    const toggleRow = (id: number) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };

    const allSelected = selectedRows.length === users.length;

    const columns: { key: SortKey; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ];

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <p className="mdt-text-sm mdt-text-muted-foreground">
          {selectedRows.length} of {users.length} row(s) selected.
        </p>

        <Table
          stickyHeader
          maxHeight="18rem"
          layout="fixed"
          containerClassName="mdt-rounded-md mdt-border"
        >
          <TableHeader>
            <TableRow>
              <TableHead className="mdt-w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={() => {
                    setSelectedRows(allSelected ? [] : users.map((u) => u.id));
                  }}
                  aria-label="Select all rows"
                />
              </TableHead>
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
              <PaginationPrevious href="#" />
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

/**
 * Grouped rows were the commonest structure across the reference tables — Jira,
 * Height, ClickUp, GitHub Projects, Attio and bank statements all use them.
 *
 * `TableGroupRow` spans the whole table. Pass `onToggle` to make it collapsible;
 * leave it off and no control is rendered, rather than a dead one.
 */
export const GroupedRows: Story = {
  render: function Grouped() {
    const groups = [
      { name: 'Mobile App', rows: users.slice(0, 2) },
      { name: 'Platform', rows: users.slice(2, 5) },
    ];
    const [collapsed, setCollapsed] = useState<string[]>([]);

    const toggle = (name: string) => {
      setCollapsed((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    };

    return (
      <Table layout="fixed">
        <TableCaption>
          Click a group heading to collapse it. `layout=&quot;fixed&quot;` keeps the columns still —
          without it the browser re-measures from whatever rows are left and every column jumps.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="mdt-w-1/3">Name</TableHead>
            <TableHead className="mdt-w-1/2">Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <Fragment key={group.name}>
              <TableGroupRow
                colSpan={3}
                count={group.rows.length}
                expanded={!collapsed.includes(group.name)}
                onToggle={() => {
                  toggle(group.name);
                }}
              >
                {group.name}
              </TableGroupRow>
              {!collapsed.includes(group.name) &&
                group.rows.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="mdt-font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * A row that reveals child rows beneath it. `TableExpandTrigger` is a control you
 * place in a cell rather than a prop on the row — where the chevron belongs
 * differs from table to table, and the component has no business owning your
 * tree state.
 *
 * Child rows use `indent` on their **first cell only**. Indenting every cell
 * shifts the whole row and breaks the column alignment that makes a table
 * readable.
 */
export const ExpandableRows: Story = {
  render: function Expandable() {
    const [open, setOpen] = useState<number[]>([1]);
    const entries: Record<number, { label: string; hours: string }[]> = {
      1: [
        { label: '06:51 – 09:21', hours: '2h 30m' },
        { label: '09:20 – 09:21', hours: '0h' },
      ],
      2: [{ label: '10:00 – 10:39', hours: '38m' }],
    };

    const toggle = (id: number) => {
      setOpen((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]));
    };

    return (
      <Table>
        <TableCaption>Expand a task to see its time entries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead align="right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2].map((id) => (
            <Fragment key={id}>
              <TableRow>
                <TableCell>
                  <span className="mdt-inline-flex mdt-items-center mdt-gap-2">
                    <TableExpandTrigger
                      expanded={open.includes(id)}
                      onToggle={() => {
                        toggle(id);
                      }}
                      label={`Show entries for task ${String(id)}`}
                    />
                    <span className="mdt-font-medium">Feature {id === 1 ? 'A' : 'B'}</span>
                  </span>
                </TableCell>
                <TableCell align="right">{id === 1 ? '2h 30m' : '38m'}</TableCell>
              </TableRow>
              {open.includes(id) &&
                entries[id]?.map((entry) => (
                  <TableRow key={entry.label}>
                    <TableCell indent={1} className="mdt-text-muted-foreground">
                      {entry.label}
                    </TableCell>
                    <TableCell align="right">{entry.hours}</TableCell>
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * A total that sits somewhere other than the table foot. `TableFooter` already
 * treats its rows as summaries — `summary` is for a subtotal inside the body, or
 * a total row at the top, which is what the analytics references do.
 */
export const SummaryRows: Story = {
  render: () => (
    <Table striped>
      <TableCaption>
        A summary row is never striped and offers no hover — it is a conclusion, not a record.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Post</TableHead>
          <TableHead align="right">Impressions</TableHead>
          <TableHead align="right">Engagements</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow summary>
          <TableCell>3 posts</TableCell>
          <TableCell align="right">53</TableCell>
          <TableCell align="right">11</TableCell>
        </TableRow>
        {[
          { post: 'Launch announcement', impressions: 29, engagements: 5 },
          { post: 'Design system update', impressions: 13, engagements: 5 },
          { post: 'Hiring: product designer', impressions: 11, engagements: 1 },
        ].map((row) => (
          <TableRow key={row.post}>
            <TableCell>{row.post}</TableCell>
            <TableCell align="right">{row.impressions}</TableCell>
            <TableCell align="right">{row.engagements}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * A summary row pinned to the top or bottom of the scroll area.
 *
 * The shadow appears **only while something is scrolled underneath** the pinned
 * row. Scroll the table and watch the top row gain a shadow; scroll to the very
 * bottom and the pinned total loses its own, because at that point it is not
 * floating over anything.
 */
export const StickySummaryRows: Story = {
  render: () => (
    <Table maxHeight="16rem" layout="fixed" containerClassName="mdt-rounded-md mdt-border">
      <TableHeader>
        <TableRow>
          <TableHead>Post</TableHead>
          <TableHead align="right">Impressions</TableHead>
          <TableHead align="right">Engagements</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow summary sticky="top">
          <TableCell>20 posts</TableCell>
          <TableCell align="right">1,204</TableCell>
          <TableCell align="right">318</TableCell>
        </TableRow>
        {Array.from({ length: 20 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>Post {i + 1}</TableCell>
            <TableCell align="right">{(i + 1) * 13}</TableCell>
            <TableCell align="right">{(i + 1) * 3}</TableCell>
          </TableRow>
        ))}
        <TableRow summary sticky="bottom">
          <TableCell>Average</TableCell>
          <TableCell align="right">60</TableCell>
          <TableCell align="right">16</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * A first column pinned while the rest scrolls sideways — the pattern Jira,
 * crypto exchanges and booking tables all use when a row has more columns than
 * fit.
 *
 * Put `frozen` on the same column in **every** row, header included, or it will
 * pin in some rows and not others. Like a pinned row, the edge only asserts
 * itself once something has actually slid underneath: at rest it looks like any
 * other column.
 */
export const FrozenColumn: Story = {
  render: () => (
    <Table
      stickyHeader
      maxHeight="18rem"
      // The scroll container is capped so the demo overflows at any viewport. On
      // a wide screen the table simply fitted, so there was nothing to scroll
      // and the frozen column had nothing to prove - it worked in the docs page,
      // where the container is narrow, and looked broken in the story canvas.
      containerClassName="mdt-max-w-2xl mdt-rounded-md mdt-border"
      // `w-full` alone would squeeze the columns back to the container width.
      className="mdt-min-w-max"
    >
      <TableHeader>
        <TableRow>
          <TableHead frozen className="mdt-w-44">
            Market
          </TableHead>
          {['Base', 'Quote', 'Price', '24h low', '24h high', '24h change', 'Funding'].map((h) => (
            <TableHead key={h} align="right" className="mdt-w-32">
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 14 }, (_, i) => (
          <TableRow key={i}>
            <TableCell frozen className="mdt-font-medium">
              PAIR-{i + 1}
            </TableCell>
            <TableCell align="right">Bitcoin</TableCell>
            <TableCell align="right">US Dollar</TableCell>
            <TableCell align="right">{(90000 + i * 137).toLocaleString()}</TableCell>
            <TableCell align="right">{(87000 + i * 91).toLocaleString()}</TableCell>
            <TableCell align="right">{(91000 + i * 113).toLocaleString()}</TableCell>
            <TableCell align="right">{(i * 0.13).toFixed(2)}%</TableCell>
            <TableCell align="right">0.000{i}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Drag any column edge, or focus a handle and use the arrow keys — `Home` and
 * `End` jump to the bounds.
 *
 * Resizing is a contract, not an implementation: `TableHead` provides the handle
 * and its keyboard behaviour, the width stays yours. `useColumnWidths` holds the
 * arithmetic if you want it, the same way `useEditableTabs` holds the rules for
 * an editable tab bar.
 *
 * **`layout="fixed"` is required.** Under the default `auto` layout the browser
 * re-derives widths from content and fights whatever you set.
 */
export const ResizableColumns: Story = {
  render: function Resizable() {
    // Status carries no width on purpose. A fixed-layout table still fills its
    // container, so if every column is sized the browser scales all of them to
    // cover the difference and the handle stops tracking the cursor. One
    // unsized column absorbs the slack instead.
    const { widths, setWidth, reset, isResized } = useColumnWidths({
      name: 200,
      email: 260,
      role: 140,
    });

    const columns: { key: keyof typeof widths; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ];

    return (
      <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-3">
        <Button variant="outline" size="sm" onClick={reset} disabled={!isResized}>
          Reset widths
        </Button>
        <Table layout="fixed" containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  resizable
                  width={widths[column.key]}
                  onResize={(w) => {
                    setWidth(column.key, w);
                  }}
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="mdt-truncate mdt-font-medium">{user.name}</TableCell>
                <TableCell className="mdt-truncate">{user.email}</TableCell>
                <TableCell className="mdt-truncate">{user.role}</TableCell>
                <TableCell className="mdt-truncate">{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};
