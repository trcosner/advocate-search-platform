"use client";

import { ReactNode } from "react";

interface AdvocateCardGridProps {
  children: ReactNode;
  className?: string;
}

export default function AdvocateCardGrid({ 
  children, 
  className = "" 
}: AdvocateCardGridProps) {
  return (
    <div className={`grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${className}`}>
      {children}
    </div>
  );
}
