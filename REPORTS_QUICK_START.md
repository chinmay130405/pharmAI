# 🎯 Reports Quick Start

## How Reports Work Now (After Fix)

### The Missing Piece ✨
The **"Save Report" button** on the Analysis page connects your analysis to the database!

---

## 3-Step User Journey

```
1. ANALYZE                    2. SAVE                      3. VIEW
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│ Search Molecule     │      │ Click "Save Report" │      │ Go to Reports Page  │
│ (e.g., aspirin)     │ ───→ │ (Saves to Database) │ ───→ │ See Your Reports    │
│ View Analysis       │      │ (Login Required)    │      │ Download/Delete     │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

---

## Where to Click

### HomePage - After Analysis
```
┌────────────────────────────────────────────────────┐
│  🔬 Aspirin                                   🕐    │
│  [Download] [💾 Save Report] ← NEW BUTTON         │
└────────────────────────────────────────────────────┘
```

- **Download** = Save locally as JSON file
- **Save Report** = Save to your account (need to be logged in)

### Reports Page
```
┌────────────────────────────────────────────────────┐
│  📊 My Reports                                      │
│                                                     │
│  ✓ Aspirin - Oct 29, 2025 [👁️] [💾] [🗑️]           │
│  ✓ Metformin - Oct 28, 2025 [👁️] [💾] [🗑️]        │
│  ✓ Doxycycline - Oct 27, 2025 [👁️] [💾] [🗑️]      │
└────────────────────────────────────────────────────┘
```

- **👁️ Eye** = View details
- **💾 Download** = Save as JSON
- **🗑️ Delete** = Remove from account

---

## Requirements to Save

✅ **MUST BE LOGGED IN**

If not logged in:
- Save Report button will be **grayed out**
- Hover shows: "Log in to save reports"
- Click Login → Create Account or Sign In

---

## What Gets Saved?

Everything! Your complete analysis including:
- 💰 Market size, growth rates, competitors
- 🏥 Clinical trials, enrollment, phases
- 📜 Patents, FTO status, expiration dates
- 🌐 Publications, web trends, sentiment
- 🤖 AI insights from Groq
- 💡 Strategic recommendations

---

## Button States

### 🟢 Ready to Save (Logged In)
```
[💾 Save Report]  ← Click to save
```

### 🔄 Saving...
```
[⏳ Saving...]  ← Wait a moment
```

### ✅ Success!
```
[✓ Saved!]  ← Your report is saved
```

### 🔒 Locked (Not Logged In)
```
[💾 Save Report]  ← Grayed out, won't work
  (tooltip: "Log in to save reports")
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Save button is grayed out | Log in first (click Login in navbar) |
| "Failed to save report" error | Ensure backend is running: `python main.py` |
| No reports in Reports Page | Click "Save Report" after analyzing |
| Reports Page says "Please log in" | Session expired, log in again |
| MongoDB not available error | Start MongoDB: `net start MongoDB` |

---

## Architecture (Behind the Scenes)

```
HomePage                    Backend                  Database
┌─────────────┐      ┌──────────────────┐      ┌───────────────┐
│   Analysis  │      │  /api/reports    │      │ MongoDB       │
│  Display    │ ───→ │  /save endpoint  │ ───→ │ reports       │
│  [Save Btn] │      │  (checks JWT)    │      │ collection    │
└─────────────┘      └──────────────────┘      └───────────────┘
                              ↓
                        User ID extracted
                        from JWT token
```

When you click Save:
1. Frontend sends analysis data to backend
2. Backend extracts your user ID from JWT token
3. Backend saves to MongoDB linked to your user ID
4. Only you can see your reports later

---

## API Calls (For Developers)

### Save a Report
```bash
POST http://localhost:8000/api/reports/save
Headers:
  - Authorization: Bearer {your_jwt_token}
  - Content-Type: application/json
Body:
{
  "molecule_name": "aspirin",
  "data": { /* complete analysis object */ }
}
```

### Get Your Reports
```bash
GET http://localhost:8000/api/reports/user-reports
Headers:
  - Authorization: Bearer {your_jwt_token}
```

### Delete a Report
```bash
DELETE http://localhost:8000/api/reports/{report_id}
Headers:
  - Authorization: Bearer {your_jwt_token}
```

---

## What's New in This Version

| Feature | Before | Now |
|---------|--------|-----|
| Search analyses | ✅ | ✅ |
| View analysis | ✅ | ✅ |
| Download as JSON | ✅ | ✅ |
| **Save to account** | ❌ | ✅ **NEW** |
| **View saved reports** | ❌ | ✅ **NEW** |
| **Delete reports** | ❌ | ✅ **NEW** |

---

## Testing (5 Minute Demo)

1. **Start backend** (terminal 1)
   ```bash
   cd backend && python main.py
   ```

2. **Start MongoDB** (terminal 2)
   ```bash
   net start MongoDB
   ```

3. **Start frontend** (terminal 3)
   ```bash
   cd frontend-react && npm run dev
   ```

4. **Open browser**: http://localhost:3002

5. **Test flow**:
   - [ ] Register account
   - [ ] Search "aspirin"
   - [ ] Click "Save Report" → See "Saved!"
   - [ ] Go to Reports page
   - [ ] See saved report
   - [ ] Download it
   - [ ] Delete it

---

## Key Takeaway

**Before:** Analyses were shown but disappeared when you left the page

**Now:** Analyses are saved to your account and available anytime!

```
Old: View → Close browser → Lost! ❌
New: View → Save → Can access forever! ✅
```

---

**Status: ✅ READY TO USE**

See `REPORTS_SYSTEM.md` for detailed technical documentation.
