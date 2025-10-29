# 📦 Complete MongoDB Setup Guide for Windows

## Step 1: Download MongoDB Community Edition

### Option A: Download from Official Website
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (e.g., 7.0.x)
   - **Platform**: Windows x64
   - **Package**: MSI (installer)
3. Click "Download"
4. File will download: `mongodb-windows-x86_64-7.0.x.msi`

### Option B: Use Chocolatey (if installed)
```bash
choco install mongodb-community
```

---

## Step 2: Install MongoDB

### Using the MSI Installer
1. Open **Downloads** folder
2. Double-click `mongodb-windows-x86_64-7.0.x.msi`
3. Follow the installer:
   - Accept License
   - Click "Next" through steps
   - Choose installation folder (default: `C:\Program Files\MongoDB\Server\7.0`)
   - **Important**: Check "Install MongoDB as a Service" ✓
   - Click "Install"
   - Click "Finish"

### Verify Installation
Open PowerShell and run:
```bash
mongod --version
```
Should show version number like `db version v7.0.x`

---

## Step 3: Create Data Directory

MongoDB needs a folder to store database files.

### Create Folder
```bash
# Open PowerShell as Administrator
mkdir C:\data\db
```

If you get permission error:
1. Right-click PowerShell
2. Select "Run as administrator"
3. Try again

---

## Step 4: Start MongoDB Service

### Option A: As Windows Service (Recommended)
MongoDB was installed as a Windows service automatically.

**Start the service:**
```bash
# Open PowerShell as Administrator
net start MongoDB
```

**Stop the service:**
```bash
net stop MongoDB
```

**Verify it's running:**
```bash
# Should show MongoDB service
Get-Service MongoDB
```

### Option B: Manual Start with mongod.exe

**Find mongod.exe location:**
```bash
# Default location
C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe
```

**Start MongoDB manually:**
```bash
# Open PowerShell (any location)
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod.exe
```

Or with data directory:
```bash
mongod.exe --dbpath C:\data\db
```

You should see:
```
[initandlisten] waiting for connections on port 27017
```

---

## Step 5: Verify MongoDB is Running

Open a **NEW PowerShell window** and run:
```bash
mongo
```

Or newer versions:
```bash
mongosh
```

You should see:
```
test> 
```

Type `exit` to quit:
```bash
exit()
```

---

## Step 6: Setup Your Project

### 6.1 Configure Backend Environment

Create `backend/.env` file:
```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\backend"
```

Create a new file called `.env`:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=pharma_agent_ai
SECRET_KEY=your-super-secret-key-change-this-in-production
GROQ_API_KEY=your-groq-api-key-here
```

### 6.2 Start Backend

```bash
# Navigate to backend
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\backend"

# Activate virtual environment
.\Scripts\Activate.bat

# Start backend
python main.py
```

You should see:
```
Uvicorn running on http://127.0.0.1:8000
```

### 6.3 Start Frontend (NEW PowerShell Window)

```bash
# Navigate to frontend
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\frontend-react"

# Start frontend
npm run dev
```

You should see:
```
➜  Local:   http://localhost:3002/
```

---

## Complete Setup Checklist

### ✅ Windows Terminal Layout (Recommended)

You need **3 PowerShell windows** open:

**Window 1 - MongoDB:**
```bash
# Let MongoDB service run
# Or manually:
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod.exe
# Should show: waiting for connections on port 27017
```

**Window 2 - Backend:**
```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\backend"
.\Scripts\Activate.bat
python main.py
# Should show: Uvicorn running on http://127.0.0.1:8000
```

**Window 3 - Frontend:**
```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\frontend-react"
npm run dev
# Should show: Local: http://localhost:3002/
```

---

## Testing Everything

### 1. Check if MongoDB is Running
```bash
mongo
# or
mongosh
```

### 2. Check if Backend is Running
Open browser: http://localhost:8000/docs

### 3. Check if Frontend is Running
Open browser: http://localhost:3002

### 4. Create Test Account
1. Go to http://localhost:3002/login
2. Click "Sign up"
3. Fill in: name, email, password
4. Should create account successfully

### 5. Save a Report
1. Click "Analyze" in navbar
2. Search for medicine (e.g., "Aspirin")
3. Create analysis
4. Should save to MongoDB

### 6. View Saved Reports
1. Click "Reports" in navbar
2. Should see your saved reports

---

## Common Issues & Solutions

### ❌ mongod.exe not found
**Problem**: "mongod.exe is not recognized"

**Solution:**
```bash
# Check if MongoDB is installed
mongod --version

