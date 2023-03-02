import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../types/core.types';
import { UserService } from './user.service';

/**
 * Users can create update delte posts, and this data is viewable in the newsfeed
 */
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  allPosts: Post[] = [];
  domain = environment.apiDomain;
  constructor(private userService: UserService, private http: HttpClient) {
    this.getAllPosts();
  }
  getAllPosts() {
    return this.http
      .get<Post[]>(`${this.domain}/api/post`)
      .subscribe((posts) => {
        this.allPosts = posts;
      });
  }
  createPost(postContent: string) {
    const TIMESTAMP = String(Date.now());
    if (!this.userService.currentUser)
      return console.error('No user logged in');
    return this.http
      .post<Post>(`${this.domain}/api/post`, {
        userId: this.userService.currentUser.userId,
        username: this.userService.currentUser.username,
        body: postContent,
        timestamp: TIMESTAMP,
      })
      .subscribe((post: Post) => {
        this.allPosts.unshift(post);
      }, console.error);
  }
  deletePost(postId: string): void {
    const postIndex = this.allPosts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) this.allPosts.splice(postIndex, 1);
  }
  updatePost(postId: string | undefined, postContent: string): void {
    const postToUpdate = this.allPosts.find((post) => post.postId === postId);
    if (postToUpdate) postToUpdate.body = postContent;
  }
}
