# 📊 Reports System - Visual Guide

## Complete User Journey Map

```
                          ┌─────────────────────────┐
                          │   START: User Action    │
                          └────────────┬────────────┘
                                       │
                        ┌──────────────┴──────────────┐
                        │                             │
                    ┌───▼────┐             ┌────▼────┐
                    │ SEARCH  │             │ ACCESS  │
                    │MOLECULE │             │ REPORTS │
                    └───┬────┘             └────┬────┘
                        │                      │
         ┌──────────────▼──────────────┐      │
         │  HOMEPAGE (ANALYSIS VIEW)   │      │
         │                             │      │
         │  [Analyze Results]          │      │
         │  ├─ Market Data            │      │
         │  ├─ Clinical Data          │      │
         │  ├─ Patent Data            │      │
         │  ├─ Web Intelligence       │      │
         │  └─ AI Insights            │      │
         │                             │      │
         │  [Download] [Save Report]  │      │
         └──────────┬──────────────────┘      │
                    │                         │
         ┌──────────┴─────────┐              │
         │                    │              │
    ┌────▼────┐          ┌────▼────┐        │
    │DOWNLOAD │          │ SAVE    │        │
    │(Local)  │          │(Account)│        │
    │         │          │         │        │
    │JSON     │          │   JWT   │        │
    │FILE     │          │  TOKEN  │        │
    │  ▼      │          │   ▼     │        │
    │ Your    │          │ Backend │        │
    │PC/Mac   │          │ API     │        │
    └────┬────┘          └────┬────┘        │
         │                    │             │
         │            ┌───────▼────────┐   │
         │            │  MongoDB       │   │
         │            │ (reports coll)│   │
         │            │ {            │   │
         │            │  user_id: XX  │   │
         │            │  molecule: Y  │   │
         │            │  data: {...}  │   │
         │            │ }            │   │
         │            └───────┬────────┘   │
         │                    │            │
         │            ┌───────▼────────┐   │
         │            │ REPORTS PAGE   │◄──┘
         │            │                │
         │            │ Your Reports   │
         │            │ ├─ Aspirin     │
         │            │ ├─ Metformin   │
         │            │ └─ ...         │
         │            │                │
         │            │ [View][DL][Delete]
         │            └────────────────┘
         │
         └──────────────────────────┐
                                    │
                              ┌─────▼──────┐
                              │  DOWNLOAD  │
                              │   JSON     │
                              │   FILES    │
                              └────────────┘

```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    LOGIN PROCESS                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. User enters email/password                             │
│  2. Frontend sends to /api/auth/login                      │
│  3. Backend checks MongoDB                                 │
│  4. Bcrypt verifies password                               │
│  5. JWT token generated (24-hour expiration)               │
│  6. Token sent to frontend                                 │
│  7. Frontend stores in localStorage                        │
│     ├─ Used in every API request header                    │
│     ├─ Authorization: Bearer {token}                       │
│     └─ Expires after 24 hours (login again)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

