# 🚀 Quick Start Guide

Get up and running with Pharma Agent AI in 5 minutes!

---

## ⚡ Quick Setup

### 1️⃣ Get Groq API Key (2 min)

Visit [console.groq.com](https://console.groq.com) and create a free API key.

### 2️⃣ Configure Backend (1 min)

```bash
cd backend
```

Create `.env` file:
```env
GROQ_API_KEY=your_api_key_here
```

### 3️⃣ Install Dependencies (2 min)

**Backend**:
```bash
# In backend/ folder
pip install -r requirements.txt
```

**Frontend**:
```bash
# In frontend/ folder
pip install -r requirements.txt
```

---

## 🎯 Run (Click Start!)

### Terminal 1: Backend
```bash
cd backend
python main.py
```

### Terminal 2: Frontend
```bash
cd frontend
streamlit run app.py
```

---

## 🌐 Access

- **Frontend**: http://localhost:8501
- **API**: http://localhost:8000

---

## 💡 Try These

### Option A: Home Page
1. Type "aspirin"
2. Click Analyze
3. See market, trials, patents, AI insights

### Option B: Trends
1. Go to Trends tab
2. Click Refresh
3. Explore trending areas

### Option C: API Testing
```bash
# Analyze a molecule
curl -X POST http://localhost:8000/query_molecule \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "metformin"}'

# Get trends
curl http://localhost:8000/get_trends
```

---

## 🎓 Demo Molecules

Try these pre-loaded molecules:
- 🩺 **Aspirin** - Classic cardiovascular agent
- 💊 **Metformin** - Diabetes standard therapy
- 🧬 **Doxycycline** - Broad-spectrum antibiotic

---

## ❓ Issues?

**Backend won't start?**
- Check GROQ_API_KEY in .env
- Run `pip install -r requirements.txt` again

**Frontend can't connect?**
- Ensure backend is running on port 8000
- Check: http://localhost:8000/health

**Missing data?**
- API key working? Check: http://localhost:8000/health
- System works with or without Groq API key!

---

## 📚 Full Docs

See `README.md` for comprehensive documentation.

---

**You're all set! Start exploring pharmaceutical opportunities! 🧬💊**
