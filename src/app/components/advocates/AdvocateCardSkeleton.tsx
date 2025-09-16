"use client";

import { skeletonStyles, cardStyles, cn } from "@/utils/styles";

interface AdvocateCardSkeletonProps {
  className?: string;
}

export default function AdvocateCardSkeleton({ className = "" }: AdvocateCardSkeletonProps) {
  return (
    <div className={cn(cardStyles.base, "animate-pulse", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className={cn(skeletonStyles.rect("w-3/4"), "h-6 mb-2")}></div>
          <div className={cn(skeletonStyles.rect("w-1/2"), "h-4")}></div>
        </div>
        <div className="ml-3 flex-shrink-0">
          <div className={cn(skeletonStyles.badge, "w-16")}></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          <div className={cn(skeletonStyles.badge, "w-20")}></div>
          <div className={cn(skeletonStyles.badge, "w-24")}></div>
          <div className={cn(skeletonStyles.badge, "w-16")}></div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-100">
        <div className="flex items-center">
          <div className={cn(skeletonStyles.circle("h-4 w-4"), "mr-2")}></div>
          <div className={cn(skeletonStyles.rect("w-28"), "h-4")}></div>
        </div>
      </div>
    </div>
  );
}

interface AdvocateCardSkeletonGridProps {
  count?: number;
  className?: string;
}

export function AdvocateCardSkeletonGrid({ 
  count = 6, 
  className = "" 
}: AdvocateCardSkeletonGridProps) {
  return (
    <div className={`
      grid gap-4 sm:gap-6
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4
      ${className}
    `}>
      {Array.from({ length: count }, (_, index) => (
        <AdvocateCardSkeleton key={index} />
      ))}
    </div>
  );
}
