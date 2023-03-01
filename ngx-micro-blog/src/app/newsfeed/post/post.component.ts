import { Component, Input } from '@angular/core';
import { Post } from 'src/app/types/core.types';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;
}
