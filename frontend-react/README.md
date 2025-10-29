# PharmaAI React Frontend

A modern, responsive React-based frontend for the PharmaAI pharmaceutical drug discovery platform, built with Vite, Tailwind CSS, and Recharts for data visualization.

## 🌟 Features

- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Fast Development**: Powered by Vite for instant HMR
- **Data Visualization**: Interactive charts using Recharts
- **Component Library**: Reusable, well-structured components
- **Real-time API Integration**: Seamless connection with FastAPI backend
- **Multi-page Navigation**: React Router for smooth page transitions
- **Professional Design**: Gradient backgrounds, smooth animations, and attention to detail

## 📁 Project Structure

```
frontend-react/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── InsightCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Alert.jsx
│   │   └── Charts.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Main analysis page
│   │   ├── TrendsPage.jsx   # Trends and insights
│   │   └── ReportsPage.jsx  # Report management
│   ├── utils/               # Utilities
│   │   ├── config.js        # API configuration
│   │   └── apiService.js    # API client
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static files
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend running on http://localhost:8000

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend-react
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API (optional):**
Edit `src/utils/config.js` if your backend runs on a different URL:
```javascript
export const API_BASE_URL = 'http://localhost:8000';
```

4. **Start development server:**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 🎨 Tailwind CSS Customization

The Pharma theme is defined in `tailwind.config.js`:

```javascript
colors: {
  pharma: {
    50: '#f0f9ff',   // Light background
    100: '#e0f2fe',
    ...
    900: '#0c3d66',  // Dark header
  }
}
```

## 🔌 API Integration

The `apiService` provides convenient methods to call backend endpoints:

```javascript
import { apiService } from './utils/apiService';

// Query a molecule
const data = await apiService.queryMolecule('aspirin');

// Get trends
const trends = await apiService.getTrends();

// Generate report
const report = await apiService.generateReport(moleculeName, data);
```

## 📦 Key Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **lucide-react**: Icons
- **recharts**: Charts and graphs
- **tailwindcss**: Utility-first CSS
- **vite**: Build tool

## 🔄 Workflow

1. **Home Page**: Search for a molecule and view comprehensive analysis
2. **Trends Page**: Explore market trends and emerging therapeutic areas
3. **Reports Page**: Manage and download generated reports

## 🎯 Component Examples

### Using InsightCard
```jsx
<InsightCard
  title="Market Size (USD)"
  value="$2.1B"
  icon="💰"
  color="blue"
/>
```

### Using Charts
```jsx
<SimpleBarChart
  data={[{ name: 'Jan', value: 400 }, ...]}
  title="Monthly Trends"
/>
```

## 🐛 Troubleshooting

### Backend not connecting
- Ensure FastAPI backend is running on `http://localhost:8000`
- Check CORS is enabled in backend (`main.py`)
- Verify `API_BASE_URL` in `config.js`

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild with `npm run build`
- Check Tailwind classes are spelled correctly

### Port already in use
```bash
# Use different port
npm run dev -- --port 3001
```

## 📝 Development Notes

- Components use functional components with hooks
- API calls are wrapped in try-catch for error handling
- Responsive design uses Tailwind's breakpoints (md:, lg:, etc.)
- Icons from lucide-react (lightweight alternative to FontAwesome)

## 🚀 Deployment

### Using Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_BASE_URL`

### Using Docker
See the main `README.md` for Docker setup instructions.

## 📧 Support

For issues or questions, refer to:
- Main project README.md
- Backend API_TESTING_GUIDE.md
- Tailwind docs: https://tailwindcss.com
- React docs: https://react.dev

---

Built with ❤️ for pharmaceutical innovation
