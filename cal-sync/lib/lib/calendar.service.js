'use strict';
const { google } = require('googleapis');
const key = require('./salsa events-2ee5469dec3c.json');
const scopes = ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar'];
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
const calendar = google.calendar({ version: 'v3', auth: jwt });
const eventEmitter = require('./event.mgmt');
var constants = require('./event.mgmt').constants;
process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json';
function getCalendarList(token) {
    jwt.authorize((err, response) => {
        calendar.calendarList.list({
            //showDeleted: true,
            syncToken: token.sync_token
        }, (err, res) => {
            if (err)
                return console.log('Googleapis returned an error: ' + err);
            eventEmitter.emit(constants.CAL_API_RES, res.data);
        });
    });
}
module.exports = getCalendarList;