# If that fails, find it:
# Look in C:\Program Files\MongoDB\Server\7.0\bin\

# Add to PATH (one-time setup):
# 1. Open System Environment Variables (Win + Pause)
# 2. Click "Environment Variables"
# 3. Edit PATH
# 4. Add: C:\Program Files\MongoDB\Server\7.0\bin
# 5. Restart PowerShell
```

### ❌ Port 27017 already in use
**Problem**: "Address already in use"

**Solution:**
```bash
# Find what's using port 27017
netstat -ano | findstr :27017

# Kill the process
taskkill /PID <PID_NUMBER> /F

# Or use different port:
mongod.exe --port 27018
# Then update MONGO_URL in .env
```

### ❌ Cannot connect to MongoDB
**Problem**: "Connection refused"

**Solution:**
1. Check MongoDB is running: `mongosh`
2. Check data directory exists: `C:\data\db`
3. Check .env has correct MONGO_URL
4. Restart MongoDB service: `net stop MongoDB` → `net start MongoDB`

### ❌ Backend won't start
**Problem**: "ModuleNotFoundError: No module named 'pymongo'"

**Solution:**
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### ❌ Frontend shows blank page
**Problem**: White screen

**Solution:**
```bash
cd frontend-react
npm install
npm run dev
```

---

## Commands Reference

### MongoDB Service (Windows)
```bash
# Start service
net start MongoDB

# Stop service
net stop MongoDB

# Check status
Get-Service MongoDB

# Connect to MongoDB
mongosh
```

### Backend
```bash
# Activate virtual environment
C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\venv\Scripts\Activate.bat

# Install dependencies
pip install -r requirements.txt

# Run backend
python main.py

# Stop backend
# Press Ctrl+C in terminal
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Stop frontend
# Press Ctrl+C in terminal
```

### Check Services
```bash
# MongoDB
mongosh

# Backend API
# Visit http://localhost:8000/docs

# Frontend
# Visit http://localhost:3002
```

---

## Production Tips

### Use MongoDB Atlas (Cloud - No Installation)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update .env:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### Using MongoDB Compass (GUI)
1. Download from: https://www.mongodb.com/products/compass
2. Install
3. Click "New Connection"
4. Use default `mongodb://localhost:27017`
5. Browse databases visually

---

## Detailed Step-by-Step (First Time Setup)

### Total Time: ~15 minutes

**Step 1: Download (2 min)**
- Go to MongoDB download page
- Download MSI installer
- Save to Downloads

**Step 2: Install (5 min)**
- Run MSI installer
- Follow wizard
- Accept defaults
- Check "Install as Service"
- Finish

**Step 3: Verify (1 min)**
```bash
# Open PowerShell
mongod --version
# Should work
```

**Step 4: Create Data Folder (1 min)**
```bash
# Open PowerShell as Administrator
mkdir C:\data\db
```

**Step 5: Start MongoDB (1 min)**
```bash
# Option A - Service (recommended):
net start MongoDB

# Option B - Manual:
mongod.exe
```

**Step 6: Test Connection (1 min)**
```bash
# New PowerShell window
mongosh
# Should connect
exit()
```

**Step 7: Configure Backend (2 min)**
```bash
# Create backend/.env
cd backend
# Create .env file with MONGO_URL, etc.
```

**Step 8: Start All Services (2 min)**
- Window 1: MongoDB running
- Window 2: `python main.py`
- Window 3: `npm run dev`

**Step 9: Test (1 min)**
- Visit http://localhost:3002
- Create account
- Save report

✅ **Done!**

---

## Summary

| What | Where to Execute | Command |
|------|------------------|---------|
| MongoDB | PowerShell (Admin) | `net start MongoDB` or `mongod.exe` |
| Backend | PowerShell | `cd backend && python main.py` |
| Frontend | PowerShell | `cd frontend-react && npm run dev` |
| Test | Web Browser | http://localhost:3002 |

**MongoDB must be running BEFORE starting backend!**

---

**Need help? Start with Option A (Service) - it's the easiest!** ✨
