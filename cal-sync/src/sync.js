var schedule = require('node-schedule');
var eventService = require('./event.service');
var calendarService = require('./calendar.service');
var dbService = require('./db.service');
var notifier = require('./event.mgmt');
var constants = require('./event.mgmt').constants;
var downloader = require('./imgproc/image-downloader')

var onCalendarsDbRes = ( e ) => {
  console.log('onCalendarsDbRes');
  e.forEach( calendar => {
    eventService({calendarId: calendar.id, syncToken: calendar.syncToken});
  })
}

var onCalendarsApiRes = ( data ) => {
  console.log('onCalendars recieved');
  data.items.forEach( calendar => {
    if(calendar.hasOwnProperty("summaryOverride")){
      var summary = JSON.parse(calendar.summaryOverride);
      for(var name in summary){
        calendar[name] = summary[name];
      }
    }
    console.log(calendar);
    dbService.updateCalendar(calendar)
  });
  dbService.updateCalendarListToken({cal_id: 'main', sync_token: data.nextSyncToken})
}

var onEventTokenDbRes = ( token ) => {
  console.log("onEventTokenDbRes Got event token" + token);

}

var onEventsApiRes = (event) => {
  console.log('onEventsApiRes length' + event.items.length);
  if (event.items.length > 0) {
    dbService.insertItems(event.calendarId, event.items);
    dbService.updateCalendarSyncToken({id: event.calendarId, syncToken: event.syncToken});
    downloadImages(event);
  } else {
    console.log('nothing to do... length:' + event.items.length);
  }
}

let downloadImages = (event ) => {
  console.log('downloadImages called: ' +  event.items.length);
  let files = {};
  event.items.forEach(function ( item ) {
      files[item.attachments[0].fileId] = item.attachments[0].title;
  });
  Object.keys(files).forEach(function(key) {
    console.log('Key : ' + key + ', Value : ' + files[key]);
    downloader.getImage(key, files[key], function (filename) {
      console.log('downloaded image:' + filename);
    });
  })


}

var onCalTokenDbRes = ( token ) => {
  calendarService(token)
}

var calendarEventSync = ( event ) => {
  dbService.fetchCalendars();
}

var calendarEventSync = ( event ) => {
  dbService.fetchCalendars();
}


var onEventsApiNextPageRes = ( event ) => {
  eventService({calendarId: event.calendarId, syncToken: event.syncToken, pageToken: event.pageToken});
}

var calendarSync = ( ) => {
  dbService.fetchCalendarListToken();
}

notifier.on(constants.CAL_DB_RES, onCalendarsDbRes);
notifier.on(constants.CAL_API_RES, onCalendarsApiRes);
notifier.on(constants.EVENT_TOKEN_DB_RES, onEventTokenDbRes);
notifier.on(constants.EVENTS_API_RES, onEventsApiRes);
notifier.on(constants.EVENTS_API_NEXT_PAGE_RES, onEventsApiNextPageRes);
notifier.on(constants.CAL_TOKEN_DB_RES, onCalTokenDbRes);

// calendarSync();
// calendarEventSync();

var j = schedule.scheduleJob('*/2 * * * *', function () {
  calendarEventSync();
});

var x = schedule.scheduleJob('*/10 * * * *', function () {
  calendarSync();
});





