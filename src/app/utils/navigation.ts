import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { buildSearchQueryParams } from './queryParams';


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
