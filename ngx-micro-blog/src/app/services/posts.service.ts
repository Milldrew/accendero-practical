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
        this.allPosts = posts.sort((postA, postB) => {
          return Number(postB.timestamp) - Number(postA.timestamp);
        });
      })
      .add(() => {
        this.postsSubject.next(this.allPosts);
      });
  }
  createPost(postContent: string) {
    // Who is posting comes from the session token, not from this request.
    return this.http
      .post<Post>(`${this.domain}/api/post`, { body: postContent })
      .subscribe({ error: console.error })
      .add(() => this.getAllPosts());
  }
  deletePost(postId: string) {
    this.allPosts = this.allPosts.filter((post) => post.postId !== postId);
    this.postsSubject.next(this.allPosts);
    return this.http
      .delete(`${this.domain}/api/post/${postId}`)
      .subscribe({ error: console.error })
      .add(() => this.getAllPosts());
  }
  updatePost(postId: string | undefined, postContent: string) {
    if (!postId) return console.error('No post id provided');
    const postToUpdate = this.allPosts.find((post) => post.postId === postId);
    if (postToUpdate) postToUpdate.body = postContent;
    return this.http
      .patch<Post>(`${this.domain}/api/post/${postId}`, { body: postContent })
      .subscribe({ error: console.error })
      .add(() => this.getAllPosts());
  }
  emitPosts() {
    this.postsSubject.next(this.allPosts);
  }
}
