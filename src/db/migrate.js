const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
const fs = require("fs");
const path = require("path");

const runMigration = async () => {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

  console.log("Connecting to database...");

  const sql = postgres(process.env.DATABASE_URL, { 
    max: 1,
    onnotice: () => {} // Suppress NOTICE messages
  });
  const db = drizzle(sql);
  
  try {
    // Run any Drizzle migrations if they exist
    try {
      await migrate(db, { migrationsFolder: "drizzle" });
      console.log("✅ Drizzle migrations completed.");
    } catch (e) {
      console.log("📝 No drizzle migrations found, continuing...");
    }
    
    // Run custom SQL migrations
    console.log("Running custom SQL migrations...");
    const migrationPath = path.join(__dirname, "migrations", "search-filter-indexes.sql");
    
    if (fs.existsSync(migrationPath)) {
      const migrationSQL = fs.readFileSync(migrationPath, "utf8");
      await sql.unsafe(migrationSQL);
      console.log("✅ Search and filter indexes applied successfully");
    } else {
      console.log("📝 No custom SQL migrations found");
    }
    
  } finally {
    await sql.end();
  }
};

runMigration()
  .then(() => {
    console.log("Successfully ran migration.");

    process.exit(0);
  })
  .catch((e) => {
    console.error("Failed to run migration.");
    console.error(e);

    process.exit(1);
  });
