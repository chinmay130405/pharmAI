# ⚡ Quick Start Guide - Authentication & MongoDB

## 🚀 Get Running in 5 Minutes

### Step 1: Start MongoDB
```bash
# Windows
mongod.exe

# macOS
mongod

# Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas
```

### Step 2: Configure Backend
```bash
cd backend

# Create .env file with:
echo # Backend/.env
MONGO_URL=mongodb://localhost:27017
DB_NAME=pharma_agent_ai
SECRET_KEY=your-secret-key-change-in-production
GROQ_API_KEY=your-groq-api-key
```

### Step 3: Start Backend
```bash
cd backend
python main.py
# API running at http://localhost:8000
```

### Step 4: Start Frontend
```bash
cd frontend-react
npm run dev
# App running at http://localhost:3002
```

---

## 🎯 Try These

### Create Account
1. Visit http://localhost:3002/login
2. Click "Sign up"
3. Fill in name, email, password
4. ✅ Account created!

### Login
1. Go to /login
2. Enter email and password
3. ✅ You're logged in!

### Save a Report
1. Click "Analyze" in navbar
2. Search for a medicine (e.g., "Aspirin")
3. Create analysis
4. ✅ Report saved automatically!

### View Your Reports
1. Click "Reports" in navbar
2. See all your saved reports
3. Download or delete as needed

---

## 🔑 Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login & get token |
| GET | `/api/auth/verify` | Check auth status |
| GET | `/api/auth/me` | Get user info |
| POST | `/api/reports/save` | Save report |
| GET | `/api/reports/user-reports` | Get all reports |

---

## 📦 What's Included

✅ User registration & login with email validation  
✅ Secure password hashing (bcrypt)  
✅ JWT tokens (24-hour expiration)  
✅ MongoDB for user & report storage  
✅ Beautiful login page  
✅ Reports dashboard  
✅ User profile dropdown  
✅ Optional authentication (works without login)  

---

## 🐛 Troubleshooting

**MongoDB not connecting?**
```bash
# Check MongoDB is running
mongod --version

# Start MongoDB
mongod.exe  # Windows
```

**Backend won't start?**
```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```

**Frontend blank?**
```bash
cd frontend-react
npm install
npm run dev
```

---

## 📚 Full Documentation

- `SETUP_COMPLETE.md` - Full implementation overview
- `AUTHENTICATION_SETUP_GUIDE.md` - Detailed setup & usage
- `.env.example` - Configuration template

---

**That's it! You now have a complete authentication system with MongoDB integration!** 🎉

For production deployment, read `AUTHENTICATION_SETUP_GUIDE.md` for security checklist.
