import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducer";
import { profileIdSelector } from "../profile/profile.selectors";

// const somethingFeatureKey = 'userReducer'; // Should match with what you pass to .forRoot 


// const selectSomething = createFeatureSelector<UserState>(somethingFeatureKey)

export const selectUserFeature = (state: AppState) => state.userState;	

export const userSelector = createSelector(
    selectUserFeature,
    (userState) => userState.user
)

export const searchSelectedSportsSelector = createSelector(
    selectUserFeature,
    (userState) => userState.searchSelectedSports
)

export const selectedSportsSelector = createSelector(
    userSelector,
    (user) => user.selectedSports
)

export const userFriendsIdsArraySelector = createSelector(
    userSelector,
    (user) => user.friendsIds
)

export const isProfileUserFriendsWithLoggedSelector = createSelector(
    profileIdSelector,
    userSelector,
    (profileUserId, user) => user.friendsIds.includes(profileUserId)
)

// const numberOfMuturalFriends: number = userFriendsIds.filter(id => friendFriendsIds.includes(id)).length

// export const userFriendsIdsArraySelector = createSelector(
//     userSelector,
//     (user) => user.friendsIds
// )

export const userIdSelector = createSelector(
    userSelector,
    (user) => user.id
)

export const isLoadingSelector = createSelector(
    selectUserFeature,
    (userState) => userState.isLoading
)



export const errorSelector = createSelector(
    selectUserFeature,
    (userState) => userState.error
)

export const pictureSelector = createSelector(
    userSelector,
    (user) => user.picture
)



export const selSportsSelector = createSelector(
    selectUserFeature,
    (userState) => userState.user.selectedSports
)



// export const selectAllMovies = createSelector(
// 		selectMoviesFeature,
// 		(state) => state.allMovies
// );

// export const selectSelectedMovieId = createSelector(
// 	selectMoviesFeature,
// 	(state) => state.selectedMovieId
// )

// export const selectSelectedMovie = createSelector(
// 	selectAllMovies,
// 	selectSelectedMovieId,
// 	(allMovies, movieId) => allMovies.find(movie => movie.id === movieId) ?? null //ako je undefined, onda vrati null
// )