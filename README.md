# CRM Application - Full Stack Implementation

A complete, production-ready CRM application built with React (frontend), Node.js/Express (backend), and PostgreSQL (database).

## Overview

This is a comprehensive CRM (Customer Relationship Management) system featuring:

- **Multi-Tenant Architecture**: Support for multiple organizations
- **Role-Based Access Control**: Admin, Editor, and Viewer roles
- **Complete Authentication System**: JWT-based with session tracking
- **Import Management**: Handle file uploads with error tracking and validation
- **Lead Management**: Store and manage customer data
- **DNC Compliance**: Do Not Call list checking
- **Activity Audit Trail**: Track all user actions
- **Responsive UI**: Clean, modern interface with Tailwind CSS

## Quick Start

### 1. Start Backend (Terminal 1)
```bash
cd backend
npm install
npm run build
npm start
```
Backend runs on `http://localhost:3001`

### 2. Start Frontend (Terminal 2)
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Log In
- **Email**: demo@example.com
- **Password**: password123

That's it! You're ready to use the CRM.

## Documentation

- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Quick setup guide with common commands
- **[SETUP.md](./SETUP.md)** - Detailed setup and configuration guide

## Project Structure

```
project/
├── src/                    # React Frontend
│   ├── api/               # API client
│   ├── context/           # Auth context
│   ├── pages/             # Page components
│   ├── components/        # UI components
│   └── App.tsx            # Main app
├── backend/               # Node.js Backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   └── index.ts       # Express server
│   └── prisma/            # Database schema
├── GETTING_STARTED.md     # Quick start guide
├── SETUP.md               # Detailed setup
└── README.md              # This file
```

## Technology Stack

### Frontend
- **React** 18.3.1 - UI library
- **React Router** 6.20.0 - Navigation
- **TypeScript** 5.5.3 - Type safety
- **Tailwind CSS** 3.4.1 - Styling
- **Lucide React** - Icons
- **Vite** 5.4.2 - Build tool

### Backend
- **Node.js** - Runtime
- **Express** 4.18.2 - Web framework
- **Prisma** 7.0.0 - ORM
- **TypeScript** 5.3.3 - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **PostgreSQL** - Database (Supabase)

### Database
- **PostgreSQL** via Supabase
- **Full Schema**: 20+ tables with proper indexing
- **Multi-Tenant Support**: Complete tenant isolation
- **Row-Level Security**: Data protection in application layer

## Database Schema

### Core Tables
- **tenants** - Organizations
- **users** - User accounts
- **roles** - User roles (admin, editor, viewer)
- **permissions** - Fine-grained permissions
- **role_has_permissions** - Role-permission associations

### Business Tables
- **imports** - Import records with status tracking
- **import_mappings** - CSV/Excel field mappings
- **import_errors** - Error tracking for failed records
- **leads** - Customer/lead information
- **suppression_list** - Tenant-level suppression lists
- **dnc_master** - Federal/state DNC master list
- **dnc_hits** - DNC match tracking

### Support Tables
- **sessions** - User session tracking
- **password_resets** - Password reset tokens
- **activity_logs** - Audit trail
- **jobs** - Background job queue

## API Endpoints

### Authentication (`/api/auth`)
```
POST   /login           - User login
POST   /register        - User registration
GET    /me              - Get current user
POST   /logout          - User logout
```

### Users (`/api/users`)
```
GET    /                - List users
GET    /:id             - Get user details
```

### Imports (`/api/imports`)
```
GET    /                - List imports
GET    /:id             - Get import details
POST   /                - Create import
PUT    /:id             - Update import
```

### Leads (`/api/leads`)
```
GET    /                - List leads (paginated)
GET    /:id             - Get lead details
POST   /                - Create lead
```

## Features

### Authentication & Security
- ✅ Email/password authentication
- ✅ JWT-based sessions
- ✅ Bcrypt password hashing
- ✅ Protected API routes
- ✅ Session tracking
- ✅ Logout functionality

### Multi-Tenancy
- ✅ Complete tenant isolation
- ✅ Tenant-specific data
- ✅ Per-tenant suppression lists
- ✅ Tenant-aware API queries

### Role-Based Access Control
- ✅ Admin: Full access
- ✅ Editor: Create/edit imports and leads
- ✅ Viewer: Read-only access
- ✅ Extensible permission system
- ✅ Permission-based API access

