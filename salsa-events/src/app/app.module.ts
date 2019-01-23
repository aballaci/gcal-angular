import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {AppComponent} from './app.component';
import {DemoUtilsModule} from './demo-utils/module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {registerLocaleData} from '@angular/common';
import localeDE from '@angular/common/locales/de';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FilterComponent} from './filter/filter.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {CalendarComponent} from './calendar/calendar.component';
import {HomeComponent} from './home/home.component';
import {PlaylistsComponent} from './playlists/playlists.component';
import {SignupComponent} from './signup/signup.component';
import { EventViewComponent } from './event-view/event-view.component';
import {ProfileComponent} from './profile/profile.component';
import {SplitAndGetPipe} from './pipes/split.and.get.pipe';
import { MobDetailComponent } from './mob-detail/mob-detail.component';
import {SafePipe} from './pipes/sanitize.url.safe';
import { DateComponent } from './components/date/date.component';
import { AddressComponent } from './components/address/address.component';
import { MatNavComponent } from './mat-nav/mat-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatBottomSheetModule,
  MatChipsModule,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
  MatButtonToggleModule,
  MatLabel,
  MatFormFieldModule,
  MatExpansionModule,
  MatRippleModule,
  MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatInputModule, MatSnackBarModule
} from '@angular/material';
import {MyHammerConfig} from './my-hammer.config';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { BottomSheetHandleComponent } from './components/bottom-sheet-handle/bottom-sheet-handle.component';
import { MobFilterComponent } from './components/mob-filter/mob-filter.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptorService } from './services/loader.interceptor.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AddressShortComponent } from './components/address-short/address-short.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { MobMenuBottomComponent } from './components/mob-menu-bottom/mob-menu-bottom.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import {NgxJsonLdModule} from 'ngx-json-ld';
import {ModalModule} from 'ngb-modal';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(localeDE);


// @ts-ignore
@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoUtilsModule,
    FormsModule,
    NgbModule.forRoot(),
    NgbModule,
    ModalModule,
    DeviceDetectorModule.forRoot(),
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatChipsModule,
    ScrollingModule,
    MatRippleModule,
    NgxJsonLdModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    EventDetailComponent,
    FilterComponent,
    HeaderComponent,
    CalendarComponent,
    HomeComponent,
    PlaylistsComponent,
    SignupComponent,
    EventViewComponent,
    ProfileComponent,
    SplitAndGetPipe,
    SafePipe,
    MobDetailComponent,
    DateComponent,
    AddressComponent,
    MatNavComponent,
    BottomSheetComponent,
    BottomSheetHandleComponent,
    MobFilterComponent,
    NoResultsComponent,
    LoaderComponent,
    AddressShortComponent,
    ReadMoreComponent,
    HighlightsComponent,
    MobMenuBottomComponent,
    EventsListComponent,
    PlaylistComponent
  ],
  entryComponents: [
    BottomSheetComponent,
    BottomSheetHandleComponent
  ],
  exports: [],
  providers: [
     {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

