import {Component, OnInit} from '@angular/core';
import {addYears, endOfYear, startOfToday, startOfYear} from 'date-fns';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {CalendarEvent} from 'angular-calendar';
import {DeviceDetectorService} from 'ngx-device-detector';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateRange, Message, MessageService, NaturalDateRange, Params} from '../../services/message.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events: CalendarEvent[];
  eventType: string;
  eventSubType: string;
  startDate: Date = startOfToday();
  endDate: Date = endOfYear(new Date());

  isMobile: boolean;

  message: Message;

  show = false;

  constructor(
    private eventService: EventService,
    private deviceService: DeviceDetectorService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    console.log('on init: ' + JSON.stringify(this.route.queryParamMap));
    this.route
      .queryParamMap
      .subscribe(params => {
        const dateRange = params.get('date');
        if (dateRange) {
          const range = DateRange.getDateRange(NaturalDateRange[dateRange]);
          console.log('dateRange: ' + JSON.stringify(range));
          this.startDate = range.start;
          this.endDate = range.end;
        }
        this.eventType = params.get('eventType') || undefined;
        this.eventSubType = params.get('eventSubType') || undefined;
        this.fetchEvents();
      });
    console.log('events list on init');
  }

  fetchEvents(): void {
    let short: string;
    if (this.isMobile) {
      short = 'true';
    }
    this.eventService.fetchEvents(this.startDate, this.endDate, this.eventType, this.eventSubType, short)
      .subscribe(events => {
        if (events.length === 0) {
          this.router.navigate(['/no-results']);
        } else {
          this.events = events;
        }
      });
  }

}
