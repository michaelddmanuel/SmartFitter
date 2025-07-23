import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth0();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Public navigation items (accessible to all users)
  const publicNavItems = [
    { 
      path: '/', 
      name: 'Landing',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      path: '/about', 
      name: 'About',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      )
    },
    { 
      path: '/faq', 
      name: 'FAQ',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      )
    }
  ];

  // Authenticated navigation items (only for logged-in users)
  const authenticatedNavItems = [
    { 
      path: '/', 
      name: 'Landing',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      path: '/business-card', 
      name: 'Business Card',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      path: '/member-dashboard', 
      name: 'Dashboard',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
      )
    },
    { 
      path: '/about', 
      name: 'About',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      )
    },
    { 
      path: '/book', 
      name: 'Book',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      )
    },
    { 
      path: '/booking-confirmation', 
      name: 'Booking Details',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      )
    },
    { 
      path: '/member-contract', 
      name: 'Contract',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    { 
      path: '/nda', 
      name: 'NDA',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    { 
      path: '/faq', 
      name: 'FAQ',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      )
    },
    { 
      path: '/profile', 
      name: 'Profile',
      mainNav: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    },
    { 
      path: '/contacts', 
      name: 'Contacts',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      )
    },
    { 
      path: '/terms', 
      name: 'Terms',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    { 
      path: '/privacy', 
      name: 'Privacy',
      mainNav: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      )
    }
  ];

  // Helper function to check if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  }

  // Select navigation items based on authentication status
  const navigationItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <>
      {/* Top Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#2A2A2A] py-2 px-6 justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg"
              alt="SmartFitter Logo" 
              className="h-8 w-auto mr-2"
            />
            <span className="text-[#CCC1BE] font-semibold text-lg">SmartFitter</span>
          </NavLink>
        </div>

        {/* Desktop navigation links */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "text-[#CCC1BE]" : "text-[#E5E7EB]/60 hover:text-[#E5E7EB]"}`
              }
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Profile dropdown or Sign In button */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-4 flex items-center justify-center rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#CCC1BE] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]">
                  <Avatar className="h-8 w-8 border-2 border-[#CCC1BE]">
                    <AvatarImage src={user?.picture} alt={user?.name || "User profile"} />
                    <AvatarFallback className="bg-[#232323] text-[#CCC1BE]">
                      {user?.name ? user.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4 bg-[#232323] border border-[#2A2A2A] text-[#E5E7EB]">
                <DropdownMenuLabel className="text-[#CCC1BE]">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs opacity-70">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                <DropdownMenuItem className="hover:bg-[#2A2A2A] cursor-pointer">
                  <NavLink to="/profile" className="flex w-full">
                    Profile Settings
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#2A2A2A] cursor-pointer">
                  <NavLink to="/member-dashboard" className="flex w-full">
                    Member Dashboard
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#2A2A2A] cursor-pointer">
                  <NavLink to="/admin" className="flex w-full">
                    Admin Dashboard
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                <DropdownMenuItem 
                  onClick={() => {
                    const logoutUrl = import.meta.env.VITE_AUTH0_LOGOUT_URL || window.location.origin;
                    logout({ returnTo: logoutUrl });
                  }}
                  className="text-red-400 hover:bg-[#2A2A2A] hover:text-red-400 cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Google Sign In Button */}
              <button
                onClick={() => loginWithRedirect({ screen_hint: 'signup', connection: 'google-oauth2' })}
                className="flex items-center justify-center space-x-2 px-3 py-1.5 rounded-md bg-white text-black transition-all duration-300 hover:shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs md:text-sm font-medium">Sign In</span>
              </button>
              
              {/* Regular Sign In Button */}
              <button 
                onClick={() => loginWithRedirect()}
                className="ml-1 px-3 py-1.5 rounded-md bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black text-xs md:text-sm font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile hamburger menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#2A2A2A] px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg"
              alt="SmartFitter Logo" 
              className="h-8 w-auto mr-2"
            />
            <span className="text-[#CCC1BE] font-semibold text-lg">SmartFitter</span>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-[#E5E7EB] hover:bg-[#2A2A2A]"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#1A1A1A] border-b border-[#2A2A2A] py-2 px-4 shadow-lg">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md font-medium transition-colors ${
                    isActive 
                      ? "text-[#CCC1BE] bg-[#2A2A2A]" 
                      : "text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#2A2A2A]/50"
                  }`
                }
                end={item.path === '/'}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
            <div className="border-t border-[#2A2A2A] mt-2 pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    const logoutUrl = import.meta.env.VITE_AUTH0_LOGOUT_URL || window.location.origin;
                    logout({ returnTo: logoutUrl });
                  }}
                  className="flex items-center w-full px-4 py-3 rounded-md font-medium text-red-400 hover:bg-[#2A2A2A]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Sign out
                </button>
              ) : (
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/";
                  }}
                  className="w-full justify-center bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-medium py-2 rounded-md"
                >
                  Sign In / Register
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for mobile - only main navigation items */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] border-t border-[#2A2A2A] py-2 px-4">
        <div className="flex justify-between items-center">
          {navigationItems.filter(item => item.mainNav).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-1 px-3"
              end={item.path === '/'}
            >
              <div className={`${isActive(item.path) ? 'text-[#CCC1BE]' : 'text-[#E5E7EB]/60'}`}>
                {item.icon}
              </div>
              <span className={`text-xs mt-1 ${isActive(item.path) ? 'text-[#CCC1BE]' : 'text-[#E5E7EB]/60'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page content padding to account for navigation bars */}
      <div className="pt-16 pb-20 md:pb-6">
        {/* This is where your page content will go */}
      </div>
    </>
  );
};

export default Navigation;
