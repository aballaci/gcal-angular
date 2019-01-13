import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() {
  }

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  show() {
    console.log('show: true');
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  hide() {
    console.log('show: false');
    this.loaderSubject.next(<LoaderState>{show: false});
  }
}
