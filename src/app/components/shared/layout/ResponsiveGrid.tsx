"use client";

import { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg" | "xl";
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const gapMap = {
  sm: "gap-4",     // 16px
  md: "gap-6",     // 24px  
  lg: "gap-8",     // 32px
  xl: "gap-12"     // 48px
};

export default function ResponsiveGrid({
  children,
  className = "",
  gap = "md",
  cols
}: ResponsiveGridProps) {
  // Build responsive grid classes
  const getGridClasses = () => {
    const baseClasses = "grid w-full";
    const gapClass = gapMap[gap];
    
    if (cols) {
      // Use explicit column configuration
      const responsiveClasses = [
        cols.sm && `sm:grid-cols-${cols.sm}`,
        cols.md && `md:grid-cols-${cols.md}`,
        cols.lg && `lg:grid-cols-${cols.lg}`,
        cols.xl && `xl:grid-cols-${cols.xl}`
      ].filter(Boolean).join(" ");
      
      return `${baseClasses} grid-cols-1 ${responsiveClasses} ${gapClass}`;
    } else {
      // Use auto-fit behavior with Tailwind classes only
      return `${baseClasses} ${gapClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
    }
  };

  const gridClasses = getGridClasses();

  return (
    <div className={`${gridClasses} ${className}`}>
      {children}
    </div>
  );
}
