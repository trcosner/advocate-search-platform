"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { useSearchAdvocates } from "../../hooks/useSearchAdvocates";
import { Advocate, AdvocateSearchParams, AdvocateFilters, PaginatedResult } from "../../types/api";
import AdvocateSearchFilters from "./AdvocateSearchFilters";

interface AdvocateSearchClientProps {
  initialData: PaginatedResult<Advocate>;
  initialSearchParams: AdvocateSearchParams;
}

export default function AdvocateSearchClient({ 
  initialData, 
  initialSearchParams 
}: AdvocateSearchClientProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchParams.query || "");
  const { data, loading, error, searchParams, updateSearch } = useSearchAdvocates({
    initialData,
    enableAutoSearch: false // We'll handle search manually
  });

  const currentData = data || initialData;
  const advocates = currentData?.data || [];
  const pagination = currentData?.pagination;

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setLocalSearchTerm(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    updateSearch({
      query: localSearchTerm || undefined,
      page: 1, // Reset to first page on new search
    });
  }, [localSearchTerm, updateSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

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

  const handleLimitChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    updateSearch({ 
      limit: Number(e.target.value),
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
      <div style={{ padding: "20px", color: "red" }}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Advocate Search</h1>
        
        {/* Search Controls */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <input
              type="text"
              value={localSearchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search by name, city, degree, or specialties..."
              style={{ 
                border: "1px solid #ccc", 
                padding: "8px", 
                width: "300px"
              }}
            />
            <button 
              onClick={handleSearchSubmit}
              disabled={loading}
              style={{ 
                marginLeft: "10px", 
                padding: "8px 16px",
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <button 
              onClick={handleReset}
              disabled={loading}
              style={{ 
                marginLeft: "10px", 
                padding: "8px 16px",
                opacity: loading ? 0.5 : 1
              }}
            >
              Clear
            </button>
          </div>

          {/* Results per page */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label htmlFor="limit-select">Results per page:</label>
            <select
              id="limit-select"
              value={searchParams.limit || 10}
              onChange={handleLimitChange}
              disabled={loading}
              style={{ padding: "4px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <AdvocateSearchFilters
          initialFilters={searchParams.filters || {}}
          onFiltersChange={handleFiltersChange}
          disabled={loading}
        />

        {/* Search Info */}
        {searchParams.query && (
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
            Searching for: <strong>{searchParams.query}</strong> 
            {pagination && ` (${pagination.total} results)`}
          </p>
        )}
      </div>

      {/* Pagination Top */}
      {pagination && pagination.totalPages > 1 && (
        <PaginationControls 
          pagination={pagination} 
          onPageChange={handlePageChange}
          loading={loading}
          style={{ marginBottom: "20px" }}
        />
      )}

      {/* Results */}
      {advocates.length === 0 ? (
        <p>No advocates found{searchParams.query ? ` matching "${searchParams.query}"` : ""}.</p>
      ) : (
        <>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <SortableHeader 
                  field="firstName" 
                  label="First Name" 
                  currentSort={searchParams.sortBy}
                  currentOrder={searchParams.sortOrder}
                  onSort={handleSortChange}
                />
                <SortableHeader 
                  field="lastName" 
                  label="Last Name" 
                  currentSort={searchParams.sortBy}
                  currentOrder={searchParams.sortOrder}
                  onSort={handleSortChange}
                />
                <SortableHeader 
                  field="city" 
                  label="City" 
                  currentSort={searchParams.sortBy}
                  currentOrder={searchParams.sortOrder}
                  onSort={handleSortChange}
                />
                <SortableHeader 
                  field="degree" 
                  label="Degree" 
                  currentSort={searchParams.sortBy}
                  currentOrder={searchParams.sortOrder}
                  onSort={handleSortChange}
                />
                <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Specialties</th>
                <SortableHeader 
                  field="yearsOfExperience" 
                  label="Experience" 
                  currentSort={searchParams.sortBy}
                  currentOrder={searchParams.sortOrder}
                  onSort={handleSortChange}
                />
                <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {advocates.map((advocate: Advocate, idx: number) => (
                <tr key={advocate.id || `advocate-${idx}`}>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{advocate.firstName}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{advocate.lastName}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{advocate.city}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{advocate.degree}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    {advocate.specialties.map((specialty: string, specialtyIdx: number) => (
                      <div key={`${advocate.id}-specialty-${specialtyIdx}`} style={{ marginBottom: "4px" }}>
                        {specialty}
                      </div>
                    ))}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{advocate.yearsOfExperience} years</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{advocate.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Bottom */}
          {pagination && pagination.totalPages > 1 && (
            <PaginationControls 
              pagination={pagination} 
              onPageChange={handlePageChange}
              loading={loading}
              style={{ marginTop: "20px" }}
            />
          )}
        </>
      )}
    </div>
  );
}

// Sortable Header Component
interface SortableHeaderProps {
  field: string;
  label: string;
  currentSort?: string;
  currentOrder?: 'asc' | 'desc';
  onSort: (field: string) => void;
}

function SortableHeader({ field, label, currentSort, currentOrder, onSort }: SortableHeaderProps) {
  const isActive = currentSort === field;
  const sortIcon = isActive 
    ? (currentOrder === 'asc' ? ' ↑' : ' ↓')
    : '';

  return (
    <th 
      style={{ 
        border: "1px solid #ddd", 
        padding: "12px", 
        textAlign: "left",
        cursor: "pointer",
        backgroundColor: isActive ? "#e3f2fd" : "#f5f5f5",
        userSelect: "none"
      }}
      onClick={() => onSort(field)}
    >
      {label}{sortIcon}
    </th>
  );
}

// Pagination Controls Component
interface PaginationControlsProps {
  pagination: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    total: number;
    limit: number;
  };
  onPageChange: (page: number) => void;
  loading?: boolean;
  style?: React.CSSProperties;
}

function PaginationControls({ pagination, onPageChange, loading, style }: PaginationControlsProps) {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", ...style }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev || loading}
        style={{ 
          padding: "8px 12px",
          opacity: (!hasPrev || loading) ? 0.5 : 1,
          cursor: (!hasPrev || loading) ? "not-allowed" : "pointer"
        }}
      >
        Previous
      </button>

      {getPageNumbers().map(pageNum => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          disabled={loading}
          style={{
            padding: "8px 12px",
            backgroundColor: pageNum === page ? "#007bff" : "white",
            color: pageNum === page ? "white" : "#007bff",
            border: "1px solid #007bff",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1
          }}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext || loading}
        style={{ 
          padding: "8px 12px",
          opacity: (!hasNext || loading) ? 0.5 : 1,
          cursor: (!hasNext || loading) ? "not-allowed" : "pointer"
        }}
      >
        Next
      </button>

      <span style={{ marginLeft: "20px", color: "#666" }}>
        Page {page} of {totalPages} ({pagination.total} total results)
      </span>
    </div>
  );
}
