import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavigationPublic from '../components/NavigationPublic';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const BookSessionPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  
  // State management
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState('');
  const [isTimezoneDialogOpen, setIsTimezoneDialogOpen] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Detect user's timezone on mount
  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(detectedTimezone);
    
    // Mock available dates (in real app, fetch from API)
    const mockDates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        mockDates.push(date);
      }
    }
    setAvailableDates(mockDates);
  }, []);

  // Mock available times for selected date
  useEffect(() => {
    if (selectedDate) {
      const mockTimes = [
        { id: 1, start: '9:00 AM', end: '10:00 AM', value: '09:00' },
        { id: 2, start: '10:30 AM', end: '11:30 AM', value: '10:30' },
        { id: 3, start: '2:00 PM', end: '3:00 PM', value: '14:00' },
        { id: 4, start: '3:30 PM', end: '4:30 PM', value: '15:30' },
        { id: 5, start: '5:00 PM', end: '6:00 PM', value: '17:00' }
      ];
      setAvailableTimes(mockTimes);
    }
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTimezone = (tz) => {
    const shortTz = tz.split('/').pop().replace('_', ' ');
    return `${shortTz} (${new Date().toLocaleString('en-US', { timeZoneName: 'short', timeZone: tz }).split(', ')[1]})`;
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsConfirmed(true);
      setIsLoading(false);
    }, 2000);
  };

  const downloadCalendarFile = () => {
    // Mock .ics file download
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SmartFitter//EN
BEGIN:VEVENT
DTSTART:${selectedDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${selectedDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:SmartFitter Discovery Session
DESCRIPTION:Your discovery session with SmartFitter
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smartfitter-session.ics';
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] flex items-center justify-center">
        <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-[#CCC1BE] mb-4">Authentication Required</h2>
            <p className="text-[#E5E7EB]/80 mb-6">Please log in to book a session.</p>
            <Link to="/">
              <Button className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black">
                Return Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB]">
        <NavigationPublic />
        
        {/* Session Confirmed View */}
        <div className="pt-24 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Confirmation Header */}
            <div className="mb-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-[#E5E7EB] mb-4">Session Confirmed!</h1>
              <p className="text-xl text-[#E5E7EB]/80">
                Your session is booked for {selectedDate && formatDate(selectedDate)} at {selectedTime?.start}
              </p>
            </div>

            {/* Session Details Card */}
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#CCC1BE] mb-6">Session Details</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#E5E7EB]">Date: {selectedDate && formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#E5E7EB]">Time: {selectedTime?.start} - {selectedTime?.end}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#E5E7EB]">Location: Video Conference</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Calendar Button */}
            <Button 
              onClick={downloadCalendarFile}
              className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-semibold py-3 px-8 mb-8 w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Add to Calendar
            </Button>

            {/* Share Section */}
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#CCC1BE] mb-4">Share SmartFitter</h3>
                <p className="text-[#E5E7EB]/80 mb-6">Know someone who might be interested? Share SmartFitter with them!</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="border-[#CCC1BE] text-[#CCC1BE] hover:bg-[#CCC1BE] hover:text-black">
                    Share via Email
                  </Button>
                  <Button variant="outline" className="border-[#CCC1BE] text-[#CCC1BE] hover:bg-[#CCC1BE] hover:text-black">
                    Share on LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Prepare for Session */}
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A]">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#CCC1BE] mb-4">Prepare for Your Session</h3>
                <p className="text-[#E5E7EB]/80 mb-6">Get the most out of your discovery session with these resources:</p>
                <div className="space-y-4">
                  <Button variant="ghost" className="w-full justify-start text-[#E5E7EB] hover:text-[#CCC1BE]">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    Session Guidelines (PDF)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-[#E5E7EB] hover:text-[#CCC1BE]">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Preparation Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB]">
      <NavigationPublic />
      
      {/* Header Section */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-[#CCC1BE] hover:text-[#E5E7EB] p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB]">Book Your Discovery Session</h1>
              <p className="text-[#E5E7EB]/80 mt-2">Select a convenient time for your introduction call. All times are shown in your local timezone.</p>
            </div>
          </div>

          {/* Timezone Selection */}
          <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#E5E7EB] font-medium">Your timezone: </span>
                  <span className="text-[#CCC1BE]">{formatTimezone(timezone)}</span>
                </div>
                <Dialog open={isTimezoneDialogOpen} onOpenChange={setIsTimezoneDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-[#CCC1BE] hover:text-[#E5E7EB]">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#232323] border-[#2A2A2A]">
                    <DialogHeader>
                      <DialogTitle className="text-[#E5E7EB]">Select Timezone</DialogTitle>
                    </DialogHeader>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] text-[#E5E7EB]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#232323] border-[#2A2A2A]">
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Booking Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Calendar */}
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-[#CCC1BE]">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || !availableDates.some(d => 
                      d.toDateString() === date.toDateString()
                    );
                  }}
                  className="rounded-md border-[#2A2A2A]"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center text-[#E5E7EB]",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-[#CCC1BE]",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-[#E5E7EB]/60 rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#CCC1BE]/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal text-[#E5E7EB] hover:bg-[#CCC1BE]/20 hover:text-[#E5E7EB] aria-selected:opacity-100",
                    day_selected: "bg-[#CCC1BE] text-black hover:bg-[#CCC1BE] hover:text-black focus:bg-[#CCC1BE] focus:text-black",
                    day_today: "bg-[#2A2A2A] text-[#CCC1BE]",
                    day_outside: "text-[#E5E7EB]/30 opacity-50",
                    day_disabled: "text-[#E5E7EB]/30 opacity-50",
                    day_range_middle: "aria-selected:bg-[#CCC1BE]/10 aria-selected:text-[#E5E7EB]",
                    day_hidden: "invisible",
                  }}
                />
              </CardContent>
            </Card>

            {/* Available Times */}
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-[#CCC1BE]">
                  {selectedDate ? `Available Times for ${formatDate(selectedDate)}` : 'Select a date to see available times'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-3">
                    {availableTimes.map((time) => (
                      <Button
                        key={time.id}
                        variant={selectedTime?.id === time.id ? "default" : "outline"}
                        className={`w-full justify-start text-left p-4 h-auto ${
                          selectedTime?.id === time.id 
                            ? 'bg-[#CCC1BE] text-black hover:bg-[#CCC1BE]/90' 
                            : 'border-[#2A2A2A] text-[#E5E7EB] hover:border-[#CCC1BE]/50 hover:text-[#CCC1BE]'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="font-medium">{time.start} - {time.end}</div>
                          <div className="text-sm opacity-70">60 minute session</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#E5E7EB]/60">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <p>Please select a date to view available times</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Alert */}
          <Alert className="bg-[#232323] border-[#2A2A2A] mb-8">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <AlertDescription className="text-[#E5E7EB]/80">
              You'll receive a confirmation email with a calendar invite (.ics) and an SMS reminder (if a phone number is provided).
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Sticky Confirm Booking Footer */}
      {selectedDate && selectedTime && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="text-[#E5E7EB]">
              <div className="font-medium">Selected:</div>
              <div className="text-sm text-[#CCC1BE]">
                {formatDate(selectedDate)} • {selectedTime.start}
              </div>
            </div>
            <Button 
              onClick={handleConfirmBooking}
              disabled={isLoading}
              className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-semibold py-3 px-8"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Confirming...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSessionPage;
