import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {endOfMonth, format, startOfYear} from 'date-fns';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {colors} from '../demo-utils/colors';
import { CalendarEvent } from 'angular-calendar';
import {Observable} from 'rxjs';

interface Event {
  id: number;
  summary: string;
  description: string;
  start: any;
  end: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  fetchEvents(startDate: Date, endDate: Date, eventType?: string, eventSubType?: string, short?: string): Observable<CalendarEvent[]> {
    let params = new HttpParams()
      .set(
        'start',
        format(startDate, 'YYYY-MM-DD H:mm')
      ).set(
        'end',
        format(endDate, 'YYYY-MM-DD H:mm')
      );

    if (eventType) {
      params = params.set(
        'type', eventType
      );
    }

    if (eventSubType) {
      params = params.set(
        'eventSubType', eventSubType
      );
    }

    if (short && short === 'true') {
      params = params.set(
        'short', short
      );
    }

    return this.http
      .get<Event[]>(environment.serviceUrl, { params })
      .pipe(
        map(events => this.toCalendarEvent(events))
      );
  }

  getEventById(id: string) {
    const url = `${environment.serviceUrl}/${id}`;
    return this.http.get<Event[]>(url)
      .pipe(
        map(events => this.toCalendarEvent(events))
      );
  }

  toCalendarEvent(events: Event[]) {
    return events.map((event: Event) => {
      const e: CalendarEvent =  {
        title: event.summary,
        start: new Date(event.start),
        end: (event.end) ? new Date(event.end) : undefined,
        color: colors.yellow,
        meta: {
          event: event
        }
      };
      return e;
    });
  }
}
