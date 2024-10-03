import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SportSocialService } from '../services/sport-social.service';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { postsSelector } from '../store/posts/posts.selector';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/Post';
import { deletePost, editPost, loadPosts, loadPostsForSports } from '../store/posts/posts.actions';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectedSportsSelector, userIdSelector, userSelector } from '../store/user/user.selector';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Dictionary } from '@ngrx/entity';
import { Router, RouterLink } from '@angular/router';
import { loadUserFriends } from '../store/userFriends/userFiends.actions';
import { initialUser } from '../store/user/user.reducer';
import { User } from '../../models/User';
import { DialogComponent } from '../dialog/dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EditPostDialogComponent, EditPostDialogOutputData } from '../edit-post-dialog/edit-post-dialog.component';
import { loadPostReactions } from '../store/postReactions/postReactions.actions';


@Component({
  selector: 'post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule,
            NgFor, CommonModule, ReactiveFormsModule, MatFormFieldModule,
            MatInputModule, MatCheckboxModule, MatIcon, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
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
  user: User = initialUser;
  // userSelectedSports = ['football', 'basketball', 'table tennis', 'bodybuilding'];
  userCheckedSports : string[] = []
  //userReactionToPostDict$: Observable<Dictionary<Reaction>[]> = of([])
  clicked: boolean = false
  color = 'accent';
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router) {
    //this.postCheckListFormControl.setValue(null);
    
    //this.userSelectedSport$ = this.store.select(selectedSportsSelector);
    // this.userReactionToPostDict$ = this.store.select(userReactonToPostDictSelector);//ovde ne treba selektovanje
  }

  ngOnInit(): void {
    this.posts$ = this.store.select(postsSelector);
    this.userSelectedSport$ = this.store.select(selectedSportsSelector);
    this.store.select(userSelector).subscribe(user => this.user = user)
    // if(history.state){
    //   console.log("history state")
    //   console.log(history.state)
    //   this.store.dispatch(loadPostsForSports({userId: 0, selectedSports: history.state}))
    // }
    // else{
    //   this.store.dispatch(loadPosts({userId: 0}));
    // }
    this.store.dispatch(loadPosts({userId: 0}));
    this.store.dispatch(loadUserFriends({userId: 0}));
    this.store.dispatch(loadPostReactions({userId: 0}))
    
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

  getUser(userId: number): void{
    this.service.getUserById(userId).subscribe(user => {this.router.navigateByUrl('/home/user', {state: user})})
  }

  getSportsArrayforPost(post: Post): string[]{
    return post.forSports.map(sport => {return ` ${sport}`})
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, postId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: "Delete post:", content: "Would you like to delete this post?", confirmString: "Yes", cancelString: "No"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)
        this.store.dispatch(deletePost({postId: postId}))       //delete post
      }
    });
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, post: Post): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: "Edit post:", post: post, user: this.user, confirmString: "Save", cancelString: "Cancel"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result as EditPostDialogOutputData){
        let editText: string = result.postText
        let imgUrl = ''
        if(result.selectedImage){
          imgUrl = URL.createObjectURL(result.selectedImage)
        }
        console.log(result)
        this.store.dispatch(editPost({postId: post.id, postText: editText, postImage: imgUrl}));
      }
    });
  }

}
