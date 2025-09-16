"use client";

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  className?: string;
  compact?: boolean;
}

export default function PaginationInfo({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  className = "",
  compact = false
}: PaginationInfoProps) {
  const startResult = totalResults > 0 ? ((currentPage - 1) * resultsPerPage) + 1 : 0;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (compact) {
    return (
      <span className={`text-sm text-neutral-600 ${className}`}>
        Page {currentPage} of {totalPages} ({totalResults.toLocaleString()} results)
      </span>
    );
  }

  return (
    <div className={`text-sm text-neutral-600 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
        <span>
          Showing{" "}
          <span className="font-semibold text-neutral-900">
            {startResult}-{endResult}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-neutral-900">
            {totalResults.toLocaleString()}
          </span>{" "}
          {totalResults === 1 ? "result" : "results"}
        </span>
        
        {totalPages > 1 && (
          <span className="text-neutral-500">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>
    </div>
  );
}
