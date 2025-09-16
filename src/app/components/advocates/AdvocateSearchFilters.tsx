"use client";

import { useState, useCallback } from "react";
import { AdvocateFilters, DegreeType } from "../../../types/advocate";
import { inputStyles, cn } from "../../../utils/styles";
import FilterPanel from "../shared/filters/FilterPanel";
import FilterTags from "../shared/filters/FilterTags";

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

  const handleRemoveFilter = useCallback((key: keyof AdvocateFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
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
      <div className="space-y-4">
        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Degree
            </label>
            <select
              id="degree"
              value={filters.degree || ""}
              onChange={(e) => handleFilterChange('degree', e.target.value || undefined)}
              disabled={disabled}
              className={cn(
                inputStyles.select,
                "w-full",
                disabled && "bg-neutral-50 opacity-50"
              )}
            >
              <option value="">All Degrees</option>
              <option value={DegreeType.MD}>MD (Medical Doctor)</option>
              <option value={DegreeType.PHD}>PhD (Doctor of Philosophy)</option>
              <option value={DegreeType.MSW}>MSW (Master of Social Work)</option>
            </select>
          </div>

          <div>
            <label htmlFor="minExperience" className="block text-sm font-medium text-neutral-700 mb-1.5">
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
              className={cn(
                inputStyles.base,
                "px-3 py-2 text-sm",
                disabled && "bg-neutral-50 opacity-50"
              )}
            />
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 border-t border-neutral-100">
            <FilterTags
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </FilterPanel>
  );
}
