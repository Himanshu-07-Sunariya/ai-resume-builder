import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Settings, LogOut,
  Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'My Resumes', href: '/dashboard' },
    { icon: FileText, label: 'Templates', href: '/dashboard/templates' },
    { icon: Settings, label: 'Profile', href: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-3 bg-primary-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-30`}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
            AR
          </div>
          <span className="font-bold">Resume Builder</span>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
