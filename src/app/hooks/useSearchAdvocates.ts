import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from './useRequest';
import { AdvocateSearchParams, PaginatedResult, Advocate } from '../../types';
import { buildSearchQueryParams, buildUrlWithParams } from '../utils/queryParams';
import { navigateWithSearchParams } from '../utils/navigation';
import { mergeSearchParams } from '../utils/searchParams';

export interface UseSearchAdvocatesOptions {
  searchParams: AdvocateSearchParams;
  endpoint?: string;
}

export function useSearchAdvocates(options: UseSearchAdvocatesOptions) {
  const router = useRouter();
  
  const [currentSearchParams, setCurrentSearchParams] = useState<AdvocateSearchParams>(options.searchParams);

  const { data, loading, error, execute } = useRequest<PaginatedResult<Advocate>>({
    onSuccess: (data) => {
      console.log('Advocates fetched:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch advocates:', error);
    },
  });

  const searchAdvocates = useCallback(async (searchParams: AdvocateSearchParams) => {
    const endpoint = options.endpoint || '/api/advocates';
    const queryParams = buildSearchQueryParams(searchParams);
    const url = buildUrlWithParams(endpoint, queryParams);
    return await execute(url);
  }, [execute, options.endpoint]);

  const updateSearch = useCallback((newParams: Partial<AdvocateSearchParams>) => {
    setCurrentSearchParams(currentParams => {
      const updatedParams = mergeSearchParams(currentParams, newParams);
      
      // Schedule navigation and search for next microtask to avoid render-time updates
      queueMicrotask(() => {
        navigateWithSearchParams(router, updatedParams);
        searchAdvocates(updatedParams);
      });
      
      return updatedParams;
    });
  }, [router, searchAdvocates]);

  useEffect(() => {
    searchAdvocates(currentSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return {
    data: data || null,
    loading,
    error,
    searchParams: currentSearchParams,
    updateSearch,
    searchAdvocates,
  };
}
