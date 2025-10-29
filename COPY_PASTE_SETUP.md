# 🎯 Ultra-Simple MongoDB Setup (Copy & Paste)

## 5-Minute Setup for Beginners

### STEP 1: Download MongoDB (2 min)
1. Go to: https://www.mongodb.com/try/download/community
2. Click big blue "Download" button
3. File saves: `mongodb-windows-x86_64-7.0.x.msi`

### STEP 2: Install MongoDB (3 min)
1. Open Downloads folder
2. Double-click the `mongodb-windows-x86_64-7.0.x.msi` file
3. Click "Next" → "Next" → "Next" → "Install" → "Finish"

### STEP 3: Open 3 PowerShell Windows

Open PowerShell 3 times (you can use the same terminal):
- Windows → search "PowerShell"
- Click "Windows PowerShell"
- Repeat 3 times

---

## 🚀 NOW THE COMMANDS

### WINDOW 1: Copy This Exactly

```bash
net start MongoDB
```

Press Enter. Wait 3 seconds. Should show:
```
The MongoDB service is starting.
The MongoDB service has started successfully.
```

**LEAVE THIS WINDOW OPEN**

---

### WINDOW 2: Copy This Exactly

```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\backend"
```

Press Enter. Then copy this:

```bash
.\Scripts\Activate.bat
```

Press Enter. Then copy this:

```bash
python main.py
```

Press Enter. Wait 5 seconds. Should show:
```
Uvicorn running on http://127.0.0.1:8000
```

**LEAVE THIS WINDOW OPEN**

---

### WINDOW 3: Copy This Exactly

```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\frontend-react"
```

Press Enter. Then copy this:

```bash
npm run dev
```

Press Enter. Wait 3 seconds. Should show:
```
➜  Local:   http://localhost:3002/
```

**LEAVE THIS WINDOW OPEN**

---

## ✅ ALL DONE!

Now open your browser and go to:
```
http://localhost:3002
```

You should see the PharmAI website! 🎉

---

## 🧪 Test It Works

1. Click "Sign In" in top right
2. Click "Sign up"
3. Fill in:
   - Name: Your Name
   - Email: any@email.com
   - Password: password123
4. Click "Create Account"
5. Click "Analyze" in navbar
6. Search: "Aspirin"
7. Wait 10 seconds
8. Should show analysis
9. Click "Reports" to see saved reports

---

## 🛑 If Something Goes Wrong

### MongoDB error?
```bash
# Try this:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

### Backend won't start?
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend blank?
```bash
cd frontend-react
npm install
npm run dev
```

### Need to stop everything?
Press **Ctrl+C** in each window

---

## 📍 Where mongod.exe Runs

You run `net start MongoDB` in **ANY PowerShell window**

It doesn't matter where you are in the file system. The `net start` command starts the service globally.

The `mongod.exe` file is automatically in the system path after installation.

---

## 🎓 The Three Services Explained

| Name | What It Does | Port | Status |
|------|-------------|------|--------|
| MongoDB | Stores your data | 27017 | Background service |
| Backend | API that talks to MongoDB | 8000 | Python program |
| Frontend | Website you see | 3002 | React app |

All 3 must run together!

---

## 🔄 Daily Startup (After First Setup)

Each day, just do this in 3 PowerShell windows:

**Window 1:**
```bash
net start MongoDB
```

**Window 2:**
```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\backend"
.\Scripts\Activate.bat
python main.py
```

**Window 3:**
```bash
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai\frontend-react"
npm run dev
```

Then visit: **http://localhost:3002**

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| `net start MongoDB` doesn't work | Install MongoDB first from: https://www.mongodb.com/try/download/community |
| Backend port 8000 already in use | Run: `taskkill /PID XXXX /F` (find PID with: `netstat -ano \| findstr :8000`) |
| Frontend shows blank | Run: `npm install` in frontend-react folder |
| Can't connect to MongoDB | Make sure Window 1 shows "waiting for connections" |

---

## ✨ That's It!

You now have a fully working system with:
- ✅ Database (MongoDB)
- ✅ Backend API (Python/FastAPI)
- ✅ Frontend Website (React)
- ✅ User authentication
- ✅ Report saving

**Start here daily: http://localhost:3002**

Happy coding! 🚀
