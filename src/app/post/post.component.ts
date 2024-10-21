import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SportSocialService } from '../services/sport-social.service';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { loggedInUserPostsSelector, postsSelector } from '../store/posts/posts.selector';
import { find, mergeMap, switchMap, Observable, of } from 'rxjs';
import { Post, ReactionEnum, UserReaction } from '../../models/Post';
import { addPost, deletePost, dislikePost, editPost, likePost, loadPosts, loadPostsForSports, reactToPost } from '../store/posts/posts.actions';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectedSportsSelector, userIdSelector, userSelector } from '../store/user/user.selector';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Dictionary } from '@ngrx/entity';
import { Router, RouterLink } from '@angular/router';
// import { loadUserFriends } from '../store/friends/friends.actions';
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




@Component({
  selector: 'post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule,
            NgFor, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatCheckboxModule,
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
  user: User | any = {};
  user$: Observable<User> = of()
  // userSelectedSports = ['football', 'basketball', 'table tennis', 'bodybuilding'];
  userCheckedSports : string[] = []
  //userReactionToPostDict$: Observable<Dictionary<Reaction>[]> = of([])
  clicked: boolean = false
  color = 'accent';
  // userPostReactions$ : Observable<UserPostReaction[]> = of([])
  userReaction$ : Observable<UserReaction[][]> = of()
  colorforReactButton$ : Observable<string> = of('')
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router) {
    //this.postCheckListFormControl.setValue(null);
    
    //this.userSelectedSport$ = this.store.select(selectedSportsSelector);
    // this.userReactionToPostDict$ = this.store.select(userReactonToPostDictSelector);//ovde ne treba selektovanje
  }

  ngOnInit(): void {
    // this.posts$ = this.store.select(postsSelector);
    // this.userSelectedSport$ = this.store.select(selectedSportsSelector);
    this.user$ = this.store.select(userSelector);
    // this.user$.subscribe({next: (user) => this.user = user})
    this.user$.subscribe(user => {
      
      this.user = user
      // console.log(this.user)
      this.store.dispatch(loadPosts({userId: user.id}))
      this.posts$ = this.store.select(postsSelector);
      this.userSelectedSport$ = this.store.select(selectedSportsSelector);
     // this.userReaction$ = this.store.select(userReactionForPostsSelector)
     
    
    })
    // this.user$.subscribe(user => {this.user = user;})
    // this.user$.subscribe(user => this.store.dispatch(loadPosts({userId: user.id})));
    // if(history.state){
    //   console.log("history state")
    //   console.log(history.state)
    //   this.store.dispatch(loadPostsForSports({userId: 0, selectedSports: history.state}))
    // }
    // else{
    //   this.store.dispatch(loadPosts({userId: 0}));
    // }
    
    // this.store.dispatch(loadUserFriends({userId: 0}));
    // this.store.dispatch(loadPostReactions({userId: 0}))
    // this.userPostReactions$ = this.store.select(allUserReactionsSelector)
    
  }

  // getUserReactionForPost(postId: number): number{
  //    this.userPostReactions$.subscribe(reactions => reactions.find(reaction => reaction.postId === postId))
  //   this.userPostReactions$.pipe(find(reaction => reaction.postId === postId))
  // }

  getUserReactionForPost(post: Post): number{
    const userReaction = post.usersReactions.find(userReaction => userReaction.userId === this.user.id)
    if(userReaction)
      return userReaction.reactionEnum
    return 0;
 }

//  getUserReactionForPostObsrvable(post: Post, isLike: boolean): Observable<string>{
//   const userReaction = post.usersReactions.find(userReaction => userReaction.userId === this.user.id)
//   if(userReaction){
//     if(isLike && userReaction.reactionEnum === ReactionEnum.like){
//       return of('primary');
//     }
//     else if(userReaction.reactionEnum === ReactionEnum.dislike){
//       return of('accent')
//     }
//   }
//     return of('')
// }

// getUserReactionForPost(post: Post, isLike: boolean): string{
//   const userReaction = post.usersReactions.find(userReaction => userReaction.userId === this.user.id)
//   if(userReaction){
//     if(isLike){
//       return 'primary';
//     }
//     else if(userReaction.reactionEnum === ReactionEnum.dislike){
//       return 'accent'
//     }
//   }
//     return ''
// }

 getColorForLikeButton(post: Post): string{
    if(this.getUserReactionForPost(post) > 0)
      return 'primary'
    else
      return ''
 }



 getColorForDislikeButton(post: Post): string{
  if(this.getUserReactionForPost(post) < 0)
    return 'warn'
  else
    return ''
}

like(post: Post){
  this.store.dispatch(reactToPost({post: post, userId: this.user.id, reactionEnum: ReactionEnum.like}))
}

dislike(post: Post){
  this.store.dispatch(reactToPost({post: post, userId: this.user.id, reactionEnum: ReactionEnum.dislike}))
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
    // console.log(this.selectedImageFile)
    // console.log(this.userPostImg)
    // console.log(this.postTextFormControl.value)
    // console.log(this.userCheckedSports)
    this.store.dispatch(addPost({
      userId: this.user.id,
      createPostObject: {
        forSports: this.userCheckedSports,
        text: this.postTextFormControl.value ?? "",
        image: this.userPostImg ?? ""
          }
    }))
    this.selectedImageFile = null;
    this.postTextFormControl.reset();
    this.userPostImg = "";
    this.userCheckedSports = []
    this.postCheckListFormControl.reset();
  }



  // getUser(userId: number): void{
  //   this.service.getUserById(userId).subscribe(user => {this.router.navigateByUrl('/home/user', {state: user})})
  // }

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
        this.store.dispatch(deletePost({postId: postId}))       
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
  check(){
    console.log(this.postTextFormControl.value)
  }

  closeImg(){
    this.userPostImg = ''
  }
}
