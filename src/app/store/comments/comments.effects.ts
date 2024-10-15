import { Injectable } from "@angular/core";
import { SportSocialService } from "../../services/sport-social.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, switchMap } from "rxjs";
import * as CommentsActions from "./comments.actions"
import { CommentEntityFromDatabase, UserComment } from "../../../models/Comment";

@Injectable()
export class CommentsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadCommentsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.loadComments),
			switchMap( ({postId}) =>
				this.service.getCommentsForPost(postId).pipe(
					map((userComments: CommentEntityFromDatabase[]) => CommentsActions.loadCommentsSuccess({userComments: this.adaptCommentEntity(userComments)})),
					catchError(error => of(CommentsActions.loadCommentsFailure({error})))
				)
			)
		)
	)
	adaptCommentEntity(usercomm: CommentEntityFromDatabase[]): UserComment[]{
		let userComms: UserComment[] = []
		usercomm.map(comms => {
			const userComment: UserComment = {
				id: comms.id,
				postId: comms.post,
				userId: comms.user.id,
				userName: comms.user.name,
				userSurname: comms.user.surname,
				userPicSrc: comms.user.picture,
				commentDate: comms.commentDate,
				commentText: comms.commentText,
				commentPic: comms.commentPic
			}
			userComms.push(userComment)
		 })
		return userComms;
	}

	makeCommentEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.makeComment),
			switchMap( ({postId, userComment}) =>
				this.service.makeCommentForPost(postId, userComment).pipe(
					map(() => CommentsActions.loadComments({postId: userComment.postId})),
					catchError(error => of(CommentsActions.makeCommentFailure({error})))
				)
			)
		)
	)

	editCommentEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.editUserComment),
			switchMap( ({userComment}) =>
				this.service.editComment(userComment, userComment.id).pipe(
					map(() => CommentsActions.editUserCommentSuccess({userComment: userComment})),
					catchError(error => of(CommentsActions.editUserCommentFailure({error})))
				)
			)
		)
	)

	deleteCommentEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(CommentsActions.deleteUserComment),
			switchMap( ({userComment}) =>
				this.service.deleteComment(userComment.id).pipe(
					map(() => CommentsActions.deleteUserCommentSuccess({userComment: userComment})),
					catchError(error => of(CommentsActions.deleteUserCommentFailure({error})))
				)
			)
		)
	)
}