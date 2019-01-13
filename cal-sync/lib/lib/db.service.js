"use strict";
const db = require('./db');
const SyncToken = require("./sync.token");
const Calendar = require("./calendar");
const Event = require("./event");
const constants = require('./event.mgmt').constants;
var notifier = require('./event.mgmt');
module.exports.fetchEventsToken = function fetchToken(cal_id) {
    SyncToken.findOne({ cal_id: cal_id }, 'sync_token cal_id').then(token => {
        console.log("fetchEventsToken: " + token);
        if (token === null)
            token = { cal_id: cal_id };
        if (token.sync_token === null) {
            token.sync_token = undefined;
        }
        notifier.emit(constants.EVENT_TOKEN_DB_RES, token);
    });
};
module.exports.fetchCalendarListToken = function fetchToken() {
    SyncToken.findOne({ cal_id: "main" }, 'sync_token').then(token => {
        console.log("got token: " + token);
        if (token === null)
            token = {};
        if (token.sync_token === null) {
            token.sync_token = undefined;
        }
        notifier.emit(constants.CAL_TOKEN_DB_RES, token);
    });
};
module.exports.updateToken = function updateToken(token) {
    console.log("updateToken inserting sync-token: " + token.cal_id + ":" + token.sync_token);
    if (!token.sync_token)
        return;
    SyncToken.updateOne({ "cal_id": token.cal_id }, { $set: token }, { upsert: true })
        .then(ret => {
        console.log("updateToken " + token + " result: " + ret);
        notifier.emit(constants.CAL_TOKEN_UPDATED, ret);
    })
        .catch(console.error);
};
module.exports.updateCalendarListToken = (token) => {
    console.log("updateCalendarListToken inserting sync-token main:" + JSON.stringify(token));
    if (!token.sync_token)
        return;
    SyncToken.updateOne({ 'cal_id': 'main' }, { $set: token }, { upsert: true })
        .then(res => console.log(res))
        .catch(console.error);
};
module.exports.insertItems = function insertItems(calendarId, items) {
    if (!items)
        return;
    items.forEach(function (item) {
        item.calendarId = calendarId;
        var start = item.start.dateTime || item.start.date;
        item.start = start;
        var end = item.end.dateTime || item.end.date;
        item.end = end;
        // Insert documents
        Event.updateOne({ 'id': item.id }, { $set: item }, { upsert: true })
            .catch(err => {
            console.error(err);
        });
    });
};
module.exports.updateCalendar = (calendar) => {
    if (!calendar)
        return;
    // Insert document
    Calendar.updateOne({ 'id': calendar.id }, { $set: calendar }, { upsert: true })
        .catch(err => {
        console.error(err);
    });
};
module.exports.updateCalendarSyncToken = (event) => {
    // Insert document
    Calendar.updateOne({ 'id': event.id }, { $set: { syncToken: event.syncToken } })
        .catch(err => {
        console.error(err);
    });
};
module.exports.fetchCalendars = function fetchCalendars() {
    console.log("fetching calendars");
    Calendar.find({ deleted: { $exists: false }, id: { $ne: 'salsaeventsde@gmail.com' } }).select('id syncToken').lean()
        .then(res => {
        notifier.emit(constants.CAL_DB_RES, res);
        console.log("got calendars: " + res);
    })
        .catch(err => {
        console.error(err);
    });
};
