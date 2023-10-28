'use client';

import type {
  Column,
  ColumnDef,
  RowData,
  Table as TableType,
  TableOptions,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cx } from 'class-variance-authority';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  PlusCircleIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import pluralize from 'pluralize';
import * as React from 'react';
import { useId, useMemo, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge } from '@/react/badge';
import { Button } from '@/react/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/react/command';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/react/dropdown-menu';
import type { IconType } from '@/react/icons';
import { Input } from '@/react/input';
import { Label } from '@/react/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/react/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/react/select';
import { Separator } from '@/react/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/react/table';

/* -----------------------------------------------------------------------------
 * Declarations
 * -------------------------------------------------------------------------- */

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    classNames?: {
      headerCell?: string;
      cell?: string;
    };
  }
}

/* -----------------------------------------------------------------------------
 * Component: DataTableColumnHeader
 * -------------------------------------------------------------------------- */

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: {
  column: Column<TData, TValue>;
  title: string;
}): React.JSX.Element {
  const endIcon = useMemo(() => {
    if (column.getIsSorted() === 'desc') {
      return <ArrowDownIcon className="h-4 w-4" />;
    }

    if (column.getIsSorted() === 'asc') {
      return <ArrowUpIcon className="h-4 w-4" />;
    }

    return <ChevronsUpDownIcon className="h-4 w-4" />;
  }, [column]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="data-state-open:bg-accent -ml-4"
          endIcon={endIcon}
          size="sm"
          variant="ghost"
        >
          {title}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => {
            column.toggleSorting(false);
          }}
        >
          <ArrowUpIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
          Ascending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            column.toggleSorting(true);
          }}
        >
          <ArrowDownIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
          Descending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            column.clearSorting();
          }}
        >
          <CheckIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
          None
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            column.toggleVisibility(false);
          }}
        >
          <EyeOffIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
          Hide column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableGoToPage
 * -------------------------------------------------------------------------- */

