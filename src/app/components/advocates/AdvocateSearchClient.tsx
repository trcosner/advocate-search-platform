"use client";

import { useState, useCallback } from "react";
import { useSearchAdvocates } from "../../hooks/useSearchAdvocates";
import { Advocate, AdvocateSearchParams, AdvocateFilters, PaginatedResult } from "../../../types/api";
import AdvocateSearchFilters from "./AdvocateSearchFilters";
import AdvocateResultsView from "./AdvocateResultsView";
import SearchControls from "../shared/search/SearchControls";
import SearchStats from "../shared/search/SearchStats";
import SearchResults from "../shared/search/SearchResults";
import ErrorFallback from "../shared/ErrorFallback";

interface AdvocateSearchClientProps {
  initialData?: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

export default function AdvocateSearchClient({ 
  initialData, 
  initialSearchParams 
}: AdvocateSearchClientProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchParams.query || "")
  const { data, loading, error, searchParams, updateSearch } = useSearchAdvocates({
    searchParams: initialSearchParams, // Pass search params to hook
  });
  
  // Don't fallback to empty array if data is null - let SearchResults handle the null case
  const currentData = data || initialData;
  const advocates = currentData?.data || [];
  const pagination = currentData?.pagination;
  
  // Pass null for data if we haven't searched yet, so SearchResults can show proper loading state
  const dataForSearchResults = currentData ? advocates : null;

  const handleSearchChange = useCallback((value: string): void => {
    setLocalSearchTerm(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    updateSearch({
      query: localSearchTerm || undefined,
      page: 1, // Reset to first page on new search
    });
  }, [localSearchTerm, updateSearch]);

  const handleResetSearch = useCallback((): void => {
    setLocalSearchTerm("");
    updateSearch({
      query: undefined,
      page: 1,
    });
  }, [updateSearch]);


  const handleReset = useCallback((): void => {
    setLocalSearchTerm("");
    updateSearch({
      query: undefined,
      page: 1,
      filters: {degree: undefined, minExperience: 0},
    });
  }, [updateSearch]);

  const handleFiltersChange = useCallback((filters: AdvocateFilters) => {
    updateSearch({
      filters,
      page: 1, // Reset to first page when filters change
    });
  }, [updateSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    updateSearch({ page: newPage });
  }, [updateSearch]);

  const handleLimitChange = useCallback((limit: number) => {
    updateSearch({ 
      limit,
      page: 1, // Reset to first page when changing limit
    });
  }, [updateSearch]);

  const handleSortChange = useCallback((sortBy: string) => {
    const newSortOrder = searchParams.sortBy === sortBy && searchParams.sortOrder === 'asc' 
      ? 'desc' 
      : 'asc';
    
    updateSearch({ 
      sortBy,
      sortOrder: newSortOrder,
    });
  }, [searchParams.sortBy, searchParams.sortOrder, updateSearch]);

  if (error) {
    return (
      <ErrorFallback
        error={error}
        resetErrorBoundary={() => window.location.reload()}
        title="Unable to search advocates"
        message="We're having trouble searching for advocates. Please try again."
        buttonText="Retry"
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 space-y-6 pb-6">
        <div>
          <h2 className="text-xl font-bold text-primary-700 mb-4">Advocates</h2>
          
          <SearchControls
            searchValue={localSearchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearchSubmit}
            onClear={handleResetSearch}
            searchPlaceholder="Search by name, city, or specialty"
            searchLoading={loading}
            searchDisabled={loading}
          />
        </div>

        <AdvocateSearchFilters
          initialFilters={searchParams.filters || {}}
          onClear={handleReset}
          onFiltersChange={handleFiltersChange}
          disabled={loading}
        />

        {(searchParams.query || (pagination && pagination.total > 0)) && (
          <SearchStats
            query={searchParams.query}
            totalResults={pagination?.total || 0}
            currentPage={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
            resultsPerPage={pagination?.limit || 10}
            loading={loading}
            onResultsPerPageChange={handleLimitChange}
            resultsPerPageDisabled={loading}
          />
        )}
      </div>

      <div className="flex-1 min-h-0">
        <SearchResults
          data={dataForSearchResults}
          pagination={pagination}
          loading={loading}
          searchQuery={searchParams.query}
          onPageChange={handlePageChange}
          emptySearchMessage="No advocates found matching &quot;{query}&quot;"
          className="h-full"
        >
          <AdvocateResultsView
            advocates={advocates}
            currentSort={searchParams.sortBy}
            currentOrder={searchParams.sortOrder}
            onSort={handleSortChange}
            loading={loading}
            className="h-full"
          />
        </SearchResults>
      </div>
    </div>
  );
}
