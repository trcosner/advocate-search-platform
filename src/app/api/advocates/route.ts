import { NextRequest } from "next/server";
import { advocateService } from "../services/advocate";
import { AdvocateSearchParams, AdvocateResponse, DegreeType } from "../../../types/api";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const degreeParam = searchParams.get('degree');
    const degree = degreeParam && Object.values(DegreeType).includes(degreeParam as DegreeType) 
      ? degreeParam as DegreeType
      : undefined;
    
    const searchRequest: AdvocateSearchParams = {
      page: Number(searchParams.get('page')) || undefined,
      limit: Number(searchParams.get('limit')) || undefined,
      query: searchParams.get('query') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
      filters: {
        degree,
        minExperience: searchParams.get('minExperience') ? Number(searchParams.get('minExperience')) : undefined,
      },
    };

    const result = await advocateService.search(searchRequest);

    const response: AdvocateResponse = {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error searching advocates:', error);
    
    const errorResponse: AdvocateResponse = {
      success: false,
      error: 'Failed to search advocates',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };

    return Response.json(errorResponse, { status: 500 });
  }
}