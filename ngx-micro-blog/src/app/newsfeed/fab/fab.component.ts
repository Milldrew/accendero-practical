import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'newsfeed-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent {
  constructor(private bottomSheet: MatBottomSheet) {}
  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
