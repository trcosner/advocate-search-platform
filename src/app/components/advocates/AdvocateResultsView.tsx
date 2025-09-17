"use client";

import { Advocate } from "../../../types";
import AdvocateTable from "./AdvocateTable";
import AdvocateCard from "./AdvocateCard";
import AdvocateCardGrid from "./AdvocateCardGrid";
import LoadingSpinner from "../shared/LoadingSpinner";

interface AdvocateResultsViewProps {
  advocates: Advocate[];
  currentSort?: string;
  currentOrder?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  loading?: boolean;
  className?: string;
}

export default function AdvocateResultsView({
  advocates,
  currentSort,
  currentOrder,
  onSort = () => {},
  loading = false,
  className = ""
}: AdvocateResultsViewProps) {
  
  if (loading && advocates.length === 0) {
    return (
      <div className={className}>
        <LoadingSpinner 
          size="lg" 
          message="Loading advocates..." 
          className="h-64"
        />
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {loading && advocates.length > 0 && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-lg border border-neutral-200">
            <LoadingSpinner size="sm" message="" />
            <span className="text-sm text-neutral-600">Updating results...</span>
          </div>
        </div>
      )}
      <div className="hidden lg:block h-full">
        <AdvocateTable
          advocates={advocates}
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
          loading={loading}
          className="h-full"
        />
      </div>

      <div className="lg:hidden">
        {advocates.length > 0 ? (
          <AdvocateCardGrid>
            {advocates.map((advocate) => (
              <AdvocateCard
                key={advocate.id}
                advocate={advocate}
              />
            ))}
          </AdvocateCardGrid>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">No advocates found</p>
          </div>
        )}
      </div>
    </div>
  );
}
