'use strict'

const { google } = require('googleapis')

const key = require('../salsa events-2ee5469dec3c.json')
const scopes = 'https://www.googleapis.com/auth/calendar';
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)

process.env.GOOGLE_APPLICATION_CREDENTIALS = './salsa events-2ee5469dec3c.json'

const calendar = google.calendar({version: 'v3', auth:jwt});

jwt.authorize((err, response) => {
  calendar.calendarList.patch({
     // calendarId: "ahoeq62u5in6afd95mt6r5rvvs@group.calendar.google.com",
    calendarId: "fnnfou5c12d4s54bihbrp4np50@group.calendar.google.com",
    //calendarId: "kb305f3j8eh51p62hlmkd4rkeo@group.calendar.google.com",
    resource:{
    // summaryOverride: '{"type":"kurs", "event_organiser": "Ralf Gugel", "website": "http://www.casino-cubano.de/", "defaultLocation": "Casino Cubano, Gewerbezentrum Spektrum, Nimrodstraße 9, Gebäude 5, 90441 Nürnberg", "telefon": "01746260948", "thumbnail": "https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg?auto=compress&cs=tinysrgb&h=480&w=640"}',
    summaryOverride: '{"type":"highlight"}'
  }}, (err, res) => {
    //console.log(res);
    if (err) return console.log('The API returned an error: ' + err);
    console.log(res.data)
  });
});
