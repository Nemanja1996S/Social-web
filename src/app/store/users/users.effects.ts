import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SportSocialService } from "../../services/sport-social.service";
import { map, mergeMap } from "rxjs";
import * as UserActions from './users.actions'
import { Injectable } from "@angular/core";

@Injectable()
export class UsersEffect {
	constructor(private service: SportSocialService, private action$: Actions) {}
	
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