import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {isSameDay} from 'date-fns';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  @Input()
  event: CalendarEvent;

  sameDayEvent: boolean;

  sameDayEventTime: string;
  sameDayEventDate: string;
  eventStartDate: string;
  eventEndDate: string;
  eventDate: string;

  constructor() {
  }

  ngOnInit() {
    if (this.event.start) {
      if (this.event.end) {
        this.sameDayEvent = isSameDay(this.event.start, this.event.end);
        if (this.sameDayEvent) {
          this.sameDayEventTime = this.formatSameDayEventTime();
          this.sameDayEventDate = this.formatSameDayEventDate();
        } else {
          this.eventStartDate = this.formatEventDate(this.event.start);
          this.eventEndDate = this.formatEventDate(this.event.end);
        }
      } else {
        this.eventDate = formatDate(this.event.start, 'dd MMM yyyy HH:mm', 'de') + ' Uhr';
      }
    }
  }


  formatSameDayEventTime() {
    return formatDate(this.event.start, 'HH:mm', 'de') + ' - ' +
      formatDate(this.event.end, 'HH:mm', 'de') + ' Uhr';
  }

  formatSameDayEventDate() {
    return formatDate(this.event.start, 'dd MMM yyyy', 'de');
  }

  formatEventDate(date: Date) {
    return formatDate(date, 'dd MMM yyyy HH:mm', 'de') + ' Uhr';
  }

}
