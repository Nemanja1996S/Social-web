import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/User';
import { initialUser } from '../store/user/user.reducer';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { mergeMap, Observable, of } from 'rxjs';
import { isProfileUserFriendsWithLoggedSelector, userFriendsIdsArraySelector, userIdSelector, userSelector } from '../store/user/user.selector';
import { CommonModule, NgFor } from '@angular/common';
import { Post, ReactionEnum } from '../../models/Post';
import { SportSocialService } from '../services/sport-social.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditProfileDialogComponent, EditProfileDialogInputData, EditProfileDialogOutputData } from '../edit-profile-dialog/edit-profile-dialog.component';
import { deletePost, dislikePost, editPost, likePost, reactToPost } from '../store/posts/posts.actions';
import { loggedInUserPostsSelector, profilePostsSelector } from '../store/posts/posts.selector';
// import { idsOfloggedUserSentRequestToSelector, isloggedUserSentRequestToProfileUserSelector } from '../store/requests/requests.selectors';
import { acceptDeleteRequest, loadProfile, loadRequestBetweenUsers, sendRequest } from '../store/profile/profile.actions';
import {  isLoggedUserSentRequestToProfileUserSelector, isProfileUserSentRequestToLoggedUserSelector, profileRequestSelector, profileSelector } from '../store/profile/profile.selectors';
import { addFriend, deleteUser, editUser, removeFriend } from '../store/user/user.actions';
import { MiniFriendRequest } from '../../models/Request';
import { EditPostDialogComponent, EditPostDialogOutputData } from '../edit-post-dialog/edit-post-dialog.component';


@Component({
  selector: 'person-profile',
  standalone: true,
  imports: [NavbarComponent, MatListModule, MatIcon, MatCardModule, MatButtonModule, MatIconModule, RouterLink, NgFor, CommonModule],
  templateUrl: './person-profile.component.html',
  styleUrl: './person-profile.component.scss'
})
export class PersonProfileComponent implements OnInit, OnDestroy{

