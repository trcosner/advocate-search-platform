/**
 * Search parameter utilities
 * Handles merging and updating search parameters following immutability principles
 */

import { AdvocateSearchParams } from '../../types/api';

/**
 * Merges partial search parameters with existing ones
 * Ensures filters are properly merged and page resets for new searches
 */
export function mergeSearchParams(
  current: AdvocateSearchParams,
  updates: Partial<AdvocateSearchParams>
): AdvocateSearchParams {
  return {
    ...current,
    ...updates,
    // Reset to page 1 when search params change (except when explicitly setting page)
    page: updates.page ?? 1,
    filters: {
      ...current.filters,
      ...updates.filters,
    },
  };
}

/**
 * Creates default search parameters
 */
export function createDefaultSearchParams(): AdvocateSearchParams {
  return {
    page: 1,
    limit: 10,
    filters: {},
  };
}
