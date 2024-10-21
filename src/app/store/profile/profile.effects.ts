import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SportSocialService } from "../../services/sport-social.service";
import { catchError, exhaustMap, map, mergeMap, of, pipe, switchMap, switchMapTo } from "rxjs";
import * as ProfileActions from './profile.actions'
import { Injectable } from "@angular/core";
import { UserFromDatabase, User } from "../../../models/User";

@Injectable()
export class ProfileEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadProfileEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(ProfileActions.loadProfile),
			switchMap( ({id}) =>
				this.service.getUserById(id).pipe(
					map((user) => ProfileActions.loadProfileSuccess({user: this.userAdapt(user)})),
					catchError(error => of(ProfileActions.loadProfileFailure({error})))
				)
			)
			
		)
	)

	loadRequestEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(ProfileActions.loadRequestBetweenUsers),
			switchMap( ({userId,profileUserId}) =>
				this.service. getRequestBetween(userId, profileUserId).pipe(
					map((request) => ProfileActions.loadRequestBetweenUsersSuccess({request: request})),
					catchError(error => of(ProfileActions.loadRequestBetweenUsersFailure({error})))
				)
			)
			
		)
	)

	sendRequestEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(ProfileActions.sendRequest),
			switchMap( ({fromUserId, toUserId}) =>
				this.service.sendRequest(fromUserId,toUserId).pipe(
					map((user) => ProfileActions.sendRequestSuccess({fromUserId: fromUserId, toUserId: toUserId})),
					catchError(error => of(ProfileActions.sendRequestFailure({error})))
				)
			)
			
		)
	)

	acceptRequestEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(ProfileActions.acceptDeleteRequest),
			switchMap( ({requestId}) =>
				this.service.deleteFriendRequest(requestId).pipe(
					map((user) => ProfileActions.acceptDeleteRequestSuccess()),
					catchError(error => of(ProfileActions.acceptDeleteRequestFailure({error})))
				)
			)
			
		)
	)

	// deleteRequestEffect$ = createEffect( () =>
	// 	this.actions$.pipe(
	// 		ofType(ProfileActions.sendRequest),
	// 		switchMap( ({fromUserId, toUserId}) =>
	// 			this.service.sendRequest(fromUserId,toUserId).pipe(
	// 				map((user) => ProfileActions.sendRequestSuccess({fromUserId: fromUserId, toUserId: toUserId})),
	// 				catchError(error => of(ProfileActions.sendRequestFailure({error})))
	// 			)
	// 		)
			
	// 	)
	// )

	userAdapt(userFromDatabase : UserFromDatabase): User{
		let user : User = {
			id: 0,
			name: "",
			surname: "",
			email: "",
			password: "",
			picture: "",
			friendsIds: [],
			requests: [],
			selectedSports: [],
			dateOfBirth: "",
			education: "",
			work: "",
			aboutMe: ""
		}
		Object.assign(user, userFromDatabase)
		// userFromDatabase.requests = []
		// userFromDatabase.requests.map(request => user.requests.push(request))
		userFromDatabase.friendships.map(friendship => user.friendsIds.push(friendship.friend.id))
		return user
	}
}