```

---

## Save Report Flow (Detailed)

```
USER CLICKS "SAVE REPORT"
         │
         ▼
    ┌────────────────────────────┐
    │ Check: Is user logged in?  │
    └────────────────────────────┘
         │                │
         │ YES            │ NO
         │                │
         ▼                ▼
    ┌─────────┐      ┌──────────────────┐
    │ ENABLE  │      │ DISABLE BUTTON   │
    │ BUTTON  │      │ Show tooltip     │
    └────┬────┘      └──────────────────┘
         │
         ▼
    [Click "Save Report"]
         │
         ▼
    ┌─────────────────────────────────┐
    │ State: saving = true            │
    │ Show: [⏳ Saving...]            │
    └────┬────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────┐
    │ POST /api/reports/save               │
    │ Headers:                             │
    │  - Authorization: Bearer {token}     │
    │ Body:                                │
    │  {                                   │
    │    molecule_name: "aspirin",        │
    │    data: {complete analysis}        │
    │  }                                   │
    └────┬────────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────┐
    │ BACKEND: routes_reports.py           │
    │                                      │
    │ 1. Extract user_id from JWT         │
    │ 2. Validate data                    │
    │ 3. Add timestamp                    │
    │ 4. Insert into MongoDB              │
    │ 5. Return success                   │
    └────┬────────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────┐
    │ MongoDB: reports collection          │
    │                                      │
    │ {                                    │
    │   _id: ObjectId(...),                │
    │   user_id: "user123",                │
    │   molecule_name: "aspirin",         │
    │   data: {...},                       │
    │   created_at: timestamp              │
    │ }                                    │
    └────┬────────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────┐
    │ Return: {id, message, user_id}       │
    └────┬────────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────┐
    │ FRONTEND: handleSaveReport()          │
    │                                      │
    │ 1. Receive success response          │
    │ 2. setSaveSuccess = true             │
    │ 3. Show "✓ Saved!"                   │
    │ 4. Auto-hide after 3 seconds         │
    └──────────────────────────────────────┘

```

---

## Database Schema - Visual

```
┌─────────────────────────────────────────────────┐
│            MongoDB: pharma_agent_ai             │
├─────────────────────────────────────────────────┤
│                                                 │
│  📂 Collections                                 │
│  ├── users                                      │
│  │   ├── _id: ObjectId                         │
│  │   ├── email: string (unique)                │
│  │   ├── username: string                      │
│  │   ├── hashed_password: bcrypt               │
│  │   ├── created_at: timestamp                 │
│  │   └── updated_at: timestamp                 │
│  │                                             │
│  ├── reports ★ NEW DATA STORED HERE ★          │
│  │   ├── _id: ObjectId                         │
│  │   ├── user_id: string (FK to users)         │
│  │   ├── molecule_name: string                 │
│  │   ├── data: { (nested object)               │
│  │   │   ├── molecule: string                  │
│  │   │   ├── market_data: {...}                │
│  │   │   ├── clinical_data: {...}              │
│  │   │   ├── patent_data: {...}                │
│  │   │   ├── web_data: {...}                   │
│  │   │   ├── ai_insights: string               │
│  │   │   └── recommendations: string           │
│  │   }                                         │
│  │   ├── created_at: timestamp                 │
│  │   └── updated_at: timestamp                 │
│  │                                             │
│  └── Indexes                                   │
│      ├── users: email (unique)                │
│      └── reports: (user_id, created_at)       │
│                                                 │
└─────────────────────────────────────────────────┘

```

---

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────┐
│         REACT FRONTEND COMPONENTS               │
├─────────────────────────────────────────────────┤
│                                                 │
│  AuthContext ────────┬──────────────┐          │
│  ├─ isAuthenticated  │              │          │
│  ├─ token            │              │          │
│  ├─ user             │              │          │
│  └─ login/logout     │              │          │
│         │            │              │          │
│         ▼            ▼              ▼          │
│    HomePage      ReportsPage    LoginPage      │
│    [NEW:         [View]         [Signup]       │
│     Save Btn]    [Download]     [Login]        │
│                  [Delete]                      │
│         │            │              │          │
│         └────────┬───┴──────────────┘          │
│                  ▼                             │
│              apiService                       │
│              axios client                      │
│              (auto-adds JWT)                   │
│                  │                             │
└──────────────────┼─────────────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────┐
    │     FASTAPI BACKEND (8000)        │
    │  routes_auth.py                  │
    │  routes_reports.py               │
    │  main.py                         │
    └──────────────────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────┐
    │     MongoDB (27017)              │
    │  users collection                │
    │  reports collection              │
    └──────────────────────────────────┘

```

---

## State Machine - Save Report Button

