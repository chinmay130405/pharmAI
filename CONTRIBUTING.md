# Contributing to Pharma Agent AI

Thank you for your interest in contributing! Here's how to get started.

## 🤝 Ways to Contribute

- Report bugs
- Suggest features
- Improve documentation
- Submit code improvements
- Add tests

## 🐛 Reporting Bugs

**Before submitting a bug report:**
- Check if the issue already exists
- Include Python/Node version
- Include error messages and logs
- Describe steps to reproduce

**When reporting, include:**
- Description of the bug
- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots/logs
- Environment details

## ✨ Suggesting Enhancements

- Use a clear, descriptive title
- Provide a step-by-step description
- Provide specific examples
- Describe current behavior
- Explain expected behavior
- Explain why this would be useful

## 🔧 Development Setup

### Clone and Setup
```bash
git clone https://github.com/yourusername/pharma-agent-ai.git
cd pharma-agent-ai

# Backend
python -m venv venv
.\venv\Scripts\Activate  # Windows
pip install -r backend/requirements.txt

# Frontend
cd frontend-react
npm install
```

### Run Locally
```bash
# Terminal 1: Backend
cd backend
python main.py

# Terminal 2: Frontend
cd frontend-react
npm run dev

# Terminal 3: MongoDB (if not running)
net start MongoDB
```

## 📝 Coding Standards

### Python (Backend)
- Follow PEP 8
- Use type hints
- Write docstrings
- Keep functions focused
- Use meaningful variable names

**Example:**
```python
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt(rounds=4)
    return bcrypt.hashpw(password.encode(), salt).decode()
```

### JavaScript/React (Frontend)
- Use consistent formatting (ESLint)
- Use arrow functions
- Use functional components
- Add PropTypes/TypeScript
- Keep components small

**Example:**
```jsx
const LoginPage = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
};
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Tests
```bash
cd frontend-react
npm test
```

## 📤 Making a Pull Request

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/pharma-agent-ai.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clear commits
   - Follow coding standards
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Use a descriptive title
   - Reference any related issues
   - Explain your changes
   - Include screenshots if UI changes

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added tests
- [ ] Existing tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have updated the documentation
```

## 🚀 Commit Message Guidelines

Use clear, descriptive commit messages:

- `feat: Add user authentication`
- `fix: Fix MongoDB connection timeout`
- `docs: Update installation instructions`
- `style: Format code with Prettier`
- `test: Add login endpoint tests`
- `refactor: Simplify authentication flow`

Format:
```
<type>: <subject>

<body>

<footer>
```

## 📚 Documentation

When contributing:
- Update README if needed
- Add docstrings to new functions
- Update API docs if applicable
- Comment complex logic

## 🎯 Code Review Process

1. Automated checks run (linting, tests)
2. Maintainers review your PR
3. Changes may be requested
4. Once approved, PR is merged

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 📞 Questions?

- Open an issue for discussions
- Check existing issues first
- Contact maintainers for help

---

**Thank you for contributing! 🙏**
