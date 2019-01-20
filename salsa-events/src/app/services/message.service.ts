import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  addDays, addMonths,
  addWeeks, endOfMonth,
  endOfToday,
  endOfTomorrow,
  endOfWeek, startOfMonth,
  startOfToday,
  startOfTomorrow,
  startOfWeek,
  subDays,
  subWeeks
} from 'date-fns';

import { CalendarEvent } from 'angular-calendar';


export interface DateRange {
  start: Date;
  end?: Date;
}

export enum Kategorie {
  party = 'party',
  kurs = 'kurs',
  workshop = 'workshop',
  festival = 'festival',
  highlight = 'highlight'
}


export enum SubKategorie {
  salsa = 'salsa',
  salsa_cubana = 'salsa_cubana',
  rueda = 'rueda' ,
  salsa_in_linee = 'salsa_in_linee',
  bachata = 'bachata',
  kizomba = 'kizomba',
  zouk = 'zouk',
  cha_cha = 'cha_cha',
  merenuge = 'merenuge',
  reggaeton = 'reggaeton',
  son = 'son',
  other = 'other',
}

export enum NaturalDateRange {
  today = 'today',
  tomorrow = 'tomorrow',
  this_weekend = 'this_weekend',
  this_week = 'this_week',
  next_week = 'next_week' ,
  this_month = 'this_month',
  next_month = 'next_month'
}

export namespace DateRange {
  export function getDateRange(range: NaturalDateRange): DateRange {
    const now = new Date();
    console.log('Called with range: ' + range);
    switch (range) {
      case NaturalDateRange.today: return  {start: startOfToday(), end: endOfToday()}
      case NaturalDateRange.tomorrow: return  {start: startOfTomorrow(), end: endOfTomorrow()}
      case NaturalDateRange.this_weekend: return  {start: addDays(startOfWeek(now), 4), end: endOfWeek(now)}
      case NaturalDateRange.this_week: return  {start: startOfWeek(now), end: endOfWeek(now)}
      case NaturalDateRange.next_week: return  {start: endOfWeek(now), end: addWeeks(endOfWeek(now), 1)}
      case NaturalDateRange.this_month: return  {start: startOfMonth(now), end: endOfMonth(now)}
      case NaturalDateRange.next_month: return  {start: endOfMonth(now), end: addMonths(endOfMonth(now), 1)}
      default:
      {
        console.log('Error in getDateRange unknown range:' + range);
        return undefined;
      }
    }
  }
}

export interface Params {key: string; value: any; }

export interface Message {
  action: string;
  params?: Params[] | undefined;
}


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  sendMessage(message: Message) {
    this.subject.next( message );
  }

  sendEvent(event: CalendarEvent) {
    this.subject.next(event);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
