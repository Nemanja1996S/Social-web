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
import { userSelector } from '../store/user/user.selector';
import { CommonModule, NgFor } from '@angular/common';
import { Post } from '../../models/Post';
import { SportSocialService } from '../services/sport-social.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'person-profile',
  standalone: true,
  imports: [NavbarComponent, MatListModule, MatIcon, MatCardModule, MatButtonModule, MatIconModule, RouterLink, NgFor, CommonModule],
  templateUrl: './person-profile.component.html',
  styleUrl: './person-profile.component.scss'
})
export class PersonProfileComponent implements OnInit{

  user: User = initialUser;
  loggedInUser : Observable<User> = of()
  isSelfProfile : boolean = false;
  userPosts$: Observable<Post[]> = of([])
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router){
    // console.log(this.router.getCurrentNavigation()?.extras.state)
  }
  ngOnInit(): void {
    this.user = history.state;
    this.loggedInUser = this.store.select(userSelector);
    this.loggedInUser.subscribe((loggedUser) => {if(loggedUser.id === this.user.id) {console.log("Before changing"+this.isSelfProfile); this.isSelfProfile = true; console.log("After changing"+this.isSelfProfile)}})
    this.userPosts$ = this.service.getPostsOfUser(this.user.id);
  }

  isMe(): boolean{
    //console.log(this.isSelfProfile)
    return this.isSelfProfile;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {isConfirmed: false, title: "Delete profile", content: "Are you sure you want to delete your profile", confirmString: "Yes", cancelString: "No"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate([''])            //delete profile
      }
    });
}
}
