import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { NavbarComponent } from '../navbar/navbar.component';
import { Friend } from '../../models/UserFriends';
import { Observable, of } from 'rxjs';
import { userFriendsArraySelector } from '../store/userFriends/userFriends.selectors';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'friends',
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgFor, MatCardModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit{

  activeLink: string = "Friends";
  userFriend$: Observable<Friend[] | null> = of([]);

  constructor(private store: Store<AppState>){

  }
  ngOnInit(): void {
    this.userFriend$ = this.store.select(userFriendsArraySelector)
    
  }

}