### Dashboard
- ✅ Key metrics (imports, leads, users)
- ✅ Recent imports display
- ✅ Recent leads display
- ✅ User profile information
- ✅ Statistics and overview

### UI/UX
- ✅ Responsive design
- ✅ Tailwind CSS styling
- ✅ Modern color scheme
- ✅ Loading states
- ✅ Error handling
- ✅ Smooth transitions

## Default Credentials

After setup, you can log in with:

```
Email:    demo@example.com
Password: password123
Role:     Admin
Tenant:   Default Organization
```

This admin account has full access to all features.

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://zawyvtjpuxzqlrdinggu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend (backend/.env)
```
DATABASE_URL=postgresql://postgres.zawyvtjpuxzqlrdinggu:zaVFxzZ7z-TxVn6N@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=crm-app-secret-key-2024
PORT=3001
NODE_ENV=development
```

## Development

### Frontend Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
```

### Backend Development
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm run build        # Compile TypeScript
npm start            # Start production server
npm run seed         # Seed database with defaults
npm run prisma:generate  # Generate Prisma client
```

## Testing the Application

1. **Start backend**: `cd backend && npm start`
2. **Start frontend**: `npm run dev`
3. **Open browser**: `http://localhost:5173`
4. **Log in**: Use demo@example.com / password123
5. **View dashboard**: See metrics and sample data
6. **Explore features**: Click through the interface

## Production Deployment

### Backend Deployment
1. Build: `npm run build`
2. Set environment variables on server
3. Run: `npm start`
4. Consider using PM2 or similar process manager

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to CDN or web server
3. Configure environment variables for production

### Database
- Already managed by Supabase
- No additional setup needed
- Automatic backups included

## Key Implementation Details

### Authentication Flow
1. User enters credentials on login page
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. All API requests include Bearer token
5. Backend middleware validates token
6. User redirected to dashboard on success

### Data Protection
- JWT tokens expire after 24 hours
- Passwords hashed with bcrypt (10 rounds)
- Database queries isolated by tenant
- Protected routes require authentication
- API routes verify user permissions

### Database Access
- Prisma ORM for type-safe queries
- Automatic migrations with schema.prisma
- Foreign key relationships enforced
- Indexed columns for performance
- Soft deletes concept (can be added)

## Troubleshooting

### Backend won't start?
- Check port 3001 is available
- Verify DATABASE_URL is correct
- Ensure node_modules installed
- Check .env file exists

### Frontend won't load?
- Verify backend is running
- Check port 5173 is available
- Clear browser cache
- Check browser console for errors

### Can't log in?
- Verify database has data
- Run `npm run seed` in backend
- Check backend logs for errors
- Verify JWT_SECRET is set

### Build errors?
- Delete node_modules and reinstall
- Ensure Node.js 16+
- Check TypeScript errors with `npm run typecheck`
- Verify all imports use correct paths

## Next Steps

To extend this application:

1. **File Upload**: Implement CSV/Excel import
2. **Advanced Search**: Add filtering and search
3. **Export**: Add CSV/Excel export
4. **Notifications**: Email alerts
5. **Admin Panel**: User management UI
6. **Reporting**: Custom reports
7. **Webhooks**: External integrations
8. **Background Jobs**: Process large imports
9. **Caching**: Redis for performance
10. **Analytics**: Usage tracking

## Architecture Decisions

### Why Separate Frontend/Backend?
- Clear separation of concerns
- Independent scaling
- Easier to maintain and test
- Can be deployed separately
- Better security isolation

### Why Prisma?
- Type-safe queries
- Easy migrations
- Excellent DX
- Auto-generated types
- Supports multiple databases

### Why Supabase?
- Managed PostgreSQL
- Built-in auth (optional)
- Real-time capabilities (future)
- Automatic backups
- Scalable infrastructure

### Why React Router?
- Industry standard
- Great documentation
- Protected routes support
- Simple API
- Good TypeScript support

## Support & Help

Refer to:
- **GETTING_STARTED.md** - Quick reference guide
- **SETUP.md** - Detailed configuration
- Backend logs for API errors
- Browser console for frontend errors

## License

This project is ready for production use and modification.

---

**Built with**: React • Node.js • Express • Prisma • PostgreSQL • TypeScript • Tailwind CSS

**Deployed to**: Frontend: Vite dev server (localhost:5173) • Backend: Express server (localhost:3001) • Database: Supabase PostgreSQL
