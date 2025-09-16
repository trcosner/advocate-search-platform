"use client";

import { ReactNode, useState, useCallback } from "react";

interface FilterPanelProps {
  children: ReactNode;
  className?: string;
  collapsibleOnMobile?: boolean;
  defaultCollapsed?: boolean;
  activeFiltersCount?: number;
  onReset?: () => void;
  title?: string;
}

export default function FilterPanel({
  children,
  className = "",
  collapsibleOnMobile = true,
  defaultCollapsed = false,
  activeFiltersCount = 0,
  onReset,
  title
}: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    onReset?.();
  }, [onReset]);

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className={`bg-white border border-neutral-200 rounded-lg ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">

            {title && (
              <span className="text-sm font-medium text-neutral-700">
                {title}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && onReset && (
            <button
              onClick={handleReset}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Clear all
            </button>
          )}

          {collapsibleOnMobile && (
            <button
              onClick={toggleCollapsed}
              className="lg:hidden p-1 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
              aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
              aria-expanded={!isCollapsed}
            >
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  isCollapsed ? "rotate-0" : "rotate-180"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${collapsibleOnMobile 
            ? `lg:block ${isCollapsed ? 'max-h-0 lg:max-h-none' : 'max-h-96'}` 
            : 'block'
          }
        `}
      >
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
