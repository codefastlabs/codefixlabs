import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@codefixlabs/ui/react/dropdown-menu';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontalIcon } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  DataTable,
  DataTableColumnHeader,
} from '@codefixlabs/ui/react/data-table';
import { Checkbox } from '@codefixlabs/ui/react/checkbox';
import { Button } from '@codefixlabs/ui/react/button';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  tags: ['autodocs'],
  title: 'UI/Data Table',
};

export default meta;

type Story = StoryObj<typeof DataTable>;

/* -----------------------------------------------------------------------------
 * Story: Basic
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
              startIcon={<MoreHorizontalIcon className="h-4 w-4" />}
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
    enableHiding: false,
    id: 'actions',
  },
];

const data: Payment[] = Array.from({ length: 100 }, () => ({
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

export const Basic: Story = {
  render: () => <DataTable columns={columns} data={data} pageCount={1} />,
};
