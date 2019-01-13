'use strict'

const { google } = require('googleapis')

const key = require('../salsa events-2ee5469dec3c.json')
const scopes = ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar'];
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)

process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json'

const calendar = google.calendar({version: 'v3', auth:jwt});

jwt.authorize((err, response) => {
  calendar.events.list({
    calendarId: 'kb305f3j8eh51p62hlmkd4rkeo@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        console.log(event);
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
});
