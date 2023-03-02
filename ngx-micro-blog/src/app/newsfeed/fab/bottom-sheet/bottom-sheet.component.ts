import { Component, Inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  hasData: boolean = false;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId?: string },
    private postService: PostsService,
    private bottomSheet: MatBottomSheet,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {
    this.bottomSheetRef.afterOpened().subscribe(() => {
      if (this.data && this.data.postId) {
        this.hasData = true;
      } else {
        this.hasData = false;
      }
    });
    this.bottomSheetRef.afterDismissed().subscribe(() => {
      if (this.data && this.data.postId) {
        this.data.postId = undefined;
        this.hasData = false;
      }
    });
  }
  postContent: string;
  createPost() {
    const result = this.postService.createPost(this.postContent);

    this.bottomSheet.dismiss(BottomSheetComponent);
    document.getElementById('fab')?.blur();
    setTimeout(() => {
      document.getElementById('fab')?.blur();
    }, 1000);
  }
  editPost() {
    this.postService.updatePost(this.data.postId, this.postContent);
    this.bottomSheet.dismiss(BottomSheetComponent);
  }
}
