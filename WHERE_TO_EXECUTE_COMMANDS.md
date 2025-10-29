# 🚀 Quick Visual Guide - Where to Execute Commands

## The 3 PowerShell Windows You Need

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  WINDOW 1: MONGODB                                           │
│  ══════════════════════════════════════════════════════════  │
│                                                               │
│  Command: mongod.exe                                         │
│  Location: Any PowerShell (Admin)                            │
│  Directory: Doesn't matter                                   │
│                                                               │
│  What you'll see:                                            │
│  [initandlisten] waiting for connections on port 27017       │
│  ✅ LEAVE RUNNING                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  WINDOW 2: BACKEND (API SERVER)                              │
│  ══════════════════════════════════════════════════════════  │
│                                                               │
│  Location:                                                   │
│  C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\       │
│  pharma-agent-ai\backend                                     │
│                                                               │
│  Commands:                                                   │
│  cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\   │
│  pharma-agent-ai\backend"                                    │
│  .\Scripts\Activate.bat                                      │
│  python main.py                                              │
│                                                               │
│  What you'll see:                                            │
│  Uvicorn running on http://127.0.0.1:8000                    │
│  ✅ LEAVE RUNNING                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  WINDOW 3: FRONTEND (REACT APP)                              │
│  ══════════════════════════════════════════════════════════  │
│                                                               │
│  Location:                                                   │
│  C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\       │
│  pharma-agent-ai\frontend-react                              │
│                                                               │
│  Commands:                                                   │
│  cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\   │
│  pharma-agent-ai\frontend-react"                             │
│  npm run dev                                                  │
│                                                               │
│  What you'll see:                                            │
│  ➜  Local:   http://localhost:3002/                          │
│  ✅ LEAVE RUNNING                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Order of Starting

### IMPORTANT: Start in this order!

```
1️⃣  FIRST:   MongoDB (Window 1)
    └─ Wait 5 seconds for it to start

2️⃣  SECOND:  Backend (Window 2)
    └─ Wait 10 seconds for API to start

3️⃣  THIRD:   Frontend (Window 3)
    └─ Should see "Local: http://localhost:3002"

✅ All running? Visit http://localhost:3002
```

---

## 📍 Where to Execute mongod.exe

### Location of mongod.exe
```
C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe
```

### How to Execute (3 Options)

#### Option 1: Using Windows Service (EASIEST)
```bash
# Open PowerShell as Administrator
# Type:
net start MongoDB

# That's it! MongoDB is running
```
✅ **Recommended for beginners**

#### Option 2: Manual from Command Line
```bash
# Open PowerShell (any location, any administrator)
# Go to MongoDB bin folder:
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Run mongod:
mongod.exe

# You'll see:
# [initandlisten] waiting for connections on port 27017
```
✅ **Good for testing**

#### Option 3: With Custom Data Path
```bash
# Make sure C:\data\db folder exists first
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod.exe --dbpath C:\data\db
```
✅ **If default path doesn't work**

---

## 🎯 Copy-Paste Commands (Windows PowerShell)

### First-Time Setup (Copy these exactly)

**Window 1 - Start MongoDB:**
```powershell
net start MongoDB
```
If that doesn't work:
```powershell
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod.exe
```

**Window 2 - Start Backend:**
```powershell
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\backend"
.\Scripts\Activate.bat
python main.py
```

**Window 3 - Start Frontend:**
```powershell
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\frontend-react"
npm run dev
```

---

## ✅ Verification Checklist

After starting all 3:

- [ ] Window 1: MongoDB shows `waiting for connections on port 27017`
- [ ] Window 2: Backend shows `Uvicorn running on http://127.0.0.1:8000`
- [ ] Window 3: Frontend shows `Local: http://localhost:3002`
- [ ] Open http://localhost:3002 in browser
- [ ] Should see PharmAI homepage
- [ ] Click Login, create account, search medicine
- [ ] Reports should save automatically when logged in

---

## 🔍 How to Check if Things Are Running

```bash
# Check MongoDB
mongosh
# Type: exit() to quit

# Check Backend
# Visit: http://localhost:8000/docs

# Check Frontend  
# Visit: http://localhost:3002

# Check all ports
netstat -ano | findstr :27017
netstat -ano | findstr :8000
netstat -ano | findstr :3002
```

---

## ❌ If Something Doesn't Work

### MongoDB not starting?
```bash
# Check if it's installed
mongod --version

# If error, install from: https://www.mongodb.com/try/download/community
```

### Backend won't start?
```bash
# Reinstall packages
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend not loading?
```bash
# Reinstall packages
cd frontend-react
npm install
npm run dev
```

### Port already in use?
```bash
# Find what's using port
netstat -ano | findstr :8000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F
```

---

## 📊 Services Running Diagram

```
BROWSER (http://localhost:3002)
     ↓
FRONTEND (React on port 3002)
     ↓
BACKEND API (FastAPI on port 8000)
     ↓
MONGODB (Database on port 27017)
```

All 3 must be running for the app to work!

---

## 💡 Pro Tips

1. **Don't close any windows** - Keep all 3 running in background
2. **MongoDB service** - Set to start on Windows boot:
   ```bash
   Set-Service MongoDB -StartupType Automatic
   ```
3. **Check status anytime:**
   ```bash
   Get-Service MongoDB
   ```
4. **Stop everything cleanly:**
   - Press Ctrl+C in each window
   - Or: `net stop MongoDB`

---

## 🎓 Summary Table

| Service | Port | Start Command | Location |
|---------|------|---------------|----------|
| MongoDB | 27017 | `net start MongoDB` | Any PowerShell (Admin) |
| Backend | 8000 | `python main.py` | `.\backend` |
| Frontend | 3002 | `npm run dev` | `.\frontend-react` |

---

**Questions? Read: MONGODB_COMPLETE_SETUP.md**

**Everything running? Visit: http://localhost:3002** ✨
