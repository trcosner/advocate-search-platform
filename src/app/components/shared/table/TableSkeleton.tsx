"use client";

import { skeletonStyles, cn } from "@/utils/styles";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export default function TableSkeleton({ 
  rows = 5, 
  columns = 5, 
  className = "" 
}: TableSkeletonProps) {
  return (
    <div className={cn("bg-white border border-neutral-200 rounded-lg overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Header Skeleton */}
          <thead>
            <tr>
              {Array.from({ length: columns }, (_, index) => (
                <th
                  key={index}
                  className="px-3 py-3 bg-neutral-50 border-b border-neutral-200"
                >
                  <div className={cn(skeletonStyles.rect("w-20"), "h-4", "animate-pulse")}></div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body Skeleton */}
          <tbody className="divide-y divide-neutral-200">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                {Array.from({ length: columns }, (_, colIndex) => (
                  <td key={colIndex} className="px-3 py-4">
                    <div className={cn(
                      skeletonStyles.rect(),
                      "h-4",
                      // Vary the width for more realistic skeleton
                      colIndex === 0 ? "w-24" : 
                      colIndex === 1 ? "w-32" : 
                      colIndex === 2 ? "w-20" : 
                      colIndex === 3 ? "w-16" : "w-28"
                    )}></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
