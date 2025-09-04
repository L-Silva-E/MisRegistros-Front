# Changelog

All notable changes to the `MisRegistros-Front` project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
