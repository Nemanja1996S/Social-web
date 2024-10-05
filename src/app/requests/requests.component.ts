import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable, of } from 'rxjs';
import { FriendRequest } from '../../models/Request';
import { acceptRequest, deleteRequest, loadRequests } from '../store/requests/requests.actions';
import { friendRequestsSelector } from '../store/requests/requests.selectors';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { SportSocialService } from '../services/sport-social.service';
import { userFriendsIdsArraySelector } from '../store/user/user.selector';
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
  userId: number = -1;
  userFriendsIds: number[] = []
  // userFriendsIds$: Observable<number[]> = of([])
  friendFriendsIds: number[] = []
  constructor(private store: Store<AppState>, private router: Router, private service: SportSocialService){

  }

  ngOnInit(): void {
    this.store.dispatch(loadRequests({userId: 0}));
    this.friendRequests$ = this.store.select(friendRequestsSelector);
    this.store.select(userFriendsIdsArraySelector).subscribe(userFriendsIds => this.userFriendsIds = userFriendsIds)

    // this.friendRequests$.subscribe(requests => requests.map(request => {getUserrequest.toUserId}))
  }
  // getNumberOfMuturalFriends(userId: number): void{
  //   this.service.getUserById(userId).subscribe(user => this.calculateMuturalFriends(user.friendsIds))
  // }
  calculateMuturalFriends(friendFriendsIds: number[]): number {
    return this.userFriendsIds.filter(id => friendFriendsIds.includes(id)).length
  }

  getSportSelectedString(sports: string[]): string{
    return ` ${sports.slice()} `
  }

  // goTo(userId: number){
  //   this.service.getUserById(userId).subscribe(user => this.router.navigateByUrl('/home/user',{state: user} ))
  // }

  acceptRequestClick(request: FriendRequest){
    this.store.dispatch(addFriend({friendId: request.fromUserId}));
    this.store.dispatch(deleteRequest({friendRequest: request}));
  }

  deleteRequestClick(request: FriendRequest){
    this.store.dispatch(deleteRequest({friendRequest: request}));
  }
  // getNumberOfMuturalFriends(fromUserId: number) : number{
  //   this.getUser(fromUserId);
  //   return this.calculateMuturalFriends
  // }
}
