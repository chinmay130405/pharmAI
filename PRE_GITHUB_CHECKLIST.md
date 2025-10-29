# 📋 Pre-GitHub Upload Checklist

Complete all items before uploading to GitHub:

## 🔐 Security & Secrets

- [ ] `.env` file is NOT in git (check `.gitignore`)
- [ ] `.env.example` exists with template values
- [ ] No API keys in source code
- [ ] No database passwords in code
- [ ] No SECRET_KEY hardcoded
- [ ] All secrets in `.env` only

**Verify:**
```powershell
git status
# Should NOT show .env file
```

---

## 📁 Essential Files

- [ ] `.gitignore` exists and is updated
- [ ] `.gitattributes` exists
- [ ] `README.md` or `GITHUB_README.md` exists
- [ ] `LICENSE` file exists
- [ ] `CONTRIBUTING.md` exists
- [ ] `.env.example` in backend folder

---

## 🐍 Backend

- [ ] `requirements.txt` is up to date
- [ ] All dependencies listed
- [ ] `main.py` includes all routes
- [ ] `database.py` configured correctly
- [ ] `auth.py` uses bcrypt directly (no passlib)
- [ ] All `.py` files have proper imports
- [ ] No debug mode in production code

**Check dependencies:**
```powershell
cd backend
pip freeze > requirements.txt
```

---

## ⚛️ Frontend

- [ ] `package.json` is complete
- [ ] All dependencies listed
- [ ] `.env.example` or `.env.local` in root (optional)
- [ ] No hardcoded API URLs
- [ ] `VITE_API_URL` points to localhost for dev

**Check packages:**
```powershell
cd frontend-react
npm list --depth=0
```

---

## 📖 Documentation

- [ ] README has installation instructions
- [ ] README has setup steps
- [ ] README has API documentation link
- [ ] CONTRIBUTING guide is clear
- [ ] GITHUB_UPLOAD_GUIDE.md is ready

---

## 🧪 Code Quality

- [ ] No `console.log()` debug statements left
- [ ] No `print()` debug statements left
- [ ] No commented-out code blocks
- [ ] No TODO comments without context
- [ ] Code follows style guidelines

---

## 🔗 Git Setup

- [ ] `.git` folder exists
- [ ] Remote origin set to your GitHub URL
- [ ] Initial commit made with meaningful message

**Verify:**
```powershell
git remote -v
git log --oneline
```

---

## ✅ Final Verification

**Run this command to check what will upload:**
```powershell
git status
```

**Expected output:**
- No `.env` file
- No `venv/` folder
- No `node_modules/` folder
- No `__pycache__/` folders
- Only project files visible

**If you see `.env`:**
```powershell
git rm --cached .env
git commit -m "Remove .env from git tracking"
```

---

## 🚀 GitHub Repository Setup

Before pushing:

- [ ] Repository created on GitHub
- [ ] Repository name: `pharma-agent-ai`
- [ ] Repository is public (or private as desired)
- [ ] NO README initialization on GitHub

---

## 📤 Upload Commands (Copy & Paste)

Replace `YOUR_USERNAME`:

```powershell
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai"

git init
git add .
git commit -m "Initial commit: Pharma Agent AI platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pharma-agent-ai.git
git push -u origin main
```

---

## ✨ Post-Upload Tasks

After successfully pushing to GitHub:

- [ ] Visit repository URL
- [ ] Verify all files uploaded
- [ ] Verify `.env` NOT uploaded
- [ ] Check README displays correctly
- [ ] Add repository description (max 125 characters)
- [ ] Add topics: python, fastapi, react, mongodb, ai
- [ ] Enable Issues (if public)
- [ ] Enable Discussions (optional)
- [ ] Create first GitHub Release (v1.0.0)

**Example Description:**
"AI-powered pharmaceutical research platform for identifying drug repurposing opportunities"

---

## 📋 Future Maintenance

After upload, remember:

- [ ] Always commit before pulling
- [ ] Use meaningful commit messages
- [ ] Create branches for features
- [ ] Keep `.env.example` updated with new variables
- [ ] Update requirements.txt when adding packages
- [ ] Update package.json when adding npm packages
- [ ] Keep README current with new features
- [ ] Document breaking changes

---

## 🎯 Success Criteria

✅ **Repository uploaded successfully if:**
- All code files visible on GitHub
- README displays correctly
- `.env` is NOT in repository
- `.gitignore` is working
- Repository is public (if intended)
- No sensitive data exposed
- Clear documentation available

---

## 🆘 Quick Troubleshooting

**Problem: `.env` was accidentally pushed**
```powershell
git rm --cached .env
git commit -m "Remove sensitive .env file"
git push
```

**Problem: `.gitignore` not working**
```powershell
git rm -r --cached .
git add .
git commit -m "Fix .gitignore"
git push
```

**Problem: Need to change repository URL**
```powershell
git remote set-url origin https://github.com/NEW_USERNAME/pharma-agent-ai.git
```

---

## 📞 Ready?

✅ All items checked?  
✅ All files prepared?  
✅ Security verified?  

**Then you're ready to push to GitHub! 🚀**

---

**Recommended Reading:**
1. `GITHUB_UPLOAD_GUIDE.md` - Step-by-step instructions
2. `GITHUB_README.md` - Final README for users
3. `CONTRIBUTING.md` - For contributors

---

**Made with ❤️ for your project success!**
