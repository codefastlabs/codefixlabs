import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Table
 * -------------------------------------------------------------------------- */

export const Table = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement> & {
    classNames?: {
      wrapper?: string;
    };
  }
>(({ className, classNames, ...props }, forwardedRef) => (
  <div
    className={twMerge('size-full overflow-auto', classNames?.wrapper)}
    data-test-id="wrapper"
  >
    <table
      className={twMerge('w-full text-sm', className)}
      ref={forwardedRef}
      {...props}
    />
  </div>
));

Table.displayName = 'Table';

/* -----------------------------------------------------------------------------
 * Component: TableHeader
 * -------------------------------------------------------------------------- */

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
  <thead
    className={twMerge(
      'bg-muted text-muted-foreground *:bg-inherit',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

TableHeader.displayName = 'TableHeader';

/* -----------------------------------------------------------------------------
 * Component: TableBody
 * -------------------------------------------------------------------------- */

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
  <tbody
    className={twMerge(
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

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
  <tfoot
    className={twMerge('bg-muted text-muted-foreground', className)}
    ref={forwardedRef}
    {...props}
  />
));

TableFooter.displayName = 'TableFooter';

/* -----------------------------------------------------------------------------
 * Component: TableHead
 * -------------------------------------------------------------------------- */

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
  <th
    className={twMerge(
      'relative h-12 whitespace-nowrap px-4 text-left font-medium',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

TableHead.displayName = 'TableHead';

/* -----------------------------------------------------------------------------
 * Component: TableRow
 * -------------------------------------------------------------------------- */

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, forwardedRef) => (
  <tr className={twMerge('group', className)} ref={forwardedRef} {...props} />
));

TableRow.displayName = 'TableRow';

/* -----------------------------------------------------------------------------
 * Component: TableCell
 * -------------------------------------------------------------------------- */

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
  <td
    className={twMerge('relative px-4 py-2 text-left', className)}
    ref={forwardedRef}
    {...props}
  />
));

TableCell.displayName = 'TableCell';

/* -----------------------------------------------------------------------------
 * Component: TableCaption
 * -------------------------------------------------------------------------- */

export const TableCaption = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, forwardedRef) => (
  <caption
    className={twMerge(
      'text-muted-foreground mt-4 caption-bottom text-sm',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

TableCaption.displayName = 'TableCaption';
