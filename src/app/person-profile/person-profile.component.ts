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
import { EditProfileDialogComponent, EditProfileDialogInputData } from '../edit-profile-dialog/edit-profile-dialog.component';

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
  loggedInUserFriendsIds : number[] = []
  isSelfProfile : boolean = false;
  userPosts$: Observable<Post[]> = of([])
  // numberOfMuturalFriends: number = -1;
  readonly dialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog)

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router){
    // console.log(this.router.getCurrentNavigation()?.extras.state)
  }
  ngOnInit(): void {
    this.user = history.state;
    this.loggedInUser$ = this.store.select(userSelector);
    this.loggedInUser$.subscribe(user => {if(user.id === this.user.id) { this.isSelfProfile = true}; this.loggedInUserFriendsIds = user.friendsIds.map(id => id)} )
    // let u: User;
    // this.loggedInUser$.subscribe((user) => {u = user; console.log(u.friendsIds) });
    
    this.userPosts$ = this.service.getPostsOfUser(this.user.id);
    const data : EditProfileDialogInputData = {isConfirmed: false,
       title: "Edit profile:", user: this.user, confirmString: "Save", cancelString: "Cancel"}
    this.openEditDialog('0ms','0ms', data, false);
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
                      ///delete friend from user
      }
    });
 }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any, isDeleteProfile: boolean): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '300px',
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
                      ///delete friend from user
      }
    });
  }
}
