import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { initialUser } from '../store/user/user.reducer';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable, of } from 'rxjs';
import { userSelector } from '../store/user/user.selector';

@Component({
  selector: 'person-profile',
  standalone: true,
  imports: [NavbarComponent, MatListModule, MatIcon, MatCard, MatButton],
  templateUrl: './person-profile.component.html',
  styleUrl: './person-profile.component.scss'
})
export class PersonProfileComponent implements OnInit{

  user: User = initialUser;
  loggedInUser : Observable<User> = of()
  isSelfProfile : boolean = false;

  constructor(private store: Store<AppState>){
    // console.log(this.router.getCurrentNavigation()?.extras.state)
  }
  ngOnInit(): void {
    this.user = history.state;
    this.loggedInUser = this.store.select(userSelector);
    this.loggedInUser.subscribe((loggedUser) => {if(loggedUser.id === this.user.id) {console.log("Before changing"+this.isSelfProfile); this.isSelfProfile = true; console.log("After changing"+this.isSelfProfile)}})

  }

  isMe(){
    console.log(this.isSelfProfile)
  }
}
