"use client";

import { AdvocateFilters, DegreeType } from "../../../../types/advocate";
import { badgeStyles, cn } from "../../../../utils/styles";

interface FilterTagsProps {
  filters: AdvocateFilters;
  onRemoveFilter: (key: keyof AdvocateFilters) => void;
  disabled?: boolean;
  className?: string;
}

interface FilterTag {
  key: keyof AdvocateFilters;
  label: string;
  value: string;
}

export default function FilterTags({
  filters,
  onRemoveFilter,
  disabled = false,
  className = ""
}: FilterTagsProps) {
  // Convert filters to display tags
  const filterTags: FilterTag[] = [];

  if (filters.degree) {
    const degreeLabels = {
      [DegreeType.MD]: "MD (Medical Doctor)",
      [DegreeType.PHD]: "PhD (Doctor of Philosophy)", 
      [DegreeType.MSW]: "MSW (Master of Social Work)"
    };
    
    filterTags.push({
      key: 'degree',
      label: 'Degree',
      value: degreeLabels[filters.degree as DegreeType] || filters.degree
    });
  }

  if (filters.minExperience !== undefined && filters.minExperience !== null) {
    filterTags.push({
      key: 'minExperience',
      label: 'Experience',
      value: `${filters.minExperience}+ years`
    });
  }

  if (filterTags.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Active Filters
        </h4>
        <span className="text-xs text-neutral-400">
          {filterTags.length} active
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterTags.map(({ key, label, value }) => (
          <span
            key={String(key)}
            className={cn(
              badgeStyles.primary,
              "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium",
              "bg-gradient-to-r from-primary-50 to-primary-100",
              "border border-primary-200 hover:border-primary-300",
              "transition-all duration-200 hover:shadow-sm"
            )}
          >
            <span className="text-xs text-primary-600 font-semibold uppercase tracking-wider">
              {label}:
            </span>
            <span className="text-primary-800 font-medium">{value}</span>
            <button
              onClick={() => onRemoveFilter(key)}
              disabled={disabled}
              className={cn(
                "ml-1 -mr-1 text-primary-500 hover:text-primary-700 focus:text-primary-700",
                "hover:bg-primary-200 focus:bg-primary-200",
                "transition-all duration-200 focus:outline-none",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "rounded-full p-0.5 text-lg leading-none"
              )}
              aria-label={`Remove ${label.toLowerCase()} filter`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
