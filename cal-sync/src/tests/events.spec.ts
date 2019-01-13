import assert   from 'assert';
import chai = require('chai')
import { should } from 'chai';
import chaiDateTime = require('chai-datetime');
chai.use(chaiDateTime);
should();




let events :Array<any> = [{
  kind: 'calendar#event',
  etag: '"3082735709292000"',
  id: '1pcck6uk6kegqheft7j1jm1aoh_20181111T203000Z',
  status: 'confirmed',
  htmlLink: 'https://www.google.com/calendar/event?eid=MXBjY2s2dWs2a2VncWhlZnQ3ajFqbTFhb2hfMjAxODExMTFUMjAzMDAwWiBrYjMwNWYzajhlaDUxcDYyaGxta2Q0cmtlb0Bn',
  created: '2018-11-04T18:20:40.000Z',
  updated: '2018-11-04T21:44:14.646Z',
  summary: 'sunday party',
  creator: {email: 'hankybob333@gmail.com'},
  organizer:
    {
      email: 'kb305f3j8eh51p62hlmkd4rkeo@group.calendar.google.com',
      displayName: 'test7',
      self: true
    },
  start:
    {
      dateTime: '2018-11-11T21:30:00+01:00',
      timeZone: 'Europe/Berlin'
    },
  end:
    {
      dateTime: '2018-11-11T23:30:00+01:00',
      timeZone: 'Europe/Berlin'
    },
  recurringEventId: '1pcck6uk6kegqheft7j1jm1aoh',
  originalStartTime:
    {
      dateTime: '2018-11-11T21:30:00+01:00',
      timeZone: 'Europe/Berlin'
    },
  iCalUID: '1pcck6uk6kegqheft7j1jm1aoh@google.com',
  sequence: 0,
  attendees:
    [{email: 'salsaeventsde@gmail.com', responseStatus: 'declined'}],
  extendedProperties: {private: {everyoneDeclinedDismissed: '-1'}},
  reminders: {useDefault: true},
  attachments:
    [{
      fileUrl: 'https://drive.google.com/file/d/1_UOUHL6Eb2OjWkO1ehdSm6ojIK696Hnn/view?usp=drive_web',
      title: 'terminal.jpg',
      mimeType: 'image/jpeg',
      iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg',
      fileId: '1_UOUHL6Eb2OjWkO1ehdSm6ojIK696Hnn'
    }]
},
  {
    kind: 'calendar#event',
    etag: '"3082735709292000"',
    id: '1pcck6uk6kegqheft7j1jm1aoh_20181118T203000Z',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=MXBjY2s2dWs2a2VncWhlZnQ3ajFqbTFhb2hfMjAxODExMThUMjAzMDAwWiBrYjMwNWYzajhlaDUxcDYyaGxta2Q0cmtlb0Bn',
    created: '2018-11-04T18:20:40.000Z',
    updated: '2018-11-04T21:44:14.646Z',
    summary: 'sunday party',
    creator: {email: 'hankybob333@gmail.com'},
    organizer:
      {
        email: 'kb305f3j8eh51p62hlmkd4rkeo@group.calendar.google.com',
        displayName: 'test7',
        self: true
      },
    start:
      {
        dateTime: '2018-11-18T21:30:00+01:00',
        timeZone: 'Europe/Berlin'
      },
    end:
      {
        dateTime: '2018-11-18T23:30:00+01:00',
        timeZone: 'Europe/Berlin'
      },
    recurringEventId: '1pcck6uk6kegqheft7j1jm1aoh',
    originalStartTime:
      {
        dateTime: '2018-11-18T21:30:00+01:00',
        timeZone: 'Europe/Berlin'
      },
    iCalUID: '1pcck6uk6kegqheft7j1jm1aoh@google.com',
    sequence: 0,
    attendees:
      [{email: 'salsaeventsde@gmail.com', responseStatus: 'declined'}],
    extendedProperties: {private: {everyoneDeclinedDismissed: '-1'}},
    reminders: {useDefault: true},
    attachments:
      [{
        fileUrl: 'https://drive.google.com/file/d/1_UOUHL6Eb2OjWkO1ehdSm6ojIK696Hnn/view?usp=drive_web',
        title: 'terminal.jpg',
        mimeType: 'image/jpeg',
        iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg',
        fileId: '1_UOUHL6Eb2OjWkO1ehdSm6ojIK696Hnn'
      }]
  }];

describe('test event transformation', function () {

  it("converts the event", function() {

    var firstStart = new Date(events[0].start.dateTime || events[0].start.date);
      var converted = events.map(e => {
        e.start = e.start.dateTime || e.start.date;
        e.end = e.end.dateTime || e.end.date;
        return e });

    firstStart.should.equalDate(new Date(converted[0].start))
  });

});

