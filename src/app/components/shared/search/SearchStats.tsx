"use client";

interface SearchStatsProps {
  query?: string;
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  resultsPerPage?: number;
  loading?: boolean;
  className?: string;
}

export default function SearchStats({
  query,
  totalResults = 0,
  currentPage = 1,
  totalPages = 1,
  resultsPerPage = 10,
  loading = false,
  className = ""
}: SearchStatsProps) {
  // Calculate result range
  const startResult = totalResults > 0 ? ((currentPage - 1) * resultsPerPage) + 1 : 0;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (loading) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${className}`}>
      {/* Search query and results count */}
      <div className="flex flex-col gap-1">
        {query && (
          <p className="text-sm text-neutral-600">
            Searching for:{" "}
            <span className="font-semibold text-neutral-900">&ldquo;{query}&rdquo;</span>
          </p>
        )}
        
        <div className="flex items-center gap-4">
          {/* Results summary */}
          <p className="text-sm text-neutral-700">
            {totalResults === 0 ? (
              <span>No results found</span>
            ) : (
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
            )}
          </p>

          {/* Page info for multiple pages */}
          {totalPages > 1 && (
            <p className="text-sm text-neutral-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>

      {/* Results per page info (mobile-friendly) */}
      {totalResults > 0 && (
        <div className="text-xs text-neutral-500 sm:text-sm">
          {resultsPerPage} per page
        </div>
      )}
    </div>
  );
}
