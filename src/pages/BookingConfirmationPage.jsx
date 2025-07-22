import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const BookingConfirmationPage = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  
  // Check if user should be on this page
  useEffect(() => {
    if (profile && profile.user_status !== 'booked_session') {
      navigate('/profile');
    }
  }, [profile, navigate]);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-amber-600">Booking Confirmation</h1>
        <img 
          src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
          alt="SmartFitter Logo" 
          className="h-12" 
        />
      </div>
      
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 px-8 py-6 border-b border-green-200">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="bg-white rounded-full p-4 mb-4 sm:mb-0 sm:mr-6 shadow-md border border-green-200">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-green-800">Booking Confirmed!</h2>
              <p className="text-green-700 mt-1 text-lg">Your SmartFitter consultation has been scheduled successfully.</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          
          <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
              <svg className="w-6 h-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
              Next Steps
            </h2>
            <ol className="space-y-4">
              {[
                'Check your email for a calendar invitation',
                'Prepare for your video consultation by finding a quiet space',
                'Complete any pre-consultation questionnaire (if provided)',
                'Join the call at the scheduled time using the link in your calendar invite'
              ].map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-amber-100 rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-amber-800 font-medium text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
              <svg className="w-6 h-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              What to Expect
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <p className="text-gray-700 leading-relaxed">
                During your 30-minute consultation, our team will discuss your fitness goals, current 
                routines, and how the SmartFitter program can help you achieve your objectives. 
                Come prepared to talk about your fitness history and what you're looking to accomplish.
              </p>
              
              <div className="flex items-start bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 mt-5">
                <svg className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-medium">Important Note</p>
                  <p className="text-sm mt-1">
                    After your consultation, our team will review your profile to determine if 
                    you're a good fit for the SmartFitter program. You'll receive a notification 
                    once a decision has been made.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6">
            <Link
              to="/profile"
              className="w-full sm:w-auto px-6 py-3 mb-4 sm:mb-0 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Go to Your Profile
            </Link>
            
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-500">
                Need to reschedule? Contact our support team at{' '}
                <a href="mailto:support@smartfitter.com" className="text-amber-600 hover:text-amber-800 font-medium">
                  support@smartfitter.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
        <p className="text-gray-700">
          You'll receive an email confirmation shortly with all the details of your booking.
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
