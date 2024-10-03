import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { exhaustMap, map, catchError, of, tap } from "rxjs"
import { SportSocialService } from "../../services/sport-social.service"
import * as PostReactionsActions from "./postReactions.actions"

@Injectable()
export class PostReactionsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadPostReactionsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostReactionsActions.loadPostReactions),
			exhaustMap( ({userId}) =>
				this.service.getPostReactionsForUser(userId).pipe(
					map((postReactions) => PostReactionsActions.loadPostReactionsSuccess({userPostReactions: postReactions})),
					catchError(error => of(PostReactionsActions.loadPostReactionsFailure({error})))
				)
			)
		)
	)
}