import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of } from "rxjs";
import { SportSocialService } from "../../services/sport-social.service";
import * as userFriendsActions from "./friends.actions"

@Injectable()
export class FriendsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadFriendsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(userFriendsActions.loadFriends),
			exhaustMap( ({userId}) =>
				this.service.getFriendsForUser(userId).pipe(
					map((friends) => userFriendsActions.loadFriendsSuccess({friends: friends})),
					catchError(error => of(userFriendsActions.loadFriendsFailure({error})))
				)
			)
		)
	)
}