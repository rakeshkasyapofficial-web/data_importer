# Getting Started with the CRM Application

## Quick Start

### Step 1: Start the Backend

```bash
cd backend
npm install  # if not already installed
npm run build
npm start
```

Backend will be available at `http://localhost:3001`

Health check: `http://localhost:3001/health`

### Step 2: Start the Frontend

In a new terminal from project root:

```bash
npm install  # if not already installed
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Step 3: Log In

Use the default demo credentials:
- **Email**: demo@example.com
- **Password**: password123

You'll be automatically redirected to the dashboard after successful login.

## What's Included

### Frontend (React)
- ✅ Login page with form validation
- ✅ Dashboard with stats and recent data
- ✅ Protected routes with authentication
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ API integration with the backend
- ✅ Session management with localStorage

### Backend (Node.js + Express)
- ✅ RESTful API with proper error handling
- ✅ JWT-based authentication
- ✅ Prisma ORM for database access
- ✅ PostgreSQL database (Supabase)
- ✅ CORS enabled for frontend communication
- ✅ Multiple routes for auth, users, imports, leads

### Database (PostgreSQL/Supabase)
- ✅ Full multi-tenant schema
- ✅ Role-based access control (RBAC)
- ✅ All required tables created
- ✅ Default admin user seeded
- ✅ Proper indexes for performance
- ✅ Foreign key relationships

## Database Schema Overview

### Authentication & Users
- `tenants` - Organizations
- `users` - User accounts
- `roles` - User roles (admin, editor, viewer)
- `permissions` - Fine-grained permissions
- `role_has_permissions` - Role-permission mapping
- `sessions` - User session tracking
- `password_resets` - Password reset tokens

### Business Logic
- `imports` - File import records
- `import_mappings` - Field mapping configuration
- `import_errors` - Import error tracking
- `leads` - Customer/lead records
- `suppression_list` - Tenant-level suppression lists
- `dnc_master` - Do Not Call master list
- `dnc_hits` - DNC match tracking

### Support
- `activity_logs` - Audit trail
- `jobs` - Background job queue

## API Endpoints Summary

### Auth Routes (/api/auth)
```
POST   /login          - Login with email/password
POST   /register       - Create new account
GET    /me             - Get current user profile
POST   /logout         - Logout (optional endpoint)
```

### User Routes (/api/users)
```
GET    /               - List all users in tenant
GET    /:id            - Get specific user
```

### Import Routes (/api/imports)
```
GET    /               - List imports
GET    /:id            - Get import details
POST   /               - Create new import
PUT    /:id            - Update import
```

### Lead Routes (/api/leads)
```
GET    /               - List leads (paginated)
GET    /:id            - Get lead details
POST   /               - Create lead
```

## Key Technologies

### Frontend
- React 18.3.1
- React Router DOM 6.20.0
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Lucide React (icons)
- Vite 5.4.2

### Backend
- Node.js with TypeScript
- Express 4.18.2
- Prisma 7.0.0
- PostgreSQL (Supabase)
- JWT (jsonwebtoken 9.0.0)
- bcryptjs (password hashing)
- CORS enabled

## Project Features

### Authentication
- Email/password login
- JWT token-based sessions
- Password hashing with bcrypt
- Protected API routes
- User session tracking

### Multi-Tenancy
- Complete tenant isolation
- Tenant-specific data
- Per-tenant suppression lists
- Tenant-level permissions

### Role-Based Access
- Admin: Full access to all features
- Editor: Can create and edit imports/leads
- Viewer: Read-only access
- Extensible permission system

### Dashboard
- Display key metrics (imports, leads, users)
- Show recent imports
- Show recent leads
- User profile information
- Logout functionality

## File Structure

```
/
├── src/
│   ├── api/client.ts           - API client
│   ├── context/AuthContext.tsx - Auth state management
│   ├── pages/
│   │   ├── LoginPage.tsx       - Login UI
│   │   └── DashboardPage.tsx   - Dashboard UI
│   ├── components/
│   │   └── ProtectedRoute.tsx  - Route protection
│   ├── App.tsx                 - Main app with routes
│   └── main.tsx                - React entry point
├── backend/
│   ├── src/
│   │   ├── index.ts            - Express server
│   │   ├── seed.ts             - Database seeder
│   │   ├── middleware/auth.ts  - JWT middleware
│   │   └── routes/
│   │       ├── auth.ts
│   │       ├── users.ts
│   │       ├── imports.ts
│   │       └── leads.ts
│   └── prisma/schema.prisma    - Database schema
├── package.json                - Frontend dependencies
├── SETUP.md                    - Detailed setup guide
└── GETTING_STARTED.md          - This file
```

## Common Commands

### Frontend
```bash
npm install      # Install dependencies
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
npm run typecheck  # TypeScript type checking
```

### Backend
```bash
cd backend
npm install               # Install dependencies
npm run build             # Compile TypeScript
npm run dev               # Development mode with auto-reload
npm start                 # Production mode
npm run prisma:generate   # Generate Prisma client
npm run seed              # Seed database with defaults
```

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://zawyvtjpuxzqlrdinggu.supabase.co
VITE_SUPABASE_ANON_KEY=<key>
```

### Backend (backend/.env)
```
DATABASE_URL=postgresql://postgres.zawyvtjpuxzqlrdinggu:zaVFxzZ7z-TxVn6N@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=crm-app-secret-key-2024
PORT=3001
NODE_ENV=development
```

## Troubleshooting

### Can't connect to backend from frontend?
- Ensure backend is running on port 3001
- Check CORS is enabled (it is by default)
- Verify no firewall is blocking localhost:3001

### Login not working?
- Check backend console for errors
- Verify database connection in backend logs
- Try clearing browser cache and cookies
- Ensure demo user exists (run `npm run seed`)

### Build errors?
- Delete `node_modules` and `package-lock.json`, then reinstall
- Ensure Node.js version is 16+
- For TypeScript errors, try `npm run typecheck`

### Database errors?
- Verify DATABASE_URL is correct in backend/.env
- Check Supabase project is accessible
- Ensure all migrations were applied
- Try reseeding with `npm run seed`

## Next Steps to Expand

1. **Add File Upload**: Implement CSV/Excel import functionality
2. **Search & Filter**: Add filtering for leads and imports
3. **Export Data**: Add CSV/Excel export functionality
4. **Email Notifications**: Notify users of import status
5. **Admin Panel**: User management interface
6. **Webhooks**: Integrate with external systems
7. **Advanced Reporting**: Custom reports and analytics
8. **Bulk Operations**: Batch lead processing
9. **API Pagination**: Improve data fetching
10. **Error Recovery**: Better error handling and retries

## Support

For detailed information about the database schema, API design, and configuration, refer to `SETUP.md`.
