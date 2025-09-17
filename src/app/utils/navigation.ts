/**
 * URL navigation utilities
 * Separates navigation concerns from business logic
 */

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { buildSearchQueryParams } from './queryParams';

/**
 * Navigate to a new URL with search parameters
 */
export function navigateWithSearchParams(
  router: AppRouterInstance,
  searchParams: {
    page?: number;
    limit?: number;
    query?: string;
    sortBy?: string;
    sortOrder?: string;
    filters?: Record<string, any>;
  },
  options: { scroll?: boolean } = { scroll: false }
) {
  const urlParams = buildSearchQueryParams(searchParams);
  const newUrl = urlParams.toString() ? `/?${urlParams.toString()}` : '/';
  router.push(newUrl, options);
}

/**
 * Update current URL without navigation (for state sync)
 */
export function updateUrlParams(
  router: AppRouterInstance,
  searchParams: Record<string, any>
) {
  navigateWithSearchParams(router, searchParams, { scroll: false });
}
