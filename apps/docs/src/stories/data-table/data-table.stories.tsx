import {
  Button,
  Checkbox,
  DataTable,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@codefixlabs/ui';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontalIcon } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

/* -----------------------------------------------------------------------------
 * Prepare
 * -------------------------------------------------------------------------- */

const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

interface Payment {
  amount: number;
  email: string;
  id: string;
  status: 'failed' | 'pending' | 'processing' | 'success';
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorFn: (row) => row.id,
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(Boolean(value));
        }}
      />
    ),
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => {
          if (table.getIsSomePageRowsSelected()) {
            table.toggleAllPageRowsSelected(false);
          } else {
            table.toggleAllPageRowsSelected(Boolean(value));
          }
        }}
      />
    ),
    id: 'select',
    meta: {
      className: 'sticky left-0 z-10 bg-inherit',
    },
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: 'email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    sortingFn: 'text',
  },
  {
    accessorKey: 'amount',
    cell: ({ row }): React.JSX.Element => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formattedAmount = formatter.format(amount);

      return <div className="text-right font-medium">{formattedAmount}</div>;
    },
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Amount" />
      </div>
    ),
  },
  {
    cell: ({ row }) => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              className="data-state-open:bg-accent"
              startIcon={<MoreHorizontalIcon size={16} />}
              variant="ghost"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                void navigator.clipboard.writeText(row.original.id)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    id: 'actions',
    meta: {
      className: 'sticky right-0 z-10 bg-inherit',
    },
  },
];

const data: Payment[] = Array.from({ length: 200 }, () => ({
  amount: faker.number.float({ max: 99999, min: 1 }),
  email: faker.internet.email(),
  id: faker.string.uuid(),
  status: faker.helpers.arrayElement([
    'pending',
    'processing',
    'success',
    'failed',
  ]),
}));

const meta: Meta<typeof DataTable<Payment>> = {
  component: DataTable,
  tags: ['autodocs'],
  title: 'UI/Data Table',
  args: {
    columns,
    data,
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

/* -----------------------------------------------------------------------------
 * Story: Basic
 * -------------------------------------------------------------------------- */

export const Basic: Story = {
  render: (args) => (
    <DataTable
      {...args}
      classNames={{
        header: 'border-b border-slate-200',
        body: 'divide-y divide-slate-200',
      }}
    />
  ),
};

export const StickyHeader: Story = {
  render: (args) => (
    <DataTable
      classNames={{
        root: 'h-96',
        header:
          'sticky top-0 z-20 border-b border-slate-200 shadow shadow-slate-200',
        body: 'divide-y divide-slate-200',
      }}
      {...args}
    />
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <DataTable
      {...args}
      classNames={{
        header: 'border-b border-slate-200',
        body: 'divide-y divide-slate-200',
        footer: 'border-t border-slate-200',
      }}
      showFooter
    />
  ),
};

export const CustomToolbar: Story = {
  render: (args) => (
    <DataTable
      {...args}
      classNames={{
        header: 'border-b border-slate-200',
        body: 'divide-y divide-slate-200',
      }}
      endToolbar={(table) => <div>World {table.getPageCount()}</div>}
      startToolbar={<div>Hello</div>}
    />
  ),
};
