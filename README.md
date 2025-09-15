## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database Setup

The app works immediately with static data. For database functionality:

### Quick Setup
```bash
# 1. Start PostgreSQL (creates 'solaceassignment' database automatically)
docker compose up -d

# 2. Install dependencies
`npm install`

# 3. Uncomment DATABASE_URL in .env file
# DATABASE_URL=postgresql://postgres:password@localhost:5432/solaceassignment

# 4. Push schema to database
npx drizzle-kit push

# 5. Seed the database
npm run dev  # Start the app first
curl -X POST http://localhost:3000/api/seed

# 6. Update API to use database
# In src/app/api/advocates/route.ts, uncomment the database line:
# const data = await db.select().from(advocates);
```

### Verification
```bash
# Check database is running
docker ps

# View database contents
npx drizzle-kit studio
```
