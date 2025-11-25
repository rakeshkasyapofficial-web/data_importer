# Installation & Setup Checklist

Use this checklist to ensure everything is properly set up and ready to run.

## Prerequisites
- [ ] Node.js 16+ installed (`node -v`)
- [ ] npm installed (`npm -v`)
- [ ] Supabase account (already configured)
- [ ] Internet connection for database access

## Clone/Setup
- [ ] Project files extracted
- [ ] All files in correct locations
- [ ] .env files present in both root and backend/

## Frontend Setup
- [ ] Navigate to project root
- [ ] Run `npm install`
- [ ] Verify no errors during installation
- [ ] Run `npm run build`
- [ ] Verify build completes successfully
- [ ] Check `dist/` folder created with files
- [ ] .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

## Backend Setup
- [ ] Navigate to `backend/` folder
- [ ] Run `npm install`
- [ ] Verify no errors during installation
- [ ] Run `npm run build`
- [ ] Verify build completes successfully
- [ ] Check `dist/` folder created with files
- [ ] .env file has DATABASE_URL and JWT_SECRET

## Database Verification
- [ ] Supabase project accessible
- [ ] Database tables created (verify in Supabase console)
- [ ] Check tables exist:
  - [ ] tenants
  - [ ] users
  - [ ] roles
  - [ ] permissions
  - [ ] imports
  - [ ] leads
  - [ ] (and others)
- [ ] Seed data present:
  - [ ] Default tenant exists
  - [ ] Roles (admin, editor, viewer) exist
  - [ ] Default user (demo@example.com) exists

## Pre-Launch Testing
- [ ] Backend .env has correct DATABASE_URL
- [ ] Backend .env has JWT_SECRET set
- [ ] Frontend .env has VITE_SUPABASE_URL
- [ ] Frontend .env has VITE_SUPABASE_ANON_KEY
- [ ] Port 3001 is available (not in use)
- [ ] Port 5173 is available (not in use)

## Launch

### Backend Launch
- [ ] Open Terminal 1
- [ ] Navigate to `backend/` folder
- [ ] Run `npm start`
- [ ] Verify output: "Server is running on http://localhost:3001"
- [ ] Test health: `curl http://localhost:3001/health`
- [ ] Should return: `{"status":"OK"}`

### Frontend Launch
- [ ] Open Terminal 2 (keep Terminal 1 running)
- [ ] Navigate to project root
- [ ] Run `npm run dev`
- [ ] Verify output: "Local: http://localhost:5173"
- [ ] Open browser to http://localhost:5173

## Login Test
- [ ] Login page appears
- [ ] Email field shows "demo@example.com"
- [ ] Password field shows "password123"
- [ ] Click "Sign In" button
- [ ] No error messages appear
- [ ] Redirected to dashboard
- [ ] Dashboard loads with stats
- [ ] User name displayed in header

## Dashboard Verification
- [ ] Stats cards visible (Total Imports, Total Leads, Team Members)
- [ ] Recent Imports section visible
- [ ] Recent Leads section visible
- [ ] User Information section visible
- [ ] Logout button present in header
- [ ] All styling looks correct

## Logout Test
- [ ] Click "Logout" button
- [ ] Redirected to login page
- [ ] Session cleared from localStorage
- [ ] Can log in again successfully

## Feature Testing

### Authentication
- [ ] Can log in with correct credentials
- [ ] Cannot log in with wrong password
- [ ] Cannot log in with wrong email
- [ ] Logout clears session
- [ ] Protected routes require login
- [ ] Dashboard not accessible without login

### API Integration
- [ ] Backend responds to API calls
- [ ] Frontend receives data from backend
- [ ] Errors handled gracefully
- [ ] Loading states work

### Data Display
- [ ] Stats cards show correct data
- [ ] Recent imports displayed
- [ ] Recent leads displayed
- [ ] User profile information shown

## Advanced Checks

### Backend Console
- [ ] No error messages
- [ ] Prisma client initialized
- [ ] Database connection successful
- [ ] Server listening on port 3001

### Browser Console
- [ ] No JavaScript errors
- [ ] No console errors
- [ ] Network requests successful (200 status)
- [ ] Authentication headers present in API calls

### Database Console (Supabase)
- [ ] Can access Supabase project
- [ ] Can view tables
- [ ] Can see default data
- [ ] No connection errors

## Troubleshooting Checklist

If things don't work, verify:

### Frontend Issues
- [ ] Backend is running
- [ ] Backend is on port 3001
- [ ] .env variables are correct
- [ ] Browser cache cleared
- [ ] localStorage cleared
- [ ] npm packages installed correctly

### Backend Issues
- [ ] DATABASE_URL is correct
- [ ] JWT_SECRET is set
- [ ] Port 3001 is available
- [ ] Database connection works
- [ ] npm packages installed correctly

### Database Issues
- [ ] Supabase project is accessible
- [ ] DATABASE_URL matches Supabase
- [ ] Tables exist in database
- [ ] Seed data exists
- [ ] No connection timeouts

## Post-Launch Tasks

- [ ] Create backup of .env files (keep secure)
- [ ] Note down admin credentials
- [ ] Review SETUP.md for advanced configuration
- [ ] Review API documentation
- [ ] Plan first feature addition
- [ ] Set up version control (git)
- [ ] Consider adding to .gitignore:
  - [ ] .env files
  - [ ] node_modules
  - [ ] dist folders

## Success Criteria

All of the following should be true:

✅ Backend runs without errors
✅ Frontend runs without errors
✅ Database tables exist
✅ Can log in with demo credentials
✅ Dashboard displays
✅ All navigation works
✅ No console errors
✅ API calls successful

If all items above are checked, the installation is complete and successful!

## Next Steps

1. Read GETTING_STARTED.md for quick reference
2. Read SETUP.md for detailed configuration
3. Explore the API endpoints
4. Plan your first feature addition
5. Review the database schema
6. Set up git repository
7. Configure for production deployment

---

**Notes:**
- Keep both terminals running while developing
- Don't commit .env files to git
- Use meaningful commit messages
- Document any customizations
