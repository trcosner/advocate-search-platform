'use client';

"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AdvocateSearchParams, DegreeType } from "../types";
import AdvocateSearchPage from "./components/advocates/AdvocateSearchPage";

export default function HomePage() {
  const searchParams = useSearchParams();
  
  const degreeParam = searchParams.get('degree');
  const degree = degreeParam 
    ? Object.values(DegreeType).find(d => d.toLowerCase() === degreeParam.toLowerCase()) 
    : undefined;

  // Parse search params for the API call - always set up search params even if empty
  const advocateSearchParams: AdvocateSearchParams = {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
    query: searchParams.get('query') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
    filters: {
      degree,
      minExperience: searchParams.get('minExperience') ? Number(searchParams.get('minExperience')) : undefined,
    },
  };

  return (
    <div className="h-full flex flex-col">
      <AdvocateSearchPage 
        initialSearchParams={advocateSearchParams}
      />
    </div>
  );
}
