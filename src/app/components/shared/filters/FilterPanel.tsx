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
    <div className={`bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Header - Only show on mobile when collapsible, always hidden on desktop when no title */}
      {(collapsibleOnMobile || title) && (
        <div className="flex items-center justify-between p-4 border-b border-neutral-100 lg:border-b-0 lg:pb-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {title && (
                <span className="text-sm font-medium text-neutral-700">
                  {title}
                </span>
              )}
              {!title && collapsibleOnMobile && (
                <span className="text-sm font-medium text-neutral-700 lg:hidden">
                  Filters
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && onReset && (
              <button
                onClick={handleReset}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded-md px-2 py-1"
              >
                Clear all
              </button>
            )}

            {collapsibleOnMobile && (
              <button
                onClick={toggleCollapsed}
                className={`
                  lg:hidden p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 
                  focus:ring-offset-1 rounded-md
                  ${isCollapsed ? 'rotate-0' : 'rotate-180'}
                `}
                aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
                aria-expanded={!isCollapsed}
              >
                <svg
                  className="h-5 w-5 transform transition-transform duration-300"
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
      )}

      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${collapsibleOnMobile 
            ? `lg:block ${isCollapsed ? 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100' : 'max-h-96 opacity-100'}` 
            : 'block opacity-100'
          }
        `}
      >
        <div className={`
          transition-all duration-300
          ${(collapsibleOnMobile || title) ? 'p-4' : 'p-4'}
          ${collapsibleOnMobile && isCollapsed ? 'lg:pt-4' : ''}
        `}>
          {children}
        </div>
      </div>
    </div>
  );
}
