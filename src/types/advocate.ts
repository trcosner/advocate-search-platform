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
  degree?: DegreeType;
  minExperience?: number;
}
