# 🧪 API Testing Guide

Complete guide for testing Pharma Agent AI Platform endpoints.

---

## 📋 Table of Contents

1. [Setup](#setup)
2. [Health Checks](#health-checks)
3. [Molecule Analysis](#molecule-analysis)
4. [Trends](#trends)
5. [Market Data](#market-data)
6. [Clinical Trials](#clinical-trials)
7. [Patent Data](#patent-data)
8. [Reports](#reports)
9. [Batch Operations](#batch-operations)

---

## 🔧 Setup

### Using cURL (Command Line)

```bash
# Set base URL
set BASE_URL=http://localhost:8000

# Or on macOS/Linux:
export BASE_URL=http://localhost:8000
```

### Using Postman

1. Import API: http://localhost:8000/docs
2. Use Swagger UI for interactive testing
3. Or manually create requests

### Using Python

```python
import requests

BASE_URL = "http://localhost:8000"

# Example
response = requests.get(f"{BASE_URL}/health")
print(response.json())
```

---

## ✅ Health Checks

### 1. Basic Health Check

```bash
curl -X GET http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-10-29T10:30:00.000000",
  "groq_configured": true
}
```

---

### 2. API Info

```bash
curl -X GET http://localhost:8000/
```

**Expected Response:**
```json
{
  "status": "active",
  "platform": "Pharmaceutical Agent AI",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "query_molecule": "/query_molecule",
    ...
  }
}
```

---

## 🔬 Molecule Analysis

### 1. Query Molecule (POST)

```bash
curl -X POST http://localhost:8000/query_molecule \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "aspirin", "include_insights": true}'
```

**Response includes:**
- Market data (size, growth, competitors)
- Clinical trials information
- Patent landscape
- Web intelligence
- AI-generated insights
- Recommendations

---

### 2. Query Molecule (GET)

```bash
curl -X GET http://localhost:8000/query_molecule/metformin
```

---

### 3. Example: Test All Molecules

**Aspirin:**
```bash
curl -X POST http://localhost:8000/query_molecule \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "aspirin"}'
```

**Metformin:**
```bash
curl -X POST http://localhost:8000/query_molecule \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "metformin"}'
```

**Doxycycline:**
```bash
curl -X POST http://localhost:8000/query_molecule \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "doxycycline"}'
```

---

## 📈 Trends

### 1. Get All Trends

```bash
curl -X GET http://localhost:8000/get_trends
```

**Response includes:**
- Market trends by therapeutic area
- Clinical trending conditions
- Web trends and publications
- AI-generated trend summary

---

### 2. Get Therapeutic Areas

```bash
curl -X GET http://localhost:8000/therapeutic_areas
```

---

### 3. Get Trending Conditions

```bash
curl -X GET http://localhost:8000/trending_conditions
```

---

### 4. Get Market Trends

```bash
curl -X GET http://localhost:8000/market_trends
```

---

## 💰 Market Data

### 1. Get IQVIA Market Data

```bash
curl -X GET http://localhost:8000/market_data/aspirin
```

**Response:**
```json
{
  "molecule": "aspirin",
  "market_size_usd": 2100000000,
  "market_size_units": 5300000000,
  "growth_rate": 0.03,
  "therapeutic_area": "Cardiovascular",
  "top_competitors": [...],
  "regions": {...}
}
```

---

### 2. Test Market Data for Different Molecules

```bash
# Metformin
curl -X GET http://localhost:8000/market_data/metformin

# Doxycycline
curl -X GET http://localhost:8000/market_data/doxycycline

# Unknown molecule
curl -X GET http://localhost:8000/market_data/unknown_drug
```

---

## 🏥 Clinical Trials

### 1. Get Clinical Trials

```bash
curl -X GET http://localhost:8000/clinical_trials/aspirin
```

**Response:**
```json
{
  "molecule": "aspirin",
  "trials_count": 2,
  "trials": [
    {
      "trial_id": "NCT04123456",
      "title": "Trial Title",
      "status": "Active, not recruiting",
      "phase": "Phase 3",
      "enrollment": 3500,
      ...
    }
  ]
}
```

---

### 2. Get Trial Summary

```bash
curl -X GET http://localhost:8000/clinical_trials/metformin
```

---

## 📜 Patent Data

### 1. Get Patent Data

```bash
curl -X GET http://localhost:8000/patent_data/aspirin
```

**Response:**
```json
{
  "molecule": "aspirin",
  "total_patents": 2,
  "active_patents": 1,
  "expired_patents": 1,
  "patents": [...]
}
```

---

### 2. Get Freedom-to-Operate Analysis

```bash
curl -X GET http://localhost:8000/freedom_to_operate/aspirin
```

**Response:**
```json
{
  "molecule": "aspirin",
  "fto_assessment": "Low - No active patents detected",
  "fto_score": 0.1,
  "active_patent_count": 1,
  "recommendation": "Consider generic entry"
}
```

---

### 3. Test FTO for Different Molecules

```bash
# Metformin (has active patents)
curl -X GET http://localhost:8000/freedom_to_operate/metformin

# Doxycycline (expired patents)
curl -X GET http://localhost:8000/freedom_to_operate/doxycycline

# Unknown molecule
curl -X GET http://localhost:8000/freedom_to_operate/new_drug
```

---

## 🌐 Web Intelligence

### 1. Get Publications

```bash
curl -X GET http://localhost:8000/web_publications/aspirin
```

**Response:**
```json
{
  "molecule": "aspirin",
  "total_publications_found": 2,
  "publications": [
    {
      "title": "Paper Title",
      "journal": "Journal Name",
      "year": 2023,
      "citations": 250,
      "relevance": 0.95
    }
  ]
}
```

---

### 2. Get Publications with Limit

```bash
# Get 5 publications
curl -X GET "http://localhost:8000/web_publications/metformin?limit=5"

# Get 10 publications
curl -X GET "http://localhost:8000/web_publications/doxycycline?limit=10"
```

---

### 3. Get Web Trends

```bash
curl -X GET http://localhost:8000/web_trends/oncology
```

**Response:**
```json
{
  "keyword": "oncology",
  "trend": "Rising",
  "mentions_per_week": 2500,
  "sentiment": "Positive",
  "key_focus": ["Immunotherapy", "CAR-T cells", ...],
  "recent_publications": 450,
  "media_coverage": "High"
}
```

---

### 4. Test Different Keywords

```bash
# Therapeutic areas
curl -X GET http://localhost:8000/web_trends/oncology
curl -X GET http://localhost:8000/web_trends/cns
curl -X GET http://localhost:8000/web_trends/respiratory
curl -X GET http://localhost:8000/web_trends/cardiovascular

# Molecules
curl -X GET http://localhost:8000/web_trends/aspirin
curl -X GET http://localhost:8000/web_trends/metformin
```

---

## 📊 Reports

### 1. Generate JSON Report

```bash
curl -X POST http://localhost:8000/generate_report \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "aspirin"}' \
  > report_aspirin.json
```

---

### 2. Get Saved Reports

```bash
curl -X GET http://localhost:8000/saved_reports
```

**Response:**
```json
{
  "total_reports": 3,
  "reports": [
    {
      "molecule": "aspirin",
      "report_path": "...",
      "generated_date": "2024-10-29T...",
      "report_id": "..."
    }
  ]
}
```

---

### 3. Download PDF Report (Browser)

```
http://localhost:8000/generate_report_pdf/aspirin
```

Or via curl:
```bash
curl -X GET http://localhost:8000/generate_report_pdf/metformin \
  --output report_metformin.pdf
```

---

### 4. Generate Report for Each Molecule

```bash
# Aspirin
curl -X POST http://localhost:8000/generate_report \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "aspirin"}' > report_aspirin.json

# Metformin
curl -X POST http://localhost:8000/generate_report \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "metformin"}' > report_metformin.json

# Doxycycline
curl -X POST http://localhost:8000/generate_report \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": "doxycycline"}' > report_doxycycline.json
```

---

## 🔄 Batch Operations

### 1. Batch Analyze Multiple Molecules

```bash
curl -X POST http://localhost:8000/batch_analyze \
  -H "Content-Type: application/json" \
  -d '["aspirin", "metformin", "doxycycline"]'
```

**Response:**
```json
{
  "timestamp": "2024-10-29T...",
  "molecules_analyzed": 3,
  "results": {
    "aspirin": {...},
    "metformin": {...},
    "doxycycline": {...}
  }
}
```

---

### 2. Test Error Handling

```bash
# Empty molecule name
curl -X POST http://localhost:8000/query_molecule \
  -H "Content-Type: application/json" \
  -d '{"molecule_name": ""}'

# Expected: 400 Bad Request

# Empty batch
curl -X POST http://localhost:8000/batch_analyze \
  -H "Content-Type: application/json" \
  -d '[]'

# Expected: 400 Bad Request
```

---

## 🐍 Python Test Script

```python
import requests
import json
from pprint import pprint

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("Testing health...")
    response = requests.get(f"{BASE_URL}/health")
    pprint(response.json())
    print()

def test_molecule_query(molecule):
    """Test molecule query"""
    print(f"Testing molecule query for {molecule}...")
    response = requests.post(
        f"{BASE_URL}/query_molecule",
        json={"molecule_name": molecule}
    )
    data = response.json()
    print(f"Market Size: ${data.get('market_data', {}).get('market_size_usd', 0):,.0f}")
    print(f"Trials: {data.get('clinical_data', {}).get('trials_count', 0)}")
    print(f"Patents: {data.get('patent_data', {}).get('total_patents', 0)}")
    print()

def test_trends():
    """Test trends endpoint"""
    print("Testing trends...")
    response = requests.get(f"{BASE_URL}/get_trends")
    data = response.json()
    print(f"Market Trends: {len(data.get('market_trends', []))} areas")
    print(f"Clinical Trends: {len(data.get('clinical_trends', []))} conditions")
    print()

def test_batch_analyze():
    """Test batch analysis"""
    print("Testing batch analysis...")
    molecules = ["aspirin", "metformin", "doxycycline"]
    response = requests.post(
        f"{BASE_URL}/batch_analyze",
        json=molecules
    )
    data = response.json()
    print(f"Analyzed {data.get('molecules_analyzed', 0)} molecules")
    print()

# Run tests
if __name__ == "__main__":
    try:
        test_health()
        test_molecule_query("aspirin")
        test_molecule_query("metformin")
        test_trends()
        test_batch_analyze()
        print("✅ All tests passed!")
    except Exception as e:
        print(f"❌ Error: {e}")
```

---

## 🎯 Test Checklist

### Health & Info
- [ ] GET /health returns 200
- [ ] GET / returns platform info
- [ ] groq_configured shows correct status

### Molecule Analysis
- [ ] POST /query_molecule works
- [ ] GET /query_molecule/{name} works
- [ ] Contains market, clinical, patent, web data
- [ ] Contains AI insights
- [ ] Works with unknown molecules

### Market Data
- [ ] GET /market_data/{molecule} works
- [ ] Contains market size, growth, competitors
- [ ] Contains regional breakdown

### Clinical
- [ ] GET /clinical_trials/{molecule} works
- [ ] Shows trial IDs and enrollment
- [ ] Returns correct trial count

### Patents
- [ ] GET /patent_data/{molecule} works
- [ ] GET /freedom_to_operate/{molecule} works
- [ ] FTO score is between 0-1

### Web Intelligence
- [ ] GET /web_publications/{molecule} works
- [ ] GET /web_trends/{keyword} works
- [ ] Sentiment is Positive/Negative/Neutral/Mixed

### Reports
- [ ] POST /generate_report works
- [ ] GET /saved_reports returns list
- [ ] JSON report is valid

### Batch
- [ ] POST /batch_analyze works
- [ ] Returns results for all molecules
- [ ] Handles errors gracefully

---

## 📊 Performance Notes

**Expected Response Times:**
- Health check: < 100ms
- Market data: < 200ms
- Clinical data: < 200ms
- Patent data: < 200ms
- Web data: < 500ms (with AI)
- Full molecule query: 1-3 seconds (with AI)
- Batch analysis (3 molecules): 3-5 seconds

---

## 💡 Tips

1. **Use Swagger UI**: Navigate to http://localhost:8000/docs
2. **Save Responses**: Use `> file.json` to save responses
3. **Pretty Print**: Use `| python -m json.tool` on macOS/Linux
4. **Test Unknown Molecules**: System generates plausible data
5. **Check Logs**: Watch backend terminal for detailed logs

---

## 🐛 Common Issues

**Connection Refused**
- Ensure backend is running on port 8000
- Check: `curl http://localhost:8000/health`

**Timeout**
- Increase curl timeout: `curl --max-time 10 ...`
- Check backend logs for errors

**Invalid JSON**
- Verify JSON syntax in request body
- Use `| python -m json.tool` to validate

---

**Happy Testing! 🧪✅**
