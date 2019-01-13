import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CalendarComponent} from './calendar/calendar.component';
import {PlaylistsComponent} from './playlists/playlists.component';
import {SignupComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';
import {MobDetailComponent} from './mob-detail/mob-detail.component';
import {NoResultsComponent} from './components/no-results/no-results.component';
import {EventsListComponent} from './components/events-list/events-list.component';
import {PlaylistComponent} from './components/playlist/playlist.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'detail/:id', component: MobDetailComponent, data: {animation: 'DetailPage'} },
  { path: 'calendar', component: CalendarComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'about', component: ProfileComponent, data: {animation: 'ProfilePage'} },
  { path: 'signup', component: SignupComponent, data: {animation: 'SignupPage'} },
  { path: 'no-results', component: NoResultsComponent, data: {animation: 'NoResultsPage'}  },
  { path: 'events', component: EventsListComponent, data: {animation: 'EventsPage'} },
  { path: 'playlist/:id', component: PlaylistComponent, data: {animation: 'PlaylistPage'} },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
