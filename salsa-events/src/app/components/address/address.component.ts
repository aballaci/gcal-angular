import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input()
  address: string;

  @Input()
  short?: boolean;

  name: string;
  strasse: string;
  plz?: string;
  stadt?: string;
  land?: string;

  constructor() { }

  ngOnInit() {
    const addrArray = this.address.split(',');
    if (typeof addrArray[0] !== 'undefined') {
      this.name = addrArray[0];
    }
    if (typeof addrArray[1] !== 'undefined') {
      this.strasse = addrArray[1];
    }
    if (typeof addrArray[2] !== 'undefined') {
      this.plz = addrArray[2];
    }
    if (typeof addrArray[3] !== 'undefined') {
      this.stadt = addrArray[3];
    }
    if (typeof addrArray[4] !== 'undefined') {
      this.land = addrArray[4];
    }
  }

}
