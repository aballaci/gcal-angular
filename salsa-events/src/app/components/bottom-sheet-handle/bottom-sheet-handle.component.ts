import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-bottom-sheet-handle',
  templateUrl: './bottom-sheet-handle.component.html',
  styleUrls: ['./bottom-sheet-handle.component.scss']
})
export class BottomSheetHandleComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    document.body.style.overflow = 'hidden';
    this.bottomSheet.open(BottomSheetComponent);
  }

  ngOnInit() {
  }

}
