/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pharma: {
          50: '#f8faff',
          100: '#e8f1ff',
          200: '#cfe0ff',
          300: '#b5cbff',
          400: '#7fa8ff',
          500: '#5b89ff',
          600: '#4f63ff',
          700: '#4345d5',
          800: '#3d2ba8',
          900: '#2d1b7f',
        },
        accent: {
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          violet: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(95, 137, 255, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(95, 137, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -50px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(50px, 50px) scale(1.05)' },
        }
      },
      backgroundImage: {
        'gradient-pharma': 'linear-gradient(135deg, #5b89ff 0%, #a855f7 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)',
        'gradient-mesh': 'linear-gradient(135deg, #5b89ff 0%, #10b981 50%, #f59e0b 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(95, 137, 255, 0.3)',
        'glow-lg': '0 0 50px rgba(95, 137, 255, 0.4)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.12)',
      },
      animationDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      }
    },
  },
  plugins: [],
}
