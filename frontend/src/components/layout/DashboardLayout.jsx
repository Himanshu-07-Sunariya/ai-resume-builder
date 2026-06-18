import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-light">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <DashboardNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
