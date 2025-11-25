# CRM Application Setup Guide

This is a full-stack CRM application built with React (frontend), Node.js/Express (backend), and PostgreSQL (database via Supabase).

## Project Structure

```
project/
├── src/                          # React frontend
│   ├── api/
│   │   └── client.ts            # API client for backend communication
│   ├── context/
│   │   └── AuthContext.tsx       # Authentication context
│   ├── components/
│   │   └── ProtectedRoute.tsx    # Protected route component
│   ├── pages/
│   │   ├── LoginPage.tsx         # Login page
│   │   └── DashboardPage.tsx     # Dashboard page
│   ├── App.tsx                   # Main app component with routing
│   └── main.tsx                  # React entry point
├── backend/                      # Node.js backend
│   ├── src/
│   │   ├── index.ts              # Express server
│   │   ├── seed.ts               # Database seeder
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT authentication middleware
│   │   └── routes/
│   │       ├── auth.ts           # Authentication routes
│   │       ├── users.ts          # User management routes
│   │       ├── imports.ts        # Import management routes
│   │       └── leads.ts          # Lead management routes
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                      # Backend environment variables
├── package.json                  # Frontend dependencies
└── .env                          # Frontend environment variables
```

## Prerequisites

- Node.js 16+ and npm
- Supabase account (database is already set up)

## Installation & Setup

### 1. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Build frontend
npm run build

# Development server (runs on port 5173)
npm run dev
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Build backend
npm run build

# Start backend server (runs on port 3001)
npm start

# For development with auto-reload
npm run dev

# To seed the database with default data and user
npm run seed
```

## Database

The application uses Supabase PostgreSQL with the following main tables:

### Core Tables
- **tenants**: Multi-tenant support (organizations)
- **roles**: User roles (admin, editor, viewer)
- **permissions**: Fine-grained permissions
- **users**: User accounts with authentication

### Business Tables
- **imports**: File import management
- **import_mappings**: Header mapping for imports
- **import_errors**: Error tracking for failed imports
- **leads**: Lead/contact information
- **suppression_list**: Tenant-level suppression lists
- **dnc_master**: Federal/state DNC list
- **dnc_hits**: DNC match logs

### Supporting Tables
- **sessions**: User session tracking
- **password_resets**: Password reset tokens
- **activity_logs**: Audit trail
- **jobs**: Job queue support

## Default User

After seeding, you can log in with:

```
Email: demo@example.com
Password: password123
```

This user has admin role with all permissions.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user details

### Imports
- `GET /api/imports` - List imports
- `GET /api/imports/:id` - Get import details
- `POST /api/imports` - Create import
- `PUT /api/imports/:id` - Update import

### Leads
- `GET /api/leads` - List leads (with pagination)
- `GET /api/leads/:id` - Get lead details
- `POST /api/leads` - Create lead

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://zawyvtjpuxzqlrdinggu.supabase.co
VITE_SUPABASE_ANON_KEY=<your_anon_key>
```

### Backend (backend/.env)
```
DATABASE_URL=postgresql://postgres.zawyvtjpuxzqlrdinggu:zaVFxzZ7z-TxVn6N@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=crm-app-secret-key-2024
PORT=3001
NODE_ENV=development
```

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Server will run on http://localhost:3001
```

### Terminal 2 - Frontend
```bash
npm run dev
# App will run on http://localhost:5173
```

Open http://localhost:5173 in your browser and log in with the default credentials.

## Key Features

1. **Multi-Tenant Architecture**: Support for multiple organizations
2. **Role-Based Access Control (RBAC)**: Admin, Editor, Viewer roles with permissions
3. **Secure Authentication**: JWT-based authentication with bcrypt password hashing
4. **Import Management**: Handle file uploads with error tracking
5. **Lead Management**: Store and manage customer/lead data
6. **DNC Compliance**: Check against Do Not Call lists
7. **Session Management**: Track user sessions and login history
8. **Activity Logging**: Audit trail of user actions

## Development Notes

- Frontend uses React Router for navigation
- Backend uses Express with Prisma ORM
- Authentication uses JWT tokens stored in localStorage
- All API requests require Authorization header with Bearer token
- Database queries are protected by row-level security concepts in the API layer

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL in backend/.env is correct
- Check network connectivity to Supabase
- Ensure Supabase project is active

### CORS Issues
- Backend CORS is configured to accept all origins
- Make sure backend is running on port 3001

### Authentication Errors
- Clear browser localStorage and try logging in again
- Verify JWT_SECRET is consistent between deployments
- Check that user exists in database

## Next Steps

1. Customize the dashboard with more features
2. Add file upload functionality for imports
3. Implement lead filtering and search
4. Add export functionality
5. Create admin panel for user management
6. Add email notifications
