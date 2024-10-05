import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProfileState } from "./profile.reducer"; 
import { userIdSelector } from "../user/user.selector";

// const somethingFeatureKey = 'userReducer'; // Should match with what you pass to .forRoot 


// const selectSomething = createFeatureSelector<UserState>(somethingFeatureKey)

export const selectProfileFeature = (state: AppState) => state.profileState;	

export const profileSelector = createSelector(
    selectProfileFeature,
    (profileState) => profileState.user
)

export const profileIdSelector = createSelector(
    profileSelector,
    (user) => user.id
)


// export const searchSelectedSportsSelector = createSelector(
//     selectProfileFeature,
//     (profileState) => profileState.searchSelectedSports
// )

// export const selectedSportsSelector = createSelector(
//     profileSelector,
//     (user) => user.selectedSports
// )

// export const profileFriendsIdsArraySelector = createSelector(
//     profileSelector,
//     (user) => user.friendsIds
// )

// const numberOfMuturalFriends: number = userFriendsIds.filter(id => friendFriendsIds.includes(id)).length

// export const userFriendsIdsArraySelector = createSelector(
//     userSelector,
//     (user) => user.friendsIds
// )



// export const isLoadingSelector = createSelector(
//     selectProfileFeature,
//     (profileState) => profileState.isLoading
// )

