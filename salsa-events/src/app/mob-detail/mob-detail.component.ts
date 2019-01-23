import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventService } from '../services/event.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { IcsService } from '../services/ics.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mob-detail',
  templateUrl: './mob-detail.component.html',
  styleUrls: ['./mob-detail.component.css']
})
export class MobDetailComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private icsService: IcsService,
    private router: Router) { }

  event: CalendarEvent;
  gcEvent: any;
  mapUrl: string;

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.getEvent(params.get('id'));
      }
    );

  }

  getEvent(id: string) {
    this.eventService.getEventById(id)
      .subscribe(event => {
        this.event = event[0];
        this.gcEvent = this.event.meta.event;
        const location = (this.gcEvent.location) ? this.gcEvent.location : this.gcEvent.defaultLocation;
        if (location) {
          this.mapUrl = 'https://maps.google.com/maps?q=' + location + '&t=&z=13&ie=UTF8&iwloc=&output=embed';
        }
      });
  }

  getImageSrc(size = 'sm', den = '1x', ext?: string) {
    const fileId: string = this.gcEvent.attachments[0].fileId;
    const fileName: string = this.gcEvent.attachments[0].title;
    const fnParts = fileName.split('.');
    const extension = ext ? ext : fnParts[1];
    return '/img/' + fileId + '-' + size + '_' + den + '.' + extension + ' ' + den;
  }

  getImageSrcset() {
    const sources: string[] = new Array();
    sources.push(this.getImageSrc('sm', '2x'));
    sources.push(this.getImageSrc('md', '1x'));
    sources.push(this.getImageSrc('md', '2x'));
    return sources.join(',');
  }

  scrollToMap() {
    const map = document.querySelector('#map-target');
    console.log('scroll');
    map.scrollIntoView({behavior: 'smooth'});
  }

  downloadIcs() {
    const icsData = this.icsService.getIcsCalendar({
      description: this.gcEvent.description,
      location: this.gcEvent.location,
      title: this.event.title,
      startDate: this.event.start,
      endDate: this.event.end
    });
    console.log(icsData);
    const blob = this.icsService.getIcsBlob(icsData);
    const fileName = this.icsService.getIcsFileName(this.event.title);
    saveAs(blob, fileName);
  }
}
