"use client";

import { ReactNode } from "react";
import SortableHeader from "./SortableHeader";

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  currentSort?: string;
  currentOrder?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  keyExtractor?: (item: T, index: number) => string | number;
}

export default function DataTable<T = any>({
  data,
  columns,
  currentSort,
  currentOrder,
  onSort,
  loading = false,
  emptyMessage = "No data found",
  className = "",
  keyExtractor
}: DataTableProps<T>) {
  
  const getKey = (item: T, index: number): string | number => {
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    // Fallback to id property or index
    const itemWithId = item as any;
    return itemWithId?.id || `item-${index}`;
  };

  const renderCell = (column: TableColumn<T>, item: T, index: number) => {
    if (column.render) {
      return column.render(item, index);
    }
    
    // Default: access property by key
    const value = (item as any)[column.key];
    return value?.toString() || '';
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
        <thead className="bg-neutral-50">
          <tr>
            {columns.map((column) => (
              column.sortable && onSort ? (
                <SortableHeader
                  key={column.key}
                  field={column.key}
                  label={column.label}
                  currentSort={currentSort}
                  currentOrder={currentOrder}
                  onSort={onSort}
                  disabled={loading}
                  className={column.headerClassName}
                />
              ) : (
                <th
                  key={column.key}
                  className={`
                    px-3 py-3 text-left text-xs font-medium text-neutral-500 
                    uppercase tracking-wider bg-neutral-50 border-b border-neutral-200
                    ${column.headerClassName || ''}
                  `}
                >
                  {column.label}
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {data.map((item, index) => (
            <tr 
              key={getKey(item, index)} 
              className="hover:bg-neutral-50 transition-colors duration-200"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-3 py-4 text-sm text-neutral-900 ${column.className || ''}`}
                >
                  {renderCell(column, item, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
