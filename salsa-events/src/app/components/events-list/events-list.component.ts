import {Component, OnInit} from '@angular/core';
import {addYears, endOfYear, startOfToday, startOfYear} from 'date-fns';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {CalendarEvent} from 'angular-calendar';
import {DeviceDetectorService} from 'ngx-device-detector';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateRange, Message, MessageService, NaturalDateRange, Params} from '../../services/message.service';
import {inout} from '../../animations/animations';
import {MatSnackBar} from '@angular/material';
import {NoResultsComponent} from '../no-results/no-results.component';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  animations: [inout]
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    console.log('on init: ' + JSON.stringify(this.route.queryParamMap));
    this.route
      .queryParamMap
      .subscribe(params => {
        const start = params.get('start');
        const end = params.get('end');
        if (start) {
          this.startDate = new Date( start );
        }
        if (end) {
          this.endDate = new Date( end );
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
          console.log('no results snackbar');
          this.snackBar.openFromComponent(NoResultsComponent, {duration: 2000, verticalPosition: 'bottom'});
        } else {
          this.events = events;
        }
      });
  }

}
