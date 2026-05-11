# Changelog

All notable changes to the `MisRegistros-Front` project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-05-09

### Added

- **User authentication system**: Full JWT-based authentication flow
  - Login page with email/password form and post-login redirect to the original route
  - Registration page with username, email and password with frontend validation (length constraints)
  - `AuthContext` and `useAuth` hook for global auth state management
  - Session persistence across page reloads via `localStorage`
  - Public routes: `/login`, `/register`, `/forgot-password`, `/reset-password`
- **Password recovery flow**: Complete forgot/reset password cycle
  - Forgot password page calls `POST /v1/user/forgot-password` and transitions to a generic confirmation state (prevents user enumeration)
  - Reset password page reads token from `?token=` query param, validates password match client-side, and handles expired and invalid token error states with a link to re-request
- **Protected routes**: `PrivateRoute` component redirects unauthenticated users to `/login` preserving the intended destination for post-login redirect
- **User menu in Header**: Dynamic avatar replacing the hardcoded placeholder
  - Displays user initials derived from the authenticated context
  - "Mi perfil" option opens a modal fetching fresh data from `GET /v1/user/me` (username, role badge, email, last login, member since date)
  - "Cerrar sesión" option clears the session and redirects to `/login`
- **Recipe RBAC**: Role-based access control on recipe actions
  - Edit, delete and lock controls hidden for recipes not owned by the current user (visible to owner and ADMIN only)
  - "Mis recetas" filter in the recipe list using `GET /v1/recipe?idUser=me`, consistent with the existing filter button visual style

### Changed

- `useAxios`: Now automatically injects `Authorization: Bearer <token>` header on all requests when a session is active, using the token stored in `localStorage`
- Recipe `Modal`: Edit, delete and lock actions are now conditionally rendered — copy remains available to all authenticated users; edit, delete and lock are restricted to the recipe owner or ADMIN
- `SearchFilters`: Added "Mis recetas" icon button following the existing sort-direction button visual style (background, border and icon color react to active state)
- `Recipe` type: Added `idUser: number` field to support client-side ownership checks

## [2.1.1] - 2025-09-28

### Changed

- **BREAKING**: Updated Vite from 5.3.1 to 6.3.6 (major version upgrade for security)
- Updated esbuild from 0.21.5 to 0.25.10 (security patch)
- Updated axios from 1.8.4 to 1.12.2 (security patch)
- Updated rollup from 4.18.0 to 4.52.3 (security patch)
- Updated multiple indirect dependencies to secure versions

### Fixed

- **Critical security update**: Fixed 11 vulnerabilities in project dependencies
  - **CRITICAL**: form-data unsafe random function vulnerability (GHSA-fjxv-7rqg-78g4)
  - **HIGH**: axios DoS vulnerability through data size check bypass (1.8.4 to 1.12.2) (GHSA-4hjh-wcwx-xvwj)
  - **HIGH**: cross-spawn Regular Expression Denial of Service (GHSA-3xgq-45jj-v275)
  - **HIGH**: rollup DOM Clobbering leading to XSS vulnerability (4.18.0 to 4.52.3) (GHSA-gcx4-mw62-g8wm)
  - **MODERATE**: esbuild development server vulnerability (GHSA-67mh-4wv8-2f99)
  - **MODERATE**: vite dependency on vulnerable esbuild versions
  - **MODERATE**: babel helpers RegExp complexity issues (GHSA-968p-4wvh-cqc8)
  - **MODERATE**: micromatch ReDoS vulnerability (GHSA-952p-6rrq-rcjv)
  - **MODERATE**: nanoid predictable generation vulnerability (GHSA-mwcw-c2x4-8c55)
  - **LOW**: brace-expansion ReDoS vulnerability (GHSA-v6h2-p8h4-qcjw)
- Resolved 8 out of 11 security vulnerabilities through `npm audit fix`
- Improved overall application security posture

