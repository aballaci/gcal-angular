import { Component, OnInit } from '@angular/core';
import {Kategorie, NaturalDateRange, SubKategorie} from '../../services/message.service';
import {MatBottomSheetRef} from '@angular/material';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {Params, Router} from '@angular/router';

@Component({
  selector: 'app-mob-menu-bottom',
  templateUrl: './mob-menu-bottom.component.html',
  styleUrls: ['./mob-menu-bottom.component.scss']
})
export class MobMenuBottomComponent implements OnInit {

  showSubKategorien: boolean;

  eventType: Kategorie;

  selectedDate: NaturalDateRange;

  eventSubType: SubKategorie;

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
    this.eventType = (this.eventType !== kategorie) ? kategorie : undefined;
    this.router.navigate(['/events'], {queryParams: {'date': 'this_month', 'eventType': this.eventType}});
  }

  selectDate(date: NaturalDateRange) {
    this.selectedDate = (this.selectedDate !== date) ? date : undefined;
    console.log('selectDate: '  + this.selectedDate + ' eventType: ' + this.eventType);
    if (this.eventType === Kategorie.party) {
      this.router.navigate(['/home'], {queryParams: {'date': date, 'eventType': Kategorie.party}});
      this.close();
    }
  }

  close() {
    event.preventDefault();
  }

  showWeitereKategorien() {
    this.showSubKategorien = !this.showSubKategorien;
  }

  setSubKategorie(eventSubType: SubKategorie) {
    this.eventSubType = eventSubType;
    this.ok();
  }

  ok() {
    const params: Params = {};
    if (this.selectedDate) {
      params['date'] = this.selectedDate;
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
    this.router.navigate(['/home'], {queryParams: params});
    this.close();
  }

}
