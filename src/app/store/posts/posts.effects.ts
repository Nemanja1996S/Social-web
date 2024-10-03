import { Injectable } from "@angular/core";
import { SportSocialService } from "../../services/sport-social.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PostsActions from "./posts.actions"
import { catchError, exhaustMap, filter, map, of } from "rxjs";
import { Post } from "../../../models/Post";

@Injectable()
export class PostsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadPostsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.loadPosts),
			exhaustMap( ({userId}) =>
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
			exhaustMap( ({userId, selectedSports}) =>
				this.service.getPostsForUser(userId).pipe(
					map((posts) => PostsActions.loadPostsForSportsSuccess({posts: posts.filter(post => this.isForSports(post, selectedSports))}) ),
					catchError(error => of(PostsActions.loadPostsForSportsFailure({error})))
				)
			)
		)
	)

	isForSports(post: Post, selectedSports: string[]): boolean {
		return post.forSports.some(sport => selectedSports.includes(sport));
	}
}