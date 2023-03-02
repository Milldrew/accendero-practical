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
  allPosts: Post[] = [
    {
      postId: '1',
      userId: '1',
      username: 'John',
      body: 'This is a post',
    },
    {
      postId: '2',
      userId: '2',
      username: 'Jane',
      body: 'This is another post',
    },
    {
      postId: '3',
      userId: '3',
      username: 'Joe',
      body: 'This is a third post',
    },
    {
      postId: '4',
      userId: '4',
      username: 'Jill',
      body: 'This is a fourth post it has a lot more text than the other posts even some lorem ipsum text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
    },
  ];

  createPost(postContent: string) {
    if (!this.userService.currentUser)
      return console.error('No user logged in');
    return this.http
      .post<Post>(`${this.domain}/api/post`, {
        userId: this.userService.currentUser.userId,
        username: this.userService.currentUser.username,
        body: postContent,
      })
      .subscribe((post: Post) => {
        this.allPosts.push(post);
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
