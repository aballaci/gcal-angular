'use strict';
var flatten = require('flat');
const { google } = require('googleapis');
const key = require('../salsa events-2ee5469dec3c.json');
const scopes = ['https://www.googleapis.com/auth/calendar'];
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json';
const calendar = google.calendar({ version: 'v3', auth: jwt });
jwt.authorize((err, response) => {
    calendar.acl.list({ calendarId: "ahoeq62u5in6afd95mt6r5rvvs@group.calendar.google.com" }, (err, res) => {
        if (err)
            return console.log('The API returned an error: ' + err);
        console.log(flatten(res.data));
    });
});
