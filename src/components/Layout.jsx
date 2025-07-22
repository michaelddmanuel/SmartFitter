import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationPublic from './NavigationPublic';

/**
 * Main layout component that includes the responsive navigation system
 * and wraps around all page content with proper spacing
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB]">
      <NavigationPublic />
      
      {/* Main content with proper padding to account for fixed navigation */}
      <main className="pt-16 pb-20 md:pb-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
