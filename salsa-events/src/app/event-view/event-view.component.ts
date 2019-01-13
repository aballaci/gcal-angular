import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {DeviceDetectorService} from 'ngx-device-detector';
import {routeAnimations} from '../animations/animations';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import { format } from 'date-fns';
import {ModalComponent, ModalManager} from 'ngb-modal';
import {saveAs} from 'file-saver';
import {IcsService} from '../services/ics.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
  animations: [routeAnimations]
})
export class EventViewComponent implements OnInit {

  @ViewChild('eventDetailModal') eventDetailModal;

  isMobile: boolean;

  @Input()
  events: CalendarEvent[];

  @Input()
  viewDate: string;

  event: CalendarEvent;

  gcEvent: any;

  private modalRef;

  exp = '';

  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router,
    private icsService: IcsService,
    private modal: ModalManager) {
    this.isMobile = this.deviceService.isMobile();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log(event);
      this.goAnimate();
    });
  }

  indexTrackFn = (index: number) => index;

  ngOnInit() {
  }


  showModal(index: number) {
    console.log('selected event: ' + index);
    this.event = this.events[index];
    this.gcEvent = this.event.meta.event;
    console.log('showModal called' + this.eventDetailModal);
    this.modalRef = this.modal.open(this.eventDetailModal,  {
      size: 'lg',
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: 'modal-backdrop'
    });
  }

  closeModal() {
    this.modal.close(this.modalRef);
  }

  get mapUrl() {
    return 'https://maps.google.com/maps?q=' + this.gcEvent.location + '&t=&z=13&ie=UTF8&iwloc=&output=embed';
  }

  scrollToMap() {
    const map = document.querySelector('#map-target');
    console.log('scroll');
    map.scrollIntoView({behavior: 'smooth'});
  }

  goAnimate() {
    this.exp = 'goAnimate';
  }

  toJsonLd(event: CalendarEvent) {
    const gcEvent = event.meta.event;
    let jsonld = {};
    try {
      jsonld = {
        '@context': 'http://www.schema.org',
        '@type': 'DanceEvent',
        'name': event.title,
        'url': 'https://salsa.today/#/detail/' + event.id,
        'description': gcEvent.description.substring(0, 300),
        'startDate': format( event.start, 'M/d/YYYY HH:mm Z'),
        'endDate': format( event.end, 'M/d/YYYY HH:mm Z'),
        'location': {
          '@type': 'Place',
          'name': gcEvent.location.split(',')[0],
          'sameAs': 'https://salsa.today/#/detail/' + gcEvent.id,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Königstraße 11',
            'addressLocality': 'Nürnberg',
            'addressRegion': 'Nü',
            'postalCode': '90402',
            'addressCountry': 'DE'
          }
        },
        'offers': {
          '@type': 'Offer',
          'description': 'Monatliche Gebühren',
          'url': gcEvent.website,
          'price': '35',
          'priceCurrency': 'EUR',
          'availability': 'http://schema.org/InStock',
          'validFrom': format( event.start, 'M/d/YYYY HH:mm Z')
        },
        'image': [gcEvent.attachments[0].fileUrl],
        'performer': {
          '@type': 'PerformingArtist',
          'name': 'DJ JCM Latino'
        }
      };
    } catch (e) {
      console.error(e);
    } finally {
      return jsonld;
    }
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

