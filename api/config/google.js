const { google } = require('googleapis');

// Create Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: new google.auth.JWT(
    process.env.VITE_GOOGLE_CLIENT_ID,
    null,
    process.env.GOOGLE_CLIENT_SECRET,
    ['https://www.googleapis.com/auth/calendar'],
    null
  )
});

module.exports = {
  calendar,
};
