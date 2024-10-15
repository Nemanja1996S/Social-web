import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, switchMap } from "rxjs";
import { SportSocialService } from "../../services/sport-social.service";
import * as FriendRequestsActions from "./requests.actions"
import { FriendRequest, FriendRequestFromDatabase } from "../../../models/Request";

@Injectable()
export class FriendRequestEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadUserRequestsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(FriendRequestsActions.loadRequests),
			switchMap( ({userId}) =>
				this.service.getFriendRequestsForUser(userId).pipe(
					map((friendRequests) => FriendRequestsActions.loadRequestsSuccess({friendRequests: this.adaptFromDatabase(userId, friendRequests)})),
					catchError(error => of(FriendRequestsActions.loadRequestsFailure({error})))
				)
			)
		)
	)

	adaptFromDatabase(userId: number, friendRequests: FriendRequestFromDatabase[]): FriendRequest[]{
		let adaptedFriendRequests : FriendRequest[] = []
		adaptedFriendRequests = friendRequests.map(request => 
			({
				id: request.id,
				toUserId: userId,
				fromUserId: request.fromUser.id,
				fromUserFullName: request.fromUser.name + ' ' + request.fromUser.surname,
				fromUserImg: request.fromUser.picture,
				fromUserFriendsIds: request.fromUser.friends.map(id => id.friendId),
				fromUserSelectedSports: request.fromUser.selectedSports
			})
		 )
		 return adaptedFriendRequests;
	}

	acceptingRequestEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(FriendRequestsActions.acceptRequest),
			switchMap( ({userId, acceptedUserId, friendRequest}) =>
				this.service.acceptFriendRequest(userId, acceptedUserId, friendRequest.id).pipe(
					map((friendRequests) => FriendRequestsActions.acceptRequestSuccess({userId: userId, acceptedUserId: acceptedUserId, friendRequest: friendRequest})),
					catchError(error => of(FriendRequestsActions.acceptRequestFailure({error})))
				)
			)
		)
	)
}