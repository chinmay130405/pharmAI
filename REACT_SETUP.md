# PharmaAI React Frontend - Setup Instructions

## One-Command Setup

```bash
cd frontend-react && npm install && npm run dev
```

This will:
1. Install all dependencies
2. Start the development server on http://localhost:3000

## Detailed Setup

### Step 1: Navigate to frontend directory
```powershell
cd pharma-agent-ai
cd frontend-react
```

### Step 2: Install dependencies
```powershell
npm install
```

Expected output:
```
added 100+ packages, and audited 150+ packages in 15s
```

### Step 3: Start development server
```powershell
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 200 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

### Step 4: Open in browser
Navigate to http://localhost:3000

## What You Should See

✅ Professional dashboard with:
- Sidebar navigation (collapsible)
- Search bar for molecule analysis
- Quick suggestions (aspirin, metformin, doxycycline)
- Gradient backgrounds and smooth animations
- Responsive design

## Troubleshooting

### Port 3000 already in use
```powershell
npm run dev -- --port 3001
```

### Node modules corrupted
```powershell
Remove-Item node_modules -Recurse -Force
npm install
```

### Module not found errors
```powershell
npm install
npm run dev
```

## Backend Requirements

Make sure your FastAPI backend is running:
```powershell
cd backend
python main.py
```

Should see:
```
INFO:     Started server process
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## First Test

1. Go to http://localhost:3000
2. Type "aspirin" in search
3. Click "Search"
4. You should see complete molecule analysis

If you see an error, check:
- Backend is running on :8000
- GROQ_API_KEY is set in backend/.env
- Check browser console (F12) for errors

## Production Build

```powershell
npm run build
npm run preview
```

## Environment Variables

For production deployment, set:
```
VITE_API_BASE_URL=https://your-api.com
```

## Next Steps

- ✅ Frontend is running
- ✅ Backend is running
- 🎯 Test with example molecules
- 📊 Explore all features
- 📥 Try downloading reports

Enjoy your PharmaAI platform! 🚀
