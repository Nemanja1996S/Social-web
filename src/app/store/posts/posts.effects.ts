import { Injectable } from "@angular/core";
import { SportSocialService } from "../../services/sport-social.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PostsActions from "./posts.actions"
import { catchError, exhaustMap, filter, map, of, switchMap } from "rxjs";
import { Post } from "../../../models/Post";

@Injectable()
export class PostsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadPostsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.loadPosts),
			switchMap( ({userId}) =>
				this.service.getPostsForUser(userId).pipe(
					map((posts) => PostsActions.loadPostsSuccess({posts: posts})),
					catchError(error => of(PostsActions.loadPostsFailure({error})))
				)
			)
		)
	)

	loadPostsForSportsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.loadPostsForSports),
			switchMap( ({userId, selectedSports}) =>
				this.service.getPostsForUser(userId).pipe(
					map((posts) => PostsActions.loadPostsForSportsSuccess({posts: posts.filter(post => this.isForSports(post, selectedSports))}) ),
					catchError(error => of(PostsActions.loadPostsForSportsFailure({error})))
				)
			)
		)
	)

	addPostEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.addPost),
			switchMap( ({userId, createPostObject}) =>
				this.service.addPost(userId, createPostObject).pipe(
					map(() => PostsActions.loadPosts({userId})),
					catchError(error => of(PostsActions.addPostsFailure({error})))
				)
			)
		)
	)

	editPostEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.editPost),
			switchMap( ({postId, postImage, postText}) =>
				this.service.editPost(postId, postText, postImage).pipe(
					map(() => PostsActions.editPostSuccess({postId: postId, postImage: postImage, postText: postText})),
					catchError(error => of(PostsActions.editPostFailure({error})))
				)
			)
		)
	)

	deletePostEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.deletePost),
			switchMap( ({postId}) =>
				this.service.deletePost(postId).pipe(
					map(() => PostsActions.deletePostSuccess({postId: postId})),
					catchError(error => of(PostsActions.deletePostFailure({error})))
				)
			)
		)
	)

	reactionPostEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.reactToPost),
			switchMap( ({post, userId, reactionEnum}) =>
				this.service.reactToPost(userId, post.id, reactionEnum).pipe(
					map(() => PostsActions.reactToPostSuccess({post: post, userId: userId, reactionEnum: reactionEnum})),
					catchError(error => of(PostsActions.reactToPostFailure({error})))
				)
			)
		)
	)

	isForSports(post: Post, selectedSports: string[]): boolean {
		return post.forSports.some(sport => selectedSports.includes(sport));
	}
}
// reactionPostEffect$ = createEffect( () =>
// 	this.actions$.pipe(
// 		ofType(PostsActions.likePost, PostsActions.dislikePost),
// 		switchMap( ({post, userId, reactionEnum}) =>
// 			this.service.reactToPost(userId, post.id, reactionEnum).pipe(
// 				map(() => PostsActions.likePostSuccess({post: post, userId: userId})),
// 				catchError(error => of(PostsActions.likePostFailure({error})))
// 			)
// 		)
// 	)
// )