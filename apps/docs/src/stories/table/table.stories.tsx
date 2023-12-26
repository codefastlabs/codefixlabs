import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Table> = {
  component: Table,
  tags: ['autodocs'],
  title: 'UI/Table',
  args: {
    className: 'border-collapse border border-slate-400',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

/* -----------------------------------------------------------------------------
 * Story: Basic
 * -------------------------------------------------------------------------- */

const invoices = [
  {
    invoice: 'INV001',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
  },
  {
    invoice: 'INV002',
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
  },
  {
    invoice: 'INV003',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
  },
  {
    invoice: 'INV004',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
  },
  {
    invoice: 'INV005',
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
  },
  {
    invoice: 'INV006',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
  },
  {
    invoice: 'INV007',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
  },
];

export const Basic: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="border border-slate-300">Invoice</TableHead>
          <TableHead className="border border-slate-300">Status</TableHead>
          <TableHead className="border border-slate-300">Method</TableHead>
          <TableHead className="border border-slate-300 text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="border border-slate-300 font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="border border-slate-300">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="border border-slate-300">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="border border-slate-300 text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithCheckbox: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="border border-slate-300">
            <Checkbox aria-label="Select all invoices" />
          </TableHead>
          <TableHead className="border border-slate-300">Invoice</TableHead>
          <TableHead className="border border-slate-300">Status</TableHead>
          <TableHead className="border border-slate-300">Method</TableHead>
          <TableHead className="border border-slate-300 text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="border border-slate-300">
              <Checkbox aria-label={`Select invoice ${invoice.invoice}`} />
            </TableCell>
            <TableCell className="border border-slate-300 font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="border border-slate-300">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="border border-slate-300">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="border border-slate-300 text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="border border-slate-300">Invoice</TableHead>
          <TableHead className="border border-slate-300">Status</TableHead>
          <TableHead className="border border-slate-300">Method</TableHead>
          <TableHead className="border border-slate-300 text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="border border-slate-300 font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="border border-slate-300">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="border border-slate-300">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="border border-slate-300 text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="border border-slate-300" colSpan={3} />
          <TableCell className="border border-slate-300 text-right font-medium">
            $2,500.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
