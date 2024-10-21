import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SportSocialService } from "../../services/sport-social.service";
import { catchError, exhaustMap, map, mergeMap, of, pipe, switchMap, switchMapTo } from "rxjs";
import * as UserActions from './user.actions'
import { Injectable } from "@angular/core";
import { User, UserFromDatabase } from "../../../models/User";

@Injectable()
export class UserEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadUserEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(UserActions.loadUser),
			switchMap( ({email, password}) =>
				this.service.getUser(email, password).pipe(
					map((user) => UserActions.loadUserSuccess({user: this.userAdapt(user) })),
					catchError(error => of(UserActions.loadUserFailure({error})))
				)
			)
			
		)
	)

	addFriendEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(UserActions.addFriend),
			switchMap( ({friendId, userId}) =>
				this.service.addFriend(userId, friendId).pipe(
					map((friendRequests) => UserActions.addFriendSuccess({friendId: friendId})),
					catchError(error => of(UserActions.addFriendFailure({error})))
				)
			)
		)
	)

	removeFriendEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(UserActions.removeFriend),
			switchMap( ({userId, friendId}) =>
				this.service.removeFriend(userId, friendId).pipe(
					map((friendRequests) => UserActions.removeFriendSuccess({friendId: friendId})),
					catchError(error => of(UserActions.removeFriendFailure({error})))
				)
			)
		)
	)

	editUserEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(UserActions.editUser),
			switchMap( ({updateUserDto}) =>
				this.service.editUser(updateUserDto).pipe(
					map(() => UserActions.editUserSuccess({updateUserDto: updateUserDto})),
					catchError(error => of(UserActions.editUserFailure({error})))
				)
			)
		)
	)

	deleteUserEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(UserActions.deleteUser),
			switchMap( ({userId}) =>
				this.service.deleteUser(userId).pipe(
					map(() => UserActions.deleteUserSuccess()),
					catchError(error => of(UserActions.deleteUserFailure({error})))
				)
			)
		)
	)

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
		userFromDatabase.friendships.map(friendship => friendship.friend.id)
		userFromDatabase.friendships.map(friendship => user.friendsIds.push(friendship.friend.id))
		return user
	}

	// loadUserByIdEffect$ = createEffect( () =>
	// 	this.actions$.pipe(
	// 		ofType(UserActions.loadUserById),
	// 		exhaustMap( ({id}) =>
	// 			this.service.getUserById(id).pipe(
	// 				map((user) => UserActions.loadUserSuccess({user})),
	// 				catchError(error => of(UserActions.loadUserFailure({error})))
	// 			)
	// 		)
			
	// 	)
	// )
}