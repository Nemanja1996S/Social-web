import { AppState } from "../app.state";

export const selectUserFeature = (state: AppState) => state.user;		

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