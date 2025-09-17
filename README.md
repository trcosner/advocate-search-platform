## Solace Candidate Assignment - Patient Advocate Search Platform

This is a [Next.js](https://nextjs.org/) project that transforms a static prototype into a fully-functional, patient-focused advocate search platform with advanced search capabilities, database integration, and mobile-responsive design.

## ✨ Implementation Highlights

This implementation focuses on creating a healthcare application optimized for **patient experience** with enterprise-grade performance:

### 🎯 **Core Features**
- **🔍 Advanced Search & Filtering** - Search by name, specialty, location with experience and degree filters with pagination
- **📱 Mobile-First Design** - Responsive UI optimized for healthcare patients primarily on mobile devices with split card/table design 
- **🗄️ Database Integration** - PostgreSQL with proper indexing, pagination, and scalability considerations
- **♿ Accessibility Focused** - Professional healthcare UI designed for diverse patient populations
- **🔄 Error Handling** - error boundaries and loading states for reliable patient experience

### 🏗️ **Architecture Decisions**
- **TypeScript Enhancement** - Proper typing throughout for code safety and maintainability
- **Custom Data Fetching Hook** - Scalable patterns for future API expansion
- **Component Memoization** - Optimized re-renders for smooth user experience  
- **Reusable UI Components** - Maintainable codebase with consistent design system
- **URL State Management** - Search filters and pagination accessible via shareable URLs

**📋 See [DISCUSSION.md](./DISCUSSION.md) for detailed technical decisions, implementation rationale, and future improvements.**

## 🎥 Live Demo

![Application Demo](./screenshots/demo.mov)
*Interactive demo showing search, filtering, responsive design, and patient-focused UX*

## 📸 Application Screenshots

### Desktop Performance (Lighthouse 100% Scores)
![Desktop Search Interface](./screenshots/lighthouse.png)
*Perfect Lighthouse scores - Performance, Accessibility, Best Practices, SEO*

### Mobile Responsive Design
![Mobile Interface](./screenshots/mobile.png)
*Mobile-optimized interface for healthcare patients on-the-go*

### Advanced Search & Filtering
![Search Results](./screenshots/responsive-search.png)
*Real-time search with specialty, location, experience, and degree filtering*

### Error Handling & User Experience
![Error Boundary](./screenshots/error-boundary.png)
*Comprehensive error boundaries with user-friendly messaging*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker (for database functionality)

### Installation

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

> **Note:** The app works immediately with static data. Follow the database setup below for full functionality with PostgreSQL.

## 🗄️ Database Setup (Optional)

The application includes PostgreSQL integration with proper indexing for production-scale search performance.

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