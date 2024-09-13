import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SportSocialService } from '../services/sport-social.service';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { postsSelector } from '../store/posts/posts.selector';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/Post';
import { loadPosts } from '../store/posts/posts.actions';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';


@Component({
  selector: 'post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgFor, CommonModule, MatFormFieldModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  posts$: Observable<Post[]> = of([])

  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select(postsSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts({id: 0}));
    
  }



}
