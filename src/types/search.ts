import { PaginationParams } from './pagination';

export interface BaseSearchParams {
  query?: string;
}

export interface SearchParams<T = Record<string, any>> extends BaseSearchParams {
  filters?: T;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchRequest<T = Record<string, any>> extends SearchParams<T>, PaginationParams {}

