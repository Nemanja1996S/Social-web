import { createSelector } from "@ngrx/store";
import { FriendsState } from "./friends.reducer";
import { AppState } from "../app.state";
import { Friend } from "../../../models/Friends";

export interface FriendAndNumberOfMuturalFriends {
    friend: Friend,
    numberOfMuturalFriends: number;
}

export const selectFriendsFeature = (state: AppState) => state.friendsState
export const selectUserFeature = (state: AppState) => state.userState

export const friendsDictSelector = createSelector(
    selectFriendsFeature,
    (friendsState) => friendsState.entities
)

export const errorFreindsSelector = createSelector(
    selectFriendsFeature,
    (state) => state.error
)

const userIdSelector = createSelector(
    selectUserFeature,
    (userState) => userState.user.id
)

export const FriendsArraySelector = createSelector(
    friendsDictSelector,
    userIdSelector,
    (friendsDict, userId) => (friendsDict[userId]) ?? null

)


export const friendsAndNumberOfMuturalFriendsSelector = createSelector(
    selectFriendsFeature,
    friendsDictSelector,
    userIdSelector,
    (friendsState, friendsDict, userId) => {
        const friendsArray = Object.values(friendsDict).filter(friend => friend !== undefined).map(friend => <Friend>friend)//friendsDict[userId]?.friends
        if(friendsArray)
            {
                const userFriendsIds = <number[]>friendsState.ids//entities[userId]?.friends.map(fr => fr.friendId)
                if(userFriendsIds){
                    let friendAndNuberOfMuturalFriendsArray : FriendAndNumberOfMuturalFriends[] = []
                    friendsArray.forEach(friend => {
                        const friendFriendsIds = friend?.friends.map(friend => friend.friendId)
                        if(friendFriendsIds){
                            const numberOfMuturalFriends: number = userFriendsIds.filter(id => friendFriendsIds.includes(id)).length
                            friendAndNuberOfMuturalFriendsArray.push({friend: friend, numberOfMuturalFriends: numberOfMuturalFriends})
                        }
                        
                    })
                    return friendAndNuberOfMuturalFriendsArray.sort((friend1, friend2) => friend2.numberOfMuturalFriends - friend1.numberOfMuturalFriends);
                }
                else return null;
            }
        else return null//(userFriendsDict[userId]?.friends) ?? null userFriendsArraySelector
        }
        
)
