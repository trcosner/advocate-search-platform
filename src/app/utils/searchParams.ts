import { AdvocateSearchParams } from '../../types';

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

export function createDefaultSearchParams(): AdvocateSearchParams {
  return {
    page: 1,
    limit: 10,
    filters: {},
  };
}
