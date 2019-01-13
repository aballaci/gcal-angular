import {Component, OnInit} from '@angular/core';
import {addYears, startOfYear} from 'date-fns';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {CalendarEvent} from 'angular-calendar';
import {DeviceDetectorService} from 'ngx-device-detector';
import {EventService} from '../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateRange, Message, MessageService, NaturalDateRange, Params} from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  isMobile: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
  }

}
