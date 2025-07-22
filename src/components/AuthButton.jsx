import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

/**
 * Authentication button for login/signup that follows SmartFitter design system
 */
const AuthButton = ({ variant = 'default', size = 'default', className = '', showIcon = true }) => {
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout, 
    isLoading, 
    error 
  } = useAuth0();

  // Handle login with Auth0 Universal Login (will show Google button if configured)
  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname },
        authorizationParams: {
          redirect_uri: window.location.origin,
          scope: 'openid profile email',
          // Don't force any specific connection - let Auth0 show all available options
        }
      });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Handle logout with proper cleanup
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    });
  };

  // Don't show anything while Auth0 is loading
  if (isLoading) {
    return (
      <Button 
        variant="ghost" 
        size={size}
        className={`${className} opacity-50`} 
        disabled
      >
        Loading...
      </Button>
    );
  }

  // Show error state if there's an authentication error
  if (error) {
    return (
      <Button 
        variant="destructive" 
        size={size}
        onClick={handleLogin}
        className={className}
      >
        {showIcon && <FaSignInAlt className="mr-2" />}
        Retry Login
      </Button>
    );
  }

  // If user is authenticated, show logout button
  if (isAuthenticated) {
    return (
      <Button 
        variant="outline" 
        size={size}
        onClick={handleLogout}
        className={`${className} border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground`}
      >
        {showIcon && <FaSignOutAlt className="mr-2" />}
        Sign Out
      </Button>
    );
  }

  // Show login button that will redirect to Auth0 Universal Login
  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleLogin}
      className={`${className} ${variant === 'default' ? 'bg-[#CCC1BE] text-[#1A1A1A] hover:bg-[#CCC1BE]/90' : ''}`}
    >
      {showIcon && <FaSignInAlt className="mr-2" />}
      Sign In
    </Button>
  );
};

export default AuthButton;
