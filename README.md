# 🧬 Pharma Agent AI Platform

**An Agentic AI system for identifying innovative drug repurposing opportunities in pharmaceuticals.**

This project combines multiple intelligent agents with Groq's powerful LLM to analyze pharmaceutical research data from market intelligence, clinical trials, patents, and web sources to identify promising drug repurposing candidates.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Guide](#frontend-guide)
- [Architecture](#architecture)
- [Mock Data](#mock-data)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**Pharma Agent AI** is an intelligent platform that helps pharmaceutical researchers identify drug repurposing opportunities by:

1. **Gathering Intelligence** from multiple sources:
   - 💰 Market data (IQVIA-like)
   - 🏥 Clinical trial information (ClinicalTrials.gov-like)
   - 📜 Patent landscapes and freedom-to-operate analysis
   - 🌐 Scientific publications and web trends

2. **Orchestrating Agent Workflows** to coordinate parallel analysis across different research domains

3. **Generating AI Insights** using Groq's powerful LLMs to synthesize complex data into actionable recommendations

4. **Providing Interactive UI** through Streamlit for easy exploration and report generation

---

## 📁 Project Structure

```
pharma-agent-ai/
│
├── backend/
│   ├── main.py                          # FastAPI application entry point
│   ├── requirements.txt                 # Python dependencies
│   ├── .env                             # Environment variables (GROQ_API_KEY)
│   ├── .env.example                     # Example .env file
│   │
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── master_agent.py              # Orchestrates all agents
│   │   ├── iqvia_agent.py               # Market intelligence agent
│   │   ├── clinical_agent.py            # Clinical trials agent
│   │   ├── patent_agent.py              # Patent analysis agent
│   │   ├── webintel_agent.py            # Web intelligence agent
│   │   └── report_agent.py              # Report generation agent
│   │
│   └── utils/
│       ├── __init__.py
│       └── groq_client.py               # Groq API wrapper
│
├── frontend/
│   ├── app.py                           # Main Streamlit application
│   ├── requirements.txt                 # Frontend dependencies
│   └── pages/                           # (Optional) For multi-page apps
│
└── README.md                            # This file

```

---

## ✨ Features

### 🔬 Comprehensive Analysis
- **Multi-source intelligence** integration
- **AI-powered synthesis** of complex data
- **Actionable insights** for R&D teams

### 📊 Interactive Dashboard
- **Home Page**: Query molecules for comprehensive analysis
- **Trends Page**: Explore trending therapeutic areas
- **Reports Page**: Download generated reports

### 📈 Market Intelligence
- Market size and growth rates
- Regional breakdown analysis
- Competitive landscape assessment

### 🏥 Clinical Development
- Active clinical trials tracking
- Enrollment statistics
- Therapeutic area trends

### 📜 Patent Analysis
- Patent portfolio assessment
- Freedom-to-operate analysis
- Expiration timeline tracking

### 🌐 Scientific Intelligence
- Publication searching and analysis
- Web trend monitoring
- Sentiment analysis on therapeutic areas

### 🤖 AI-Powered Insights
- Drug repurposing opportunity identification
- Strategic recommendations
- Trend analysis and forecasting

---

## 🚀 Installation

### Prerequisites
- Python 3.9+
- pip (Python package manager)
- Groq API key (get it from [Groq Console](https://console.groq.com))

### Step 1: Clone or Navigate to Project

```bash
cd pharma-agent-ai
```

### Step 2: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Set Up Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Get Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Create an API key
4. Copy the key for next step

---

## ⚙️ Configuration

### Setting Environment Variables

#### Option A: Edit .env file (Recommended)

1. Navigate to `backend/` directory
2. Open or create `.env` file
3. Add your Groq API key:

```env
GROQ_API_KEY=your_actual_groq_api_key_here
```

#### Option B: System Environment Variable

```bash
# Windows (PowerShell)
$env:GROQ_API_KEY="your_groq_api_key_here"

# Windows (Command Prompt)
set GROQ_API_KEY=your_groq_api_key_here

# macOS/Linux
export GROQ_API_KEY="your_groq_api_key_here"
```

---

## 🎬 Running the Application

### Terminal 1: Start Backend API

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment if needed
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run FastAPI server
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Terminal 2: Start Frontend

```bash
# Navigate to frontend directory
cd frontend

# Run Streamlit app
streamlit run app.py
```

Expected output:
```
You can now view your Streamlit app in your browser.

Local URL: http://localhost:8501
Network URL: http://your-ip:8501
```

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:8501
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Swagger UI)

---

## 📚 API Documentation

### Base URL
```
http://localhost:8000
```

### Health & Info Endpoints

#### Get Health Status
```http
GET /health
```
Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-10-29T10:30:00.000000",
  "groq_configured": true
}
```

---

### Query Endpoints

#### Analyze Molecule
```http
POST /query_molecule
Content-Type: application/json

{
  "molecule_name": "aspirin",
  "include_insights": true
}
```

Response includes:
- Market data (size, growth, competitors)
- Clinical trials information
- Patent landscape
- Web intelligence and publications
- AI-generated insights and recommendations

---

#### Get Trends
```http
GET /get_trends
```

Returns trending therapeutic areas, molecules, and clinical conditions with AI analysis.

---

### Agent-Specific Endpoints

#### Market Intelligence
```http
GET /market_data/{molecule_name}
```

#### Clinical Trials
```http
GET /clinical_trials/{molecule_name}
```

#### Patent Data
```http
GET /patent_data/{molecule_name}
```

#### Freedom to Operate
```http
GET /freedom_to_operate/{molecule_name}
```

#### Web Publications
```http
GET /web_publications/{molecule_name}?limit=10
```

#### Web Trends
```http
GET /web_trends/{keyword}
```

---

### Report Generation

#### Generate JSON Report
```http
POST /generate_report
Content-Type: application/json

{
  "molecule_name": "aspirin"
}
```

#### Download PDF Report
```http
GET /generate_report_pdf/{molecule_name}
```

#### Get Saved Reports
```http
GET /saved_reports
```

---

### Batch Analysis

#### Analyze Multiple Molecules
```http
POST /batch_analyze
Content-Type: application/json

["aspirin", "metformin", "doxycycline"]
```

---

## 🎨 Frontend Guide

### Home Page 🏠
1. **Enter a molecule name** in the search box
2. **Click "Analyze"** or use quick suggestion buttons
3. **View comprehensive analysis** in tabs:
   - 📊 Market: Market size, growth, competitors, regional data
   - 🏥 Trials: Clinical trial details and enrollment
   - 📜 Patents: Patent portfolio and FTO analysis
   - 🌐 Web: Recent publications and scientific trends
   - 💡 Insights: AI-generated insights and recommendations
4. **Download reports** as JSON

### Trends Page 📈
- **Market Trends**: Top therapeutic areas by market size and growth
- **Clinical Trends**: Most actively researched conditions
- **Web Trends**: Trending topics in scientific literature
- **AI Summary**: Analysis of emerging opportunities

### Reports Page 📊
- **View all saved reports** with metadata
- **Download reports** (JSON format)
- **Track analysis history**

---

## 🏗️ Architecture

### Agent System

```
┌─────────────────────────────────────────────────────┐
│              MASTER AGENT (Orchestrator)             │
│  Coordinates all agents, aggregates data, AI synthesis│
└────┬─────────┬─────────┬──────────────┬─────────────┘
     │         │         │              │
     ▼         ▼         ▼              ▼
┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐
│  IQVIA  │ │CLINICAL  │ │ PATENT │ │ WEB INTL │
│ Agent   │ │ Agent    │ │ Agent  │ │ Agent    │
└─────────┘ └──────────┘ └────────┘ └──────────┘
     │         │         │              │
     └─────────┼─────────┼──────────────┘
               │
               ▼
        ┌─────────────────┐
        │  REPORT AGENT   │
        │ (PDF/JSON Gen)  │
        └─────────────────┘
```

### Data Flow

```
Streamlit Frontend
       │
       ▼
   FastAPI Backend
       │
   ┌───┴─────────────────────┐
   │                         │
   ▼                         ▼
Groq LLM            Master Agent
(AI Synthesis)      (Orchestration)
                        │
                  ┌─────┼─────┬─────────┐
                  ▼     ▼     ▼         ▼
              IQVIA Clinical Patent  Web Intel
              Agent  Agent    Agent    Agent
                  │     │     │         │
                  └─────┴─────┴─────────┘
                        │
                        ▼
                   Mock Data Sources
```

---

## 🗂️ Mock Data

The system includes comprehensive mock data for demonstration:

### IQVIA Agent (Market Data)
- **Molecules**: aspirin, metformin, doxycycline
- **Data**: Market size, growth rates, competitors, regional breakdown
- **Fallback**: Generic data for unknown molecules

### Clinical Agent (Trials)
- **Trials**: 6 example trials across multiple conditions
- **Data**: Trial ID, status, phase, enrollment, sponsor
- **Fallback**: Auto-generated trial data

### Patent Agent
- **Patents**: 10+ example patents with various statuses
- **Data**: Patent ID, expiration dates, assignees, FTO scores
- **Fallback**: Generic patent data

### Web Intel Agent (Publications & Trends)
- **Publications**: Example scientific papers with citations
- **Trends**: 5 therapeutic areas with trend directions
- **Data**: Mentions, sentiment, media coverage, innovation index
- **Fallback**: Plausible generated data

### Groq AI Integration
- Generates unique insights for each molecule
- Synthesizes complex multi-source data
- Provides strategic recommendations
- *Note: Requires valid GROQ_API_KEY in .env*

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
cd backend
pip install -r requirements.txt
```

---

### Frontend Can't Connect to Backend

**Error**: "❌ Cannot connect to backend"

**Solution**:
1. Ensure backend is running on http://localhost:8000
2. Check backend terminal for errors
3. Verify no firewall is blocking port 8000
4. Try: `python backend/main.py`

---

### Groq API Key Error

**Error**: "GROQ_API_KEY not found"

**Solution**:
1. Get API key from https://console.groq.com
2. Add to `backend/.env`:
   ```env
   GROQ_API_KEY=your_key_here
   ```
3. Restart backend: `python backend/main.py`

---

### Empty Analysis Results

**Cause**: GROQ_API_KEY not set (but analysis still works with mock data)

**Solution**: Set GROQ_API_KEY for AI-powered insights, or continue with mock data analysis

---

### Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use different port:
python -m uvicorn main:app --port 8001
```

---

## 📝 Example Workflows

### Workflow 1: Quick Molecule Analysis

1. Start backend and frontend
2. Go to Home page
3. Click "Aspirin" button
4. Review market, trials, patents, publications
5. Read AI insights
6. Download JSON report

### Workflow 2: Explore Trends

1. Go to Trends page
2. Click "Refresh Trends"
3. Review market trends by therapeutic area
4. Check trending clinical conditions
5. Read AI summary

### Workflow 3: Batch Analysis

Using backend API:
```bash
curl -X POST http://localhost:8000/batch_analyze \
  -H "Content-Type: application/json" \
  -d '["aspirin", "metformin", "doxycycline"]'
```

---

## 🔐 Security Considerations

- **API Keys**: Never commit .env files to version control
- **CORS**: Currently set to allow all origins (update for production)
- **Rate Limiting**: Not implemented (add for production)
- **Authentication**: Not implemented (add for production)
- **Data Privacy**: Mock data only (real data needs compliance)

---

## 🚀 Future Enhancements

- [ ] Database integration for report persistence
- [ ] Real API integrations (IQVIA, ClinicalTrials.gov, USPTO)
- [ ] Advanced sentiment analysis
- [ ] Machine learning model for opportunity scoring
- [ ] Multi-user authentication
- [ ] Real-time data updates
- [ ] Export to multiple formats (Excel, PowerPoint)
- [ ] Custom analysis templates
- [ ] Collaboration features
- [ ] Mobile application

---

## 📄 License

MIT License - Feel free to use and modify

---

## 👥 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 💬 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review API documentation
3. Check backend logs for detailed errors

---

## 🙏 Acknowledgments

- **Groq** for powerful LLM API
- **FastAPI** for robust backend framework
- **Streamlit** for interactive frontend
- **ReportLab** for PDF generation
- Open-source pharmaceutical research community

---

**Happy researching! 🧬💊🔬**
