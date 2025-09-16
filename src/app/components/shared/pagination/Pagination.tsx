"use client";

import PaginationInfo from "./PaginationInfo";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  className?: string;
  showInfo?: boolean;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
  loading = false,
  className = "",
  showInfo = true,
  maxVisiblePages = 5
}: PaginationProps) {
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Adjust start if we don't have enough pages at the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Don't render pagination if only one page
  if (totalPages <= 1) {
    return showInfo ? (
      <PaginationInfo
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        className={className}
        compact
      />
    ) : null;
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Page Info */}
        {showInfo && (
          <PaginationInfo
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            compact
          />
        )}

        {/* Pagination Navigation */}
        <nav className="flex items-center justify-center sm:justify-end gap-1" aria-label="Pagination">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrev || loading}
            className="
              px-3 py-2 text-sm font-medium
              border border-neutral-300 rounded-l-md
              bg-white text-neutral-700
              hover:bg-neutral-50 hover:text-neutral-900
              disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              transition-colors duration-200
            "
            aria-label="Previous page"
          >
            <span className="sr-only">Previous</span>
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((pageNum, index) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={loading}
              className={`
                px-3 py-2 text-sm font-medium border-t border-b
                ${index === 0 ? '' : 'border-l-0'}
                ${pageNum === currentPage
                  ? 'bg-primary-600 text-white border-primary-600 z-10'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900'
                }
                disabled:cursor-not-allowed disabled:opacity-50
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                transition-colors duration-200
              `}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext || loading}
            className="
              px-3 py-2 text-sm font-medium
              border border-neutral-300 rounded-r-md border-l-0
              bg-white text-neutral-700
              hover:bg-neutral-50 hover:text-neutral-900
              disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              transition-colors duration-200
            "
            aria-label="Next page"
          >
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
