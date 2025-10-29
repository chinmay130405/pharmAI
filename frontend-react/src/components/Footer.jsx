import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-10 h-10 bg-gradient-pharma rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-white">PharmAI</span>
            </div>
            <p className="text-sm text-gray-400">
              Accelerating pharmaceutical innovation through artificial intelligence
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 hover:bg-pharma-600/20 rounded-lg transition hover:text-pharma-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-pharma-600/20 rounded-lg transition hover:text-pharma-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-pharma-600/20 rounded-lg transition hover:text-pharma-400">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="hover:text-pharma-400 transition">Analyze</Link></li>
              <li><Link to="/trends" className="hover:text-pharma-400 transition">Market Trends</Link></li>
              <li><a href="#" className="hover:text-pharma-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-pharma-400 transition">Features</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-pharma-400 transition">About Us</Link></li>
              <li><a href="#" className="hover:text-pharma-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-pharma-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-pharma-400 transition">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 hover:text-pharma-400 transition">
                <Mail size={16} />
                <a href="mailto:hello@pharmai.com">hello@pharmai.com</a>
              </li>
              <li className="flex items-center gap-2 hover:text-pharma-400 transition">
                <Phone size={16} />
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            <p>&copy; {currentYear} PharmAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pharma-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-pharma-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-pharma-400 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
