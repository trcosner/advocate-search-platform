export function buildSearchQueryParams(searchParams: {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortOrder?: string;
  filters?: Record<string, any>;
}): URLSearchParams {
  const urlParams = new URLSearchParams();

  if (searchParams.page) urlParams.set('page', searchParams.page.toString());
  if (searchParams.limit) urlParams.set('limit', searchParams.limit.toString());
  if (searchParams.query) urlParams.set('query', searchParams.query);
  if (searchParams.sortBy) urlParams.set('sortBy', searchParams.sortBy);
  if (searchParams.sortOrder) urlParams.set('sortOrder', searchParams.sortOrder);

  if (searchParams.filters) {
    Object.entries(searchParams.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        urlParams.set(key, String(value));
      }
    });
  }

  return urlParams;
}

export function buildUrlWithParams(baseUrl: string, params: URLSearchParams): string {
  const paramString = params.toString();
  return paramString ? `${baseUrl}?${paramString}` : baseUrl;
}
