import {Component, ChangeDetectionStrategy, OnInit, ViewChild, TemplateRef, Inject} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, DAYS_OF_WEEK, CalendarMonthViewDay} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { colors } from '../demo-utils/colors';
import {
  isToday,
  isSameMonth,
  isSameDay,
  isAfter,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  startOfToday,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import {DeviceDetectorModule, DeviceDetectorService} from 'ngx-device-detector';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

interface Event {
  id: number;
  summary: string;
  description: string;
  start: any;
  type: string;
}
const timezoneOffset = new Date().getTimezoneOffset();
const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(
  2,
  '0'
);
const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
const direction = timezoneOffset > 0 ? '-' : '+';
const timezoneOffsetString = `T00:00:00${direction}${hoursOffset}${minutesOffset}`;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  model = {
    left: true,
    middle: false,
    right: false
  };

  view = 'month';

  eventType: string;

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ event: Event }>>> = new Observable<Array<CalendarEvent<{ event: Event }>>>();

  dayEvents: Array<CalendarEvent<{ event: Event }>> = new Array<CalendarEvent<{event: Event}>>();

  locale = 'de';

  event: CalendarEvent;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  activeDayIsOpen = true;

  deviceInfo = null;

  constructor(private http: HttpClient, private modal: NgbModal, private deviceService: DeviceDetectorService,
              @Inject(DOCUMENT) private document: any) {
    this.epicFunction();
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    // console.log(this.deviceInfo);
    // if (!isDesktopDevice) {
    //   this.document.location.href = environment.mobileVersionUrl;
    // }
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    this.dayEvents = new Array<CalendarEvent<{event: Event}>>();

    this.activeDayIsOpen = false;

    let params = new HttpParams()
      .set(
        'start',
        format(startOfMonth(this.viewDate), 'YYYY-MM-DD H:mm')
      ).set(
        'end',
        format(endOfMonth(this.viewDate), 'YYYY-MM-DD H:mm')
      );

    if (this.eventType) {
      params = params.set(
        'type', this.eventType
      );
    }

    // console.log('params: ' + params);
    this.events$ = this.http
      .get<Event[]>(environment.serviceUrl, { params })
      .pipe(
        map(events => {
          let firstDayWithEvents: Date = startOfToday();
          let foundFirst = false;
          const result = events
            .filter((event: Event) => event.type !== 'highlight')
            .map((event: Event) => {
            const e: CalendarEvent =  {
              title: event.summary,
              start: new Date(event.start),
              color: colors.yellow,
              meta: {
                event: event
              }
            };
            if (!foundFirst && ( isSameDay(e.start, startOfToday()) || isAfter(e.start, startOfToday()))) {
              firstDayWithEvents = startOfDay(e.start);
              foundFirst = true;
              this.activeDayIsOpen = true;
              this.viewDate = firstDayWithEvents;
              this.dayEvents.push(e);
            } else if (isSameDay(e.start, firstDayWithEvents)) {
              this.dayEvents.push(e);
            }
            return e;
          });
          return result;
        })
      );
  }

  dayClicked({
               date,
               events
             }: {
    date: Date;
    events: Array<CalendarEvent<{ event: Event }>>;
  }): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        ( !isSameDay(this.viewDate, date) && events.length > 0 )) {
        this.viewDate = date;
        this.dayEvents = events;
        this.activeDayIsOpen = true;
      }
    }
  }
  getDate(aDate): Date {
    if (aDate.hasOwnProperty('date')) {
      return new Date(aDate.date);
    }
    return new Date(aDate.dateTime);

  }

  eventClicked(event: CalendarEvent) {
    this.event = event;
    this.modal.open(this.modalContent, { centered: true, size: 'lg', backdropClass: '' });
  }

  filterEvents(event: string) {
    this.eventType = (this.eventType === event) ? '' : event;
    this.fetchEvents();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      const groups: any = {};
      cell.events.forEach((event: CalendarEvent) => {
        groups[event.meta.event.type] = groups[event.meta.event.type] || [];
        groups[event.meta.event.type].push(event);
      });
      cell['eventGroups'] = Object.entries(groups);
    });
  }
}

