import { Component, OnInit } from '@angular/core';
import {Kategorie, NaturalDateRange, SubKategorie} from '../../services/message.service';
import {MatBottomSheetRef} from '@angular/material';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {Params, Router} from '@angular/router';
import {inout} from '../../animations/animations';

@Component({
  selector: 'app-mob-menu-bottom',
  templateUrl: './mob-menu-bottom.component.html',
  styleUrls: ['./mob-menu-bottom.component.scss'],
  animations: [inout]
})
export class MobMenuBottomComponent implements OnInit {

  showSubKategorien: boolean;

  eventType: Kategorie;

  selectedDate: NaturalDateRange;

  eventSubType: SubKategorie;

  level = 'first';

  // enums
  kat = Kategorie;
  ndr = NaturalDateRange;
  subKat = SubKategorie;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  selectKategorie(kategorie: Kategorie) {
    this.eventType = kategorie;
    this.level = 'second';
    // this.router.navigate(['/events'], {queryParams: {'date': 'this_month', 'eventType': this.eventType}});
  }


  selectDate(date: NaturalDateRange) {
    this.selectedDate = date;
    if (this.eventSubType) {
      this.ok();
    } else {
      this.level = 'third';
    }
  }

  resetSelection() {
    this.selectedDate = this.eventType = this.eventSubType = undefined;
  }

  close() {
    event.preventDefault();
  }

  setSubKategorie(eventSubType: SubKategorie) {
    this.eventSubType = eventSubType;
    if (this.selectedDate) {
      this.ok();
    } else {
      this.level = 'third';
    }
  }

  ok() {
    console.log('in OK');
    const params: Params = {};
    if (this.selectedDate) {
      params['date'] = this.selectedDate;
    } else {
      params['date'] = NaturalDateRange.this_month;
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

}
