-- Add indexes for search and filtering performance
CREATE INDEX IF NOT EXISTS idx_advocates_first_name ON advocates (first_name);
CREATE INDEX IF NOT EXISTS idx_advocates_last_name ON advocates (last_name);
CREATE INDEX IF NOT EXISTS idx_advocates_city ON advocates (city);
CREATE INDEX IF NOT EXISTS idx_advocates_degree ON advocates (degree);
CREATE INDEX IF NOT EXISTS idx_advocates_years_experience ON advocates (years_of_experience);

-- Add GIN index for full-text search on specialties (JSONB)
CREATE INDEX IF NOT EXISTS idx_advocates_specialties_gin ON advocates USING GIN (payload);

-- Add composite index for common search patterns
CREATE INDEX IF NOT EXISTS idx_advocates_name_city ON advocates (first_name, last_name, city);

-- Add index for fuzzy search using trigrams (requires pg_trgm extension)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_advocates_first_name_trgm ON advocates USING GIN (first_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_advocates_last_name_trgm ON advocates USING GIN (last_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_advocates_city_trgm ON advocates USING GIN (city gin_trgm_ops);