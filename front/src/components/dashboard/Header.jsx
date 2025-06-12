import { useAppContext } from '../../hooks/useAppContext';
import { FileText, LogOut } from 'lucide-react';

export const Header = () => {
  const { user, logoutUser } = useAppContext();

  return (
    <header className="bg-white border-bottom shadow-sm mb-3">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Logo and Title */}
          <div className="d-flex align-items-center">
            <FileText size={24} className="text-primary me-2" />
            <h1 className="h5 mb-0 fw-semibold text-dark">News Dashboard</h1>
          </div>

          {/* User Info and Logout */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted small">
              Welcome, {user?.name} {user?.isAdmin && '(Admin)'}
            </span>
            <button
              onClick={logoutUser}
              className="btn btn-link text-decoration-none text-dark d-flex align-items-center p-0"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
