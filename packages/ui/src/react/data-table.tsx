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
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDebouncedCallback } from 'use-debounce';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars -- used for type inference
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
  const endIcon = (): React.JSX.Element => {
    const isSorted = column.getIsSorted();

    if (isSorted === 'desc') {
      return <ArrowDownIcon size={16} />;
    } else if (isSorted === 'asc') {
      return <ArrowUpIcon size={16} />;
    }

    return <ChevronsUpDownIcon size={16} />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="data-state-open:bg-accent -ml-3.5 px-3.5"
          endIcon={endIcon()}
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
          <ArrowUpIcon className="text-muted-foreground/70 mr-2" size={14} />
          Ascending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            column.toggleSorting(true);
          }}
        >
          <ArrowDownIcon className="text-muted-foreground/70 mr-2" size={14} />
          Descending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            column.clearSorting();
          }}
        >
          <CheckIcon className="text-muted-foreground/70 mr-2" size={14} />
          None
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            column.toggleVisibility(false);
          }}
        >
          <EyeOffIcon className="text-muted-foreground/70 mr-2" size={14} />
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = useDebouncedCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(({ target: { value } }) => {
    if (!value) {
      return;
    }

    const pageIndex = Number(value) - 1;

    if (pageIndex >= 0 && pageIndex < table.getPageCount()) {
      table.setPageIndex(pageIndex);
    }
  }, 300);

  const handleBlur = useDebouncedCallback<
    React.FocusEventHandler<HTMLInputElement>
  >(({ target: { value } }) => {
    if (!inputRef.current) {
      return;
    }
    if (!value || Number(value) > table.getPageCount()) {
      // set value to current page
      inputRef.current.value = (
        table.getState().pagination.pageIndex + 1
      ).toString();
    }
  }, 300);

  return (
    <div className={twMerge('flex items-center gap-2', className)} {...props}>
      <Label className="text-sm font-normal" htmlFor={id}>
        Go to page
      </Label>
      <Input
        defaultValue={table.getState().pagination.pageIndex + 1}
        id={id}
        inline
        max={table.getPageCount()}
        min={1}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={inputRef}
        size="sm"
        type="number"
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
}): React.JSX.Element {
  return (
    <>
      {table.getPageCount() > 1 ? (
        <p className={twMerge('text-sm font-normal', className)} {...props}>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </p>
      ) : null}
    </>
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
        startIcon={<ChevronsLeftIcon size={16} />}
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
        startIcon={<ChevronLeftIcon size={16} />}
        title="Previous page"
        variant="outline"
      />
      <Button
        aria-label="Next page"
        disabled={!table.getCanNextPage()}
        endIcon={<ChevronRightIcon size={16} />}
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
        endIcon={<ChevronsRightIcon size={16} />}
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
  const handleChange = useDebouncedCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(({ target: { value } }) => {
    table.setGlobalFilter(value);
  }, 300);

  return (
    <Input
      className="w-full max-w-sm"
      defaultValue={(table.getState().globalFilter as string) || ''}
      onChange={handleChange}
      placeholder="Search all columns..."
      startIcon={<SearchIcon size={18} />}
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
          startIcon={<SlidersHorizontalIcon size={16} />}
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
                <CheckIcon size={16} />
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
  startToolbar,
  endToolbar,
  className,
  table,
}: {
  startToolbar?:
    | React.ReactNode
    | ((table: TableType<TData>) => React.ReactNode);
  endToolbar?: React.ReactNode | ((table: TableType<TData>) => React.ReactNode);
  className?: string;
  table: TableType<TData>;
}): React.JSX.Element {
  const renderStartToolbar =
    typeof startToolbar === 'function' ? startToolbar(table) : startToolbar;
  const renderEndToolbar =
    typeof endToolbar === 'function' ? endToolbar(table) : endToolbar;

  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-between gap-4',
        className,
      )}
      data-test-id="toolbar"
    >
      <div className="flex grow items-center gap-2">
        <DataTableSearch table={table} />
        {renderStartToolbar}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DataTableViewOptions table={table} />
        {renderEndToolbar}
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
}: {
  className?: string;
  table: TableType<TData>;
}): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-between gap-4',
        className,
      )}
      data-test-id="pagination"
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

interface TableClassNames {
  body?: string;
  cell?: string;
  container?: string;
  emptyCell?: string;
  emptyRow?: string;
  footer?: string;
  footerRow?: string;
  header?: string;
  headerCell?: string;
  headerRow?: string;
  pagination?: string;
  root?: string;
  row?: string;
  table?: string;
  toolbar?: string;
  wrapper?: string;
}

export function DataTableContent<TData, TValue>({
  table,
  columns = [],
  showFooter = false,
  classNames = {},
}: {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  showFooter?: boolean;
  classNames?: TableClassNames;
}): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'overflow-auto rounded-md border',
        classNames.container,
      )}
      data-test-id="container"
    >
      <Table
        className={classNames.table}
        classNames={{
          wrapper: classNames.wrapper,
        }}
        data-test-id="table"
      >
        <TableHeader className={classNames.header} data-test-id="header">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className={classNames.headerRow}
              data-test-id="headerRow"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  className={twMerge(
                    classNames.headerCell,
                    header.column.columnDef.meta?.className,
                    header.column.columnDef.meta?.classNames?.headerCell,
                  )}
                  data-test-id="headerCell"
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
        <TableBody className={classNames.body} data-test-id="body">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={classNames.row}
                data-state={row.getIsSelected() && 'selected'}
                data-test-id="row"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className={twMerge(
                      classNames.cell,
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.classNames?.cell,
                    )}
                    data-test-id="cell"
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
              data-test-id="emptyRow"
            >
              <TableCell
                className={twMerge('h-24 text-center', classNames.emptyCell)}
                colSpan={columns.length}
                data-test-id="emptyCell"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {showFooter ? (
          <TableFooter className={classNames.footer} data-test-id="footer">
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow
                className={classNames.footerRow}
                data-test-id="footerRow"
                key={footerGroup.id}
              >
                {footerGroup.headers.map((header) => (
                  <TableHead
                    className={twMerge(
                      classNames.headerCell,
                      header.column.columnDef.meta?.className,
                      header.column.columnDef.meta?.classNames?.headerCell,
                    )}
                    data-test-id="headerCell"
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
  icon?: React.ReactNode;
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
          startIcon={<PlusCircleIcon size={16} />}
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
                        {option.icon}
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
                        'size-4.25 flex shrink-0 items-center justify-center rounded border',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : '[&_svg]:invisible',
                      )}
                    >
                      <CheckIcon size={12} />
                    </div>
                    <span className="flex flex-row-reverse gap-[0.3125rem]">
                      <span>{option.label}</span>
                      {option.prefix ? (
                        <span className="text-border">{option.prefix}</span>
                      ) : null}
                    </span>
                    {facets?.get(option.value) ? (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
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
  startToolbar,
  endToolbar,
  ...props
}: Omit<TableOptions<TData>, 'getCoreRowModel'> & {
  classNames?: TableClassNames;
  showFooter?: boolean;
  startToolbar?:
    | React.ReactNode
    | ((table: TableType<TData>) => React.ReactNode);
  endToolbar?: React.ReactNode | ((table: TableType<TData>) => React.ReactNode);
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
    <div
      className={twMerge('flex flex-col space-y-4', classNames.root)}
      data-test-id="root"
    >
      <DataTableToolbar
        className={classNames.toolbar}
        endToolbar={endToolbar}
        startToolbar={startToolbar}
        table={table}
      />
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
