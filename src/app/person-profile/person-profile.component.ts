import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/User';
import { initialUser } from '../store/user/user.reducer';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable, of } from 'rxjs';
import { userFriendsIdsArraySelector, userSelector } from '../store/user/user.selector';
import { CommonModule, NgFor } from '@angular/common';
import { Post } from '../../models/Post';
import { SportSocialService } from '../services/sport-social.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditProfileDialogComponent, EditProfileDialogInputData, EditProfileDialogOutputData } from '../edit-profile-dialog/edit-profile-dialog.component';
import { dislikePost, likePost } from '../store/posts/posts.actions';
import { loggedInUserPostsSelector } from '../store/posts/posts.selector';
import { idsOfloggedUserSentRequestToSelector } from '../store/requests/requests.selectors';

@Component({
  selector: 'person-profile',
  standalone: true,
  imports: [NavbarComponent, MatListModule, MatIcon, MatCardModule, MatButtonModule, MatIconModule, RouterLink, NgFor, CommonModule],
  templateUrl: './person-profile.component.html',
  styleUrl: './person-profile.component.scss'
})
export class PersonProfileComponent implements OnInit{

  user: User = initialUser;
  loggedInUser$ : Observable<User> = of()
  loggedUserId: number = -1;
  loggedInUserFriendsIds : number[] = []
  isSelfProfile : boolean = false;
  userPosts$: Observable<Post[]> = of([])
  // numberOfMuturalFriends: number = -1;
  //idsOfUserSentRequstTo$: Observable<number[]> = of([])
  idsOfUserSentRequstTo: number[] = []
  readonly dialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog)

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router){
    // console.log(this.router.getCurrentNavigation()?.extras.state)
  }
  ngOnInit(): void {
    this.user = history.state;
    this.loggedInUser$ = this.store.select(userSelector);
    this.loggedInUser$.subscribe(user => {if(user.id === this.user.id) { this.isSelfProfile = true}; this.loggedInUserFriendsIds = user.friendsIds.map(id => id); this.loggedUserId = user.id} )

    //this.userPosts$ = this.service.getPostsOfUser(this.user.id); //iz bazu cita, ne iz state
    this.userPosts$ = this.store.select(loggedInUserPostsSelector); //ne cita iz bazu
    this.store.select(idsOfloggedUserSentRequestToSelector).subscribe(ids => this.idsOfUserSentRequstTo = ids);
  }

  isMe(): boolean{
    //console.log(this.isSelfProfile)
    return this.isSelfProfile;
  }

  calculateNumberOfmuturalFriends(): number{
    const muturalFriends = this.loggedInUserFriendsIds.filter(friendId => {if(this.user.friendsIds.includes(friendId)) {return friendId;} else return null } )
    return muturalFriends.length;
  }


  openDeleteProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    const data = {isConfirmed: false, title: "Delete profile", content: "Are you sure you want to delete your profile", confirmString: "Yes", cancelString: "No"}
    this.openDialog(enterAnimationDuration, exitAnimationDuration, data, true)
  }

  openRemoveFriendDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    const data = {isConfirmed: false, title: "Remove", content: "Are you sure you want to remove your friend from friends", confirmString: "Yes", cancelString: "No"}
    this.openDialog(enterAnimationDuration, exitAnimationDuration, data, false)
  }

  // openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string){
  //   const data : EditProfileDialogInputData = {title: "Edit profile:", user: this.user, confirmString: "Save", cancelString: "Cancel"}
  //   this.openEditDialogData(enterAnimationDuration, exitAnimationDuration, data)
  // }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any, isDeleteProfile: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(isDeleteProfile){
        if(result){
          this.router.navigate([''])            //delete profile
        }
      }
      else{
                      ///remove friend from user
      }
    });
 }

  openEditDialog(): void {
    const data : EditProfileDialogInputData = {title: "Edit profile:", user: this.user, confirmString: "Save", cancelString: "Cancel"}
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '300px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result as EditProfileDialogOutputData){
        //this.user = result;
        this.user.picture = URL.createObjectURL(result.selectedImage)
        // console.log(result)
      }
      
      // if(isDeleteProfile){
      //   if(result){
      //     this.router.navigate([''])            //delete profile
      //   }
      // }
      // else{
      //                 ///delete friend from user
      // }
    });
  }

  like(post: Post){
    this.store.dispatch(likePost({post: post, userId: this.loggedUserId}))
  }

  dislike(post: Post){
    this.store.dispatch(dislikePost({post: post, userId: this.loggedUserId}))
  }

  getUserReactionForPost(post: Post): number{
    const userReaction = post.usersReactions.find(userReaction => userReaction.reactedUserId === this.loggedUserId)
    if(userReaction)
      return userReaction.reaction
    return 0;
 }

  getColorForLikeButton(post: Post): string{
    if(this.getUserReactionForPost(post) > 0)
      return 'primary'
    else
      return ''
 }

 getColorForDislikeButton(post: Post): string{
  if(this.getUserReactionForPost(post) < 0)
    return 'accent'
  else
    return ''
}
}
