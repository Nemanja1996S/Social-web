import { Injectable } from "@angular/core";
import { SportSocialService } from "../../services/sport-social.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PostsActions from "./posts.actions"
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class PostsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadPostsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(PostsActions.loadPosts),
			exhaustMap( ({id}) =>
				this.service.getPostsForUser(id).pipe(
					map((posts) => PostsActions.loadPostsSuccess({posts: posts.sort((a, b) => b.date.localeCompare(a.date))})),
					catchError(error => of(PostsActions.loadPostsFailure({error})))
				)
			)
		)
	)
}