# Changelog

All notable changes to the CivicChain project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-07-15

### Added
- API utility module (`src/utils/api.js`) for centralized API calls
- Complete authentication endpoints in Vercel serverless function (`/api/index.js`)
  - User registration with profile data
  - User login with JWT authentication
  - Aadhaar verification endpoint
- Vercel configuration improvements with API rewrites and security headers
- Conditional Speed Insights rendering to prevent content blocker errors

### Changed
- **Frontend API Calls**: Replaced hardcoded localhost URLs with relative URLs for Vercel compatibility
- **Authentication Flow**: Updated citizen authentication and Aadhaar verification to use new API utility
- **Deployment Architecture**: Migrated from localhost backend dependency to Vercel serverless functions
- **Development Workflow**: Simplified to require only `npm run dev` - no separate backend server needed
- **User Schema**: Updated backend schema to match frontend profile structure with complete user data

### Fixed
- **Production Deployment**: Resolved Vercel deployment errors caused by localhost API calls
- **Speed Insights**: Fixed content blocker errors in production
- **API Connectivity**: Eliminated "Failed to fetch" errors in deployed environment
- **CORS Issues**: Proper handling of cross-origin requests in serverless environment
- **Profile Data Storage**: Fixed schema mismatch preventing profile information from being saved
- **Profile Display**: Corrected field mapping for phone number and other profile fields
- **Data Persistence**: Ensured complete user profile data is properly stored and retrieved
- **Aadhaar Verification Persistence**: Fixed verification status not persisting across login/logout sessions

### Security
- Enhanced API error handling with proper status codes
- Added security headers in Vercel configuration
- JWT-based authentication with secure token handling

## [1.1.1] - 2025-07-14

### Fixed
- Backend now loads environment variables from the root `.env` file if present, improving deployment flexibility.
- Fixed OpenAI API key environment variable usage for frontend AI analysis (`VITE_OPENAI_API_KEY`).
- Resolved issue where AI analysis for grievance filing would always use fallback method due to missing or misconfigured API key.

### Changed
- Updated backend `server.js` to support loading `.env` from both backend and root directories.
- Clarified environment variable usage for OpenAI integration in documentation and code comments.

## [1.1.0] - 2025-07-14

### Added
- Comprehensive state-wise data generation for all 36 Indian states and union territories
- Enhanced database migration and standardization scripts
- MongoDB MCP integration for database management operations
- Automated data population with realistic Indian demographics
- Complete geographic coverage of India's administrative divisions

### Changed
- **Database Migration**: Renamed database from `CivicChane_DB` to `CivicChain_OG` for better naming consistency
- **Data Structure**: Standardized state names across all collections to match official Indian geography
- **Geographic Accuracy**: Ensured correct representation of 28 states + 8 union territories of India
- **API Configuration**: Updated all database references to use unified `CivicChain_OG` database

### Database Operations
- Successfully migrated 333 grievances and 187 users to `CivicChain_OG` database
- Cleaned up duplicate and inconsistent state naming (reduced from 49 to 36 correct entries)
- Removed "Unknown" state entries from all collections
- Dropped legacy databases (`CivicChane_DB`, `test`) after successful migration
- Maintained data integrity throughout the migration process

### Technical Improvements
- Enhanced data generation scripts with comprehensive Indian state coverage
- Improved database standardization with automated state name mapping
- Better error handling in migration scripts
- Comprehensive logging for all database operations

### Fixed
- Geographic data accuracy issues (corrected state count from 49 to 36)
- Database naming inconsistencies (fixed typo in database name)
- Duplicate state entries in various collections
- Legacy database cleanup and optimization

### Removed
- Old `CivicChane_DB` database (migrated data to `CivicChain_OG`)
- Legacy `test` database with outdated schemas
- Inconsistent state naming entries
- Unknown/null state entries from all collections

## [1.0.0] - 2025-07-13

### Added
- Complete email/password authentication system with JWT tokens
- Mandatory Aadhaar Zero-Knowledge Proof (ZKP) verification for all users
- User registration with comprehensive profile collection
- MongoDB integration with user and grievance schemas
- Unified navigation system across all pages
- National public leaderboard for grievance transparency
- State-specific performance dashboards
- Comprehensive admin dashboard with analytics
- Citizen dashboard for grievance filing and tracking
- Zero-knowledge proof authentication using Anon Aadhaar v2.4.3
- Real-time grievance status tracking
- Department performance metrics and analytics
- Mobile-responsive design with TailwindCSS
- Form validation and error handling
- Background processes for data aggregation

### Security
- JWT-based authentication with 7-day token expiry
- Password hashing using bcryptjs with salt rounds
- Zero-knowledge proof verification preventing spam accounts
- Nullifier-based duplicate prevention for Aadhaar verification
- Secure API endpoints with authentication middleware
- Input validation and sanitization

### Technical Stack
- **Frontend**: React 18.2.0, Vite 5.0.0, TailwindCSS, React Router DOM
- **Backend**: Express.js, MongoDB, JWT, bcryptjs
- **ZKP**: Anon Aadhaar packages for privacy-preserving verification
- **Database**: MongoDB with comprehensive schemas for users and grievances
- **Development**: Hot reload, environment configuration, CORS setup

### Removed
- MetaMask wallet authentication (completely removed)
- All wallet-related functionality and dependencies
- Rocket AI platform references (cleaned up from codebase)
- Duplicate navigation components
- Legacy authentication flows

### Fixed
- Dropdown selection issues in registration forms
- Duplicate navbar display across pages
- MongoDB duplicate key errors on walletAddress field
- Form validation for required profile fields
- Navigation consistency across all routes
- Database index conflicts and cleanup

### Changed
- Aadhaar ZKP verification changed from optional to mandatory
- User schema updated to require ZKP nullifier for all users
- Grievance schema simplified to use only ZKP identification
- Authentication flow streamlined for email/password + ZKP
- UI messaging updated to reflect mandatory verification requirements

## Development Notes

### Database Schema Changes
- Removed all `walletAddress` fields and indexes
- Updated user schema to make `aadhaarZKP.nullifier` required
- Cleaned up legacy indexes causing duplicate key errors
- Simplified grievance identification to use ZKP nullifiers only

### Authentication Flow
1. User registers with email/password and profile information
2. System generates JWT token for basic access
3. User must complete Aadhaar ZKP verification to access full platform
4. ZKP nullifier prevents duplicate accounts and spam

### Verification Requirements
- All users must verify their Aadhaar using Zero-Knowledge Proof
- Verification includes age proof (18+), gender, state, and pincode
- Privacy-preserving: actual Aadhaar details never stored
- Spam prevention through cryptographic nullifiers

## Future Enhancements
- Email verification system
- Phone number verification via OTP
- Advanced analytics and reporting
- Multi-language support
- Mobile application
- Integration with government databases
- Advanced grievance categorization
- AI-powered grievance routing
