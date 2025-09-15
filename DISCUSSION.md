# Discussion

## Architecture / Design Decisions

### Core Performance Improvements
- **Database Integration**: PostgreSQL with pagination and indexing for scalability
- **Pagination**: Traditional page-based navigation for reliable performance
- **Search & Filtering**: By name, specialty, and location for patient advocate discovery
- **API Optimization**: Debounced search requests and retry logic
- **TypeScript Enhancement**: Proper typing throughout for code safety

### Patient-Focused UX Improvements  
- **Mobile-responsive design** for healthcare patients primarily on mobile
- **Professional healthcare UI** with trust signals and clear advocate information
- **Accessibility improvements** for diverse patient populations
- **Loading states and error handling** for reliable patient experience

### Code Quality & Architecture
- **Custom data fetching hook** with caching for future scalability
- **Component memoization** to prevent unnecessary re-renders
- **Reusable UI components** for maintainable codebase

### Rendering & URL Strategy
- **Server-Side Rendering**: Initial page load with complete advocate data for SEO and performance
- **URL-based state management**: Search filters and pagination accessible via shareable URLs
- no Auth, not highly interactive, decent use case for SSR

## Bug Fixes
-  Initial bugs - added key to each table row and specialty, fixed html for table

## Future Improvements (Given More Time)

### Advanced Performance
- **Virtual scrolling** for massive advocate lists, though use by patients in a healthcare application could point to pagination being the better implementation for these users and the point of this list anyways.
- **Redis caching layer** for search result optimization  
- **CDN implementation** for global patient access

### Enhanced Patient Experience
- **Advanced filtering** by insurance, availability, patient ratings
- **Advocate detailed profiles** with reviews and credentials
- **Real-time availability** status updates
- **Booking/contact integration** for patient-advocate connection
