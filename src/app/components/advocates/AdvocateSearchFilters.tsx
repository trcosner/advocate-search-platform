"use client";

import { useState, useCallback } from "react";
import { AdvocateFilters, DegreeType } from "../../../types";
import { cn } from "@/app/utils/styles";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import CustomSelect from "../shared/form/CustomSelect";
import Input from "../shared/form/Input";
import Button from "../shared/Button";

interface AdvocateSearchFiltersProps {
  initialFilters?: AdvocateFilters;
  onClear: () => void
  onFiltersChange: (filters: AdvocateFilters) => void;
  disabled?: boolean;
}

export default function AdvocateSearchFilters({
  initialFilters = {},
  onFiltersChange,
  onClear,
  disabled = false
}: AdvocateSearchFiltersProps) {
  const [filters, setFilters] = useState<AdvocateFilters>(initialFilters);

  // Debounced version of onFiltersChange specifically for minExperience
  const debouncedFiltersChange = useDebouncedCallback(onFiltersChange, 500);

  const handleFilterChange = useCallback((key: keyof AdvocateFilters, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Use debounced callback only for minExperience, immediate for others
      if (key === 'minExperience') {
        debouncedFiltersChange(newFilters);
      } else {
        onFiltersChange(newFilters);
      }
      
      return newFilters;
    });
  }, [onFiltersChange, debouncedFiltersChange]);

  const handleClear = () => {
    // Cancel any pending debounced search
    debouncedFiltersChange.cancel();
    
    const newFilters = {degree: undefined, minExperience: 0};
    onFiltersChange(newFilters);
    onClear();
    setFilters(newFilters);
  };

  return (
      <div className="space-y-4">
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
            <div className="flex gap-2">
              <Input
                type="number"
                id="minExperience"
                value={filters.minExperience ?? ""}
                onChange={(e) => handleFilterChange('minExperience', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="0"
                min="0"
                max="50"
                disabled={disabled}
                className={cn(
                  "px-3 py-2 text-sm flex-1",
                  disabled && "bg-neutral-50 opacity-50"
                )}
              />
              <Button
                onClick={handleClear}
                disabled={disabled}
                variant="secondary"
                size="sm"
                className="px-4 whitespace-nowrap"
                aria-label="Clear filters"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}
