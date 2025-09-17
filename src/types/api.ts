import { PaginatedResult } from './pagination';
import { SearchRequest } from './search';
import { AdvocateFilters, Advocate } from './advocate';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export type AdvocateSearchParams = SearchRequest<AdvocateFilters>;
export type AdvocateResponse = ApiResponse<PaginatedResult<Advocate>>;
export type AdvocateDetailResponse = ApiResponse<Advocate>;