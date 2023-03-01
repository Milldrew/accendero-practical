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
  currentUserId = this.userService.currentUser.userId;
  @Input() post: Post;
  constructor(
    private bottomSheet: MatBottomSheet,
    public userService: UserService,
    private postService: PostsService
  ) {}
  editPost(postId: string) {
    this.bottomSheet.open(BottomSheetComponent, {
      data: { postId },
    });
  }
  deletePost(postId: string) {
    this.postService.deletePost(postId);
  }
}
