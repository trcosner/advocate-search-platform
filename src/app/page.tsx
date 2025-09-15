import { Suspense } from "react";
import { advocateService } from "./api/services/advocate";
import { AdvocateSearchParams, DegreeType } from "../types/api";
import AdvocateSearchClient from "./components/AdvocateSearchClient";

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
  // Validate degree parameter
  const degreeParam = searchParams.degree;
  const degree = degreeParam && Object.values(DegreeType).includes(degreeParam as DegreeType)
    ? degreeParam as DegreeType
    : undefined;

  // Parse search params for the API call
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

  // Fetch data on the server
  const initialData = await getAdvocates(advocateSearchParams);

  return (
    <div>
      <Suspense fallback={<div style={{ padding: "20px" }}>Loading advocates...</div>}>
        <AdvocateSearchClient 
          initialData={initialData}
          initialSearchParams={advocateSearchParams}
        />
      </Suspense>
    </div>
  );
}
