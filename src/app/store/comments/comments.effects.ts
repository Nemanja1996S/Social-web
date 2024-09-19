import { Injectable } from "@angular/core";
import { SportSocialService } from "../../services/sport-social.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of } from "rxjs";
import * as CommentsActions from "./comments.actions"

@Injectable()
export class CommentsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadCommentsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.loadComments),
			exhaustMap( ({postId}) =>
				this.service.getCommentsForPost(postId).pipe(
					map((comments) => CommentsActions.loadCommentsSuccess({comments: comments})),
					catchError(error => of(CommentsActions.loadPostsFailure({error})))
				)
			)
		)
	)
}