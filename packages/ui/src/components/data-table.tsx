import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: string;
  sortable?: boolean;
  cell?: (row: T) => React.ReactNode;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState<T> {
  column: keyof T | null;
  direction: SortDirection;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  sortState?: SortState<T>;
  onSort?: (column: keyof T) => void;
  className?: string;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortState,
  onSort,
  className,
}: DataTableProps<T>) {
  const handleHeaderClick = (column: ColumnDef<T>) => {
    if (column.sortable && onSort) {
      onSort(column.accessorKey);
    }
  };

  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={String(column.accessorKey)}
                onClick={() => handleHeaderClick(column)}
                className={cn(
                  "text-foreground px-4 py-3 text-left text-sm font-medium",
                  column.sortable &&
                    "cursor-pointer select-none hover:bg-accent/50",
                )}
              >
                <div className="flex items-center gap-2">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      {sortState?.column === column.accessorKey &&
                      sortState.direction === "asc" ? (
                        <ArrowUpIcon className="size-3.5" />
                      ) : sortState?.column === column.accessorKey &&
                        sortState.direction === "desc" ? (
                        <ArrowDownIcon className="size-3.5" />
                      ) : (
                        <ArrowDownIcon className="text-muted-foreground size-3.5" />
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-muted-foreground px-4 py-8 text-center"
              >
                No results found
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b last:border-0">
                {columns.map((column) => (
                  <td
                    key={String(column.accessorKey)}
                    className="px-4 py-3 text-sm"
                  >
                    {column.cell
                      ? column.cell(row)
                      : row[column.accessorKey as keyof T]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };
