"use client";

import { ChangeEvent } from "react";
import SearchInput from "./SearchInput";
import { inputStyles, cn } from "@/utils/styles";

interface SearchControlsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  searchPlaceholder?: string;
  searchLoading?: boolean;
  searchDisabled?: boolean;
  
  resultsPerPage: number;
  onResultsPerPageChange: (limit: number) => void;
  resultsPerPageOptions?: number[];
  resultsPerPageDisabled?: boolean;
  
  className?: string;
}

export default function SearchControls({
  searchValue,
  onSearchChange,
  onSearch,
  onClear,
  searchPlaceholder = "Search...",
  searchLoading = false,
  searchDisabled = false,
  
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

      <div className="flex-shrink-0">
        <label htmlFor="resultsPerPage" className="block text-sm font-medium text-neutral-700 mb-2">
          Results per page
        </label>
        <select
          id="resultsPerPage"
          value={resultsPerPage}
          onChange={handleLimitChange}
          disabled={resultsPerPageDisabled || searchLoading}
          className={cn(
            inputStyles.select,
            "text-sm"
          )}
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
