import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {Kategorie, MessageService, NaturalDateRange, SubKategorie} from '../../services/message.service';
import {Params, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-mob-filter',
  templateUrl: './mob-filter.component.html',
  styleUrls: ['./mob-filter.component.scss'],
  animations: [trigger('open-closed', [
    // ...
    state('initial', style({
      opacity: 1,
    })),
    state('selected', style({
      top: 0
    })),
    state('notSelected', style({
      opacity: 0.0,
      width: 0,
      margin: 0,
      padding: 0,
      border: 'none'
    })),
    transition('initial => selected', [
      animate('1s ease-in')
    ]),
    transition('initial => notSelected', [
      animate('1s ease-in')
    ]),
    transition('selected => notSelected', [
      animate('2s')
    ]),
    transition('notSelected => initial', [
      animate('0.5s')
    ]),
  ])]
})
export class MobFilterComponent implements OnInit {

  showSubKategorien: boolean;

  eventType: Kategorie;

  selectedDate: NaturalDateRange;

  eventSubType: SubKategorie;

  // enums
  kat = Kategorie;
  ndr = NaturalDateRange;
  subKat = SubKategorie;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  selectKategorie(kategorie: Kategorie) {
    this.eventType = (this.eventType !== kategorie) ? kategorie : undefined;
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
    this.bottomSheetRef.dismiss();
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

  getTypeState(id: string): string {
    if (!this.eventType) {
      return 'initial';
    } else {
      if (this.eventType === id) {
        return 'selected';
      } else {
        return 'notSelected';
      }
    }
  }

  getDateTypeState(id: string): string {
    if (!this.selectedDate) {
      return 'initial';
    } else {
      if (this.selectedDate === id) {
        return 'selected';
      } else {
        return 'notSelected';
      }
    }
  }
}
