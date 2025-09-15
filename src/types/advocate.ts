import { ApiResponse } from "./api";
import { PaginatedResult } from "./pagination";
import { SearchRequest } from "./search";

export enum DegreeType {
  MD = 'MD',
  PHD = 'PhD',
  MSW = 'MSW'
}

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
}

export interface AdvocateFilters {
  // Good for filters (limited, predictable values)
  degree?: DegreeType;
  minExperience?: number;
  // Removed: city (moved to general search)
  // Removed: maxExperience (simplified to minExperience only)
  // Removed: specialties (moved to general search)
}

export interface AdvocateSearchParams extends SearchRequest<AdvocateFilters> {}

export type AdvocateResponse = ApiResponse<PaginatedResult<Advocate>>;
