import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const BookingConfirmationPageNew = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  
  // Check if user should be on this page
  useEffect(() => {
    if (profile && profile.user_status !== 'booked_session') {
      navigate('/profile');
    }
  }, [profile, navigate]);
  
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] pb-16">
      {/* Header */}
      <header className="p-4 border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#CCC1BE]">Booking Confirmation</h1>
          <p className="text-sm text-[#E5E7EB]/70 mt-1">Your session has been confirmed</p>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Success Card */}
        <Card className="bg-[#232323] border-[#2A2A2A] overflow-hidden">
          <div className="bg-[#2A2A2A] px-6 py-5 border-b border-[#2A2A2A]">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="bg-[#1A1A1A] rounded-full p-4 mb-4 sm:mb-0 sm:mr-6">
                <svg className="w-10 h-10 text-[#CCC1BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-[#CCC1BE]">Booking Confirmed!</h2>
                <p className="text-[#E5E7EB]/70 mt-1">Your SmartFitter consultation has been scheduled successfully.</p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6 space-y-8">
            {/* Session Details */}
            <div className="bg-[#2A2A2A]/50 rounded-lg p-5 space-y-4">
              <h3 className="text-[#CCC1BE] font-medium">Session Details</h3>
              
              <div className="space-y-3">
                <div className="flex">
                  <div className="w-6 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-[#E5E7EB]/80">Date</p>
                    <p className="text-[#E5E7EB]">Thursday, July 25, 2025</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-[#E5E7EB]/80">Time</p>
                    <p className="text-[#E5E7EB]">2:30 PM (30 minutes)</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-[#E5E7EB]/80">Meeting Type</p>
                    <p className="text-[#E5E7EB]">Video Call (link will be sent via email)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div>
              <h3 className="text-[#CCC1BE] font-medium mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
                Next Steps
              </h3>
              
              <ol className="space-y-4">
                {[
                  'Check your email for a calendar invitation',
                  'Prepare for your video consultation by finding a quiet space',
                  'Complete any pre-consultation questionnaire (if provided)',
                  'Join the call at the scheduled time using the link in your calendar invite'
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-[#2A2A2A] rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 border border-[#CCC1BE]/40">
                      <span className="text-[#CCC1BE] font-medium text-sm">{index + 1}</span>
                    </div>
                    <span className="text-[#E5E7EB]/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            {/* What to Expect */}
            <div>
              <h3 className="text-[#CCC1BE] font-medium mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What to Expect
              </h3>
              
              <div className="bg-[#2A2A2A]/50 rounded-lg p-5">
                <p className="text-[#E5E7EB]/80 leading-relaxed">
                  During your 30-minute consultation, our team will discuss your fitness goals, current 
                  routines, and how the SmartFitter program can help you achieve your objectives. 
                  Come prepared to talk about your fitness history and what you're looking to accomplish.
                </p>
                
                <div className="flex items-start bg-[#1A1A1A] border border-[#CCC1BE]/20 rounded-lg p-4 mt-5">
                  <svg className="w-5 h-5 text-[#CCC1BE] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium text-[#CCC1BE]">Important Note</p>
                    <p className="text-sm mt-1 text-[#E5E7EB]/70">
                      After your consultation, our team will review your profile to determine if 
                      you're a good fit for the SmartFitter program. You'll receive a notification 
                      once a decision has been made.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#2A2A2A]">
              <Link to="/profile">
                <Button className="w-full sm:w-auto px-6 mb-4 sm:mb-0 bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium h-auto py-2.5">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Go to Your Profile
                </Button>
              </Link>
              
              <div className="text-center sm:text-right">
                <p className="text-sm text-[#E5E7EB]/60">
                  Need to reschedule? Contact our support team at{' '}
                  <a href="mailto:support@smartfitter.com" className="text-[#CCC1BE] hover:text-[#CCC1BE]/80 underline underline-offset-2">
                    support@smartfitter.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Email Notification */}
        <Card className="bg-[#232323] border-[#2A2A2A] p-4 text-center">
          <p className="text-[#E5E7EB]/80">
            You'll receive an email confirmation shortly with all the details of your booking.
          </p>
        </Card>
        
        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] py-2 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Home</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span className="text-[#CCC1BE] text-xs">Booking</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Profile</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BookingConfirmationPageNew;
