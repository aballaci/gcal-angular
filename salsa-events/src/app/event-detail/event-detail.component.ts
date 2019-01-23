import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  @Input()
  events: CalendarEvent[];

  @Input()
  viewDate: string;

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  constructor() { }

  hasProp(o: Object, name: string) {
    return o.hasOwnProperty(name);
  }
  ngOnInit() {
  }





}
