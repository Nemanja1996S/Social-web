import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectPostsFeature = (state: AppState) => state.postsState;	

export const postsSelector = createSelector(
    selectPostsFeature,
    (state) => state.posts
)

export const errorSelector = createSelector(
    selectPostsFeature,
    (state) => state.error
)