"use client";

import { useState, useCallback } from "react";
import { useSearchAdvocates } from "../../../hooks/useSearchAdvocates";
import { Advocate, AdvocateSearchParams, AdvocateFilters, PaginatedResult } from "../../../types/api";
import AdvocateSearchFilters from "./AdvocateSearchFilters";
import AdvocateTable from "./AdvocateTable";
import SearchControls from "../shared/search/SearchControls";
import SearchStats from "../shared/search/SearchStats";
import SearchResults from "../shared/search/SearchResults";

interface AdvocateSearchClientProps {
  initialData?: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

export default function AdvocateSearchClient({ 
  initialData, 
  initialSearchParams 
}: AdvocateSearchClientProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchParams.query || "");
  const { data, loading, error, searchParams, updateSearch } = useSearchAdvocates({
    initialData,
    enableAutoSearch: false // We'll handle search manually - only for url change search
  });
  const currentData = data || initialData;
  const advocates = currentData?.data || [];
  const pagination = currentData?.pagination;

  const handleSearchChange = useCallback((value: string): void => {
    setLocalSearchTerm(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    updateSearch({
      query: localSearchTerm || undefined,
      page: 1, // Reset to first page on new search
    });
  }, [localSearchTerm, updateSearch]);

  const handleReset = useCallback((): void => {
    setLocalSearchTerm("");
    updateSearch({
      query: undefined,
      page: 1,
      filters: {},
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
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-semibold">Error: {error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 space-y-6 pb-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">Advocate Search</h1>
          
          {/* Search Controls */}
          <SearchControls
            searchValue={localSearchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearchSubmit}
            onClear={handleReset}
            searchPlaceholder="Search by name, city, or specialty"
            searchLoading={loading}
            searchDisabled={loading}
            resultsPerPage={searchParams.limit || 10}
            onResultsPerPageChange={handleLimitChange}
            resultsPerPageDisabled={loading}
          />
        </div>

        {/* Filters */}
        <AdvocateSearchFilters
          initialFilters={searchParams.filters || {}}
          onFiltersChange={handleFiltersChange}
          disabled={loading}
        />

        {/* Search Stats */}
        {(searchParams.query || (pagination && pagination.total > 0)) && (
          <SearchStats
            query={searchParams.query}
            totalResults={pagination?.total || 0}
            currentPage={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
            resultsPerPage={pagination?.limit || 10}
            loading={loading}
          />
        )}
      </div>

      {/* Scrollable Results Section */}
      <div className="flex-1 min-h-0">
        <SearchResults
          data={advocates}
          pagination={pagination}
          loading={loading}
          searchQuery={searchParams.query}
          onPageChange={handlePageChange}
          emptySearchMessage="No advocates found matching &quot;{query}&quot;"
          showPaginationTop={true}
          showPaginationBottom={true}
          className="h-full"
        >
          <AdvocateTable
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
