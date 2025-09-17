"use client";

import PaginationInfo from "./PaginationInfo";
import PaginationButton from "./PaginationButton";
import { cn } from "@/app/utils/styles";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

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
      <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${showInfo ? 'sm:justify-between' : 'sm:justify-center'}`}>
        {showInfo && (
          <PaginationInfo
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            compact
          />
        )}

        <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrev || loading}
            className="rounded-l-md border-l"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </PaginationButton>

          {pageNumbers.map((pageNum, index) => (
            <PaginationButton
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={loading}
              isActive={pageNum === currentPage}
              className={`${index === 0 ? "border-l" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </PaginationButton>
          ))}

          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext || loading}
            className="rounded-r-md"
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </PaginationButton>
        </nav>
      </div>
    </div>
  );
}