- Resolved all remaining security vulnerabilities through `npm audit fix --force`
- Maintained full compatibility with existing React + TypeScript + Chakra UI stack
- Build performance and development server functionality preserved

## [2.1.0] - 2025-09-21

### Added

- **Usage counters display**: Visualization of metadata usage statistics
  - Total count of items in section headers (ingredients, categories, origins)
  - Individual usage count of how many times each specific item is used in recipes, displayed next to the name
- **Enhanced error messaging system**: Comprehensive error handling with user-friendly messages
  - Specific error messages for backend validation failures (e.g., invalid ingredient units)
  - Clear messaging for foreign key constraint violations when deleting referenced items
  - Contextual error titles based on operation type (creation, update, deletion)
- **Unified metadata endpoint**: Integration with `/metadata/usage-count` for optimized data fetching
- **Custom hook architecture**: `useMetadataOperations` hook for better code organization
- **Centralized message constants**: `MESSAGES` object for consistent UI text management

### Fixed

- **Duplicate error messages**: Resolved issue where both error and success toasts appeared simultaneously
- **Message timing conflicts**: Eliminated race conditions in toast notifications
- **Form validation feedback**: Improved error display for invalid ingredient units and empty name fields
- **Foreign key constraint handling**: Better user messaging when attempting to delete items with dependencies

## [2.0.1] - 2025-09-03

### Changed

- Relaxed form validation constraints for better user experience:
  - Step descriptions are now optional
  - Removed 10 character minimum requirement from `description` and `steps` fields

### Fixed

- Fixed URL regex validation that was rejecting valid placeholder URLs and URLs with special characters

## [2.0.0] - 2025-08-24

### Added

- Feature-based architecture structure with organized folders (`/features`, `/shared`)
- React Router DOM integration for improved navigation
- Centralized theme system with custom component variants
- Reusable UI component library:
  - `RecipeImage` component with fallback handling and loading states
  - `RecipeTags` component for consistent metadata display
  - `RecipeTables` component for ingredients and steps
  - `RecipeForm` modular form system
- Toast notification provider for global state management
- Custom hooks for recipe filtering and form management
- TypeScript types organization by features
- Route configuration system with nested routing
- Root layout component for consistent page structure

### Changed

- **BREAKING**: Complete project restructure from flat to feature-based architecture
- **BREAKING**: Migrated from manual Grid layout to React Router DOM
- **BREAKING**: App.tsx simplified from ~117 lines to ~21 lines
- Improved ingredient form UX with simplified validation and better precision (0.1 vs 0.01)
- Enhanced image handling with smart loading and error states
- Optimized component performance with better props handling
- Updated button styling with new theme variants (`addRowButton`)
- Improved form validation and user feedback

### Removed

- Legacy `RecipeModalCreate` component (replaced by dedicated pages)
- Redundant tooltip validations in ingredient forms
- Commented-out code and unused imports
- Manual grid layout system in App.tsx

### Fixed

- Improved error handling in image components
- Better form state management and validation
- Consistent theme application across components
- Reduced prop drilling through better component organization

## [1.0.1] - 2025-06-28

### Changed

- Modified recipe creation to conditionally include thumbnail field only when it contains a non-empty value

## [1.0.0] - 2025-05-26

### Added

- Initial release of `MisRegistros-Front` with React + TypeScript + Vite
- Recipe metadata management system
- Category management functionality
- Origin management functionality
- Ingredient management functionality
- CRUD operations for recipe metadata
- Custom useAxios hook for API calls
- Error handling for API operations
- Recipe metadata page with data tables
- Unit management for ingredients (kg, g, l, ml, unidad, cucharada, cucharadita, taza)
- Toast notifications for user feedback
- Modal dialogs for editing metadata items
- Responsive UI components using Chakra UI
- ESLint configuration for code quality
- Hot Module Replacement (HMR) for development
- Loading states management

### Changed

- Nothing changed in this initial version.

### Fixed

- No bug fixes in this initial version.
