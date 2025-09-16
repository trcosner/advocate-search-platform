import React from "react";
import { advocateService } from "./api/services/advocate";
import { AdvocateSearchParams, DegreeType } from "../types/api";
import AdvocateSearchWrapper from "./components/advocates/AdvocateSearchWrapper";


interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    query?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    degree?: string;
    minExperience?: string;
  };
}

async function getAdvocates(searchParams: AdvocateSearchParams) {
  try {
    return await advocateService.search(searchParams);
  } catch (error) {
    console.error('Error fetching advocates on server:', error);
    throw error;
  }
}

export default async function HomePage({ searchParams }: PageProps) {
  // Only fetch data if there are search params (not during static generation)
  const hasSearchParams = Object.keys(searchParams).some(key => searchParams[key as keyof typeof searchParams]);
  
  let initialData;
  let advocateSearchParams: AdvocateSearchParams = {};
  
  if (hasSearchParams) {
    const degreeParam = searchParams.degree;
    const degree = degreeParam 
      ? Object.values(DegreeType).find(d => d.toLowerCase() === degreeParam.toLowerCase()) 
      : undefined;

    // Parse search params for the API call
    advocateSearchParams = {
      page: searchParams.page ? Number(searchParams.page) : undefined,
      limit: searchParams.limit ? Number(searchParams.limit) : undefined,
      query: searchParams.query || undefined,
      sortBy: searchParams.sortBy || undefined,
      sortOrder: searchParams.sortOrder || undefined,
      filters: {
        degree,
        minExperience: searchParams.minExperience ? Number(searchParams.minExperience) : undefined,
      },
    };

    // Fetch data on the server only when we have search params
    try {
      initialData = await getAdvocates(advocateSearchParams);
    } catch (error) {
      console.error('Error loading initial data:', error);
      // Continue without initial data
    }
  }

  return (
    <div className="h-full flex flex-col">
      <AdvocateSearchWrapper 
        initialData={initialData || undefined}
        initialSearchParams={advocateSearchParams}
      />
    </div>
  );
}
