# 📊 Reports System - How It Works

## Overview

The Reports System allows authenticated users to save, retrieve, and manage their pharmaceutical analysis reports.

---

## 🔄 Report Generation Flow

### Step 1: User Analyzes a Molecule (HomePage)

1. User enters a molecule name (e.g., "aspirin")
2. Frontend calls `/query_molecule` endpoint
3. Backend Master Agent orchestrates analysis across all agents:
   - 💰 IQVIA Agent → Market data
   - 🏥 Clinical Agent → Trial data
   - 📜 Patent Agent → Patent data
   - 🌐 Web Intelligence Agent → Publication data
   - 🤖 Groq AI → AI insights & recommendations
4. Results displayed in 5 tabs on HomePage

### Step 2: User Saves the Report

**Option A: Save to Account** (Authenticated Users)
1. Click "Save Report" button on HomePage
2. Report is sent to `/api/reports/save` endpoint
3. Backend stores in MongoDB with:
   - `user_id` - Links to logged-in user
   - `molecule_name` - Molecule analyzed
   - `data` - Complete analysis JSON
   - `created_at` - Timestamp
   - `updated_at` - Timestamp
4. User sees "Saved!" confirmation

**Option B: Download Locally** (All Users)
1. Click "Download" button on HomePage
2. Analysis saved as JSON file locally
3. No authentication required

---

## 📁 Database Schema

### Reports Collection

```javascript
{
  _id: ObjectId("..."),
  user_id: "634f5e8b3c8d4f1a2b3c4d5e",  // User's ID from users collection
  molecule_name: "aspirin",
  data: {
    molecule: "aspirin",
    timestamp: "2025-10-29T10:30:00",
    market_data: { /* full market analysis */ },
    clinical_data: { /* full clinical analysis */ },
    patent_data: { /* full patent analysis */ },
    web_data: { /* full web analysis */ },
    ai_insights: "Based on current market trends...",
    recommendations: "Consider repositioning in..."
  },
  created_at: ISODate("2025-10-29T10:30:00.000Z"),
  updated_at: ISODate("2025-10-29T10:30:00.000Z")
}
```

---

## 🛣️ API Endpoints

### Save a Report

```http
POST /api/reports/save
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "molecule_name": "aspirin",
  "data": { /* complete analysis object */ }
}
```

**Response:**
```json
{
  "id": "634f5e8b3c8d4f1a2b3c4d5e",
  "message": "Report saved successfully",
  "user_id": "534e5e8b3c8d4f1a2b3c4d5e"
}
```

### Get User's Reports

```http
GET /api/reports/user-reports
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
[
  {
    "_id": "634f5e8b3c8d4f1a2b3c4d5e",
    "user_id": "534e5e8b3c8d4f1a2b3c4d5e",
    "molecule_name": "aspirin",
    "data": { /* complete analysis */ },
    "created_at": "2025-10-29T10:30:00",
    "updated_at": "2025-10-29T10:30:00"
  },
  // ... more reports
]
```

### Get Specific Report

```http
GET /api/reports/{report_id}
Authorization: Bearer {JWT_TOKEN}
```

### Delete Report

```http
DELETE /api/reports/{report_id}
Authorization: Bearer {JWT_TOKEN}
```

---

## 🎯 User Journey

### 1. **Not Logged In**
```
Search Molecule → View Analysis → Download Locally ✓
                              → Save Report ✗ (Button disabled)
```

### 2. **Logged In**
```
Search Molecule → View Analysis → Download Locally ✓
                              → Save Report ✓ (Saved to account)
                                    ↓
                          Go to Reports Page
                                    ↓
                          View All Saved Reports ✓
                                    ↓
                          Download / Delete Report ✓
```

---

## 💾 Frontend Components

### HomePage.jsx
- Search for molecules
- Display analysis results
- **NEW:** "Save Report" button (only for authenticated users)
- Download as JSON

### ReportsPage.jsx
- Display all user's saved reports
- Delete reports
- Download individual reports
- View report details

### AuthContext.jsx
- Manages JWT token
- Tracks authentication state
- Provides `isAuthenticated`, `token`, `user`

---

## 🔐 Authentication Flow

1. **Login** → User credentials verified → JWT token issued
2. **Store Token** → Saved in browser context
3. **API Calls** → Token sent in `Authorization: Bearer {token}` header
4. **Backend Verification** → Token decoded, user_id extracted
5. **Database Query** → Reports filtered by user_id

---

## ⚙️ Backend Processing

### ReportCreate Schema (schemas.py)
```python
class ReportCreate(BaseModel):
    molecule_name: str
    data: dict
```

### Save Report Handler (routes_reports.py)
```python
@router.post("/save")
async def save_report(report_data: ReportCreate, authorization: Optional[str] = Header(None)):
    user = get_current_user(authorization)
    user_id = str(user["_id"]) if user else None
    
    new_report = {
        "user_id": user_id,
        "molecule_name": report_data.molecule_name,
        "data": report_data.data,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = reports_collection.insert_one(new_report)
    return {"id": str(result.inserted_id), "message": "Report saved successfully"}
```

---

## 🔍 Troubleshooting

### Problem: "Save Report" button is disabled
**Solution:** Log in first. Reports can only be saved by authenticated users.

### Problem: No reports appear in Reports Page
**Solutions:**
1. Make sure you're logged in
2. Make sure you've clicked "Save Report" after analyzing
3. Check browser console for errors
4. Verify MongoDB is running: `net start MongoDB`
5. Check backend logs for database errors

### Problem: "Database not available" error
**Solutions:**
1. Start MongoDB: `net start MongoDB`
2. Check `.env` file has valid `MONGO_URL`
3. Restart backend: `python main.py`

### Problem: "Authentication required" on Reports Page
**Solution:** Your JWT token may have expired (24-hour limit). Log out and log back in.

---

## 🚀 How to Test

### 1. Start the Backend
```bash
cd backend
python main.py
```

### 2. Start MongoDB
```bash
net start MongoDB
```

### 3. Start React Frontend
```bash
cd frontend-react
npm run dev
```

### 4. Test Flow
1. Go to http://localhost:3002
2. Click "Login" → Register new account
3. Search for "aspirin"
4. Click "Save Report"
5. Go to "Reports" page
6. See your saved report

---

## 📊 Data Structure

Reports contain **complete analysis data**:
- Market Size (USD), Growth Rate (%), Regional Breakdown
- Active Clinical Trials, Enrollment Data
- Active Patents, FTO Status, Patent Expiration
- Publications, Web Trends, Sentiment Analysis
- AI-Powered Insights, Strategic Recommendations
- Timestamp of Analysis

All data is **JSON serializable** and can be exported/analyzed externally.

---

## 🔄 Report Lifecycle

```
Created → Stored in MongoDB → Retrieved by User → Downloaded/Deleted
  ↑          with user_id      on Reports Page      when needed
  └──────────────────────────────────────────────────────────────┘
```

---

## 📝 Notes

- Reports are **user-specific** (filtered by user_id)
- Each report includes complete analysis (**not regenerated**)
- Reports are stored **in database** (MongoDB)
- JWT tokens expire after **24 hours**
- Users can **only see/delete their own reports**

