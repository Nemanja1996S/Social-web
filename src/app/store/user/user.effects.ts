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
		userFromDatabase.friends.map(friend => user.friendsIds.push(friend.friendId))
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