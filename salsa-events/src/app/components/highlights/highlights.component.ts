import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {addYears, endOfYear, startOfToday, startOfYear} from 'date-fns';
import {EventService} from '../../services/event.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Kategorie} from '../../services/message.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {

  events: CalendarEvent[];

  startDate: Date = startOfToday();
  endDate: Date = endOfYear(new Date());

  isMobile: boolean;


  constructor(private eventService: EventService,
              private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.fetchEvents(this.startDate, this.endDate, Kategorie.highlight)
      .subscribe(events => {
        this.events = events.filter(x => x.meta.event.status === 'confirmed');
      });
  }

}
