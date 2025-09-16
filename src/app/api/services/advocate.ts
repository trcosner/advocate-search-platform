import { and, or, ilike, gte, lte, sql, asc, desc, eq } from "drizzle-orm";
import { DatabaseService } from "./database";
import { advocates } from "../../../db/schema";
import { SearchRequest } from "../../../types/search";
import { Advocate, AdvocateFilters } from "../../../types/advocate";

export class AdvocateService extends DatabaseService<Advocate, AdvocateFilters> {
  constructor() {
    super({
      table: advocates as any, // Type cast to work around Drizzle generic typing
      defaultSortColumn: 'createdAt',
      defaultLimit: 10,
      maxLimit: 100,
    });
  }

  protected buildWhereConditions(searchParams: SearchRequest<AdvocateFilters>) {
    const { query, filters = {} } = searchParams;
    const {
      degree,
      minExperience,
    } = filters;

    const conditions = [];

    // General text search across multiple fields
    if (query) {
      const searchQuery = `%${query}%`;
      
      conditions.push(
        or(
          ilike(advocates.firstName, searchQuery),
          ilike(advocates.lastName, searchQuery),
          ilike(advocates.city, searchQuery),
          ilike(advocates.degree, searchQuery),
          // Search within specialties with length-based strictness
          ...(query.length >= 4 ? [
            // For longer queries, use normal substring search
            sql`(
              CASE 
                WHEN jsonb_typeof(${advocates.specialties}) = 'array' THEN
                  EXISTS (
                    SELECT 1 FROM jsonb_array_elements_text(${advocates.specialties}) AS specialty 
                    WHERE specialty ILIKE ${searchQuery}
                  )
                ELSE
                  ${advocates.specialties}::text ILIKE ${searchQuery}
              END
            )`
          ] : [
            // For short queries, only match at word boundaries (space + query or start + query)
            sql`(
              CASE 
                WHEN jsonb_typeof(${advocates.specialties}) = 'array' THEN
                  EXISTS (
                    SELECT 1 FROM jsonb_array_elements_text(${advocates.specialties}) AS specialty 
                    WHERE specialty ILIKE ${`% ${query}%`} OR specialty ILIKE ${`${query}%`}
                  )
                ELSE
                  ${advocates.specialties}::text ILIKE ${`% ${query}%`} OR ${advocates.specialties}::text ILIKE ${`${query}%`}
              END
            )`
          ]),
          // Stricter fuzzy search using similarity (requires pg_trgm extension)
          // Only match if similarity is high enough and query is long enough
          sql`(
            length(${query}) >= 4 AND (
              similarity(${advocates.firstName}, ${query}) > 0.6 OR
              similarity(${advocates.lastName}, ${query}) > 0.6 OR
              similarity(${advocates.city}, ${query}) > 0.5
            )
          )`
        )
      );
    }

    // Specific filters (limited, predictable values)
    if (degree) {
      conditions.push(eq(advocates.degree, degree)); // Exact match for dropdown values
    }

    if (minExperience !== undefined) {
      conditions.push(gte(advocates.yearsOfExperience, minExperience));
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }

  protected buildOrderBy(searchParams: SearchRequest<AdvocateFilters>) {
    const { sortBy, sortOrder = 'desc' } = searchParams;
    const orderFn = sortOrder === 'asc' ? asc : desc;
    
    const orderByClauses = [];
    
    // Check if sortBy is provided and is a valid column
    if (sortBy) {
      if (sortBy === 'firstName') {
        orderByClauses.push(orderFn(advocates.firstName));
      } else if (sortBy === 'lastName') {
        orderByClauses.push(orderFn(advocates.lastName));
      } else if (sortBy === 'city') {
        orderByClauses.push(orderFn(advocates.city));
      } else if (sortBy === 'degree') {
        orderByClauses.push(orderFn(advocates.degree));
      } else if (sortBy === 'yearsOfExperience') {
        orderByClauses.push(orderFn(advocates.yearsOfExperience));
      } else if (sortBy === 'createdAt') {
        orderByClauses.push(orderFn(advocates.createdAt));
      }
    } else {
      // Default sort by createdAt (newest first)
      orderByClauses.push(desc(advocates.createdAt));
    }
    
    // Always add secondary sort by name for consistency
    orderByClauses.push(asc(advocates.lastName), asc(advocates.firstName));
    
    return orderByClauses;
  }
}

// Export singleton instance
export const advocateService = new AdvocateService();
