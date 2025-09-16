"use client";

import { useState, useCallback } from "react";
import { AdvocateFilters, DegreeType } from "../../../types/advocate";
import FilterPanel from "../shared/filters/FilterPanel";

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

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== null && value !== ""
  ).length;

  return (
    <FilterPanel
      collapsibleOnMobile={true}
      activeFiltersCount={activeFiltersCount}
      onReset={handleReset}
      className="mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Degree Filter */}
        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-neutral-700 mb-2">
            Degree
          </label>
          <select
            id="degree"
            value={filters.degree || ""}
            onChange={(e) => handleFilterChange('degree', e.target.value || undefined)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-50 disabled:opacity-50"
          >
            <option value="">All Degrees</option>
            <option value={DegreeType.MD}>MD (Medical Doctor)</option>
            <option value={DegreeType.PHD}>PhD (Doctor of Philosophy)</option>
            <option value={DegreeType.MSW}>MSW (Master of Social Work)</option>
          </select>
        </div>

        {/* Experience Range */}
        <div>
          <label htmlFor="minExperience" className="block text-sm font-medium text-neutral-700 mb-2">
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
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-50 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="pt-4 mt-4 border-t border-neutral-200">
          <div className="flex flex-wrap gap-2">
            {filters.degree && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">
                Degree: {filters.degree}
                <button
                  onClick={() => handleFilterChange('degree', undefined)}
                  disabled={disabled}
                  className="ml-2 text-primary-600 hover:text-primary-800 disabled:opacity-50 transition-colors duration-200"
                  aria-label="Remove degree filter"
                >
                  ×
                </button>
              </span>
            )}
            {filters.minExperience !== undefined && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">
                Experience: {filters.minExperience}+ years
                <button
                  onClick={() => handleFilterChange('minExperience', undefined)}
                  disabled={disabled}
                  className="ml-2 text-primary-600 hover:text-primary-800 disabled:opacity-50 transition-colors duration-200"
                  aria-label="Remove experience filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </FilterPanel>
  );
}
