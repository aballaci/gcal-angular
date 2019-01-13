import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  styleUrls: ['calendar-header.component.css'],
  template: ` <div class="row mb-sm-2">
      <div class="col-6 text-center">
        <h3 class="cal-month-title">{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
      </div>
      <div class="col-6 text-center">
          <div
            class="btn btn-primary"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            &nbsp;<i class="fa fa-angle-left"></i>&nbsp;
          </div>
          <div
            class="btn btn-primary  mat-raised-button"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            &nbsp;<i class="fa fa-angle-right"></i>&nbsp;
          </div>
          <div
            class="btn btn-primary"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Heute
          </div>
      </div>
    </div>
  `
})
export class CalendarHeaderComponent {
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: 'de';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();
}
