import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '../../store/store';
import { generateInitials } from '../../utils/helpers';

export default function DashboardNavbar() {
  const { user } = useAuthStore();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search resumes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:shadow-lg transition">
            {generateInitials(user?.name || 'User')}
          </div>
        </div>
      </div>
    </div>
  );
}
