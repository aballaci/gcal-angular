'use strict'

const {google} = require('googleapis');
const key = require('./salsa events-2ee5469dec3c.json')
const scopes = ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar'];
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json'

const calendar = google.calendar({version: 'v3', auth: jwt});
const eventEmitter = require('./event.mgmt');
var constants = require('./event.mgmt').constants;

function getCalendarEvents(params) {
  jwt.authorize((err, response) => {
    calendar.events.list({
      calendarId: params.calendarId,
      //timeMin: (new Date()).toISOString(),
      //maxResults: 10,
      singleEvents: true,
      showDeleted: true,
      syncToken: params.syncToken || undefined,
      pageToken: params.pageToken || undefined
      //orderBy: 'startTime',
    }, (err, res) => {
      if (err) {
        return console.log('Events service: The API returned an error: ' + err)
      } else {
        if (res.data.nextSyncToken) {
          eventEmitter.emit(constants.EVENTS_API_RES,
            {
              calendarId: params.calendarId,
              items: res.data.items,
              syncToken: res.data.nextSyncToken
            });
        } else if (res.data.nextPageToken) {
          eventEmitter.emit(constants.EVENTS_API_NEXT_PAGE_RES,
            {
              calendarId: params.calendarId,
              items: res.data.items,
              pageToken: res.data.nextPageToken
            });
        }
      }
    });
  });
}

module.exports = getCalendarEvents;


getCalendarEvents({calendarId:'t7ch2uuhqke3uph8u7aaddtc3c@group.calendar.google.com'});
