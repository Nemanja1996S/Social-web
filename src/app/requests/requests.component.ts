import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable, of } from 'rxjs';
import { FriendRequest } from '../../models/Request';
import { deleteRequest, loadRequests } from '../store/requests/requests.actions';
import { friendRequestsSelector } from '../store/requests/requests.selectors';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { SportSocialService } from '../services/sport-social.service';
import { userFriendsIdsArraySelector, userIdSelector } from '../store/user/user.selector';
import { addFriend } from '../store/user/user.actions';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, CommonModule, NavbarComponent, MatButtonModule, RouterLink],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  
  activeLink: string = "Requests";
  friendRequests$ : Observable<FriendRequest[]> = of([])
  userId$: Observable<number> = of()
  userFriendsIds: number[] = []
  friendFriendsIds: number[] = []
  constructor(private store: Store<AppState>, private router: Router, private service: SportSocialService){

  }

  ngOnInit(): void {
    this.userId$ = this.store.select(userIdSelector)
    this.userId$.subscribe(userId => this.store.dispatch(loadRequests({userId: userId})))  
    this.friendRequests$ = this.store.select(friendRequestsSelector);
    this.store.select(userFriendsIdsArraySelector).subscribe(userFriendsIds => this.userFriendsIds = userFriendsIds)
  }
  
  calculateMuturalFriends(friendFriendsIds: number[]): number {
    return this.userFriendsIds.filter(id => friendFriendsIds.includes(id)).length
  }

  getSportSelectedString(sports: string[]): string{
    return ` ${sports.slice()} `
  }

  acceptRequestClick(request: FriendRequest){
    this.store.dispatch(addFriend({userId: request.toUserId, friendId: request.fromUserId}));
    this.store.dispatch(deleteRequest({friendRequest: request}));
  }

  deleteRequestClick(request: FriendRequest){
    this.store.dispatch(deleteRequest({friendRequest: request}));
  }
}
