import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { calendarAPI } from '../services/api';

const BookingPage = () => {
  const { profile, syncProfile } = useProfile();
  const navigate = useNavigate();
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
  });
  
  // Check if user can access this page
  useEffect(() => {
    if (profile && profile.user_status !== 'nda_signed' && profile.user_status !== 'prospect') {
      // If user has already booked a session or beyond, redirect to profile
      navigate('/profile');
    }
  }, [profile, navigate]);
  
  // Fetch available time slots
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const slots = await calendarAPI.getAvailability(
          dateRange.startDate.toISOString(),
          dateRange.endDate.toISOString()
        );
        
        setAvailableSlots(slots);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError('Unable to fetch available time slots. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAvailability();
  }, [dateRange]);
  
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  
  const handleDateRangeChange = (e) => {
    const days = parseInt(e.target.value, 10);
    
    setDateRange({
      startDate: new Date(),
      endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    });
  };
  
  const handleBookSlot = async () => {
    if (!selectedSlot) return;
    
    try {
      setIsBooking(true);
      setError(null);
      
      // Book the selected time slot
      await calendarAPI.bookSession(selectedSlot.start, selectedSlot.end);
      
      // Refresh the user profile to get the updated status
      await syncProfile();
      
      // Show booking confirmation
      navigate('/booking-confirmation');
    } catch (err) {
      console.error('Error booking session:', err);
      setError('Failed to book your session. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };
  
  // Format a date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format a time for display
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  
  // Group slots by date
  const groupSlotsByDate = () => {
    const groups = {};
    
    availableSlots.forEach(slot => {
      const date = formatDate(slot.start);
      
      if (!groups[date]) {
        groups[date] = [];
      }
      
      groups[date].push(slot);
    });
    
    return groups;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-600">Book Your Consultation</h1>
          <p className="text-gray-500 mt-1">Select an available time slot that works for you</p>
        </div>
        <img 
          src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
          alt="SmartFitter Logo" 
          className="h-12" 
        />
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg shadow-sm">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 border border-gray-200">
        <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-amber-900">Select a Date and Time</h2>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-amber-700 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-amber-800">30-minute consultation</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:mr-4">
              Show availability for the next:
            </label>
            <select
              id="date-range"
              value={(dateRange.endDate - dateRange.startDate) / (24 * 60 * 60 * 1000)}
              onChange={handleDateRangeChange}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-sm"
              disabled={isLoading}
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Checking availability...</p>
              </div>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 rounded-lg p-4 flex items-start">
              <svg className="h-6 w-6 text-amber-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-medium">No available slots found</p>
                <p className="mt-1 text-sm">Please try a different date range or check back later.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupSlotsByDate()).map(([date, slots]) => (
                <div key={date} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {date}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleSlotSelect(slot)}
                        className={`py-3 px-4 text-sm rounded-lg transition-colors shadow-sm ${
                          selectedSlot && selectedSlot.start === slot.start
                            ? 'bg-amber-600 text-white font-medium ring-2 ring-offset-2 ring-amber-500'
                            : 'bg-white border border-gray-300 hover:bg-amber-50 hover:border-amber-300'
                        }`}
                      >
                        {formatTime(slot.start)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {selectedSlot && (
          <div className="px-6 py-5 bg-gradient-to-r from-amber-50 to-amber-100 border-t border-amber-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0 bg-white p-3 rounded-lg border border-amber-200 shadow-sm">
                <p className="text-xs uppercase font-semibold text-amber-800 mb-1">Selected Appointment</p>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium text-gray-900">{formatDate(selectedSlot.start)} at {formatTime(selectedSlot.start)}</p>
                </div>
              </div>
              
              <button
                onClick={handleBookSlot}
                disabled={isBooking}
                className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70 transition-colors shadow-md flex items-center"
              >
                {isBooking ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirm Booking
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 shadow-sm border border-amber-200">
        <div className="flex items-start">
          <div className="bg-amber-100 rounded-full p-3 mr-4 hidden sm:block">
            <svg className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-3">About Your Consultation</h3>
            <div className="prose prose-amber text-gray-700">
              <p>This is a 30-minute video consultation with our team to discuss your fitness goals and how SmartFitter can help you achieve them.</p>
              <p>After your consultation, our team will review your profile and determine if you're a good fit for our program.</p>
              <div className="mt-4 flex items-center text-amber-700">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">Duration: 30 minutes</p>
              </div>
              <div className="mt-2 flex items-center text-amber-700">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <p className="font-medium">Format: Video call (link will be sent via email)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
