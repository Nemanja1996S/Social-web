import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SportSocialService } from "../../services/sport-social.service";
import { catchError, exhaustMap, map, mergeMap, of, pipe, switchMap, switchMapTo } from "rxjs";
import * as ProfileActions from './profile.actions'
import { Injectable } from "@angular/core";

@Injectable()
export class ProfileEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadProfileEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(ProfileActions.loadProfile),
			exhaustMap( ({id}) =>
				this.service.getUserById(id).pipe(
					map((user) => ProfileActions.loadProfileSuccess({user})),
					catchError(error => of(ProfileActions.loadProfileFailure({error})))
				)
			)
			
		)
	)
}