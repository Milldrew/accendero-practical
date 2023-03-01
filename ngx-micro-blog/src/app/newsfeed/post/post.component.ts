import { Component, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/types/core.types';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  currentUserId = this.userService.currentUser.userId;
  @Input() post: Post;
  constructor(
    public userService: UserService,
    private postService: PostsService
  ) {}
  editPost(postId: string) {
    this.postService.updatePost(postId, 'This is the new post content');
  }
  deletePost(postId: string) {
    this.postService.deletePost(postId);
  }
}
