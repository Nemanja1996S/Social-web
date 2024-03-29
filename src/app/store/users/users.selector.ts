import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./users.reducer";

// const somethingFeatureKey = 'userReducer'; // Should match with what you pass to .forRoot 


// const selectSomething = createFeatureSelector<UserState>(somethingFeatureKey)

export const selectUserFeature = (state: AppState) => state.userState;	

export const isLoadingSelector = createSelector(
    selectUserFeature,
    (state) => state.isLoading
)

export const userSelector = createSelector(
    selectUserFeature,
    (state) => state.user
)

export const errorSelector = createSelector(
    selectUserFeature,
    (state) => state.error
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