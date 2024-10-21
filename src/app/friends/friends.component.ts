import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { NavbarComponent } from '../navbar/navbar.component';
import { Friend } from '../../models/Friends';
import { debounceTime, filter, fromEvent, map, Observable, of, switchMap } from 'rxjs';
import { errorFreindsSelector, FriendAndNumberOfMuturalFriends, friendsAndNumberOfMuturalFriendsSelector } from '../store/friends/friends.selectors'; // friendsAndNumberOfMuturalFriendsSelector, userFriendsArraySelector
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SportSocialService } from '../services/sport-social.service';
import { User } from '../../models/User';
import { Route, Router, RouterLink } from '@angular/router';
import { loadFriends } from '../store/friends/friends.actions';
import { userFriendsIdsArraySelector, userIdSelector } from '../store/user/user.selector';
import { loadCommentsFailure } from '../store/comments/comments.actions';

export interface PeopleOption{
  userId: number,
  userFullname: string,
  userPicture: string,
  numberOfMuturalFriends: number
}

@Component({
  selector: 'friends',
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgFor, MatCardModule,  FormsModule, MatFormFieldModule, 
    MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit{

  activeLink: string = "Friends";
  friend$: Observable<Friend | null> = of()
  userFriendsAndNumberOfMuturalFriend$ : Observable<FriendAndNumberOfMuturalFriends[] | null> = of([]);
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  loggedUserId$: Observable<number> = of()
  loggedUserId : number = -1
  users$: Observable<User[]> = of([]) 
  usersFullNames : string[] = [];
  userFriendsIds$: Observable<number[]> = of()
  filteredOptions: string[] = [];
  error$: Observable<string | null> = of('');
  noFriends: boolean = false

  constructor(private store: Store<AppState>, private service: SportSocialService, private router: Router){ 
  }
  ngOnInit(): void {
   this.userFriendsAndNumberOfMuturalFriend$ = this.store.select(friendsAndNumberOfMuturalFriendsSelector)
    this.error$ = this.store.select(errorFreindsSelector);
    this.error$.subscribe(() => this.noFriends = true )
    this.users$ = this.getUsersObservable()
    this.users$.subscribe((users => this.changeFilterOptionAndUsersFullNames(
      users.filter(user => user.id !== this.loggedUserId).map(user => (user.name + user.surname )))))
    this.loggedUserId$ = this.store.select(userIdSelector)
    this.loggedUserId$.subscribe((id) => this.loggedUserId = id)
    this.userFriendsIds$ = this.store.select(userFriendsIdsArraySelector)
    this.userFriendsIds$.subscribe((ids) => {
      console.log(ids)
    this.store.dispatch(loadFriends({friendsIds: ids}))})
  }

  filter(): void {
    if(this.usersFullNames){
      const filterValue = this.input.nativeElement.value.toLowerCase();
      this.filteredOptions = this.usersFullNames.filter(o => o.toLowerCase().includes(filterValue));
    }
  }

  getUsersObservable(): Observable<User[]> {
    const input = document.getElementById('searchPeopleInput');
    if(input)
    {
      return fromEvent(input, "input").pipe(
        debounceTime(300),
        map((ev) => (<HTMLInputElement>ev.target).value),
        filter(text => text.length >= 3),
        switchMap(startingLetters => this.service.getAllUsersWithNameStartingWithString(startingLetters))
      )
    }
    return of()
  }

  changeFilterOptionAndUsersFullNames(peopleFullnames: string[]){
    this.usersFullNames = peopleFullnames.map(names => names)
    this.filteredOptions = this.usersFullNames.slice()
    this.users$.subscribe(people => console.log(people))
  }

}
