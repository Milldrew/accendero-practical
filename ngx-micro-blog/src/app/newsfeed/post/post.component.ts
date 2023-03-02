import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/types/core.types';
import { BottomSheetComponent } from '../fab/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  currentUserId: string;
  @Input() post: Post;
  constructor(
    private bottomSheet: MatBottomSheet,
    public userService: UserService,
    private postService: PostsService
  ) {
    if (this.currentUserId) {
      this.currentUserId = this.userService.currentUser.userId;
    }
  }
  editPost(postId: string) {
    this.bottomSheet.open(BottomSheetComponent, {
      data: { postId },
    });
  }
  deletePost(postId: string) {
    this.postService.deletePost(postId);
  }
  ngAfterViewInit() {
    console.log(JSON.stringify(this.post));
    console.log(JSON.stringify(this.userService.currentUser));
  }
  ngDoCheck() {
    if (this.userService.currentUser) {
      this.currentUserId = this.userService.currentUser.userId;
    }
  }
}
