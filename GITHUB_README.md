# 🧬 Pharma Agent AI Platform

**An intelligent pharmaceutical research platform for identifying drug repurposing opportunities using Groq AI and MongoDB.**

This project combines a FastAPI backend with multiple AI agents and a React frontend to help pharmaceutical researchers analyze molecular data and identify promising drug candidates.

---

## ✨ Features

- 🤖 **AI-Powered Analysis**: Uses Groq's powerful LLM for pharmaceutical research
- 🔐 **User Authentication**: JWT-based login system with MongoDB
- 📊 **Molecule Analysis**: Search and analyze pharmaceutical molecules
- 💾 **Report Generation**: Save and manage analysis reports
- 🎨 **Modern UI**: React frontend with Tailwind CSS
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Fast API**: FastAPI backend with real-time processing

---

## 🚀 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database for data storage
- **Groq API** - LLM for AI-powered analysis
- **Langchain** - LLM orchestration
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client

---

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB (local or Atlas cloud)
- Groq API key (free from https://console.groq.com)

---

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pharma-agent-ai.git
cd pharma-agent-ai
```

### 2. Setup Backend

```bash
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate  # Windows
source venv/bin/activate  # macOS/Linux

# Install dependencies
cd backend
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your credentials:
# - GROQ_API_KEY
# - MONGO_URL
# - SECRET_KEY
```

### 3. Setup Frontend

```bash
# From project root
cd frontend-react

# Install dependencies
npm install

# Create .env (if needed)
# VITE_API_URL=http://localhost:8000
```

---

## 🗄️ Database Setup

### Option A: Local MongoDB (Recommended for Development)

**Windows:**
```powershell
# Install MongoDB Community Edition
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
net start MongoDB

# Or manually:
mongod.exe
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` with Atlas connection URL

---

## 🚀 Running the Application

You need **3 terminal windows** to run all services:

### Terminal 1: MongoDB
```powershell
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### Terminal 2: Backend
```bash
cd backend
.\venv\Scripts\Activate  # Windows: activate virtual environment

python main.py
# Should show: Uvicorn running on http://0.0.0.0:8000
```

### Terminal 3: Frontend
```bash
cd frontend-react

npm run dev
# Should show: Local: http://localhost:3002/
```

### Access the Application
Open your browser and go to: **http://localhost:3002**

---

## 📖 API Documentation

Once the backend is running, visit: **http://localhost:8000/docs**

This opens the interactive Swagger UI with all API endpoints.

### Key Endpoints

**Authentication:**
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/verify` - Check authentication status
- `POST /api/auth/logout` - Logout

**Reports:**
- `POST /api/reports/save` - Save analysis report
- `GET /api/reports/user-reports` - Get user's reports
- `GET /api/reports/{id}` - Get specific report
- `DELETE /api/reports/{id}` - Delete report
- `PUT /api/reports/{id}` - Update report

**Analysis:**
- `POST /api/analyze` - Analyze molecule (requires auth or guest mode)

---

## 🔐 Authentication

The application supports:
- **Registered Users**: Full features with saved reports
- **Guest Users**: Can use analysis but reports aren't saved

### User Registration
1. Visit http://localhost:3002/login
2. Click "Sign up"
3. Enter name, email, and password
4. Account created instantly with JWT token

### JWT Token
- **24-hour expiration** - Automatically refreshed on login
- **Stored in localStorage** - Persists across page reloads
- **Sent in Authorization header** - For authenticated requests

---

## 📁 Project Structure

```
pharma-agent-ai/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── database.py                # MongoDB connection
│   ├── auth.py                    # Authentication utilities
│   ├── schemas.py                 # Pydantic models
│   ├── routes_auth.py             # Auth endpoints
│   ├── routes_reports.py          # Report endpoints
│   ├── agents/                    # AI agents
│   ├── utils/                     # Utilities
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example               # Environment template
│   └── .env                       # ⚠️ DO NOT COMMIT
│
├── frontend-react/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   └── ...
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── .env.example
└── README.md
```

---

## 🔄 Development Workflow

1. **Make changes** to backend or frontend
2. **Backend auto-restarts** when files change (if using watch mode)
3. **Frontend auto-refreshes** with Vite's hot module replacement
4. **Test in browser** at http://localhost:3002

### Common Development Tasks

**Add Python dependency:**
```bash
cd backend
pip install package-name
pip freeze > requirements.txt
```

**Add Node dependency:**
```bash
cd frontend-react
npm install package-name
```

**Database reset:**
```bash
# MongoDB shell
mongosh
> use pharma_agent_ai
> db.dropDatabase()
```

---

## 🧪 Testing

### Test Backend Endpoints
```bash
# Visit Swagger UI
http://localhost:8000/docs
```

### Test User Registration
1. Go to http://localhost:3002/login
2. Create test account
3. Check Reports page

---

## 📝 Environment Variables

### Backend (.env)
```properties
GROQ_API_KEY=your_key_here
MONGO_URL=mongodb://localhost:27017
DB_NAME=pharma_agent_ai
SECRET_KEY=your_secret_here
```

### Frontend (.env or .env.local)
```properties
VITE_API_URL=http://localhost:8000
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Set `DEBUG=false` in production
- [ ] Setup CORS properly for your domain
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Setup logging and monitoring
- [ ] Database backups enabled

### Deploy to Cloud

**Backend (Render, Heroku, AWS):**
```bash
# Update .env with production values
# Deploy your git repository
```

**Frontend (Vercel, Netlify):**
```bash
# Connect your GitHub repo
# Set build command: npm run build
# Set publish directory: dist
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Make sure MongoDB is running
net start MongoDB  # Windows
sudo systemctl start mongod  # Linux/Mac

# Check connection string in .env
MONGO_URL=mongodb://localhost:27017
```

### Port Already in Use
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill it
taskkill /PID <PID> /F
```

### Backend Won't Start
```bash
# Check all dependencies installed
pip install -r requirements.txt

# Check .env file exists
cp .env.example .env

# Check MongoDB is running
```

### Frontend Won't Load
```bash
# Clear cache
rm -rf node_modules
npm install

# Check backend is running
curl http://localhost:8000/docs
```

---

## 📚 Documentation

- [Backend Setup Guide](./docs/MONGODB_COMPLETE_SETUP.md)
- [API Documentation](http://localhost:8000/docs) (when running)
- [Authentication Architecture](./docs/AUTHENTICATION_SETUP_GUIDE.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- Your Name - Project Creator

---

## 🙏 Acknowledgments

- Groq API for powerful LLM capabilities
- FastAPI for excellent backend framework
- React and Vite for frontend tools
- MongoDB for reliable database
- All open-source contributors

---

## 📞 Support

- **Issues**: Open a GitHub issue for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Email**: your-email@example.com

---

## 🗺️ Roadmap

- [ ] Advanced molecule search
- [ ] Multiple language support
- [ ] Email notifications
- [ ] Report scheduling
- [ ] API rate limiting
- [ ] Admin dashboard
- [ ] Mobile app
- [ ] Real-time collaboration

---

**Made with ❤️ for pharmaceutical research**

---

## Quick Links

- [Groq API](https://console.groq.com)
- [MongoDB](https://www.mongodb.com)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
