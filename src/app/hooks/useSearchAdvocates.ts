import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from './useRequest';
import { AdvocateSearchParams, PaginatedResult, Advocate } from '../../types/api';
import { buildSearchQueryParams, buildUrlWithParams } from '../utils/queryParams';
import { navigateWithSearchParams } from '../utils/navigation';
import { mergeSearchParams } from '../utils/searchParams';

export interface UseSearchAdvocatesOptions {
  searchParams: AdvocateSearchParams;
  endpoint?: string; // Allow different endpoints - Open/Closed Principle
}

export function useSearchAdvocates(options: UseSearchAdvocatesOptions) {
  const router = useRouter();
  
  // Use component-provided search params, no URL parsing
  const [currentSearchParams, setCurrentSearchParams] = useState<AdvocateSearchParams>(options.searchParams);

  const { data, loading, error, execute } = useRequest<PaginatedResult<Advocate>>({
    onSuccess: (data) => {
      console.log('Advocates fetched:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch advocates:', error);
    },
  });

  // Search advocates with given parameters
  const searchAdvocates = useCallback(async (searchParams: AdvocateSearchParams) => {
    const endpoint = options.endpoint || '/api/advocates';
    const queryParams = buildSearchQueryParams(searchParams);
    const url = buildUrlWithParams(endpoint, queryParams);
    return await execute(url);
  }, [execute, options.endpoint]);

  // Update search params and URL - now follows Single Responsibility
  const updateSearch = useCallback((newParams: Partial<AdvocateSearchParams>) => {
    // Use utility for merging parameters
    const updatedParams = mergeSearchParams(currentSearchParams, newParams);

    // Update internal state
    setCurrentSearchParams(updatedParams);

    // Navigate to new URL using utility function
    navigateWithSearchParams(router, updatedParams);
    
    // Trigger search with new params
    searchAdvocates(updatedParams);
  }, [currentSearchParams, router, searchAdvocates]);

  // Always fetch data on mount and when search params change
  useEffect(() => {
    searchAdvocates(currentSearchParams);
  }, []); // Only run once on mount with initial search params

  return {
    data: data || null,
    loading,
    error,
    searchParams: currentSearchParams,
    updateSearch,
    searchAdvocates,
  };
}
