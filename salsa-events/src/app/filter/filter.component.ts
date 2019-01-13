import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  eventType: string;

  @Output()
  changeSelection: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
