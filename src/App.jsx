import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProfileProvider } from './context/ProfileContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

// Import page components
import LandingPage from './pages/LandingPage'
// import LandingPage2 from './pages/LandingPage2'; // Temporarily disabled due to corruption
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ProfileSetupPage from './pages/ProfileSetupPage'
import ProfilePage from './pages/ProfilePage';
import NdaPageNew from './pages/NdaPageNew'
import BookingPageNew from './pages/BookingPageNew'
import BookingConfirmationPageNew from './pages/BookingConfirmationPageNew'
import MemberContractPageNew from './pages/MemberContractPageNew'
import FAQPage from './pages/FAQPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

// Navigation is now handled by the Layout component

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          {/* Public Routes with NavigationPublic */}
          <Route path="/" element={<LandingPage />} />
          
          {/* All Other Routes with Layout Navigation */}
          <Route element={<Layout />}>
            {/* Public Routes - No authentication required */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/book" element={<BookingPageNew />} />
            
            {/* Basic Protected Routes - Only require authentication */}
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile-setup" element={
              <ProtectedRoute>
                <ProfileSetupPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Status-Specific Protected Routes - Temporarily accessible for testing */}
            <Route path="/nda" element={
              <ProtectedRoute>
                <NdaPageNew />
              </ProtectedRoute>
            } />
            {/* Book page moved to public routes */}
            <Route path="/booking-confirmation" element={
              <ProtectedRoute>
                <BookingConfirmationPageNew />
              </ProtectedRoute>
            } />
            <Route path="/member-contract" element={
              <ProtectedRoute>
                <MemberContractPageNew />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Temporarily accessible to all authenticated users for testing */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
            
            {/* Contact and other pages - accessible to authenticated users */}
            <Route path="/contacts" element={
              <ProtectedRoute>
                <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] p-8">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#CCC1BE] mb-6">Contact Us</h1>
                    <p className="text-[#E5E7EB]/70">Contact information will be available here.</p>
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/terms" element={
              <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] p-8">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-[#CCC1BE] mb-6">Terms of Service</h1>
                  <p className="text-[#E5E7EB]/70">Terms of service will be available here.</p>
                </div>
              </div>
            } />
            <Route path="/privacy" element={
              <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] p-8">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-[#CCC1BE] mb-6">Privacy Policy</h1>
                  <p className="text-[#E5E7EB]/70">Privacy policy will be available here.</p>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  )
}

export default App
