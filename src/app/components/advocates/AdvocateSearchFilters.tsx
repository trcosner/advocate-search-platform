"use client";

import { useState, useCallback } from "react";
import { AdvocateFilters, DegreeType } from "../../../types/advocate";
import { inputStyles, cn } from "../../../utils/styles";
import FilterTags from "../shared/filters/FilterTags";
import CustomSelect from "../shared/form/CustomSelect";

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

  return (
      <div className="space-y-4">
        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Degree
            </label>
            <CustomSelect
              value={filters.degree}
              onChange={(value) => handleFilterChange('degree', value as DegreeType | undefined)}
              options={[
                { value: undefined, label: "All Degrees" },
                { value: DegreeType.MD, label: "MD (Medical Doctor)" },
                { value: DegreeType.PHD, label: "PhD (Doctor of Philosophy)" },
                { value: DegreeType.MSW, label: "MSW (Master of Social Work)" }
              ]}
              placeholder="Select degree"
              disabled={disabled}
            />
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
      </div>
  );
}
