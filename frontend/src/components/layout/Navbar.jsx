import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
              AR
            </div>
            <span className="hidden sm:inline bg-gradient-primary bg-clip-text text-transparent">
              Resume Builder
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <div className="flex gap-4">
                <Link to="/auth/login" className="text-gray-600 hover:text-primary-600 font-medium transition">
                  Login
                </Link>
                <Link to="/auth/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-gray-100"
          >
            {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link to="/auth/login" className="px-4 py-2 text-gray-600 hover:bg-gray-50">
                  Login
                </Link>
                <Link to="/auth/register" className="px-4 py-2 btn-primary">
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/dashboard" className="px-4 py-2 text-gray-600 hover:bg-gray-50">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-left">
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
