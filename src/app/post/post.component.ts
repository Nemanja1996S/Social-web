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
import { selectedSportsSelector, userIdSelector } from '../store/user/user.selector';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Dictionary } from '@ngrx/entity';
import { RouterLink } from '@angular/router';
import { loadUserFriends } from '../store/userFriends/userFiends.actions';


@Component({
  selector: 'post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule,
            NgFor, CommonModule, ReactiveFormsModule, MatFormFieldModule,
            MatInputModule, MatCheckboxModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  posts$: Observable<Post[]> = of([])
  postTextFormControl = new FormControl('', Validators.required);
  postCheckListFormControl = new FormControl('', Validators.required);
  selectedImageFile = null;
  userPostImg : string = '';
  userSelectedSport$ : Observable<string[]> = of([])
  // userSelectedSports = ['football', 'basketball', 'table tennis', 'bodybuilding'];
  userCheckedSports : string[] = []
  //userReactionToPostDict$: Observable<Dictionary<Reaction>[]> = of([])
  clicked: boolean = false
  color = 'accent';

  constructor(private store: Store<AppState>) {
    //this.postCheckListFormControl.setValue(null);
    
    //this.userSelectedSport$ = this.store.select(selectedSportsSelector);
    // this.userReactionToPostDict$ = this.store.select(userReactonToPostDictSelector);//ovde ne treba selektovanje
  }

  ngOnInit(): void {
    this.posts$ = this.store.select(postsSelector);
    this.userSelectedSport$ = this.store.select(selectedSportsSelector);
    this.store.dispatch(loadPosts({userId: 0}));
    this.store.dispatch(loadUserFriends({userId: 0}));
    
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userPostImg = URL.createObjectURL(event.target.files[0]);
  }

  onSportChecked(checkedSport: string){
    if(this.userCheckedSports.find(sport => sport === checkedSport)){
      this.userCheckedSports = this.userCheckedSports.filter(sport => sport !== checkedSport)
    }
    else{
      this.userCheckedSports.push(checkedSport)
    }
  }

  onPost(){
    console.log(this.selectedImageFile)
    console.log(this.userPostImg)
    console.log(this.postTextFormControl.value)
    console.log(this.userCheckedSports)
  }

  like(event: MouseEvent){
    this.color = 'primary'
    //console.log(event.target)
    // this.store.select(userReactonToPostDictSelector).subscribe(dict => console.log(dict))
  }

}
