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
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectedSportsSelector } from '../store/users/users.selector';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule,
            NgFor, CommonModule, ReactiveFormsModule, MatFormFieldModule,
            MatInputModule, MatCheckboxModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  posts$: Observable<Post[]> = of([])
  postTextFormControl = new FormControl('', Validators.required);
  postCheckListFormControl = new FormControl(null, Validators.required);
  selectedImageFile = null;
  userPostImg : string = '';
  //userSelectedSport$ : Observable<string[]> = of([])
  userSelectedSports = ['football', 'basketball', 'table tennis', 'bodybuilding'];
  userCheckedSports = []

  constructor(private store: Store<AppState>) {
    //this.postCheckListFormControl.setValue(null);
    this.posts$ = this.store.select(postsSelector);
    //this.userSelectedSport$ = this.store.select(selectedSportsSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts({id: 0}));
    
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userPostImg = URL.createObjectURL(event.target.files[0]);
  }

  onPost(){
    console.log(this.selectedImageFile)
    console.log(this.userPostImg)
    console.log(this.postTextFormControl.value)
    console.log(this.postCheckListFormControl.value)

  }


}
