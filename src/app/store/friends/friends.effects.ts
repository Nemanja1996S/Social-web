import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, switchMap } from "rxjs";
import { SportSocialService } from "../../services/sport-social.service";
import * as userFriendsActions from "./friends.actions"
import { Friend, FriendFromDatabase } from "../../../models/Friends";

@Injectable()
export class FriendsEffect {
	constructor(private service: SportSocialService, private actions$: Actions) {}
	
	loadFriendsEffect$ = createEffect( () =>
		this.actions$.pipe(
			ofType(userFriendsActions.loadFriends),
			switchMap( ({friendsIds}) =>
				this.service.getFriendsForUser(friendsIds).pipe(
					map((friends) => userFriendsActions.loadFriendsSuccess({friends: this.friendsAdapter(friends)})),
					catchError(error => of(userFriendsActions.loadFriendsFailure({error})))
				)
			)
		)
	)
	friendsAdapter(friends: FriendFromDatabase[]): Friend[]{
		return friends.map(friend => ({
			id: friend.id,
			name: friend.name,
			surname: friend.surname,
			picture: friend.picture,
			selectedSports: friend.selectedSports,
			friendsIds: friend.friendships.map(friendship => friendship.friend.id)
		}))
	}
}