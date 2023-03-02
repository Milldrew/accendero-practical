import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  postsSubject = new Subject<Post[]>();
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
      })
      .add(() => {
        this.postsSubject.next(this.allPosts);
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
  deletePost(postId: string) {
    return this.http
      .delete(`${this.domain}/api/post/${postId}`)
      .subscribe((message) => {
        console.log(message);
      })
      .add(() => {
        debugger;
        this.getAllPosts();
      });
  }
  updatePost(postId: string | undefined, postContent: string): void {
    const postToUpdate = this.allPosts.find((post) => post.postId === postId);
    if (postToUpdate) postToUpdate.body = postContent;
  }
  emitPosts() {
    this.postsSubject.next(this.allPosts);
  }
}
