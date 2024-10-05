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
import { Post } from '../../models/Post';
import { SportSocialService } from '../services/sport-social.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditProfileDialogComponent, EditProfileDialogInputData, EditProfileDialogOutputData } from '../edit-profile-dialog/edit-profile-dialog.component';
import { dislikePost, likePost } from '../store/posts/posts.actions';
import { loggedInUserPostsSelector, profilePostsSelector } from '../store/posts/posts.selector';
import { idsOfloggedUserSentRequestToSelector, isloggedUserSentRequestToProfileUserSelector } from '../store/requests/requests.selectors';
import { loadProfile } from '../store/profile/profile.actions';
import { profileSelector } from '../store/profile/profile.selectors';
import { deleteUser, removeFriend } from '../store/user/user.actions';
import { sendRequest } from '../store/requests/requests.actions';

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
  // numberOfMuturalFriends: number = -1;
  //idsOfUserSentRequstTo$: Observable<number[]> = of([])
  isProfileUserFriendsWithLoggedUser$: Observable<boolean> = of();
  isloggedUserSentRequestToProfileId$: Observable<boolean> = of()
  idsOfUserSentRequstTo: number[] = []
  readonly dialog = inject(MatDialog);
  // readonly editDialog = inject(MatDialog)

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router, private route: ActivatedRoute){
    // console.log(this.router.getCurrentNavigation()?.extras.state)
  }
  ngOnDestroy(): void {
    console.log("Iz destroy")
    console.log(this.isSelfProfile)
    this.isSelfProfile = null;
  }
  ngOnInit(): void {
    console.log("Iz init")
    console.log(this.isSelfProfile)
    this.route.paramMap.pipe(
      mergeMap((params) => of(params.get('userId'))),
      mergeMap((id) => {
        if(id){
          console.log("Id parametra:")
          console.log(id)
          this.paramsId = parseInt(id);
          this.isSelfProfile = false;
          this.store.dispatch(loadProfile({id: this.paramsId}))
          this.userPosts$ = this.store.select(profilePostsSelector)
          this.profileUser$ = this.store.select(profileSelector)
          this.loggedInUser$ = this.store.select(userSelector)
          return this.profileUser$;
        }
        else{
          console.log("Nema id parametra")
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
        this.isloggedUserSentRequestToProfileId$ = this.store.select(isloggedUserSentRequestToProfileUserSelector);
        this.loggedInUser$.subscribe(user => this.loggedUser = user)

      }
      
     
      
      // Do something with res3.
    });
    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('id');
    //   if(id){
    //     this.paramsId = parseInt(id)
    //     console.log(id)
    //   }
    //   else{
    //     this.isSelfProfile = true
    //   }
    // })
    // if(this.isSelfProfile){
    //   console.log("Ulogovan korisnik")
    //   this.user = history.state;
    //   this.loggedInUser$ = this.store.select(userSelector);
    //   this.loggedInUser$.subscribe(user => {this.profileUserFriendsIds = user.friendsIds.map(id => id); this.loggedUserId = user.id} ) //{if(user.id === this.user.id) { this.isSelfProfile = true};
    //   this.userPosts$ = this.store.select(loggedInUserPostsSelector)
    // }
    // else{
    //   this.store.select(profileSelector).subscribe(user => {this.user = user; this.profileUserFriendsIds = user.friendsIds.map(id => id) })
    //   this.store.dispatch(loadProfile({id: this.paramsId}))
    //   this.userPosts$ = this.store.select(profilePostsSelector)
    //   console.log("NIje ulogovan korisnik")

    // }
    // this.user = history.state;
    // this.loggedInUser$ = this.store.select(userSelector);
    // this.loggedInUser$.subscribe(user => {if(user.id === this.user.id) { this.isSelfProfile = true}; this.profileUserFriendsIds = user.friendsIds.map(id => id); this.loggedUserId = user.id} )
    
    // if(this.isSelfProfile){
    //   this.userPosts$ = this.store.select(loggedInUserPostsSelector); //ne cita iz bazu, cita za onog ko je prijavljen
    // }
    // else{
    //   this.userPosts$ = this.service.getPostsOfUser(this.user.id); //iz bazu cita, ne iz state
    // }
    
   
    this.store.select(idsOfloggedUserSentRequestToSelector).subscribe(ids => this.idsOfUserSentRequstTo = ids);
  }

  isMe(): boolean{
    //console.log(this.isSelfProfile)
    return this.isSelfProfile ?? false
  }

  calculateNumberOfmuturalFriends(): number{
    const muturalFriends = this.profileUserFriendsIds.filter(friendId => {if(this.loggedInFriendsIds.includes(friendId)) {return friendId;} else return 0 } )
    return muturalFriends.length;
  }

  sendRequestTo(): void{
    this.store.dispatch(sendRequest({friendRequest: {toUserId: this.paramsId, fromUserId: this.loggedUserId, fromUserFullName: this.loggedUser.name + " " + this.loggedUser.surname, fromUserImg: this.loggedUser.picture, fromUserSelectedSports: this.loggedUser.selectedSports, fromUserFriendsIds: []}}))
    //console.log({toUserId: this.paramsId, fromUserId: this.loggedUserId, fromUserFullName: this.loggedUser.name + " " + this.loggedUser.surname, fromUserImg: this.loggedUser.picture, fromUserSelectedSports: this.loggedUser.selectedSports, fromUserFriendsIds: []}) 
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
          this.store.dispatch(deleteUser())
          this.router.navigate([''])            
        }
      }
      else{
        if(result){
          this.store.dispatch(removeFriend({friendId: this.paramsId}));          
        }           
      }
    });
 }

  openEditDialog(): void {
    const data : EditProfileDialogInputData = {title: "Edit profile:", user: this.user, confirmString: "Save", cancelString: "Cancel"}
    this.dialog.closeAll();
    this.dialog.afterOpened.subscribe(result => console.log("otvoren sam"))
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '300px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result as EditProfileDialogOutputData){
        //this.user = result;
        this.user.picture = URL.createObjectURL(result.selectedImage)
        console.log(result)
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

  // isProfileUserFriendsWithLogged(): Observable<boolean>{
  //   return of(this.profileUserFriendsIds.includes(this.loggedUserId));
  // }

  getWatchedUserId(): number{
    return this.isSelfProfile ? this.loggedUserId : this.user.id
  }

  like(post: Post){
    this.store.dispatch(likePost({post: post, userId: this.getWatchedUserId()}))
  }

  dislike(post: Post){
    this.store.dispatch(dislikePost({post: post, userId: this.getWatchedUserId()}))
  }

  getUserReactionForPost(post: Post): number{
    const userReaction = post.usersReactions.find(userReaction => userReaction.reactedUserId === this.getWatchedUserId())
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
