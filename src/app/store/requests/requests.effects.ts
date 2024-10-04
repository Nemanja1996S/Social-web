import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of } from "rxjs";
import { SportSocialService } from "../../services/sport-social.service";
import * as FriendRequestsActions from "./requests.actions"

@Injectable()
export class FriendRequestEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadPostReactionsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(FriendRequestsActions.loadRequests),
			exhaustMap( ({userId}) =>
				this.service.getFriendRequestsForUser(userId).pipe(
					map((friendRequests) => FriendRequestsActions.loadRequestsSuccess({friendRequests: friendRequests})),
					catchError(error => of(FriendRequestsActions.loadRequestsFailure({error})))
				)
			)
		)
	)
}