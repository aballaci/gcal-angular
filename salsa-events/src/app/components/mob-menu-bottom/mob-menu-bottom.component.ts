import {Component, OnInit} from '@angular/core';
import {DateRange, Kategorie, NaturalDateRange, SubKategorie} from '../../services/message.service';
import {MatBottomSheetRef} from '@angular/material';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {Params, Router} from '@angular/router';
import {inout} from '../../animations/animations';
import {MatDatepickerInputEvent} from '@angular/material/typings/esm5/datepicker';
import {addMonths, endOfDay, endOfMonth, format, startOfDay, startOfToday} from 'date-fns';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-mob-menu-bottom',
  templateUrl: './mob-menu-bottom.component.html',
  styleUrls: ['./mob-menu-bottom.component.scss'],
  animations: [inout]
})
export class MobMenuBottomComponent implements OnInit {

  showSubKategorien: boolean;

  eventType: Kategorie;

  selectedDate: DateRange;

  eventSubType: SubKategorie;

  eventsVector: number[];

  level = 'first';

  // enums
  kat = Kategorie;
  ndr = NaturalDateRange;
  subKat = SubKategorie;

  constructor(
    private router: Router,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
  }

  selectKategorie(kategorie: Kategorie) {
    this.eventType = kategorie;
    this.level = 'second';
    // this.router.navigate(['/events'], {queryParams: {'date': 'this_month', 'eventType': this.eventType}});
  }


  selectDate(date: NaturalDateRange | MatDatepickerInputEvent<Date>) {
    if ((<MatDatepickerInputEvent<Date>>date).value) {
      console.log('it is a MatDatepickerInputEvent: ' + (<MatDatepickerInputEvent<Date>>date).value);
      const start = startOfDay((<MatDatepickerInputEvent<Date>>date).value);
      const end = endOfDay((<MatDatepickerInputEvent<Date>>date).value);
      this.selectedDate = {start: start, end: end};
    } else {
      this.selectedDate = DateRange.getDateRange(<NaturalDateRange>date);
    }
    if (this.eventSubType) {
      this.ok();
    } else {
      console.log('setting the second level');
      this.level = 'second';
    }
  }

  resetSelection() {
    this.selectedDate = null;
    this.eventType = null;
    this.eventSubType = null;
  }

  close() {
    event.preventDefault();
  }

  setSubKategorie(eventSubType: SubKategorie) {
    this.eventSubType = eventSubType;
    if (this.selectedDate) {
      this.ok();
    } else {
      this.level = 'second';
    }
  }

  ok() {
    console.log('in OK');
    const params: Params = {};
    if (this.selectedDate && this.selectedDate.start) {
      params['start'] = format(this.selectedDate.start, 'MM-DD-YYYY-HH:mm');
    }
    if (this.selectedDate && this.selectedDate.end) {
      params['end'] = format(this.selectedDate.end, 'MM-DD-YYYY-HH:mm');
    }
    if (this.eventType) {
      params['eventType'] = this.eventType;
    }
    if (this.eventSubType) {
      params['eventSubType'] = this.eventSubType;
    }
    if (params === {}) {
      console.error('empty params for the call!!');
      return;
    }
    this.resetSelection();
    this.level = 'first';
    this.router.navigate(['/events'], {queryParams: params});
    this.close();
  }

  myFilter = (d: Date): boolean => {
    const day = format(d, 'M-D');
    return this.eventsVector[day] > 0;
  }

  dateClass = (d: Date) => {
    const day = format(d, 'M-D');
    const dayEvents = this.eventsVector[day];
    return dayEvents ? 'evt badge-' + dayEvents : undefined;
  }

  loadEventsVector() {
    console.log('loading events vector...');
    this.eventService.fetchEventsVector(
      startOfToday(),
      endOfMonth(addMonths(new Date(), 2)),
      this.eventType,
      this.eventSubType)
      .subscribe(result => {
        this.eventsVector = result;
        this.level = 'datum';
      });
  }

}
