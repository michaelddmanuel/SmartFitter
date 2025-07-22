import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userAPI } from '../services/api';

// Create a context for user profile data
export const ProfileContext = createContext(null);

// Custom hook to use profile context
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Store the token in localStorage for our API service to use
  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem('auth_token', token);
        } catch (err) {
          console.error('Error getting access token', err);
        }
      };
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  // Sync profile with backend when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      syncProfile();
    } else if (!isAuthenticated) {
      // Clear profile when logged out
      setProfile(null);
      localStorage.removeItem('auth_token');
    }
  }, [isAuthenticated, user]);

  // Function to sync profile with backend
  const syncProfile = async () => {
    if (!isAuthenticated || !user) return;

    setIsLoading(true);
    setError(null);

    try {
      // First try to get existing profile
      try {
        const existingProfile = await userAPI.getProfile();
        setProfile(existingProfile);
        return;
      } catch (getError) {
        // Profile doesn't exist yet, create it
        if (getError.message.includes('404') || getError.message.includes('not found')) {
          // Extract URL parameters for referral code
          const urlParams = new URLSearchParams(window.location.search);
          const refCode = urlParams.get('ref');

          const newProfile = await userAPI.updateProfile({
            email: user.email,
            full_name: user.name,
            avatar_url: user.picture,
            ref: refCode, // Include referral code if present
          });

          setProfile(newProfile);
        } else {
          throw getError;
        }
      }
    } catch (err) {
      console.error('Error syncing profile:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to manually update profile
  const updateProfile = async (profileData) => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const updatedProfile = await userAPI.updateProfile({
        ...profile,
        ...profileData,
      });
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Value to provide through the context
  const value = {
    profile,
    isLoading,
    error,
    syncProfile,
    updateProfile,
    userStatus: profile?.user_status || 'prospect',
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
