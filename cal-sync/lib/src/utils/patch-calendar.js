'use strict';
const { google } = require('googleapis');
const key = require('../salsa events-2ee5469dec3c.json');
const scopes = 'https://www.googleapis.com/auth/calendar';
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json';
const calendar = google.calendar({ version: 'v3', auth: jwt });
jwt.authorize((err, response) => {
    calendar.calendarList.patch({
        calendarId: "ahoeq62u5in6afd95mt6r5rvvs@group.calendar.google.com",
        //calendarId: "kb305f3j8eh51p62hlmkd4rkeo@group.calendar.google.com",
        resource: {
            summaryOverride: '{"type":"party", "event_organiser": "Ralf Gugel", "website": "http://www.casino-cubano.de/", "defaultLocation": "Nimrodstraße 9 Gebäude 5 90441 Nürnberg", "telefon": "01746260948", "thumbnail": "http://www.casino-cubano.de/files/cc-theme-2016/Bilder-Hintergrund/Salsa-Cubana-Nuernberg-Team-001-max.jpg"}',
        }
    }, (err, res) => {
        //console.log(res);
        if (err)
            return console.log('The API returned an error: ' + err);
        console.log(res.data);
    });
});
