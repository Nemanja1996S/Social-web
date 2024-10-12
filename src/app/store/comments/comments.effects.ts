import { Injectable } from "@angular/core";
import { SportSocialService } from "../../services/sport-social.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, switchMap } from "rxjs";
import * as CommentsActions from "./comments.actions"

@Injectable()
export class CommentsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadCommentsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.loadComments),
			switchMap( ({postId}) =>
				this.service.getCommentsForPost(postId).pipe(
					map((comments) => CommentsActions.loadCommentsSuccess({comments: comments})),
					catchError(error => of(CommentsActions.loadCommentsFailure({error})))
				)
			)
		)
	)

	makeCommentEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.makeComment),
			switchMap( ({postId, userComment}) =>
				this.service.makeCommentForPost(postId, userComment).pipe(
					map(() => CommentsActions.makeCommentSuccess({userComment: userComment})),
					catchError(error => of(CommentsActions.makeCommentFailure({error})))
				)
			)
		)
	)
}