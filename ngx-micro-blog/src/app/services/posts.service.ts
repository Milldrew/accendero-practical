import { Injectable } from '@angular/core';
import { Post } from '../types/core.types';

/**
 * Users can create update delte posts, and this data is viewable in the newsfeed
 */
@Injectable({
  providedIn: 'root',
})
export class PostsService {
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

  constructor() {}
}
