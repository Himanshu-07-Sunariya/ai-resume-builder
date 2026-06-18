import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-light to-secondary-50">
      <Outlet />
    </div>
  );
}