  user: User = initialUser;
  loggedUser: User = initialUser;
  paramsId: number = -1;
  loggedInUser$ : Observable<User> = of()
  profileUser$ : Observable<User> = of()
  loggedUserId: number = -1;
  profileUserFriendsIds : number[] = []
  loggedInFriendsIds: number[] = []
  isSelfProfile : boolean | null = false;
  userPosts$: Observable<Post[]> = of([])
  isProfileUserFriendsWithLoggedUser$: Observable<boolean> = of();
  isloggedUserSentRequestToProfileId$: Observable<boolean> = of()
  isProfileUserSentRequestToLoggedUser$: Observable<boolean> = of()
  profileRequest$: Observable<MiniFriendRequest | null> = of()
  idsOfUserSentRequstTo: number[] = []
  sportsList: string [] = []
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router, private route: ActivatedRoute){
  }
  ngOnDestroy(): void {
    this.isSelfProfile = null;
  }
  ngOnInit(): void {
    this.service.getAllSports().subscribe(sports => this.sportsList = sports)
    this.route.paramMap.pipe(
      mergeMap((params) => of(params.get('userId'))),
      mergeMap((id) => {
        if(id){
          this.paramsId = parseInt(id);
          this.isSelfProfile = false;
          this.store.dispatch(loadProfile({id: this.paramsId}))
          this.userPosts$ = this.store.select(profilePostsSelector)
          this.profileUser$ = this.store.select(profileSelector)
          this.loggedInUser$ = this.store.select(userSelector)
          this.store.select(userSelector).subscribe((user=>{
            this.store.dispatch(loadRequestBetweenUsers({userId: user.id, profileUserId: this.paramsId}))
          }))
          return this.profileUser$;
        }
        else{
          this.isSelfProfile = true;
          this.user = history.state;
          this.loggedUserId = this.user.id;
          this.userPosts$ = this.store.select(loggedInUserPostsSelector)
          this.loggedInUser$ = this.store.select(userSelector)// nepotrebno?
          return this.loggedInUser$;
        }
      })
    ).subscribe((user) => {
      this.user = user;
      if(!this.isSelfProfile){
        this.profileUserFriendsIds = user.friendsIds.map(id => id);
        this.store.select(userIdSelector).subscribe(id => this.loggedUserId = id)
        this.store.select(userFriendsIdsArraySelector).subscribe(friendsIds => this.loggedInFriendsIds = friendsIds)
        this.isProfileUserFriendsWithLoggedUser$ = this.store.select(isProfileUserFriendsWithLoggedSelector);
        this.isloggedUserSentRequestToProfileId$ = this.store.select(isLoggedUserSentRequestToProfileUserSelector);
        this.isProfileUserSentRequestToLoggedUser$ = this.store.select(isProfileUserSentRequestToLoggedUserSelector)
        this.loggedInUser$.subscribe(user => this.loggedUser = user)
        this.profileRequest$ = this.store.select(profileRequestSelector)
        
      }
    });
  }

  isMe(): boolean{
    return this.isSelfProfile ?? false
  }

  calculateNumberOfmuturalFriends(): number{
    const muturalFriends = this.profileUserFriendsIds.filter(friendId => {if(this.loggedInFriendsIds.includes(friendId)) {return friendId;} else return 0 } )
    return muturalFriends.length;
  }

  sendRequestTo(): void{      
    this.store.dispatch(sendRequest({fromUserId: this.loggedUserId, toUserId: this.paramsId}))
  }

  acceptRequest(){
    this.profileRequest$.subscribe((request) => {
      console.log("Sending accept, request:")
      console.log(request)
      if(request){
        this.store.dispatch(acceptDeleteRequest({requestId: request.id}))
        this.store.dispatch(addFriend({userId: request.toUser.id, friendId: request.fromUser.id}))
      }
    })
  }
 
  deleteRequest(){
    this.profileRequest$.subscribe((request) => {
      if(request){
        this.store.dispatch(acceptDeleteRequest({requestId: request.id}))
      }
    })
  }


  openDeleteProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    const data = {isConfirmed: false, title: "Delete profile", content: "Are you sure you want to delete your profile", confirmString: "Yes", cancelString: "No"}
    this.openDialog(enterAnimationDuration, exitAnimationDuration, data, true)
  }

  openRemoveFriendDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    const data = {isConfirmed: false, title: "Remove", content: "Are you sure you want to remove your friend from friends", confirmString: "Yes", cancelString: "No"}
    this.openDialog(enterAnimationDuration, exitAnimationDuration, data, false)
  }


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
          this.store.dispatch(deleteUser({userId: this.loggedUserId}))
          this.router.navigate([''])            
        }
      }
      else{
        if(result){
          this.store.dispatch(removeFriend({userId: this.loggedUserId,friendId: this.paramsId}));          
        }           
      }
    });
 }

  openEditDialog(): void {
    const data : EditProfileDialogInputData = {title: "Edit profile:", user: this.user, sportsList: this.sportsList, confirmString: "Save", cancelString: "Cancel"}
    this.dialog.closeAll();
    this.dialog.afterOpened.subscribe(result => console.log("otvoren sam"))
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '300px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result as EditProfileDialogOutputData){
        this.store.dispatch(editUser({updateUserDto: result.user}))
        if(result.selectedImage)
          this.user.picture = URL.createObjectURL(result.selectedImage)
        console.log(result)
      }
      
    });
  }

  getWatchedUserId(): number{
    return this.isSelfProfile ? this.loggedUserId : this.user.id
  }

  like(post: Post){
    this.store.dispatch(reactToPost({post: post, userId: this.user.id, reactionEnum: ReactionEnum.like}))
  }

  dislike(post: Post){
    this.store.dispatch(reactToPost({post: post, userId: this.user.id, reactionEnum: ReactionEnum.dislike}))
  }

  getUserReactionForPost(post: Post): number{
    const userReaction = post.usersReactions.find(userReaction => userReaction.userId === this.user.id)
    if(userReaction)
      return userReaction.reactionEnum
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
    return 'warn'
  else
    return ''
}

openDeletePostDialog(enterAnimationDuration: string, exitAnimationDuration: string, postId: number): void {
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

openEditPostDialog(enterAnimationDuration: string, exitAnimationDuration: string, post: Post): void {
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
