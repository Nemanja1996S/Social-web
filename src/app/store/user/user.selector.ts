import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducer";

// const somethingFeatureKey = 'userReducer'; // Should match with what you pass to .forRoot 


// const selectSomething = createFeatureSelector<UserState>(somethingFeatureKey)

export const selectUserFeature = (state: AppState) => state.userState;	

export const userSelector = createSelector(
    selectUserFeature,
    (userState) => userState.user
)

export const selectedSportsSelector = createSelector(
    userSelector,
    (user) => user.selectedSports
)

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