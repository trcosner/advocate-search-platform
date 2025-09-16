"use client";

import { ChangeEvent } from "react";
import SearchInput from "./SearchInput";

interface SearchControlsProps {
  // Search props
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  searchPlaceholder?: string;
  searchLoading?: boolean;
  searchDisabled?: boolean;
  
  // Results per page props
  resultsPerPage: number;
  onResultsPerPageChange: (limit: number) => void;
  resultsPerPageOptions?: number[];
  resultsPerPageDisabled?: boolean;
  
  className?: string;
}

export default function SearchControls({
  // Search props
  searchValue,
  onSearchChange,
  onSearch,
  onClear,
  searchPlaceholder = "Search...",
  searchLoading = false,
  searchDisabled = false,
  
  // Results per page props
  resultsPerPage,
  onResultsPerPageChange,
  resultsPerPageOptions = [5, 10, 20, 50],
  resultsPerPageDisabled = false,
  
  className = ""
}: SearchControlsProps) {
  
  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onResultsPerPageChange(Number(e.target.value));
  };

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center gap-4 ${className}`}>
      {/* Search Input */}
      <div className="flex-1">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onSearch={onSearch}
          onClear={onClear}
          placeholder={searchPlaceholder}
          loading={searchLoading}
          disabled={searchDisabled}
        />
      </div>

      {/* Results per page */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <label 
          htmlFor="results-per-page" 
          className="text-sm font-medium text-neutral-700"
        >
          Show:
        </label>
        <select
          id="results-per-page"
          value={resultsPerPage}
          onChange={handleLimitChange}
          disabled={resultsPerPageDisabled || searchLoading}
          className="
            px-3 py-2 text-sm
            border border-neutral-300 rounded-md
            bg-white text-neutral-900
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          {resultsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option} results
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
