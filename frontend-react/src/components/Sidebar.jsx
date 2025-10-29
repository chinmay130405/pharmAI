import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, FileText, Beaker, ChevronDown } from 'lucide-react';

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-pharma-900 to-pharma-800 text-white transition-all duration-300 overflow-hidden flex flex-col shadow-xl`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-pharma-700">
        <div className="p-2 bg-pharma-500 rounded-lg flex-shrink-0">
          <Beaker size={24} className="text-white" />
        </div>
        {isOpen && <span className="font-bold text-lg whitespace-nowrap">PharmaAI</span>}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
              location.pathname === path
                ? 'bg-pharma-500 text-white shadow-lg'
                : 'text-pharma-100 hover:bg-pharma-700'
            }`}
          >
            <Icon size={20} className="flex-shrink-0" />
            {isOpen && <span className="whitespace-nowrap">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-pharma-700">
          <div className="text-pharma-200 text-sm space-y-2">
            <p className="font-semibold">PharmaAI v1.0.0</p>
            <p className="text-pharma-400 text-xs">Powered by Groq AI</p>
            <p className="text-pharma-400 text-xs">Using llama-3.1-8b</p>
          </div>
        </div>
      )}
    </aside>
  );
}
