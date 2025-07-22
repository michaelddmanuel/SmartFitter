import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../context/ProfileContext';

/**
 * Enhanced ProtectedRoute component that checks both authentication and user status
 * 
 * @param {Object} props - Component properties
 * @param {string[]} props.requiredStatuses - User statuses that are allowed to access this route
 * @param {string} props.redirectPath - Path to redirect to if access is denied
 * @param {boolean} props.requireAdmin - Whether admin privileges are required
 * @returns {JSX.Element} Protected route component
 */
const ProtectedRoute = ({ 
  requiredStatuses = [], 
  redirectPath = '/business-card',
  requireAdmin = false,
  children 
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { profile, isLoading: profileLoading, userStatus } = useProfile();

  // If still loading auth or profile, show loading
  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A] text-[#E5E7EB]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCC1BE] mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check admin requirement first
  if (requireAdmin) {
    console.log('Admin required. Profile:', profile, 'Is Admin:', profile?.is_admin);
    if (!profile || !profile.is_admin) {
      console.log('Admin access denied, redirecting to:', redirectPath);
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  }

  // Check user status requirements
  if (requiredStatuses.length > 0) {
    console.log('Status required:', requiredStatuses, 'Current status:', userStatus);
    // Only redirect to profile-setup if we specifically need a profile and don't have one
    if (!profile) {
      console.log('No profile found, redirecting to profile-setup');
      return <Navigate to="/profile-setup" replace />;
    }
    
    const hasRequiredStatus = requiredStatuses.includes(userStatus);
    if (!hasRequiredStatus) {
      console.log('Status requirement not met, redirecting to:', redirectPath);
      return <Navigate to={redirectPath} replace />;
    }
  }

  // For basic protected routes (no specific status required), just check authentication
  console.log('Basic protected route access granted');
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
