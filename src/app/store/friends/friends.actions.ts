import { createAction, props } from "@ngrx/store";
import { Friend } from "../../../models/Friends";
// import { UserFriends } from "../../../models/UserFriends";

export const loadFriends = createAction(
    "Loading friends to state",
    props<{
        userId: number
    }>()
);

export const loadFriendsSuccess = createAction(
    "Loading friends to state success",
    props<{
        friends: Friend[]
    }>()
);

export const loadFriendsFailure = createAction(
    "Loading friends to state failure",
    props<{
        error: string
    }>()
);