import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'newsfeed-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent {
  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private userService: UserService
  ) {}
  openBottomSheet(): void {
    if (!this.userService.currentUser) {
      this.router.navigate(['/login']);
      alert('Please login to create a post!');
      return;
    }
    this.bottomSheet.open(BottomSheetComponent);
  }
}
