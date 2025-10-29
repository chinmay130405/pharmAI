# Authentication & MongoDB Setup Guide

## Overview
PharmAI now includes a complete authentication system with MongoDB integration. Users can optionally login to save their analysis reports.

## Features
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens  
- ✅ Password hashing with bcrypt
- ✅ Optional authentication (works with and without login)
- ✅ User reports saved to MongoDB
- ✅ Personal report management dashboard
- ✅ Download reports as JSON

## Prerequisites
- MongoDB installed and running locally OR a MongoDB Atlas connection string
- Python 3.8+
- Node.js 16+

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Create or update `.env` file:
```env
# MongoDB
MONGO_URL=mongodb://localhost:27017
DB_NAME=pharma_agent_ai

# JWT Security (change this in production!)
SECRET_KEY=your-secret-key-change-in-production

# Groq API
GROQ_API_KEY=your-groq-api-key
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: Follow official docs

# Start MongoDB service
# Windows: mongod.exe
# macOS/Linux: mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string and update MONGO_URL in `.env`:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 4. Backend Routes
New authentication endpoints:
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/verify` - Check if authenticated
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout
- `POST /api/reports/save` - Save a report
- `GET /api/reports/user-reports` - Get user's reports
- `GET /api/reports/{id}` - Get specific report
- `DELETE /api/reports/{id}` - Delete report
- `PUT /api/reports/{id}` - Update report

### 5. Run Backend
```bash
cd backend
python main.py
# Server runs on http://localhost:8000
```

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend-react
npm install
```

### 2. Configure Environment (Optional)
Create `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

### 3. Run Frontend
```bash
cd frontend-react
npm run dev
# App runs on http://localhost:3002 (or next available port)
```

## Usage

### For Users

#### Sign Up
1. Click "Sign In" in navbar (top right)
2. Click "Sign up" to create new account
3. Enter name, email, password
4. Account created! Token saved automatically

#### Login
1. Click "Sign In" in navbar
2. Enter email and password
3. Redirected to home page

#### Save Report
1. After creating an analysis report
2. If logged in, you'll see "Save Report" button
3. Click to save to your personal dashboard

#### View Reports
1. Click "Reports" in navbar (only visible if logged in)
2. View all your saved reports
3. Download as JSON or delete

#### Logout
1. Click your name in navbar (top right)
2. Click "Logout"

### For Guests
- All features work without login
- Reports are NOT saved (only in session)
- Sign in anytime to save progress

## Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password_hash": "$2b$12$...",
  "created_at": ISODate("2025-10-29T12:00:00.000Z")
}
```

### Reports Collection
```json
{
  "_id": ObjectId,
  "user_id": "507f1f77bcf86cd799439011",
  "molecule_name": "Aspirin",
  "data": { /* analysis data */ },
  "created_at": ISODate("2025-10-29T12:00:00.000Z"),
  "updated_at": ISODate("2025-10-29T12:00:00.000Z")
}
```

## Security Features

1. **Password Hashing**: bcrypt with salt rounds (5.0.0)
2. **JWT Tokens**: 24-hour expiration
3. **Email Validation**: pydantic email-validator
4. **CORS**: Enabled for development
5. **Unique Indexes**: Email field has unique constraint

## Troubleshooting

### "Database not available" error
- Check MongoDB is running
- Verify MONGO_URL in `.env`
- Check connection string format

### "Invalid credentials" during login
- Verify email and password are correct
- Check user was registered with same email

### Token not saving
- Check browser localStorage is enabled
- Check browser console for errors
- Try incognito/private mode

### Frontend can't reach backend
- Verify backend running on http://localhost:8000
- Check VITE_API_URL in .env
- Check CORS is enabled in main.py

## Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React/Vite)           │
├─────────────────────────────────────────┤
│  - AuthContext for state management     │
│  - LoginPage, ReportsPage               │
│  - Updated Navbar with auth controls    │
│  - localStorage for token storage       │
└──────────────┬──────────────────────────┘
               │ HTTP/JWT
               ▼
┌─────────────────────────────────────────┐
│       Backend (FastAPI/Python)          │
├─────────────────────────────────────────┤
│  - /api/auth/* endpoints                │
│  - /api/reports/* endpoints             │
│  - JWT middleware for auth              │
│  - Password hashing (bcrypt)            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   MongoDB (User & Report Storage)       │
├─────────────────────────────────────────┤
│  - users collection                     │
│  - reports collection                   │
│  - Indexes for performance              │
└─────────────────────────────────────────┘
```

## Files Modified/Created

### Backend
- `database.py` - MongoDB connection and setup
- `schemas.py` - Pydantic models for data validation
- `auth.py` - JWT and password utilities
- `routes_auth.py` - Authentication endpoints
- `routes_reports.py` - Report management endpoints
- `main.py` - Updated with auth routes
- `requirements.txt` - Added new dependencies

### Frontend
- `context/AuthContext.jsx` - Auth state management
- `pages/LoginPage.jsx` - Login/Registration UI
- `pages/ReportsPage.jsx` - User reports dashboard
- `components/Navbar.jsx` - Updated with auth controls
- `App.jsx` - AuthProvider wrapper

## Next Steps

1. Test registration and login
2. Create and save a report
3. Verify report appears in dashboard
4. Test logout and re-login
5. Deploy to production with secure credentials

## Support

For issues or questions, check:
- Browser console (F12 → Console tab)
- Backend terminal for error messages
- MongoDB connection status
- Network tab (F12 → Network) for API errors

---

**Version**: 1.0.0  
**Last Updated**: October 29, 2025
