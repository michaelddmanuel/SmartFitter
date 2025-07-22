import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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

/**
 * NavigationPublic component for public pages like landing page
 * Provides navigation while respecting the SmartFitter design system
 */
const NavigationPublic = () => {
  const { isAuthenticated, logout, user, loginWithRedirect } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Refs for dropdown menu containers
  const pagesDropdownRef = useRef(null);
  const contactsDropdownRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target) &&
          contactsDropdownRef.current && !contactsDropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown menu
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };
  
  // Logged out navigation items
  const loggedOutItems = [
    { path: '/', name: 'Landing', mainNav: true },
    { path: '/about', name: 'About', mainNav: true },
    { path: '/faq', name: 'FAQ', mainNav: true },
    { path: '/book', name: 'Book a Session', mainNav: true }
  ];
  
  // Logged in navigation items
  const loggedInItems = [
    { path: '/', name: 'Landing', mainNav: true },
    { path: '/business-card', name: 'Business Card', mainNav: true },
    { path: '/admin', name: 'Dashboard', mainNav: true },
    {
      name: 'Pages',
      mainNav: true,
      isDropdown: true,
      dropdownItems: [
        { path: '/about', name: 'About' },
        { path: '/faq', name: 'FAQ' },
        { path: '/book', name: 'Book a Session' }
      ]
    },
    {
      name: 'Contacts',
      mainNav: true,
      isDropdown: true,
      dropdownItems: [
        { path: '/nda', name: 'NDA' },
        { path: '/profile', name: 'Profile' },
      ]
    }
  ];
  
  // Select navigation items based on authentication status
  const navigationItems = isAuthenticated ? loggedInItems : loggedOutItems;
  
  // Filter for main navigation items (for bottom nav)
  const mainNavItems = navigationItems.filter(item => item.mainNav);

  return (
    <>
      {/* Top Navigation for larger screens */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#2A2A2A] py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img 
                src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg"
                alt="SmartFitter Logo" 
                className="h-10 w-auto mr-4"
              />
              <span className="text-[#CCC1BE] font-semibold text-lg">SmartFitter</span>
            </NavLink>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-1">
            {/* Display all navigation items in the top bar */}
            {navigationItems.map((item, index) => (
              item.isDropdown ? (
                <div key={index} className="relative" ref={item.name === 'Pages' ? pagesDropdownRef : contactsDropdownRef}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center ${openDropdown === item.name ? "text-[#CCC1BE]" : "text-[#E5E7EB]/60 hover:text-[#CCC1BE]"}`}
                  >
                    {item.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ml-1 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown menu */}
                  {openDropdown === item.name && (
                    <div className="absolute mt-1 py-2 w-48 bg-[#232323] rounded-md shadow-lg border border-[#2A2A2A] z-50">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <NavLink
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm font-medium transition-colors hover:bg-[#2A2A2A] ${
                              isActive 
                                ? "text-[#CCC1BE]" 
                                : "text-[#E5E7EB]/60 hover:text-[#CCC1BE]"
                            }`
                          }
                        >
                          {dropdownItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? "text-[#CCC1BE]" 
                        : "text-[#E5E7EB]/60 hover:text-[#CCC1BE]"
                    }`
                  }
                  end={item.path === '/'}
                >
                  {item.name}
                </NavLink>
              )
            ))}
            
            {/* Authentication */}
            <div className="ml-auto flex items-center">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                    <Avatar className="h-8 w-8 border-2 border-[#CCC1BE] rounded-full">
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback className="bg-[#2A2A2A] text-[#CCC1BE]">
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="mr-4 min-w-[200px] bg-[#232323] border-[#2A2A2A] text-[#E5E7EB]">
                    <DropdownMenuLabel className="flex flex-col">
                      <span className="font-medium text-[#CCC1BE]">{user?.name}</span>
                      <span className="text-xs text-[#E5E7EB]/60 truncate">{user?.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                    
                    <DropdownMenuItem className="cursor-pointer hover:bg-[#2A2A2A] hover:text-[#CCC1BE] focus:bg-[#2A2A2A]">
                      <NavLink to="/profile" className="w-full flex">Profile Settings</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-[#2A2A2A] hover:text-[#CCC1BE] focus:bg-[#2A2A2A]">
                      <NavLink to="/business-card" className="w-full flex">Business Card</NavLink>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                    
                    <DropdownMenuItem 
                      className="text-red-400 cursor-pointer hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]"
                      onClick={() => {
                        const logoutUrl = import.meta.env.VITE_AUTH0_LOGOUT_URL || window.location.origin;
                        logout({ returnTo: logoutUrl });
                      }}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="flex justify-between items-center h-16 px-4">
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

        {/* Mobile menu dropdown - all nav items */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#1A1A1A] border-b border-[#2A2A2A] py-2 px-4 shadow-lg">
            {navigationItems.map((item, index) => (
              item.isDropdown ? (
                <div key={index}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-md font-medium transition-colors ${openDropdown === item.name ? "text-[#CCC1BE] bg-[#2A2A2A]" : "text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#2A2A2A]/50"}`}
                  >
                    <span>{item.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ml-1 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Mobile dropdown submenu */}
                  {openDropdown === item.name && (
                    <div className="ml-4 mt-1 border-l border-[#2A2A2A] pl-2">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <NavLink
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          onClick={() => {
                            setOpenDropdown(null);
                            setMenuOpen(false);
                          }}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                              isActive 
                                ? "text-[#CCC1BE] bg-[#2A2A2A]" 
                                : "text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#2A2A2A]/50"
                            }`
                          }
                        >
                          {dropdownItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
                  {item.name}
                </NavLink>
              )
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
                <div>
                  {/* Google Sign In Button */}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      loginWithRedirect({ screen_hint: 'signup', connection: 'google-oauth2' });
                    }}
                    className="flex items-center justify-center space-x-2 w-full px-3 py-1.5 rounded-md bg-white text-black transition-all duration-300 hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-sm font-medium">Sign In with Google</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for mobile - only main nav items */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] border-t border-[#2A2A2A] py-2 px-4">
        <div className="flex justify-between items-center">
          {mainNavItems.map((item, index) => (
            item.isDropdown ? (
              <button
                key={index}
                onClick={() => {
                  setMenuOpen(true);
                  toggleDropdown(item.name);
                }}
                className={`
                  flex flex-col items-center py-1 px-2
                  ${openDropdown === item.name ? 'text-[#CCC1BE]' : 'text-[#E5E7EB]/60'}
                `}
              >
                {/* Dropdown icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center py-1 px-2
                  ${isActive ? 'text-[#CCC1BE]' : 'text-[#E5E7EB]/60'}
                `}
                end={item.path === '/'}
              >
                {/* Simple text labels for bottom nav */}
                <span className="text-xs mt-1">{item.name}</span>
              </NavLink>
            )
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavigationPublic;
