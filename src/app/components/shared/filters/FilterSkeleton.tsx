"use client";

import { skeletonStyles, cn } from "@/utils/styles";

interface FilterSkeletonProps {
  className?: string;
}

export default function FilterSkeleton({ className = "" }: FilterSkeletonProps) {
  return (
    <div className={cn("bg-white border border-neutral-200 rounded-lg animate-pulse", className)}>
      <div className="flex items-center justify-between p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={cn(skeletonStyles.rect("w-16"), "h-4")}></div>
          </div>
          <div className={cn(skeletonStyles.badge, "w-20")}></div>
        </div>

        <div className="flex items-center gap-2">
          <div className={cn(skeletonStyles.rect("w-16"), "h-4")}></div>
          <div className={cn(skeletonStyles.circle("h-6 w-6"), "lg:hidden")}></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className={cn(skeletonStyles.rect("w-20"), "h-4")}></div>
          <div className="flex gap-3">
            <div className={cn(skeletonStyles.input, "flex-1")}></div>
            <div className={cn(skeletonStyles.button, "w-20")}></div>
            <div className={cn(skeletonStyles.button, "w-16")}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className={cn(skeletonStyles.rect("w-16"), "h-4")}></div>
            <div className={skeletonStyles.input}></div>
          </div>

          <div className="space-y-2">
            <div className={cn(skeletonStyles.rect("w-24"), "h-4")}></div>
            <div className={skeletonStyles.input}></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className={cn(skeletonStyles.badge, "w-16")}></div>
          <div className={cn(skeletonStyles.badge, "w-20")}></div>
        </div>
      </div>
    </div>
  );
}
