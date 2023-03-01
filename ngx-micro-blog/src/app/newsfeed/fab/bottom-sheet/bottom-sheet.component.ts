import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  constructor(
    private postService: PostsService,
    private bottomSheet: MatBottomSheet
  ) {}
  postContent: string;
  createPost() {
    this.postService.createPost(this.postContent);
    this.bottomSheet.dismiss(BottomSheetComponent);
  }
}
