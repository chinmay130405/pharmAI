# PharmaAI Platform - Complete Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                       │
│                    http://localhost:3000                                    │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    REACT FRONTEND (Vite)                             │  │
│  │                                                                      │  │
│  │  ┌────────────────────────────────────────────────────────────────┐ │  │
│  │  │                   React Components                             │ │  │
│  │  │                                                                │ │  │
│  │  │  ┌──────────────────┐  ┌──────────────────┐                  │ │  │
│  │  │  │     Navbar       │  │     Sidebar      │                  │ │  │
│  │  │  │                  │  │                  │                  │ │  │
│  │  │  │  • Search        │  │  • Navigation    │                  │ │  │
│  │  │  │  • Notifications │  │  • Menu Items    │                  │ │  │
│  │  │  │  • User Profile  │  │  • Branding      │                  │ │  │
│  │  │  └──────────────────┘  └──────────────────┘                  │ │  │
│  │  │                                                                │ │  │
│  │  │  ┌─────────────────────────────────────────────────────────┐ │ │  │
│  │  │  │              PAGES                                       │ │ │  │
│  │  │  │                                                           │ │ │  │
│  │  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │ │ │  │
│  │  │  │  │  HOME PAGE  │  │ TRENDS PAGE │  │REPORTS PAGE│    │ │ │  │
│  │  │  │  │             │  │             │  │             │    │ │ │  │
│  │  │  │  │ • Search    │  │ • Top Areas │  │ • Reports   │    │ │ │  │
│  │  │  │  │ • 5 Tabs    │  │ • Conditions│  │ • Download  │    │ │ │  │
│  │  │  │  │ • Download  │  │ • Web Stats │  │ • Delete    │    │ │ │  │
│  │  │  │  └─────────────┘  └─────────────┘  └─────────────┘    │ │ │  │
│  │  │  └─────────────────────────────────────────────────────────┘ │ │  │
│  │  │                                                                │ │  │
│  │  │  ┌─────────────────────────────────────────────────────────┐ │ │  │
│  │  │  │           SHARED COMPONENTS                             │ │ │  │
│  │  │  │                                                           │ │ │  │
│  │  │  │  • InsightCard   • LoadingSpinner   • Alert              │ │ │  │
│  │  │  │  • Charts        • Tables           • Forms              │ │ │  │
│  │  │  └─────────────────────────────────────────────────────────┘ │ │  │
│  │  │                                                                │ │  │
│  │  └────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                      │  │
│  │  ┌────────────────────────────────────────────────────────────────┐ │  │
│  │  │              STYLING & CONFIGURATION                           │ │  │
│  │  │                                                                │ │  │
│  │  │  • Tailwind CSS 3.4 (Utility-first)                          │ │  │
│  │  │  • Custom pharma color theme                                 │ │  │
│  │  │  • Responsive design (mobile-first)                          │ │  │
│  │  │  • PostCSS processing                                         │ │  │
│  │  │  • Autoprefixer                                              │ │  │
│  │  └────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS/HTTP
                                      │ Axios Requests
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FASTAPI BACKEND                                    │
│                    http://localhost:8000                                    │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    MAIN APPLICATION (main.py)                        │  │
│  │                                                                      │  │
│  │  • 25+ REST API Endpoints                                           │  │
│  │  • CORS enabled for React frontend                                  │  │
│  │  • Error handling & validation                                      │  │
│  │  • Request logging                                                  │  │
│  │  • Swagger UI (http://localhost:8000/docs)                          │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │              MASTER AGENT (Orchestrator)                     │  │  │
│  │  │                                                               │  │  │
│  │  │  Coordinates data from all worker agents:                   │  │  │
│  │  │  1. IQVIA Agent (Market Intelligence)                       │  │  │
│  │  │  2. Clinical Agent (Trial Data)                             │  │  │
│  │  │  3. Patent Agent (IP Analysis)                              │  │  │
│  │  │  4. WebIntel Agent (Trends & Publications)                 │  │  │
│  │  │  5. Report Agent (PDF/JSON Generation)                     │  │  │
│  │  │                                                               │  │  │
│  │  │  Generates unified summaries using Groq AI                  │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                GROQ LLM CLIENT (AI Analysis)                 │  │  │
│  │  │                                                               │  │  │
│  │  │  • API: https://console.groq.com                             │  │  │
│  │  │  • Model: llama-3.1-8b-instant                              │  │  │
│  │  │  • Methods:                                                  │  │  │
│  │  │    - query() - Generic LLM queries                           │  │  │
│  │  │    - summarize() - Content summarization                    │  │  │
│  │  │    - analyze_drug_potential() - Drug analysis              │  │  │
│  │  │    - generate_insights() - Complex synthesis               │  │  │
│  │  │                                                               │  │  │
│  │  │  • Error handling with graceful fallbacks                    │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                   MOCK DATA SYSTEM                            │  │  │
│  │  │                                                               │  │  │
│  │  │  Complete pharmaceutical databases:                         │  │  │
│  │  │  • 3 Main Molecules (Aspirin, Metformin, Doxycycline)      │  │  │
│  │  │  • 100+ Data Points (Markets, Trials, Patents)             │  │  │
│  │  │  • Auto-generation for Unknown Molecules                   │  │  │
│  │  │                                                               │  │  │
│  │  │  ├─ IQVIA Data: Market size, growth, competitors           │  │  │
│  │  │  ├─ Clinical: 6+ trials, enrollment data                   │  │  │
│  │  │  ├─ Patents: 10+ patents, FTO assessment                   │  │  │
│  │  │  └─ WebIntel: 80+ publications, trends                     │  │  │
│  │  │                                                               │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
USER INPUT
    │
    ├─ Search Molecule
    │
    ▼
┌─────────────────────────────────┐
│  React Frontend (HomePage)      │
│  • Validates input               │
│  • Shows loading spinner         │
└─────────────────────────────────┘
    │
    │ POST /query_molecule?molecule_name=X
    │
    ▼
┌─────────────────────────────────┐
│  FastAPI Backend (main.py)      │
│  • Receives request              │
│  • Calls Master Agent            │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  Master Agent (Orchestrator)    │
│  • Coordinates 5 agents          │
│  • Aggregates data               │
└─────────────────────────────────┘
    │
    ├─────────────┬─────────────┬──────────────┬──────────────┐
    │             │             │              │              │
    ▼             ▼             ▼              ▼              ▼
   IQVIA      Clinical      Patent        WebIntel       Report
   Agent      Agent         Agent          Agent          Agent
    │             │             │              │              │
    │ Market  │ Trials  │ Patents  │ Publications │ (Aggregated)
    │ Data    │ Data    │ Data     │ Trends      │
    │             │             │              │
    └─────────────┴─────────────┴──────────────┴──────────────┘
                          │
                          ▼
                  ┌──────────────────────┐
                  │ Groq LLM Client      │
                  │ • Analyzes data      │
                  │ • Generates insights │
                  │ • Creates recs       │
                  └──────────────────────┘
                          │
                          ▼
                  ┌──────────────────────┐
                  │ Aggregated Response  │
                  │ • Market data        │
                  │ • Clinical data      │
                  │ • Patent data        │
                  │ • Web trends         │
                  │ • AI Insights        │
                  │ • Recommendations    │
                  └──────────────────────┘
                          │
                          │ JSON Response
                          │
                          ▼
                  ┌──────────────────────┐
                  │ React Frontend       │
                  │ • Displays data      │
                  │ • Shows 5 tabs       │
                  │ • Renders charts     │
                  │ • Enables downloads  │
                  └──────────────────────┘
                          │
                          ▼
                  USER SEES ANALYSIS
```

## API Endpoints

```
MOLECULE ANALYSIS
  GET /query_molecule?molecule_name=aspirin
    └─ Returns: Complete analysis with all data

TRENDS & INTELLIGENCE
  GET /get_trends
    └─ Returns: Market trends and insights

REPORTING
  POST /generate_report
    └─ Body: {molecule_name, analysis_data}
    └─ Returns: JSON report

  POST /generate_report_pdf
    └─ Body: {molecule_name, analysis_data}
    └─ Returns: PDF file (blob)

BATCH PROCESSING
  POST /batch_analyze
    └─ Body: {molecules: [list]}
    └─ Returns: Multiple analyses

HEALTH CHECK
  GET /health
    └─ Returns: {"status": "ok"}

API DOCUMENTATION
  GET /docs
    └─ Swagger UI (Interactive)
```

## Deployment Architecture

```
PRODUCTION DEPLOYMENT
├─ Frontend (React)
│  ├─ Build: npm run build
│  ├─ Output: dist/ folder
│  ├─ Deploy: Vercel, Netlify, AWS S3
│  └─ CDN: Cloudflare
│
├─ Backend (FastAPI)
│  ├─ Container: Docker
│  ├─ Orchestration: Docker Compose / Kubernetes
│  ├─ Deploy: AWS EC2, Google Cloud, Heroku
│  └─ Load Balancer: Nginx
│
└─ Database
   ├─ Real Data: PostgreSQL / MongoDB
   ├─ Cache: Redis
   └─ Storage: S3 / GCS

ENVIRONMENT VARIABLES
├─ GROQ_API_KEY (Backend)
├─ VITE_API_BASE_URL (Frontend)
├─ DATABASE_URL (Backend)
└─ Other config vars
```

## Component Hierarchy

```
App (Root)
├─ Navbar
│  ├─ Search input
│  ├─ Notifications
│  └─ User menu
│
├─ Sidebar
│  ├─ Logo
│  ├─ Navigation links
│  │  ├─ Home
│  │  ├─ Trends
│  │  └─ Reports
│  └─ Footer info
│
└─ Router (Routes)
   ├─ HomePage
   │  ├─ Search section
   │  ├─ Key metrics (4 cards)
   │  │  ├─ InsightCard (Market)
   │  │  ├─ InsightCard (Growth)
   │  │  ├─ InsightCard (Trials)
   │  │  └─ InsightCard (Patents)
   │  ├─ Therapeutic area
   │  ├─ Tabs section
   │  │  ├─ Overview tab
   │  │  ├─ Clinical tab
   │  │  ├─ Patent tab
   │  │  ├─ Web tab
   │  │  └─ Insights tab
   │  ├─ LoadingSpinner (when loading)
   │  ├─ Alert (on error)
   │  └─ Charts (conditionally)
   │
   ├─ TrendsPage
   │  ├─ Top therapeutic areas
   │  ├─ Trending conditions
   │  ├─ Web trends
   │  ├─ Market insights
   │  ├─ LoadingSpinner
   │  └─ Alert
   │
   └─ ReportsPage
      ├─ Reports table
      ├─ Delete button
      ├─ Download button
      └─ Summary stats

STYLING SYSTEM
├─ Tailwind CSS (Global)
├─ Custom classes (index.css)
│  ├─ .btn-primary
│  ├─ .btn-secondary
│  ├─ .card
│  ├─ .card-accent
│  └─ .section-title
├─ Color palette (pharma-50 to pharma-900)
└─ Responsive breakpoints (sm, md, lg, xl)
```

## State Management Flow

```
HomePage Component
├─ State
│  ├─ moleculeName (text input)
│  ├─ loading (boolean)
│  ├─ data (API response)
│  ├─ error (error message)
│  └─ activeTab (current tab)
│
├─ Effects
│  └─ None (data fetched on search)
│
└─ Event Handlers
   ├─ handleSearch (fetch API)
   ├─ handleDownloadJSON
   └─ setActiveTab (tab switching)

TrendsPage Component
├─ State
│  ├─ data (API response)
│  ├─ loading (boolean)
│  └─ error (error message)
│
├─ Effects
│  └─ useEffect(() => fetchTrends(), [])
│     └─ Runs on component mount
│
└─ Event Handlers
   └─ fetchTrends (fetch API)
```

## Error Handling Strategy

```
ERROR TYPES
├─ Network Errors
│  ├─ Backend down
│  ├─ API timeout
│  └─ CORS issues
│  └─ Resolution: Show alert, retry button
│
├─ API Errors
│  ├─ Invalid molecule
│  ├─ Missing data
│  └─ Server error
│  └─ Resolution: Show error message
│
├─ Validation Errors
│  ├─ Empty input
│  ├─ Invalid format
│  └─ Resolution: Disable button, show hint
│
└─ UI Errors
   ├─ Missing data
   ├─ Render errors
   └─ Resolution: Show fallback UI
```

---

This architecture ensures:
✅ Clean separation of concerns
✅ Scalability and maintainability
✅ Professional user experience
✅ Robust error handling
✅ Performance optimization
✅ Easy deployment
