import { AdvocateCardSkeletonGrid } from "./AdvocateCardSkeleton";
import FilterSkeleton from "../shared/filters/FilterSkeleton";
import TableSkeleton from "../shared/table/TableSkeleton";
import { skeletonStyles, cn } from "@/utils/styles";

const AdvocateSearchSkeleton = () => (
    <div className="h-full flex flex-col">
      {/* Header Skeleton */}
      <div className="flex-shrink-0 space-y-6 pb-6">
        <div>
          {/* Title Skeleton */}
          <div className={cn(skeletonStyles.rect("w-64"), "h-8 mb-6", "animate-pulse")}></div>
          
          {/* Search Controls Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="relative flex gap-3">
                <div className={cn(skeletonStyles.input, "flex-1")}></div>
                <div className={cn(skeletonStyles.button, "w-20")}></div>
                <div className={cn(skeletonStyles.button, "w-16")}></div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className={cn(skeletonStyles.rect("w-16"), "h-4 mb-2")}></div>
              <div className={cn(skeletonStyles.input, "w-32")}></div>
            </div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <FilterSkeleton />

        {/* Search Stats Skeleton */}
        <div className="flex items-center justify-between">
          <div className={cn(skeletonStyles.rect("w-48"), "h-5", "animate-pulse")}></div>
          <div className={cn(skeletonStyles.rect("w-32"), "h-5", "animate-pulse")}></div>
        </div>
      </div>

      {/* Results Skeleton */}
      <div className="flex-1 min-h-0">
        {/* Desktop Table Skeleton */}
        <div className="hidden lg:block h-full">
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
    </div>
  );

  export default AdvocateSearchSkeleton