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
    console.log('=====================');
    console.log(this.domain);
    console.log('=====================');
  }
  getAllPosts() {
    return this.http
      .get<Post[]>(`${this.domain}/api/post`)
      .subscribe((posts) => {
        this.allPosts = posts.sort((postA, postB) => {
          return Number(postB.timestamp) - Number(postA.timestamp);
        });
      })
      .add(() => {
        this.postsSubject.next(this.allPosts);
      });
  }
  createPost(postContent: string) {
    const TIMESTAMP = String(Date.now());
    if (!this.userService.currentUser) {
      return console.error('No user logged in');
    }
    return this.http
      .post<Post>(`${this.domain}/api/post`, {
        userId: this.userService.currentUser.userId,
        username: this.userService.currentUser.username,
        body: postContent,
        timestamp: TIMESTAMP,
      })
      .subscribe((post: Post) => {
        console.log(post, 'POST CREATED');
      }, console.error)
      .add(() => {
        this.getAllPosts();
      });
  }
  deletePost(postId: string) {
    return this.http
      .delete(`${this.domain}/api/post/${postId}`)
      .subscribe((message) => {
        console.log(message);
      }, console.error)
      .add(() => {
        setTimeout(() => {
          this.getAllPosts();
        }, 1000);
      });
    const deletedPost = this.allPosts.findIndex(
      (post) => post.postId === postId
    );
    if (deletedPost > 0) this.allPosts.splice(deletedPost, 1);
    this.postsSubject.next(this.allPosts);
  }
  updatePost(postId: string | undefined, postContent: string) {
    debugger;
    const postToUpdate = this.allPosts.find((post) => post.postId === postId);

    if (postToUpdate) postToUpdate.body = postContent;
    if (!postId) return console.error('No post id provided');

    debugger;
    return this.http
      .patch<Post>(`${this.domain}/api/post/${postId}`, {
        body: postContent,
      })
      .subscribe((post) => {
        debugger;
        console.log(post, 'POST UPDATED');
      }, console.error);
  }
  emitPosts() {
    this.postsSubject.next(this.allPosts);
  }
}
