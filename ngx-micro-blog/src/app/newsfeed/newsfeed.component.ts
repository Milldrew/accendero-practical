import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../types/core.types';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent {
  //allPosts: Post[];
  constructor(public postService: PostsService) {
    /*
    this.postService.postsSubject.subscribe((posts) => {
      console.log('postsSubject', posts);
      this.allPosts = [
        ...posts.sort((postA, postB) => {
          return Number(postB.timestamp) - Number(postA.timestamp);
        }),
      ];
    });
    */
  }
  ngAfterContentChecked() {
    //this.allPosts = this.postService.allPosts;
  }
  checkForNewPosts() {
    this.postService.getAllPosts();
  }
}
