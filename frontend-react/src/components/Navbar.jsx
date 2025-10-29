import { useState } from 'react';
import { Menu, X, LogOut, User, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, token, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Analyze' },
    { path: '/trends', label: 'Trends' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 bg-gradient-pharma rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-pharma-600 to-pharma-700 bg-clip-text text-transparent">
              PharmAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-pharma-100 text-pharma-600'
                    : 'text-gray-600 hover:text-pharma-600 hover:bg-pharma-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <Link
                  to="/reports"
                  className="px-4 py-2 text-gray-600 hover:text-pharma-600 font-semibold flex items-center gap-2 transition"
                >
                  <FileText size={18} />
                  Reports
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="px-4 py-2 bg-pharma-50 text-pharma-600 rounded-lg font-semibold hover:bg-pharma-100 transition flex items-center gap-2"
                  >
                    <User size={18} />
                    {user?.name || 'User'}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-pharma-600 font-semibold hover:bg-pharma-50 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/search"
                  className="px-6 py-2 bg-gradient-pharma text-white rounded-lg font-semibold hover:shadow-glow transition-all"
                >
                  Start Analysis
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-pharma-100 text-pharma-600'
                    : 'text-gray-600 hover:text-pharma-600 hover:bg-pharma-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {token ? (
              <>
                <Link
                  to="/reports"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:text-pharma-600 hover:bg-pharma-50 rounded-lg font-semibold flex items-center gap-2"
                >
                  <FileText size={18} />
                  My Reports
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-center text-pharma-600 font-semibold hover:bg-pharma-50 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/search"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 bg-gradient-pharma text-white rounded-lg font-semibold text-center hover:shadow-glow transition-all"
                >
                  Start Analysis
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
