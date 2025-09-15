"use client";

import { useState, useCallback } from "react";
import { AdvocateFilters, DegreeType } from "../../types/advocate";

interface AdvocateSearchFiltersProps {
  initialFilters?: AdvocateFilters;
  onFiltersChange: (filters: AdvocateFilters) => void;
  disabled?: boolean;
}

export default function AdvocateSearchFilters({
  initialFilters = {},
  onFiltersChange,
  disabled = false
}: AdvocateSearchFiltersProps) {
  const [filters, setFilters] = useState<AdvocateFilters>(initialFilters);

  const handleFilterChange = useCallback((key: keyof AdvocateFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  const handleReset = useCallback(() => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  }, [onFiltersChange]);

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ""
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            disabled={disabled}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Degree Filter */}
        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
            Degree
          </label>
          <select
            id="degree"
            value={filters.degree || ""}
            onChange={(e) => handleFilterChange('degree', e.target.value || undefined)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-50"
          >
            <option value="">All Degrees</option>
            <option value={DegreeType.MD}>MD (Medical Doctor)</option>
            <option value={DegreeType.PHD}>PhD (Doctor of Philosophy)</option>
            <option value={DegreeType.MSW}>MSW (Master of Social Work)</option>
          </select>
        </div>

        {/* Experience Range */}
        <div>
          <label htmlFor="minExperience" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Experience (years)
          </label>
          <input
            type="number"
            id="minExperience"
            value={filters.minExperience ?? ""}
            onChange={(e) => handleFilterChange('minExperience', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="0"
            min="0"
            max="50"
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.degree && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Degree: {filters.degree}
                <button
                  onClick={() => handleFilterChange('degree', undefined)}
                  disabled={disabled}
                  className="ml-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  ×
                </button>
              </span>
            )}
            {filters.minExperience !== undefined && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Experience: {filters.minExperience}+ years
                <button
                  onClick={() => handleFilterChange('minExperience', undefined)}
                  disabled={disabled}
                  className="ml-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
