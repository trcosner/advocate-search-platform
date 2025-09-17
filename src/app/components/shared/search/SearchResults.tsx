"use client";

import { ReactNode } from "react";
import Pagination from "../pagination/Pagination";
import LoadingSpinner from "../LoadingSpinner";

interface SearchResultsProps<T = any> {
  data: T[] | null;
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

  // Show loading spinner when loading OR when we have no data yet (initial load)
  if (loading || !data) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <LoadingSpinner 
          size="lg" 
          message="Searching advocates..." 
        />
      </div>
    );
  }

  // Show empty state only when not loading and we have searched but found no results
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
  console.log({className})
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className={`flex-1 min-h-0 overflow-y-auto ${loading ? "opacity-75 pointer-events-none" : ""}`}>
        {children}
      </div>

      {shouldShowPagination && (
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
