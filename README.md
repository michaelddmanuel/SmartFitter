# SmartFitter Prospect & Member Portal

A comprehensive member management portal for SmartFitter, built with React, Vite, Auth0 authentication, Radix UI, and Tailwind CSS. The application integrates with Google Calendar for scheduling and Supabase PostgreSQL for database management.

## Features

- **User Journey Management**: Complete user flow from prospect to active member
- **Authentication**: Secure login with Auth0
- **Document Management**: NDA and membership contract signing
- **Session Booking**: Google Calendar integration for consultation scheduling
- **Admin Dashboard**: User management and document administration
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Dark Theme**: Modern dark UI with amber accent colors

## Tech Stack

### Frontend
- **React 19**: Modern UI library for building component-based interfaces
- **TypeScript/JavaScript**: For type safety and better developer experience
- **Vite**: Fast, modern frontend build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **React Router v7**: Client-side routing
- **Auth0 SDK**: Authentication and user management

### Backend
- **Node.js/Express**: RESTful API server
- **Supabase**: PostgreSQL database for user and application data
- **Google Calendar API**: For session booking and availability management
- **JWT**: For secure API authentication between frontend and backend

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smartfitter-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. Start the backend API server:
   ```bash
   cd api
   npm install
   npm start
   ```
   The backend API runs on http://localhost:3001

## Project Structure

```
├── src/                  # Frontend React application
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   └── ProtectedRoute.jsx # Authentication wrapper
│   ├── context/
│   │   └── ProfileContext.jsx # User profile state management
│   ├── pages/
│   │   ├── AdminDashboardPage.jsx # Admin dashboard
│   │   ├── BookingPage.jsx        # Session booking
│   │   ├── BookingConfirmationPage.jsx # Booking success page
│   │   ├── MemberContractPage.jsx # Contract signing
│   │   ├── NdaPage.jsx            # NDA signing
│   │   ├── ProfilePage.jsx        # User profile
│   │   ├── ProfileSetupPage.jsx   # Profile completion
│   │   └── UnauthorizedPage.jsx   # Access denied page
│   ├── services/
│   │   └── api.js        # API client services
│   ├── App.jsx           # Main application with routes
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and Tailwind directives
│
├── api/                  # Backend API server
│   ├── config/           # Configuration files
│   │   ├── google.js     # Google Calendar client
│   │   └── supabase.js   # Supabase database client
│   ├── db/               # Database related files
│   │   └── migrations/   # SQL migration scripts
│   ├── routes/           # API route handlers
│   │   ├── admin.js      # Admin endpoints
│   │   ├── calendar.js   # Calendar booking endpoints
│   │   ├── documents.js  # Document management endpoints
│   │   ├── public.js     # Public access endpoints
│   │   └── users.js      # User profile endpoints
│   ├── utils/            # Helper functions
│   └── index.js          # API server entry point
```

## Configuration

### Environment Variables

#### Frontend (.env file)
```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_API_URL=http://localhost:3001
```

#### Backend (.env file)
```
PORT=3001
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_KEY=your-supabase-service-role-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_CALENDAR_ID=your-google-calendar-id
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
```

## User Flow

1. **Prospect**: Initial user status after account creation
2. **NDA Signed**: After signing the Non-Disclosure Agreement
3. **Booked Session**: After scheduling a consultation
4. **Accepted**: After admin approval (following consultation)
5. **Member Contract Signed**: After signing the membership contract
6. **Active Member**: Full access to all features

## API Endpoints

### Users API
- `GET /api/users/profile`: Get the current user's profile
- `PUT /api/users/profile`: Update the user's profile

### Documents API
- `GET /api/documents/:type`: Get active document by type
- `POST /api/documents/:id/sign`: Sign a document

### Calendar API
- `GET /api/calendar/availability`: Get available time slots
- `POST /api/calendar/book`: Book a session

### Admin API
- `GET /api/admin/users`: Get all users (admin only)
- `PUT /api/admin/users/:id/approve`: Approve a user (admin only)
- `GET /api/admin/documents`: Get all documents (admin only)

## License

This project is proprietary and confidential.
