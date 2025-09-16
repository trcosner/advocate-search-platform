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
  const degreeParam = searchParams.degree;
  const degree = degreeParam 
    ? Object.values(DegreeType).find(d => d.toLowerCase() === degreeParam.toLowerCase()) 
    : undefined;

  // Parse search params for the API call - always set up search params even if empty
  const advocateSearchParams: AdvocateSearchParams = {
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

  // Always fetch data on the server - this provides initial results even with no search params
  let initialData;
  try {
    initialData = await getAdvocates(advocateSearchParams);
  } catch (error) {
    console.error('Error loading initial data:', error);
    // Continue without initial data
  }

  return (
    <div className="h-full flex flex-col">
      <AdvocateSearchWrapper 
        initialData={initialData}
        initialSearchParams={advocateSearchParams}
      />
    </div>
  );
}