export function DataTableGoToPage<TData>({
  table,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  table: TableType<TData>;
}): React.JSX.Element {
  const id = useId();

  return (
    <div className={twMerge('flex items-center gap-2', className)} {...props}>
      <Label className="text-sm font-normal" htmlFor={id}>
        Go to page
      </Label>
      <Input
        id={id}
        inline
        max={table.getPageCount()}
        min={1}
        onChange={(event) => {
          table.setPageIndex(
            event.target.value ? Number(event.target.value) - 1 : 0,
          );
        }}
        size="sm"
        type="number"
        value={table.getState().pagination.pageIndex + 1}
      />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableRowPerPage
 * -------------------------------------------------------------------------- */

export function DataTableRowPerPage<TData>({
  table,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  table: TableType<TData>;
}): React.JSX.Element {
  const id = useId();

  return (
    <div className={twMerge('flex items-center gap-2', className)} {...props}>
      <Label className="text-sm font-normal" htmlFor={id}>
        Rows per page
      </Label>
      <Select
        defaultValue="10"
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
        value={table.getState().pagination.pageSize.toString()}
      >
        <SelectTrigger aria-label="Rows per page" id={id} size="sm">
          <SelectValue placeholder="Show" />
        </SelectTrigger>
        <SelectContent position="popper" sideOffset={5}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTablePageCount
 * -------------------------------------------------------------------------- */

export function DataTablePageCount<TData>({
  table,
  className,
  ...props
}: React.ComponentProps<'p'> & {
  table: TableType<TData>;
}): React.JSX.Element | null {
  if (table.getPageCount() <= 1) {
    return null;
  }

  return (
    <p className={twMerge('text-sm font-normal', className)} {...props}>
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </p>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTablePageButtons
 * -------------------------------------------------------------------------- */

export function DataTablePageButtons<TData>({
  table,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  table: TableType<TData>;
}): React.JSX.Element {
  return (
    <div className={twMerge('flex items-center gap-2', className)} {...props}>
      <Button
        aria-label="First page"
        disabled={!table.getCanPreviousPage()}
        onClick={() => {
          table.setPageIndex(0);
        }}
        size="sm"
        startIcon={<ChevronsLeftIcon className="h-4 w-4" />}
        title="First page"
        variant="outline"
      />
      <Button
        aria-label="Previous page"
        disabled={!table.getCanPreviousPage()}
        onClick={() => {
          table.previousPage();
        }}
        size="sm"
        startIcon={<ChevronLeftIcon className="h-4 w-4" />}
        title="Previous page"
        variant="outline"
      />
      <Button
        aria-label="Next page"
        disabled={!table.getCanNextPage()}
        endIcon={<ChevronRightIcon className="h-4 w-4" />}
        onClick={() => {
          table.nextPage();
        }}
        size="sm"
        title="Next page"
        variant="outline"
      />
      <Button
        aria-label="Last page"
        disabled={!table.getCanNextPage()}
        endIcon={<ChevronsRightIcon className="h-4 w-4" />}
        onClick={() => {
          table.setPageIndex(table.getPageCount() - 1);
        }}
        size="sm"
        title="Last page"
        variant="outline"
      />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableSearch
 * -------------------------------------------------------------------------- */

export function DataTableSearch<TData>({
  table,
}: {
  table: TableType<TData>;
}): React.JSX.Element {
  const [_isPending, startTransition] = useTransition();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    startTransition(() => {
      table.setGlobalFilter(value);
    });
  };

  return (
    <Input
      className="w-full max-w-sm"
      onChange={onChange}
      placeholder="Search all columns..."
      startIcon={<SearchIcon className="w-4.5 h-4.5" />}
      type="search"
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableViewOptions
 * -------------------------------------------------------------------------- */

export function DataTableViewOptions<TData>({
  table,
}: {
  table: TableType<TData>;
}): React.JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Toggle columns"
          startIcon={<SlidersHorizontalIcon className="h-4 w-4" />}
          variant="outline"
        >
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              className="capitalize"
              key={column.id}
              onCheckedChange={(value) => {
                column.toggleVisibility(value);
              }}
            >
              <DropdownMenuItemIndicator>
                <CheckIcon className="h-4 w-4" />
              </DropdownMenuItemIndicator>
              {column.id.replaceAll('_', ' ')}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableToolbar
 * -------------------------------------------------------------------------- */

export function DataTableToolbar<TData>({
  children,
  className,
  table,
}: {
  children?: React.ReactNode;
  className?: string;
  table: TableType<TData>;
}): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-between gap-4',
        className,
      )}
    >
      <div className="flex grow items-center gap-2">
        <DataTableSearch table={table} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DataTableViewOptions table={table} />
        {children}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTablePagination
 * -------------------------------------------------------------------------- */

export function DataTablePagination<TData>({
  table,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  table: TableType<TData>;
}): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-between gap-4',
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground grow text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {pluralize('row', table.getFilteredRowModel().rows.length, true)}{' '}
        selected.
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableRowPerPage table={table} />
        <DataTableGoToPage table={table} />
        <DataTablePageCount table={table} />
        <DataTablePageButtons table={table} />
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableContent
 * -------------------------------------------------------------------------- */

export function DataTableContent<TData, TValue>({
  table,
  columns = [],
  showFooter = false,
  classNames = {},
}: {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  showFooter?: boolean;
  classNames?: {
    root?: string;
    container?: string;
    table?: string;
    header?: string;
    headerRow?: string;
    footer?: string;
    footerRow?: string;
    headerCell?: string;
    body?: string;
    row?: string;
    cell?: string;
    emptyRow?: string;
    emptyCell?: string;
    toolbar?: string;
    pagination?: string;
  };
}): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'overflow-auto rounded-md border',
        classNames.container,
      )}
    >
      <Table className={classNames.table}>
        <TableHeader className={classNames.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className={classNames.headerRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className={twMerge(
                    classNames.headerCell,
                    header.column.columnDef.meta?.className,
                    header.column.columnDef.meta?.classNames?.headerCell,
                  )}
                  key={header.id}
                >
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={classNames.body}>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={classNames.row}
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className={twMerge(
                      classNames.cell,
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.classNames?.cell,
                    )}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow
              className={twMerge(
                'align-middle hover:bg-transparent',
                classNames.emptyRow,
              )}
            >
              <TableCell
                className={twMerge('h-24 text-center', classNames.emptyCell)}
                colSpan={columns.length}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {showFooter ? (
          <TableFooter className={classNames.footer}>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow className={classNames.footerRow} key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableHead
                    className={twMerge(
                      classNames.headerCell,
                      header.column.columnDef.meta?.className,
                      header.column.columnDef.meta?.classNames?.headerCell,
                    )}
                    key={header.id}
                  >
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        ) : null}
      </Table>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTableFacetedFilter
 * -------------------------------------------------------------------------- */

export interface FacetOption {
  label: string;
  value: string;
  icon?: IconType;
  prefix?: string;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: {
  column?: Column<TData, TValue>;
  title?: string;
  options: FacetOption[];
}): React.JSX.Element {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const facets = column?.getFacetedUniqueValues();

  return (
    <Popover variant="simple">
      <PopoverTrigger asChild>
        <Button
          className="border-dashed"
          startIcon={<PlusCircleIcon className="h-4 w-4" />}
          variant="outline"
        >
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator className="mx-1 h-4" orientation="vertical" />
              <Badge
                className="rounded font-normal lg:hidden"
                variant="secondary"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden lg:flex lg:gap-1">
                {selectedValues.size > 2 ? (
                  <Badge className="rounded font-normal" variant="secondary">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        className="rounded font-normal"
                        key={option.value}
                        variant="secondary"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="min-w-fit">
        <Command variant="dialog">
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup
              className={cx(
                'overflow-y-auto',
                selectedValues.size > 0
                  ? 'max-h-[clamp(3.75rem,calc(var(--radix-popover-content-available-height)-6.25rem),22.5rem)]'
                  : 'max-h-[clamp(6.25rem,calc(var(--radix-popover-content-available-height)-3.75rem),25rem)]',
              )}
            >
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length > 0 ? filterValues : undefined,
                      );
                    }}
                    value={`${option.label} ${option.value}`}
                  >
                    <div
                      className={twMerge(
                        'w-4.25 h-4.25 flex shrink-0 items-center justify-center rounded border',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : '[&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className="h-3 w-3" />
                    </div>
                    <span className="flex flex-row-reverse gap-[0.3125rem]">
                      <span>{option.label}</span>
                      {option.prefix ? (
                        <span className="text-border">{option.prefix}</span>
                      ) : null}
                    </span>
                    {facets?.get(option.value) ? (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    ) : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center"
                    onSelect={() => column?.setFilterValue(undefined)}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DataTable
 * -------------------------------------------------------------------------- */

export function DataTable<TData>({
  data = [],
  columns = [],
  classNames = {},
  showFooter = false,
  toolbar,
  ...props
}: Omit<TableOptions<TData>, 'getCoreRowModel'> & {
  classNames?: React.ComponentProps<typeof DataTableContent>['classNames'];
  showFooter?: boolean;
  toolbar?: React.ReactNode;
}): React.JSX.Element {
  const table = useReactTable({
    columns,
    data,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...props,
  });

  return (
    <div className={twMerge('space-y-4', classNames.root)}>
      <DataTableToolbar className={classNames.toolbar} table={table}>
        {toolbar}
      </DataTableToolbar>
      <DataTableContent
        classNames={classNames}
        columns={columns}
        showFooter={showFooter}
        table={table}
      />
      <DataTablePagination className={classNames.pagination} table={table} />
    </div>
  );
}
