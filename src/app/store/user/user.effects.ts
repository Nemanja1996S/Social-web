import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SportSocialService } from "../../services/sport-social.service";
import { catchError, exhaustMap, map, mergeMap, of, pipe, switchMap, switchMapTo } from "rxjs";
import * as UserActions from './user.actions'
import { Injectable } from "@angular/core";

@Injectable()
export class UserEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadUserEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(UserActions.loadUser),
			exhaustMap( ({email, password}) =>
				this.service.getUser(email, password).pipe(
					map((user) => UserActions.loadUserSuccess({user})),
					catchError(error => of(UserActions.loadUserFailure({error})))
				)
			)
			
				// .pipe( () => this.service.getUser)
				// map( user => UserActions.loadUserSuccess({user}))
				// catchError(error => of(UserActions.loadUserFailure({error})))
		)
	)
	

	// loadEffect$ = createEffect(() =>
	// 	this.action$.pipe(
	// 		ofType(UserActions.loadUser)),
	// 		mergeMap( (action) => {
	// 			return this.service.getUser(action.parameters)
	// 				.pipe(map(user) => UserActions.setUser({user}))
	// 		})
		// 	mergeMap(({email : string, password: string}) => this.service.getUser(email, password)
		// 		.pipe(
		// 			map((user) => (MoviesActions.loadMoviesSucces({movies})),
		// 			catchError(() => of({ type: "load error"}))
		// 		)
		// 	)
		// )
	//)
}