import { Injectable } from '@angular/core';
import { Utils } from '../utils/Utils';
import {formatDate} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class IcsService {

  constructor() { }

  getIcsCalendar(data: any) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//salsa.today//salsa.today v. 1.0//DE',
      'BEGIN:VEVENT',
      'UID:' + Utils.getUid(),
      'DTSTAMP:' + Utils.getTimeCreated(),
      'CLASS:PUBLIC',
      'DESCRIPTION:' + Utils.formatIcsText(data.description, 62),
      'DTSTART:' + formatDate(data.startDate, 'yyyyMMddTHHmmss', 'de'),
      'DTEND:' + formatDate(data.endDate, 'yyyyMMddTHHmmss', 'de'),
      'LOCATION:' + Utils.formatIcsText(data.location, 64),
      'SUMMARY:' + Utils.formatIcsText(data.title, 63),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  getIcsFileName(title: string): string {
    return Utils.getIcsFileName(title);
  }

  getIcsBlob(data: any): Blob {
    return Utils.getIcsBlob(data);
  }

}
