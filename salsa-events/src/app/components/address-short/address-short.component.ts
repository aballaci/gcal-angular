import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-address-short',
  templateUrl: './address-short.component.html',
  styleUrls: ['./address-short.component.scss']
})
export class AddressShortComponent implements OnInit {

  @Input()
  address: string;

  name: string;
  stadt?: string;

  hasError: boolean;

  constructor() { }

  ngOnInit() {
    try {
      const addrArray = this.address.split(',');
      this.name = addrArray[0];
      const plzStadt = /(\d{5})\s*(.+)?$/gim.exec(this.address);

      if (plzStadt) {
        if (plzStadt[2]) {
          this.stadt = plzStadt[2].split(',')[0];
        }

      }
    } catch (e) {
      console.log(e + ' input: ' + this.address);
      this.hasError = true;
    }
  }

}
