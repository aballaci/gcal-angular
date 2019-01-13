'use strict';
const { google } = require('googleapis');
const key = require('../salsa events-2ee5469dec3c.json');
const scopes = ['https://www.googleapis.com/auth/calendar'];
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json';
var newCal = {
    summaryOverride: '{"type":"party", "defaultLocation": "Nimrodstraße 9 Gebäude 5 90441 Nürnberg", "telefon": "01746260948", "thumbnail": "https://drive.google.com/open?id=1Qu6o6iVm3N02Ws8hRiHgKIaLXz9vSB9B"}',
    summary: "party casino cubano"
};
const calendar = google.calendar({ version: 'v3', auth: jwt });
jwt.authorize((err, response) => {
    calendar.calendars.insert({ "resource": newCal }, (err, res) => {
        if (err)
            return console.log('The API returned an error: ' + err);
        console.log(res);
    });
});
