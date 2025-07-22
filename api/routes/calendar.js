const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { calendar } = require('../config/google');

/**
 * GET /api/calendar/availability
 * Get available time slots from Google Calendar
 */
router.get('/availability', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    // Convert dates to RFC3339 format required by Google Calendar API
    const timeMin = new Date(startDate).toISOString();
    const timeMax = new Date(endDate).toISOString();
    
    // Query Google Calendar for busy times
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: 'Africa/Johannesburg', // Using the timezone from your Google Calendar
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }]
      }
    });

    const busySlots = response.data.calendars[process.env.GOOGLE_CALENDAR_ID].busy;
    
    // Define business hours (9:00 AM to 5:00 PM)
    const businessHours = {
      start: 9, // 9:00 AM
      end: 17   // 5:00 PM
    };
    
    // Generate available slots (30-minute intervals)
    const availableSlots = [];
    const slotDuration = 30; // in minutes
    
    // Loop through each day in the date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
      // Skip weekends (0 is Sunday, 6 is Saturday)
      const dayOfWeek = day.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }
      
      // Set business hours start time
      const dayStart = new Date(day);
      dayStart.setHours(businessHours.start, 0, 0, 0);
      
      // Set business hours end time
      const dayEnd = new Date(day);
      dayEnd.setHours(businessHours.end, 0, 0, 0);
      
      // Generate slots for the day
      for (let time = dayStart; time < dayEnd; time.setMinutes(time.getMinutes() + slotDuration)) {
        const slotStart = new Date(time);
        const slotEnd = new Date(time);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
        
        // Check if slot overlaps with any busy time
        const isSlotBusy = busySlots.some(busy => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return (slotStart < busyEnd && slotEnd > busyStart);
        });
        
        if (!isSlotBusy) {
          availableSlots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString()
          });
        }
      }
    }
    
    return res.json(availableSlots);
  } catch (error) {
    console.error('Error getting calendar availability:', error);
    return res.status(500).json({ message: 'Error getting availability' });
  }
});

/**
 * POST /api/calendar/book
 * Book a time slot in Google Calendar and record in database
 */
router.post('/book', async (req, res) => {
  try {
    // Extract user ID from Auth0 token
    const auth0UserId = req.auth.sub;
    
    // Get slot details from request body
    const { startTime, endTime } = req.body;
    
    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Start time and end time are required' });
    }

    // Get user profile for event details
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('auth0_user_id', auth0UserId)
      .single();

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Create event in Google Calendar
    const event = {
      summary: 'SmartFitter Consultation',
      description: `Consultation with ${userProfile.full_name} (${userProfile.email})`,
      start: {
        dateTime: startTime,
        timeZone: 'Africa/Johannesburg',
      },
      end: {
        dateTime: endTime,
        timeZone: 'Africa/Johannesburg',
      },
      attendees: [
        { email: userProfile.email }
      ],
      conferenceData: {
        createRequest: {
          requestId: `${auth0UserId}-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    const googleEventId = response.data.id;

    // Record booking in database
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        auth0_user_id: auth0UserId,
        google_calendar_event_id: googleEventId,
        start_time: startTime,
        end_time: endTime
      })
      .select();

    if (error) {
      console.error('Error creating booking record:', error);
      
      // Try to delete the Google Calendar event if database insert failed
      try {
        await calendar.events.delete({
          calendarId: process.env.GOOGLE_CALENDAR_ID,
          eventId: googleEventId
        });
      } catch (deleteError) {
        console.error('Error deleting Google Calendar event:', deleteError);
      }
      
      return res.status(500).json({ message: 'Error creating booking record' });
    }

    // Update user status to booked_session
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ user_status: 'booked_session' })
      .eq('auth0_user_id', auth0UserId);

    if (updateError) {
      console.error('Error updating user status:', updateError);
      // Continue with booking success despite status update failure
    }

    return res.status(201).json({
      message: 'Session booked successfully',
      booking: data[0],
      googleEventId,
      meetLink: response.data.hangoutLink
    });
  } catch (error) {
    console.error('Error booking calendar event:', error);
    return res.status(500).json({ message: 'Error booking session' });
  }
});

module.exports = router;
