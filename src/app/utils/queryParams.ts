/**
 * Utility functions for building and managing URL query parameters
 * Following DRY principle - single source of truth for query param logic
 */

/**
 * Build URLSearchParams from any object, filtering out undefined/null values
 */
export function buildQueryParams(params: Record<string, any>): URLSearchParams {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      urlParams.set(key, String(value));
    }
  });

  return urlParams;
}

/**
 * Build query params specifically for search filters
 * Handles nested filter objects and special cases
 */
export function buildSearchQueryParams(searchParams: {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortOrder?: string;
  filters?: Record<string, any>;
}): URLSearchParams {
  const urlParams = new URLSearchParams();

  // Add basic params
  if (searchParams.page) urlParams.set('page', searchParams.page.toString());
  if (searchParams.limit) urlParams.set('limit', searchParams.limit.toString());
  if (searchParams.query) urlParams.set('query', searchParams.query);
  if (searchParams.sortBy) urlParams.set('sortBy', searchParams.sortBy);
  if (searchParams.sortOrder) urlParams.set('sortOrder', searchParams.sortOrder);

  // Add filter params (flatten nested filters)
  if (searchParams.filters) {
    Object.entries(searchParams.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        urlParams.set(key, String(value));
      }
    });
  }

  return urlParams;
}

/**
 * Build a URL with query parameters
 */
export function buildUrlWithParams(baseUrl: string, params: URLSearchParams): string {
  const paramString = params.toString();
  return paramString ? `${baseUrl}?${paramString}` : baseUrl;
}
