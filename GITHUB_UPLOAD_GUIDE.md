# 🚀 GitHub Upload Guide

Follow these steps to upload your project to GitHub.

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `pharma-agent-ai`
3. Add description: "AI-powered pharmaceutical research platform"
4. Choose "Public" (for open source) or "Private"
5. **DO NOT** initialize with README (we have one)
6. Click "Create repository"

---

## Step 2: Initialize Git in Your Project

**Windows PowerShell (in project root):**
```powershell
cd "C:\Users\ambre\OneDrive\Desktop\fsd\fsd mini project\pharma-agent-ai"

# Initialize git (only if not already done)
git init

# Add all files
git add .

# Verify .env is NOT included
git status
# You should NOT see your .env file (it should be in .gitignore)

# First commit
git commit -m "Initial commit: Pharma Agent AI platform setup"
```

---

## Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/pharma-agent-ai.git

# Verify connection
git remote -v
# Should show:
# origin  https://github.com/YOUR_USERNAME/pharma-agent-ai.git (fetch)
# origin  https://github.com/YOUR_USERNAME/pharma-agent-ai.git (push)
```

---

## Step 4: Push to GitHub

```powershell
# Push to GitHub (creates main branch)
git branch -M main
git push -u origin main

# If asked for authentication, use:
# - GitHub username
# - Personal Access Token (see below)
```

### Getting a Personal Access Token (if needed)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo`, `gist`
4. Generate token
5. Copy and paste when prompted in terminal

---

## Step 5: Verify Upload

1. Go to https://github.com/YOUR_USERNAME/pharma-agent-ai
2. You should see all your files
3. Verify `.env` is NOT included (should see `.env.example` only)
4. Check that README is displayed

---

## Important Files to Check

✅ **Should be uploaded:**
- `.gitignore`
- `.env.example` (without secrets)
- `README.md` or `GITHUB_README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- All source code
- `requirements.txt`
- `package.json`

❌ **Should NOT be uploaded (in .gitignore):**
- `.env` (actual environment file)
- `venv/` (Python virtual environment)
- `node_modules/` (Node modules)
- `__pycache__/` (Python cache)
- `.DS_Store` (Mac files)

---

## Step 6: Setup GitHub Actions (Optional)

Create `.github/workflows/tests.yml` for automated testing:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - run: pip install -r backend/requirements.txt
      - run: pytest backend/tests/
```

---

## Future Commits

After initial upload, use these commands:

```powershell
# Make changes to files
# ... edit files ...

# Check what changed
git status

# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push
```

---

## Common Git Commands

```powershell
# Check status
git status

# See commit history
git log

# See changes since last commit
git diff

# Undo changes to a file
git checkout -- filename

# View file
git show commit-id:filename

# Create a branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge a branch
git merge feature-name
```

---

## Troubleshooting

### "fatal: not a git repository"
```powershell
git init
```

### "Permission denied" when pushing
- Check GitHub credentials
- Use personal access token instead of password
- Check repository permissions

### ".env file was accidentally committed"
```powershell
# Remove from git history
git rm --cached .env
git commit -m "Remove .env file"
git push
```

### Want to change repository URL
```powershell
git remote set-url origin https://github.com/NEW_USERNAME/pharma-agent-ai.git
```

---

## GitHub Features to Use

After uploading:

1. **Create Issues** - Track bugs and features
2. **Add Labels** - `bug`, `feature`, `documentation`
3. **Milestones** - Plan releases
4. **Releases** - Tag versions (v1.0.0, v2.0.0)
5. **Projects** - Organize work
6. **Discussions** - Community chat
7. **Wiki** - Documentation hub

---

## Next Steps

1. ✅ Upload to GitHub
2. 📝 Update GitHub repo description
3. 🌟 Add topics: `python`, `fastapi`, `react`, `mongodb`, `ai`
4. 👥 Add collaborators (if working with team)
5. 📋 Create project board
6. 🚀 Share with others!

---

## Repository Badges (Optional)

Add these to your README:

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Node 16+](https://img.shields.io/badge/node-16+-green.svg)](https://nodejs.org/)
```

---

**Happy coding! 🎉**
