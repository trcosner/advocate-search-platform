"use client";

import { Advocate } from "@/types/advocate";
import AdvocateTable from "./AdvocateTable";
import AdvocateCard from "./AdvocateCard";
import AdvocateCardGrid from "./AdvocateCardGrid";
import { AdvocateCardSkeletonGrid } from "./AdvocateCardSkeleton";
import TableSkeleton from "../shared/table/TableSkeleton";

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
  
  // Show full skeleton only when loading with no existing data
  if (loading && advocates.length === 0) {
    return (
      <div className={className}>
        {/* Desktop Table Skeleton */}
        <div className="hidden lg:block">
          <TableSkeleton 
            rows={8} 
            columns={5} 
            className="h-full"
          />
        </div>

        {/* Mobile/Tablet Card Grid Skeleton */}
        <div className="lg:hidden">
          <AdvocateCardSkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {/* Loading overlay for when data exists but is refreshing */}
      {loading && advocates.length > 0 && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-lg border border-neutral-200">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
            <span className="text-sm text-neutral-600">Updating results...</span>
          </div>
        </div>
      )}
      {/* Desktop Table View (lg+ breakpoint) */}
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

      {/* Mobile/Tablet Card Grid View (< lg breakpoint) */}
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
