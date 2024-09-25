import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of } from "rxjs";
import { SportSocialService } from "../../services/sport-social.service";
import * as userFriendsActions from "../userFriends/userFiends.actions"

@Injectable()
export class UserFriendsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadUserFriendsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(userFriendsActions.loadUserFriends),
			exhaustMap( ({userId}) =>
				this.service.getFriendsForUser(userId).pipe(
					map((userFriends) => userFriendsActions.loadUserFriendsSuccess({userFriends: userFriends})),
					catchError(error => of(userFriendsActions.loadUserFriendsFailure({error})))
				)
			)
		)
	)
}