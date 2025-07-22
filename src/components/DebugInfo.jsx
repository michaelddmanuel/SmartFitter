import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../context/ProfileContext';

const DebugInfo = () => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth0();
  const { profile, isLoading: profileLoading, userStatus } = useProfile();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 bg-black/80 text-white p-4 text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>Auth Loading: {authLoading ? 'Yes' : 'No'}</div>
      <div>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>Profile Loading: {profileLoading ? 'Yes' : 'No'}</div>
      <div>User: {user ? user.email : 'None'}</div>
      <div>Profile: {profile ? 'Exists' : 'None'}</div>
      <div>User Status: {userStatus || 'None'}</div>
      <div>Is Admin: {profile?.is_admin ? 'Yes' : 'No'}</div>
      <div>Current Path: {window.location.pathname}</div>
    </div>
  );
};

export default DebugInfo;