```
                    ┌──────────────────┐
                    │   APP STARTS     │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  isAuthenticated │
                    │  = false         │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  Button DISABLED │
                    │  (grayed out)    │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │ User clicks Login           │
              │ (in navbar)                 │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼─────────┐
                    │  isAuthenticated │
                    │  = true          │
                    │  token stored    │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  Button ENABLED  │
                    │  (colored)       │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │ User clicks Save Report     │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼─────────┐
                    │  saving = true   │
                    │  Button disabled │
                    │  [⏳ Saving...]  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  API Response OK │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ saveSuccess=true │
                    │ [✓ Saved!]       │
                    └────────┬─────────┘
                             │
                  (auto-clear after 3s)
                             │
                    ┌────────▼─────────┐
                    │ saveSuccess=false│
                    │ Button re-enabled│
                    │ [💾 Save Report] │
                    └──────────────────┘

```

---

## Data Persistence Timeline

```
Timeline of an Analysis Report
═══════════════════════════════════════════════════

TIME    ACTION                  STORAGE
────    ──────                  ───────
10:30   User searches           None yet
10:31   Analysis displayed      Browser memory only
10:32   User clicks Download    Local JSON file ✓
10:33   User clicks Save        ↓
        Backend processes
        MongoDB stores ✓
        
Later...
───────
Next day User opens Reports Page → Query MongoDB → Show reports ✓


Data Locations After Save:
════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  BEFORE: Report existed only in Browser RAM                │
│  ┌─────────────────────────────────────────────────────────┐
│  │ Browser Memory                                          │
│  │ (Lost on refresh/close)                                 │
│  │                                                         │
│  │ ┌──────────────────────────────────────────────────┐   │
│  │ │ Analysis data (displayed on HomePage)           │   │
│  │ │ (Shown in 5 tabs)                               │   │
│  │ │ (Can download as JSON)                          │   │
│  │ │ (Disappears when navigate away)                 │   │
│  │ └──────────────────────────────────────────────────┘   │
│  └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘

              [Click "Save Report"]
                      │
                      ▼

┌─────────────────────────────────────────────────────────────┐
│  AFTER: Report persisted in 2 places                       │
│                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐│
│  │ Browser Memory           │  │ MongoDB                  ││
│  │                          │  │                          ││
│  │ (Still visible on page)  │  │ {                        ││
│  │                          │  │   _id: ...,              ││
│  │ (Will disappear on      │  │   user_id: "user123",    ││
│  │  refresh)                │  │   molecule_name: "...",  ││
│  │                          │  │   data: {...},           ││
│  │                          │  │   created_at: "..."      ││
│  │                          │  │ }                        ││
│  │                          │  │                          ││
│  │                          │  │ (PERSISTENT!)            ││
│  │                          │  │ (Query anytime!)         ││
│  └──────────────────────────┘  └──────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘

```

---

## Error Handling Flowchart

```
User clicks "Save Report"
         │
         ▼
    ┌─────────────┐
    │ Send to API │
    └────┬────────┘
         │
    ┌────┴────────────────────────────┐
    │                                  │
    │ Network?     Database?   Token?  │
    │ │            │           │      │
    ▼ ▼            ▼           ▼      │
 Error? ─────────────────────────┐    │
    │                             │    │
    ▼                             ▼    ▼
 ┌────────────────┐        ┌──────────┐
 │ Show error msg │        │ SUCCESS! │
 │ e.g.:          │        │          │
 │ • Network down │        │ [✓ Saved]│
 │ • DB error     │        └──────────┘
 │ • Invalid data │
 └────────────────┘

```

---

## Key Statistics

| Metric | Value |
|--------|-------|
| **JWT Token TTL** | 24 hours |
| **Password Hashing** | bcrypt (secure) |
| **Save Button Response Time** | <500ms (typical) |
| **Molecules Searchable** | 100+ (mock) or API |
| **Data per Report** | ~5-10 KB JSON |
| **Max Reports per User** | Unlimited |
| **Database** | MongoDB (local/remote) |

---

**Visual guide complete! See other documentation for details.**
