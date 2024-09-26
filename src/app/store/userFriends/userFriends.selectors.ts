import { createSelector } from "@ngrx/store";
import { UserFriendsState } from "./userFriends.reducer";
import { AppState } from "../app.state";
import { Friend } from "../../../models/UserFriends";

export interface FriendAndNumberOfMuturalFriends {
    friend: Friend,
    numberOfMuturalFriends: number;
}

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


export const friendsAndNumberOfMuturalFriendsSelector = createSelector(
    selectUserFriendsFeature,
    userFriendsDictSelector,
    userIdSelector,
    (userFriendsState, userFriendsDict, userId) => {
        const friendsArray = userFriendsDict[userId]?.friends
        if(friendsArray)
            {
                const userFriendsIds =  userFriendsState.entities[userId]?.userFriendsIds
                if(userFriendsIds){
                    let friendAndNuberOfMuturalFriendsArray : FriendAndNumberOfMuturalFriends[] = []
                    friendsArray.forEach(friend => {
                        const friendFriendsIds: number[] = friend.friendsIds
                        const numberOfMuturalFriends: number = userFriendsIds.filter(id => friendFriendsIds.includes(id)).length
                        friendAndNuberOfMuturalFriendsArray.push({friend,numberOfMuturalFriends})
                    })
                    return friendAndNuberOfMuturalFriendsArray.sort((friend1, friend2) => friend2.numberOfMuturalFriends - friend1.numberOfMuturalFriends);
                }
                else return null;
            }
        else return null//(userFriendsDict[userId]?.friends) ?? null userFriendsArraySelector
        }
        
)
