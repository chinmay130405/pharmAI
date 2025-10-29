# 🔑 Environment Setup Instructions

## Step 1: Get Groq API Key

1. Visit **[console.groq.com](https://console.groq.com)**
2. Click "Sign Up" or "Log In"
3. Complete the authentication
4. Navigate to **API Keys** section
5. Click **"Create API Key"**
6. Copy the generated key

## Step 2: Add to .env File

### Option A: Edit backend/.env directly

1. Open: `backend/.env`
2. Replace `your_groq_api_key_here` with your actual key:

```env
GROQ_API_KEY=gsk_YOUR_ACTUAL_KEY_HERE_1234567890
```

### Option B: Create .env from .env.example

```bash
# Windows
copy backend\.env.example backend\.env

# macOS/Linux
cp backend/.env.example backend/.env
```

Then edit the file with your API key.

## Step 3: Verify Setup

Run this command to test:

```bash
python -c "import os; from dotenv import load_dotenv; load_dotenv('backend/.env'); print('API Key set!' if os.getenv('GROQ_API_KEY') else 'API Key missing!')"
```

Expected output: `API Key set!`

## ⚠️ Security Notes

- **Never commit .env to version control**
- **Never share your API key**
- Add `.env` to `.gitignore`:
  ```
  backend/.env
  ```
- API key is free tier (generous limits)
- No credit card required for free tier

## 🔄 If You Lose Your Key

1. Go back to [console.groq.com](https://console.groq.com)
2. Delete the old key
3. Create a new one
4. Update your .env file

## ✅ Ready to Go!

Once your .env is set up:

```bash
# Terminal 1: Backend
cd backend
python main.py

# Terminal 2: Frontend
cd frontend
streamlit run app.py
```

Access at: **http://localhost:8501**

---

**Questions?** Check README.md Troubleshooting section.
