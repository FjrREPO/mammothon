import React, { Key, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Input } from "@heroui/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@heroui/button";
import { cn } from "@/lib/utils";
import { OrdersResponse } from "@/types/query/graphql/order.types";
import SkeletonWrapper from "@/components/loader/skeleton-wrapper";

export interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
  sortingKey?: string;
}

export interface TableCustomProps<T> {
  className?: string;
  data: OrdersResponse[];
  isLoading: boolean;
  columns: Column[];
  renderCell: (item: T, columnKey: string) => React.ReactNode;
  searchKey?: keyof T;
  enableSelection?: boolean;
  enableColumnSelection?: boolean;
  enablePagination?: boolean;
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
  searchPlaceholder?: string;
  onRefresh?: () => void;
}

const getNestedValue = (obj: { [key: string]: unknown }, path: string): unknown => {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return null;
    return (acc as { [key: string]: unknown })[key] !== undefined ? (acc as { [key: string]: unknown })[key] : null;
  }, obj);
};

export function TableCustom<T>({
  className = "",
  data,
  isLoading,
  columns,
  renderCell,
  searchKey,
  enableSelection = false,
  enableColumnSelection = false,
  enablePagination = true,
  rowsPerPageOptions = [5, 10, 15],
  initialRowsPerPage = 5,
  searchPlaceholder = "Search...",
  onRefresh,
}: TableCustomProps<T>) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(columns.map(column => column.uid)));
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
  const [page, setPage] = React.useState(1);
  const [refreshCount, setRefreshCount] = useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: columns[0].uid,
    direction: "ascending",
  });

  useEffect(() => {
    if (refreshCount < 3 && onRefresh) {
      const timer = setTimeout(() => {
        onRefresh();
        setRefreshCount(prevCount => prevCount + 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [refreshCount, onRefresh]);

  useEffect(() => {
    setPage(1);
  }, [data, filterValue]);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];

    if (filterValue && searchKey) {
      filteredData = filteredData.filter((item) => {
        if (!item || !item.pool || typeof item.pool.coin === 'undefined') {
          return false;
        }
        
        const searchValue = String(item.pool.coin).toLowerCase();
        return searchValue.includes(filterValue.toLowerCase());
      });
    }

    return filteredData;
  }, [data, filterValue, searchKey]);

  const paginatedItems = React.useMemo(() => {
    if (!enablePagination) return filteredItems;

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage, enablePagination]);

  const sortedItems = React.useMemo(() => {
    return [...paginatedItems].sort((a, b) => {
      const column = columns.find(col => col.uid === sortDescriptor.column);
      if (!column) return 0;

      const path = column.sortingKey || column.uid;
      let first = getNestedValue(a as { [key: string]: unknown }, path);
      let second = getNestedValue(b as { [key: string]: unknown }, path);

      if (typeof first === 'number' && typeof second === 'number') {
        return sortDescriptor.direction === "descending"
          ? second - first
          : first - second;
      }

      first = String(first ?? '').toLowerCase();
      second = String(second ?? '').toLowerCase();

      const cmp = (first as string) < (second as string) ? -1 : (first as string) > (second as string) ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, paginatedItems, columns]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const topContent = React.useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        {searchKey && (
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 h-10",
            }}
            placeholder={searchPlaceholder}
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />
        )}
        {enableColumnSelection && (
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={(keys) => setVisibleColumns(new Set(keys as unknown as string[]))}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      {enablePagination && (
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {filteredItems.length} items</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  ), [searchPlaceholder, filterValue, enableColumnSelection, enablePagination, columns, filteredItems.length, rowsPerPageOptions, searchKey, visibleColumns]);

  const bottomContent = React.useMemo(() => (
    enablePagination && (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === pages}
            size="sm"
            variant="flat"
            onPress={() => setPage(p => Math.min(pages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    )
  ), [page, pages, enablePagination]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
      tbody: ["border-b", "border-divider"],
    }),
    [],
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Data table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      selectedKeys={enableSelection ? selectedKeys : undefined}
      selectionMode={enableSelection ? "multiple" : "none"}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={enableSelection ? setSelectedKeys : undefined}
      onSortChange={(descriptor) => setSortDescriptor({
        column: descriptor.column.toString(),
        direction: descriptor.direction
      })}
      className="overflow-x-auto overflow-y-hidden"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align="start"
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No items found"} items={sortedItems as Iterable<T>}>
        {(item: T) => {
          const rowKey = item && typeof item === 'object' 
            ? (item[columns[0].uid as keyof T] as Key) || `row-${Math.random().toString(36).substring(2, 9)}`
            : `row-${Math.random().toString(36).substring(2, 9)}`;
          
          return (
            <TableRow key={rowKey} className={cn(`hover:bg-foreground/10 h-auto`, className)}>
              {(columnKey: Key) => (
                <TableCell className="py-5">
                  <SkeletonWrapper isLoading={isLoading}>
                    {renderCell(item, columnKey.toString())}
                  </SkeletonWrapper>
                </TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}