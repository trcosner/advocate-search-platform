"use client";

import { cn } from "@/utils/styles";
import CustomSelect from "../form/CustomSelect";

interface SearchStatsProps {
  query?: string;
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  resultsPerPage?: number;
  loading?: boolean;
  className?: string;
  
  onResultsPerPageChange?: (limit: number) => void;
  resultsPerPageOptions?: number[];
  resultsPerPageDisabled?: boolean;
}

export default function SearchStats({
  query,
  totalResults = 0,
  currentPage = 1,
  totalPages = 1,
  resultsPerPage = 10,
  loading = false,
  className = "",
  
  onResultsPerPageChange,
  resultsPerPageOptions = [5, 10, 20, 50],
  resultsPerPageDisabled = false
}: SearchStatsProps) {
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
      <div className="flex flex-col gap-1">
        {query && (
          <p className="text-sm text-neutral-600">
            Searching for:{" "}
            <span className="font-semibold text-neutral-900">&ldquo;{query}&rdquo;</span>
          </p>
        )}
        
        <div className="flex items-center gap-4">
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

          {totalPages > 1 && (
            <p className="text-sm text-neutral-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>

      {totalResults > 0 && (
        <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-500 sm:text-sm">
          {onResultsPerPageChange ? (
            <div className="flex items-center gap-2">
              <span>Show:</span>
              <CustomSelect
                value={resultsPerPage.toString()}
                onChange={(value) => onResultsPerPageChange(Number(value))}
                options={resultsPerPageOptions.map(option => ({
                  value: option.toString(),
                  label: option.toString()
                }))}
                disabled={resultsPerPageDisabled || loading}
                className="w-20"
              />
              <span>per page</span>
            </div>
          ) : (
            <span>{resultsPerPage} per page</span>
          )}
        </div>
      )}
    </div>
  );
}
