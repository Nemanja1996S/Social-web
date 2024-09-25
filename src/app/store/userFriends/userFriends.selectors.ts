import { createSelector } from "@ngrx/store";
import { UserFriendsState } from "./userFriends.reducer";
import { AppState } from "../app.state";

export const selectUserFriendsFeature = (state: AppState) => state.userFriendsState
export const selectUserFeature = (state: AppState) => state.userState

export const userFriendsDictSelector = createSelector(
    selectUserFriendsFeature,
    (userFriendsState) => userFriendsState.entities
)

const userIdSelector = createSelector(
    selectUserFeature,
    (userState) => userState.user.id
)


export const userFriendsArraySelector = createSelector(
    userFriendsDictSelector,
    userIdSelector,
    (userFriendsDict, userId) => (userFriendsDict[userId]?.friends) ?? null

)

// {
//     if(userFriendsDict[userId]){
//         return userFriendsDict[userId].friends
//     }
//     return null;
// }