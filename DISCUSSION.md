# Discussion

## Architecture / Design Decisions

### Core Performance Improvements
- **Database Integration**: PostgreSQL with pagination and indexing for scalability and search
- **Pagination**: Traditional page-based navigation for reliable performance
- **Search & Filtering**: By name, specialty, and location for patient advocate discovery, filter by experience and degree


### Patient-Focused UX Improvements  
- **Mobile-responsive design** for healthcare patients primarily on mobile
- **Professional healthcare UI** with trust signals and clear advocate information
- **Accessibility improvements** for diverse patient populations
- **Loading states and error handling** for reliable patient experience

### Code Quality & Architecture
- **Custom data fetching hook** for future scalability
- **Component memoization** to prevent unnecessary re-renders
- **Reusable UI components** for maintainable codebase
- **TypeScript Enhancement**: Proper typing throughout for code safety

### Rendering & URL Strategy
- **Server-Side Rendering**: Initial page load with complete advocate data for SEO and performance, storing search params in url makes this valuable
- **URL-based state management**: Search filters and pagination accessible via shareable URLs
- no Auth, not highly interactive

## Bug Fixes
-  Initial bugs - added key to each table row and specialty, fixed html for table

## Future Improvements (Given More Time)

### Advanced Performance

- **Caching** for search result optimization I would cache backend with something like Redis or another in memory db, and I would add client side cache.
- **CDN implementation** for global patient access
- **DB Schema Changes** with more time I would create a specialties table and a advocate_specialties table. Also bigint for phoneNumber is ok since data provided was normalized to 5559872345 format, if we wanted to preserve special characters like 1-555-555-5555, we might want to change this to text
- **Virtual scrolling** for massive advocate lists, though use by patients in a healthcare application could point to pagination being the better implementation for these users and the point of this list anyways.

### Enhanced Patient Experience
- **Advanced filtering** by insurance, availability, patient ratings
- **Advocate detailed profiles** with reviews and credentials
- **Real-time availability** status updates
- **Booking/contact integration** for patient-advocate connection
- **Autosearch** as you type with debounce
- **Improved Loading Experience** with component loading skeletons

### Code Quality
- **Design System** individual elements like inputs, dropdowns, and buttons would all have reusable DRY components in a more robust design system
- **Backend Build-out** create a more robust backend with something like node and express and use middleware for error handling in the backend 




