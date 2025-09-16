"use client";

import { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  minItemWidth?: string; // CSS value like "280px"
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
  minItemWidth = "280px",
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
      // Use auto-fit with minimum width
      return `${baseClasses} ${gapClass}`;
    }
  };

  const gridClasses = getGridClasses();
  
  // For auto-fit grids, use CSS custom property
  const customStyles = !cols ? {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
  } : undefined;

  return (
    <div 
      className={`${gridClasses} ${className}`}
      style={customStyles}
    >
      {children}
    </div>
  );
}
