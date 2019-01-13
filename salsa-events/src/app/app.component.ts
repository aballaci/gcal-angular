import {ChangeDetectionStrategy, Component, OnInit, NgZone, HostListener, OnDestroy, EventEmitter, ViewContainerRef} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CdkScrollable, ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import {Observable, Subject, Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {RouterOutlet, Scroll} from '@angular/router';
import {routeAnimations, scrollAnimation} from './animations/animations';
import {ModalManager} from 'ngb-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [scrollAnimation, routeAnimations],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly scroll = new Subject<Scroll>();
  private subscription: Subscription;

  isMobile: boolean;

  state = 'show';

  debounceTime = 300;

  debouncedScroll = new EventEmitter();

  ngOnInit(): void {
    if ( this.isMobile ) {
      this.listenToScroll();
    }
  }

  constructor(private deviceService: DeviceDetectorService,
              private scrollDispatcher: ScrollDispatcher,
              private zone: NgZone,
              ) {
    this.isMobile = this.deviceService.isMobile();
    if (this.isMobile) {
      let lastOffset: number;
      let lastDirection: string;
      scrollDispatcher.scrolled()
        .pipe(debounceTime(this.debounceTime))
        .subscribe((scrollEvent: CdkScrollable) => {
        if (scrollEvent) {
          const offset = scrollEvent.measureScrollOffset('top');
          const direction = (offset > lastOffset) ? 'DOWN' : 'UP';
          if (lastDirection === 'DOWN' && direction === 'UP') {
            // console.log('turning up --> show lastOffset: ' + lastOffset + ' offset:' + offset);
            this.zone.run(() => {
              this.state = 'show';
            });
          } else if (lastDirection === 'UP' && direction === 'DOWN') {
            console.log('turning down --> hide lastOffset: ' + lastOffset + ' offset:' + offset);
            this.zone.run(() => {
              this.state = 'hide';
            });
          }
          lastDirection = direction;
          lastOffset = offset;
        }
      });
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  @HostListener('window:scroll', ['$event'])
  scrollEvent($event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.scroll.next($event);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private listenToScroll() {
    let lastOffset: number;
    let lastDirection: string;
    this.subscription = this.scroll
      .pipe(debounceTime(this.debounceTime))
      .subscribe(event => {
        const offset = document.documentElement.scrollTop;
        const direction = (offset > lastOffset) ? 'DOWN' : 'UP';
        if (lastDirection === 'DOWN' && direction === 'UP') {
          console.log('turning up --> show lastOffset: ' + lastOffset + ' offset:' + offset);
          this.zone.run(() => {
            this.state = 'show';
          });
        } else if (lastDirection === 'UP' && direction === 'DOWN') {
          console.log('turning down --> hide lastOffset: ' + lastOffset + ' offset:' + offset);
          this.zone.run(() => {
            this.state = 'hide';
          });
        }
        lastDirection = direction;
        lastOffset = offset;
      });
  }


}
