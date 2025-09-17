import { useCallback, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRequest } from './useRequest';
import { AdvocateSearchParams, PaginatedResult, Advocate, DegreeType } from '../../types/api';

export interface UseSearchAdvocatesOptions {
  initialData?: PaginatedResult<Advocate>;
}

export function useSearchAdvocates(options: UseSearchAdvocatesOptions = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, loading, error, execute } = useRequest<PaginatedResult<Advocate>>({
    onSuccess: (data) => {
      console.log('Advocates fetched:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch advocates:', error);
    },
  });

  // Parse current URL search params - memoized for performance
  const currentSearchParams = useMemo((): AdvocateSearchParams => {
    // Validate degree parameter
    const degreeParam = searchParams.get('degree');
    const degree = degreeParam && Object.values(DegreeType).includes(degreeParam as DegreeType)
      ? degreeParam as DegreeType
      : undefined;

    return {
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
      query: searchParams.get('query') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
      filters: {
        degree,
        minExperience: searchParams.get('minExperience') ? 
          Number(searchParams.get('minExperience')) : undefined,
      },
    };
  }, [searchParams]);

  // Build URL with search parameters
  const buildSearchUrl = useCallback((params: AdvocateSearchParams): string => {
    const urlParams = new URLSearchParams();

    if (params.page) urlParams.set('page', params.page.toString());
    if (params.limit) urlParams.set('limit', params.limit.toString());
    if (params.query) urlParams.set('query', params.query);
    if (params.sortBy) urlParams.set('sortBy', params.sortBy);
    if (params.sortOrder) urlParams.set('sortOrder', params.sortOrder);

    if (params.filters) {
      const { degree, minExperience } = params.filters;
      if (degree) urlParams.set('degree', degree);
      if (minExperience) urlParams.set('minExperience', minExperience.toString());
    }

    return `/api/advocates?${urlParams.toString()}`;
  }, []);

  // Search advocates with given parameters
  const searchAdvocates = useCallback(async (searchParams: AdvocateSearchParams) => {
    const url = buildSearchUrl(searchParams);
    return await execute(url);
  }, [execute, buildSearchUrl]);

  // Update URL and trigger search
  const updateSearch = useCallback((newParams: Partial<AdvocateSearchParams>) => {
    const currentParams = currentSearchParams;
    const updatedParams: AdvocateSearchParams = {
      ...currentParams,
      ...newParams,
      filters: {
        ...currentParams.filters,
        ...newParams.filters,
      },
    };

    // Build new URL
    const urlParams = new URLSearchParams();
    
    if (updatedParams.page) urlParams.set('page', updatedParams.page.toString());
    if (updatedParams.limit) urlParams.set('limit', updatedParams.limit.toString());
    if (updatedParams.query) urlParams.set('query', updatedParams.query);
    if (updatedParams.sortBy) urlParams.set('sortBy', updatedParams.sortBy);
    if (updatedParams.sortOrder) urlParams.set('sortOrder', updatedParams.sortOrder);

    if (updatedParams.filters) {
      const { degree, minExperience } = updatedParams.filters;
      if (degree) urlParams.set('degree', degree);
      if (minExperience) urlParams.set('minExperience', minExperience.toString());
    }

    // Update URL without page reload
    const newUrl = `/?${urlParams.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [currentSearchParams, router]);

  // Initialize with SSR data if provided
  useEffect(() => {
    if (options.initialData && !data) {
      // Set initial data without triggering a request
    }
  }, [options.initialData, data]);

  return {
    data: data || options.initialData || null,
    loading,
    error,
    searchParams: currentSearchParams,
    updateSearch,
    searchAdvocates,
  };
}
