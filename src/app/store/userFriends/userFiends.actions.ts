import { createAction, props } from "@ngrx/store";
import { UserFriends } from "../../../models/UserFriends";

export const loadUserFriends = createAction(
    "Loading userFriends to state",
    props<{
        userId: number
    }>()
);

export const loadUserFriendsSuccess = createAction(
    "Loading userFriends to state success",
    props<{
        userFriends: UserFriends
    }>()
);

export const loadUserFriendsFailure = createAction(
    "Loading userFriends to state failure",
    props<{
        error: string
    }>()
);