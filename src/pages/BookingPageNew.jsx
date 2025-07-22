import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { calendarAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const BookingPageNew = () => {
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
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
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
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] pb-16">
      {/* Header */}
      <header className="p-4 border-b border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#CCC1BE]">Book Your Session</h1>
          <p className="text-sm text-[#E5E7EB]/70 mt-1">Select a time that works for you</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4">
        {error && (
          <div className="bg-[#232323] border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#E5E7EB]">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Date Range Selector */}
        <div className="mb-8">
          <label htmlFor="date-range" className="block text-[#CCC1BE] mb-2">
            View availability for the next:
          </label>
          <select
            id="date-range"
            onChange={handleDateRangeChange}
            className="bg-[#232323] text-[#E5E7EB] border border-[#2A2A2A] rounded px-4 py-2 w-full md:w-auto"
            defaultValue="14"
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
          </select>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#CCC1BE]"></div>
            <span className="ml-3 text-[#E5E7EB]/70">Loading available slots...</span>
          </div>
        )}

        {/* No Available Slots */}
        {!isLoading && availableSlots.length === 0 && (
          <div className="bg-[#232323] rounded-lg p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#CCC1BE]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-[#E5E7EB]">No available slots</h3>
            <p className="mt-1 text-[#E5E7EB]/70">
              Try selecting a different date range or check back later.
            </p>
          </div>
        )}

        {/* Available Slots */}
        {!isLoading && availableSlots.length > 0 && (
          <>
            <div className="space-y-6">
              {Object.entries(groupSlotsByDate()).map(([date, slots]) => (
                <div key={date} className="bg-[#232323] rounded-lg overflow-hidden">
                  <div className="bg-[#2A2A2A] px-4 py-3">
                    <h3 className="text-lg font-medium text-[#CCC1BE]">{date}</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotSelect(slot)}
                        className={`p-3 rounded-md border text-center transition-colors ${
                          selectedSlot && selectedSlot.id === slot.id
                            ? 'bg-[#CCC1BE]/20 border-[#CCC1BE] text-[#CCC1BE]'
                            : 'border-[#2A2A2A] hover:border-[#CCC1BE]/60 text-[#E5E7EB]'
                        }`}
                      >
                        {formatTime(slot.start)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Slot Summary */}
            {selectedSlot && (
              <Card className="mt-8 bg-[#232323] border-[#2A2A2A]">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-[#CCC1BE]">Selected Time Slot</h3>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-[#CCC1BE] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-[#E5E7EB]">{formatDate(selectedSlot.start)}</p>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-[#CCC1BE] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[#E5E7EB]">{formatTime(selectedSlot.start)}</p>
                        <Badge variant="outline" className="ml-2 text-[#CCC1BE] border-[#CCC1BE]/50">30 mins</Badge>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleBookSlot}
                      disabled={isBooking}
                      className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium py-2 h-auto disabled:opacity-70"
                    >
                      {isBooking ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1A1A1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* About Section */}
        <Card className="mt-8 bg-[#232323] border-[#2A2A2A]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#2A2A2A] rounded-full p-3 hidden sm:flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#CCC1BE] mb-3">About Your Consultation</h3>
                <div className="space-y-2 text-[#E5E7EB]/80">
                  <p>This is a 30-minute video consultation with our team to discuss your fitness goals and how SmartFitter can help you achieve them.</p>
                  <p>After your consultation, our team will review your profile and determine if you're a good fit for our program.</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-[#CCC1BE]">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Duration: 30 minutes</p>
                  </div>
                  <div className="flex items-center text-[#CCC1BE]">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p>Format: Video call (link will be sent via email)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPageNew;
