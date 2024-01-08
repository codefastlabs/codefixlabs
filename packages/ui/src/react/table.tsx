import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Table
 * -------------------------------------------------------------------------- */

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  classNames?: {
    wrapper?: string;
  };
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, classNames, ...props }, forwardedRef) => (
    <div
      className={cn('size-full overflow-auto', classNames?.wrapper)}
      data-test-id="wrapper"
    >
      <table
        className={cn('w-full text-sm', className)}
        ref={forwardedRef}
        {...props}
      />
    </div>
  ),
);

Table.displayName = 'Table';

/* -----------------------------------------------------------------------------
 * Component: TableHeader
 * -------------------------------------------------------------------------- */

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, forwardedRef) => (
  <thead
    className={cn('bg-muted text-muted-foreground *:bg-inherit', className)}
    ref={forwardedRef}
    {...props}
  />
));

TableHeader.displayName = 'TableHeader';

/* -----------------------------------------------------------------------------
 * Component: TableBody
 * -------------------------------------------------------------------------- */

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, forwardedRef) => (
  <tbody
    className={cn(
      '*:bg-background data-state-selected:*:bg-muted/75 hover:*:bg-muted/50 *:transition-colors empty:*:hidden',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

TableBody.displayName = 'TableBody';

/* -----------------------------------------------------------------------------
 * Component: TableFooter
 * -------------------------------------------------------------------------- */

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, forwardedRef) => (
  <tfoot
    className={cn('bg-muted text-muted-foreground', className)}
    ref={forwardedRef}
    {...props}
  />
));

TableFooter.displayName = 'TableFooter';

/* -----------------------------------------------------------------------------
 * Component: TableHead
 * -------------------------------------------------------------------------- */

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, forwardedRef) => (
    <th
      className={cn(
        'relative h-12 whitespace-nowrap px-4 text-left font-medium',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

TableHead.displayName = 'TableHead';

/* -----------------------------------------------------------------------------
 * Component: TableRow
 * -------------------------------------------------------------------------- */

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, forwardedRef) => (
    <tr className={cn('group', className)} ref={forwardedRef} {...props} />
  ),
);

TableRow.displayName = 'TableRow';

/* -----------------------------------------------------------------------------
 * Component: TableCell
 * -------------------------------------------------------------------------- */

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, forwardedRef) => (
    <td
      className={cn('relative px-4 py-2 text-left', className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

TableCell.displayName = 'TableCell';

/* -----------------------------------------------------------------------------
 * Component: TableCaption
 * -------------------------------------------------------------------------- */

export type TableCaptionProps = React.HTMLAttributes<HTMLElement>;

export const TableCaption = React.forwardRef<HTMLElement, TableCaptionProps>(
  ({ className, ...props }, forwardedRef) => (
    <caption
      className={cn(
        'text-muted-foreground mt-4 caption-bottom text-sm',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

TableCaption.displayName = 'TableCaption';
