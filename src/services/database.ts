import { SQL, count, desc, asc } from "drizzle-orm";
import type { PgTable, PgColumn } from "drizzle-orm/pg-core";
import db from "../db";
import { SearchRequest } from "../types";
import { PaginatedResult } from "../types";

type TableWithColumns = PgTable & {
  [key: string]: PgColumn<any, any, any>;
};

export interface DatabaseConfig<T> {
  table: TableWithColumns;
  defaultSortColumn?: keyof T;
  defaultLimit?: number;
  maxLimit?: number;
}

export abstract class DatabaseService<T, TFilters = Record<string, any>> {
  protected config: DatabaseConfig<T>;

  constructor(config: DatabaseConfig<T>) {
    this.config = {
      defaultLimit: 10,
      maxLimit: 100,
      ...config,
    };
  }

  protected abstract buildWhereConditions(searchParams: SearchRequest<TFilters>): SQL | undefined;

  protected buildOrderBy(searchParams: SearchRequest<TFilters>): SQL[] {
    const { sortBy, sortOrder = 'desc' } = searchParams;
    const orderFn = sortOrder === 'asc' ? asc : desc;
    
    if (sortBy && this.config.table[sortBy]) {
      return [orderFn(this.config.table[sortBy])];
    }
    
    if (this.config.defaultSortColumn && this.config.table[this.config.defaultSortColumn as string]) {
      return [orderFn(this.config.table[this.config.defaultSortColumn as string])];
    }
    
    return [];
  }

  async search(searchParams: SearchRequest<TFilters> = {}): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      limit = this.config.defaultLimit!,
    } = searchParams;

    const safeLimit = Math.min(Math.max(1, limit), this.config.maxLimit!);
    const offset = (Math.max(1, page) - 1) * safeLimit;

    const whereClause = this.buildWhereConditions(searchParams);
    const orderBy = this.buildOrderBy(searchParams);

    const countQuery = db.select({ count: count() }).from(this.config.table);
    const [totalResult] = whereClause 
      ? await countQuery.where(whereClause)
      : await countQuery;

    const total = Number(totalResult.count);
    const totalPages = Math.ceil(total / safeLimit);

    const baseQuery = db.select().from(this.config.table);
    
    const queryWithWhere = whereClause ? baseQuery.where(whereClause) : baseQuery;
    
    const queryWithOrder = orderBy.length > 0 
      ? queryWithWhere.orderBy(...orderBy)
      : queryWithWhere;
    
    const data = await queryWithOrder
      .limit(safeLimit)
      .offset(offset);

    return {
      data: data as T[],
      pagination: {
        page,
        limit: safeLimit,
        offset,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}