"use client";

import { ReactNode } from "react";
import Pagination from "../pagination/Pagination";

interface SearchResultsProps<T = any> {
  data: T[];
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  loading?: boolean;
  emptyMessage?: string;
  emptySearchMessage?: string;
  searchQuery?: string;
  onPageChange?: (page: number) => void;
  showPaginationTop?: boolean;
  showPaginationBottom?: boolean;
  className?: string;
  children: ReactNode;
}

export default function SearchResults<T = any>({
  data,
  pagination,
  loading = false,
  emptyMessage = "No results found",
  emptySearchMessage,
  searchQuery,
  onPageChange,
  showPaginationTop = true,
  showPaginationBottom = true,
  className = "",
  children
}: SearchResultsProps<T>) {
  
  const getEmptyMessage = () => {
    if (searchQuery && emptySearchMessage) {
      return emptySearchMessage.replace("{query}", searchQuery);
    }
    if (searchQuery) {
      return `No results found matching "${searchQuery}"`;
    }
    return emptyMessage;
  };

  const shouldShowPagination = pagination && pagination.totalPages > 1 && onPageChange;

  // Empty state
  if (data.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-neutral-600">
          <p className="text-lg font-medium">{getEmptyMessage()}</p>
          {searchQuery && (
            <p className="text-sm text-neutral-500 mt-2">
              Try adjusting your search terms or filters
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Top Pagination */}
      {shouldShowPagination && showPaginationTop && (
        <div className="flex-shrink-0 pb-4">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalResults={pagination.total}
            resultsPerPage={pagination.limit}
            onPageChange={onPageChange}
            loading={loading}
            showInfo={false}
          />
        </div>
      )}

      {/* Scrollable Results Content */}
      <div className={`flex-1 min-h-0 overflow-y-auto ${loading ? "opacity-75 pointer-events-none" : ""}`}>
        {children}
      </div>

      {/* Bottom Pagination */}
      {shouldShowPagination && showPaginationBottom && (
        <div className="flex-shrink-0 pt-4">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalResults={pagination.total}
            resultsPerPage={pagination.limit}
            onPageChange={onPageChange}
            loading={loading}
            showInfo={false}
          />
        </div>
      )}
    </div>
  );
}
